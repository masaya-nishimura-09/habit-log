import { IconNotebook } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-10 w-sm md:w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-primary">
            <IconNotebook className="size-6 bg-red" />
            <span className="font-semibold text-xl">Growth Journal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-center justify-center gap-4 py-4 text-primary">
          <Spinner className="size-16" />
          <span className="text-xl">Loading...</span>
        </CardContent>
      </Card>
    </div>
  );
}
