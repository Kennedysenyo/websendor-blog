import { sql } from "../db";

export const up = async () => {
  await sql`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content_md TEXT NOT NULL,
      excerpt TEXT,
      featured_image TEXT NOT NULL,
      category_id UUID NOT NULL REFERENCES posts_categories(id),
      author_id UUID NOT NULL REFERENCES admins(id),
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
      published_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT now(),
      updated_at TIMESTAMP NOT NULL DEFAULT now(),
      CHECK (
        (status = 'draft' AND published_at IS NULL)
        OR
        (status = 'published' AND published_at IS NOT NULL)
      )
    );
  `;

  await sql`
    DROP TRIGGER IF EXISTS posts_updated_at ON posts;
  `;

  await sql`
    CREATE TRIGGER posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  `;
};
