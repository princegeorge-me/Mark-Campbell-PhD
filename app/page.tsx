"use client";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  Dr. Mark Campbell, PhD — Official Personal Brand Website        ║
// ║  app/page.tsx                                                     ║
// ║                                                                   ║
// ║  Stack: Next.js 15 · React 19 · TypeScript · Tailwind CSS        ║
// ║  Motion: Framer Motion  ·  Icons: Lucide React                   ║
// ║                                                                   ║
// ║  NOTE: Metadata is exported from app/layout.tsx (server layer).  ║
// ║  This page is a Client Component to support Framer Motion.       ║
// ╚══════════════════════════════════════════════════════════════════╝

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FC,
} from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Mic,
  Users,
  Award,
  Mail,
  Calendar,
  ChevronRight,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb,
  Target,
  Briefcase,
  GraduationCap,
  Star,
  Quote,
  ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

// ─────────────────────────────────────────────
// HOOK: useScrolled
// ─────────────────────────────────────────────

function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

// ─────────────────────────────────────────────
// HOOK: useSectionInView
// ─────────────────────────────────────────────

function useSectionInView(amount: number = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount,
  });
  return { ref, isInView };
}

// ─────────────────────────────────────────────
// UTILITY: smoothScrollTo
// ─────────────────────────────────────────────

function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ════════════════════════════════════════════════════════
// TOP BAR
// ════════════════════════════════════════════════════════

const MARQUEE_ITEMS = [
  { icon: "▸", text: "VP of Information Technology · Houston Rockets · NBA" },
  { icon: "▸", text: "Former CIO · Chicago White Sox · MLB" },
  { icon: "▸", text: "Former CIO · City of Atlanta, Georgia" },
  { icon: "▸", text: "Award-Winning Author · Courageous Conversations & Soft Power" },
  { icon: "▸", text: "U.S. Army Veteran · Leadership Foundation" },
  { icon: "▸", text: "Nationally Recognized Keynote Speaker on Technology Leadership" },
];

const TopBar: FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[38px] bg-[#0B0F19] border-b border-[#E41133]/40 overflow-hidden flex items-center">
      {/* Left accent */}
      <div className="flex-shrink-0 flex items-center gap-2 pl-4 pr-6 border-r border-[#E41133]/30 h-full bg-[#E41133]/[0.07]">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E41133] opacity-75" />
          <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#E41133]" />
        </span>
        <span className="text-[#E41133] text-[10px] font-black tracking-[0.18em] uppercase whitespace-nowrap">
          Now Booking
        </span>
      </div>

      {/* Scrolling marquee */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{
            animation: "marquee 38s linear infinite",
            willChange: "transform",
          }}
        >
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-8">
              <span className="text-[#E41133] text-[9px]">{item.icon}</span>
              <span className="text-[#9CA3AF] text-[11px] font-medium tracking-[0.04em]">{item.text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right CTA */}
      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); smoothScrollTo("#contact"); }}
        className="flex-shrink-0 flex items-center gap-2 px-5 h-full border-l border-[#E41133]/30 bg-[#E41133]/[0.07] hover:bg-[#E41133]/[0.18] transition-colors duration-300 group"
      >
        <span className="text-white text-[10.5px] font-bold tracking-[0.08em] uppercase whitespace-nowrap group-hover:text-[#E41133] transition-colors duration-300">
          Book Dr. Campbell
        </span>
        <span className="text-[#E41133] text-[11px]">→</span>
      </a>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 1: NAVIGATION
// ════════════════════════════════════════════════════════

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#books", label: "Books" },
  { href: "#speaking", label: "Speaking" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
] as const;

