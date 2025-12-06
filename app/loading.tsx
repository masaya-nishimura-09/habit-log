import { IconNotebook } from "@tabler/icons-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-sm mx-6 md:w-md">
        <div className="mb-2 flex items-center justify-center gap-2 text-primary">
          <IconNotebook className="size-10 bg-red" />
          <span className="font-semibold text-2xl">Habit Log</span>
        </div>
        <CardContent className="p-5 flex flex-col w-full text-primary items-center justify-center gap-4">
          <Spinner className="size-20"/>
          <span className="text-xl">Loading...</span>
        </CardContent>
      </Card>
    </div>
  );
}
