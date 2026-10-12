export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  target: string;
  stack: string;
  latency: string;
  security: string;
  benefits: string[];
  capabilities: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  sector: string;
  duration: string;
  image: string;
  metricHighlight: string;
  metricLabel: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  specs: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  content: string;
  rating: number;
}

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
}

export const COMPANY_DATA = {
  name: "VPD Technologies",
  legalName: "VPD Technologies Private Limited",
  tagline: "Engineering High-Performance Digital Ecosystems",
  mission: "We engineer high-performance web ecosystems, scalable SaaS platforms, and enterprise Java solutions for industry leaders.",
  vision: "Standardizing high-tier software engineering for small to mid-scale enterprises globally with Java-grade stability and modern web agility.",
  location: "Kurnool, Andhra Pradesh, India",
  coordinates: { lat: 15.838556, lng: 78.015556 },
  phone: "+91 83339 19447",
  email: "info@vpdtechnologies.com",
  supportEmail: "support@vpdtechnologiespvtltd.com",
  whatsappUrl: "https://wa.me/918333919447",
  mapsUrl: "https://maps.app.goo.gl/zC4rwmytTXbwNfTW7",
  founder: {
    name: "Sai Krishna",
    role: "Founder & CEO",
    quote: "VPD Technologies was established to bridge the gap between complex software engineering and intuitive business interfaces. We avoid corporate jargon in favor of direct technical transparency and measurable results."
  }
};

export const KEY_METRICS = [
  { value: "+240%", label: "Conversion & Pipeline Growth", context: "Average lead velocity improvement" },
  { value: "99.99%", label: "High-Availability Uptime", context: "Enterprise SLA guaranteed" },
  { value: "2–4 Wk", label: "Rapid Deployment Sprint", context: "From architecture to first launch" },
  { value: "5.0 ★", label: "Client Satisfaction Rating", context: "Across all verified production deployments" },
];

export const CORE_SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Website Development",
    category: "High-Conversion Frontends",
    description: "High-performing, SEO-optimized digital frontends engineered for professional credibility, rapid user onboarding, and measurable conversion.",
    target: "Businesses requiring an authoritative online presence, brand credibility, and high lead capture velocity.",
    stack: "React / Vite / Tailwind CSS",
    latency: "< 100ms TTI",
    security: "Standard SSL / CSP Strict",
    benefits: [
      "Conversion-Focused Layout Architecture",
      "SEO-Ready Metadata & Structured Schema",
      "Mobile-First Responsive Engineering"
    ],
    capabilities: ["UI/UX Design Systems", "Core Web Vitals Optimization", "Headless CMS Integration"]
  },
  {
    id: "web-app",
    title: "Web Application Development",
    category: "Scalable SaaS & Portals",
    description: "Custom internal systems, real-time SaaS dashboards, and complex enterprise portals engineered for high-frequency workflows.",
    target: "Growing enterprises requiring automated operations, multi-tenant workflows, or scalable SaaS applications.",
    stack: "MERN / WebSockets / Edge Runtime",
    latency: "Real-Time < 50ms Sync",
    security: "Role-Based Access Control (RBAC)",
    benefits: [
      "Horizontally Scalable Architecture",
      "Real-Time Bi-Directional State Synchronization",
      "Intuitive Multi-Role Admin Controls"
    ],
    capabilities: ["Custom Operations Dashboards", "Event-Driven Real-Time APIs", "Enterprise User Management"]
  },
  {
    id: "java-stack",
    title: "Java Full Stack Development",
    category: "Enterprise-Grade Backends",
    description: "Robust enterprise backends and full stack platforms built with the rigorous type-safety, durability, and resilience of the Java ecosystem.",
    target: "Organizations demanding heavy-duty transaction processing, banking-grade security, or complex ERP integrations.",
    stack: "Java / Spring Boot / PostgreSQL / Docker",
    latency: "High-Throughput Concurrent Stream",
    security: "Enterprise ISO 27001 & AES-256",
    benefits: [
      "Mission-Critical Enterprise Stability",
      "High-Concurrency Load Resilience",
      "Long-Term Maintainability & Type-Safety"
    ],
    capabilities: ["Microservices Architecture", "Distributed Database Optimization", "Core System Integration"]
  }
];

