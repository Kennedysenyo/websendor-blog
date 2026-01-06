"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface FormErrors {
  email?: string;
  password?: string;
}

export interface FormStateType {
  errors: FormErrors;
  errorMessage: string | null;
  success: boolean;
}

// Server-side login using Better Auth
const login = async (email: string, password: string) => {
  const baseUrl = process.env.BETTER_AUTH_URL;
  if (!baseUrl) {
    throw new Error(
      "BETTER_AUTH_URL environment variable is required for login redirect!"
    );
  }

  try {
    const result = await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: await headers(),
    });
    console.log(result);
    return null;
  } catch (err) {
    return "Login failed. Please check your credentials.";
  }
};

// Validate login form server-side
export const validateLogin = async (
  _prevState: FormStateType,
  formData: FormData
): Promise<FormStateType> => {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const errors: FormErrors = {};

  if (!email) errors.email = "Email is required!";
  if (!password) errors.password = "Password is required!";

  if (Object.keys(errors).length > 0) {
    return { errors, success: false, errorMessage: null };
  }

  const errorMessage = await login(email, password);

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};
