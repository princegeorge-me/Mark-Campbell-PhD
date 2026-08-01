import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await requireAuth();
    const entries = await sql`
      SELECT * FROM press_mentions
      ORDER BY display_order ASC, created_at ASC
    `;
    return NextResponse.json(entries);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { outlet, badge, headline, url, year, image, object_position, is_video } = await req.json();

    const [entry] = await sql`
      INSERT INTO press_mentions (outlet, badge, headline, url, year, image, object_position, is_video, display_order)
      VALUES (
        ${outlet}, ${badge}, ${headline}, ${url}, ${year}, ${image},
        ${object_position ?? "center 50%"}, ${is_video ?? false},
        (SELECT COALESCE(MAX(display_order), 0) + 1 FROM press_mentions)
      )
      RETURNING *
    `;
    return NextResponse.json(entry, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 });
  }
}
