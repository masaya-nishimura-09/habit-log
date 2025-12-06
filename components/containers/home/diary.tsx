"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDateStr } from "@/lib/date/date";
import type { Diary } from "@/types/diaries";
import { Label } from "@/components/ui/label";

export function Diary({ data }: { data?: Diary }) {
  const diaryData = [
    {
      id: 0,
      title: "今日行ったこと",
      text: data?.done || "未記入",
    },
    {
      id: 1,
      title: "学んだこと",
      text: data?.learned || "未記入",
    },
    {
      id: 2,
      title: "明日への課題",
      text: data?.challenge || "未記入",
    },
    {
      id: 3,
      title: "その他",
      text: data?.other || "未記入",
    }
  ]


  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>本日の日記</CardTitle>
        <CardDescription>
          今日の出来事と学びを記録し、明日への糧にしましょう。
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {diaryData.map((field) => (
          <div key={field.id} className="grid gap-2">
            <Label>{field.title}</Label>
            <p>{field.text}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
          <Button type="button">
            <Link href={`dashboard/diary/${getDateStr()}`}>
              日記を記入する
            </Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
