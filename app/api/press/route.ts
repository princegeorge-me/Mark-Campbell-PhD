import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const entries = await sql`
      SELECT * FROM press_mentions
      ORDER BY display_order ASC, created_at ASC
    `;
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
