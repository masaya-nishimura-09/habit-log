"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { deleteUser, updateUser } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { SettingsState } from "@/types/user";

interface SettingsFormProps {
  initialData: {
    name: string;
    email: string;
  };
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [pending, setPending] = useState<boolean>(false);
  const initialState: SettingsState = { message: null, errors: {} };
  const [state, setState] = useState<SettingsState>(initialState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(initialState);
    const formData = new FormData(e.currentTarget);
    const result = await updateUser(formData);
    if (result.success) {
      toast.success("アカウント情報の変更に成功しました!");
    } else {
      setState(result);
      toast.error(result.message);
    }
    setPending(false);
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <Card className="size-full">
        <CardHeader>
          <CardTitle>アカウント設定</CardTitle>
          <CardDescription>
            ユーザー情報を変更できます。パスワードを変更しない場合は、パスワード欄は空のままにしてください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="settings-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">ユーザーネーム</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="ユーザーネームを入力して下さい"
                defaultValue={initialData.name}
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.name?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={initialData.email}
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.email?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current-password">現在のパスワード</Label>
              <Input id="current-password" name="current-password" type="password" />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.currentPassword?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">パスワード（変更する場合のみ）</Label>
              <Input id="new-password" name="new-password" type="password" />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.newPassword?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-confirmed-password">確認用パスワード（変更する場合のみ）</Label>
              <Input id="new-confirmed-password" name="new-confirmed-password" type="password" />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.newConfirmedPassword?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="delete-account">アカウントを削除する</Label>
              <div className="flex flex-wrap gap-1 items-center">
                <p className="text-sm">一度削除したアカウントは復活できません。</p>
                <div>
                  <Button type="button" variant="outline" onClick={deleteUser}>
                    アカウントを削除
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="flex flex-col gap-2 justify-start">
            <Button
              type="submit"
              form="settings-form"
              aria-disabled={pending}
              className="flex gap-2"
            >
              {pending && <Spinner />}
              保存
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
