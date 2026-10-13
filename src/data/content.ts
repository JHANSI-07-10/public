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

export interface CaseStudyMilestone {
  phase: string;
  duration: string;
  title: string;
  description: string;
}

export interface CaseStudyOutcome {
  metric: string;
  label: string;
  detail: string;
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
  overview?: string;
  challenges?: string[];
  solutionPillars?: { title: string; description: string }[];
  timeline?: CaseStudyMilestone[];
  outcomes?: CaseStudyOutcome[];
  techStack?: { category: string; technologies: string[] }[];
  testimonial?: Testimonial;
  architectureFlow?: { step: string; label: string; detail: string }[];
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
  takeaways?: string[];
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
  email: "support@vpdtechnologiespvtltd.com",
  whatsappUrl: "https://wa.me/918333919447",
  mapsUrl: "https://maps.app.goo.gl/zC4rwmytTXbwNfTW7",
  founder: {
    name: "Sai Krishna Vuppala",
    role: "Founder & Chief Executive Officer",
    quote: "VPD Technologies was established to bridge the gap between complex software engineering and intuitive business interfaces. We avoid corporate jargon in favor of direct technical transparency and measurable results."
  },
  leadership: [
    {
      name: "Sai Krishna Vuppala",
      role: "Founder and Chief Executive Officer",
      shortRole: "Founder & CEO",
      initials: "SK"
    },
    {
      name: "Ramcharan Gottipati",
      role: "Co-Founder and Managing Director",
      shortRole: "Co-Founder & MD",
      initials: "RG"
    }
  ],
  foundingStatement: "VPD Technologies is led by Sai Krishna Vuppala, Founder and Chief Executive Officer, and Ramcharan Gottipati, Co-Founder and Managing Director. Together, they provide the strategic and operational leadership guiding the Company's growth in Kurnool."
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
    ],
    overview: "An enterprise SaaS platform was experiencing significant drop-offs along critical conversion pathways due to heavy initial payload sizes and disjointed frontend state transitions. VPD Technologies re-architected the client layer into a cinematic React application with intelligent edge hydration and bidirectional CRM ingestion.",
    challenges: [
      "Fragmented user acquisition funnel resulting in a 62% abandonment rate before reaching registration forms.",
      "Bloated bundle sizes causing an initial Time-to-Interactive (TTI) exceeding 4.8 seconds on 4G networks.",
      "Inconsistent client session state leading to dropped form inputs and inaccurate attribution logs.",
      "Unoptimized asset rendering with non-responsive layouts degrading performance on mobile viewports."
    ],
    solutionPillars: [
      {
        title: "Dynamic React 19 Client Core",
        description: "Engineered a modular, atomic component hierarchy with route-level code splitting, reducing initial JavaScript execution overhead by 68%."
      },
      {
        title: "Edge Routing & Distributed Hydration",
        description: "Deployed intelligent edge middleware on Vercel Edge Runtime to deliver localized asset caches with sub-80ms Time to First Byte (TTFB)."
      },
      {
        title: "Automated Enterprise Ingestion Pipeline",
        description: "Configured resilient webhook gateways directly integrating user qualification signals into HubSpot & Salesforce CRM with automated deduplication."
      }
    ],
    timeline: [
      { phase: "Phase 1", duration: "Weeks 1–3", title: "Funnel Auditing & Performance Profiling", description: "Comprehensive analysis of Core Web Vitals, user flow drop-offs, and monolithic frontend code audits." },
      { phase: "Phase 2", duration: "Weeks 4–7", title: "React Component Hierarchy & Design Tokens", description: "Built custom design system components, atomic form validation, and cinematic micro-interactions." },
      { phase: "Phase 3", duration: "Weeks 8–10", title: "Edge Middleware & CRM Gateway Sync", description: "Implemented edge routing logic, distributed caching, and bidirectional lead scoring webhook queues." },
      { phase: "Phase 4", duration: "Weeks 11–12", title: "Stress Benchmarking & Production Cutover", description: "Global load testing across 12 edge nodes with zero-downtime DNS cutover and live attribution verification." }
    ],
    outcomes: [
      { metric: "+45%", label: "Verified Inbound Conversions", detail: "Significant uplift in completed demo requests and qualified sales registrations." },
      { metric: "1.2s", label: "Time-to-Interactive Reduction", detail: "Frontend interactivity dropped from 4.8s down to sub-1.1s worldwide." },
      { metric: "99.98%", label: "Form Ingestion Reliability", detail: "Zero dropped lead payloads with asynchronous edge retry mechanisms." },
      { metric: "96", label: "Mobile Lighthouse Score", detail: "All Core Web Vitals comfortably within Google's green performance bracket." }
    ],
    techStack: [
      { category: "Frontend Core", technologies: ["React 19", "TypeScript", "Tailwind CSS", "Motion"] },
      { category: "Edge & Routing", technologies: ["Vercel Edge Runtime", "HTTP/3", "Edge Middleware"] },
      { category: "State & Data", technologies: ["Atomic Client State", "Webhooks", "Zod Validation"] },
      { category: "Integrations", technologies: ["Salesforce API", "HubSpot CRM", "Google Tag Manager"] }
    ],
    testimonial: {
      id: "t1",
      clientName: "Rahul Sharma",
      clientRole: "Founder",
      company: "GrowthDesk",
      content: "VPD TECH helped us turn our website into a clearer lead generation system. The new structure feels premium, fast, and much easier for prospects to act on.",
      rating: 5
    },
    architectureFlow: [
      { step: "01", label: "Global Edge Ingestion", detail: "HTTP/3 traffic routed via geo-distributed Vercel edge nodes with sub-80ms TTFB." },
      { step: "02", label: "Selective Hydration", detail: "React 19 atomic component hierarchy executing partial hydration to drop TTI to 1.1s." },
      { step: "03", label: "Localized State Funnel", detail: "In-memory client state management with zero external store overhead." },
      { step: "04", label: "CRM Webhook Gateway", detail: "Asynchronous webhook deduplication pipeline into HubSpot & Salesforce API." }
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
    ],
    overview: "A major logistics operator managing distribution hubs across regional corridors was handicapped by decentralized spreadsheets and delayed inventory reconciliations. VPD Technologies engineered a high-concurrency operations command center with WebSocket duplex communication and a Java Spring Boot streaming backend.",
    challenges: [
      "Decentralized manual logging caused frequent shipment routing miscalculations and costly dispatch delays.",
      "Critical telemetry updates took up to 8 minutes to propagate between warehouse floors and headquarters.",
      "Simultaneous manifest modifications triggered persistent write conflicts and database lockouts.",
      "Lack of unified real-time dashboard visibility across 10+ distributed regional freight hubs."
    ],
    solutionPillars: [
      {
        title: "Bi-Directional WebSocket Sync Core",
        description: "Implemented persistent STOMP/SockJS connections with Redis Pub/Sub, broadcasting state modifications in under 50 milliseconds."
      },
      {
        title: "High-Throughput Java Spring Boot Engine",
        description: "Architected a non-blocking Java 21 microservice suite capable of ingesting high-volume telemetry and barcode scan streams."
      },
      {
        title: "Conflict-Free Optimistic Data Models",
        description: "Implemented transactional version stamping and partitioned PostgreSQL storage to eradicate concurrent edit collisions."
      }
    ],
    timeline: [
      { phase: "Phase 1", duration: "Weeks 1–4", title: "Logistics Process Mapping & Schema Blueprint", description: "Mapped distributed warehouse state machines, manifest schemas, and multi-hub synchronization models." },
      { phase: "Phase 2", duration: "Weeks 5–9", title: "Spring Boot Microservices & Redis Broker", description: "Engineered core messaging layers, persistent socket connections, and database partitioning." },
      { phase: "Phase 3", duration: "Weeks 10–13", title: "Real-Time Operator Console & Scanners", description: "Built ergonomic React frontend with live fleet mapping, manifest diffing, and scanner input listeners." },
      { phase: "Phase 4", duration: "Weeks 14–16", title: "Regional Pilot & Concurrency Hardening", description: "Simulated 5,000 active concurrent operators, audited sync accuracy, and deployed live across 10 distribution hubs." }
    ],
    outcomes: [
      { metric: "90%", label: "Error Elimination", detail: "Human entry errors dropped by 90% through automated scanning and validation." },
      { metric: "<50ms", label: "State Synchronization Latency", detail: "Real-time updates delivered instantly across all active dispatcher screens." },
      { metric: "+35%", label: "Turnaround Velocity", detail: "Shipment sorting and vehicle departure cycles accelerated dramatically." },
      { metric: "100%", label: "Audit Traceability", detail: "Complete historical revision logs for every parcel and container manifest." }
    ],
    techStack: [
      { category: "Backend Engine", technologies: ["Java 21 LTS", "Spring Boot 3", "Spring WebFlux"] },
      { category: "Real-Time Messaging", technologies: ["WebSockets (STOMP)", "SockJS", "Redis Pub/Sub"] },
      { category: "Data Storage", technologies: ["PostgreSQL 16", "HikariCP", "Flyway Migration"] },
      { category: "Frontend Interface", technologies: ["React", "TypeScript", "Tailwind CSS", "Canvas Mapping"] }
    ],
    testimonial: {
      id: "t3",
      clientName: "Priya Mehta",
      clientRole: "Operations Lead",
      company: "Nexora Systems",
      content: "The team understood our workflow quickly and shaped a web application experience that feels clean, practical, and ready for everyday business use.",
      rating: 5
    },
    architectureFlow: [
      { step: "01", label: "Warehouse Scanner Inputs", detail: "Floor barcode terminals and manual dispatch consoles streaming live event inputs." },
      { step: "02", label: "STOMP WebSocket Pipe", detail: "Persistent duplex socket connection maintaining bidirectional telemetry synchronization." },
      { step: "03", label: "Spring Boot Reactive Core", detail: "Multi-threaded Java 21 engine resolving concurrent manifest updates." },
      { step: "04", label: "Redis Broker & PostgreSQL", detail: "Distributed pub/sub fanout with partition-indexed database persistence." }
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
    ],
    overview: "A fast-growing fintech firm handling institutional transaction clearing needed to replace a fragile legacy pipeline before expanding into cross-border settlements. VPD Technologies built a high-throughput Java core architecture adhering to ISO 27001 security controls with AES-256 protocol-level cryptography and sub-millisecond execution times.",
    challenges: [
      "Severe latency spikes and thread contention during market open spikes, triggering transaction dropouts.",
      "Regulatory demands requiring airtight ISO 27001 data compliance, immutable audit journals, and HSM key lifecycle management.",
      "Vulnerability of stateful sessions to replay attacks and unauthorized lateral service escalation.",
      "Double-spend risks during transient network partitions across distributed bank gateway nodes."
    ],
    solutionPillars: [
      {
        title: "Ultra-Resilient Java Transaction Engine",
        description: "Constructed a zero-garbage, non-blocking Java core handling 10,000+ transactions per second at sub-millisecond database latency."
      },
      {
        title: "Hardware-Grade AES-256 Cryptography",
        description: "Implemented protocol-level payload encryption with automated envelope key rotation and strict TLS 1.3 enforcement."
      },
      {
        title: "ACID Double-Entry Ledger System",
        description: "Built an immutable, event-sourced transaction journal guaranteeing mathematical balance and zero double-entry errors."
      }
    ],
    timeline: [
      { phase: "Phase 1", duration: "Weeks 1–6", title: "Compliance Audit & Cryptographic Specification", description: "Formalized ISO 27001 threat modeling, banking gateway requirements, and mathematical ledger invariants." },
      { phase: "Phase 2", duration: "Weeks 7–14", title: "Settlement Engine Core & Kafka Ingestion", description: "Developed reactive Java microservices, event streaming partitions, and double-entry ledger state machine." },
      { phase: "Phase 3", duration: "Weeks 15–19", title: "Penetration Testing & HSM Hardware Integration", description: "Executed third-party black-box security penetration tests and integrated cloud HSM key rotation." },
      { phase: "Phase 4", duration: "Weeks 20–24", title: "High-Volume Stress Tests & Mainnet Launch", description: "Simulated 15,000 TPS peak load bursts, validated zero ledger drift, and launched live under production SLA." }
    ],
    outcomes: [
      { metric: "99.99%", label: "Guaranteed Production Uptime", detail: "Zero unplanned downtime incidents through redundant multi-zone clustering." },
      { metric: "10,000+", label: "Transactions per Second", detail: "High-frequency throughput handled with sub-millisecond internal database locks." },
      { metric: "Zero", label: "Security Incidents", detail: "100% clean security record across all external penetration audits." },
      { metric: "ISO 27001", label: "Certified Compliance", detail: "Full security certification approved on initial external submission." }
    ],
    techStack: [
      { category: "Core Backend", technologies: ["Java 21 LTS", "Spring Boot", "Spring Security"] },
      { category: "Security & Encryption", technologies: ["AES-256-GCM", "TLS 1.3", "Cloud HSM", "JWT / RBAC"] },
      { category: "Event & Persistence", technologies: ["Apache Kafka", "PostgreSQL Enterprise", "Liquibase"] },
      { category: "Infrastructure", technologies: ["Docker", "Kubernetes", "Prometheus & Grafana"] }
    ],
    testimonial: {
      id: "t2",
      clientName: "David Wilson",
      clientRole: "CTO",
      company: "CloudPeak",
      content: "High-quality engineering combined with a deep understanding of cloud-native architecture. VPD TECH is our go-to partner for complex backend systems.",
      rating: 5
    },
    architectureFlow: [
      { step: "01", label: "Trading Terminal Request", detail: "Stateless JWT-authenticated request signed via client-side ephemeral keys." },
      { step: "02", label: "AES-256 Envelope Crypto", detail: "Hardware Security Module (HSM) key rotation and protocol-level encryption." },
      { step: "03", label: "Kafka Event Ledger", detail: "Partitioned, immutable append-only event stream guaranteeing strict ordering." },
      { step: "04", label: "2PC Distributed Settlement", detail: "ACID double-entry ledger settlement completing at 10,000+ transactions per second." }
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
  },
  {
    id: "b4",
    title: "Containerized Delivery Pipelines with Docker & CI/CD",
    excerpt: "How immutable infrastructure and one-line Docker deployments cut release cycles from weeks to hours without trading away production stability.",
    author: "VPD Engineering Lab",
    date: "April 2026",
    tags: ["Docker", "DevOps", "Architecture"],
    image: "/about1.webp"
  },
  {
    id: "b5",
    title: "Core Web Vitals as a Conversion Metric, Not a Checklist",
    excerpt: "Treating LCP, INP, and CLS as revenue levers — the measurement discipline and budget enforcement that keep enterprise frontends under 100ms TTI.",
    author: "VPD Engineering Lab",
    date: "April 2026",
    tags: ["React", "UX", "Performance"],
    image: "/about2.webp"
  },
  {
    id: "b6",
    title: "Multi-Tenant SaaS: Isolation Models That Actually Scale",
    excerpt: "Comparing database-per-tenant, schema-per-tenant, and shared-row isolation — and the RBAC patterns that keep enterprise data boundaries airtight.",
    author: "VPD Engineering Lab",
    date: "March 2026",
    tags: ["Architecture", "Security", "SaaS"],
    image: "/about3.webp"
  },
  {
    id: "b7",
    title: "Lead Funnel Instrumentation Inside React SPAs",
    excerpt: "Wiring edge analytics and CRM handoffs directly into the component tree so every micro-conversion is captured, attributed, and actionable.",
    author: "VPD Engineering Lab",
    date: "March 2026",
    tags: ["React", "UX", "Analytics"],
    image: "/portfolio-lead-engine.svg"
  },
  {
    id: "b8",
    title: "Event-Driven Backends for High-Frequency Operations",
    excerpt: "Designing Spring Boot services around durable event queues — idempotent consumers, replay safety, and back-pressure under 10,000 transactions per second.",
    author: "VPD Engineering Lab",
    date: "February 2026",
    tags: ["Java", "Real-Time", "Architecture"],
    image: "/portfolio-operational-hub.svg"
  },
  {
    id: "b9",
    title: "AES-256 and ISO 27001: A Practical Compliance Blueprint",
    excerpt: "A field guide to protocol-level encryption, stateless JWT barriers, and audit trails that satisfy enterprise security reviews without slowing delivery.",
    author: "VPD Engineering Lab",
    date: "February 2026",
    tags: ["Security", "FinTech", "Compliance"],
    image: "/portfolio-financial-protocol.svg"
  },
  {
    id: "b10",
    title: "Design Systems That Survive Enterprise Scale",
    excerpt: "Token architecture, component ownership, and documentation discipline that keep a React design system coherent across a dozen product teams.",
    author: "VPD Engineering Lab",
    date: "January 2026",
    tags: ["React", "UX", "Architecture"],
    image: "/about1.webp"
  },
  {
    id: "b11",
    title: "PostgreSQL Tuning for Transaction-Heavy Workloads",
    excerpt: "Index strategy, connection pooling, and vacuum discipline that keep p99 query latency flat while write volume grows tenfold.",
    author: "VPD Engineering Lab",
    date: "January 2026",
    tags: ["PostgreSQL", "Performance", "Architecture"],
    image: "/about2.webp"
  },
  {
    id: "b12",
    title: "RBAC Design Patterns for Multi-Product Platforms",
    excerpt: "Role hierarchies, resource-scoped permissions, and audit-safe delegation — the access models we deploy across enterprise portals.",
    author: "VPD Engineering Lab",
    date: "December 2025",
    tags: ["Security", "SaaS", "Architecture"],
    image: "/about3.webp"
  }
];

