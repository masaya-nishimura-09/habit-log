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
import type { Habit } from "@/types/habits";
import { Label } from "@/components/ui/label";
import { getStreak } from "@/lib/habits/get-streak";
import { IconCheckbox, IconArrowRight, IconTrendingUp, IconChevronRight} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export function Habits({ goodHabits, badHabits }: { goodHabits: Habit[], badHabits: Habit[] }) {
  const totalHabits = goodHabits.length + badHabits.length;
  const maxStreak = Math.max(
    ...goodHabits.map((h) => getStreak(h.restart)),
    ...badHabits.map((h) => getStreak(h.restart)),
    0
  );

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-50 p-2 dark:bg-green-950">
              <IconCheckbox className="size-4 text-green-600" />
            </div>
            <div>
              <CardTitle>習慣</CardTitle>
              <CardDescription className="mt-1">
                {totalHabits}個の習慣を追跡中
              </CardDescription>
            </div>
          </div>
          {maxStreak > 0 && (
            <Badge variant="secondary" className="shrink-0">
              <IconTrendingUp className="mr-1 size-3" />
              {maxStreak}日
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              続けたい習慣
            </Label>
            <div className="space-y-2">
              {goodHabits.length > 0 ? (
                goodHabits.slice(0, 3).map((habit) => {
                  const streak = getStreak(habit.restart);
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{habit.title}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {streak}日継続中
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-sm italic">習慣がありません</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              辞めたい習慣
            </Label>
            <div className="space-y-2">
              {badHabits.length > 0 ? (
                badHabits.slice(0, 3).map((habit) => {
                  const streak = getStreak(habit.restart);
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{habit.title}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {streak}日経過
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-sm italic">習慣がありません</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="button">
          <Link href="dashboard/habits" className="flex items-center gap-2">
            すべての習慣を見る
            <IconChevronRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
