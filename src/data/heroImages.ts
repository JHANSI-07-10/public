export interface TiltedGridImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  tag: string;
}

export const VPD_HERO_GRID_IMAGES: TiltedGridImage[] = [
  {
    id: "lead-engine-funnel",
    src: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778927949/vpd_tech_uploads/hehksmjc37qfuxe6dyvl.webp",
    alt: "Lead-Engine Architecture & Conversion Dashboard",
    title: "Lead-Engine Analytics",
    category: "Web Application",
    tag: "REACT / NEXT.JS"
  },
  {
    id: "operational-hub-dispatch",
    src: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778927890/vpd_tech_uploads/uom9zvwhujynuiwywsxj.webp",
    alt: "Real-Time Operational Hub & WebSocket Stream",
    title: "Real-Time Telemetry Hub",
    category: "Cloud Infrastructure",
    tag: "SPRING BOOT"
  },
  {
    id: "financial-protocol-core",
    src: "https://res.cloudinary.com/deaku7v6t/image/upload/v1778927682/vpd_tech_uploads/mycpmmjtvjhovhdsswxa.webp",
    alt: "Financial Protocol System with Encryption Architecture",
    title: "Financial Protocol Core",
    category: "Enterprise Security",
    tag: "AES-256 / ISO 27001"
  },
  {
    id: "cloud-architecture-review",
    src: "/about1.webp",
    alt: "Engineering Sprint & Architectural Planning",
    title: "System Architecture Review",
    category: "Software Engineering",
    tag: "MICROSERVICES"
  },
  {
    id: "data-mesh-pipeline",
    src: "/about2.webp",
    alt: "Distributed Database & API Pipeline Engineering",
    title: "Distributed State Mesh",
    category: "Database & API",
    tag: "POSTGRES / REDIS"
  },
  {
    id: "enterprise-delivery-ops",
    src: "/about3.webp",
    alt: "CI/CD Automated Deployment & Containerization",
    title: "Production CI/CD Edge",
    category: "Automation & DevOps",
    tag: "KUBERNETES / DOCKER"
  }
];
