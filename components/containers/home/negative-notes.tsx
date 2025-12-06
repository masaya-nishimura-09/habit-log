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
import type { NegativeNote } from "@/types/negative-notes";
import { Label } from "@/components/ui/label";
import { getDateWithDayOfWeek } from "@/lib/date/date";
import { getEmotionJp } from "@/lib/negative-notes/negative-emotions";

export function NegativeNotes({ notes }: { notes: NegativeNote[] }) {

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ネガティブノート</CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {notes.map((note) => (
          <div key={note.id} className="grid gap-2">
            <Label>{getDateWithDayOfWeek(note.when)}</Label>
            <p>{note.description}</p>
            <p>{getEmotionJp(note.emotion)}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button type="button">
          <Link href="dashboard/negative-notes">
            もっと見る
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
