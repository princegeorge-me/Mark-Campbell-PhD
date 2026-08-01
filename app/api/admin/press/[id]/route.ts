import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error("Unauthorized");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const { outlet, badge, headline, url, year, image, object_position, is_video } = await req.json();

    const [entry] = await sql`
      UPDATE press_mentions SET
        outlet          = ${outlet},
        badge           = ${badge},
        headline        = ${headline},
        url             = ${url},
        year            = ${year},
        image           = ${image},
        object_position = ${object_position},
        is_video        = ${is_video}
      WHERE id = ${id}
      RETURNING *
    `;
    return NextResponse.json(entry);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    await sql`DELETE FROM press_mentions WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
