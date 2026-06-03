import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export async function POST(request: NextRequest) {
  // Guard: fail fast with a clear log if the key is missing
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe checkout error: STRIPE_SECRET_KEY is not set in environment variables");
    return NextResponse.json(
      { error: "Payment service misconfigured", detail: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  try {
    const { bookTitle, bookSubtitle, bookDescription, coverImage } = await request.json();

    const baseUrl = (
      process.env.NEXT_PUBLIC_BASE_URL || "https://mark-campbell-ph-d.vercel.app"
    ).trim();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${bookTitle}: ${bookSubtitle}`,
              description: bookDescription,
              ...(coverImage
                ? { images: [`${baseUrl}${coverImage}`] }
                : {}),
            },
            unit_amount: 2495, // $24.95
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&book=${encodeURIComponent(bookTitle)}`,
      cancel_url: `${baseUrl}/#books`,
      metadata: {
        bookTitle,
        bookSubtitle,
      },
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "NG", "ZA"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    // Log Stripe-specific fields when available for easier diagnosis
    const stripeErr = error as Record<string, unknown>;
    console.error(
      "Stripe checkout error:",
      JSON.stringify({
        message: errMsg,
        type: stripeErr?.type,
        code: stripeErr?.code,
        statusCode: stripeErr?.statusCode,
        keyPrefix: process.env.STRIPE_SECRET_KEY?.slice(0, 8) ?? "NOT_SET",
      })
    );
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: errMsg },
      { status: 500 }
    );
  }
}
