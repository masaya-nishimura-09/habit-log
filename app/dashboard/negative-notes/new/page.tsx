import type { Metadata } from "next";
import NewNegativeNotes from "@/components/containers/negative-notes/new/new-negative-notes";

export const metadata: Metadata = {
  title: "ネガティブノートの作成",
};

export default function Page() {
  return (
    <div className="size-full">
      <NewNegativeNotes />
    </div>
  );
}
