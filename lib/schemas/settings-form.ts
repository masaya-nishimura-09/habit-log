import { z } from "zod";

export const SettingsFormSchema = z
  .object({
    name: z
      .string({
        message: "ユーザーネームを入力してください。",
      })
      .min(1, { message: "ユーザーネームを入力して下さい。" }),
    email: z.email({ message: "メールアドレスの形式で入力して下さい。" }),
    currentPassword: z
      .string({
        message: "現在のパスワードを入力してください。",
      })
      .min(6, { message: "パスワードは6文字以上で入力して下さい。" })
      .max(50, { message: "パスワードは50文字以内で入力して下さい。" }),
    newPassword: z
      .string({
        message: "パスワードを入力してください。",
      })
      .min(6, { message: "パスワードは6文字以上で入力して下さい。" })
      .max(50, { message: "パスワードは50文字以内で入力して下さい。" })
      .optional()
      .or(z.literal("")),
    newConfirmedPassword: z
      .string({
        message: "確認用パスワードを入力してください。",
      })
      .min(6, { message: "パスワードは6文字以上で入力して下さい。" })
      .max(50, { message: "パスワードは50文字以内で入力して下さい。" })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => !data.newPassword || data.newPassword === data.newConfirmedPassword, {
    path: ["newConfirmedPassword"],
    message: "パスワードが一致しません。",
  });
