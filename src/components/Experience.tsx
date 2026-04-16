"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const timeline = [
  {
    role: "Backend Developer",
    org: "Ishtari Group",
    period: "Aug 2025 – Apr 2026",
    note: "Built 30+ RESTful API endpoints for product catalogs and order features using Node.js, Express, PHP, and PostgreSQL. Designed a Price Scanner system with Firebase Cloud Messaging notifying 15,000+ users in real time. Optimized SQL queries handling tens of thousands of records, improving performance by 40%+.",
  },
  {
    role: "Frontend Intern",
    org: "AVH R&D · Remote",
    period: "Aug 2024 – Nov 2024",
    note: "Built responsive UI components for a remote employee tracking system used by 50+ team members using React and Tailwind CSS. Integrated Firebase for real-time data sync and authentication.",
  },
  {
    role: "BS Computer Science",
    org: "Arab Open University, Lebanon",
    period: "Sept 2022 – Aug 2025",
    note: "GPA 3.4 / 4.0.",
  },
];

const certs = [
  {
    label: "AWS Cloud Practitioner",
    date: "Jul 2025",
    verify: "https://www.credly.com/badges/96b51778-436d-4228-b19d-75099df41ce1/linked_in_profile",
  },
  {
    label: "Bug Bounty Workshop",
    org: "Semicolon Academy",
    date: "Jun 2025",
  },
  {
    label: "IBM Front-End Developer",
    date: "Nov 2023",
    verify: "https://www.coursera.org/account/accomplishments/verify/D9ARCMGUG9PE",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-8 max-w-300 mx-auto">
      <ScrollReveal>
        <SectionLabel label="experience" lineNumber={4} />
      </ScrollReveal>

      <div className="relative pl-6 mb-14">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-[6px] bottom-[6px] w-px opacity-30"
          style={{ background: "linear-gradient(to bottom, var(--accent), rgba(34,197,94,0.1))" }}
        />

        <div className="flex flex-col gap-10">
          {timeline.map((item, i) => (
            <ScrollReveal key={item.role} delay={i * 0.1}>
              <div className="relative">
                {/* Dot */}
                <div
                  className="absolute top-[5px] w-[7px] h-[7px] rounded-full bg-accent opacity-60"
                  style={{ left: "-1.87rem", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }}
                />

                <div className="flex items-baseline gap-3 flex-wrap mb-[0.4rem]">
                  <h3 className="font-mono font-bold text-[0.95rem] text-fg m-0 tracking-[-0.01em]">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[0.75rem] text-accent opacity-70">
                    - {item.org}
                  </span>
                  <span className="font-mono text-[0.65rem] text-muted opacity-[0.45] tracking-[0.06em]">
                    [{item.period}]
                  </span>
                </div>

                <p className="text-[0.88rem] leading-[1.75] text-muted m-0 max-w-145">
                  {item.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <ScrollReveal delay={0.3}>
        <p className="font-mono text-[0.7rem] text-muted tracking-[0.12em] uppercase mb-4 opacity-50">
          <span className="text-accent opacity-70">{"//"} </span>
          certificates
        </p>
        <div className="flex flex-col gap-[0.6rem]">
          {certs.map((c) => (
            <div key={c.label} className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[0.8rem] text-fg">{c.label}</span>
              {c.org && (
                <span className="font-mono text-[0.7rem] text-muted opacity-[0.55]">
                  · {c.org}
                </span>
              )}
              <span className="font-mono text-[0.65rem] text-accent opacity-50">
                {c.date}
              </span>
              {c.verify && (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.65rem] text-muted no-underline opacity-40 tracking-[0.04em] transition-[opacity,color] duration-200 hover:opacity-100 hover:text-accent"
                >
                  verify ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
