import type { Metadata } from "next";
import { fetchHabits } from "@/actions/habits-actions";
import BadHabits from "@/components/containers/habits/bad-habits/bad-habits";
import GoodHabits from "@/components/containers/habits/good-habits/good-habits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "習慣",
};

export default async function Page() {
  const goodHabits = await fetchHabits("good");
  const badHabits = await fetchHabits("bad");

  return (
    <div className="size-full">
      <Tabs defaultValue="good" className="h-full w-full">
        <TabsList>
          <TabsTrigger value="good">続けたい習慣</TabsTrigger>
          <TabsTrigger value="bad">辞めたい習慣</TabsTrigger>
        </TabsList>
        <TabsContent value="good">
          <GoodHabits data={goodHabits} />
        </TabsContent>
        <TabsContent value="bad">
          <BadHabits data={badHabits} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
