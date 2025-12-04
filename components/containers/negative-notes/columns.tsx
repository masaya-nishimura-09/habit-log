"use client";

import { deleteNegativeNote } from "@/actions/negative-notes-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getDateWithDayOfWeek } from "@/lib/date/date";
import { negativeEmotions } from "@/lib/negative-notes/negative-emotions";
import type { NegativeNote } from "@/types/negative-notes";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<NegativeNote>[] = [
  {
    accessorKey: "when",
    header: "登録日",
    cell: ({ row }) => {
      return <div>{getDateWithDayOfWeek(row.getValue("when"))}</div>;
    },
  },
  {
    accessorKey: "emotion",
    header: "感情",
    cell: ({ row }) => {
      const emotion = negativeEmotions.filter(
        (negativeEmotion) => negativeEmotion.en === row.getValue("emotion"),
      );
      return <div>{emotion[0].jp}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "できごと",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [pending, setPending] = useState<boolean>(false);
      const negativeNoteId = row.original.id as number;

      async function handleDeleteNegativeNote() {
        try {
          setPending(true);
          await deleteNegativeNote(negativeNoteId);
          location.reload();
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        } finally {
          setPending(false);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/negative-notes/${row.original.id}`}>詳細</Link>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>削除</DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ノートを削除</AlertDialogTitle>
                  <AlertDialogDescription>
                    このノートを削除しますか？ この操作は元に戻せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteNegativeNote();
                    }}
                  >
                    {pending && <Spinner />}
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
