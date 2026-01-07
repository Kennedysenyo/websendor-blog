import { sql } from "../db";

export const up = async () => {
  await sql`
    ALTER TABLE users
      ADD COLUMN role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin','admin')),
      ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true,
      ADD COLUMN created_by UUID REFERENCES users(id);
  `;
};
