"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Shield,
  ArrowLeft,
  Star,
  BookOpen,
  Mail,
  Cpu,
} from "lucide-react";

// ── Tech circuit background (light mode) ──────────────────────────────────────
function TechBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Fine grid */}
        <pattern id="tg-fine" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(30,58,138,0.07)" strokeWidth="0.5" />
        </pattern>
        {/* Coarse grid */}
        <pattern id="tg-coarse" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(30,58,138,0.11)" strokeWidth="1" />
          {/* node circles at intersections */}
          <circle cx="0"  cy="0"  r="2.2" fill="rgba(228,17,51,0.18)" />
          <circle cx="96" cy="0"  r="2.2" fill="rgba(228,17,51,0.18)" />
          <circle cx="0"  cy="96" r="2.2" fill="rgba(228,17,51,0.18)" />
          <circle cx="96" cy="96" r="2.2" fill="rgba(228,17,51,0.18)" />
          {/* midpoint nodes */}
          <circle cx="48" cy="0"  r="1.2" fill="rgba(30,58,138,0.12)" />
          <circle cx="0"  cy="48" r="1.2" fill="rgba(30,58,138,0.12)" />
          <circle cx="48" cy="96" r="1.2" fill="rgba(30,58,138,0.12)" />
          <circle cx="96" cy="48" r="1.2" fill="rgba(30,58,138,0.12)" />
          {/* center cross */}
          <circle cx="48" cy="48" r="1.5" fill="rgba(228,17,51,0.12)" />
          {/* trace lines */}
          <line x1="48" y1="0"  x2="48" y2="96" stroke="rgba(30,58,138,0.06)" strokeWidth="0.5" />
          <line x1="0"  y1="48" x2="96" y2="48" stroke="rgba(30,58,138,0.06)" strokeWidth="0.5" />
        </pattern>
        {/* Radial vignette: centre bright, edges slightly deeper */}
        <radialGradient id="tg-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="0%"   stopColor="rgba(238,242,255,0)"   />
          <stop offset="100%" stopColor="rgba(214,222,255,0.55)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#tg-fine)" />
      <rect width="100%" height="100%" fill="url(#tg-coarse)" />
      <rect width="100%" height="100%" fill="url(#tg-vignette)" />
    </svg>
  );
}

