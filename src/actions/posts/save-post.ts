"use server";

import { requireSession } from "@/lib/better-auth/server-auth";
import { sql } from "../../../db/db";
import { handleError } from "@/utils/handle-error";

interface DataType {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: string;
  featuredImage: string;
}
export const savePost = async (data: DataType): Promise<string | null> => {
  try {
    // console.table(data);

    const session = await requireSession();
    const authorId = session?.user.id;
    if (!authorId) {
      throw new Error("Error! No User session found!");
    }

    if (
      !data.title ||
      !data.slug ||
      !data.content ||
      !data.featuredImage ||
      !data.categoryId ||
      !data.categoryId
    ) {
      throw new Error("Missing required post fields");
    }

    await sql`
    INSERT INTO "posts" ("title", "slug", "contentMd", "excerpt","featuredImage", "categoryId", "authorId","status")
    VALUES (${data.title}, ${data.slug}, ${data.content}, ${data.excerpt}, ${data.featuredImage}, ${data.categoryId}, ${authorId}, 'draft');
    `;
    return null;
  } catch (error) {
    return handleError(error);
  }
};
