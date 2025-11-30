import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NegativeNoteFormData, NegativeNoteFormState } from "@/types/negative-notes";

export default function InputDesiredState({
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
        <CardTitle>本当はどうなりたいか</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="idealState">本当はどういう状態だと安心できた？</Label>
          <Input
            id="idealState"
            type="text"
            value={formData.idealState}
            onChange={(e) =>
              setFormData({
                ...formData,
                idealState: e.target.value,
              })
            }
          />
          {state?.errors?.idealState?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="desiredTreatment">どう扱われたかった？</Label>
          <Input
            id="desiredTreatment"
            type="text"
            value={formData.desiredTreatment}
            onChange={(e) =>
              setFormData({
                ...formData,
                desiredTreatment: e.target.value,
              })
            }
          />
          {state?.errors?.desiredTreatment?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="desiredFeeling">どういう気持ちでいたい？</Label>
          <Input
            id="desiredFeeling"
            type="text"
            value={formData.desiredFeeling}
            onChange={(e) =>
              setFormData({
                ...formData,
                desiredFeeling: e.target.value,
              })
            }
          />
          {state?.errors?.desiredFeeling?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
