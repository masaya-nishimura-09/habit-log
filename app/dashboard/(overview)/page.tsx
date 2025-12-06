import type { Metadata } from "next";
import { getUsername } from "@/actions/user-actions";
import { Diary } from "@/components/containers/home/diary";
import { fetchDiary } from "@/actions/diaries-actions";
import { getDateStr } from "@/lib/date/date";

export const metadata: Metadata = {
  title: "ホーム",
};

export default async function Page() {
  const username = await getUsername();
  const result = await fetchDiary(getDateStr());

  return (
    <div className="size-full flex flex-col gap-4">
      <div>
        <p className="text-xl font-semibold">おかえりなさい、{username}さん！</p>
      </div>
      <div>
        <Diary data={result.data} />
      </div>
    </div>
  );
}