export const getRelatedInsightArticle = (projectId: string): InsightArticle | undefined => {
  const map: Record<string, string> = {
    'lead-engine': 'b1',
    'operational-hub': 'b3',
    'financial-protocol': 'b2',
  };
  const articleId = map[projectId];
  return VERIFIED_INSIGHTS.find((a) => a.id === articleId);
};

export const getRelatedProjectForArticle = (articleId: string): Project | undefined => {
  const map: Record<string, string> = {
    b1: 'lead-engine',
    b3: 'operational-hub',
    b2: 'financial-protocol',
  };
  const projectId = map[articleId];
  return VERIFIED_PROJECTS.find((p) => p.id === projectId);
};

export const getArticleTakeaways = (article: InsightArticle): string[] => {
  if (article.takeaways && article.takeaways.length > 0) return article.takeaways;
  if (article.tags.some((t) => ['React', 'UX', 'Architecture'].includes(t))) {
    return [
      'Eliminate client runtime overhead with route-level code splitting and atomic component hydration.',
      'Enforce strict Core Web Vitals budgets to maintain Time-to-Interactive (TTI) under 1.2 seconds.',
      'Prioritize high-intent conversion pathways by decoupling state management from monolithic bundles.',
    ];
  }
  if (article.tags.some((t) => ['Java', 'Security', 'FinTech'].includes(t))) {
    return [
      'Enforce compile-time type safety and predictable memory models using Java 21 LTS and Spring Boot 3.',
      'Deploy protocol-level AES-256-GCM encryption and stateless token authorization barriers.',
      'Guarantee audit compliance (ISO 27001) with immutable append-only event ledgers.',
    ];
  }
  if (article.tags.some((t) => ['WebSockets', 'Real-Time'].includes(t))) {
    return [
      'Maintain sub-50ms bi-directional telemetry sync using persistent STOMP socket protocols.',
      'Prevent database write collisions through partitioned PostgreSQL queues and optimistic locking.',
      'Decouple telemetry brokers with Redis Pub/Sub for horizontal scaling across distributed nodes.',
    ];
  }
  return [
    'Enforce immutable deployment pipelines with Docker containerization and automated verification.',
    'Decouple service boundaries with clean API contracts to eliminate cascade failures.',
    'Maintain 100% continuous integration and automated static analysis before production rollout.',
  ];
};


