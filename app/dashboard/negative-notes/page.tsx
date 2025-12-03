import type { Metadata } from "next";
import { fetchNegativeNotes } from "@/actions/negative-notes-actions";
import NegativeNotes from "@/components/containers/negative-notes/negative-notes";

export const metadata: Metadata = {
  title: "ネガティブノート",
};

export default async function Page() {
  const negativeNotes = await fetchNegativeNotes();

  return (
    <div className="size-full">
      <NegativeNotes negativeNotes={negativeNotes} />
    </div>
  );
}
