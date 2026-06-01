import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { name, organization, email, eventDate, message } =
      await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GHL_BOOKING_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GHL_BOOKING_WEBHOOK_URL is not set");
      return NextResponse.json(
        { error: "Booking service unavailable" },
        { status: 503 }
      );
    }

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] ?? name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      type: "booking_inquiry",
      firstName,
      lastName,
      email,
      name,
      organization: organization || "",
      eventDate: eventDate || "",
      message,
      source: "website_contact_form",
      tags: ["speaking-inquiry", "website-lead"],
    };

    const ghlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      console.error("GHL webhook error:", ghlRes.status, await ghlRes.text());
      return NextResponse.json(
        { error: "Failed to submit inquiry" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
