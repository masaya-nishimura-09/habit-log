"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NegativeNotesFormData } from "@/types/negative-notes";
import { useState } from "react";
import InputDesiredState from "./input-fields/input-desired-state";
import InputEmotion from "./input-fields/input-emotion";
import InputEvent from "./input-fields/input-event";
import InputNegativeThoughts from "./input-fields/input-negative-thoughts";
import InputPhysicalReaction from "./input-fields/input-physical-reaction";
export default function NewNegativeNotes() {
  const today = new Date();

  const [formData, setFormData] = useState<NegativeNotesFormData>({
    emotion: "Irritation",
    description: "",
    when: today,
    where: "",
    withWhom: "",
    userAction: "",
    negativeThoughts: [],
    reactions: [],
    idealState: "",
    desiredTreatment: "",
    desiredFeeling: "",
  });

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>ネガティブノートを作成</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <Tabs defaultValue="emotion" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="emotion">感情</TabsTrigger>
              <TabsTrigger value="event">出来事</TabsTrigger>
              <TabsTrigger value="negativeThoughts">ネガティブワード</TabsTrigger>
              <TabsTrigger value="physicalReaction ">身体反応</TabsTrigger>
              <TabsTrigger value="desiredState">望む状態</TabsTrigger>
            </TabsList>
            <TabsContent value="emotion">
              <InputEmotion formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="event">
              <InputEvent formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="negativeThoughts">
              <InputNegativeThoughts formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="physicalReaction ">
              <InputPhysicalReaction formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="desiredState">
              <InputDesiredState formData={formData} setFormData={setFormData} />
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="negative-note-form">
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
