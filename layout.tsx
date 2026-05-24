// app/layout.tsx
// Place this file at: /app/layout.tsx in your Next.js 15 project

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://markcampbellphd.com"),
  title: {
    default: "Dr. Mark Campbell, PhD | VP of IT, Houston Rockets | Technology Executive & Keynote Speaker",
    template: "%s | Dr. Mark Campbell, PhD",
  },
  description:
    "Dr. Mark Campbell is Vice President of Information Technology for the Houston Rockets, former CIO of the City of Atlanta and the Chicago White Sox, award-winning author, and nationally recognized keynote speaker on technology leadership, executive development, and diversity in corporate America.",
  keywords: [
    "Dr. Mark Campbell",
    "Mark Campbell PhD",
    "Houston Rockets VP IT",
    "technology executive keynote speaker",
    "CIO keynote speaker",
    "technology leadership speaker",
    "diversity in technology leadership",
    "executive development",
    "Courageous Conversations book",
    "Soft Power leadership",
    "NBA technology executive",
    "Chicago White Sox CIO",
    "City of Atlanta CIO",
    "minority technology leader",
    "organizational culture speaker",
    "IT leadership expert",
  ],
  authors: [{ name: "Dr. Mark Campbell, PhD" }],
  creator: "Dr. Mark Campbell, PhD",
  publisher: "Dr. Mark Campbell, PhD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markcampbellphd.com",
    siteName: "Dr. Mark Campbell, PhD",
    title: "Dr. Mark Campbell, PhD | Technology Executive & Keynote Speaker",
    description:
      "VP of IT for the Houston Rockets. Former CIO of the City of Atlanta & Chicago White Sox. Author. Keynote Speaker. Transformational technology leader.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Mark Campbell — Technology Executive & Keynote Speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Mark Campbell, PhD | Technology Executive & Keynote Speaker",
    description:
      "VP of IT, Houston Rockets · Former CIO, City of Atlanta & Chicago White Sox · Author · Nationally recognized keynote speaker on technology leadership.",
    images: ["/og-image.jpg"],
    creator: "@DrMarkCampbell",
  },
  alternates: {
    canonical: "https://markcampbellphd.com",
  },
  category: "Business & Leadership",
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-[#0B0F19] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
