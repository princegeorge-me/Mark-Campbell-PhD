import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// ── Email: Buyer ──────────────────────────────────────────────────────────────
function buyerEmail({
  name,
  bookTitle,
  bookSubtitle,
  amount,
  orderId,
}: {
  name: string;
  bookTitle: string;
  bookSubtitle: string;
  amount: string;
  orderId: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B0F19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0B0F19,#1a1f2e);padding:40px 40px 30px;border-bottom:2px solid #E41133;">
            <p style="margin:0 0 4px;color:#E41133;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">Order Confirmed</p>
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.02em;">Thank You, ${name}!</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;color:#9CA3AF;font-size:15px;line-height:1.7;">
              Your purchase is confirmed. You will receive your digital copy and any physical shipping details via a follow-up email from Dr. Campbell's team.
            </p>

            <!-- Order Details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;border:1px solid rgba(255,255,255,0.07);border-radius:4px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Book Purchased</p>
                  <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;">${bookTitle}</p>
                  <p style="margin:2px 0 0;color:#E41133;font-size:13px;">${bookSubtitle}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <p style="margin:0;color:#6B7280;font-size:12px;">Order ID: <span style="color:#9CA3AF;font-family:monospace;">#${orderId}</span></p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 24px;">
                  <p style="margin:0;color:#6B7280;font-size:12px;">Amount Paid: <span style="color:#ffffff;font-weight:700;">$${amount}</span></p>
                </td>
              </tr>
            </table>

            <!-- About the Author -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(228,17,51,0.06);border:1px solid rgba(228,17,51,0.15);border-radius:4px;padding:20px 24px;margin-bottom:28px;">
              <tr>
                <td>
                  <p style="margin:0 0 6px;color:#E41133;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">About the Author</p>
                  <p style="margin:0;color:#D1D5DB;font-size:13.5px;line-height:1.7;">
                    Dr. Mark Campbell is Vice President of Information Technology for the Houston Rockets, former CIO of the City of Atlanta and the Chicago White Sox, award-winning author, and nationally recognized keynote speaker.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#6B7280;font-size:13px;line-height:1.6;">
              Questions about your order? Reply to this email or reach us at <a href="mailto:info@markcampbellphd.com" style="color:#E41133;text-decoration:none;">info@markcampbellphd.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0B0F19;padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:700;">Dr. Mark Campbell, PhD</p>
            <p style="margin:0;color:#4B5563;font-size:11px;">markcampbellphd.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

// ── Email: Professor ──────────────────────────────────────────────────────────
function professorEmail({
  customerName,
  customerEmail,
  bookTitle,
  bookSubtitle,
  amount,
  orderId,
}: {
  customerName: string;
  customerEmail: string;
  bookTitle: string;
  bookSubtitle: string;
  amount: string;
  orderId: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B0F19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0B0F19,#1a1f2e);padding:36px 40px 28px;border-bottom:2px solid #E41133;">
            <p style="margin:0 0 4px;color:#E41133;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">New Sale</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-0.02em;">Book Purchase Notification</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;color:#9CA3AF;font-size:14px;line-height:1.7;">
              A new book sale has been completed through your website.
            </p>

            <!-- Sale Details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;border:1px solid rgba(255,255,255,0.07);border-radius:4px;margin-bottom:24px;">
              <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Book</p>
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;">${bookTitle}: ${bookSubtitle}</p>
              </td></tr>
              <tr><td style="padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Buyer Name</p>
                <p style="margin:0;color:#D1D5DB;font-size:14px;">${customerName}</p>
              </td></tr>
              <tr><td style="padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Buyer Email</p>
                <p style="margin:0;color:#D1D5DB;font-size:14px;">${customerEmail}</p>
              </td></tr>
              <tr><td style="padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Amount</p>
                <p style="margin:0;color:#ffffff;font-size:14px;font-weight:700;">$${amount}</p>
              </td></tr>
              <tr><td style="padding:14px 24px;">
                <p style="margin:0 0 2px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Order ID</p>
                <p style="margin:0;color:#9CA3AF;font-size:13px;font-family:monospace;">#${orderId}</p>
              </td></tr>
            </table>

            <p style="margin:0;color:#6B7280;font-size:12px;">
              View full details in your <a href="https://dashboard.stripe.com" style="color:#E41133;text-decoration:none;">Stripe Dashboard</a>.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0B0F19;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;color:#4B5563;font-size:11px;">markcampbellphd.com — automated order notification</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

// ── Webhook Handler ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });
  const resend = new Resend(process.env.RESEND_API_KEY);

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

    const customerName =
      session.customer_details?.name || "Valued Reader";
    const customerEmail = session.customer_details?.email || "";
    const bookTitle = session.metadata?.bookTitle || "Book";
    const bookSubtitle = session.metadata?.bookSubtitle || "";
    const amount = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : "24.95";
    const orderId = session.id.slice(-10).toUpperCase();

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "orders@markcampbellphd.com";
    const professorEmailAddress = process.env.PROFESSOR_EMAIL || "";

    try {
      // Send to buyer
      if (customerEmail) {
        await resend.emails.send({
          from: `Dr. Mark Campbell <${fromAddress}>`,
          to: customerEmail,
          subject: `Order Confirmed — ${bookTitle}`,
          html: buyerEmail({
            name: customerName,
            bookTitle,
            bookSubtitle,
            amount,
            orderId,
          }),
        });
      }

      // Send to professor
      if (professorEmailAddress) {
        await resend.emails.send({
          from: `Website Orders <${fromAddress}>`,
          to: professorEmailAddress,
          subject: `📚 New Book Sale — ${bookTitle} ($${amount})`,
          html: professorEmail({
            customerName,
            customerEmail,
            bookTitle,
            bookSubtitle,
            amount,
            orderId,
          }),
        });
      }
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
      // Don't return error — payment already succeeded
    }
  }

  return NextResponse.json({ received: true });
}
