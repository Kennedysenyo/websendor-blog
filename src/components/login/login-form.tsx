"use client";

import { LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
interface FormStateType {
  errorMessage: string | null;
  success: boolean;
}
export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<FormStateType>({
    errorMessage: null,
    success: false,
  });

  const handleFormChange = () => {};

  const handleLogin = () => {};
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        <h3 className="text-2xl font-serif font-bold text-brand-blue mb-8">
          Login
        </h3>
        {state.errorMessage && (
          <p className="text-red-500 text-center pt-1 capitalize">
            {state.errorMessage}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-brand-blue"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
              placeholder="john@doe.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-brand-blue"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl h-14 text-lg font-bold transition-all shadow-lg hover:shadow-brand-blue/20"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <LogIn className="ml-2 h-5 w-5" />
                Login
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
