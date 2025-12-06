"use client";

import HabitsTable from "@/components/containers/habits/habits-table";
import NewHabits from "@/components/containers/habits/new-habits";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHabitsTable from "@/hooks/use-habits-table";
import type { Habit } from "@/types/habits";

export default function BadHabits({ data }: { data: Habit[] }) {
  const { table } = useHabitsTable(data);

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>辞めたい習慣</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <NewHabits />
        </CardAction>
      </CardHeader>
      <CardContent className="w-full">
        <HabitsTable table={table} />
      </CardContent>
    </Card>
  );
}
