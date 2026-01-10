"use server";

import { handleError } from "@/utils/handle-error";
import { sql } from "../../../db/db";

export const fetchCategories = async () => {
  const categories = await sql`
    SELECT id, name, slug FROM posts_categories;
  `;
  return categories;
};

export const fetchPostById = async (id: string) => {
  const post = await sql`
  SELECT 
    post."id", 
    post."title", 
    post."slug",
    post."contentMd", 
    post."excerpt", 
    post."featuredImage", 
    post."status",
    post."publishedAt",
    category."id" AS "categoryId",
    category."name" AS "category",
    author."name" AS "author"
  FROM "posts" post
  LEFT JOIN "posts_categories" category 
    ON category."id" = post."categoryId"
  LEFT JOIN "user" author 
    ON post."authorId" = author."id"
  WHERE post."id" = ${id};
`;

  return post[0];
};

export const fetPostStatus = async (id: string) => {
  const res = await sql`
    SELECT id, status FROM posts WHERE posts.id = ${id}
  `;

  return res[0];
};

export const setPostStatusToPublish = async (
  id: string
): Promise<string | null> => {
  try {
    await sql.begin(async (tx) => {
      await tx`
        UPDATE posts
        SET "status" = 'published'
        WHERE id = ${id};
      `;

      await tx`
        UPDATE post_seo
        SET "robots" = 'noindex, nofollow'
        WHERE postId = ${id};
      `;
    });
    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  }
};

export const setPostStatusToArchive = async (
  id: string
): Promise<string | null> => {
  try {
    await sql.begin(async (tx) => {
      await tx`
        UPDATE posts
        SET "status" = 'archived'
        WHERE id = ${id};
      `;

      await tx`
        UPDATE post_seo
        SET "robots" = 'noindex, nofollow'
        WHERE postId = ${id};
      `;
    });
    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  }
};
export const setPostStatusToDraft = async (
  id: string
): Promise<string | null> => {
  try {
    await sql.begin(async (tx) => {
      await tx`
        UPDATE posts
        SET "status" = 'draft'
        WHERE id = ${id};
      `;

      await tx`
        UPDATE post_seo
        SET "robots" = 'noindex, nofollow'
        WHERE postId = ${id};
      `;
    });

    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  }
};

// | Post Status | robots              |
// | ----------- | ------------------- |
// | `draft`     | `noindex, nofollow` |
// | `published` | `index, follow`     |
// | `archived`  | `noindex, follow`   |
