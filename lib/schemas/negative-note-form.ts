import { z } from "zod";

export const NegativeNoteFormSchema = z.object({
  emotion: z
    .string({
      message: "感情を入力して下さい。",
    })
    .min(1, "感情を入力して下さい。"),
  description: z
    .string({
      message: "起きたことを入力して下さい。",
    })
    .min(1, "起きたことを入力して下さい。"),
  when: z.date({
    message: "時期を入力して下さい。",
  }),
  withWhom: z
    .string({
      message: "関わった人を入力して下さい。",
    })
    .min(1, "関わった人を入力して下さい。"),
  userAction: z
    .string({
      message: "その時の行動を入力して下さい。",
    })
    .min(1, "その時の行動を入力して下さい。"),
  negativeThoughts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  reactions: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  idealState: z
    .string({
      message: "望む状態を入力して下さい。",
    })
    .min(1, "望む状態を入力して下さい。"),
  desiredTreatment: z
    .string({
      message: "どう扱われたかったかを入力して下さい。",
    })
    .min(1, "どう扱われたかったかを入力して下さい。"),
  desiredFeeling: z
    .string({
      message: "どういう気持ちでいたかったかを入力して下さい。",
    })
    .min(1, "どういう気持ちでいたかったかを入力して下さい。"),
});
