"use client";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  label: string;
}
export const AddButton = ({ label }: Props) => {
  return (
    <Button
      asChild
      className="text-white bg-brand-blue hover:bg-brand-blue/90 cursor-pointer"
    >
      <Link href="/posts/new">
        <Plus className="size-5" />
        <span className="hidden sm:block">{label}</span>
      </Link>
    </Button>
  );
};
