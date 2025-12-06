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
import type { Habit } from "@/types/habits";
import { Label } from "@/components/ui/label";
import { getStreak } from "@/lib/habits/get-streak";

export function Habits({ goodHabits, badHabits }: { goodHabits: Habit[], badHabits: Habit[] }) {

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>習慣</CardTitle>
        <CardDescription>
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-6">
            <Label>続けたい習慣</Label>
          {goodHabits.map((habit) => (
            <div key={habit.id} className="grid gap-2">
              <Label>{habit.title}</Label>
              <p>{getStreak(habit.restart)}日経過</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
            <Label>辞めたい習慣</Label>
          {badHabits.map((habit) => (
            <div key={habit.id} className="grid gap-2">
              <Label>{habit.title}</Label>
              <p>{getStreak(habit.restart)}日経過</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button type="button">
          <Link href="dashboard/habits">
            もっと見る
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
