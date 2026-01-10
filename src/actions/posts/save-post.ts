"use server";

import { requireSession } from "@/lib/better-auth/server-auth";
import { sql } from "../../../db/db";
import { handleError } from "@/utils/handle-error";
import { ReturnedData } from "./post-form-validator";

interface DataType {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  categoryId: string;
}
export const savePost = async (data: DataType): Promise<ReturnedData> => {
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
      !data.categoryId
    ) {
      throw new Error("Missing required post fields");
    }

    const insertedPost = await sql`
    INSERT INTO "posts" (
    "title", 
    "slug", 
    "contentMd", 
    "excerpt",
    "featuredImage", 
    "categoryId", 
    "authorId",
    "status"
    )
    VALUES (
    ${data.title}, 
    ${data.slug}, 
    ${data.content}, 
    ${data.excerpt}, 
    ${data.featuredImage}, 
    ${data.categoryId}, 
    ${authorId}, 
    'draft'
    ) RETURNING id;
    `;
    return { postId: insertedPost[0].id, errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
