import type { Metadata } from "next";
import NegativeNotes from "@/components/containers/negative-notes/negative-notes";

export const metadata: Metadata = {
  title: "ネガティブノート",
};

export default async function Page() {
  return (
    <div className="size-full">
      <NegativeNotes />
    </div>
  );
}
