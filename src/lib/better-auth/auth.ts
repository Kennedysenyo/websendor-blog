import { sendEmail } from "@/actions/emails/email-verification";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
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

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: url,
      });
    },
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    sendOnSignUp: true,
    requireEmailVerification: true,
  },
  plugins: [nextCookies()],
});
