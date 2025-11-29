import NewNegativeNotes from "@/components/containers/negative-notes/new/new-negative-notes";
import type { Metadata } from "next";

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
