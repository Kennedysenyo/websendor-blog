import { fetCategoriesAndPostsTotalPages } from "@/actions/db/queries";
import { AddButton } from "@/components/AddButton";
import { Filter } from "@/components/posts/all-posts/filter";
import { PostTable } from "@/components/posts/all-posts/table";
import { Suspense } from "react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string | string[];
    page?: string;
    cat?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const term = Array.isArray(params) ? (params[0] ?? "") : params.query || "";
  const category = params.cat || "";
  const status = params.status || "";
  const currentPage = params.page || "1";
  const { totalPages, categories } = await fetCategoriesAndPostsTotalPages(
    term,
    category,
    status
  );
  // console.table(posts);
  return (
    <div className="p-4 md:px-8 h-full flex flex-col overflow-y-auto">
      <div className="p-4 flex justify-between">
        <Filter categories={categories} />
        <AddButton label="Add Post" />
      </div>
      <Suspense
        key={term + category + status + currentPage}
        fallback={<div className="h-full bg-green">Loading...</div>}
      >
        <PostTable
          currentPage={currentPage}
          term={term}
          category={category}
          status={status}
        />
      </Suspense>
    </div>
  );
}
