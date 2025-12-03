import { ja } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDateToYYYYMMDD, getDateWithDayOfWeek } from "@/lib/date/date";
import { NegativeNote, NegativeNoteFormState } from "@/types/negative-notes";

export default function InputEvent({
  formData,
  setFormData,
  state,
}: {
  formData: NegativeNote;
  setFormData: Dispatch<SetStateAction<NegativeNote>>;
  state: NegativeNoteFormState;
}) {
  const [open, setOpen] = useState(false);

  const convertedDate = new Date(formData.when);
  const [date, setDate] = useState<Date | undefined>(convertedDate);

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>ネガティブだと思った出来事の説明</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="description">何が起きた？</Label>
          <Input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
          {state?.errors?.description?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="when" className="px-1">
            いつ起きた？
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                {formData.when ? getDateWithDayOfWeek(formData.when) : "日付を選択"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setFormData({
                    ...formData,
                    when: formatDateToYYYYMMDD(date),
                  });
                  setDate(date);
                  setOpen(false);
                }}
                locale={ja}
              />
            </PopoverContent>
          </Popover>
          {state?.errors?.when?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="where">どこで起きた？</Label>
          <Input
            id="where"
            type="text"
            value={formData.where}
            onChange={(e) =>
              setFormData({
                ...formData,
                where: e.target.value,
              })
            }
          />
          {state?.errors?.where?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="withWhom">誰がいた？</Label>
          <Input
            id="withWhom"
            type="text"
            value={formData.withWhom}
            onChange={(e) =>
              setFormData({
                ...formData,
                withWhom: e.target.value,
              })
            }
          />
          {state?.errors?.withWhom?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="userAction">そのとき何をした？</Label>
          <Input
            id="userAction"
            type="text"
            value={formData.userAction}
            onChange={(e) =>
              setFormData({
                ...formData,
                userAction: e.target.value,
              })
            }
          />
          {state?.errors?.userAction?.map((error: string) => (
            <p className="text-red-500 text-sm" key={error}>
              {error}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
