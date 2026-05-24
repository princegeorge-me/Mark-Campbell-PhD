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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F19]/96 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(228,17,51,0.12)]"
          : "bg-transparent"
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
          className="group flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133] rounded-sm"
          aria-label="Dr. Mark Campbell — Home"
        >
          <span className="text-white font-black text-[17px] tracking-[-0.03em] group-hover:text-[#F9FAFB] transition-colors duration-300">
            Dr. Mark Campbell
          </span>
          <span className="text-[#E41133] text-[10px] font-bold tracking-[0.22em] uppercase mt-0.5">
            PhD · Executive · Speaker
          </span>
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
      className="relative min-h-screen flex items-center bg-[#0B0F19] overflow-hidden pt-[72px]"
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

                  {/* Photo placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-[#1F2937]/80 border-2 border-white/[0.08] flex items-center justify-center mb-4">
                      <Users size={40} className="text-[#374151]" />
                    </div>
                    <p className="text-[#374151] text-[10px] tracking-[0.2em] uppercase font-semibold">Executive Portrait</p>
                    <p className="text-[#2D3748] text-[10px] mt-1">Replace with hi-res photo</p>
                  </div>

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
      className="py-20 bg-[#111827] border-y border-white/[0.055]"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
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
  description: string;
  audience: string;
  takeaways: string[];
  spineColor: string;
  coverFrom: string;
  coverTo: string;
};

const BOOKS: Book[] = [
  {
    title: "COURAGEOUS CONVERSATIONS",
    subtitle: "Having the Difficult Dialogues That Drive Transformation",
    description:
      "A framework for leaders who understand that the most important conversations are often the ones most avoided. Dr. Campbell delivers a proven methodology for creating psychological safety while tackling organizational culture, race, equity, and performance head-on.",
    audience: "For C-Suite executives, HR leaders, and organizational development professionals.",
    takeaways: [
      "The 5-Stage Courageous Conversation Framework",
      "Building psychological safety in executive teams",
      "Navigating race and equity in corporate America",
      "Converting conflict into organizational growth",
    ],
    spineColor: "#E41133",
    coverFrom: "#1a0a0f",
    coverTo: "#0d1117",
  },
  {
    title: "SOFT POWER",
    subtitle: "The Hidden Force Behind Exceptional Technology Leaders",
    description:
      "Drawing on 30+ years of executive leadership across sports, government, and military, Dr. Campbell reveals why the most impactful technology leaders aren't defined by their technical skills—but by their ability to inspire, influence, and lead with enduring authority.",
    audience: "For technology executives, aspiring CIOs, and emerging IT leaders.",
    takeaways: [
      "The Soft Power Leadership Model for tech leaders",
      "Influence without authority in tech organizations",
      "Building executive presence as a minority leader",
      "Mastering stakeholder alignment and enterprise trust",
    ],
    spineColor: "#E41133",
    coverFrom: "#0a1020",
    coverTo: "#0d1117",
  },
];

const BookCard: FC<{ book: Book; direction: "left" | "right"; inView: boolean }> = ({
  book,
  direction,
  inView,
}) => {
  const variant = direction === "left" ? slideInLeft : slideInRight;
  return (
    <motion.article
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative overflow-hidden rounded-[3px] border border-white/[0.08] hover:border-[#E41133]/30 transition-all duration-500 hover:shadow-[0_0_48px_rgba(228,17,51,0.09)] bg-[#0e131f]"
    >
      {/* Subtle top highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E41133]/30 to-transparent" aria-hidden="true" />

      <div className="relative p-8 lg:p-10">
        {/* Book mockup + title block */}
        <div className="flex items-start gap-7 mb-8">
          {/* 3D book mockup */}
          <div className="flex-shrink-0 relative" style={{ perspective: "500px" }} aria-hidden="true">
            <div className="relative w-[88px] h-[124px]" style={{ transformStyle: "preserve-3d" }}>
              {/* Spine */}
              <div
                className="absolute top-0 left-0 bottom-0 w-[18px] flex items-center justify-center rounded-l-[2px]"
                style={{
                  background: book.spineColor,
                  transform: "rotateY(70deg) translateX(-9px)",
                  transformOrigin: "right center",
                }}
              >
                <span className="text-white text-[7px] font-black uppercase tracking-widest"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  Campbell
                </span>
              </div>
              {/* Cover */}
              <div
                className="absolute top-0 right-0 bottom-0 rounded-r-[2px] flex flex-col items-center justify-center gap-1.5 p-3"
                style={{
                  left: "8px",
                  background: `linear-gradient(145deg, ${book.coverFrom}, ${book.coverTo})`,
                  border: "1px solid rgba(255,255,255,0.07)",
                  transform: "rotateY(-15deg)",
                  transformOrigin: "left center",
                  boxShadow: "6px 6px 24px rgba(0,0,0,0.6), -1px 0 8px rgba(0,0,0,0.4)",
                }}
              >
                <div className="w-8 h-[1.5px] bg-[#E41133]" />
                <p className="text-white text-[7px] font-black text-center leading-[1.3] tracking-wide uppercase">
                  {book.title}
                </p>
                <div className="w-8 h-[1.5px] bg-[#E41133]" />
                <p className="text-[#4B5563] text-[6px] text-center leading-tight">Dr. Mark<br />Campbell</p>
              </div>
            </div>
          </div>

          {/* Title + meta */}
          <div className="flex-1 pt-1">
            <h3 className="text-[19px] lg:text-[22px] font-black text-white tracking-[-0.025em] leading-[1.1] mb-2.5">
              {book.title}
            </h3>
            <p className="text-[#E41133] text-[11.5px] font-bold tracking-[0.06em] leading-snug mb-3">
              {book.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.09] rounded-[3px]">
              <BookOpen size={11} className="text-[#E41133]" />
              <span className="text-[#9CA3AF] text-[11px] font-semibold">Dr. Mark Campbell</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#9CA3AF] text-[14px] leading-[1.8] mb-6">{book.description}</p>

        {/* Takeaways */}
        <div className="mb-6">
          <p className="text-white text-[10.5px] font-black tracking-[0.22em] uppercase mb-3.5">Key Insights</p>
          <ul className="space-y-2.5" role="list">
            {book.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle size={13} className="text-[#E41133] flex-shrink-0 mt-[2px]" />
                <span className="text-[#D1D5DB] text-[13.5px] leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audience note */}
        <div className="mb-8 px-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-[3px]">
          <p className="text-[#6B7280] text-[12.5px] italic">{book.audience}</p>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E41133] hover:bg-[#cc0e2b] text-white font-bold text-[13px] rounded-[3px] transition-all duration-300 hover:shadow-[0_0_24px_rgba(228,17,51,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133]"
          >
            Buy Book
            <ArrowRight size={13} />
          </button>
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent border border-white/[0.15] hover:border-white/30 text-white font-semibold text-[13px] rounded-[3px] transition-all duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Learn More
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const BooksSection: FC = () => {
  const { ref, isInView } = useSectionInView(0.08);

  return (
    <section
      id="books"
      ref={ref}
      className="py-24 lg:py-32 xl:py-36 bg-[#111827]"
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
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-black text-white tracking-[-0.025em] leading-[1.05] mb-4"
          >
            Executive Insights,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E41133] via-[#f03558] to-[#ff5c75]">
              Published.
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#9CA3AF] text-[15px] max-w-lg mx-auto leading-[1.75]">
            Two books that have become essential reading for technology executives and
            organizational leaders across corporate America.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
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
      className="py-24 lg:py-32 xl:py-36 bg-[#0B0F19]"
      aria-labelledby="speaking-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
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
      className="py-24 lg:py-32 xl:py-36 bg-[#0B0F19]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ─── Left: Info ─── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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

            <motion.p variants={fadeInUp} className="text-[15px] text-[#9CA3AF] leading-[1.8] mb-9">
              Whether you're planning a corporate conference, executive retreat,
              leadership summit, or enterprise-wide transformation initiative,
              Dr. Campbell delivers experiences that move organizations forward
              and leaders toward their fullest potential.
            </motion.p>

            <motion.div variants={stagger(0.09)} className="space-y-4 mb-9">
              {[
                {
                  Icon: Mic,
                  label: "Keynote Engagements",
                  detail: "Available for national &amp; international events",
                },
                {
                  Icon: Mail,
                  label: "Executive Inquiries",
                  detail: "Direct response within 48 business hours",
                },
                {
                  Icon: Calendar,
                  label: "Speaking Availability",
                  detail: "Limited dates — secure your event early",
                },
              ].map(({ Icon, label, detail }) => (
                <motion.div
                  key={label}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 bg-[#111827] border border-white/[0.07] rounded-[3px] hover:border-[#E41133]/15 transition-colors duration-300"
                >
                  <div className="w-[42px] h-[42px] rounded-[3px] bg-[#E41133]/[0.09] border border-[#E41133]/[0.18] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#E41133]" />
                  </div>
                  <div>
                    <p className="text-white text-[13.5px] font-bold mb-0.5">{label}</p>
                    <p className="text-[#6B7280] text-[13px]" dangerouslySetInnerHTML={{ __html: detail }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter / X" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Globe, label: "Website" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-[38px] h-[38px] flex items-center justify-center rounded-[3px] bg-[#111827] border border-white/[0.09] text-[#6B7280] hover:text-white hover:border-[#E41133]/35 hover:bg-[#E41133]/[0.08] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133]"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Form ─── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative">
              {/* Glow border */}
              <div className="absolute -inset-px rounded-[4px] bg-gradient-to-br from-[#E41133]/18 via-transparent to-[#E41133]/08" aria-hidden="true" />
              <div className="relative bg-[#111827] border border-white/[0.09] rounded-[3px] p-8 lg:p-10">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] gap-12 lg:gap-14">

          {/* ─── Brand ─── */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <div className="text-white font-black text-[19px] tracking-[-0.025em] mb-1.5">
                Dr. Mark Campbell
              </div>
              <div className="text-[#E41133] text-[10px] font-bold tracking-[0.24em] uppercase">
                PhD · D.Sc. · Executive · Speaker · Author
              </div>
            </div>
            <p className="text-[#6B7280] text-[13.5px] leading-[1.78] max-w-[320px] mb-7">
              Technology executive, keynote speaker, and author dedicated to advancing
              technology leadership, executive development, and diversity in corporate America.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter / X" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Globe, label: "Website" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-[36px] h-[36px] flex items-center justify-center rounded-[3px] bg-[#0B0F19] border border-white/[0.08] text-[#6B7280] hover:text-white hover:border-[#E41133]/30 hover:bg-[#E41133]/[0.07] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E41133]"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ─── Spacer on large ─── */}
          <div className="hidden lg:block" />

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
