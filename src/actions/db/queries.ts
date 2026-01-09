"use server";

import { sql } from "../../../db/db";

export const fetchCategories = async () => {
  const categories = await sql`
    SELECT id, name, slug FROM posts_categories;
  `;
  return categories;
};
