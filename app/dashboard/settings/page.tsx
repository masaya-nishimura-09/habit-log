import type { Metadata } from "next";
import { getUserInfo } from "@/actions/user-actions";
import SettingsForm from "@/components/containers/settings/settings-form";

export const metadata: Metadata = {
  title: "設定",
};

export default async function Page() {
  const userInfo = await getUserInfo();

  if (!userInfo || !userInfo.name || !userInfo.email) {
    throw new Error("アクセスしようとしたページは表示できませんでした。");
  }

  return (
    <div className="size-full">
      <SettingsForm
        initialData={{
          name: userInfo.name,
          email: userInfo.email,
        }}
      />
    </div>
  );
}
