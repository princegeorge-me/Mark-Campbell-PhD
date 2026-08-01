import { NextRequest, NextResponse } from "next/server";

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Tracks request counts per IP per route within a sliding time window.
// Works per Edge function instance — provides meaningful burst protection.

interface RateRecord {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateRecord>();

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  "/api/checkout":     { max: 5, windowMs: 60_000 },  // 5 per minute
  "/api/contact":      { max: 3, windowMs: 60_000 },  // 3 per minute
  "/api/admin/login":  { max: 5, windowMs: 60_000 },  // 5 attempts per minute
};

function isRateLimited(ip: string, path: string): boolean {
  const rule = LIMITS[path];
  if (!rule) return false;

  const key   = `${ip}:${path}`;
  const now   = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > rule.windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= rule.max) return true;

  entry.count++;
  return false;
}

// ── Middleware ────────────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to API routes
  if (!pathname.startsWith("/api/")) return NextResponse.next();

  // Skip webhooks — Stripe handles its own auth
  if (pathname.startsWith("/api/webhooks/")) return NextResponse.next();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip, pathname)) {
    console.warn(`[rate-limit] Blocked ${ip} on ${pathname}`);
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": String(LIMITS[pathname]?.max ?? 0),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/checkout", "/api/contact", "/api/admin/login"],
};
