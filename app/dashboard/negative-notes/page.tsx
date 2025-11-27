import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ネガティブノート",
};

export default async function Page() {
  return (
    <div className="size-full">
      <h1>ネガティブノート</h1>
    </div>
  );
}
