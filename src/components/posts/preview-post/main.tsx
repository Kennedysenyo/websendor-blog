"use client";

import postgres from "postgres";
import { Post } from "./post";

interface Props {
  post: postgres.Row;
}
export const MainPreview = ({ post }: Props) => {
  return <Post post={post} />;
};
