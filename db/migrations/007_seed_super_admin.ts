import { sql } from "../db";
import { randomUUID } from "crypto";
import argon2 from "argon2";

export const up = async () => {
  const id = randomUUID();
  const email = "kensenyocoding@gmail.com";
  const password = "Xenyo2wo@";

  const passwordHash = await argon2.hash(password);

  // 1. Insert user
  await sql`
    INSERT INTO "user" (
      id,
      name,
      email,
      email_verified,
      role,
      is_active
    )
    VALUES (
      ${id},
      'Kennedy Senyo',
      ${email},
      true,
      'super_admin',
      true
    )
    ON CONFLICT (email) DO NOTHING;
  `;

  // 2. Insert password-based account (Better Auth expects this)
  await sql`
    INSERT INTO account (
      id,
      account_id,
      provider_id,
      user_id,
      password
    )
    VALUES (
      ${randomUUID()},
      ${email},
      'credentials',
      ${id},
      ${passwordHash}
    )
    ON CONFLICT DO NOTHING;
  `;

  console.log("✅ Super admin seeded");
};
