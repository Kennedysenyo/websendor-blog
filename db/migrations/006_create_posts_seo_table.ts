import { sql } from "../db";

export const up = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS post_seo (
      "postId" UUID PRIMARY KEY REFERENCES posts("id") ON DELETE CASCADE,
      "metaTitle" TEXT,
      "metaDescription" TEXT,
      "keywords" TEXT,
      "ogTitle" TEXT,
      "ogDescription" TEXT,
      "ogImage" TEXT,
      "canonicalUrl" TEXT
    );
  `;
};
