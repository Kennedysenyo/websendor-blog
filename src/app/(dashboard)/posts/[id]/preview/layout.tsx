import { ActionsBar } from "@/components/posts/preview-post/actions-bar";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full">
      <ActionsBar />
      <div className=" h-full">{children}</div>
      <ActionsBar />
    </div>
  );
}
