import { NewPostBreadCrumb } from "@/components/new-post/post-breadcrumb";
import { NewPostForm } from "@/components/new-post/post-form";
import { requireSession } from "@/lib/better-auth/server-auth";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-full flex flex-col">
      <NewPostBreadCrumb />
      <NewPostForm />
    </div>
  );
}
