import { fetchPostById } from "@/actions/db/queries";
import { MainPreview } from "@/components/posts/preview-post/main";
import { requireSession } from "@/lib/better-auth/server-auth";
import { notFound, redirect } from "next/navigation";

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
  if (!postId) {
    notFound();
  }
  const post = await fetchPostById(postId);

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-green-100  ">
      <MainPreview post={post} />
    </div>
  );
}
