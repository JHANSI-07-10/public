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
  /** Three short display lines used by the homepage stacked-card deck */
  stackLines?: string[];
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

export interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  challenges: string[];
  vpdSolutions: string[];
  keyTech: string[];
  icon: string;
}

export interface ProductPlatform {
  id: string;
  name: string;
  category: string;
  status: 'Production' | 'Available' | 'Staging' | 'Pilot' | 'In Development' | 'Planned';
  statusBadge: string;
  summary: string;
  highLevelConcepts: string[];
  targetAudience: string;
  architectureNote: string;
  keyTech?: string[];
}

export interface FounderProfile {
  name: string;
  role: string;
  shortRole: string;
  initials: string;
  bio: string;
  focusAreas: string[];
  quote: string;
  location: string;
  education?: string;
  linkedin?: string;
  image?: string;
}

export interface DeliveryStage {
  step: string;
  title: string;
  tagline: string;
  /** One-line explanation used by the homepage delivery dial. */
  summary: string;
  description: string;
  deliverables: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  overview: string;
  requirements: string[];
}

export const COMPANY_DATA = {
  name: "VPD Technologies",
  legalName: "VPD Technologies Private Limited",
  brandLine: "Vision. Purpose. Delivery.",
  tagline: "Transforming Ideas into Intelligent Digital Solutions",
  mission: "We engineer high-performance software products, enterprise applications, and modern digital solutions that help organizations modernize operations and support business growth.",
  vision: "To establish a trusted digital technology presence recognized for delivering scalable, reliable, and impactful software solutions from Kurnool, Andhra Pradesh to enterprises globally.",
  location: "Kurnool, Andhra Pradesh, India",
  streetAddress: "Kurnool, Andhra Pradesh, India",
  coordinates: { lat: 15.838556, lng: 78.015556 },
  phone: "+91 83339 19447",
  email: "info@vpdtechnologies.com",
  recruitmentEmail: "info@vpdtechnologies.com",
  whatsappUrl: "https://wa.me/918333919447",
  mapsUrl: "https://maps.app.goo.gl/zC4rwmytTXbwNfTW7",
  foundingStatement: "VPD Technologies is led by its founding team, Sai Krishna Vuppala, Founder and Chief Executive Officer, and Ramcharan Gottipati, Co-Founder and Managing Director. The leadership team is focused on building technology capabilities, delivering software solutions, and supporting digital innovation from Kurnool, Andhra Pradesh.",
  founder: {
    name: "Sai Krishna Vuppala",
    role: "Founder & Chief Executive Officer",
    image: "/sai-krishna-vuppala.webp",
    linkedin: "https://www.linkedin.com/in/vuppala-sai-krishna-545a90175/",
    quote: "VPD Technologies was established to bridge the gap between complex software engineering and intuitive business interfaces. We avoid corporate jargon in favor of direct technical transparency and measurable results."
  },
  leadership: [
    {
      name: "Sai Krishna Vuppala",
      role: "Founder and Chief Executive Officer",
      shortRole: "Founder & CEO",
      initials: "SK",
      image: "/sai-krishna-vuppala.webp",
      linkedin: "https://www.linkedin.com/in/vuppala-sai-krishna-545a90175/"
    },
    {
      name: "Ramcharan Gottipati",
      role: "Co-Founder and Managing Director",
      shortRole: "Co-Founder & MD",
      initials: "RG",
      image: "/ramcharan-gottipati.webp",
      linkedin: "https://www.linkedin.com/in/ramcharangottipati/"
    }
  ]
};

export type SocialPlatform = "linkedin" | "facebook" | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

