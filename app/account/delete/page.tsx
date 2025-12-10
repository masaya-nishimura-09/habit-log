import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/lib/logo";

export const metadata: Metadata = {
  title: "アカウント削除成功",
};

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-10 w-sm md:w-md">
        <div className="my-4 flex items-center justify-center gap-2 text-primary">
          <Logo size={2} color={"blue"} />
        </div>
        <CardHeader className="my-4 text-center text-xl">
          <CardTitle>成功</CardTitle>
          <CardDescription>アカウントの削除に成功しました。</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-center">
          <Button>
            <Link href="/">トップページへ戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
