import { IconCircleX } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NegativeNoteFormData, NegativeNoteFormState } from "@/types/negative-notes";

export default function InputPhysicalReaction({
  formData,
  setFormData,
  state,
}: {
  formData: NegativeNoteFormData;
  setFormData: Dispatch<SetStateAction<NegativeNoteFormData>>;
  state: NegativeNoteFormState;
}) {
  const [reaction, setReaction] = useState({
    id: 0,
    name: "",
  });

  function handleNewReaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!reaction.name) return;
    const updatedReactions = [...formData.reactions, reaction];
    setFormData({
      ...formData,
      reactions: updatedReactions,
    });
    setReaction({
      id: ++reaction.id,
      name: "",
    });
  }

  function handleRemoveReaction(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    const updatedReactions = formData.reactions.filter((reaction) => reaction.id !== id);

    setFormData({
      ...formData,
      reactions: updatedReactions,
    });
  }

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>身体反応や気分の変化</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              id="reactions"
              value={reaction.name}
              type="text"
              placeholder="例: 心拍が速くなった, 体が重い"
              onChange={(e) => setReaction({ ...reaction, name: e.target.value })}
            />
            <Button type="button" variant="outline" onClick={handleNewReaction}>
              追加
            </Button>
          </div>
          <div className="flex w-full flex-wrap gap-2">
            {formData.reactions.map((reaction) => (
              <Badge key={reaction.id} variant="secondary">
                <div className="flex items-center gap-1">
                  <span>{reaction.name}</span>
                  <button
                    type="button"
                    className="rounded-full"
                    onClick={(e) => handleRemoveReaction(e, reaction.id)}
                  >
                    <IconCircleX size={18} />
                  </button>
                </div>
              </Badge>
            ))}
          </div>
          {state?.errors?.reactions?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
