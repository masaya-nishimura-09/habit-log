"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { createNegativeNote } from "@/actions/negative-notes-actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { NegativeNoteFormData, NegativeNoteFormState } from "@/types/negative-notes";
import InputDesiredState from "./input-fields/input-desired-state";
import InputEmotion from "./input-fields/input-emotion";
import InputEvent from "./input-fields/input-event";
import InputNegativeThoughts from "./input-fields/input-negative-thoughts";
import InputPhysicalReaction from "./input-fields/input-physical-reaction";

export default function NewNegativeNotes() {
  const today = new Date();
  const [pending, setPending] = useState<boolean>(false);
  const initialState: NegativeNoteFormState = { success: null, message: null, errors: {} };
  const [state, setState] = useState<NegativeNoteFormState>(initialState);

  const [formData, setFormData] = useState<NegativeNoteFormData>({
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(initialState);
    console.log(formData);
    const result = await createNegativeNote(formData);
    if (result.success) {
      location.reload();
    } else {
      setState(result);
      toast.error(result.message);
    }
    setPending(false);
  }

  return (
    <div className="size-full flex flex-col gap-4">
      <Toaster richColors position="top-center" />
      <form
        onSubmit={handleSubmit}
        id="new-negative-note"
        className="grid h-full md:grid-cols-2 gap-4"
      >
        <div className="flex h-full flex-col gap-4">
          <InputEvent formData={formData} setFormData={setFormData} state={state} />
          <InputEmotion formData={formData} setFormData={setFormData} state={state} />
        </div>
        <div className="flex h-full flex-col gap-4">
          <InputNegativeThoughts formData={formData} setFormData={setFormData} state={state} />
          <InputPhysicalReaction formData={formData} setFormData={setFormData} state={state} />
          <InputDesiredState formData={formData} setFormData={setFormData} state={state} />
        </div>
      </form>
      <div className="flex gap-2">
        <Button type="submit" form="new-negative-note" aria-disabled={pending}>
          {pending && <Spinner />}
          保存
        </Button>
        <Button type="button" variant="outline">
          キャンセル
        </Button>
      </div>
    </div>
  );
}
