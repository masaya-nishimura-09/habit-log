"use server";

import { getUserId } from "@/actions/user-actions";
import { NegativeNoteFormSchema } from "@/lib/schemas/negative-note-form";
import { supabase } from "@/lib/supabase";
import { NegativeNoteFormData } from "@/types/negative-notes";

export async function createNegativeNote(formData: NegativeNoteFormData) {
  const validatedFields = NegativeNoteFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ネガティブノートの新規登録に失敗しました。",
    };
  }

  const validatedData = validatedFields.data;
  const userId = await getUserId();

  const { data, error: negativeNoteError } = await supabase
    .from("negative_notes")
    .insert({
      user_id: userId,
      emotion: validatedData.emotion,
      description: validatedData.description,
      when: validatedData.when,
      with_whom: validatedData.withWhom,
      user_action: validatedData.userAction,
      ideal_state: validatedData.idealState,
      desired_treatment: validatedData.desiredTreatment,
      desired_feeling: validatedData.desiredFeeling,
    })
    .select()
    .single();

  if (negativeNoteError) {
    console.error("Database error:", negativeNoteError.message);
    return {
      success: false,
      message: "ネガティブノートの新規登録に失敗しました。",
    };
  }

  const newNegativeThoughts = validatedData.negativeThoughts.map((thought) => ({
    user_id: userId,
    note_id: data.id,
    name: thought.name,
  }));

  const { error: negativeThoughtsError } = await supabase
    .from("negative_thoughts")
    .insert(newNegativeThoughts);

  if (negativeThoughtsError) {
    console.error("Database error:", negativeThoughtsError.message);
    return {
      success: false,
      message: "ネガティブノートの新規登録に失敗しました。",
    };
  }

  const newReactions = validatedData.reactions.map((reaction) => ({
    user_id: userId,
    note_id: data.id,
    name: reaction.name,
  }));

  const { error: reactionsError } = await supabase.from("reactions").insert(newReactions);

  if (reactionsError) {
    console.error("Database error:", reactionsError.message);
    return {
      success: false,
      message: "ネガティブノートの新規登録に失敗しました。",
    };
  }

  return { success: true };
}
