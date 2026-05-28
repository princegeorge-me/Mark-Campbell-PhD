"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, BookOpen, ArrowLeft } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const book = params.get("book") || "your book";

  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-5">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E41133]/[0.07] blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#3B82F6]/[0.06] blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#E41133]/20 blur-xl scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-[#E41133]/10 border border-[#E41133]/30 flex items-center justify-center">
              <CheckCircle size={40} className="text-[#E41133]" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-[#E41133]" />
          <span className="text-[#E41133] text-[10px] font-bold tracking-[0.28em] uppercase">Order Confirmed</span>
          <div className="h-px w-8 bg-[#E41133]" />
        </div>

        <h1 className="text-[clamp(2rem,5vw,3rem)] font-black text-white tracking-[-0.03em] leading-[1.05] mb-4">
          Thank You for Your Purchase!
        </h1>

        <p className="text-[#9CA3AF] text-[16px] leading-[1.75] mb-3">
          Your order for{" "}
          <span className="text-white font-bold">{decodeURIComponent(book)}</span>{" "}
          by Dr. Mark Campbell has been confirmed.
        </p>

        <p className="text-[#6B7280] text-[14px] leading-[1.7] mb-10">
          A confirmation email has been sent to your inbox with your order details.
        </p>

        {/* Card */}
        <div className="bg-[#111827] border border-white/[0.07] rounded-[6px] p-6 mb-8 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#E41133]/10 border border-[#E41133]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen size={18} className="text-[#E41133]" />
            </div>
            <div>
              <p className="text-white text-[14px] font-bold mb-1">What Happens Next?</p>
              <ul className="space-y-1.5">
                {[
                  "Check your email for your order confirmation",
                  "Dr. Campbell's team will follow up with delivery details",
                  "Questions? Email info@markcampbellphd.com",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#6B7280] text-[13px] leading-snug">
                    <span className="text-[#E41133] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-[14px] bg-[#E41133] hover:bg-[#cc0e2b] text-white font-black text-[13.5px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_32px_rgba(228,17,51,0.4)]"
          >
            Return to Home
          </Link>
          <Link
            href="/#books"
            className="inline-flex items-center justify-center gap-2 px-7 py-[14px] bg-transparent border border-white/[0.15] hover:border-white/30 text-white font-bold text-[13.5px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:bg-white/[0.04]"
          >
            <ArrowLeft size={14} />
            Browse More Books
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-[#4B5563] text-[12px]">
          Dr. Mark Campbell, PhD · markcampbellphd.com
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E41133] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