/** Official VPD Technologies profiles, shared by the social rail and mobile dock. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vpdtechnologies/"
  },
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591199148003"
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/vpdtechnologiespvtltd/"
  }
];

export const FOUNDER_PROFILES: FounderProfile[] = [
  {
    name: "Sai Krishna Vuppala",
    role: "Founder & Chief Executive Officer",
    shortRole: "Founder & CEO",
    initials: "SK",
    image: "/sai-krishna-vuppala.webp",
    bio: "Sai Krishna Vuppala is the Founder and CEO of VPD Technologies Private Limited. He leads the company’s strategy, business development, and client relationships, and oversees service delivery and organizational growth. Working closely with the leadership team, he identifies new opportunities, understands client needs, and shapes technology solutions that serve their business goals, while expanding the company’s service capabilities and building long-term client partnerships.",
    focusAreas: [
      "Enterprise Software Architecture",
      "Strategic Technology Roadmap",
      "Full-Stack Ecosystems & Cloud Engineering",
      "Global Client Partnerships"
    ],
    quote: "VPD Technologies was established to bridge the gap between complex software engineering and intuitive business interfaces. We avoid corporate jargon in favor of direct technical transparency and measurable results.",
    location: "Kurnool, Andhra Pradesh, India",
    education: "Management & Technology Leadership",
    linkedin: "https://www.linkedin.com/in/vuppala-sai-krishna-545a90175/"
  },
  {
    name: "Ramcharan Gottipati",
    role: "Co-Founder & Managing Director",
    shortRole: "Co-Founder & MD",
    initials: "RG",
    image: "/ramcharan-gottipati.webp",
    bio: "Ramcharan Gottipati is the Co-Founder and Managing Director of VPD Technologies Private Limited. With 12 years of experience in the IT industry, he leads the company’s technology strategy, software architecture, and engineering standards, and is responsible for the quality of technical delivery. He translates business requirements into scalable, reliable solutions and works with the team to keep execution aligned with client objectives. Alongside this, he contributes to strategic planning, business development, and client engagement.",
    focusAreas: [
      "Delivery Governance & Project Operations",
      "Organizational Growth & Talent Development",
      "Enterprise Service Level Agreements (SLAs)",
      "Process Optimization & Quality Assurance"
    ],
    quote: "True engineering value lies in disciplined execution and dependable delivery. We are committed to building high-tier software capabilities and decentralized engineering talent that clients can rely on every single day.",
    location: "Kurnool, Andhra Pradesh, India",
    education: "Bachelor of Technology in Computer Science & Engineering",
    linkedin: "https://www.linkedin.com/in/ramcharangottipati/"
  }
];

export const KEY_METRICS = [
  { value: "110+", label: "Completed Projects", context: "Delivered across web, enterprise, and custom software" },
  { value: "12+", label: "Websites & Web Apps", context: "Production-ready platforms launched for clients" },
  { value: "99.99%", label: "High-Availability Uptime", context: "Guaranteed architectural SLA benchmark" },
  { value: "< 100ms", label: "Frontend TTI Latency", context: "Core Web Vitals optimized for conversion velocity" }
];

export const CORE_SERVICES: Service[] = [
  {
    id: "enterprise-software",
    title: "Enterprise Software / ERP / CRM",
    category: "Enterprise Business Engines",
    description: "Develop or implement business-focused applications and integrations, where offered by VPD.",
    target: "Enterprises seeking centralized operational command, structured data integrity, and unified multi-department workflows.",
    stack: "Python / FastAPI / PostgreSQL / Redis",
    latency: "High-Throughput Concurrent Stream",
    security: "Enterprise ISO 27001 & AES-256 Protocol",
    benefits: [
      "Mission-Critical Enterprise Stability & Durability",
      "Conflict-Free Optimistic Data Models for High Volume",
      "Scalable Multi-Tenant Isolation & Role Governance"
    ],
    capabilities: [
      "Enterprise Resource Planning Modules",
      "Customer Relationship Management Engines",
      "Distributed Database Clustering & Optimization"
    ],
    stackLines: [
      "ERP and CRM engines that centralize operational command.",
      "Unified workflows and structured data across departments.",
      "Multi-tenant architecture with enterprise-grade governance."
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile Application Development",
    category: "Cross-Platform Mobile Experiences",
    description: "Build mobile experiences for business services and customer engagement.",
    target: "Companies extending operational tools to mobile teams, field workers, or mobile-first end consumers.",
    stack: "React Native / Flutter / Android SDK / iOS Swift",
    latency: "60 FPS Native Touch Response",
    security: "Biometric Authentication & Keychain Encryption",
    benefits: [
      "Unified Codebase Across iOS & Android Platforms",
      "Offline-First Data Caching & Automatic Sync",
      "Ergonomic Touch-Optimized Design Systems"
    ],
    capabilities: [
      "Field Operations & Dispatch Apps",
      "Customer Self-Service Mobile Portals",
      "Push Notification & Real-Time Telemetry Engines"
    ],
    stackLines: [
      "Native-feel apps for iOS and Android from one codebase.",
      "Offline-first data with reliable automatic synchronization.",
      "Touch-optimized interfaces for field teams and customers."
    ]
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    category: "Tailored Business Systems",
    description: "Design and develop applications tailored to business requirements and workflows.",
    target: "Organizations needing purpose-built software architectures that map precisely to their proprietary business logic.",
    stack: "React / Node.js / Python / PostgreSQL",
    latency: "< 80ms API Latency",
    security: "Role-Based Access Control (RBAC) & AES-256",
    benefits: [
      "Bespoke Workflows Built to Exact Business Specifications",
      "Seamless Legacy API & Database Integrations",
      "High-Density Architecture Engineered for Longevity"
    ],
    capabilities: [
      "Custom Workflow Automation",
      "Microservice-Based Architecture",
      "Data Pipeline Integration"
    ],
    stackLines: [
      "Purpose-built systems shaped around your workflows.",
      "Seamless integration with your existing APIs and data.",
      "Clean, structured code built for long-term maintainability."
    ]
  },
  {
    id: "web-dev",
    title: "Website & Web Application Development",
    category: "High-Conversion Frontends & Portals",
    description: "Create responsive websites and web applications for business communication and digital services.",
    target: "Businesses requiring an authoritative online presence, brand credibility, and high lead capture velocity.",
    stack: "React / Next.js / TypeScript / Tailwind CSS",
    latency: "< 100ms TTI",
    security: "Standard SSL / Strict Content Security Policy (CSP)",
    benefits: [
      "Conversion-Focused Layout Architecture",
      "SEO-Ready Metadata & Schema.org Structured Data",
      "Mobile-First Precision Responsive Engineering"
    ],
    capabilities: [
      "Corporate Web Portals",
      "Core Web Vitals Optimization",
      "Headless CMS & Content Management"
    ],
    stackLines: [
      "Corporate websites and web apps that load fast and convert.",
      "Responsive, accessible layouts with SEO-ready structure.",
      "From landing pages to complex portals, engineered end to end."
    ]
  },
  {
    id: "ui-ux-engineering",
    title: "UI/UX Design & Product Engineering",
    category: "Usable Digital Experiences",
    description: "Design usable digital experiences and support product development and improvement.",
    target: "Teams looking to eliminate user friction, upgrade software aesthetic appeal, and improve retention through design excellence.",
    stack: "Figma / React 19 / Design Tokens / WCAG 2.2 AA",
    latency: "Accessible Contrast & Instant Feedback",
    security: "Compliant Interaction Patterns",
    benefits: [
      "Systematic Design Systems That Scale With Growth",
      "User-Centric Usability Research & Wireframing",
      "WCAG 2.2 AA Accessibility Compliance Built-In"
    ],
    capabilities: [
      "Interactive High-Fidelity Prototypes",
      "Enterprise Design Token Systems",
      "Ergonomic Dashboard & Workflow Refinement"
    ],
    stackLines: [
      "Design systems and prototypes that scale with growth.",
      "User-centric research translated into interface clarity.",
      "WCAG 2.2 AA accessibility engineered from day one."
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    category: "Intelligent Software Capabilities",
    description: "Explore data-driven and intelligent software capabilities where appropriate.",
    target: "Forward-thinking businesses looking to extract actionable insights from structured data and automate repetitive decisions.",
    stack: "Python / PyTorch / FastEmbed / Vector DBs",
    latency: "Sub-Second Inference Pipelines",
    security: "Data Privacy Sandboxing & Anonymization",
    benefits: [
      "Automated Data Categorization & Document Extraction",
      "Context-Aware Search & Retrieval Augmented Generation (RAG)",
      "Predictive Analytics for Demand and Inventory Optimization"
    ],
    capabilities: [
      "Intelligent Document Processing",
      "Natural Language Query Interfaces",
      "Predictive Operational Analytics"
    ],
    stackLines: [
      "Practical AI that turns your data into working decisions.",
      "Document extraction, semantic search and predictive analytics.",
      "Privacy-sandboxed pipelines engineered for production."
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    category: "Reliable Infrastructure Environments",
    description: "Support application deployment and infrastructure environments.",
    target: "Organizations moving away from fragile server management toward automated, resilient cloud environments.",
    stack: "Docker / Kubernetes / AWS / Vercel Edge / GitHub Actions",
    latency: "Zero-Downtime Rolling Deployments",
    security: "Infrastructure as Code (IaC) & Secret Management",
    benefits: [
      "Automated CI/CD Testing and Deployment Pipelines",
      "Elastic Auto-Scaling for Unpredictable Traffic Bursts",
      "Comprehensive Observability, Telemetry & Real-Time Alerts"
    ],
    capabilities: [
      "Container Orchestration & Dockerization",
      "Multi-Region Edge Routing & Caching",
      "Automated Security Audits & Vulnerability Scanning"
    ],
    stackLines: [
      "Automated CI/CD pipelines with zero-downtime releases.",
      "Elastic infrastructure that absorbs unpredictable traffic.",
      "Continuous observability, telemetry and security auditing."
    ]
  },

];

export const INDUSTRIES: Industry[] = [
  {
    id: "agritech",
    name: "Agriculture & AgriTech",
    tagline: "Empowering Rural & Agri-Business Workflows",
    description: "Digital platforms and ERP solutions engineered to streamline crop tracking, farmer registrations, procurement logistics, and transparent mandi operations.",
    challenges: [
      "Decentralized farmer records and fragmented harvest reporting",
      "Manual weighing, quality inspection, and paper-based mandi receipts",
      "Delayed payment reconciliations between grain buyers and producers"
    ],
    vpdSolutions: [
      "Centralized farmer profiles and crop lifecycle monitoring modules",
      "Digitized procurement checkpoints with automated batch tagging",
      "Integrated settlement ledger tracking for transparent payments"
    ],
    keyTech: ["AgriFlow Core", "Offline Sync", "GPS Mapping", "PostgreSQL"],
    icon: "Sprout"
  },
  {
    id: "healthcare",
    name: "Healthcare Technology",
    tagline: "Secure, Data-Compliant Health Systems",
    description: "Reliable web applications and management systems supporting patient appointment scheduling, clinic coordination, and diagnostic reporting.",
    challenges: [
      "Strict data privacy regulations and sensitive health record management",
      "Disjointed scheduling across clinics, specialists, and diagnostic labs",
      "Latency during patient check-in and medical history retrievals"
    ],
    vpdSolutions: [
      "AES-256 encrypted health record management with strict role-based access",
      "Unified appointment coordination portals with automated reminders",
      "Interoperable REST APIs connecting laboratory results with doctor dashboards"
    ],
    keyTech: ["HIPAA/DISHA Security Patterns", "Python", "React", "Audit Trails"],
    icon: "Activity"
  },
  {
    id: "fintech",
    name: "Finance & FinTech",
    tagline: "Institutional Security & High-Frequency Ledgers",
    description: "High-throughput financial architectures, compliance reporting engines, and payment gateway integrations built with banking-grade encryption.",
    challenges: [
      "Sub-millisecond latency requirements during peak transaction spikes",
      "Rigid regulatory compliance (ISO 27001, PCI-DSS, AES-256 standards)",
      "Legacy core banking interfaces lacking modern API interoperability"
    ],
    vpdSolutions: [
      "Event-driven microservices with asynchronous transaction clearing",
      "Automated audit trails, multi-factor authorization, and ledger immutability",
      "Scalable settlement rails with optimistic concurrency and zero data loss"
    ],
    keyTech: ["Python / FastAPI", "Kafka", "ISO 27001", "PostgreSQL", "AES-256"],
    icon: "Briefcase"
  },
  {
    id: "edtech",
    name: "Education Technology",
    tagline: "Scalable Learning & Institutional Administration",
    description: "Digital learning platforms, student information systems, and academic administration portals designed for institutions and educational startups.",
    challenges: [
      "High concurrent traffic surges during admissions and exam results",
      "Disorganized curriculum delivery and student engagement tracking",
      "Inefficient fee collection workflows and fragmented parent communications"
    ],
    vpdSolutions: [
      "High-concurrency cloud architectures capable of handling peak exam traffic",
      "Interactive student portals with progress tracking and course delivery",
      "Automated fee collection reminders and administrative reporting dashboards"
    ],
    keyTech: ["Next.js", "Redis Caching", "PostgreSQL", "Cloud Edge"],
    icon: "GraduationCap"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Shop-Floor Visibility & Process Automation",
    description: "Operational software linking raw material procurement, equipment maintenance cycles, quality check inspection, and inventory output.",
    challenges: [
      "Production bottlenecks caused by paper-based job card tracking",
      "Unplanned machine downtime due to reactive maintenance schedules",
      "Discrepancies between physical inventory and warehouse reports"
    ],
    vpdSolutions: [
      "Digital shop-floor dashboards displaying live machine throughput",
      "Scheduled preventive maintenance trackers with automated alerts",
      "Barcode-enabled inventory logging for real-time stock reconciliation"
    ],
    keyTech: ["WebSockets", "FastAPI / Python", "Industrial Dashboards", "Docker"],
    icon: "Factory"
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    tagline: "Multi-Hub Coordination & Real-Time Tracking",
    description: "High-frequency operational applications connecting distribution hubs, automated manifest generation, and fleet dispatch coordination.",
    challenges: [
      "Manual spreadsheet dispatching leading to transit misrouting",
      "Delayed telemetry between regional dispatch depots and head offices",
      "Simultaneous edits causing manifest collisions during peak shift handovers"
    ],
    vpdSolutions: [
      "Persistent WebSocket streams updating dispatch boards in under 50ms",
      "Conflict-free optimistic locking ensuring manifest data integrity",
      "Automated route optimization and vehicle turnaround metrics"
    ],
    keyTech: ["B2B Logistics Platform Core", "STOMP Sockets", "Redis Pub/Sub", "Kafka"],
    icon: "Truck"
  },
  {
    id: "enterprise-retail",
    name: "Retail, FMCG & Enterprise Technology",
    tagline: "High-Velocity Digital Commerce & Portals",
    description: "Scalable B2B catalog applications, distributor ordering systems, and corporate partner portals built for reliable transaction execution.",
    challenges: [
      "Slow loading product catalogs dampening B2B buyer ordering velocity",
      "Fragmented dealer/distributor tiers with conflicting price rules",
      "Lack of centralized business intelligence across sales territories"
    ],
    vpdSolutions: [
      "Sub-100ms response time digital catalogs with instant search indexing",
      "Multi-tier pricing matrix engines tailored for regional distributors",
      "Consolidated executive analytics reporting sales performance in real time"
    ],
    keyTech: ["React 19", "Microservices", "Elasticsearch", "PostgreSQL"],
    icon: "Briefcase"
  }
];

export const PRODUCTS_PLATFORMS: ProductPlatform[] = [
  {
    id: "agriflow-erp",
    name: "AgriFlow",
    category: "Agribusiness & Mandi Management",
    status: "Production",
    statusBadge: "Production",
    summary: "Intended agricultural platform covering farmer registration, crop management, inspections, grain procurement, warehouse coordination and settlements.",
    highLevelConcepts: [
      "Comprehensive Farmer Registration & Landholding Database",
      "Crop Lifecycle Monitoring & Quality Inspection Checkpoints",
      "Digital Grain Mandi Procurement Logs & Batch Tagging",
      "Automated Warehouse Storage Coordination & Settlement Pipelines"
    ],
    targetAudience: "Agribusiness cooperatives, grain procurement agencies, farmer producer organizations (FPOs), and agricultural input distributors.",
    architectureNote: "Descriptive concept only. Designed with mobile-responsive offline sync capabilities for rural field agents, integrated with secure ledger reconciliation backends.",
    keyTech: ["React 19", "Node.js", "PostgreSQL", "Offline Sync", "GPS Mapping"]
  },
  {
    id: "clikgett",
    name: "ClikGett",
    category: "Quick-Commerce & Hyperlocal Grocery Delivery",
    status: "Production",
    statusBadge: "Production",
    summary: "Live quick-commerce and hyperlocal grocery delivery platform operating in Kurnool, Andhra Pradesh. Built around three interconnected interfaces: a customer Flutter mobile app, a native Android delivery partner app, and a centralized React administrative management portal.",
    highLevelConcepts: [
      "Customer Mobile App (Flutter) for Product Discovery, Smart Cart & Digital Checkout",
      "Dedicated Delivery Partner App (Native Android) with Live Dispatch & Routing",
      "Centralized Admin Console for Real-Time Catalog, Pricing & Variant Control",
      "Dynamic Geofenced Address Verification & Hyperlocal Serviceability Mapping",
      "Integrated Multi-Payment Workflows (UPI, Net Banking & Cash on Delivery)",
      "Real-Time Order Progression, Fulfillment Tracking & Merchant Ledgers"
    ],
    targetAudience: "Urban shoppers, retail supermarket chains, regional grocery distributors, and quick-commerce operators requiring unified digital fulfillment.",
    architectureNote: "Production system engineered with a three-tier architecture: Flutter cross-platform customer mobile application, high-reliability native Android delivery app, and a React administrative web dashboard. Powered by Node.js & Express RESTful microservices and a cloud-hosted MySQL database on AWS RDS with automated failover.",
    keyTech: [
      "Flutter (Customer App)",
      "Native Android (Delivery)",
      "React (Admin Web)",
      "Node.js & Express",
      "MySQL (AWS RDS)",
      "RESTful APIs"
    ]
  },
  {
    id: "lumiere-os",
    name: "Lumière OS",
    category: "Hospitality Tech & Restaurant Operating System",
    status: "Staging",
    statusBadge: "Staging",
    summary: "Next-generation B2B multi-tenant restaurant operating system engineered for fine dining establishments and multi-outlet hospitality chains. Unifies table reservations with deposit protection, real-time Kitchen KDS bump bars, bi-directional marketplace order synchronization, floor plan waiter POS, and recipe COGS inventory.",
    highLevelConcepts: [
      "Table Reservation Engine with Razorpay Deposit No-Show Protection",
      "Real-Time Kitchen Display System (KDS) & Bump Bar Ticket Acceleration",
      "Bi-Directional Swiggy & Zomato Marketplace Order Synchronization",
      "Interactive Waiter POS with Graphical Floor Plan & Table Turn Management",
      "Recipe Level COGS Tracking, Ingredient Deductions & Inventory Alerts",
      "Centralized Multi-Outlet Chain Administration & Role-Based Workspaces"
    ],
    targetAudience: "Fine dining restaurants, cloud kitchen networks, multi-outlet food & beverage chains, and franchise hospitality operators requiring unified front-of-house and kitchen operations.",
    architectureNote: "Architected as a high-throughput, multi-tenant B2B SaaS engine. Built with Next.js web application architecture, complex relational stored procedures in PLpgSQL, modular client-side JavaScript execution, and custom responsive CSS design tokens.",
    keyTech: [
      "Next.js",
      "PLpgSQL",
      "JavaScript",
      "CSS"
    ]
  },
  {
    id: "bunkos",
    name: "BunkOS",
    category: "Pump Station Management SaaS & Fuel Operations Platform",
    status: "In Development",
    statusBadge: "Implementation Planning",
    summary: "A multi-tenant operational SaaS platform engineered to digitize petrol and fuel station operations. Connects station configuration, users, shifts, nozzle-level meter readings, sales, payment reconciliation, fuel tanker receipts, live tank inventory, credit ledger, compliance, maintenance, audit, and analytics into a single unified operational record.",
    highLevelConcepts: [
      "Multi-Tenant Control Plane & Web Plane for Dealers / Owners, Station Managers & Pump Attendants",
      "Shift Lifecycle & Low-Friction Nozzle-Level Meter Readings (Opening & Closing Reconciliation)",
      "Automated Sales & Payment Reconciliation (Meter Dispensed vs. Cash, Card, UPI & Credit Collections)",
      "Auditable Fuel Inventory (Opening Stock + Tanker Deliveries − Dispensed ± Approved Adjustments)",
      "B2B Credit & Receivables Ledger with Credit Limits, Payment Allocations & Aging Analysis",
      "Preventive/Corrective Maintenance Tracking, Compliance Document Expiry Alerts & Full Evidence Audits"
    ],
    targetAudience: "Petrol pump dealers, fuel station owners, multi-station petroleum retail networks, station managers, and pump attendants requiring reliable operational control without manual spreadsheets.",
    architectureNote: "Architected as a multi-tenant SaaS platform partitioned into a SaaS Control Plane and operational Web Plane. Engineered with a high-performance Python + FastAPI backend, PostgreSQL relational database with immutable audit logs and transactional reconciliation boundaries, and a responsive React / Next.js web application with role-specific workspaces.",
    keyTech: [
      "Python + FastAPI",
      "React / Next.js",
      "PostgreSQL",
      "Multi-Tenant SaaS",
      "Control & Web Planes",
      "Role-Based RBAC"
    ]
  },
  {
    id: "b2b-logistics",
    name: "B2B Logistics Platform",
    category: "Supply Chain & Freight Coordination",
    status: "In Development",
    statusBadge: "In Development",
    summary: "Intended logistics/supply-chain platform, with high-level procurement, inventory, warehousing, transportation and delivery concepts.",
    highLevelConcepts: [
      "Multi-Hub Warehouse Inventory Tracking",
      "Automated Digital Manifest Creation & Consignment Dispatch",
      "Real-Time Freight Telemetry & Transit Milestone Monitoring",
      "Carrier Route Optimization & Vehicle Turnaround Metrics"
    ],
    targetAudience: "Logistics providers, freight operators, and distribution enterprises seeking unified fleet and inventory visibility.",
    architectureNote: "Descriptive concept only. Engineered around event-driven microservices, persistent WebSocket state synchronization, and partition-indexed PostgreSQL storage.",
    keyTech: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Redis"]
  },
  {
    id: "enterprise-saas-suite",
    name: "Enterprise SaaS Suite",
    category: "Multi-Tenant Business Operations",
    status: "Planned",
    statusBadge: "Planned",
    summary: "Overview of intended SaaS offerings across HRMS, healthcare, manufacturing and education.",
    highLevelConcepts: [
      "Modular HRMS with Attendance, Leave, and Policy Governance",
      "Healthcare Practice Management & Clinic Scheduling Systems",
      "Manufacturing Shop-Floor Metrics & Equipment Lifecycle Tracking",
      "Institutional Education Portals & Academic Data Management"
    ],
    targetAudience: "Small to mid-scale enterprises modernizing business operations with turnkey, configurable software modules.",
    architectureNote: "Descriptive concept only. Architected around multi-tenant isolation patterns, strict Role-Based Access Control (RBAC), and centralized API gateways.",
    keyTech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"]
  }
];

export const DELIVERY_METHODOLOGY: DeliveryStage[] = [
  {
    step: "01",
    title: "Design",
    tagline: "Architecture & User Experience Blueprinting",
    summary: "Map business goals, workflows and system architecture before development begins.",
    description: "We map business processes, system boundaries, data contracts, and high-fidelity interface wireframes before a single line of application code is written.",
    deliverables: [
      "Technical Architecture Specifications & Data Schemas",
      "Interactive Wireframes & Component Design System",
      "Sprint Milestones, Performance Budgets & Risk Analysis"
    ]
  },
  {
    step: "02",
    title: "Develop",
    tagline: "Sprint-Based Rigorous Engineering",
    summary: "Build, integrate and test reliable application components.",
    description: "Disciplined engineering execution with modern tech stacks: React 19, TypeScript, Python, and FastAPI. Clean type-safe code with automated testing.",
    deliverables: [
      "Modular Frontend & Backend Microservices",
      "Strict Unit & Integration Test Coverage",
      "Continuous Integration (CI/CD) Pipeline Automation"
    ]
  },
  {
    step: "03",
    title: "Pilot",
    tagline: "Staging Validation & User Testing",
    summary: "Validate the solution in a controlled staging environment before release.",
    description: "Deploying to controlled staging environments to stress-test real-world data flows, gather stakeholder feedback, and calibrate performance benchmarks.",
    deliverables: [
      "Staging Sandbox Environment Deployment",
      "Core Web Vitals & Load Concurrency Benchmarking",
      "User Acceptance Testing (UAT) Sign-off"
    ]
  },
  {
    step: "04",
    title: "Scale",
    tagline: "Production Cutover & Cloud Orchestration",
    summary: "Launch the solution and prepare infrastructure for reliable growth.",
    description: "Zero-downtime production cutovers with distributed cloud edge infrastructure, automated failover routines, and high-availability monitoring.",
    deliverables: [
      "Zero-Downtime DNS Cutover & Database Migration",
      "Multi-Region Edge Caching & Content Delivery",
      "Real-Time Telemetry, Error Logging & Uptime SLAs"
    ]
  },
  {
    step: "05",
    title: "Support",
    tagline: "Ongoing Performance Tuning & Governance",
    summary: "Maintain, secure and continuously improve the production system.",
    description: "Dependable post-deployment engineering governance, proactive security patch management, performance audits, and long-term feature iteration.",
    deliverables: [
      "Guaranteed High-Availability Response Support",
      "Scheduled Security Audits & Dependency Patching",
      "Continuous Performance Tuning & Feature Roadmapping"
    ]
  }
];

export const CAREERS_DATA = {
  headline: "Build World-Class Engineering from Kurnool",
  subheadline: "Join a dedicated team creating high-tier software products, scalable cloud platforms, and modern enterprise systems.",
  overview: "At VPD Technologies Private Limited, we believe exceptional software engineering does not have to be confined to traditional metropolitan centers. Headquartered in Kurnool, Andhra Pradesh, we are cultivating elite engineering talent focused on architectural precision, clean code, and verifiable business value. We offer an environment where your work has direct impact, free of corporate bureaucracy.",
  values: [
    {
      title: "Direct Technical Transparency",
      description: "We solve real engineering problems with clear architectural blueprints and direct accountability."
    },
    {
      title: "Modern Engineering Stack",
      description: "Hands-on experience with modern tools: React 19, Next.js, Python, FastAPI, Docker, and Cloud Edge."
    },
    {
      title: "Culture of Continuous Learning",
      description: "Mentorship directly from senior engineering leaders, code reviews that challenge you, and room to take ownership."
    },
    {
      title: "Decentralized Innovation",
      description: "Demonstrating that tier-2 and tier-3 regional hubs can deliver software that rivals top global standards."
    }
  ],
  openRoles: [
    {
      id: "full-stack-engineer",
      title: "Full-Stack Software Engineer (Python & React)",
      department: "Core Engineering",
      type: "Full-time",
      postedDate: "12 Oct 2026",
      experienceLevel: "Mid – Senior",
      workMode: "On-site / Hybrid",
      shortLocation: "Kurnool, AP",
      location: "Kurnool, Andhra Pradesh (On-site / Hybrid)",
      overview: "Develop mission-critical web applications, high-throughput scalable backends, and responsive React client frontends.",
      requirements: [
        "Proficiency in Python / FastAPI / Node.js and modern TypeScript / React",
        "Understanding of relational databases (PostgreSQL) and RESTful API design",
        "Familiarity with Git, Docker, and CI/CD pipelines",
        "Passionate about writing clean, maintainable, and type-safe code"
      ]
    },
    {
      id: "frontend-developer",
      title: "Frontend Engineer (Next.js & UI/UX)",
      department: "Frontend Experience",
      type: "Full-time",
      postedDate: "03 Oct 2026",
      experienceLevel: "Mid – Senior",
      workMode: "On-site / Hybrid",
      shortLocation: "Kurnool, AP",
      location: "Kurnool, Andhra Pradesh (On-site / Hybrid)",
      overview: "Craft cinematic, high-performance web experiences with sub-100ms Time-to-Interactive and pixel-perfect design systems.",
      requirements: [
        "Strong expertise in React 19, Next.js, TypeScript, and Tailwind CSS",
        "Deep understanding of Core Web Vitals, accessibility (WCAG), and responsive layouts",
        "Experience translating Figma design systems into reusable atomic components",
        "Attention to micro-animations, layout rhythm, and mobile polish"
      ]
    },
    {
      id: "qa-devops",
      title: "DevOps & Quality Assurance Engineer",
      department: "Infrastructure & Quality",
      type: "Full-time",
      postedDate: "24 Sep 2026",
      experienceLevel: "Mid-level",
      workMode: "On-site / Hybrid",
      shortLocation: "Kurnool, AP",
      location: "Kurnool, Andhra Pradesh (On-site / Hybrid)",
      overview: "Maintain high-availability deployment pipelines, Docker environments, and automated regression test suites.",
      requirements: [
        "Hands-on experience with Docker, Linux administration, and CI/CD workflows",
        "Experience authoring automated end-to-end and integration tests",
        "Familiarity with cloud hosting (AWS, Vercel, VPS) and monitoring tools",
        "Strong focus on system reliability, zero-downtime deploys, and security standards"
      ]
    }
  ]
};

export const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Scalable Solutions",
    description: "Modular component hierarchies and decoupled API layers ensure your digital foundation effortlessly accommodates future pages, features, and user surges."
  },
  {
    number: "02",
    title: "Fast Delivery",
    description: "Lean architectural planning and disciplined sprint execution help your product transition from validated concept to production launch in record time."
  },
  {
    number: "03",
    title: "Modern Tech Stack",
    description: "Built with industry-standard technologies: React 19, TypeScript, Spring Boot, and cloud edge infrastructure for maximum developer velocity and longevity."
  },
  {
    number: "04",
    title: "Mobile Responsive",
    description: "Every layout is precision-tested across mobile, tablet, and widescreen desktop monitors to guarantee fluid, touch-optimized user experiences."
  },
  {
    number: "05",
    title: "SEO Optimized",
    description: "Semantic HTML5, lightning-fast Time to Interactive (<100ms), and search-ready OpenGraph and Schema.org structured data baked in from day one."
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
    solution: "Built a high-frequency web application featuring real-time WebSocket state synchronization and a multi-threaded asynchronous backend, providing single-pane visibility.",
    result: "Eliminated 90% of manual data entry errors and granted instantaneous operational tracking across 10+ regional dispatch hubs, improving turnaround by 35%.",
    tags: ["WebSockets", "Python / FastAPI", "Real-Time", "Logistics"],
    specs: [
      { label: "Protocol", value: "WebSockets (STOMP / SockJS)" },
      { label: "Backend Core", value: "FastAPI / Python" },
      { label: "Concurrency", value: "High-Volume Stream Handling" },
      { label: "Sync Latency", value: "< 50ms Global" }
    ],
    overview: "A major logistics operator managing distribution hubs across regional corridors was handicapped by decentralized spreadsheets and delayed inventory reconciliations. VPD Technologies engineered a high-concurrency operations command center with WebSocket duplex communication and an asynchronous streaming backend.",
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
        title: "High-Throughput Asynchronous Engine",
        description: "Architected a non-blocking microservice suite capable of ingesting high-volume telemetry and barcode scan streams."
      },
      {
        title: "Conflict-Free Optimistic Data Models",
        description: "Implemented transactional version stamping and partitioned PostgreSQL storage to eradicate concurrent edit collisions."
      }
    ],
    timeline: [
      { phase: "Phase 1", duration: "Weeks 1–4", title: "Logistics Process Mapping & Schema Blueprint", description: "Mapped distributed warehouse state machines, manifest schemas, and multi-hub synchronization models." },
      { phase: "Phase 2", duration: "Weeks 5–9", title: "Async Microservices & Redis Broker", description: "Engineered core messaging layers, persistent socket connections, and database partitioning." },
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
      { category: "Backend Engine", technologies: ["Python 3.12", "FastAPI", "AsyncIO Streams"] },
      { category: "Real-Time Messaging", technologies: ["WebSockets (STOMP)", "SockJS", "Redis Pub/Sub"] },
      { category: "Data Storage", technologies: ["PostgreSQL 16", "SQLAlchemy", "Alembic Migration"] },
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
      { step: "03", label: "Async Reactive Core", detail: "High-throughput asynchronous engine resolving concurrent manifest updates." },
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
    solution: "Architected a distributed full-stack core incorporating AES-256 protocol-level encryption, ISO 27001 audit standards, and stateless JWT authorization barriers.",
    result: "Maintained zero security incidents post-launch with 99.99% uptime SLA. The system comfortably handles over 10,000 transactions per second at sub-millisecond database response times.",
    tags: ["Enterprise Core", "ISO 27001", "FinTech", "AES-256"],
    specs: [
      { label: "Security Standard", value: "ISO 27001 Compliance" },
      { label: "Data Encryption", value: "AES-256 / TLS 1.3" },
      { label: "Throughput", value: "10,000+ Tx / Second" },
      { label: "Availability", value: "99.99% Uptime SLA" }
    ],
    overview: "A fast-growing fintech firm handling institutional transaction clearing needed to replace a fragile legacy pipeline before expanding into cross-border settlements. VPD Technologies built a high-throughput core architecture adhering to ISO 27001 security controls with AES-256 protocol-level cryptography and sub-millisecond execution times.",
    challenges: [
      "Severe latency spikes and thread contention during market open spikes, triggering transaction dropouts.",
      "Regulatory demands requiring airtight ISO 27001 data compliance, immutable audit journals, and HSM key lifecycle management.",
      "Vulnerability of stateful sessions to replay attacks and unauthorized lateral service escalation.",
      "Double-spend risks during transient network partitions across distributed bank gateway nodes."
    ],
    solutionPillars: [
      {
        title: "Ultra-Resilient Transaction Engine",
        description: "Constructed a high-concurrency, non-blocking core handling 10,000+ transactions per second at sub-millisecond database latency."
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
      { phase: "Phase 2", duration: "Weeks 7–14", title: "Settlement Engine Core & Kafka Ingestion", description: "Developed reactive microservices, event streaming partitions, and double-entry ledger state machine." },
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
      { category: "Core Backend", technologies: ["Python / FastAPI", "Rust / Go Core", "OAuth2 / RBAC"] },
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
    title: "Distributed Core: Stability in Enterprise Financial Systems",
    excerpt: "Why high-tier financial institutions continue to rely on the rock-solid security and predictable type-safety of modern distributed architectures.",
    author: "VPD Engineering Lab",
    date: "May 2026",
    tags: ["Distributed Core", "Security", "FinTech"],
    image: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778928654/vpd_tech_uploads/aujkuuy5myo1ivxemoes.webp"
  },
  {
    id: "b3",
    title: "Real-Time Sync Protocols in Industrial Web Applications",
    excerpt: "Overcoming the technical hurdles of zero-latency state synchronization across distributed logistics hubs using WebSockets and resilient event queues.",
    author: "VPD Engineering Lab",
    date: "May 2026",
    tags: ["WebSockets", "Cloud", "Real-Time"],
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
    excerpt: "Designing distributed services around durable event queues — idempotent consumers, replay safety, and back-pressure under 10,000 transactions per second.",
    author: "VPD Engineering Lab",
    date: "February 2026",
    tags: ["Cloud", "Real-Time", "Architecture"],
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
  if (article.tags.some((t) => ['Distributed Core', 'Security', 'FinTech'].includes(t))) {
    return [
      'Enforce compile-time type safety and predictable memory models using distributed enterprise services.',
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


