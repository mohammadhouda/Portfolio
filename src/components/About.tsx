import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import SplitReveal from "./motion/SplitReveal";
import Rule from "./motion/Rule";
import { bio, stack, profile } from "../lib/profile";

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHead index="02" label="About" note={profile.location} />

      {/* Pull statement — the one place body-scale copy gets display type. */}
      <SplitReveal
        as="p"
        className="t-display mb-20 max-w-[19ch] text-ink md:mb-28"
        style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", lineHeight: 0.98 }}
      >
        Requirements on one end, queue workers on the other.
      </SplitReveal>

      <div className="grid-12 gap-y-16">
        {/* ── Bio ── */}
        <div className="col-span-full lg:col-span-5">
          <Reveal y={20} className="mb-8">
            <p className="t-meta text-ink-4">Profile</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {bio.map((para, i) => (
              <Reveal key={i} y={20} delay={i * 0.06}>
                <p className="t-body max-w-[52ch]">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal y={20} className="mt-10">
            <dl className="flex flex-col gap-3">
              <div className="flex gap-6">
                <dt className="t-meta w-24 shrink-0 text-ink-4">Education</dt>
                <dd className="text-[0.9rem] text-ink">
                  BS Computer Science, Arab Open University
                  <span className="ml-2 font-mono text-[0.75rem] text-ink-4">
                    GPA 3.4
                  </span>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="t-meta w-24 shrink-0 text-ink-4">Based in</dt>
                <dd className="text-[0.9rem] text-ink">
                  {profile.location}
                  <span className="ml-2 font-mono text-[0.75rem] text-ink-4">
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
            <p className="t-meta text-ink-4">Stack</p>
            <p className="t-meta text-ink-4">
              {stack.reduce((n, g) => n + g.items.length, 0)} entries
            </p>
          </Reveal>

          <Rule />

          {stack.map((group) => (
            <Reveal key={group.group} y={14}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
                <p className="t-meta w-32 shrink-0 pt-0.5 text-ink">
                  {group.group}
                </p>
                <p className="text-[0.9rem] leading-relaxed text-ink-2">
                  {group.items.join("  ·  ")}
                </p>
              </div>
              <Rule />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
