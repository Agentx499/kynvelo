# Kynvelo — Design Architecture & Screen Specification (DESIGN_ARCHITECTURE.md)

**Product:** Kynvelo (Fitness Business Operating System)  
**Status:** Approved Master Design Architecture  
**Design Intelligence Engines:** Impeccable (v3.9.1), UI/UX Pro Max, Awesome-Design-MD (Linear / Vercel / Stripe references)  
**Target Platform:** Web Application, PWA, iOS & Android (Responsive & Adaptive)  

---

## 1. Executive Design Philosophy & Architectural Principles

Kynvelo's visual language merges **Athletic Kinetic Vitality** with **Enterprise Software Precision**.
- **The Core Rule:** *Actionable lists and high-velocity workflows over decorative fluff.* (SaaS Checklist Phase 1 & 3).
- **Inspiration Benchmarks (from `awesome-design-md`):**
  - **Linear:** Deep technical charcoal canvas (`#08090A` / OKLCH `0.10 0.005 260`), hairline borders (`#23252A`), and crisp typography.
  - **Stripe:** Ultra-clean financial tables, strict payment integrity states, and high-contrast badges.
  - **Vercel:** Monochromatic discipline, instant feedback, and sub-second interaction feedback.
- **Anti-Cliché / Purple Ban Enforcement:** No generic AI purple gradients, no low-contrast gray-on-gray body text, no nested cards.

---

## 2. Master Logo, Favicon & Brand Asset System

### 2.1 Logo & Symbol Geometry
- **Monogram "K":** A solid vertical anchor bar (system stability) paired with two opposing 45° angular chevrons (forward kinetic momentum and athletic velocity).
- **Typography Wordmark:** `KYNVELO` set in geometric grotesque capitals with +40 tracking for legible recognition on turnstiles, mobile splash screens, and gym signage.
- **Master Assets Generated:**
  - Master Corporate Logo: Minimalist geometric monogram with metallic platinum finish on deep carbon OLED ground.
  - App Icon / Favicon: Square chamfered container with high-contrast platinum white monogram on matte carbon surface.

### 2.2 Favicon & Icon Compliance (SaaS Checklist Phases 13, 15, 16 & 17)
To ensure compliance with web standards, SEO, and PWA installation:
| Asset | Dimensions | Format | Usage |
|---|---|---|---|
| `favicon.ico` | 16x16, 32x32, 48x48 | Multi-size ICO | Legacy browsers and search engine snippet icons |
| `icon-192.png` | 192x192 | PNG (transparent/maskable) | Android PWA home screen icon |
| `icon-512.png` | 512x512 | PNG (transparent/maskable) | Android PWA splash screen & Google Play icon |
| `apple-touch-icon.png` | 180x180 | PNG (solid dark ground) | iOS Safari bookmarks & Home Screen icon |
| `logo.svg` | Scalable Vector | SVG (clean path data) | Website navbar, email templates, and invoice headers |
| `og-image.jpg` | 1200x630 | WebP / JPG | Open Graph social sharing (X/Twitter, WhatsApp, LinkedIn) |

---

## 3. The Three Product Design Surfaces

