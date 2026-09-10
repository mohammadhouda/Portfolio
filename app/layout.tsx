import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "../src/components/motion/SmoothScroll";
import { profile } from "../src/lib/profile";
import "./globals.css";

/* Display face. Carries every headline, set heavy and very tight. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/* Body and UI. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Metadata only labels, dates, indices. Never body copy. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const BASE_URL = profile.site;

const DESCRIPTION =
  "Software Engineer in Beirut building AI agents, enterprise integrations, and scalable backend systems. Node.js · PostgreSQL · Prisma · Redis · Next.js · RAG.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${profile.name} ${profile.role}`,
    template: `%s ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Mohammad Houda",
    "Software Engineer",
    "Solution Engineer",
    "Backend Developer",
    "AI Agents",
    "RAG",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Next.js",
    "TypeScript",
    "n8n",
    "Beirut",
    "Lebanon",
  ],
  authors: [{ name: profile.name, url: BASE_URL }],
  creator: profile.name,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: `${profile.name} ${profile.role}`,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} ${profile.role}`,
    description: DESCRIPTION,
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

export const viewport: Viewport = {
  themeColor: "#0e0e10",
  colorScheme: "dark",
};

/**
 * Applied before first paint so [data-reveal] elements are hidden from the
 * very first frame otherwise content flashes in, then hides, then animates.
 *
 * The failsafe matters: if the motion chunk fails to load, nothing would ever
 * reveal those elements and the page would read as blank. Removing `.js`
 * restores plain visible content.
 */
const JS_BOOTSTRAP = `
document.documentElement.classList.add('js');
setTimeout(function(){
  if(!document.documentElement.hasAttribute('data-motion-ready')){
    document.documentElement.classList.remove('js');
  }
}, 2500);
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_BOOTSTRAP }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
      <GoogleAnalytics gaId="G-W6T4FQW5GV" />
    </html>
  );
}
