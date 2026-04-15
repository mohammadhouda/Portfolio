import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import ProjectList from "../src/components/ProjectList";
import About from "../src/components/About";
import Experience from "../src/components/Experience";
import ApiPlayground from "../src/components/playground/ApiPlayground";
import Contact from "../src/components/Contact";

const Divider = () => (
  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
    <div
      style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, var(--border), transparent)",
      }}
    />
  </div>
);

export default function Home() {
  return (
    <>
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
