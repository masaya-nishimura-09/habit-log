export const negativeEmotions: { jp: string; en: string }[] = [
  { jp: "いらだち", en: "Irritation" },
  { jp: "怒り", en: "Anger" },
  { jp: "不安", en: "Anxiety" },
  { jp: "恐れ", en: "Fear" },
  { jp: "悲しみ", en: "Sadness" },
  { jp: "落胆", en: "Disappointment" },
  { jp: "孤独", en: "Loneliness" },
  { jp: "罪悪感", en: "Guilt" },
  { jp: "恥ずかしさ", en: "Shame" },
  { jp: "嫉妬", en: "Jealousy" },
  { jp: "焦り", en: "Impatience" },
  { jp: "混乱", en: "Confusion" },
  { jp: "無力感", en: "Helplessness" },
  { jp: "絶望", en: "Despair" },
  { jp: "緊張", en: "Tension" },
  { jp: "悲観", en: "Pessimism" },
  { jp: "孤立感", en: "Isolation" },
  { jp: "疑念", en: "Doubt" },
  { jp: "疲労感", en: "Fatigue" },
];

export function getEmotionJp(emotionEn: string) {
  const emotion = negativeEmotions.filter(
    (negativeEmotion) => negativeEmotion.en === emotionEn,
  );
    return emotion[0].jp;
}
