"use server";

import { PostType } from "@/types/types";
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
