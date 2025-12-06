import type { Metadata } from "next";
import { getUsername } from "@/actions/user-actions";
import { Diary } from "@/components/containers/home/diary";
import { fetchDiary } from "@/actions/diaries-actions";
import { fetchLatestNegativeNotes } from "@/actions/negative-notes-actions";
import { getDateStr } from "@/lib/date/date";
import { fetchLatestGoodHabits, fetchLatestBadHabits } from "@/actions/habits-actions";
import { Habits } from "@/components/containers/home/habits";
import { NegativeNotes } from "@/components/containers/home/negative-notes";

export const metadata: Metadata = {
  title: "ホーム",
};

export default async function Page() {
  const username = await getUsername();
  const diaryResult = await fetchDiary(getDateStr());
  const goodHabits = await fetchLatestGoodHabits();
  const badHabits = await fetchLatestBadHabits();
  const negativeNotes = await fetchLatestNegativeNotes(2);

  return (
    <div className="size-full flex flex-col gap-6">
      <div>
        <p className="text-lg font-semibold">おかえりなさい、{username}さん！</p>
      </div>
      <div className="flex gap-6">
        <Diary data={diaryResult.data} />
        <Habits goodHabits={goodHabits} badHabits={badHabits} />
        <NegativeNotes notes={negativeNotes} />
      </div>
    </div>
  );
}
