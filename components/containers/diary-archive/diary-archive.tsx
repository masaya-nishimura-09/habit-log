"use client";

import { useState } from "react";
import DiaryArchiveSearchDialog from "@/components/containers/diary-archive/diary-archive-search-dialog";
import DiaryArchiveTable from "@/components/containers/diary-archive/diary-archive-table";
import { Card, CardTitle, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { useDiaryArchiveTable } from "@/hooks/use-diary-archive-table";
import { Diary } from "@/types/diaries";

export function DiaryArchive({ data }: { data: Diary[] }) {
  const [diaries, setDiaries] = useState<Diary[]>(data);
  const { table } = useDiaryArchiveTable(diaries);

  return (
    <Card>
      <CardHeader>
        <CardTitle>過去の日記一覧</CardTitle>
        <CardAction>
          <DiaryArchiveSearchDialog setDiaries={setDiaries} table={table} />
        </CardAction>
      </CardHeader>
      <CardContent className="h-full">
        <DiaryArchiveTable table={table} />
      </CardContent>
    </Card>
  );
}
