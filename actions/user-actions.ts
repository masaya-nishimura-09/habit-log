"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { LoginFormSchema } from "@/lib/schemas/login-form";
import { RegisterFormSchema } from "@/lib/schemas/register-form";
import { SettingsFormSchema } from "@/lib/schemas/settings-form";
import { supabase } from "@/lib/supabase";
import type { LoginState, RegisterState } from "@/types/user";

export async function getUserSession() {
  const session = await auth();
  return session?.user;
}

export async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);

  return userId;
}

export async function getUsername() {
  const session = await auth();
  const username: string = session?.user?.name as string;
  return username;
}

export async function getUserInfo() {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function checkPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.from("users").select().eq("email", email);

    if (error) {
      console.error("Supabase error:", error);
      return false;
    }

    const passwordsMatch = await bcrypt.compare(password, data?.[0].password);
    return passwordsMatch;
  } catch (err) {
    console.error("Unexpected error in getUser:", err);
    return false;
  }
}

export async function register(_prevState: RegisterState | undefined, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmedPassword: formData.get("confirmed-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "会員登録に失敗しました。",
    };
  }

  const { name, email, password } = validatedFields.data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { error } = await supabase
    .from("users")
    .insert({ name: name, email: email, password: hashedPassword });
  if (error) {
    console.error(error);
    if (error.code === "23505") {
      return {
        message: "このメールアドレスはすでに使用されています。",
      };
    }
    return {
      message: "会員登録に失敗しました。",
    };
  }
  await signIn("credentials", formData);
}

export async function authenticate(_prevState: LoginState | undefined, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ログインに失敗しました。",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "メールアドレスまたはパスワードに誤りがあります。",
          };
        default:
          return {
            message: "ログインに失敗しました。",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function updateUser(formData: FormData) {
  const validatedFields = SettingsFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    currentPassword: formData.get("current-password"),
    newPassword: formData.get("new-password"),
    newConfirmedPassword: formData.get("new-confirmed-password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "設定の更新に失敗しました。",
    };
  }

  const { name, email, currentPassword, newPassword } = validatedFields.data;
  const userId = await getUserId();

  const passwordsMatch = await checkPassword(email, currentPassword);

  if (!passwordsMatch) {
    return {
      success: false,
      message: "設定の更新に失敗しました。",
    };
  }

  const updateData: { name: string; email: string; password?: string } = {
    name,
    email,
  };

  if (newPassword && newPassword.length > 0) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(newPassword, saltRounds);
  }

  const { error } = await supabase.from("users").update(updateData).eq("id", userId);

  if (error) {
    console.error(error);
    if (error.code === "23505") {
      return {
        success: false,
        message: "このメールアドレスはすでに使用されています。",
      };
    }
    return {
      success: false,
      message: "設定の更新に失敗しました。",
    };
  }

  await signIn("credentials", {
    email,
    password: currentPassword,
    redirect: false,
  });

  return { success: true };
}
