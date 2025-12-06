import { fetchDiary, getDiaryCount } from "@/actions/diaries-actions";
import {
  fetchLatestBadHabits,
  fetchLatestGoodHabits,
  getHabitsCount,
} from "@/actions/habits-actions";
import { fetchLatestNegativeNotes, getNegativeNotesCount } from "@/actions/negative-notes-actions";
import { getUsername } from "@/actions/user-actions";
import { Diary } from "@/components/containers/home/diary";
import { Habits } from "@/components/containers/home/habits";
import { NegativeNotes } from "@/components/containers/home/negative-notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDateStr } from "@/lib/date/date";
import { IconCheckbox, IconMoodSadSquint, IconPencil, IconTrendingUp } from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム",
};

export default async function Page() {
  const username = await getUsername();
  const diaryResult = await fetchDiary(getDateStr());
  const goodHabits = await fetchLatestGoodHabits();
  const badHabits = await fetchLatestBadHabits();
  const negativeNotes = await fetchLatestNegativeNotes(2);
  const diaryCount = await getDiaryCount();
  const habitsCount = await getHabitsCount();
  const negativeNotesCount = await getNegativeNotesCount();

  const stats = [
    {
      title: "日記",
      value: diaryCount,
      description: "記録された日記",
      icon: IconPencil,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "習慣",
      value: habitsCount.total,
      description: `${habitsCount.good}個の良い習慣、${habitsCount.bad}個の悪い習慣`,
      icon: IconCheckbox,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "ネガティブノート",
      value: negativeNotesCount,
      description: "記録されたノート",
      icon: IconMoodSadSquint,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "継続日数",
      value:
        goodHabits.length > 0
          ? Math.max(
              ...goodHabits.map((h) => {
                const streak = Date.now() - new Date(h.restart).getTime();
                return Math.floor(streak / (1000 * 60 * 60 * 24));
              }),
            )
          : 0,
      description: "最長の継続日数",
      icon: IconTrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="flex size-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-3xl tracking-tight">おかえりなさい、{username}さん！</h1>
        <p className="text-muted-foreground text-sm">
          今日も一日お疲れ様でした。あなたの進捗を確認しましょう。
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`size-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">{stat.value}</div>
                <p className="text-muted-foreground text-xs">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Diary data={diaryResult.data} />
        </div>
        <div className="flex flex-col gap-6">
          <Habits goodHabits={goodHabits} badHabits={badHabits} />
          <NegativeNotes notes={negativeNotes} />
        </div>
      </div>
    </div>
  );
}
