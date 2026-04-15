import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mohammad - Software Engineer",
  description:
    "Software engineer with a backend focus. I build systems that matter from humanitarian platforms to AI sales automation.",
  keywords: [
    "Mohammad",
    "Software Engineer",
    "Backend Developer",
    "Node.js",
    "Next.js",
    "TypeScript",
    "Lebanon",
    "Portfolio",
  ],
  authors: [{ name: "Mohammad Houda" }],
  openGraph: {
    title: "Mohammad - Software Engineer",
    description:
      "Software engineer with a backend focus. I build systems that matter.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad - Software Engineer",
    description: "Software engineer with a backend focus.",
  },
  robots: {
    index: true,
    follow: true,
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
    </html>
  );
}
