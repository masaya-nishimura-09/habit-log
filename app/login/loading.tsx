import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/lib/logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-10 w-sm md:w-md">
        <CardHeader>
          <CardTitle className="my-4 flex items-center justify-center gap-2 text-primary">
            <Logo size={2} color={"blue"} />
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
