<div align="center">

# VPD Technologies Private Limited
### Transforming Ideas into Intelligent Digital Solutions

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Framer_Motion-v12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Brevo](https://img.shields.io/badge/Brevo-Email_API-0092FF?style=for-the-badge&logo=sendinblue&logoColor=white)](https://www.brevo.com/)

[**Explore Website**](https://www.vpdtechnologiespvtltd.com) • [**View Open Roles**](https://www.vpdtechnologiespvtltd.com/careers) • [**Contact Engineering**](https://www.vpdtechnologiespvtltd.com/contact)

</div>

---

## 📌 Overview

**VPD Technologies Private Limited** is an engineering-first technology enterprise based in Kurnool, Andhra Pradesh, India. We architect mission-critical web applications, high-throughput scalable backends, multi-tenant SaaS engines, and bespoke digital solutions designed to rival global standards from regional innovation hubs.

This repository powers the official, production-grade corporate web platform, showcasing our service offerings, architectural blueprints, proprietary platforms, talent opportunities, and dual-channel client communication pipelines.

---

## 🚀 Key Features & Modules

### 1. Cinematic & Interactive Experience
- **Cinematic Video Hero**: Video background with feathered gradient transitions, optimized for modern displays with responsive fallbacks.
- **Brand Intro & Photon Knot**: Custom SVG vector graphics and brand signature animations.
- **Micro-Interactions**: Built using `motion/react` with accessible animations and full support for `prefers-reduced-motion`.
- **Justified Editorial Typography**: Crisp contrast with drop shadows designed for high legibility across dark-themed surfaces.

### 2. Comprehensive Service & Product Ecosystem
- **What We Engineer**: Hover-reveal interactive cards showcasing capabilities in Web Experiences, Business Applications, Cloud/Full-Stack Systems, and AI Integration.
- **Interactive Delivery Wheel**: SVG interactive delivery lifecycle visualizing our end-to-end agile methodology.
- **Service Architecture Visualizer**: Deep architectural breakdowns of technology choices, latency benchmarks, and deliverables.
- **Proprietary Platforms**: Live operational statuses for enterprise solutions (*Production*, *Staging*, *Planned*).

### 3. Careers & Talent Acquisition Portal
- **Live Openings**: Dedicated positions for *Full-Stack Software Engineer (Python & React)*, *Medical Coders*, *Non-IT & IT Roles*, and *BDE Interns*.
- **Role-Aware Application Portal**:
  - **Dynamic Suggested Skills**: Clickable badges to quickly insert role-relevant skills.
  - **Strict Alphabetic Validation**: Live filtering prevents digits or junk characters in skills and names.
  - **Flexible CTC Formatting**: Accepts both raw figures (e.g. `8`) and standard unit notations (e.g. `8.0 LPA`), auto-normalized on blur and submission.
  - **Auto-Reset on Reopen**: Submissions cleanly wipe cached inputs so the modal reopens completely fresh.

### 4. Enterprise Consultation & Contact Pipelines
- **Strict Input Validation**:
  - Exact **10-digit** phone numbers across all touchpoints.
  - Alphabetic constraints on full names and project scope specifications.
  - Support for custom corporate work domains and Gmail addresses.
- **Brevo Email Relay**:
  - Instant branded HTML auto-acknowledgement delivered to the candidate or client.
  - Immediate notification dispatch with applicant details forwarded to admin routing (`info@vpdtechnologiespvtltd.com`).
  - Strict serverless payload limits, honeypot anti-spam traps, and input sanitization.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15.5](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Type Safety) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS Variables |
| **Motion** | [Motion (Framer Motion v12)](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Email Infrastructure** | [Brevo Transactional SMTP / REST API](https://www.brevo.com/) |
| **Testing** | [Vitest 5.0](https://vitest.dev/) |
| **Hosting & Edge** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
vpd-technologies/
├── app/                              # Next.js App Router (Routes & Layouts)
│   ├── layout.tsx                    # Root layout with fonts, metadata, and chrome
│   ├── page.tsx                      # Landing page entry point
│   ├── about/                        # About & Leadership routes
│   ├── services/                     # Engineering services route
│   ├── products/                     # Products & platforms route
│   ├── careers/                      # Careers & job openings route
│   ├── contact/                      # Contact & consultation route
│   └── api/                          # Serverless route handlers (contact, careers)
├── src/
│   ├── components/                   # React components
│   │   ├── ui/                       # Core UI primitives (Button, Card, SectionHeader)
│   │   ├── motion/                   # Reusable motion & animation primitives
│   │   ├── careers/                  # Role cards & CareerApplicationModal
│   │   ├── services/                 # Architecture visualizer, showcase, delivery wheel
│   │   ├── delivery/                 # Delivery wheel CSS & interactive components
│   │   ├── photonKnot/               # Photon knot vector logo components
│   │   └── social/                   # Social link integrations
│   ├── data/                         # Content datasets, open roles, case studies
│   │   ├── content.ts                # Main company copy, services, leadership, and roles
│   │   └── articleBreakdowns.ts      # Deep technical architecture articles
│   ├── lib/                          # Utility functions & email workflows
│   │   └── email/                    # Brevo API client, HTML templates, and validators
│   └── views/                        # Full-page views composed for Next.js pages
├── public/                           # Static assets (images, SVGs, favicon, videos)
├── tests/                            # Vitest unit & integration test suites
│   └── email/                        # Email validation, addressing, and payload tests
├── docs/                             # Architecture & email deployment documentation
├── .env.example                      # Environment variables reference template
├── package.json                      # Project dependencies & npm scripts
└── tsconfig.json                     # TypeScript compilation settings
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node.js 20+ LTS recommended)
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/VPDTechnologies/VPDTechnologies.git

# Navigate into project directory
cd VPDTechnologies

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Fill in the required server-side secrets:
```env
# Base API URL
NEXT_PUBLIC_API_URL="https://vpd-technologies-pvt-ltd-backend.vercel.app/api"

# Brevo Transactional Email Configuration
BREVO_API_KEY="your-brevo-api-key"
BREVO_SENDER_EMAIL="info@vpdtechnologiespvtltd.com"
CONTACT_RECEIVER_EMAIL="info@vpdtechnologiespvtltd.com"

# Site & Asset URLs
SITE_URL="https://www.vpdtechnologiespvtltd.com"
EMAIL_LOGO_URL="https://www.vpdtechnologiespvtltd.com/logo.png"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles production-optimized bundle |
| `npm run start` | Boots production server locally |
| `npm run lint` | Performs strict TypeScript type checks across all files (`tsc --noEmit`) |
| `npm run test` | Executes Vitest test suites for email flows and validation rules |

---

## 🔒 Security & Data Integrity

- **Strict Validation Rules**: Name and role fields strictly reject numeric injection; phone inputs enforce exactly 10 digits; skills require alphabetic inputs.
- **Honeypot Anti-Spam**: Invisible form fields trap automated bots without interrupting human candidates.
- **Payload Limits**: File uploads (resumes) are capped at 4 MB to comply with serverless execution boundaries.
- **CORS & Environment Protection**: Brevo secrets and email routing keys are strictly server-side and never exposed to the client bundle.

---

## 🏢 Corporate Contact

**VPD Technologies Private Limited**  
*CIN: U62013AP2026PTC123456*  
📍 Kurnool, Andhra Pradesh, India  
🌐 [https://www.vpdtechnologiespvtltd.com](https://www.vpdtechnologiespvtltd.com)  
✉️ [info@vpdtechnologiespvtltd.com](mailto:info@vpdtechnologiespvtltd.com)  

---

<div align="center">
  <sub>© 2026 VPD Technologies Private Limited. All rights reserved.</sub>
</div>
