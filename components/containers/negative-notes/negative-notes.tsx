"use client";

import Link from "next/link";
import NegativeNotesTable from "@/components/containers/negative-notes/negative-notes-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useNegativeNotesTable from "@/hooks/use-negative-notes-table";
import { NegativeNote } from "@/types/negative-notes";

export default function NegativeNotes({ negativeNotes }: { negativeNotes: NegativeNote[] }) {
  const { table } = useNegativeNotesTable(negativeNotes);

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>ネガティブノート一覧</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="default">
            <Link href="/dashboard/negative-notes/new">新規作成</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <NegativeNotesTable table={table} />
      </CardContent>
    </Card>
  );
}