export const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Fast Delivery",
    description: "Lean architectural planning and disciplined sprint execution help your product transition from validated concept to production launch in record time."
  },
  {
    number: "02",
    title: "SEO Optimized",
    description: "Semantic HTML5, lightning-fast Time to Interactive (<100ms), and search-ready OpenGraph and Schema.org structured data baked in from day one."
  },
  {
    number: "03",
    title: "Mobile Responsive",
    description: "Every layout is precision-tested across mobile, tablet, and widescreen desktop monitors to guarantee fluid, touch-optimized user experiences."
  },
  {
    number: "04",
    title: "Scalable Solutions",
    description: "Modular component hierarchies and decoupled API layers ensure your digital foundation effortlessly accommodates future pages, features, and user surges."
  },
  {
    number: "05",
    title: "Modern Tech Stack",
    description: "Built with industry-standard technologies: React 19, TypeScript, Spring Boot, and cloud edge infrastructure for maximum developer velocity and longevity."
  },
  {
    number: "06",
    title: "Ongoing Support",
    description: "Dependable post-deployment engineering support, performance tuning, proactive monitoring, and feature iteration so you never navigate updates alone."
  }
];

export const VERIFIED_PROJECTS: Project[] = [
  {
    id: "lead-engine",
    title: "Lead-Engine Architecture",
    client: "Enterprise SaaS Provider",
    sector: "SaaS / Enterprise",
    duration: "12 Weeks",
    image: "/portfolio-lead-engine.svg",
    metricHighlight: "+45%",
    metricLabel: "Qualified Inbound Leads Captured",
    problem: "Stagnant conversion rates due to fragmented navigation and high page load latency. The existing architecture failed to prioritize high-intent user journeys, losing valuable inbound prospects.",
    solution: "Engineered a cinematic React frontend with an optimized lead conversion hierarchy, localized client state management, and edge routing to minimize Time-to-Interactive.",
    result: "Achieved a 45% increase in verified lead submissions and reduced TTI by 1.2s. Supported seamless automated lead categorization and CRM integration.",
    tags: ["React", "TTI Optimization", "Lead Funnel", "Vercel Edge"],
    specs: [
      { label: "Frontend Stack", value: "React / Motion / Tailwind" },
      { label: "Performance Gain", value: "1.2s TTI Reduction" },
      { label: "Architecture", value: "Conversion-Focused Funnel" },
      { label: "Deployment", value: "Vercel / Edge Runtime" }
    ]
  },
  {
    id: "operational-hub",
    title: "Real-Time Operational Hub",
    client: "Industrial Logistics Firm",
    sector: "Industrial Logistics",
    duration: "16 Weeks",
    image: "/portfolio-operational-hub.svg",
    metricHighlight: "90%",
    metricLabel: "Reduction in Data Entry Errors",
    problem: "Manual spreadsheet logging caused costly logistical delays and communication bottlenecks across distributed distribution centers.",
    solution: "Built a high-frequency web application featuring real-time WebSocket state synchronization and a multi-threaded Java Spring Boot backend, providing single-pane visibility.",
    result: "Eliminated 90% of manual data entry errors and granted instantaneous operational tracking across 10+ regional dispatch hubs, improving turnaround by 35%.",
    tags: ["WebSockets", "Java / Spring Boot", "Real-Time", "Logistics"],
    specs: [
      { label: "Protocol", value: "WebSockets (STOMP / SockJS)" },
      { label: "Backend Core", value: "Java / Spring Boot" },
      { label: "Concurrency", value: "High-Volume Stream Handling" },
      { label: "Sync Latency", value: "< 50ms Global" }
    ]
  },
  {
    id: "financial-protocol",
    title: "Financial Protocol System",
    client: "FinTech Startup",
    sector: "FinTech / Core Banking",
    duration: "24 Weeks",
    image: "/portfolio-financial-protocol.svg",
    metricHighlight: "99.99%",
    metricLabel: "Guaranteed Production Uptime",
    problem: "Vulnerabilities in legacy transaction pipelines caused system instability and elevated failure rates during high-concurrency peak trading windows.",
    solution: "Architected a Java full-stack core incorporating AES-256 protocol-level encryption, ISO 27001 audit standards, and stateless JWT authorization barriers.",
    result: "Maintained zero security incidents post-launch with 99.99% uptime SLA. The system comfortably handles over 10,000 transactions per second at sub-millisecond database response times.",
    tags: ["Java Core", "ISO 27001", "FinTech", "AES-256"],
    specs: [
      { label: "Security Standard", value: "ISO 27001 Compliance" },
      { label: "Data Encryption", value: "AES-256 / TLS 1.3" },
      { label: "Throughput", value: "10,000+ Tx / Second" },
      { label: "Availability", value: "99.99% Uptime SLA" }
    ]
  }
];

