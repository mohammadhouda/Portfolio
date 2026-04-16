import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import ProjectList from "../src/components/ProjectList";
import About from "../src/components/About";
import Experience from "../src/components/Experience";
import ApiPlayground from "../src/components/playground/ApiPlayground";
import Contact from "../src/components/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Houda",
  url: "https://mohammadhouda.dev",
  jobTitle: "Software Engineer",
  description:
    "Backend-focused Software Engineer building production-grade REST APIs, scalable multi-tenant platforms, and distributed systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tripoli",
    addressCountry: "LB",
  },
  knowsAbout: ["Node.js", "Express", "PostgreSQL", "Redis", "Next.js", "TypeScript", "AWS"],
  sameAs: ["https://github.com/mohammadhouda"],
};

const Divider = () => (
  <div className="max-w-300 mx-auto px-8">
    <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
  </div>
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <ProjectList />
        <Divider />
        <Experience />
        <Divider />
        <ApiPlayground />
        <Divider />
        <Contact />
      </main>
    </>
  );
}
