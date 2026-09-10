import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import Rule from "./motion/Rule";
import { timeline, certifications } from "../lib/profile";

export default function Career() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead index="03" label="Career" note="Experience & Education" />

      <Rule />

      {timeline.map((entry) => (
        <Reveal key={`${entry.org}-${entry.role}`} y={18}>
          <div className="grid-12 gap-y-4 py-9 md:py-11">
            {/* Period */}
            <div className="col-span-full lg:col-span-3">
              <p className="t-meta flex items-center gap-2 text-fg-3">
                {entry.start} — {entry.end}
                {entry.current && (
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    aria-label="Current role"
                  />
                )}
              </p>
              {entry.location && (
                <p className="t-meta mt-1.5 text-fg-4">{entry.location}</p>
              )}
            </div>

            {/* Role */}
            <div className="col-span-full lg:col-span-4">
              <h3 className="t-h3 text-fg">{entry.role}</h3>
              <p className="t-meta mt-2 text-accent">{entry.org}</p>
            </div>

            {/* Detail */}
            <div className="col-span-full lg:col-span-5">
              <p className="t-body mb-4 max-w-[52ch]">{entry.summary}</p>

              {entry.points.length > 0 && (
                <ul className="flex flex-col gap-2.5">
                  {entry.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[0.875rem] leading-relaxed text-fg-2"
                    >
                      <span
                        className="mt-2.5 h-px w-3 shrink-0 bg-fg-4"
                        aria-hidden="true"
                      />
                      <span className="max-w-[54ch]">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Rule />
        </Reveal>
      ))}

      {/* ── Certifications ── */}
      <div className="mt-20 md:mt-28">
        <Reveal y={14} className="mb-6">
          <p className="t-meta text-fg-4">Certifications</p>
        </Reveal>

        <Rule />

        {certifications.map((cert) => (
          <Reveal key={cert.label} y={12}>
            <div className="grid-12 items-baseline gap-y-1.5 py-5">
              <p className="col-span-full text-[0.95rem] text-fg md:col-span-6 lg:col-span-5">
                {cert.label}
              </p>
              <p className="t-meta col-span-full text-fg-3 md:col-span-4 lg:col-span-4">
                {cert.issuer ?? ""}
              </p>
              <p className="t-meta col-span-2 text-fg-4 lg:col-span-2">
                {cert.date}
              </p>
              <p className="col-span-full text-right md:col-span-2 lg:col-span-1">
                {cert.verify && (
                  <a
                    href={cert.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-meta link-draw text-fg-3 transition-colors duration-300 hover-fine:hover:text-accent"
                  >
                    Verify ↗
                  </a>
                )}
              </p>
            </div>
            <Rule />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
