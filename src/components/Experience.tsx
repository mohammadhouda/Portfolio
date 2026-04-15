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
    <section
      id="experience"
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <ScrollReveal>
        <SectionLabel label="experience" lineNumber={4} />
      </ScrollReveal>

      <div
        style={{
          position: "relative",
          paddingLeft: "1.5rem",
          marginBottom: "3.5rem",
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "6px",
            bottom: "6px",
            width: "1px",
            background:
              "linear-gradient(to bottom, var(--accent), rgba(34,197,94,0.1))",
            opacity: 0.3,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {timeline.map((item, i) => (
            <ScrollReveal key={item.role} delay={i * 0.1}>
              <div style={{ position: "relative" }}>
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.87rem",
                    top: "5px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    opacity: 0.6,
                    boxShadow: "0 0 8px rgba(34,197,94,0.4)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "0.4rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      opacity: 0.7,
                    }}
                  >
                    - {item.org}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.65rem",
                      color: "var(--text-secondary)",
                      opacity: 0.45,
                      letterSpacing: "0.06em",
                    }}
                  >
                    [{item.period}]
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                    margin: 0,
                    maxWidth: "580px",
                  }}
                >
                  {item.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <ScrollReveal delay={0.3}>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.7rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            opacity: 0.5,
          }}
        >
          <span style={{ color: "var(--accent)", opacity: 0.7 }}>{"//"} </span>
          certificates
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {certs.map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.8rem",
                  color: "var(--text-primary)",
                }}
              >
                {c.label}
              </span>
              {c.org && (
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    opacity: 0.55,
                  }}
                >
                  · {c.org}
                </span>
              )}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  opacity: 0.5,
                }}
              >
                {c.date}
              </span>
              {c.verify && (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.65rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    opacity: 0.4,
                    letterSpacing: "0.04em",
                    transition: "opacity 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.opacity = "1";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.opacity = "0.4";
                    el.style.color = "var(--text-secondary)";
                  }}
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
