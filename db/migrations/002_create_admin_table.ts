import { sql } from "../db";

export const up = async () => {
  await sql`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')),
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
      created_at TIMESTAMP NOT NULL DEFAULT now(),
      updated_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `;

  await sql`
    DROP TRIGGER IF EXISTS admins_updated_at ON admins;
  `;

  await sql`
    CREATE TRIGGER admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  `;
};
