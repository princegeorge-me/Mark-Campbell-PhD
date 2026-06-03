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
    console.error("[stripe-webhook] Missing stripe-signature header");
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
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[stripe-webhook] Signature verification failed:", msg);
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET prefix:", process.env.STRIPE_WEBHOOK_SECRET?.slice(0, 12) ?? "NOT_SET");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("[stripe-webhook] Event received:", event.type);

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

    console.log("[stripe-webhook] Order details — customer:", customerEmail, "| book:", bookTitle, "| amount:", amount);

    const webhookUrl = process.env.GHL_ORDER_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("[stripe-webhook] GHL_ORDER_WEBHOOK_URL is not set in environment variables");
    } else if (!customerEmail) {
      console.error("[stripe-webhook] No customer email in session — skipping GHL");
    } else {
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

      console.log("[stripe-webhook] Sending to GHL:", webhookUrl.slice(0, 60) + "...");

      try {
        const ghlRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const ghlBody = await ghlRes.text();
        if (!ghlRes.ok) {
          console.error("[stripe-webhook] GHL responded with error:", ghlRes.status, ghlBody);
        } else {
          console.log("[stripe-webhook] GHL accepted the webhook:", ghlRes.status, ghlBody);
        }
      } catch (err) {
        console.error("[stripe-webhook] GHL fetch failed:", err instanceof Error ? err.message : String(err));
      }
    }
  }

  return NextResponse.json({ received: true });
}
