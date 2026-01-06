"use client";

import { useTransition } from "react";
import { Spinner } from "./ui/spinner";
import { logOut } from "@/actions/logout";

function LogOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignout = () => {
    startTransition(async () => {
      await logOut();
    });
  };
  return (
    <button
      onClick={handleSignout}
      className="py-2 px-4 bg-brand-blue text-white font-md rounded-md cursor-pointer"
    >
      {isPending ? <Spinner className="ml-2 h-5 w-5" /> : "Log out"}
    </button>
  );
}

export default LogOutButton;
