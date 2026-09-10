import Nav from "../src/components/Nav";
import Hero from "../src/components/Hero";
import Work from "../src/components/Work";
import About from "../src/components/About";
import Career from "../src/components/Career";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";
import SectionStack, { Panel } from "../src/components/motion/SectionStack";
import { profile, headline } from "../src/lib/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.site,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  description: headline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beirut",
    addressCountry: "LB",
  },
  worksFor: {
    "@type": "Organization",
    name: "VAYACOM / DLVRD",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Arab Open University",
  },
  knowsAbout: [
    "AI Agents",
    "Retrieval-Augmented Generation",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "BullMQ",
    "Next.js",
    "TypeScript",
    "System Design",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        {/* Stable anchor targets; each section has its own entrance rhythm. */}
        <SectionStack>
          <Panel id="hero">
            <Hero />
          </Panel>
          <Panel id="work">
            <Work />
          </Panel>
          <Panel id="about">
            <About />
          </Panel>
          <Panel id="career">
            <Career />
          </Panel>
          <Panel id="contact">
            <Contact />
          </Panel>
        </SectionStack>
      </main>
      <Footer />
    </>
  );
}
