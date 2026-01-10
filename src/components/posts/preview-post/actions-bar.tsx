"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChartLine, CloudUpload, EyeOff, FilePen } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";
interface Props {
  postStatus: string;
  postId: string;
}
export const ActionsBar = ({ postStatus, postId }: Props) => {
  const isMobile = useIsMobile();

  // const params = useParams();
  // const postId = params.id;

  return (
    <div
      className={cn(
        "absolute w-full left-1/2 -translate-x-1/2 z-5",
        isMobile && "md:hidden mb-1 bottom-0 -translate-y-1/2",
        !isMobile && "hidden md:block"
      )}
    >
      <div className="p-2 rounded-lg bg-white w-2/3 shadow-lg bg-green-500 max-w-[900px] mx-auto ">
        <div className="border border-gray-100 p-1 flex items-center gap-2 md:gap-4 justify-center">
          <Button
            className="flex items-center bg-brand-blue text-white rounded-md py-1 px-2 hover:bg-brand-blue/90"
            asChild
          >
            <Link href={`/posts/${postId}/edit`}>
              <FilePen className="size-4" />
              <span className="hidden md:block text-sm ml-1">Edit</span>
            </Link>
          </Button>
          <Button
            className="flex items-center bg-violet-600 text-white rounded-md py-1 px-2 hover:bg-violet-500/90"
            asChild
          >
            <Link href={`/posts/${postId}/seo`}>
              <ChartLine className="size-4" />
              <span className="hidden md:block text-sm ml-1">Edit SEO</span>
            </Link>
          </Button>

          {postStatus === "draft" ? (
            <>
              <Button
                onClick={() => {}}
                className="flex items-center bg-brand-green text-white rounded-md py-1 px-2 hover:bg-brand-green/90 cursor-pointer"
              >
                <CloudUpload className="size-4" />
                <span className="hidden md:block text-sm ml-1">Publish</span>
              </Button>
              <Button
                onClick={() => {}}
                className="flex items-center bg-black text-white rounded-md py-1 px-2 hover:bg-black/80 cursor-pointer"
              >
                <EyeOff className="size-4" />
                <span className="hidden md:block text-sm ml-1">Archive</span>
              </Button>
            </>
          ) : postStatus === "published" ? (
            <Button
              onClick={() => {}}
              className="flex items-center bg-black text-white rounded-md py-1 px-2 hover:bg-black/80 cursor-pointer"
            >
              <EyeOff className="size-4" />
              <span className="hidden md:block text-sm ml-1">Archive</span>
            </Button>
          ) : (
            <Button
              onClick={() => {}}
              className="flex items-center bg-brand-green text-white rounded-md py-1 px-2 hover:bg-brand-green/90 cursor-pointer"
            >
              <CloudUpload className="size-4" />
              <span className="hidden md:block text-sm ml-1">Publish</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
