/**
 * Single source of truth for everything on the site that isn't a project.
 * Mirrors the CV so the two can't drift apart.
 */

export const profile = {
  name: "Mohammad Houda",
  role: "Software Engineer",
  location: "Beirut, Lebanon",
  timezone: "UTC+3",
  email: "muhamad.houda@gmail.com",
  phone: "+961 76 344 842",
  site: "https://mohammadhouda.dev",
  github: "https://github.com/mohammadhouda",
  linkedin: "https://linkedin.com/in/mohammad-houda",
  cv: "/Mohammad.Houda_CV.pdf",
  availableForWork: true,
} as const;

/** Short form for the hero. */
export const headline =
  "I build AI agents, enterprise integrations, and the backends that hold under load.";

export const bio = [
  "Software Engineer working across AI agents, enterprise integrations, automation workflows, and scalable backend systems. Most of my work sits at the point where a business requirement has to become a running system — discovery calls on one end, queue workers and database indexes on the other.",
  "Day to day that means Node.js, PostgreSQL, Prisma, Redis and REST APIs, with Next.js when the work reaches the frontend. I've shipped RAG pipelines and LLM integrations, distributed job systems, real-time features, and a lot of third-party API glue — with an eye on reliability and measurable impact rather than novelty.",
  "Currently Solution Engineer at VAYACOM / DLVRD in Beirut, building AI agents and conversational workflows for sales, support, and e-commerce clients.",
];

export interface TimelineEntry {
  kind: "work" | "education";
  role: string;
  org: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  points: string[];
}

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    role: "Solution Engineer",
    org: "VAYACOM / DLVRD",
    location: "Beirut, LB",
    start: "May 2026",
    end: "Present",
    current: true,
    summary:
      "Turning client requirements into working AI agents and automation, from the discovery call through to production.",
    points: [
      "Led technical discovery with client stakeholders and IT teams to map existing systems and translate business needs into 10+ proof-of-concept solutions using n8n, Zapier, REST APIs, and webhooks.",
      "Engineered and deployed 8+ AI agents and conversational workflows covering sales, customer support, lead qualification, booking, and e-commerce.",
      "Improved AI agent response accuracy by 70%+ through prompt engineering, knowledge base optimization, workflow refinement, and systematic testing.",
      "Launched the 27-page official DLVRD website (dlvrd.ai) on Next.js, TypeScript, and Sanity CMS, letting internal teams publish without developer support.",
    ],
  },
  {
    kind: "work",
    role: "Backend Developer",
    org: "Ishtari Group",
    location: "Beirut, LB",
    start: "Aug 2025",
    end: "Apr 2026",
    summary:
      "Catalog, filtering, and order APIs for a marketplace serving thousands of products and sellers.",
    points: [
      "Built and maintained 30+ RESTful endpoints for product catalogs, filtering, and orders using Node.js, Express, PHP, and PostgreSQL.",
      "Developed a Price Scanner system with Node.js and Firebase Cloud Messaging that notifies 15,000+ users in real time about price changes.",
      "Optimized SQL queries over tens of thousands of records, improving query performance and data consistency by more than 40%.",
      "Worked alongside frontend, QA, and product to ship production features on deadline, cutting deployment errors by 30%.",
    ],
  },
  {
    kind: "work",
    role: "Frontend Intern",
    org: "AVH R&D",
    location: "Remote",
    start: "Aug 2024",
    end: "Nov 2024",
    summary:
      "Interface work on an internal employee tracking system used by 50+ people.",
    points: [
      "Built responsive React and Tailwind CSS components for a remote employee tracking system.",
      "Integrated Firebase for real-time data sync and authentication.",
    ],
  },
  {
    kind: "education",
    role: "BS, Computer Science",
    org: "Arab Open University",
    location: "Lebanon",
    start: "Sep 2022",
    end: "Aug 2025",
    summary: "GPA 3.4 / 4.0.",
    points: [],
  },
];

export interface Certification {
  label: string;
  issuer?: string;
  date: string;
  verify?: string;
}

export const certifications: Certification[] = [
  {
    label: "Forward MENA — Junior to Mid Software Program",
    date: "Aug 2026",
  },
  {
    label: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jul 2025",
    verify:
      "https://www.credly.com/badges/96b51778-436d-4228-b19d-75099df41ce1/linked_in_profile",
  },
  {
    label: "Bug Bounty Workshop",
    issuer: "Semicolon Academy",
    date: "Jun 2025",
  },
  {
    label: "IBM Front-End Developer",
    issuer: "IBM · Coursera",
    date: "Nov 2023",
    verify:
      "https://www.coursera.org/account/accomplishments/verify/D9ARCMGUG9PE",
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Firebase",
    ],
  },
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    group: "Tools & Cloud",
    items: [
      "Git",
      "Docker",
      "Postman",
      "Supabase",
      "Sanity CMS",
      "Puppeteer",
      "Playwright",
      "Jest",
      "AWS",
    ],
  },
  {
    group: "AI & Automation",
    items: [
      "AI Agents",
      "RAG",
      "LLM APIs",
      "Prompt Engineering",
      "pgvector",
      "Vector Search",
      "n8n",
      "Zapier",
    ],
  },
  {
    group: "Integration",
    items: [
      "REST APIs",
      "Webhooks",
      "WhatsApp Business API",
      "Third-Party APIs",
    ],
  },
  {
    group: "Practices",
    items: [
      "System Design",
      "Background Jobs",
      "Auth & Authorization",
      "Agile Collaboration",
    ],
  },
];