// ── Feature row ───────────────────────────────────────────────────────────────
function Feature({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-[4px] bg-[#E41133]/[0.08] border border-[#E41133]/20 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-[#E41133]" />
      </div>
      <span className="text-slate-600 text-[13.5px]">{text}</span>
    </div>
  );
}

// ── Main checkout content ─────────────────────────────────────────────────────
function CheckoutContent() {
  const params = useSearchParams();

  const bookTitle       = params.get("title")       || "Book";
  const bookSubtitle    = params.get("subtitle")    || "";
  const bookDescription = params.get("description") || "";
  const coverImage      = params.get("cover")       || "/Book-Courageous.png";

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

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
    <main className="min-h-screen flex flex-col" style={{ background: "#EEF2FF" }}>

      {/* ── Full-page tech pattern ───────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <TechBg />
        {/* soft red accent blob — top left */}
        <div
          className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(228,17,51,0.06) 0%, transparent 70%)" }}
        />
        {/* blue accent blob — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.07) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <Link
          href="/#books"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-[13px] font-medium transition-colors"
        >
          <ArrowLeft size={14} />
          Back to books
        </Link>

        {/* Brand mark */}
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-[#E41133]" />
          <span className="text-slate-700 text-[12.5px] font-semibold tracking-wide">
            Dr. Mark Campbell, PhD
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
          <Lock size={11} className="text-emerald-500" />
          <span>Secure checkout</span>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_460px] gap-8 xl:gap-14 items-center">

            {/* ══ LEFT: Book showcase ═══════════════════════════════ */}
            <div
              className="flex flex-col items-center gap-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 self-start">
                <div className="h-px w-8 bg-[#E41133]" />
                <span className="text-[#E41133] text-[10px] font-bold tracking-[0.3em] uppercase">
                  Your Selection
                </span>
              </div>

              {/* 3-D book */}
              <div className="relative" style={{ perspective: "1000px" }}>
                {/* shadow on floor */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-[240px] h-[28px] rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(15,23,42,0.25) 0%, transparent 75%)",
                    filter: "blur(8px)",
                  }}
                />

                {/* light halo behind cover */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "radial-gradient(ellipse 80% 90% at 50% 50%, rgba(228,17,51,0.14) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    transform: "scale(1.15)",
                  }}
                />

                <div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateY(-10deg) rotateX(3deg)",
                    filter: "drop-shadow(0 32px 48px rgba(15,23,42,0.22)) drop-shadow(0 8px 16px rgba(15,23,42,0.12))",
                  }}
                >
                  {/* Front cover */}
                  <div className="relative w-[260px] sm:w-[300px] lg:w-[320px] overflow-hidden rounded-[2px]"
                    style={{ aspectRatio: "2/2.8" }}>
                    <Image
                      src={coverImage}
                      alt={bookTitle}
                      fill
                      sizes="320px"
                      className="object-cover"
                      priority
                    />
                    {/* gloss */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 45%, rgba(0,0,0,0.08) 100%)",
                      }}
                    />
                  </div>

                  {/* Spine */}
                  <div
                    className="absolute top-0 left-0 h-full w-[20px] origin-left"
                    style={{
                      transform: "rotateY(90deg) translateZ(-1px)",
                      background: "linear-gradient(to right, #8B0A20, #C01030)",
                    }}
                  />
                </div>

                {/* Price badge */}
                <div
                  className="absolute -top-3 -right-3 text-white text-[11px] font-black tracking-[0.12em] uppercase px-3 py-1.5 rounded-[4px]"
                  style={{
                    background: "#E41133",
                    boxShadow: "0 4px 14px rgba(228,17,51,0.4)",
                  }}
                >
                  $24.95
                </div>
              </div>

              {/* Book info below cover */}
              <div className="text-center lg:text-left self-start w-full max-w-[340px]">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-1">
                  Dr. Mark Campbell, PhD
                </p>
                <h2 className="text-slate-900 text-2xl font-black tracking-tight mb-0.5">{bookTitle}</h2>
                <p className="text-[#E41133] text-[13.5px] font-semibold mb-3">{bookSubtitle}</p>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-slate-400 text-[12px] ml-1">5.0 rating</span>
                </div>
              </div>
            </div>

            {/* ══ RIGHT: Checkout card ══════════════════════════════ */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s",
              }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  boxShadow:
                    "0 0 0 1px rgba(30,58,138,0.07), 0 4px 6px rgba(15,23,42,0.04), 0 20px 48px rgba(15,23,42,0.09)",
                }}
              >
                {/* Card header strip */}
                <div
                  className="px-7 pt-7 pb-6"
                  style={{
                    borderBottom: "1px solid rgba(30,58,138,0.07)",
                    background: "linear-gradient(135deg, #fafbff 0%, #f3f6ff 100%)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-5 bg-[#E41133]" />
                    <span className="text-[#E41133] text-[10px] font-bold tracking-[0.28em] uppercase">
                      Complete Your Order
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-900 text-[3rem] font-black tracking-tight leading-none">
                      $24.95
                    </span>
                    <span className="text-slate-400 text-sm font-medium">USD · one-time</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-7 py-6">

                  {/* Features */}
                  <div className="flex flex-col gap-3.5 mb-7">
                    <Feature icon={BookOpen}    text="Digital eBook — PDF &amp; EPUB formats" />
                    <Feature icon={Mail}        text="Instant email order confirmation" />
                  </div>

                  {/* CTA button */}
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 text-white font-black text-[14px] tracking-[0.05em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: loading ? "#E41133" : "linear-gradient(135deg,#E41133 0%,#b80e26 100%)",
                      boxShadow: loading ? "none" : "0 4px 20px rgba(228,17,51,0.35), 0 1px 0 rgba(255,255,255,0.12) inset",
                    }}
                    onMouseEnter={e => {
                      if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 32px rgba(228,17,51,0.50), 0 1px 0 rgba(255,255,255,0.12) inset";
                    }}
                    onMouseLeave={e => {
                      if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 4px 20px rgba(228,17,51,0.35), 0 1px 0 rgba(255,255,255,0.12) inset";
                    }}
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

                  {/* Trust badges */}
                  <div className="mt-5 flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                      <Shield size={11} className="text-emerald-500" />
                      256-bit SSL
                    </div>
                    <div className="w-px h-3 bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                      <Lock size={10} className="text-slate-400" />
                      Powered by Stripe
                    </div>
                    <div className="w-px h-3 bg-slate-200" />
                    <div className="text-slate-400 text-[11px] font-medium">
                      No card details stored
                    </div>
                  </div>
                </div>

                {/* Author strip */}
                <div
                  className="px-7 py-5"
                  style={{
                    borderTop: "1px solid rgba(30,58,138,0.07)",
                    background: "linear-gradient(135deg, #f8faff 0%, #f3f6ff 100%)",
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1.5">
                    About the Author
                  </p>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed">
                    <span className="text-slate-700 font-semibold">Dr. Mark Campbell</span> is VP of IT
                    for the Houston Rockets, former CIO of the City of Atlanta and the Chicago White Sox,
                    award-winning author, and nationally recognised keynote speaker.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/60 backdrop-blur-sm px-6 py-4 text-center">
        <p className="text-slate-400 text-[11px]">
          © {new Date().getFullYear()} Dr. Mark Campbell, PhD · markcampbellphd.com
        </p>
      </footer>

    </main>
  );
}

// ── Suspense wrapper ──────────────────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center" style={{ background: "#EEF2FF" }}>
          <div className="w-8 h-8 border-2 border-[#E41133] border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
