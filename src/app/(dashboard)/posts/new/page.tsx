import { fetchCategories } from "@/actions/db/queries";
import { NewPostForm } from "@/components/posts/new-post/post-form";
import { NewPostHeader } from "@/components/posts/new-post/header";
import { requireSession } from "@/lib/better-auth/server-auth";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }
  const categories = await fetchCategories();
  return (
    <div className="h-full flex flex-col">
      <NewPostHeader />
      <NewPostForm categories={categories} />
    </div>
  );
}
