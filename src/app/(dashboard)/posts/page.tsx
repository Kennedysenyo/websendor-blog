import { fetchAllPosts, fetchCategories } from "@/actions/db/queries";
import { AddButton } from "@/components/AddButton";
import { Filter } from "@/components/posts/all-posts/filter";
import { PostTable } from "@/components/posts/all-posts/table";

export default async function PostsPage() {
  const categories = await fetchCategories();

  // console.table(posts);
  return (
    <div className="p-4 md:px-8 h-full flex flex-col overflow-y-auto">
      <div className="p-4 flex justify-between">
        <Filter categories={categories} />
        <AddButton label="Add Post" />
      </div>
      {/* <PostTable posts={posts} /> */}
    </div>
  );
}
