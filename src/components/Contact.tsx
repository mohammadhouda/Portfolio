import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import SplitReveal from "./motion/SplitReveal";
import Rule from "./motion/Rule";
import { profile } from "../lib/profile";

const elsewhere = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Curriculum Vitae", href: profile.cv },
];

export default function Contact() {
  return (
    <section id="contact" className="shell scroll-mt-24 pt-24 pb-14 md:pt-32">
      <SectionHead index="04" label="Contact" note="Open to new roles" />

      <SplitReveal
        as="h2"
        className="t-display mb-14 max-w-[16ch] text-ink md:mb-20"
        style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)", lineHeight: 0.95 }}
      >
        Let&rsquo;s build something worth shipping.
      </SplitReveal>

      <div className="grid-12 gap-y-12">
        <div className="col-span-full lg:col-span-7">
          <Reveal y={18} className="mb-8">
            <p className="t-meta mb-4 text-ink-4">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-draw font-display text-[clamp(1.5rem,3.6vw,2.75rem)] leading-tight text-ink transition-colors duration-300 hover-fine:hover:text-accent"
            >
              {profile.email}
            </a>
          </Reveal>

          <Reveal y={18} delay={0.05}>
            <p className="t-body max-w-[46ch]">
              Open to backend and full-stack roles, AI agent and automation
              work, and freelance projects. If you are building something that
              needs to hold up in production, get in touch.
            </p>
          </Reveal>
        </div>

        <div className="col-span-full lg:col-span-4 lg:col-start-9">
          <Reveal y={18} className="mb-4">
            <p className="t-meta text-ink-4">Elsewhere</p>
          </Reveal>

          <Rule />

          {elsewhere.map((item) => (
            <Reveal key={item.label} y={12}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-300"
              >
                <span className="text-[0.95rem] text-ink transition-colors duration-300 group-hover:text-accent">
                  {item.label}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                  className="shrink-0 text-ink-4 transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  <path d="M2 10L10 2M4 2h6v6" />
                </svg>
              </a>
              <Rule />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
