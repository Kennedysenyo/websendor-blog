"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export const logOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
