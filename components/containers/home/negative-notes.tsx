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
import type { NegativeNote } from "@/types/negative-notes";
import { Label } from "@/components/ui/label";
import { getDateWithDayOfWeek } from "@/lib/date/date";
import { getEmotionJp } from "@/lib/negative-notes/negative-emotions";
import { IconMoodSadSquint, IconChevronRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export function NegativeNotes({ notes }: { notes: NegativeNote[] }) {
  const emotionColors: Record<string, string> = {
    anger: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
    sadness: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    anxiety: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    fear: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    shame: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
    guilt: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950">
              <IconMoodSadSquint className="size-4 text-purple-600" />
            </div>
            <div>
              <CardTitle>ネガティブノート</CardTitle>
              <CardDescription className="mt-1">
                最近の記録
              </CardDescription>
            </div>
          </div>
          {notes.length > 0 && (
            <Badge variant="secondary" className="shrink-0">
              {notes.length}件
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {notes.length > 0 ? (
          notes.map((note) => {
            const emotionColor = emotionColors[note.emotion] || "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400";
            return (
              <div
                key={note.id}
                className="rounded-lg border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    {getDateWithDayOfWeek(note.when)}
                  </Label>
                  <Badge className={`${emotionColor} border-0 text-xs`}>
                    {getEmotionJp(note.emotion)}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm">
                  {note.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8">
            <p className="text-center text-sm text-muted-foreground">
              まだ記録がありません
              <br />
              最初のノートを作成しましょう
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="button">
          <Link href="dashboard/negative-notes" className="flex items-center gap-2">
            すべてのノートを見る
            <IconChevronRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
