"use client";

import postgres from "postgres";
import { Post } from "./post";
import { BreadCrumb, BreadCrumbType } from "@/components/crumb";

interface Props {
  post: postgres.Row;
}
// const urlList: BreadCrumbType[] = [
//   {
//     id: 1,
//     name: "Dashboard",
//     url: "/",
//   },
//   {
//     id: 2,
//     name: "Posts",
//     url: "/posts",
//   },
//   {
//     id: 3,
//     name: "Post Preview",
//     url: "/posts/[id]/preview",
//   },
// ];

export const MainPreview = ({ post }: Props) => {
  return (
    <div>
      {/* <BreadCrumb urlList={urlList} /> */}

      <Post post={post} />
    </div>
  );
};