export const VERIFIED_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Rahul Sharma",
    clientRole: "Founder",
    company: "GrowthDesk",
    content: "VPD TECH helped us turn our website into a clearer lead generation system. The new structure feels premium, fast, and much easier for prospects to act on.",
    rating: 5
  },
  {
    id: "t2",
    clientName: "David Wilson",
    clientRole: "CTO",
    company: "CloudPeak",
    content: "High-quality engineering combined with a deep understanding of cloud-native architecture. VPD TECH is our go-to partner for complex backend systems.",
    rating: 5
  },
  {
    id: "t3",
    clientName: "Priya Mehta",
    clientRole: "Operations Lead",
    company: "Nexora Systems",
    content: "The team understood our workflow quickly and shaped a web application experience that feels clean, practical, and ready for everyday business use.",
    rating: 5
  },
  {
    id: "t4",
    clientName: "Sarah Chen",
    clientRole: "Product Manager",
    company: "TechFlow",
    content: "The UI/UX transformation was exactly what we needed. Our enterprise dashboard now feels light, intuitive, and extremely responsive.",
    rating: 5
  },
  {
    id: "t5",
    clientName: "Arjun Patel",
    clientRole: "Director",
    company: "MetricLabs",
    content: "We needed a dependable full stack partner, and VPD TECH brought the right mix of planning, UI quality, and backend thinking.",
    rating: 5
  }
];

export const VERIFIED_INSIGHTS: InsightArticle[] = [
  {
    id: "b1",
    title: "The Architecture of Conversion-Focused Frontends",
    excerpt: "A deep dive into how clean typographic hierarchy and React performance budgets impact lead velocity for modern B2B SaaS platforms.",
    author: "VPD Engineering Lab",
    date: "May 2026",
    tags: ["React", "Architecture", "UX"],
    image: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778928711/vpd_tech_uploads/slzetnko70lbmc2hl7he.webp"
  },
  {
    id: "b2",
    title: "Java Full Stack: Stability in Enterprise Financial Systems",
    excerpt: "Why high-tier financial institutions continue to rely on the rock-solid security and predictable type-safety of Spring Boot and Java.",
    author: "VPD Engineering Lab",
    date: "May 2026",
    tags: ["Java", "Security", "FinTech"],
    image: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778928654/vpd_tech_uploads/aujkuuy5myo1ivxemoes.webp"
  },
  {
    id: "b3",
    title: "Real-Time Sync Protocols in Industrial Web Applications",
    excerpt: "Overcoming the technical hurdles of zero-latency state synchronization across distributed logistics hubs using WebSockets and resilient event queues.",
    author: "VPD Engineering Lab",
    date: "May 2026",
    tags: ["WebSockets", "Java", "Real-Time"],
    image: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778928608/vpd_tech_uploads/zwqcqtzhtvuwji9gqhkr.webp"
  }
];
