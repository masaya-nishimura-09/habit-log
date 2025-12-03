import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NegativeNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ネガティブノート一覧</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="default">
            <Link href="/dashboard/negative-notes/new">新規作成</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  );
}
