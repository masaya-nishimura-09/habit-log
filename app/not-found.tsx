import { IconNotebook } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-10 w-sm md:w-md">
        <div className="mb-2 flex items-center justify-center gap-2 text-primary">
          <IconNotebook className="size-6 bg-red" />
          <span className="font-semibold text-xl">Growth Journal</span>
        </div>
        <CardHeader className="my-4 text-center text-xl">
          <CardTitle>404 - Page Not Found</CardTitle>
          <CardDescription>ご指定のページが見つかりません。</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-center">
          <Button>
            <Link href="/dashboard">トップページへ戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
