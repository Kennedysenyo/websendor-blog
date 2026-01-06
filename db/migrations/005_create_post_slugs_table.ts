import { sql } from "../db";

export const up = async () => {
  await sql`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS post_slugs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      slug TEXT NOT NULL,
      is_current BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `;

  // ensure one current slug per post
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS post_slugs_one_current
    ON post_slugs (post_id)
    WHERE is_current = true;
  `;

  // speed up slug lookups
  await sql`
    CREATE INDEX IF NOT EXISTS post_slugs_slug_idx
    ON post_slugs (slug);
  `;
};
