import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { negativeEmotions } from "@/lib/negative-notes/negative-emotions";
import { NegativeNoteFormData, NegativeNoteFormState } from "@/types/negative-notes";

export default function InputEmotion({
  formData,
  setFormData,
  state,
}: {
  formData: NegativeNoteFormData;
  setFormData: Dispatch<SetStateAction<NegativeNoteFormData>>;
  state: NegativeNoteFormState;
}) {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>今の感情は？</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Select
            defaultValue="Irritation"
            onValueChange={(value) =>
              setFormData({
                ...formData,
                emotion: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="感情を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>感情</SelectLabel>
                {negativeEmotions.map((emotion) => (
                  <SelectItem key={emotion.en} value={emotion.en}>
                    {emotion.jp}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.emotion?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
