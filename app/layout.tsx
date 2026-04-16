import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-satoshi",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const BASE_URL = "https://mohammadhouda.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mohammad Houda — Software Engineer",
    template: "%s — Mohammad Houda",
  },
  description:
    "Backend-focused Software Engineer building production-grade REST APIs, scalable multi-tenant platforms, and distributed systems. Node.js · PostgreSQL · Next.js · TypeScript · AWS.",
  keywords: [
    "Mohammad Houda",
    "Software Engineer",
    "Backend Developer",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "Redis",
    "AWS",
    "Lebanon",
    "Portfolio",
  ],
  authors: [{ name: "Mohammad Houda", url: BASE_URL }],
  creator: "Mohammad Houda",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Mohammad Houda — Software Engineer",
    description:
      "Backend-focused Software Engineer building production-grade REST APIs, scalable multi-tenant platforms, and distributed systems.",
    url: BASE_URL,
    siteName: "Mohammad Houda",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammad Houda — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Houda — Software Engineer",
    description:
      "Backend-focused Software Engineer building production-grade REST APIs, scalable multi-tenant platforms, and distributed systems.",
    images: ["/og-image.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body>{children}</body>
      <GoogleAnalytics gaId="G-W6T4FQW5GV" />
    </html>
  );
}