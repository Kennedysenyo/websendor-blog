import { fetchCategories } from "@/actions/db/queries";
import { NewPostBreadCrumb } from "@/components/posts/new-post/post-breadcrumb";
import { NewPostForm } from "@/components/posts/new-post/post-form";
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
      <NewPostBreadCrumb />
      <NewPostForm categories={categories} />
    </div>
  );
}
