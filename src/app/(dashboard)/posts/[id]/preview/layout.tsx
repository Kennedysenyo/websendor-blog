import { ActionsBar } from "@/components/posts/preview-post/actions-bar";
import { ReactNode } from "react";

export default async function PreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative h-full">
      <ActionsBar />
      <div className=" h-full">{children}</div>
    </div>
  );
}
