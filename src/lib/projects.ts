export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  stack: string[];
  hasArchitecture?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
  highlights?: string[];
}

export const projects: Project[] = [
  {
    slug: "hopelink",
    title: "Hope Link",
    tag: "Humanitarian Platform",
    description:
      "Multi-portal humanitarian platform connecting NGOs, charities, volunteers, and communities. Features subdomain-based routing, smart match-ranked opportunity feeds, real-time chat, and family-based JWT session management.",
    longDescription:
      "Hope Link is a full-stack multi-portal platform built to connect NGOs, charities, and volunteers across Lebanon. Three completely isolated role contexts Admin, Charity, and Volunteer run under a single Express server with role middleware enforcing access at the route level. The signature engineering challenge was building a personalized opportunity ranking system that scales: scores are pre-computed by a BullMQ background worker and stored in an indexed junction table, making every paginated request a fast B-tree scan rather than a full table scan.",
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Supabase", "BullMQ", "Redis", "Socket.io"],
    hasArchitecture: true,
    links: {
      github: "https://github.com/mohammadhouda/hopelink-api",
    },
    highlights: [
      "Pre-computed match scoring via BullMQ + Upstash Redis moves expensive work entirely off the request path",
      "Family-based JWT refresh token rotation with theft detection; revoked token reuse invalidates all sessions in the family",
      "Developed a robust test suite using Jest and Supertest, leveraging factory patterns to mock Prisma models and ensure 100% reliability on core API endpoints",
      "Three isolated role contexts (Admin / Charity / User) sharing one Express server with middleware-enforced access",
      "Real-time Socket.io chat rooms tied to volunteer application lifecycle: created on approval, closed on opportunity end",
      "Idempotent score writes via INSERT ... ON CONFLICT DO UPDATE, safe for BullMQ job retries",
    ],
  },
  {
    slug: "clinic-assistant",
    title: "Clinic Assistant",
    tag: "AI Healthcare Automation · In Development",
    description:
      "WhatsApp-based AI assistant for clinics handles appointment booking, patient inquiries, and status updates automatically. DB-first design keeps the AI grounded in real clinic data. Currently in active development.",
    longDescription:
      "Clinic Assistant brings WhatsApp automation to healthcare practices. Patients message the clinic's WhatsApp number and the AI handles the full conversation checking doctor availability, booking appointments, answering common questions, and sending confirmations. The DB-first approach means the AI never fabricates availability or information: it queries real schedule data before responding. Currently in active development.",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "WhatsApp Business API", "Claude API", "Redis"],
    highlights: [
      "DB-first design: AI queries real appointment slots before confirming no hallucinated availability",
      "Full conversation flow: booking, rescheduling, cancellation, and patient FAQ all over WhatsApp",
      "Claude AI for intent classification and natural language response generation",
      "Redis for session state maintains conversation context across multiple messages",
    ],
  },
  {
    slug: "shopify-automation",
    title: "Shopify Checkout Automation",
    tag: "Browser Automation",
    description:
      "Automates the full Shopify checkout flow end-to-end using Puppeteer product selection, address fill, hCaptcha solving via 2Captcha, proxy routing through Oxylabs, and payment submission. Two separate flows: kith.com and ShopNiceKicks with an Electron GUI.",
    longDescription:
      "A Puppeteer-based automation that completes the full Shopify checkout in under 15 seconds. Built to overcome real e-commerce automation challenges: Shopify's bot protections, hCaptcha blocks, Shadow DOM card fields, and US-only shipping restrictions. Two separate automation flows kith.com (proxy + captcha solving) and ShopNiceKicks (Electron desktop GUI). Task speed is logged in real time from cart to payment confirmation.",
    links: {
      github: "https://github.com/mohammadhouda/shopify-automation",
    },
    stack: ["Node.js", "Puppeteer", "2Captcha API", "Oxylabs Proxy", "Electron"],
    highlights: [
      "hCaptcha solved dynamically via 2Captcha API using interactive element injection no sitekey required",
      "Oxylabs US proxy spoofs location to unlock US-only Shopify shipping options from Lebanon",
      "Shadow DOM card fields accessed via page.evaluateHandle() + native querySelector bypasses iframe isolation",
      "DOMContentLoaded trigger instead of load event significantly improved checkout reliability and speed",
      "Electron GUI for ShopNiceKicks flow; full terminal progress logging with task speed in seconds",
    ],
  },
  {
    slug: "lettus-grow-greener",
    title: "Lettus Grow Greener",
    tag: "Environmental NGO Website",
    description:
      "WordPress site for a Lebanese environmental organization. Built custom PHP shortcodes, event calendars, donation flows, and configured Brevo email automation for campaigns and volunteer onboarding.",
    longDescription:
      "A complete web presence for a Lebanese environmental NGO. Beyond standard WordPress configuration, the project involved custom PHP shortcodes for dynamic content, a full event calendar system, integrated donation flows, and Brevo (formerly Sendinblue) email automation for campaign management and volunteer onboarding sequences.",
    links: {
      live: "https://lettus.org",
    },
    stack: ["WordPress", "PHP", "Elementor", "WPForms", "Brevo", "Custom CSS"],
    highlights: [
      "Custom PHP shortcodes for dynamic content rendering",
      "Brevo email automation for volunteer onboarding and campaign flows",
      "Event calendar and donation flow integration",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
