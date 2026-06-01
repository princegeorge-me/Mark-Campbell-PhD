import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// ── Webhook Handler ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerName = session.customer_details?.name || "Valued Reader";
    const customerEmail = session.customer_details?.email || "";
    const bookTitle = session.metadata?.bookTitle || "Book";
    const bookSubtitle = session.metadata?.bookSubtitle || "";
    const amount = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : "24.95";
    const orderId = session.id.slice(-10).toUpperCase();

    const webhookUrl = process.env.GHL_ORDER_WEBHOOK_URL;
    if (webhookUrl && customerEmail) {
      const nameParts = customerName.trim().split(" ");
      const firstName = nameParts[0] ?? customerName;
      const lastName = nameParts.slice(1).join(" ") || "";

      const payload = {
        type: "book_purchase",
        firstName,
        lastName,
        email: customerEmail,
        name: customerName,
        bookTitle,
        bookSubtitle,
        amountPaid: amount,
        orderId,
        source: "stripe_checkout",
        tags: ["book-buyer", "customer"],
      };

      try {
        const ghlRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!ghlRes.ok) {
          console.error("GHL order webhook error:", ghlRes.status, await ghlRes.text());
        }
      } catch (err) {
        console.error("GHL order webhook fetch error:", err);
        // Don't fail — payment already succeeded
      }
    }
  }

  return NextResponse.json({ received: true });
}
