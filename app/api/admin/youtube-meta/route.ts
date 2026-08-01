import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(oembedUrl);
  if (!res.ok) {
    return NextResponse.json({ error: "Could not fetch video metadata" }, { status: 400 });
  }

  const data = await res.json();
  return NextResponse.json({
    title: data.title as string,
    thumbnail: data.thumbnail_url as string,
    author: data.author_name as string,
  });
}
