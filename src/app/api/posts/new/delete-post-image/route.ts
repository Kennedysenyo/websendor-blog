"use server";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }
    const date = new Date();
    const dateString = date.toLocaleDateString().split("/").join("-");
    const timeString = date.toUTCString().split(" ")[4].split(":").join("-");

    const { url } = await put(`posts/${dateString}-${timeString}`, file, {
      access: "public",
    });
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: error as string }, { status: 400 });
  }
};
