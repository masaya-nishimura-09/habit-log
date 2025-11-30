"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NegativeNotesFormData } from "@/types/negative-notes";
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
    <div className="size-full flex flex-col gap-4">
      <div className="grid h-full md:grid-cols-2 gap-4">
        <div className="flex h-full flex-col gap-4">
          <InputEvent formData={formData} setFormData={setFormData} />
          <InputEmotion formData={formData} setFormData={setFormData} />
        </div>
        <div className="flex h-full flex-col gap-4">
          <InputNegativeThoughts formData={formData} setFormData={setFormData} />
          <InputPhysicalReaction formData={formData} setFormData={setFormData} />
          <InputDesiredState formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" form="negative-note-form">
          保存
        </Button>
        <Button type="submit" variant="outline" form="negative-note-form">
          キャンセル
        </Button>
      </div>
    </div>
  );
}
