import { betterAuth } from "better-auth";
import { Pool } from "pg";

const dbURL = process.env.DATABASE_URL;

if (!dbURL) {
  throw new Error(
    "DATABASE_URL environment variable is required to connect to db!"
  );
}

const pool = new Pool({
  connectionString: dbURL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
});
