"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { negativeEmotions } from "@/lib/negative-notes/negative-emotions";
import { ja } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function NewNegativeNotes() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [_negativeThoughts, _setNegativeThoughtss] = useState();

  return (
    <Card>
      <CardHeader>
        <CardTitle>ネガティブノートを追加</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Select>
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
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">起きたこと</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="起きたことを入力して下さい。"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date" className="px-1">
              いつ
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                  {date ? date.toLocaleDateString() : "日付を選択"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                  locale={ja}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">場所</Label>
            <Input id="where" name="where" type="text" placeholder="場所を入力して下さい。" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="withWhom">誰と</Label>
            <Input
              id="withWhom"
              name="withWhom"
              type="text"
              placeholder="関わった人を入力して下さい。"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="userAction">行動</Label>
            <Input
              id="userAction"
              name="userAction"
              type="text"
              placeholder="そのときとった行動を入力して下さい。"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="negativeThoughts">頭に浮かんだネガティブワード</Label>
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                id="negativeThoughts"
                name="negativeThoughts"
                type="text"
                placeholder="そのとき頭に浮かんだネガティブワードを入力してください。"
              />
              <Button type="submit" variant="outline">
                追加
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reactions">身体反応や気分の変化</Label>
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                id="reactions"
                name="reactions"
                type="text"
                placeholder="例: 心拍が速くなった, 体が重い"
              />
              <Button type="submit" variant="outline">
                追加
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="idealState">本当はどういう状態だと安心できた？</Label>
            <Input id="idealState" name="idealState" type="text" placeholder="" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desiredTreatment">どう扱われたかった？</Label>
            <Input id="desiredTreatment" name="desiredTreatment" type="text" placeholder="" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desiredFeeling">どういう気持ちでいたい？</Label>
            <Input id="desiredFeeling" name="desiredFeeling" type="text" placeholder="" />
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