const Navigation: FC = () => {
  const scrolled = useScrolled(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      smoothScrollTo(href);
    },
    []
  );

  return (
    <header
      role="banner"
      className={`fixed top-[38px] inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F19]/96 backdrop-blur-2xl border-b border-[#E41133]/30 shadow-[0_4px_24px_rgba(228,17,51,0.35)]"
          : "bg-transparent border-b border-[#E41133]/20 shadow-[0_2px_12px_rgba(228,17,51,0.15)]"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleLink(e, "#home")}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] rounded-sm"
          aria-label="Dr. Mark Campbell — Home"
        >
          <Image
            src="/logo.png"
            alt="Dr. Mark Campbell"
            width={160}
            height={52}
            className="h-[44px] w-auto object-contain"
            priority
          />
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden lg:flex items-center gap-9" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleLink(e, href)}
                className="relative text-[13px] font-semibold text-[#9CA3AF] hover:text-white transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-sm py-1"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#E41133] group-hover:w-full transition-all duration-350 rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleLink(e, "#contact")}
            className="inline-flex items-center gap-2 px-5 py-[10px] bg-[#E41133] hover:bg-[#cc0e2b] text-white text-[13px] font-bold tracking-[0.05em] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_28px_rgba(228,17,51,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            Book Dr. Mark
            <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="lg:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] rounded-sm"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0B0F19]/98 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <ul className="px-5 py-5 space-y-0.5" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleLink(e, href)}
                    className="flex items-center justify-between px-4 py-3.5 text-[#D1D5DB] hover:text-white hover:bg-white/[0.04] rounded-[3px] transition-all duration-200 text-[15px] font-semibold"
                  >
                    {label}
                    <ChevronRight size={15} className="text-[#E41133]" />
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => handleLink(e, "#contact")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-[#E41133] hover:bg-[#cc0e2b] text-white font-bold text-[14px] rounded-[3px] transition-colors"
                >
                  Book Dr. Mark
                  <ArrowRight size={15} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 2: HERO
// ════════════════════════════════════════════════════════

const HERO_ROLES = [
  { label: "VP of IT", org: "Houston Rockets · NBA" },
  { label: "Former CIO", org: "City of Atlanta" },
  { label: "Former CIO", org: "Chicago White Sox · MLB" },
] as const;

const HeroSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.08);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center bg-[#0B0F19] overflow-hidden pt-[110px]"
      aria-label="Introduction"
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Atmospheric orbs */}
        <div className="absolute -top-32 right-0 w-[720px] h-[720px] rounded-full bg-[#E41133]/[0.055] blur-[130px]" />
        <div className="absolute bottom-0 -left-48 w-[600px] h-[600px] rounded-full bg-[#E41133]/[0.03] blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#111827]/70 blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full py-20 lg:py-28 xl:py-32">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-14 lg:gap-20 items-center">

          {/* ─── LEFT: Copy ─── */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#E41133]" />
              <span className="text-[#E41133] text-[11px] font-bold tracking-[0.32em] uppercase">
                Technology Executive &amp; Keynote Speaker
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-[clamp(2.8rem,6.5vw,5.25rem)] font-black text-white leading-[0.93] tracking-[-0.035em] mb-7"
            >
              Leading at the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
                Intersection
              </span>
              <br />
              of Technology
              <br />
              <span className="text-[#D1D5DB]">&amp; Leadership.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-[16.5px] text-[#9CA3AF] leading-[1.75] max-w-[540px] mb-9 font-light"
            >
              Dr. Mark Campbell is a transformational technology executive, award-winning
              author, and nationally recognized keynote speaker advancing technology
              leadership, executive development, and diversity in corporate America.
            </motion.p>

            {/* Role badges */}
            <motion.div variants={stagger(0.08)} className="flex flex-wrap gap-2.5 mb-10">
              {HERO_ROLES.map(({ label, org }) => (
                <motion.div
                  key={org}
                  variants={scaleIn}
                  className="inline-flex items-center gap-2.5 px-4 py-[9px] bg-white/[0.045] border border-white/[0.09] rounded-[3px] backdrop-blur-sm"
                >
                  <div className="w-[5px] h-[5px] rounded-full bg-[#E41133] flex-shrink-0" />
                  <span className="text-[12px] text-white font-bold">{label}</span>
                  <span className="text-[11px] text-[#6B7280]">{org}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); smoothScrollTo("#contact"); }}
                className="inline-flex items-center gap-2.5 px-7 py-[15px] bg-[#E41133] hover:bg-[#cc0e2b] text-white font-black text-[13.5px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_36px_rgba(228,17,51,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                Book Keynote
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a
                href="#books"
                onClick={(e) => { e.preventDefault(); smoothScrollTo("#books"); }}
                className="inline-flex items-center gap-2.5 px-7 py-[15px] bg-transparent border border-white/[0.18] hover:border-white/40 text-white font-bold text-[13.5px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                Explore Books
                <BookOpen size={15} />
              </a>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Portrait ─── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-none">

              {/* Portrait frame */}
              <motion.div variants={slideInRight} className="relative">
                {/* Animated glow ring */}
                <motion.div
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute -inset-[2px] rounded-[4px] bg-gradient-to-br from-[#E41133]/50 via-transparent to-[#E41133]/25"
                  aria-hidden="true"
                />

                {/* Portrait card */}
                <div className="relative bg-gradient-to-br from-[#1a2035] via-[#111827] to-[#0B0F19] rounded-[3px] overflow-hidden border border-white/[0.07]"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Internal ambiance */}
                  <div className="absolute inset-0" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-[#E41133]/[0.07] to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(228,17,51,0.08),transparent_65%)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-transparent" />
                  </div>

                  {/* Executive portrait */}
                  <Image
                    src="/dr-mark-campbell.jpg"
                    alt="Dr. Mark Campbell, VP of Information Technology, Houston Rockets"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover object-top"
                    priority
                  />

                  {/* Name card overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-[1.5px] w-10 bg-[#E41133] mb-3" />
                    <p className="text-white font-black text-[18px] tracking-[-0.02em] leading-tight">
                      Dr. Mark Campbell
                    </p>
                    <p className="text-[#E41133] text-[10px] font-bold tracking-[0.22em] uppercase mt-1.5">
                      Vice President of IT · Houston Rockets
                    </p>
                  </div>

                  {/* Corner accent marks */}
                  {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                    <div
                      key={pos}
                      aria-hidden="true"
                      className={`absolute w-[18px] h-[18px] ${
                        pos === "tl" ? "top-4 left-4 border-t-2 border-l-2" :
                        pos === "tr" ? "top-4 right-4 border-t-2 border-r-2" :
                        pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2" :
                        "bottom-4 right-4 border-b-2 border-r-2"
                      } border-[#E41133]/60`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* ── Floating stat cards ── */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.35 }}
                className="absolute -left-5 top-10 bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[148px]"
                aria-label="30 plus years of leadership"
              >
                <div className="text-[26px] font-black text-white leading-none mb-1">30<span className="text-[#E41133]">+</span></div>
                <div className="text-[11px] text-[#6B7280] leading-[1.4]">Years of Technology Leadership</div>
                <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.48 }}
                className="absolute -right-5 top-[38%] bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[152px]"
                aria-label="Fortune-level executive experience"
              >
                <div className="text-[18px] font-black text-white leading-none mb-1">Fortune<br/>500</div>
                <div className="text-[11px] text-[#6B7280] leading-[1.4]">Executive-Level Impact</div>
                <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="absolute -left-3 bottom-[14%] bg-[#E41133]/[0.12] backdrop-blur-xl border border-[#E41133]/[0.22] rounded-[3px] p-4 shadow-xl w-[148px]"
                aria-label="Author and keynote speaker"
              >
                <Star size={15} className="text-[#E41133] mb-2" fill="currentColor" />
                <div className="text-[12px] text-white font-bold leading-[1.35] mb-0.5">Author &amp; Keynote Speaker</div>
                <div className="text-[10.5px] text-[#9CA3AF]">Nationally Recognized</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[#3D4451] text-[10px] tracking-[0.28em] uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-9 bg-gradient-to-b from-[#E41133] to-transparent"
        />
      </motion.div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 3: TRUST / CREDENTIALS
// ════════════════════════════════════════════════════════

const CREDENTIALS = [
  { abbr: "HOU", name: "Houston Rockets", subtitle: "NBA · VP of Information Technology" },
  { abbr: "CWS", name: "Chicago White Sox", subtitle: "MLB · Former Chief Information Officer" },
  { abbr: "ATL", name: "City of Atlanta", subtitle: "Municipal Government · Former CIO" },
  { abbr: "USA", name: "U.S. Army", subtitle: "Military Service · Leadership Foundation" },
  { abbr: "EDU", name: "Public Education", subtitle: "School Systems Leadership" },
] as const;

const TrustSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.2);

  return (
    <section
      ref={ref}
      className="relative py-20 bg-[#111827] border-y border-white/[0.055] overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Technology abstract background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Circuit grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.22]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#60A5FA" strokeWidth="0.8"/>
            </pattern>
            <pattern id="circuit-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="0" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="40" cy="40" r="1.5" fill="#60A5FA"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)"/>
          <rect width="100%" height="100%" fill="url(#circuit-dots)"/>
          {/* Horizontal circuit traces */}
          <line x1="0" y1="40" x2="30%" y2="40" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="70%" y1="40" x2="100%" y2="40" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="10%" y1="120" x2="45%" y2="120" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="55%" y1="120" x2="90%" y2="120" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="0" y1="200" x2="25%" y2="200" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="75%" y1="200" x2="100%" y2="200" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Vertical connectors */}
          <line x1="30%" y1="0" x2="30%" y2="80" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="70%" y1="0" x2="70%" y2="80" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="45%" y1="80" x2="45%" y2="160" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="55%" y1="80" x2="55%" y2="160" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Node circles */}
          <circle cx="30%" cy="40" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="70%" cy="40" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="45%" cy="120" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="55%" cy="120" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
        </svg>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-[#3B82F6]/[0.14] blur-[80px] rounded-full"/>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-[#6366F1]/[0.14] blur-[80px] rounded-full"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[120px] bg-[#E41133]/[0.06] blur-[60px] rounded-full"/>
        {/* Edge fade vignette — lighter so grid shows through */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/80 via-transparent to-[#111827]/80"/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/40 via-transparent to-[#111827]/40"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-[#6B7280] text-[10.5px] font-bold tracking-[0.32em] uppercase mb-2.5">
            Executive Leadership Across
          </motion.p>
          <motion.h2 id="trust-heading" variants={fadeInUp} className="text-[22px] font-black text-white tracking-[-0.02em]">
            World-Class Organizations
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center items-center gap-3 lg:gap-4"
        >
          {CREDENTIALS.map(({ abbr, name, subtitle }) => (
            <motion.div
              key={name}
              variants={scaleIn}
              className="group flex items-center gap-4 px-6 py-4 bg-[#0B0F19]/70 border border-white/[0.07] rounded-[3px] hover:border-[#E41133]/30 hover:bg-[#0B0F19] transition-all duration-400 cursor-default"
            >
              <div className="w-[46px] h-[46px] rounded-[3px] bg-[#1F2937] group-hover:bg-[#E41133]/10 border border-white/[0.08] group-hover:border-[#E41133]/25 flex items-center justify-center transition-all duration-400 flex-shrink-0">
                <span className="text-[#6B7280] group-hover:text-[#E41133] text-[10px] font-black tracking-[0.12em] uppercase transition-colors duration-400">
                  {abbr}
                </span>
              </div>
              <div>
                <p className="text-white text-[13.5px] font-bold leading-tight">{name}</p>
                <p className="text-[#6B7280] text-[11px] mt-0.5 group-hover:text-[#9CA3AF] transition-colors">{subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 4: ABOUT
// ════════════════════════════════════════════════════════

const TIMELINE = [
  {
    period: "Current",
    role: "Vice President of Information Technology",
    org: "Houston Rockets · NBA",
    description:
      "Leading enterprise technology strategy, infrastructure modernization, and digital innovation for one of the NBA's most storied franchises—shaping how a professional sports organization competes in the digital age.",
    Icon: TrendingUp,
  },
  {
    period: "Previous",
    role: "Chief Information Officer",
    org: "Chicago White Sox · MLB",
    description:
      "Drove end-to-end technology transformation across one of Major League Baseball's most historic franchises, delivering stadium tech innovation and modernized enterprise systems.",
    Icon: Briefcase,
  },
  {
    period: "Previous",
    role: "Chief Information Officer",
    org: "City of Atlanta, Georgia",
    description:
      "Led municipal technology transformation serving millions of Atlanta residents. Championed smart-city infrastructure, cybersecurity, and digital government initiatives at scale.",
    Icon: Globe,
  },
  {
    period: "Foundation",
    role: "U.S. Army &amp; Public Service",
    org: "Military &amp; Education Leadership",
    description:
      "Built the character, discipline, and leadership principles that underpin a 30-year executive career through military service and dedication to public education and community.",
    Icon: Shield,
  },
] as const;

const AboutSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 lg:py-32 xl:py-36 bg-[#0B0F19]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ─── Left: Biography ─── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#E41133]" />
              <span className="text-[#E41133] text-[10.5px] font-bold tracking-[0.32em] uppercase">The Executive</span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-white tracking-[-0.025em] leading-[1.05] mb-7"
            >
              A Legacy Built on
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
                Purposeful
              </span>{" "}
              Leadership
            </motion.h2>

            <motion.div variants={stagger(0.09)} className="space-y-4 mb-9">
              {[
                "Dr. Mark Campbell is one of America's foremost technology executives—a thought leader whose career spans professional sports, municipal government, military service, and public education. With over three decades at the intersection of technology and organizational leadership, Dr. Campbell has transformed institutions from the inside out.",
                "As Vice President of Information Technology for the Houston Rockets, he leads enterprise-level digital strategy for one of the NBA's premier franchises. His tenure as CIO for both the Chicago White Sox and the City of Atlanta established a reputation not just for managing technology, but for leveraging it as a strategic weapon to drive culture, performance, and lasting organizational impact.",
                `Beyond his corporate record, Dr. Campbell holds a Doctor of Science (D.Sc.) and a PhD in Cyber Leadership. He is a tireless advocate for diversity in technology leadership, minority executive advancement, and mentoring the next generation of IT leaders.`,
              ].map((text, i) => (
                <motion.p key={i} variants={fadeInUp} className="text-[15px] text-[#9CA3AF] leading-[1.8]"
                  dangerouslySetInnerHTML={{
                    __html: text
                      .replace("Doctor of Science (D.Sc.)", '<strong class="text-white font-semibold">Doctor of Science (D.Sc.)</strong>')
                      .replace("PhD in Cyber Leadership", '<strong class="text-white font-semibold">PhD in Cyber Leadership</strong>'),
                  }}
                />
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              variants={scaleIn}
              className="border-l-[2.5px] border-[#E41133] pl-6 py-1 mb-9"
            >
              <p className="text-[17px] text-white font-semibold italic leading-[1.6] tracking-[-0.01em]">
                "Technology is not the destination. It's the vehicle. Leadership determines
                how far you go—and who you bring with you."
              </p>
              <footer className="mt-3 text-[#E41133] text-[12px] font-bold tracking-[0.15em] uppercase">
                — Dr. Mark Campbell
              </footer>
            </motion.blockquote>

            {/* Core pillars */}
            <motion.div variants={stagger(0.07)} className="grid grid-cols-2 gap-3">
              {[
                { Icon: Lightbulb, label: "Technology Innovation" },
                { Icon: Users, label: "Diversity in Leadership" },
                { Icon: Target, label: "Organizational Culture" },
                { Icon: GraduationCap, label: "Executive Mentoring" },
              ].map(({ Icon, label }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  className="flex items-center gap-3 px-4 py-3 bg-[#111827] rounded-[3px] border border-white/[0.06] hover:border-[#E41133]/20 transition-colors duration-300"
                >
                  <Icon size={15} className="text-[#E41133] flex-shrink-0" />
                  <span className="text-[#D1D5DB] text-[12.5px] font-semibold">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Timeline ─── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline spine */}
            <div
              className="absolute left-6 top-3 bottom-0 w-px bg-gradient-to-b from-[#E41133]/70 via-[#E41133]/20 to-transparent"
              aria-hidden="true"
            />

            <div className="space-y-7">
              {TIMELINE.map(({ period, role, org, description, Icon }, i) => (
                <motion.div key={org} variants={fadeInUp} custom={i} className="relative pl-[58px]">
                  {/* Node */}
                  <div
                    className="absolute left-0 top-0 w-[48px] h-[48px] rounded-[3px] bg-[#111827] border border-white/[0.09] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon size={20} className="text-[#E41133]" />
                  </div>

                  <div className="group bg-[#111827]/70 border border-white/[0.07] rounded-[3px] p-5 hover:border-[#E41133]/20 hover:bg-[#111827] transition-all duration-300">
                    <span className="text-[#E41133] text-[10px] font-black tracking-[0.28em] uppercase">{period}</span>
                    <h3 className="text-white font-bold text-[15px] mt-1.5 mb-0.5 leading-snug group-hover:text-[#F9FAFB] transition-colors">{role}</h3>
                    <p className="text-[#E41133]/80 text-[12.5px] font-semibold mb-3">{org}</p>
                    <p className="text-[#6B7280] text-[13px] leading-[1.75]"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Academic credentials card */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 p-5 bg-gradient-to-br from-[#E41133]/[0.09] to-[#1F2937]/30 border border-[#E41133]/20 rounded-[3px]"
            >
              <div className="flex items-start gap-4">
                <Award className="text-[#E41133] flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="text-white font-black text-[13.5px] mb-3 tracking-[-0.01em]">Academic Excellence</p>
                  <ul className="space-y-2" role="list">
                    {[
                      "Doctor of Science (D.Sc.)",
                      "PhD in Cyber Leadership",
                      "Executive Leadership Certifications",
                      "U.S. Army Veteran",
                    ].map((cred) => (
                      <li key={cred} className="flex items-center gap-2.5">
                        <CheckCircle size={12} className="text-[#E41133] flex-shrink-0" />
                        <span className="text-[#D1D5DB] text-[13px]">{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 5: BOOKS
// ════════════════════════════════════════════════════════

type Book = {
  title: string;
  subtitle: string;
  tagline: string;
  bulletsHeading?: string;
  bullets?: string[];
  aboutParagraphs: string[];
  coverImage: string;
};

const BOOKS: Book[] = [
  {
    title: "COURAGEOUS CONVERSATIONS",
    subtitle: "Navigating Technology Leadership as a Minority in IT",
    tagline: "A practical guide for aspiring and emerging CIOs who refuse to navigate their careers without a roadmap.",
    bulletsHeading: "In This Groundbreaking Leadership Guide, You Will Discover:",
    bullets: [
      "How to navigate organizational politics without losing your integrity",
      "How to build influence that extends beyond your title or technical expertise",
      "How to transition from technical expert to executive leader",
      "How to lead through racial tension, systemic bias, and environments where your presence is questioned",
      "How to protect your mental wellness while sustaining high performance",
    ],
    aboutParagraphs: [
      "COURAGEOUS CONVERSATIONS: Navigating Technology Leadership as a Minority in IT is a practical guide for aspiring and emerging CIOs who refuse to navigate their careers without a roadmap.",
      "PURPOSE AND NEED: This book addresses what most leadership books avoid: the isolation of being the only one in the room, the politics that determine who rises and who stalls, the cost of integrity when compromise would be easier, and the emotional weight of leading through crisis when the pressure is invisible to everyone but you. Dr. Mark Campbell shares his unfiltered journey from a childhood shaped by poverty, resilience, and faith to becoming a technology executive at the highest levels. Through powerful storytelling and practical reflection, each chapter delivers hard-earned lessons structured for action, not theory.",
      "Whether you are preparing for your first executive role or navigating the complexities of one you already hold, this book meets you where you are. It challenges assumptions. It sharpens strategy. It reminds you that your presence carries purpose.",
      "CHAPTER STRUCTURE: Every chapter includes Leadership Questions, Immediate Action Steps, and Closing Principles designed to move readers from insight to implementation.",
    ],
    coverImage: "/Book-Courageous.png",
  },
  {
    title: "SOFT POWER",
    subtitle: "The Human Skills Behind Hard Tech",
    tagline: "The technical skills got you in the room. What happens next is the reason most technology leaders fail.",
    bulletsHeading: "In This Essential Leadership Guide, You Will Discover:",
    bullets: [
      "How to communicate with influence and earn trust at every level of the organization",
      "How to build and lead high-performing teams that follow vision, not just directives",
      "How to navigate conflict, manage up, and thrive in politically complex environments",
      "How to develop emotional intelligence as a strategic leadership advantage",
      "How to leave a legacy that outlasts your title, your tenure, and your technology",
    ],
    aboutParagraphs: [
      "Every year, thousands of technically brilliant leaders stall — not because they lack knowledge, but because no one taught them the skills that actually determine whether they rise, whether they last, and whether they leave anything behind that matters.",
      "He's brilliant, but he can't seem to bring people along. She has all the technical skills, but the team doesn't trust her.",
      "He knows the systems, but he doesn't know the room. If any of that sounds familiar — about someone you lead, someone you work with, or yourself — this book was written for you.",
    ],
    coverImage: "/Book-Soft-Power.png",
  },
];

const BookCard: FC<{ book: Book; direction: "left" | "right"; inView: boolean }> = ({
  book,
  direction,
  inView,
}) => {
  const imgVariant = direction === "left" ? slideInLeft : slideInRight;
  const txtVariant = direction === "left" ? slideInRight : slideInLeft;
  const imgCol = direction === "left" ? "order-1" : "order-1 lg:order-2";
  const txtCol = direction === "left" ? "order-2" : "order-2 lg:order-1";

  return (
    <motion.article
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid lg:grid-cols-2"
    >
      {/* ══ TOP: Cover + Key Info ══ */}
      {/* Cover column */}
      <motion.div
        variants={imgVariant}
        className={`relative flex items-center justify-center py-14 px-10 overflow-hidden ${imgCol}`}
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ perspective: "900px" }}
        >
          <div style={{ transform: "rotateY(-12deg)", transformStyle: "preserve-3d" }}>
            <div
              className="absolute top-0 bottom-0 left-0 w-[22px] rounded-l-[2px]"
              style={{ background: "linear-gradient(to right, #1a1a1a, #2d2d2d)", transform: "rotateY(90deg)", transformOrigin: "left center" }}
              aria-hidden="true"
            />
            <div className="relative w-[360px] h-[504px] overflow-hidden">
              <Image src={book.coverImage} alt={book.title} fill sizes="360px" className="object-cover" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Text column */}
      <motion.div
        variants={txtVariant}
        className={`flex flex-col justify-center gap-5 p-10 lg:p-14 ${txtCol}`}
      >
        <h3 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-black text-[#0B0F19] tracking-[-0.03em] leading-[1.05]">
          {book.title}
          <span className="block text-[#E41133] text-[clamp(0.95rem,1.8vw,1.2rem)] font-bold tracking-[-0.01em] mt-1.5">
            {book.subtitle}
          </span>
        </h3>

        <p className="text-[#4B5563] text-[15px] leading-[1.8]">{book.tagline}</p>

        <p className="text-[#0B0F19] font-bold italic text-[14.5px]">By Dr. Mark Campbell</p>

        {book.bulletsHeading && book.bullets && (
          <div>
            <p className="text-[#0B0F19] text-[13px] font-black tracking-[0.04em] mb-3">{book.bulletsHeading}</p>
            <ul className="space-y-2.5">
              {book.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-[#E41133] flex-shrink-0 mt-[2px]" />
                  <span className="text-[#374151] text-[13.5px] leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button type="button"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E41133] hover:bg-[#cc0e2b] text-white font-black text-[14px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_32px_rgba(228,17,51,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133]"
          >
            Buy Book <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

    </motion.article>
  );
};

const BooksSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.08);

  return (
    <section
      id="books"
      ref={ref}
      className="py-24 lg:py-32 xl:py-36 bg-[#F5F5F5]"
      aria-labelledby="books-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 lg:mb-18"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#E41133]" />
            <span className="text-[#E41133] text-[10.5px] font-bold tracking-[0.32em] uppercase">Published Works</span>
            <div className="h-px w-10 bg-[#E41133]" />
          </motion.div>
          <motion.h2
            id="books-heading"
            variants={fadeInUp}
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-[#0B0F19] tracking-[-0.025em] leading-[1.05] mb-4"
          >
            Executive Insights,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
              Published.
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#4B5563] text-[15px] max-w-lg mx-auto leading-[1.75]">
            Two books that have become essential reading for technology executives and
            organizational leaders across corporate America.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {BOOKS.map((book, i) => (
            <BookCard key={book.title} book={book} direction={i === 0 ? "left" : "right"} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 6: SPEAKING
// ════════════════════════════════════════════════════════

const SPEAKING_TOPICS = [
  {
    Icon: TrendingUp,
    category: "Technology Leadership",
    headline: "Digital Transformation at the Executive Level",
    description:
      "How elite organizations leverage technology as a strategic weapon—not an operational afterthought. Dr. Campbell draws from his experience leading IT for NBA, MLB, and municipal operations at scale.",
    outcomes: [
      "Framework for technology-driven competitive advantage",
      "Aligning IT strategy with enterprise business vision",
      "Building high-performance technology cultures",
      "Leading through enterprise-wide digital transformation",
    ],
  },
  {
    Icon: Users,
    category: "Executive Development",
    headline: "The Anatomy of an Elite Technology Executive",
    description:
      "A masterclass on what separates good technology leaders from exceptional ones—exploring the executive presence, influence, and strategic thinking required to lead at the highest levels.",
    outcomes: [
      "Developing Soft Power as a leadership multiplier",
      "Executive presence and communication mastery",
      "From manager to C-Suite: the leadership blueprint",
      "Navigating organizational politics with integrity",
    ],
  },
  {
    Icon: Target,
    category: "Career Navigation",
    headline: "Breaking Through: Minority Leadership in Corporate America",
    description:
      "A courageous, direct conversation about the real challenges and extraordinary opportunities facing minority technology executives—with actionable strategies for advancement and lasting impact.",
    outcomes: [
      "Building strategic networks that accelerate careers",
      "Overcoming systemic barriers through excellence",
      "Mentoring and sponsoring the next generation",
      "Creating inclusive cultures in technology organizations",
    ],
  },
] as const;

const SpeakingSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.08);

  return (
    <section
      id="speaking"
      ref={ref}
      className="relative py-24 lg:py-32 xl:py-36 bg-[#0B0F19] overflow-hidden"
      aria-labelledby="speaking-heading"
    >
      {/* Technology abstract background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.22]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="speaking-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#60A5FA" strokeWidth="0.8"/>
            </pattern>
            <pattern id="speaking-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="0" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="40" cy="40" r="1.5" fill="#60A5FA"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#speaking-grid)"/>
          <rect width="100%" height="100%" fill="url(#speaking-dots)"/>
          {/* Horizontal traces */}
          <line x1="0" y1="80" x2="28%" y2="80" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="72%" y1="80" x2="100%" y2="80" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="15%" y1="200" x2="42%" y2="200" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="58%" y1="200" x2="85%" y2="200" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="0" y1="320" x2="22%" y2="320" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="78%" y1="320" x2="100%" y2="320" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="5%" y1="440" x2="38%" y2="440" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="62%" y1="440" x2="95%" y2="440" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Vertical connectors */}
          <line x1="28%" y1="0" x2="28%" y2="120" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="72%" y1="0" x2="72%" y2="120" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="42%" y1="120" x2="42%" y2="280" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="58%" y1="120" x2="58%" y2="280" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="22%" y1="280" x2="22%" y2="400" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="78%" y1="280" x2="78%" y2="400" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Node circles */}
          <circle cx="28%" cy="80" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="72%" cy="80" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="42%" cy="200" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="58%" cy="200" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="22%" cy="320" r="5" fill="#E41133" stroke="#F87171" strokeWidth="1.5"/>
          <circle cx="78%" cy="320" r="5" fill="#E41133" stroke="#F87171" strokeWidth="1.5"/>
          <circle cx="38%" cy="440" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="62%" cy="440" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
        </svg>
        {/* Glow orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#3B82F6]/[0.12] blur-[90px] rounded-full"/>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#6366F1]/[0.12] blur-[90px] rounded-full"/>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-[#E41133]/[0.05] blur-[70px] rounded-full"/>
        {/* Edge fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-[#0B0F19]/80"/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/40 via-transparent to-[#0B0F19]/40"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#E41133]" />
            <span className="text-[#E41133] text-[10.5px] font-bold tracking-[0.32em] uppercase">Keynote Speaking</span>
            <div className="h-px w-10 bg-[#E41133]" />
          </motion.div>
          <motion.h2
            id="speaking-heading"
            variants={fadeInUp}
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-white tracking-[-0.025em] leading-[1.05] mb-4"
          >
            Inspiring Audiences.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
              Driving Change.
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#9CA3AF] text-[15px] max-w-2xl mx-auto leading-[1.75]">
            Dr. Campbell brings 30+ years of frontline executive experience to every stage—
            delivering talks that don't just inspire, they transform how organizations think, lead, and compete.
          </motion.p>
        </motion.div>

        {/* Topic cards */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-6 mb-14"
        >
          {SPEAKING_TOPICS.map(({ Icon, category, headline, description, outcomes }) => (
            <motion.article
              key={category}
              variants={fadeInUp}
              className="group relative flex flex-col p-8 bg-[#111827] border border-white/[0.07] rounded-[3px] hover:border-[#E41133]/25 hover:-translate-y-1.5 transition-all duration-400 hover:shadow-[0_16px_48px_rgba(228,17,51,0.09)]"
            >
              {/* Icon */}
              <div className="w-[46px] h-[46px] rounded-[3px] bg-[#E41133]/[0.09] border border-[#E41133]/[0.18] flex items-center justify-center mb-6 group-hover:bg-[#E41133]/[0.16] transition-colors duration-300 flex-shrink-0">
                <Icon size={21} className="text-[#E41133]" />
              </div>

              <span className="text-[#E41133] text-[10px] font-black tracking-[0.28em] uppercase mb-3 block">
                {category}
              </span>
              <h3 className="text-white font-bold text-[16.5px] leading-[1.35] mb-4 group-hover:text-[#F9FAFB] transition-colors">
                {headline}
              </h3>
              <p className="text-[#6B7280] text-[13.5px] leading-[1.78] mb-6 flex-1">{description}</p>

              <div className="h-px bg-white/[0.07] mb-6" />

              <div className="mb-7">
                <p className="text-[#9CA3AF] text-[10px] font-black tracking-[0.28em] uppercase mb-4">
                  Audience Outcomes
                </p>
                <ul className="space-y-2.5" role="list">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#E41133] flex-shrink-0 mt-[5px]" aria-hidden="true" />
                      <span className="text-[#9CA3AF] text-[12.5px] leading-[1.6]">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-[#E41133] text-[13px] font-bold group-hover:gap-3 transition-all duration-300 mt-auto cursor-pointer">
                <span>Book this Topic</span>
                <ArrowRight size={13} />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Keynote + Award portraits — hero-style, two-column */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-14">

          {/* ── LEFT: Keynote portrait ── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div variants={slideInLeft} className="relative">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -inset-[2px] rounded-[4px] bg-gradient-to-br from-[#E41133]/50 via-transparent to-[#E41133]/25"
                aria-hidden="true"
              />
              <div
                className="relative bg-gradient-to-br from-[#1a2035] via-[#111827] to-[#0B0F19] rounded-[3px] overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: "3/4" }}
              >
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-[#E41133]/[0.07] to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(228,17,51,0.08),transparent_65%)]" />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-transparent" />
                </div>
                <Image
                  src="/dr-mark-campbell-keynote.jpg"
                  alt="Dr. Mark Campbell delivering a keynote address"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-[1.5px] w-10 bg-[#E41133] mb-3" />
                  <p className="text-white font-black text-[18px] tracking-[-0.02em] leading-tight">Dr. Mark Campbell</p>
                  <p className="text-[#E41133] text-[10px] font-bold tracking-[0.22em] uppercase mt-1.5">Keynote Speaker · Technology Executive</p>
                </div>
                {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                  <div key={pos} aria-hidden="true"
                    className={`absolute w-[18px] h-[18px] ${
                      pos === "tl" ? "top-4 left-4 border-t-2 border-l-2" :
                      pos === "tr" ? "top-4 right-4 border-t-2 border-r-2" :
                      pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2" :
                      "bottom-4 right-4 border-b-2 border-r-2"
                    } border-[#E41133]/60`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.35 }}
              className="absolute -left-5 top-10 bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[148px]"
              aria-label="200 plus keynotes delivered"
            >
              <div className="text-[26px] font-black text-white leading-none mb-1">200<span className="text-[#E41133]">+</span></div>
              <div className="text-[11px] text-[#6B7280] leading-[1.4]">Keynotes Delivered</div>
              <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.48 }}
              className="absolute -right-5 top-[38%] bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[152px]"
              aria-label="Fortune 500 conference stages"
            >
              <div className="text-[18px] font-black text-white leading-none mb-1">Fortune<br/>500</div>
              <div className="text-[11px] text-[#6B7280] leading-[1.4]">Conference Stages</div>
              <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}
              className="absolute -left-3 bottom-[14%] bg-[#E41133]/[0.12] backdrop-blur-xl border border-[#E41133]/[0.22] rounded-[3px] p-4 shadow-xl w-[148px]"
              aria-label="Nationally recognized speaker"
            >
              <Star size={15} className="text-[#E41133] mb-2" fill="currentColor" />
              <div className="text-[12px] text-white font-bold leading-[1.35] mb-0.5">Nationally Recognized</div>
              <div className="text-[10.5px] text-[#9CA3AF]">Award-Winning Speaker</div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Award portrait ── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div variants={slideInRight} className="relative">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="absolute -inset-[2px] rounded-[4px] bg-gradient-to-br from-[#E41133]/50 via-transparent to-[#E41133]/25"
                aria-hidden="true"
              />
              <div
                className="relative bg-gradient-to-br from-[#1a2035] via-[#111827] to-[#0B0F19] rounded-[3px] overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: "3/4" }}
              >
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r from-[#E41133]/[0.07] to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(228,17,51,0.08),transparent_65%)]" />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-transparent" />
                </div>
                <Image
                  src="/Award-Dr mark Campbell.png"
                  alt="Dr. Mark Campbell receiving an award"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-[1.5px] w-10 bg-[#E41133] mb-3" />
                  <p className="text-white font-black text-[18px] tracking-[-0.02em] leading-tight">Dr. Mark Campbell</p>
                  <p className="text-[#E41133] text-[10px] font-bold tracking-[0.22em] uppercase mt-1.5">Award-Winning Executive · Author</p>
                </div>
                {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                  <div key={pos} aria-hidden="true"
                    className={`absolute w-[18px] h-[18px] ${
                      pos === "tl" ? "top-4 left-4 border-t-2 border-l-2" :
                      pos === "tr" ? "top-4 right-4 border-t-2 border-r-2" :
                      pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2" :
                      "bottom-4 right-4 border-b-2 border-r-2"
                    } border-[#E41133]/60`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.35 }}
              className="absolute -right-5 top-10 bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[148px]"
              aria-label="National recognition and awards"
            >
              <div className="text-[26px] font-black text-white leading-none mb-1"><span className="text-[#E41133]">#</span>1</div>
              <div className="text-[11px] text-[#6B7280] leading-[1.4]">National Recognition</div>
              <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.48 }}
              className="absolute -left-5 top-[38%] bg-[#111827]/95 backdrop-blur-xl border border-white/[0.09] rounded-[3px] p-4 shadow-2xl w-[152px]"
              aria-label="NBA and MLB leadership"
            >
              <div className="text-[18px] font-black text-white leading-none mb-1">NBA &amp;<br/>MLB</div>
              <div className="text-[11px] text-[#6B7280] leading-[1.4]">Sports Leadership</div>
              <div className="mt-2.5 h-[1.5px] w-7 bg-[#E41133]" />
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}
              className="absolute -right-3 bottom-[14%] bg-[#E41133]/[0.12] backdrop-blur-xl border border-[#E41133]/[0.22] rounded-[3px] p-4 shadow-xl w-[148px]"
              aria-label="Award winning author"
            >
              <Award size={15} className="text-[#E41133] mb-2" />
              <div className="text-[12px] text-white font-bold leading-[1.35] mb-0.5">Award-Winning</div>
              <div className="text-[10.5px] text-[#9CA3AF]">Author &amp; Leader</div>
            </motion.div>
          </motion.div>

        </div>

        {/* Stats row */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { stat: "200+", label: "Keynotes Delivered" },
            { stat: "Fortune 500", label: "Conference Stages" },
            { stat: "NBA & MLB", label: "Sports Leadership" },
            { stat: "National", label: "Recognition & Awards" },
          ].map(({ stat, label }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              className="text-center p-6 bg-[#111827] border border-white/[0.06] rounded-[3px] hover:border-[#E41133]/20 transition-colors duration-300"
            >
              <div className="text-[20px] font-black text-white tracking-[-0.02em] mb-1.5">{stat}</div>
              <div className="text-[11.5px] text-[#6B7280] font-semibold tracking-[0.05em]">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 7: LEADERSHIP PHILOSOPHY
// ════════════════════════════════════════════════════════

const PHILOSOPHY_QUOTES = [
  {
    quote: "The best technology leaders I know didn't become great by mastering technology. They became great by mastering people.",
    theme: "People-First Leadership",
  },
  {
    quote: "Diversity in technology leadership isn't a goal to achieve. It's a competitive advantage hiding in plain sight.",
    theme: "Inclusive Excellence",
  },
  {
    quote: "Organizations don't transform. People do. And people transform when leaders create the conditions for courage.",
    theme: "Transformational Culture",
  },
] as const;

const PHILOSOPHY_PILLARS = [
  {
    Icon: Shield,
    title: "Integrity First",
    desc: "Leadership without integrity is management. Dr. Campbell's approach demands leaders hold themselves to the highest standards of character and accountability—in every room, every conversation.",
  },
  {
    Icon: Lightbulb,
    title: "Innovation Mindset",
    desc: "True innovation lives at the intersection of technology, culture, and human creativity. Leaders must cultivate environments where new ideas are expected, not exceptional.",
  },
  {
    Icon: Users,
    title: "Inclusive Excellence",
    desc: "Organizations that embrace diversity of thought, background, and lived experience don't just check boxes—they build durable competitive advantages that compound over time.",
  },
  {
    Icon: TrendingUp,
    title: "Resilient Growth",
    desc: "The leaders who endure see adversity as data—information that refines strategy, builds character, and ultimately drives the breakthrough performance that defines legacies.",
  },
] as const;

const LeadershipSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.1);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActiveQuote((v) => (v + 1) % PHILOSOPHY_QUOTES.length), 4500);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <section
      id="leadership"
      ref={ref}
      className="py-24 lg:py-32 xl:py-36 bg-[#111827] relative overflow-hidden"
      aria-labelledby="leadership-heading"
    >
      {/* Texture + border accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E41133]/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E41133]/25 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-18"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#E41133]" />
            <span className="text-[#E41133] text-[10.5px] font-bold tracking-[0.32em] uppercase">Leadership Philosophy</span>
            <div className="h-px w-10 bg-[#E41133]" />
          </motion.div>
          <motion.h2
            id="leadership-heading"
            variants={fadeInUp}
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-white tracking-[-0.025em] leading-[1.05]"
          >
            The Principles That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
              Drive Excellence
            </span>
          </motion.h2>
        </motion.div>

        {/* Quote carousel */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative text-center">
            <Quote
              size={64}
              className="text-[#E41133]/[0.12] absolute -top-5 -left-2 lg:-left-10"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.55, ease }}
                className="px-8 lg:px-16"
              >
                <p className="text-[clamp(1.15rem,2.8vw,1.55rem)] font-bold text-white leading-[1.55] italic tracking-[-0.015em] mb-7">
                  &ldquo;{PHILOSOPHY_QUOTES[activeQuote].quote}&rdquo;
                </p>
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-8 bg-[#E41133]" />
                  <span className="text-[#E41133] text-[12.5px] font-bold tracking-[0.12em] uppercase">
                    {PHILOSOPHY_QUOTES[activeQuote].theme}
                  </span>
                  <div className="h-px w-8 bg-[#E41133]" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-9" role="tablist" aria-label="Leadership philosophy quotes">
              {PHILOSOPHY_QUOTES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeQuote}
                  aria-label={`Quote ${i + 1}`}
                  onClick={() => setActiveQuote(i)}
                  className={`h-[5px] rounded-full transition-all duration-350 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] ${
                    i === activeQuote ? "bg-[#E41133] w-7" : "bg-white/[0.2] w-[5px] hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PHILOSOPHY_PILLARS.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="group p-6 bg-[#0B0F19] border border-white/[0.07] rounded-[3px] hover:border-[#E41133]/20 hover:bg-[#0d1320] transition-all duration-350"
            >
              <div className="w-[42px] h-[42px] rounded-[3px] bg-[#E41133]/[0.09] border border-[#E41133]/[0.18] flex items-center justify-center mb-5 group-hover:bg-[#E41133]/[0.16] transition-colors">
                <Icon size={19} className="text-[#E41133]" />
              </div>
              <h3 className="text-white font-bold text-[15px] mb-3 tracking-[-0.01em]">{title}</h3>
              <p className="text-[#6B7280] text-[13px] leading-[1.78]">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 8: CONTACT / BOOKING
// ════════════════════════════════════════════════════════

type FormFields = {
  name: string;
  organization: string;
  email: string;
  eventDate: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const INITIAL_FORM: FormFields = {
  name: "",
  organization: "",
  email: "",
  eventDate: "",
  message: "",
};

const inputBase =
  "w-full px-4 py-3 bg-[#0B0F19] border rounded-[3px] text-white placeholder-[#374151] text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#E41133]/70 transition-all duration-200";

const inputNormal = `${inputBase} border-white/[0.09] hover:border-white/[0.18] focus:border-[#E41133]/50`;
const inputError = `${inputBase} border-[#E41133]/50`;

const ContactSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.08);
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.organization.trim()) e.organization = "Organization is required";
    if (!form.email.trim()) {
      e.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) e.message = "Please share your event details";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 lg:py-32 xl:py-36 bg-[#0B0F19] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Technology abstract background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.22]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#60A5FA" strokeWidth="0.8"/>
            </pattern>
            <pattern id="contact-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="0" r="2" fill="#60A5FA"/>
              <circle cx="0" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="80" cy="80" r="2" fill="#60A5FA"/>
              <circle cx="40" cy="40" r="1.5" fill="#60A5FA"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)"/>
          <rect width="100%" height="100%" fill="url(#contact-dots)"/>
          {/* Horizontal traces */}
          <line x1="0" y1="60" x2="25%" y2="60" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="75%" y1="60" x2="100%" y2="60" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="12%" y1="180" x2="40%" y2="180" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="60%" y1="180" x2="88%" y2="180" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="0" y1="300" x2="30%" y2="300" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="70%" y1="300" x2="100%" y2="300" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="8%" y1="420" x2="35%" y2="420" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="65%" y1="420" x2="92%" y2="420" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Vertical connectors */}
          <line x1="25%" y1="0" x2="25%" y2="100" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="75%" y1="0" x2="75%" y2="100" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="40%" y1="100" x2="40%" y2="260" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="60%" y1="100" x2="60%" y2="260" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="30%" y1="260" x2="30%" y2="380" stroke="#93C5FD" strokeWidth="1.5"/>
          <line x1="70%" y1="260" x2="70%" y2="380" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Node circles */}
          <circle cx="25%" cy="60" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="75%" cy="60" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="40%" cy="180" r="5" fill="#E41133" stroke="#F87171" strokeWidth="1.5"/>
          <circle cx="60%" cy="180" r="5" fill="#E41133" stroke="#F87171" strokeWidth="1.5"/>
          <circle cx="30%" cy="300" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="70%" cy="300" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="35%" cy="420" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
          <circle cx="65%" cy="420" r="5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5"/>
        </svg>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#3B82F6]/[0.12] blur-[90px] rounded-full"/>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-[#6366F1]/[0.12] blur-[90px] rounded-full"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[150px] bg-[#E41133]/[0.05] blur-[70px] rounded-full"/>
        {/* Edge fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-[#0B0F19]/80"/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/40 via-transparent to-[#0B0F19]/40"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[480px_1fr] gap-16 lg:gap-20 items-stretch">

          {/* ─── Left: Info + Portrait ─── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#E41133]" />
              <span className="text-[#E41133] text-[10.5px] font-bold tracking-[0.32em] uppercase">Executive Bookings</span>
            </motion.div>

            <motion.h2
              id="contact-heading"
              variants={fadeInUp}
              className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-white tracking-[-0.025em] leading-[1.05] mb-6"
            >
              Bring Dr. Mark
              <br />
              Campbell to Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
                Organization.
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-[15px] text-[#9CA3AF] leading-[1.8] mb-8">
              Whether you're planning a corporate conference, executive retreat,
              leadership summit, or enterprise-wide transformation initiative,
              Dr. Campbell delivers experiences that move organizations forward
              and leaders toward their fullest potential.
            </motion.p>

            {/* Hero-style portrait — grows to fill remaining height */}
            <motion.div variants={slideInLeft} className="relative flex-1 min-h-[360px]">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -inset-[2px] rounded-[4px] bg-gradient-to-br from-[#E41133]/50 via-transparent to-[#E41133]/25"
                aria-hidden="true"
              />
              <div className="relative h-full bg-gradient-to-br from-[#1a2035] via-[#111827] to-[#0B0F19] rounded-[3px] overflow-hidden border border-white/[0.07]">
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-[#E41133]/[0.07] to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(228,17,51,0.08),transparent_65%)]" />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-transparent" />
                </div>
                <Image
                  src="/dr-mark-campbell-2.jpg"
                  alt="Dr. Mark Campbell, technology executive and keynote speaker"
                  fill
                  sizes="480px"
                  className="object-contain object-top"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-[1.5px] w-10 bg-[#E41133] mb-3" />
                  <p className="text-white font-black text-[18px] tracking-[-0.02em] leading-tight">Dr. Mark Campbell</p>
                  <p className="text-[#E41133] text-[10px] font-bold tracking-[0.22em] uppercase mt-1.5">Vice President of IT · Houston Rockets</p>
                </div>
                {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                  <div key={pos} aria-hidden="true"
                    className={`absolute w-[18px] h-[18px] ${
                      pos === "tl" ? "top-4 left-4 border-t-2 border-l-2" :
                      pos === "tr" ? "top-4 right-4 border-t-2 border-r-2" :
                      pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2" :
                      "bottom-4 right-4 border-b-2 border-r-2"
                    } border-[#E41133]/60`}
                  />
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* ─── Right: Form ─── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <div className="relative flex-1 flex flex-col">
              {/* Glow border */}
              <div className="absolute -inset-px rounded-[4px] bg-gradient-to-br from-[#E41133]/18 via-transparent to-[#E41133]/08" aria-hidden="true" />
              <div className="relative flex-1 bg-[#111827] border border-white/[0.09] rounded-[3px] p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      aria-label="Keynote booking inquiry form"
                    >
                      <h3 className="text-white font-black text-[19px] tracking-[-0.02em] mb-1.5">
                        Executive Booking Inquiry
                      </h3>
                      <p className="text-[#6B7280] text-[13px] mb-8 leading-relaxed">
                        All inquiries are reviewed personally. Expect a response within 48 business hours.
                      </p>

                      <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="name" className="block text-[#D1D5DB] text-[10.5px] font-black tracking-[0.22em] uppercase mb-2">
                            Full Name <span className="text-[#E41133]" aria-label="required">*</span>
                          </label>
                          <input
                            id="name" name="name" type="text"
                            value={form.name} onChange={handleChange}
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "err-name" : undefined}
                            placeholder="Dr. Jane Smith"
                            className={errors.name ? inputError : inputNormal}
                          />
                          {errors.name && (
                            <p id="err-name" role="alert" className="mt-1.5 text-[#E41133] text-[12px]">{errors.name}</p>
                          )}
                        </div>

                        {/* Organization */}
                        <div>
                          <label htmlFor="organization" className="block text-[#D1D5DB] text-[10.5px] font-black tracking-[0.22em] uppercase mb-2">
                            Organization <span className="text-[#E41133]" aria-label="required">*</span>
                          </label>
                          <input
                            id="organization" name="organization" type="text"
                            value={form.organization} onChange={handleChange}
                            autoComplete="organization"
                            aria-required="true"
                            aria-invalid={!!errors.organization}
                            aria-describedby={errors.organization ? "err-org" : undefined}
                            placeholder="Fortune 500 Company"
                            className={errors.organization ? inputError : inputNormal}
                          />
                          {errors.organization && (
                            <p id="err-org" role="alert" className="mt-1.5 text-[#E41133] text-[12px]">{errors.organization}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-[#D1D5DB] text-[10.5px] font-black tracking-[0.22em] uppercase mb-2">
                            Email Address <span className="text-[#E41133]" aria-label="required">*</span>
                          </label>
                          <input
                            id="email" name="email" type="email"
                            value={form.email} onChange={handleChange}
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "err-email" : undefined}
                            placeholder="you@company.com"
                            className={errors.email ? inputError : inputNormal}
                          />
                          {errors.email && (
                            <p id="err-email" role="alert" className="mt-1.5 text-[#E41133] text-[12px]">{errors.email}</p>
                          )}
                        </div>

                        {/* Event Date */}
                        <div>
                          <label htmlFor="eventDate" className="block text-[#D1D5DB] text-[10.5px] font-black tracking-[0.22em] uppercase mb-2">
                            Event Date
                          </label>
                          <input
                            id="eventDate" name="eventDate" type="date"
                            value={form.eventDate} onChange={handleChange}
                            className={`${inputNormal} [color-scheme:dark]`}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-[#D1D5DB] text-[10.5px] font-black tracking-[0.22em] uppercase mb-2">
                            Event Details <span className="text-[#E41133]" aria-label="required">*</span>
                          </label>
                          <textarea
                            id="message" name="message"
                            value={form.message} onChange={handleChange}
                            rows={4}
                            aria-required="true"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "err-message" : undefined}
                            placeholder="Tell us about your event, expected audience size, and key speaking objectives..."
                            className={`${errors.message ? inputError : inputNormal} resize-none`}
                          />
                          {errors.message && (
                            <p id="err-message" role="alert" className="mt-1.5 text-[#E41133] text-[12px]">{errors.message}</p>
                          )}
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2.5 px-6 py-[15px] bg-[#E41133] hover:bg-[#cc0e2b] disabled:opacity-55 disabled:cursor-not-allowed text-white font-black text-[13.5px] tracking-[0.04em] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_36px_rgba(228,17,51,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
                          aria-busy={submitting}
                        >
                          {submitting ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
                                className="block w-[15px] h-[15px] border-2 border-white/30 border-t-white rounded-full"
                                aria-hidden="true"
                              />
                              Submitting Inquiry…
                            </>
                          ) : (
                            <>
                              Submit Booking Inquiry
                              <ArrowRight size={15} strokeWidth={2.5} />
                            </>
                          )}
                        </button>

                        {/* Info cards below submit */}
                        <div className="space-y-3 pt-2">
                          {[
                            { Icon: Mic, label: "Keynote Engagements", detail: "Available for national & international events" },
                            { Icon: Mail, label: "Executive Inquiries", detail: "Direct response within 48 business hours" },
                            { Icon: Calendar, label: "Speaking Availability", detail: "Limited dates — secure your event early" },
                          ].map(({ Icon, label, detail }) => (
                            <div
                              key={label}
                              className="flex items-center gap-4 p-3.5 bg-[#0B0F19] border border-white/[0.07] rounded-[3px]"
                            >
                              <div className="w-[36px] h-[36px] rounded-[3px] bg-[#E41133]/[0.09] border border-[#E41133]/[0.18] flex items-center justify-center flex-shrink-0">
                                <Icon size={16} className="text-[#E41133]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px] font-bold leading-tight">{label}</p>
                                <p className="text-[#6B7280] text-[12px] mt-0.5">{detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease }}
                      className="text-center py-14"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-[68px] h-[68px] rounded-full bg-[#E41133]/[0.1] border border-[#E41133]/25 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle size={34} className="text-[#E41133]" />
                      </motion.div>
                      <h3 className="text-white font-black text-[20px] tracking-[-0.02em] mb-3">Inquiry Received</h3>
                      <p className="text-[#9CA3AF] text-[14px] leading-[1.8] max-w-sm mx-auto">
                        Thank you for your interest in booking Dr. Mark Campbell. Our team will review
                        your inquiry and respond within 48 business hours.
                      </p>
                      <div className="mt-7 h-px bg-white/[0.09] max-w-[56px] mx-auto" />
                      <p className="text-[#E41133] text-[10.5px] font-bold tracking-[0.22em] uppercase mt-5">
                        Dr. Mark Campbell · Executive Office
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// SECTION 9: FOOTER
// ════════════════════════════════════════════════════════

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* ─── Brand ─── */}
          <div>
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Dr. Mark Campbell"
                width={180}
                height={60}
                className="h-[48px] w-auto object-contain mb-2"
              />
              <div className="text-[#E41133] text-[10px] font-bold tracking-[0.24em] uppercase">
                PhD · D.Sc. · Executive · Speaker · Author
              </div>
            </div>
            <p className="text-[#6B7280] text-[13.5px] leading-[1.78] mb-0">
              Technology executive, keynote speaker, and author advancing leadership
              and diversity in corporate America.
            </p>
          </div>

          {/* ─── Quick Links ─── */}
          <div>
            <h3 className="text-white text-[10.5px] font-black tracking-[0.22em] uppercase mb-5">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {["Home", "About", "Books", "Speaking", "Leadership", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); smoothScrollTo(`#${link.toLowerCase()}`); }}
                    className="group inline-flex items-center gap-2 text-[#6B7280] hover:text-white text-[13.5px] transition-colors duration-300 focus-visible:outline-none focus-visible:text-white"
                  >
                    <span className="w-0 h-px bg-[#E41133] group-hover:w-3 transition-all duration-300" aria-hidden="true" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Credentials ─── */}
          <div>
            <h3 className="text-white text-[10.5px] font-black tracking-[0.22em] uppercase mb-5">Credentials</h3>
            <ul className="space-y-2.5" role="list">
              {[
                "Doctor of Science (D.Sc.)",
                "PhD · Cyber Leadership",
                "VP of IT · Houston Rockets",
                "Former CIO · City of Atlanta",
                "Former CIO · Chicago White Sox",
                "U.S. Army Veteran",
                "Author · Speaker · Strategist",
              ].map((cred) => (
                <li key={cred} className="flex items-start gap-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#E41133] flex-shrink-0 mt-[5px]" aria-hidden="true" />
                  <span className="text-[#6B7280] text-[13px]">{cred}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Connect ─── */}
          <div>
            <h3 className="text-white text-[10.5px] font-black tracking-[0.22em] uppercase mb-5">Connect</h3>
            <p className="text-[#6B7280] text-[13px] leading-[1.75] mb-5">
              Follow Dr. Campbell for insights on technology leadership, executive development, and diversity.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/markcampbelltechexec/" },
                { Icon: Twitter, label: "Twitter / X", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
                { Icon: Globe, label: "Website", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-[36px] h-[36px] flex items-center justify-center rounded-[3px] bg-[#0B0F19] border border-white/[0.08] text-[#6B7280] hover:text-white hover:border-[#E41133]/30 hover:bg-[#E41133]/[0.07] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133]"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Lower bar ─── */}
      <div className="border-t border-white/[0.055]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#374151] text-[12px]">
            &copy; {year} Dr. Mark Campbell, PhD &amp; D.Sc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#374151] hover:text-[#9CA3AF] text-[12px] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#9CA3AF]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ════════════════════════════════════════════════════════
// PAGE: Default Export
// ════════════════════════════════════════════════════════

export default function DrMarkCampbellPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#E41133] focus:text-white focus:font-bold focus:rounded-[3px] focus:text-sm"
      >
        Skip to main content
      </a>
      <TopBar />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <TrustSection />
        <AboutSection />
        <BooksSection />
        <SpeakingSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
