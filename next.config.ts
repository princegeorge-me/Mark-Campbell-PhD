import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self';
  connect-src 'self' https://api.stripe.com;
  frame-src https://js.stripe.com https://hooks.stripe.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  // Enforce HTTPS for 2 years, include subdomains, allow browser preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent site from being embedded in iframes (clickjacking)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Limit referrer info sent to external sites
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  // Enable XSS filter in older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Prevent DNS prefetch leaking visited subdomains
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
