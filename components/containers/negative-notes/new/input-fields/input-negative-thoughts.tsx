import { IconCircleX } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NegativeNote, NegativeNoteFormState } from "@/types/negative-notes";

export default function InputNegativeThoughts({
  formData,
  setFormData,
  state,
}: {
  formData: NegativeNote;
  setFormData: Dispatch<SetStateAction<NegativeNote>>;
  state: NegativeNoteFormState;
}) {
  const [negativeThought, setNegativeThought] = useState({
    id: 0,
    name: "",
  });

  function handleNewNegativeThought(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!negativeThought.name) return;
    const updatedThoughts = [...formData.negativeThoughts, negativeThought];
    setFormData({
      ...formData,
      negativeThoughts: updatedThoughts,
    });
    setNegativeThought({
      id: ++negativeThought.id,
      name: "",
    });
  }

  function handleRemoveNegativeThought(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    const updatedThoughts = formData.negativeThoughts.filter((thought) => thought.id !== id);

    setFormData({
      ...formData,
      negativeThoughts: updatedThoughts,
    });
  }

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>頭に浮かんだネガティブワード</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            id="negativeThoughts"
            value={negativeThought.name}
            type="text"
            placeholder="例: イライラする, 自分はダメだ"
            onChange={(e) => setNegativeThought({ ...negativeThought, name: e.target.value })}
          />
          <Button type="button" variant="outline" onClick={handleNewNegativeThought}>
            追加
          </Button>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          {formData.negativeThoughts.map((thought) => (
            <Badge key={thought.id} variant="secondary">
              <div className="flex items-center gap-1">
                <span>{thought.name}</span>
                <button
                  type="button"
                  className="rounded-full"
                  onClick={(e) => handleRemoveNegativeThought(e, thought.id)}
                >
                  <IconCircleX size={18} />
                </button>
              </div>
            </Badge>
          ))}
        </div>
        {state?.errors?.negativeThoughts?.map((error: string) => (
          <p className="text-red-500 text-sm" key={error}>
            {error}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
