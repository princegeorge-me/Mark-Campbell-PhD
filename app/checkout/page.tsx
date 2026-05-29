"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Shield,
  ArrowLeft,
  Star,
  CheckCircle,
  BookOpen,
  Truck,
  Mail,
} from "lucide-react";

// ── Circuit-grid background (matches rest of site) ────────────────────────────
function CircuitBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="ck-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(228,17,51,0.13)" strokeWidth="0.6" />
          <line x1="24" y1="0" x2="24" y2="48" stroke="rgba(228,17,51,0.05)" strokeWidth="0.4" />
          <line x1="0" y1="24" x2="48" y2="24" stroke="rgba(228,17,51,0.05)" strokeWidth="0.4" />
        </pattern>
        <pattern id="ck-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.2" fill="rgba(228,17,51,0.22)" />
          <circle cx="48" cy="0" r="1.2" fill="rgba(228,17,51,0.22)" />
          <circle cx="0" cy="48" r="1.2" fill="rgba(228,17,51,0.22)" />
          <circle cx="48" cy="48" r="1.2" fill="rgba(228,17,51,0.22)" />
          <circle cx="24" cy="24" r="0.8" fill="rgba(228,17,51,0.12)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ck-grid)" />
      <rect width="100%" height="100%" fill="url(#ck-dots)" />
      {/* vignette edges */}
      <rect width="100%" height="100%"
        fill="url(#ck-vignette)"
        style={{ mixBlendMode: "multiply" }}
      />
      <defs>
        <radialGradient id="ck-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0B0F19" stopOpacity="0.85" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── Feature row ───────────────────────────────────────────────────────────────
function Feature({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-[4px] bg-[#E41133]/10 border border-[#E41133]/20 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-[#E41133]" />
      </div>
      <span className="text-[#9CA3AF] text-[13.5px]">{text}</span>
    </div>
  );
}

// ── Main checkout content ─────────────────────────────────────────────────────
function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();

  const bookTitle      = params.get("title")       || "Book";
  const bookSubtitle   = params.get("subtitle")    || "";
  const bookDescription= params.get("description") || "";
  const coverImage     = params.get("cover")       || "/Book-Courageous.png";

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Subtle entrance: animate book cover in
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookTitle, bookSubtitle, bookDescription, coverImage }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F19] overflow-hidden flex flex-col">

      {/* ── Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <CircuitBg />
        {/* red glow — left */}
        <div className="absolute top-1/3 left-0 w-[480px] h-[480px] bg-[#E41133]/[0.07] blur-[120px] rounded-full -translate-x-1/2" />
        {/* blue glow — right */}
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] blur-[100px] rounded-full translate-x-1/3" />
      </div>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="relative z-10 border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <Link
          href="/#books"
          className="inline-flex items-center gap-2 text-[#6B7280] hover:text-white text-[13px] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to books
        </Link>
        <div className="flex items-center gap-2 text-[#6B7280] text-[12px]">
          <Lock size={11} className="text-[#E41133]" />
          <span>Secure Checkout</span>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 xl:gap-16 items-center">

            {/* ── LEFT: Book cover ──────────────────────────────── */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                }}
              >
                {/* Glow halo */}
                <div className="absolute inset-0 rounded-lg bg-[#E41133]/20 blur-[60px] scale-110" />

                {/* Book 3-D wrapper */}
                <div
                  className="relative"
                  style={{ perspective: "900px" }}
                >
                  <div
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "rotateY(-8deg) rotateX(2deg)",
                      filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.7))",
                    }}
                  >
                    {/* Front cover */}
                    <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] aspect-[2/2.8] overflow-hidden rounded-[3px]">
                      <Image
                        src={coverImage}
                        alt={bookTitle}
                        fill
                        sizes="340px"
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Spine */}
                    <div
                      className="absolute top-0 left-0 h-full w-[18px] origin-left"
                      style={{
                        transform: "rotateY(90deg) translateZ(-1px)",
                        background: "linear-gradient(to right, #1a0a0d, #3d1118)",
                      }}
                    />

                    {/* Gloss overlay */}
                    <div
                      className="absolute inset-0 rounded-[3px] pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-[#E41133] text-white text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-[3px] shadow-lg shadow-[#E41133]/30">
                  $24.95
                </div>
              </div>
            </div>

            {/* ── RIGHT: Purchase panel ─────────────────────────── */}
            <div
              className="transition-all duration-700 delay-150"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-[#E41133]" />
                <span className="text-[#E41133] text-[10px] font-bold tracking-[0.28em] uppercase">
                  Complete Your Order
                </span>
              </div>

              {/* Title */}
              <h1 className="text-white text-[clamp(1.6rem,3.5vw,2.4rem)] font-black tracking-[-0.02em] leading-[1.1] mb-1">
                {bookTitle}
              </h1>
              <p className="text-[#E41133] text-[15px] font-semibold mb-3">{bookSubtitle}</p>

              {/* Stars + author */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-[#6B7280] text-[12.5px]">
                  by Dr. Mark Campbell, PhD
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] mb-6" />

              {/* Price card */}
              <div className="bg-[#111827] border border-white/[0.07] rounded-[6px] p-6 mb-5">

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-white text-[2.6rem] font-black tracking-tight leading-none">
                    $24.95
                  </span>
                  <span className="text-[#4B5563] text-sm">USD</span>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3 mb-6">
                  <Feature icon={BookOpen} text="Digital eBook (PDF + EPUB)" />
                  <Feature icon={Truck}    text="Physical copy — worldwide shipping" />
                  <Feature icon={Mail}     text="Instant email order confirmation" />
                  <Feature icon={CheckCircle} text="30-day satisfaction guarantee" />
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-[15px] bg-[#E41133] hover:bg-[#cc0e2b] disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-[14px] tracking-[0.05em] uppercase rounded-[3px] transition-all duration-300 hover:shadow-[0_0_40px_rgba(228,17,51,0.45)] flex items-center justify-center gap-2.5"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Redirecting to payment…
                    </>
                  ) : (
                    <>
                      <Lock size={13} />
                      Proceed to Secure Payment
                    </>
                  )}
                </button>

                {error && (
                  <p className="mt-3 text-[#E41133] text-[12px] text-center">{error}</p>
                )}
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#4B5563] text-[11.5px]">
                  <Shield size={12} className="text-[#6B7280]" />
                  256-bit SSL
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-1.5 text-[#4B5563] text-[11.5px]">
                  <Lock size={11} className="text-[#6B7280]" />
                  Powered by Stripe
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="text-[#4B5563] text-[11.5px]">
                  No card details stored
                </div>
              </div>

              {/* Author blurb */}
              <div className="mt-6 bg-[#E41133]/[0.05] border border-[#E41133]/10 rounded-[4px] px-5 py-4">
                <p className="text-[#6B7280] text-[12px] leading-relaxed">
                  <span className="text-[#9CA3AF] font-semibold">Dr. Mark Campbell</span> is VP of IT for
                  the Houston Rockets, former CIO of the City of Atlanta and the Chicago White Sox,
                  award-winning author, and nationally recognised keynote speaker.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.05] px-6 py-4 text-center">
        <p className="text-[#374151] text-[11px]">
          © {new Date().getFullYear()} Dr. Mark Campbell, PhD · markcampbellphd.com
        </p>
      </div>
    </main>
  );
}

// ── Suspense wrapper (required for useSearchParams) ───────────────────────────
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#E41133] border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
