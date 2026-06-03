import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Mark Campbell, PhD",
  description:
    "Privacy Policy for markcampbellphd.com — how we collect, use, and protect your personal information in compliance with US federal and state privacy laws.",
};

const LAST_UPDATED = "June 3, 2025";
const SITE_URL     = "https://markcampbellphd.com";
const CONTACT_EMAIL = "info@markcampbellphd.com";

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-white text-[20px] font-black tracking-[-0.02em] mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-[#E41133] flex-shrink-0" />
        {title}
      </h2>
      <div className="text-[#9CA3AF] text-[14.5px] leading-[1.85] space-y-3 pl-9">
        {children}
      </div>
    </section>
  );
}

// ── Highlight box ─────────────────────────────────────────────────────────────
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#E41133]/[0.06] border border-[#E41133]/20 rounded-[4px] px-5 py-4 text-[#D1D5DB] text-[13.5px] leading-[1.8]">
      {children}
    </div>
  );
}

// ── Table of Contents ─────────────────────────────────────────────────────────
const TOC = [
  { href: "#information-collected",  label: "1. Information We Collect" },
  { href: "#how-we-use",             label: "2. How We Use Your Information" },
  { href: "#payment-processing",     label: "3. Payment Processing (Stripe)" },
  { href: "#crm-email",              label: "4. CRM & Email (GoHighLevel)" },
  { href: "#data-sharing",           label: "5. Data Sharing & Disclosure" },
  { href: "#your-rights",            label: "6. Your Privacy Rights (CCPA & More)" },
  { href: "#data-retention",         label: "7. Data Retention" },
  { href: "#security",               label: "8. Security Measures" },
  { href: "#cookies",                label: "9. Cookies & Tracking" },
  { href: "#childrens-privacy",      label: "10. Children's Privacy (COPPA)" },
  { href: "#third-party",            label: "11. Third-Party Services" },
  { href: "#can-spam",               label: "12. Email Communications (CAN-SPAM)" },
  { href: "#changes",                label: "13. Changes to This Policy" },
  { href: "#contact",                label: "14. Contact Us" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19]">

      {/* ── Top bar ── */}
      <header className="border-b border-white/[0.07] bg-[#0B0F19]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#E41133] text-[11px] font-bold tracking-[0.25em] uppercase hover:text-white transition-colors">
            ← Back to Site
          </Link>
          <span className="text-[#4B5563] text-[11px]">Last updated: {LAST_UPDATED}</span>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-[#111827] to-[#0B0F19] border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <p className="text-[#E41133] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
            Legal · Privacy
          </p>
          <h1 className="text-white text-[36px] sm:text-[44px] font-black tracking-[-0.03em] leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.8] max-w-2xl">
            This Privacy Policy describes how Dr. Mark Campbell, PhD ("we," "us," or "our") collects,
            uses, stores, and protects personal information obtained through{" "}
            <span className="text-[#9CA3AF]">{SITE_URL}</span>. It is governed by applicable
            United States federal and state privacy, cybersecurity, and consumer protection laws.
          </p>
          <InfoBox>
            <strong>Effective Date:</strong> {LAST_UPDATED} &nbsp;·&nbsp; This policy applies to all
            visitors, customers, and users who access or interact with our website and services.
          </InfoBox>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[260px_1fr] gap-16">

          {/* ── Table of Contents (sticky sidebar) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[#E41133] text-[10px] font-bold tracking-[0.28em] uppercase mb-4">
                Contents
              </p>
              <nav className="space-y-1.5">
                {TOC.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-[#4B5563] hover:text-[#9CA3AF] text-[12.5px] transition-colors duration-200 leading-snug"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <p className="text-[#4B5563] text-[11px] leading-relaxed">
                  Questions?{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="space-y-12">

            {/* 1 */}
            <Section id="information-collected" title="Information We Collect">
              <p>
                We collect personal information in the following ways when you use our website:
              </p>

              <p className="text-white font-semibold text-[13.5px] !mt-5">A. Information You Provide Directly</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">Contact & Booking Form:</strong> Full name, organisation, email address, event date, and message content.</li>
                <li><strong className="text-[#D1D5DB]">Book Purchases:</strong> Full name, email address, phone number, and billing address (collected by Stripe at checkout).</li>
              </ul>

              <p className="text-white font-semibold text-[13.5px] !mt-5">B. Information Collected Automatically</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">Log Data:</strong> IP address, browser type, operating system, referring URLs, and pages visited, collected automatically by our hosting provider (Vercel).</li>
                <li><strong className="text-[#D1D5DB]">Device Information:</strong> Screen resolution, browser version, and language preference.</li>
              </ul>

              <p className="text-white font-semibold text-[13.5px] !mt-5">C. Payment Information</p>
              <p>
                We do <strong className="text-[#D1D5DB]">not</strong> store credit or debit card numbers on our servers.
                All payment data is collected and processed directly by{" "}
                <strong className="text-[#D1D5DB]">Stripe, Inc.</strong>, a PCI DSS Level 1 certified payment processor.
                We receive only a confirmation of payment and basic order details.
              </p>
            </Section>

            {/* 2 */}
            <Section id="how-we-use" title="How We Use Your Information">
              <p>We use the personal information we collect for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To process and fulfil book orders and provide purchase confirmations</li>
                <li>To respond to speaking engagement and booking inquiries</li>
                <li>To send transactional emails (order confirmations, booking acknowledgements)</li>
                <li>To communicate follow-up information related to purchased products or requested services</li>
                <li>To maintain and improve the security and performance of our website</li>
                <li>To comply with legal obligations under applicable US federal and state law</li>
                <li>To detect and prevent fraudulent transactions and abuse</li>
              </ul>
              <p>
                We do <strong className="text-[#D1D5DB]">not</strong> sell, rent, or trade your personal information to
                third parties for their own marketing purposes.
              </p>

              <InfoBox>
                <strong>Legal Basis (US Applicability):</strong> Our processing of personal information is
                based on contractual necessity (fulfilling your order or inquiry), legitimate business
                interests (security, fraud prevention), legal compliance, and — where required — your
                consent.
              </InfoBox>
            </Section>

            {/* 3 */}
            <Section id="payment-processing" title="Payment Processing (Stripe)">
              <p>
                Book purchases on this website are processed by{" "}
                <strong className="text-[#D1D5DB]">Stripe, Inc.</strong> (185 Berry St, Suite 550,
                San Francisco, CA 94107). When you complete a purchase:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>You are redirected to Stripe's secure, hosted checkout page</li>
                <li>Your payment card details are entered directly into Stripe's encrypted environment</li>
                <li>We receive a payment confirmation, your name, email, phone number, and billing address</li>
                <li>Card numbers, CVV codes, and full financial account details are never transmitted to or stored on our servers</li>
              </ul>
              <p>
                Stripe's data practices are governed by the{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E41133] hover:underline">
                  Stripe Privacy Policy
                </a>
                . Stripe is certified as a PCI Service Provider Level 1 — the highest level of
                payment security certification available under the Payment Card Industry Data
                Security Standard (PCI DSS).
              </p>
            </Section>

            {/* 4 */}
            <Section id="crm-email" title="CRM & Email Communications (GoHighLevel)">
              <p>
                When you purchase a book or submit a booking inquiry, your contact information is
                transmitted to <strong className="text-[#D1D5DB]">GoHighLevel</strong> (HighLevel, Inc.),
                a customer relationship management (CRM) platform we use to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Store your contact record (name, email, phone, address)</li>
                <li>Send you transactional and follow-up emails</li>
                <li>Manage speaking engagement inquiries and responses</li>
                <li>Track communication history for service delivery purposes</li>
              </ul>
              <p>
                GoHighLevel's data practices are governed by the{" "}
                <a href="https://www.gohighlevel.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#E41133] hover:underline">
                  GoHighLevel Privacy Policy
                </a>
                . Your data is only used to deliver the services you have requested.
              </p>
            </Section>

            {/* 5 */}
            <Section id="data-sharing" title="Data Sharing & Disclosure">
              <p>We share personal information only in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">Service Providers:</strong> Stripe (payments), GoHighLevel (CRM/email), and Vercel (website hosting) receive data solely to perform services on our behalf and under confidentiality obligations.</li>
                <li><strong className="text-[#D1D5DB]">Legal Compliance:</strong> We may disclose information when required by law, court order, subpoena, or government authority, including under the Electronic Communications Privacy Act (ECPA) and applicable state laws.</li>
                <li><strong className="text-[#D1D5DB]">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, personal data may be transferred as part of that transaction, subject to equivalent privacy protections.</li>
                <li><strong className="text-[#D1D5DB]">Safety & Fraud Prevention:</strong> We may share information to protect the rights, property, or safety of Dr. Mark Campbell, our users, or the public — including reporting suspected violations under the Computer Fraud and Abuse Act (CFAA).</li>
              </ul>
              <p>We do <strong className="text-[#D1D5DB]">not</strong> sell personal information under any circumstances.</p>
            </Section>

            {/* 6 */}
            <Section id="your-rights" title="Your Privacy Rights (CCPA & State Laws)">
              <p>
                Depending on your state of residence, you may have specific legal rights regarding
                your personal information. We honour the rights provided under:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">California (CCPA/CPRA):</strong> Right to know, right to delete, right to correct, right to opt out of sale (we do not sell data), right to non-discrimination.</li>
                <li><strong className="text-[#D1D5DB]">Virginia (CDPA), Colorado (CPA), Connecticut (CTDPA), Texas (TDPSA):</strong> Right to access, correct, delete, and opt out of targeted advertising.</li>
              </ul>

              <p className="text-white font-semibold text-[13.5px] !mt-5">To exercise your rights:</p>
              <p>
                Submit a verifiable request to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                with the subject line <em>"Privacy Rights Request"</em>. We will respond within
                45 days as required by law. We do not discriminate against users who exercise
                their privacy rights.
              </p>

              <InfoBox>
                <strong>Note for California Residents:</strong> Under the CCPA, you have the right
                to request a list of the categories of personal information we have collected about
                you in the past 12 months and the purposes for which it was used. Contact us at the
                email above to make this request.
              </InfoBox>
            </Section>

            {/* 7 */}
            <Section id="data-retention" title="Data Retention">
              <p>We retain personal information only as long as necessary for the purposes described in this policy:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">Purchase Records:</strong> Retained for 7 years to comply with IRS recordkeeping requirements and applicable financial regulations.</li>
                <li><strong className="text-[#D1D5DB]">Booking Inquiries:</strong> Retained for up to 2 years, or until the relationship is concluded, whichever is later.</li>
                <li><strong className="text-[#D1D5DB]">Server Log Data:</strong> Automatically purged by Vercel in accordance with their data retention policy (typically 30 days).</li>
                <li><strong className="text-[#D1D5DB]">CRM Records:</strong> Retained in GoHighLevel until you request deletion or until the data is no longer needed for service delivery.</li>
              </ul>
              <p>
                You may request deletion of your personal data at any time by contacting us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                  {CONTACT_EMAIL}
                </a>
                . Deletion requests are subject to legal retention obligations (e.g., tax records).
              </p>
            </Section>

            {/* 8 */}
            <Section id="security" title="Security Measures">
              <p>
                We implement commercially reasonable technical and organisational security measures
                to protect your personal information against unauthorised access, disclosure,
                alteration, or destruction:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#D1D5DB]">HTTPS & TLS Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security).</li>
                <li><strong className="text-[#D1D5DB]">HTTP Strict Transport Security (HSTS):</strong> Enforces HTTPS-only connections for a minimum of 2 years.</li>
                <li><strong className="text-[#D1D5DB]">Security Headers:</strong> Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers are applied to all pages.</li>
                <li><strong className="text-[#D1D5DB]">Rate Limiting:</strong> API endpoints are protected against brute-force and denial-of-service abuse.</li>
                <li><strong className="text-[#D1D5DB]">Input Sanitisation:</strong> All user-supplied form inputs are sanitised server-side before processing.</li>
                <li><strong className="text-[#D1D5DB]">Stripe Webhook Verification:</strong> All payment event notifications are cryptographically verified before processing.</li>
                <li><strong className="text-[#D1D5DB]">Environment Isolation:</strong> All API keys and secrets are stored as encrypted environment variables — never in source code.</li>
              </ul>
              <p>
                While we take security seriously, no method of electronic transmission or storage is
                100% secure. We cannot guarantee absolute security but commit to promptly notifying
                affected users of any breach as required by applicable US state data breach
                notification laws.
              </p>
            </Section>

            {/* 9 */}
            <Section id="cookies" title="Cookies & Tracking Technologies">
              <p>
                Our website uses only <strong className="text-[#D1D5DB]">essential technical cookies</strong> necessary
                for the website to function. We do not currently use:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Advertising or tracking cookies</li>
                <li>Third-party analytics platforms (Google Analytics, Facebook Pixel, etc.)</li>
                <li>Cross-site tracking technologies</li>
              </ul>
              <p>
                Stripe may set cookies on their hosted checkout pages as described in their{" "}
                <a href="https://stripe.com/cookie-settings" target="_blank" rel="noopener noreferrer" className="text-[#E41133] hover:underline">
                  Cookie Policy
                </a>
                . These are subject to Stripe's own privacy practices and are only active on
                Stripe-hosted payment pages.
              </p>
            </Section>

            {/* 10 */}
            <Section id="childrens-privacy" title="Children's Privacy (COPPA)">
              <p>
                This website is not directed to children under the age of 13. We do not knowingly
                collect personal information from children under 13 years of age in compliance with
                the <strong className="text-[#D1D5DB]">Children's Online Privacy Protection Act (COPPA)</strong>,
                15 U.S.C. § 6501 et seq.
              </p>
              <p>
                If you believe we have inadvertently collected information from a child under 13,
                please contact us immediately at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will take prompt steps to delete such information.
              </p>
            </Section>

            {/* 11 */}
            <Section id="third-party" title="Third-Party Services">
              <p>Our website integrates with the following third-party services. Each operates under its own privacy policy:</p>
              <div className="space-y-3 !mt-4">
                {[
                  {
                    name: "Stripe, Inc.",
                    purpose: "Payment processing",
                    url: "https://stripe.com/privacy",
                    location: "San Francisco, CA",
                  },
                  {
                    name: "GoHighLevel (HighLevel, Inc.)",
                    purpose: "CRM & email automation",
                    url: "https://www.gohighlevel.com/privacy-policy",
                    location: "Dallas, TX",
                  },
                  {
                    name: "Vercel, Inc.",
                    purpose: "Website hosting & infrastructure",
                    url: "https://vercel.com/legal/privacy-policy",
                    location: "San Francisco, CA",
                  },
                ].map(({ name, purpose, url, location }) => (
                  <div key={name} className="bg-[#111827] border border-white/[0.07] rounded-[4px] px-5 py-4">
                    <p className="text-white font-bold text-[13.5px]">{name}</p>
                    <p className="text-[#6B7280] text-[12.5px]">{purpose} · {location}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#E41133] text-[12.5px] hover:underline">
                      View Privacy Policy →
                    </a>
                  </div>
                ))}
              </div>
            </Section>

            {/* 12 */}
            <Section id="can-spam" title="Email Communications (CAN-SPAM Act)">
              <p>
                All commercial email communications sent from our platform comply with the{" "}
                <strong className="text-[#D1D5DB]">Controlling the Assault of Non-Solicited Pornography
                And Marketing (CAN-SPAM) Act</strong>, 15 U.S.C. § 7701 et seq.:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We clearly identify ourselves as the sender in all emails</li>
                <li>We include a valid physical mailing address in commercial emails</li>
                <li>We honour opt-out and unsubscribe requests promptly (within 10 business days)</li>
                <li>We do not use deceptive subject lines or misleading header information</li>
                <li>Transactional emails (order confirmations, booking acknowledgements) are sent only to users who have initiated a transaction</li>
              </ul>
              <p>
                To opt out of marketing communications, reply to any email with "Unsubscribe" in the
                subject line or contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>

            {/* 13 */}
            <Section id="changes" title="Changes to This Policy">
              <p>
                We reserve the right to update this Privacy Policy at any time. When we make
                material changes, we will update the "Last Updated" date at the top of this page.
                We encourage you to review this policy periodically.
              </p>
              <p>
                Continued use of our website after changes are posted constitutes your acceptance
                of the revised policy. For significant changes that affect your rights, we will
                make reasonable efforts to notify users via the contact information we have on file.
              </p>
            </Section>

            {/* 14 */}
            <Section id="contact" title="Contact Us">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or
                your personal information, please contact us:
              </p>
              <div className="bg-[#111827] border border-white/[0.07] rounded-[4px] px-6 py-5 !mt-4">
                <p className="text-white font-black text-[15px] mb-1">Dr. Mark Campbell, PhD</p>
                <p className="text-[#6B7280] text-[13px]">Privacy & Data Inquiries</p>
                <p className="text-[#6B7280] text-[13px] mt-3">
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#E41133] hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="text-[#6B7280] text-[13px]">
                  Website:{" "}
                  <a href={SITE_URL} className="text-[#E41133] hover:underline">
                    {SITE_URL}
                  </a>
                </p>
                <p className="text-[#4B5563] text-[12px] mt-4">
                  We will respond to all verifiable privacy requests within 45 days as required
                  by applicable law.
                </p>
              </div>
            </Section>

            {/* Divider */}
            <div className="border-t border-white/[0.07] pt-8">
              <p className="text-[#374151] text-[12px] leading-relaxed">
                This Privacy Policy was last updated on {LAST_UPDATED}. It is intended to comply
                with applicable US federal privacy laws including COPPA, CAN-SPAM, ECPA, and CFAA,
                as well as state consumer privacy laws including the California Consumer Privacy
                Act (CCPA/CPRA), Virginia Consumer Data Protection Act (CDPA), Colorado Privacy
                Act (CPA), Connecticut Data Privacy Act (CTDPA), and Texas Data Privacy and
                Security Act (TDPSA).
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#E41133] hover:text-white text-[13px] font-bold transition-colors"
                >
                  ← Return to markcampbellphd.com
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
