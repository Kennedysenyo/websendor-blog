"use server";

import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }
    await del(url);
    return NextResponse.json(
      { message: "Image Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: error as string }, { status: 400 });
  }
};
