import { fetPostStatus } from "@/actions/db/queries";
import { ActionsBar } from "@/components/posts/preview-post/actions-bar";
import { ReactNode } from "react";

export default async function PreviewLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetPostStatus(id);
  return (
    <div className="relative h-full">
      <ActionsBar postId={post.id} postStatus={post.status} />
      <div className=" h-full">{children}</div>
    </div>
  );
}
