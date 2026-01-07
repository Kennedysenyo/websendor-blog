import { sql } from "../db";

export const up = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS post_seo (
      post_id UUID PRIMARY KEY REFERENCES posts(id) ON DELETE CASCADE,
      meta_title TEXT,
      meta_description TEXT,
      keywords TEXT,
      og_title TEXT,
      og_description TEXT,
      og_image TEXT,
      canonical_url TEXT
    );
  `;
};
