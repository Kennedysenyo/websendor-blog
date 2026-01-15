import { fetchAllPosts } from "@/actions/db/queries";
import { AddButton } from "@/components/AddButton";
import { PostTable } from "@/components/posts/all-posts/table";

export default async function PostsPage() {
  const posts = await fetchAllPosts();
  // console.table(posts);
  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto">
      <div className="p-4 flex justify-between">
        <AddButton label="Add Post" />
      </div>
      <PostTable posts={posts} />
    </div>
  );
}
