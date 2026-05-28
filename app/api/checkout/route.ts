import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const { bookTitle, bookSubtitle, bookDescription } = await request.json();

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://mark-campbell-ph-d.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${bookTitle}: ${bookSubtitle}`,
              description: bookDescription,
              images: [],
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
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