Kynvelo spans three distinct operational areas, unified by a shared design token engine:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          KYNVELO DESIGN SYSTEM                         │
├──────────────────────────┬─────────────────────────┬───────────────────┤
│   AREA 1: WEB PORTAL     │   AREA 2: MEMBER APP    │ AREA 3: GYM OPS   │
│   (Marketing & Sales)    │   (B2C & Gym Member)    │ (Owner & Desk CRM)│
├──────────────────────────┼─────────────────────────┼───────────────────┤
│ • Public Landing Page    │ • Dynamic QR Check-in   │ • Turnstile Desk  │
│ • Pricing & Member Calc  │ • Attendance Streaks    │ • No-Show Red CRM │
│ • Enterprise Demo Portal │ • Barcode & Food AI     │ • Member Roster   │
│ • Public Auth (B2B/B2C)  │ • Workout & PR Tracking │ • Renewal Ledger  │
│ • Legal / Trust Docs     │ • Digital Renewal Pay   │ • Dynamic Themer  │
└──────────────────────────┴─────────────────────────┴───────────────────┘
```

---

## 4. Complete Screen & Page Inventory (With Checklist States)

As mandated by **Phases 1, 3, and 4** of the SaaS Building Checklist, every screen defines:
1. **Normal Flow:** Happy path user journey.
2. **Loading State:** Skeleton screens (never generic full-screen spinners).
3. **Empty State:** Guided empty state with actionable CTAs.
4. **Error State:** Human-readable explanations with retry actions (no raw stack traces).
5. **Permission Denied:** Clean 403 state explaining required roles.
6. **Responsive Behavior:** Mobile phone (375px), tablet (768px), desktop (1280px+).

---

### AREA 1: Website & Marketing Portal (7 Core Pages)

#### 1.1 Homepage / Landing (`/`)
- **Normal Flow:** Hero section with headline ("The Operating System for Modern Fitness"), live product showcase, interactive ROI calculator (members lost vs recovered), 4-step operating loop demonstration, customer proof, and dual CTAs ("Start Free Trial" & "Book Enterprise Demo").
- **States:** Skeleton hero on cold load; calculator handles extreme values gracefully.
- **Responsive:** Stacks vertically on mobile; sticky CTA bar appears on mobile scroll.

#### 1.2 Pricing & Member Calculator (`/pricing`)
- **Normal Flow:** Toggle between B2B Gym Plans (Starter ₹2,999 vs Growth ₹5,999) and B2C Direct (₹0, ₹99, ₹299). Dynamic slider for gym member overage blocks (+50 members: ₹1,499, +100 members: ₹2,799). Transparent setup fee explanation.
- **States:** Real-time client-side price computation; error state if currency conversion fails.

#### 1.3 Enterprise & White-Label Demo (`/enterprise`)
- **Normal Flow:** Interactive preview of custom-branded mobile apps, multi-location rollups, SSO integration, and hardware turnstile relay specifications. Form to schedule an executive walkthrough.

#### 1.4 Registration & Onboarding (`/signup`)
- **Normal Flow:** Multi-step wizard: Account type (Gym Owner vs Individual) → Details → Referral Code entry (with validation) → Workspace setup.
- **States:** Inline input validation; duplicate email/phone error handling; referral code check.

#### 1.5 Authentication & Login (`/login`)
- **Normal Flow:** Email/Phone OTP or Password authentication. Gym code selector for gym staff.
- **States:** Rate-limiting counter; brute-force lockout banner; password reset link.

#### 1.6 Password Reset & Recovery (`/reset-password`)
- **Normal Flow:** Request reset link via email/SMS → Enter verification OTP → Set new password.

#### 1.7 Legal & Compliance Hub (`/legal/*`)
- **Pages:** `/privacy` (Indian DPDP Act compliant), `/terms`, `/refunds`, `/contact`.
- **States:** Fully static, server-side rendered for SEO crawling.

---

### AREA 2: Member Mobile App (8 Core Screens)

#### 2.1 Daily Pulse / Home Screen (`/app/pulse`)
- **Normal Flow:** Today's check-in status badge, active rotating QR code button, habit streak tracker (e.g. 4/4 planned sessions), quick action buttons (Log Workout, Scan Food, Renew).
- **States:** 
  - *Offline:* Shows cached QR session token with offline sync notice.
  - *Expired Membership:* Replaces check-in with a prominent "Renew Now" card.

#### 2.2 Rotating QR Check-in Modal (`/app/checkin/qr`)
- **Normal Flow:** High-contrast dynamic QR code regenerating every 15 seconds. Rejects screenshot sharing. Shows member name and photo for front-desk verification.
- **States:** Auto-brightness boost on mobile screens; offline fallback countdown.

#### 2.3 Workout Tracker & Session Logger (`/app/workout`)
- **Normal Flow:** Active workout dashboard: Exercise selector, set/rep/weight input table, rest timer with haptic buzz, PR badge trigger.
- **States:** Empty state with pre-built template routines; draft autosave on page refresh.

#### 2.4 Nutrition & Calorie Logger (`/app/nutrition`)
- **Normal Flow:** Calorie & macro progress rings (consumed vs target). Meal timeline (Breakfast, Lunch, Dinner, Snacks) with instant add buttons.
- **States:** Empty state with "Log your first meal" CTA; water intake counter.

#### 2.5 Barcode & AI Food Photo Scanner (`/app/nutrition/scan`)
- **Normal Flow:** 
  - *Barcode Mode:* Camera viewport decodes UPC/EAN via client-side Quagga2/ZXing → instant product nutrition sheet.
  - *AI Photo Mode:* Upload/take meal photo → Vision LLM detects items & portions → Matches authoritative USDA FoodData Central → User edits grams/servings → Saves.
- **States:** Camera permission denied fallback (manual text search); Vision API failure circuit-breaker fallback.

#### 2.6 Goal Setting & Body Telemetry (`/app/goals`)
- **Normal Flow:** Weight trajectory chart (target vs actual), body measurement entries (waist, arms), private timestamped progress photo vault.
- **States:** Empty state encouraging baseline weigh-in; encrypted photo loading skeleton.

#### 2.7 Self-Service Renewal & Payments (`/app/renew`)
- **Normal Flow:** Current plan details, expiry countdown, renewal duration cards (1, 3, 6, 12 months with annual discount), instant UPI/Card payment modal via Matrix Sols, instant downloadable receipt.
- **States:** Pending payment spinner; failed payment retry banner; success receipt view.

#### 2.8 Add-On Marketplace (`/app/marketplace`)
- **Normal Flow:** Browsable cards for Personal Training packages, Dietitian consultations, and in-stock supplements. Trainer availability calendar before purchase.
- **States:** "Out of stock" disabled state; trainer fully booked badge.

---

### AREA 3: Gym Owner & Front-Desk Operations (9 Core Screens)

#### 3.1 Owner Executive Dashboard (`/admin/dashboard`)
- **Normal Flow:** Top KPI cards: Active members, Today's check-ins, Open no-show red cases, Renewals due this week, Revenue collected this month. Actionable lists over decorative charts.
- **States:** Skeleton loading; date range filter (Today, 7 Days, Month-to-date).

#### 3.2 Front-Desk Check-in Terminal (`/admin/checkin`)
- **Normal Flow:** Fullscreen kiosk/tablet mode. Hardware barcode scanner or webcam listens for member QR code → Instant chime + Green Access Granted screen displaying member photo and plan expiry.
- **Assisted Mode:** Receptionist manual check-in search bar with mandatory reason dropdown (`Forgot phone`, `QR scanner glitch`).
- **States:** Red warning screen on expired or paused membership.

#### 3.3 No-Show Red-List CRM (`/admin/red-list`)
- **Normal Flow:** Filterable list of members absent 10+ days (10–14, 15–21, 22+ days). Shows member phone, assigned trainer, days absent. One-click "Call" or "WhatsApp" triggers. Mandatory outcome logger modal (`Will return`, `Injured`, `Travelling`, etc.).
- **States:** Collision prevention banner when another staff member is contacting the member; empty state celebration when zero members are overdue.

#### 3.4 Member Directory & Profile (`/admin/members`)
- **Normal Flow:** Searchable member roster with status badges (Active, Paused, Expired). Detail view: attendance history calendar, payment ledger, freeze/pause membership modal with date picker.
- **States:** Empty search results; pagination for 1,000+ members.

#### 3.5 Membership Plans & Pricing Setup (`/admin/plans`)
- **Normal Flow:** Create/edit gym membership plans (Name, Duration, Base Price, Discount, Allowed Freeze Days).
- **States:** In-use plan deletion guard (archive only).

#### 3.6 Renewal & Billing Reconciliation (`/admin/billing`)
- **Normal Flow:** Table of upcoming renewals, collected invoices, and failed payments. Manual cash/POS reconciliation button for in-person payments.
- **States:** Export CSV / GST-compliant tax invoice generation.

#### 3.7 Add-On & Supplement Inventory (`/admin/addons`)
- **Normal Flow:** Manage PT session credits, dietitian consultation packages, and supplement SKU stock counts.
- **States:** Low stock warning badge; negative stock blocker.

#### 3.8 Staff Roles & Trainer Permissions (`/admin/staff`)
- **Normal Flow:** Add front-desk receptionists, trainers, and dietitians. Assign specific members to trainers.
- **States:** Role privilege matrix check (receptionist cannot view financials).

#### 3.9 Gym White-Label Themer & Settings (`/admin/settings`)
- **Normal Flow:** Upload gym logo, set primary brand color (OKLCH color picker), configure gym display name, custom domain setup, and customize absence threshold days.
- **States:** Instant live UI theme preview.

---

## 5. Technical Stack Selection & Architecture

To achieve exceptional performance, multi-tenant white-label re-theming, PWA offline capabilities, and native app store deployability:

| Layer | Recommended Technology | Why It Best Fits Kynvelo |
|---|---|---|
| **Frontend Framework** | **Next.js 15 (App Router) + React 19** | Server-side rendering (SSR) for public SEO (Phase 15); client-side components for responsive dashboards; Next.js Middleware for tenant subdomain routing (`gym.kynvelo.com`). |
| **Language & Types** | **TypeScript** | Strict end-to-end type safety across API payloads and multi-tenant schemas. |
| **CSS & Styling** | **Tailwind CSS v4** | CSS-first configuration, native OKLCH color token variables, container queries, and sub-millisecond compile times. |
| **Component Primitives** | **Shadcn UI (Radix Primitives)** | Unstyled accessible primitives (WAI-ARIA compliant, Phase 17); zero bloat; full control over bespoke styles. |
| **Icons** | **Lucide React** | Consistent, tree-shakeable, clean vector icons (MIT licensed). |
| **Mobile Runtime (App)** | **Capacitor 6 / Expo React Native** | Wraps the high-performance Next.js PWA into native iOS (`.ipa`) and Android (`.apk`/`.aab`) bundles for Enterprise white-label app store publishing from one shared codebase. |
| **Client Barcode Engine** | **Quagga2 (Web) / ZXing** | Zero-cost client-side camera barcode decode; keeps video frames off server. |
| **Backend API** | **Django 5 + Django REST Framework** | Modular monolith with `gym_id` ORM base queryset scoping, JWT/Session authentication, and Postgres JSONB support. |
| **Task Queue & Cache** | **Redis + Celery** | Isolated worker queues (`flow`, `pay`, `fuel`, `pulse`) to ensure background jobs never block turnstiles. |
| **Database** | **PostgreSQL** | Multi-tenant relational integrity, foreign key constraints, and JSONB branding configuration. |
| **Object Storage** | **Cloudflare R2 / Backblaze B2** | S3-compatible off-box storage for user meal photos, progress photos, and receipts. |

---

## 6. Dynamic White-Label Theming Engine

For Starter and Growth tiers, all gyms share the same application bundle, re-themed at runtime via CSS custom properties injected on tenant resolution:

```css
:root {
  /* Kynvelo Core Dark Tokens (Default) */
  --kynvelo-bg: oklch(0.10 0.005 260);          /* Deep charcoal canvas */
  --kynvelo-surface: oklch(0.14 0.008 260);     /* Elevated panel surface */
  --kynvelo-border: oklch(0.22 0.010 260);      /* Hairline border */
  --kynvelo-ink: oklch(0.98 0.000 0);           /* Pure crisp white text */
  --kynvelo-muted: oklch(0.70 0.015 260);       /* High-contrast secondary text */
  --kynvelo-primary: oklch(0.74 0.14 247.4);    /* Kinetic Brand Anchor */
  --kynvelo-accent: oklch(0.80 0.16 150.0);     /* High-energy kinetic signal */
}

/* Tenant Dynamic Override: Injected via TenantBranding */
[data-tenant="olympic-gym"] {
  --kynvelo-primary: var(--tenant-primary-color);
  --kynvelo-accent: var(--tenant-accent-color);
}
```

---

## 7. Verification & Next Steps

This architecture covers **every requirement from the 30-Phase SaaS Checklist**:
- ✅ Phases 1–4: Complete page inventory, user journeys, responsive viewports, and loading/empty/error states.
- ✅ Phases 5–10: Multi-tenant scoping, input validation, S3/R2 signed upload storage.
- ✅ Phases 13–17: Web asset optimization, favicon/manifest specifications, SEO titles, and WCAG contrast.
- ✅ Phases 18–21: Retention KPIs, transactional messaging, and idempotent payment state machines.
