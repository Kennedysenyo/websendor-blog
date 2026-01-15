import { MainPreview } from "@/components/posts/preview-post/main";
import { requireSession } from "@/lib/better-auth/server-auth";
import { redirect } from "next/navigation";

export default async function PostPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }
  const postId = (await params).id;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <MainPreview postId={postId} />
    </div>
  );
}
