"use server";

import { getUserId } from "@/actions/user-actions";
import { NegativeNoteFormSchema } from "@/lib/schemas/negative-note-form";
import { supabase } from "@/lib/supabase";
import { NegativeNote } from "@/types/negative-notes";

export async function createNegativeNote(formData: NegativeNote) {
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
      where: validatedData.where,
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

export async function fetchNegativeNote(id: number) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("negative_notes")
    .select(
      `
      id,
      emotion,
      description,
      when,
      where,
      with_whom,
      user_action,
      ideal_state,
      desired_treatment,
      desired_feeling,
      created_at,
      negative_thoughts (
        id,
        name,
        note_id
      ),
      reactions (
        id,
        name,
        note_id
      )`,
    )
    .eq("user_id", userId)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "ネガティブノートの取得に失敗しました。",
    };
  }

  if (!data) {
    return {
      success: false,
      message: "ネガティブノートの取得に失敗しました。",
    };
  } else {
    const convertedData = {
      id: data?.id,
      emotion: data?.emotion,
      description: data?.description,
      when: data?.when,
      where: data?.where,
      withWhom: data?.with_whom,
      userAction: data?.user_action,
      idealState: data?.ideal_state,
      desiredTreatment: data?.desired_treatment,
      desiredFeeling: data?.desired_feeling,
      createdAt: data?.created_at,
      negativeThoughts: data?.negative_thoughts.map((negativeThought) => ({
        id: negativeThought.id,
        name: negativeThought.name,
      })),
      reactions: data?.reactions.map((reaction) => ({
        id: reaction.id,
        name: reaction.name,
      })),
    };

    return {
      success: true,
      data: convertedData,
    };
  }
}

export async function fetchNegativeNotes() {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("negative_notes")
    .select(
      `
      id,
      emotion,
      description,
      when,
      where,
      with_whom,
      user_action,
      ideal_state,
      desired_treatment,
      desired_feeling,
      created_at,
      negative_thoughts (
        id,
        name,
        note_id
      ),
      reactions (
        id,
        name,
        note_id
      )`,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error:", error);
    return [];
  }
  if (!data || data.length < 1) {
    return [];
  }

  const convertedData = data.map((row) => ({
    id: row.id,
    emotion: row.emotion,
    description: row.description,
    when: row.when,
    where: row.where,
    withWhom: row.with_whom,
    userAction: row.user_action,
    idealState: row.ideal_state,
    desiredTreatment: row.desired_treatment,
    desiredFeeling: row.desired_feeling,
    createdAt: row.created_at,
    negativeThoughts: row.negative_thoughts.map((negativeThought) => ({
      id: negativeThought.id,
      name: negativeThought.name,
    })),
    reactions: row.reactions.map((reaction) => ({
      id: reaction.id,
      name: reaction.name,
    })),
  }));

  return convertedData || [];
}

export async function fetchLatestNegativeNotes(limit: number) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("negative_notes")
    .select(
      `
      id,
      emotion,
      description,
      when,
      where,
      with_whom,
      user_action,
      ideal_state,
      desired_treatment,
      desired_feeling,
      created_at,
      negative_thoughts (
        id,
        name,
        note_id
      ),
      reactions (
        id,
        name,
        note_id
      )`,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Database Error:", error);
    return [];
  }
  if (!data || data.length < 1) {
    return [];
  }

  const convertedData = data.map((row) => ({
    id: row.id,
    emotion: row.emotion,
    description: row.description,
    when: row.when,
    where: row.where,
    withWhom: row.with_whom,
    userAction: row.user_action,
    idealState: row.ideal_state,
    desiredTreatment: row.desired_treatment,
    desiredFeeling: row.desired_feeling,
    createdAt: row.created_at,
    negativeThoughts: row.negative_thoughts.map((negativeThought) => ({
      id: negativeThought.id,
      name: negativeThought.name,
    })),
    reactions: row.reactions.map((reaction) => ({
      id: reaction.id,
      name: reaction.name,
    })),
  }));

  return convertedData || [];
}


export async function updateNegativeNote(formData: NegativeNote) {
  const validatedFields = NegativeNoteFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  const validatedData = validatedFields.data;
  const userId = await getUserId();

  console.log(formData);

  const { error: negativeNoteError } = await supabase.from("negative_notes").upsert(
    {
      id: formData.id,
      user_id: userId,
      emotion: validatedData.emotion,
      description: validatedData.description,
      when: validatedData.when,
      where: validatedData.where,
      with_whom: validatedData.withWhom,
      user_action: validatedData.userAction,
      ideal_state: validatedData.idealState,
      desired_treatment: validatedData.desiredTreatment,
      desired_feeling: validatedData.desiredFeeling,
    },
    { onConflict: "id" },
  );
  if (negativeNoteError) {
    console.error("Database error:", negativeNoteError.message);
    return {
      success: false,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  const { error: deleteNegativeThoughtsError } = await supabase
    .from("negative_thoughts")
    .delete()
    .eq("user_id", userId)
    .eq("note_id", formData.id);

  if (deleteNegativeThoughtsError) {
    console.error("Database Error:", deleteNegativeThoughtsError);
    return {
      success: false,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  const newNegativeThoughts = validatedData.negativeThoughts.map((thought) => ({
    user_id: userId,
    note_id: formData.id,
    name: thought.name,
  }));

  const { error: negativeThoughtsError } = await supabase
    .from("negative_thoughts")
    .insert(newNegativeThoughts);

  if (negativeThoughtsError) {
    console.error("Database error:", negativeThoughtsError.message);
    return {
      success: false,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  const { error: deleteReactionsError } = await supabase
    .from("reactions")
    .delete()
    .eq("user_id", userId)
    .eq("note_id", formData.id);

  if (deleteReactionsError) {
    console.error("Database Error:", deleteReactionsError);
    return {
      success: false,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  const newReactions = validatedData.reactions.map((reaction) => ({
    user_id: userId,
    note_id: formData.id,
    name: reaction.name,
  }));

  const { error: reactionsError } = await supabase.from("reactions").insert(newReactions);

  if (reactionsError) {
    console.error("Database error:", reactionsError.message);
    return {
      success: false,
      message: "ネガティブノートの編集に失敗しました。",
    };
  }

  return { success: true };
}

export async function deleteNegativeNote(negativeNoteId: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from("negative_notes")
    .delete()
    .eq("user_id", userId)
    .eq("id", negativeNoteId);

  if (error) {
    console.error("Database Error:", error);
    throw new Error("ネガティブノートの削除に失敗しました。");
  }
}

export async function getNegativeNotesCount() {
  const userId = await getUserId();

  const { count, error } = await supabase
    .from("negative_notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    console.error("Database Error:", error);
    return 0;
  }

  return count || 0;
}
