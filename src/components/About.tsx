import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import SplitReveal from "./motion/SplitReveal";
import { bio, stack, profile } from "../lib/profile";

export default function About() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead index="02" label="About" note={profile.location} />

      {/* Pull statement the one place body-scale copy gets display type. */}
      <SplitReveal
        as="p"
        className="t-title mb-20 max-w-[20ch] text-fg md:mb-28"
        style={{ fontSize: "clamp(2rem, 5.4vw, 4.5rem)" }}
      >
        Requirements on one end, queue workers on the other.
      </SplitReveal>

      <div className="grid-12 gap-y-16">
        {/* ── Bio ── */}
        <div className="col-span-full lg:col-span-5">
          <Reveal y={20} className="mb-8">
            <p className="t-meta text-fg-4">Profile</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {bio.map((para, i) => (
              <Reveal key={i} variant="left" delay={i * 0.06}>
                <p className="t-body max-w-[52ch]">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal y={20} className="mt-10">
            <dl className="flex flex-col gap-3">
              <div className="flex gap-6">
                <dt className="t-meta w-24 shrink-0 text-fg-4">Education</dt>
                <dd className="text-[0.9rem] text-fg">
                  BS Computer Science, Arab Open University
                  <span className="ml-2 font-mono text-[0.75rem] text-fg-4">
                    GPA 3.4
                  </span>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="t-meta w-24 shrink-0 text-fg-4">Based in</dt>
                <dd className="text-[0.9rem] text-fg">
                  {profile.location}
                  <span className="ml-2 font-mono text-[0.75rem] text-fg-4">
                    {profile.timezone}
                  </span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* ── Stack ── */}
        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <Reveal y={20} className="mb-8 flex items-baseline justify-between">
            <p className="t-meta text-fg-4">Stack</p>
            <p className="t-meta text-fg-4">
              {stack.reduce((n, g) => n + g.items.length, 0)} entries
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((group, i) => (
              <Reveal key={group.group} variant={i % 2 === 0 ? "rise" : "scale"} delay={(i % 2) * 0.08}>
                <div className="skill-card">
                  <p className="t-meta mb-4 text-accent">{group.group}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="tech-chip">{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
