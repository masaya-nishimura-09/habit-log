"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDateStr, getDateWithDayOfWeek } from "@/lib/date/date";
import type { Diary } from "@/types/diaries";
import { Label } from "@/components/ui/label";
import { IconPencil, IconChevronRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export function Diary({ data }: { data?: Diary }) {
  const diaryData = [
    {
      id: 0,
      title: "今日行ったこと",
      text: data?.done || "未記入",
      isEmpty: !data?.done,
    },
    {
      id: 1,
      title: "学んだこと",
      text: data?.learned || "未記入",
      isEmpty: !data?.learned,
    },
    {
      id: 2,
      title: "明日への課題",
      text: data?.challenge || "未記入",
      isEmpty: !data?.challenge,
    },
    {
      id: 3,
      title: "その他",
      text: data?.other || "未記入",
      isEmpty: !data?.other,
    }
  ];

  const hasData = data && (data.done || data.learned || data.challenge || data.other);
  const completedFields = diaryData.filter((field) => !field.isEmpty).length;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
              <IconPencil className="size-4 text-blue-600" />
            </div>
            <div>
              <CardTitle>本日の日記</CardTitle>
              <CardDescription className="mt-1">
                {getDateWithDayOfWeek(getDateStr())}
              </CardDescription>
            </div>
          </div>
          {hasData && (
            <Badge variant="secondary" className="shrink-0">
              {completedFields}/4 完了
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {diaryData.map((field) => (
          <div key={field.id} className="rounded-lg border bg-muted/30 p-4">
            <Label className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {field.title}
            </Label>
            <p className={`text-sm ${field.isEmpty ? "text-muted-foreground italic" : ""}`}>
              {field.text}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button type="button" variant={hasData ? "outline" : "default"}>
          <Link href={`dashboard/diary/${getDateStr()}`} className="flex items-center gap-2">
            {hasData ? "編集する" : "日記を記入する"}
            <IconChevronRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
