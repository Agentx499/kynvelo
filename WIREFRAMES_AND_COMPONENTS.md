# Kynvelo — Dual-Audience Wireframes & Component Architecture (WIREFRAMES_AND_COMPONENTS.md)

**Product:** Kynvelo (Fitness Business Operating System)  
**Primary Positioning:** Dual-Audience Architecture (**Athletes/Members First** + **Gym Owners/Enterprises**)  
**Theme:** Kinetic Volt (`#C6FF00` / `oklch(0.85 0.20 135)`) & Obsidian Carbon (`#0D0E11` / `oklch(0.12 0.005 260)`)  
**Component Tech Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + **Framer Motion** + **Shadcn UI (Radix Primitives)** + **21st.dev Magic Blocks** + **Lucide React**  

---

## 1. Dual-Audience Website Architecture (Athletes + Gyms)

The public website is **not merely a B2B SaaS pitch for gym owners**. It is an aspirational, high-performance home for **Individual Athletes & Fitness Enthusiasts** (the all-in-one workout tracker, zero-hallucination AI nutrition logger, and habit streak engine) as well as **Gym Owners & Fitness Clubs** (turnstile access control, no-show retention CRM, and automated billing).

### 1.1 Framer Motion Audience Mode-Switcher (`components/blocks/audience-toggle.tsx`)
Positioned prominently in the Navbar and Hero section, an animated toggle powered by **Framer Motion** (`layoutId="audience-pill"`) allows visitors to switch the entire page context instantly:

```
┌──────────────────────────────────────────────────────────────┐
│  MODE:   [  ⚡ FOR ATHLETES & LIFTERS  ]   [  🏢 FOR GYM OWNERS  ]   │
└──────────────────────────────────────────────────────────────┘
```

- **When "For Athletes" is Active:**
  - *Headline:* "Train With Precision. Fuel With Science. Keep Every Streak."
  - *Hero Preview:* Active set/rep matrix with barbell plate math, concentric calorie/macro progress ring, and 2-stage AI meal scanner.
  - *Key Selling Points:* Replaces MyFitnessPal + Hevy + Strong without subscription paywalls; connect with your local gym turnstile or track independently.
  - *CTAs:* `[ Start Free as an Athlete ]` & `[ Download Mobile PWA ]`.
- **When "For Gym Owners" is Active:**
  - *Headline:* "Stop Member Drop-Out. Automate Turnstiles. Collect Every Renewal."
  - *Hero Preview:* Kiosk turnstile check-in stream, No-Show Red-List CRM with 1-tap WhatsApp follow-ups, and daily billing reconciliation.
  - *Key Selling Points:* Recovers lost members before they churn; zero hardware lock-in; automated GST tax invoices.
  - *CTAs:* `[ Start 14-Day Gym Trial ]` & `[ Book Live Hardware Walkthrough ]`.

---

## 2. Component Sourcing & Tool Matrix

| Component Layer | Primary Library / Source | Key Responsibilities |
|---|---|---|
| **Core Primitives** | **Shadcn UI (Radix UI)** | Accessible, unstyled primitives: `Dialog`, `Sheet` (drawers), `Table` (red-list & member roster), `Tabs`, `DropdownMenu`, `Form`, `Slider`, `Accordion`. |
| **Kinetic Animations** | **Framer Motion** | Spring physics transitions, active tab layout morphing (`layoutId`), draggable rest timer sheets, haptic tap reactions, and count-up telemetry numbers. |
| **Bespoke SaaS Blocks** | **21st.dev Magic MCP** | Production-ready React+Tailwind blocks: `Animated Tabs` (ID: 525), `Feature Bento Grid` (ID: 18898), `Pricing Table with Comparison` (ID: 1541), and `Framer Carousel` (ID: 9481). |
| **Vector Icons** | **Lucide React** | Lightweight, tree-shakeable SVG icons: `Dumbbell`, `Flame`, `QrCode`, `Apple`, `ShieldCheck`, `TrendingUp`, `PhoneCall`, `MessageSquare`. |
| **Design Tokens** | **Tailwind CSS v4 & CSS Variables** | Native OKLCH color variables (`--kynvelo-canvas`, `--kynvelo-primary`, `--kynvelo-hairline`). |

---

## 3. Page-by-Page Component Breakdown (Public Website: Pages 78 – 84)

### Page 78: Public Homepage (`/`)
- **Header:** Sticky Glass Navbar (`components/layout/navbar.tsx`) with Logo, Audience Mode-Switcher, Nav Links, Sign In, and Kinetic Trial Button.
- **Section 1: Kinetic Hero Block (`components/blocks/hero-kinetic.tsx`)**
  - Audience Toggle (`components/blocks/audience-toggle.tsx`) with Framer Motion spring indicator.
  - Dynamic Display Headline & Subhead adapting to mode.
  - Dual CTAs: Primary Volt Button (`.btn-primary`) + Secondary Border Button (`.btn-secondary`).
  - Interactive Floating App Mockup Frame (`components/blocks/interactive-app-frame.tsx`) showing live workout set logging (Athlete mode) or turnstile check-in stream (Gym mode).
- **Section 2: Social Proof & Metrics Counter Bar (`components/blocks/stat-ticker.tsx`)**
  - 4 Animated Count-up Numbers: `1,250,000+` Workouts Logged, `98.4%` Turnstile Uptime, `₹2.4 Cr` Recovered Renewal Revenue, `4.9★` App Rating.
- **Section 3: Dual-Audience Bento Grid (`components/blocks/feature-bento.tsx` - 21st.dev ID 18898)**
  - *Athlete Cards:* Barbell Plate Calculator, Two-Stage AI Nutrition Scan (USDA verified), Interactive Muscle Recovery Heatmap.
  - *Gym Owner Cards:* Autonomous Turnstile Hardware Relay, No-Show Red-List CRM with Anti-Collision, Automated GST-Compliant Invoicing.
- **Section 4: The 4-Step Autonomous Retention Loop (`components/blocks/retention-loop.tsx`)**
  - Step 1: 15s Dynamic QR Check-in $\rightarrow$ Step 2: Inactivity Detection (10+ Days) $\rightarrow$ Step 3: 1-Tap WhatsApp Recovery $\rightarrow$ Step 4: Digital UPI Renewal.
- **Section 5: Interactive Lost-Member Churn Calculator (`components/blocks/roi-slider.tsx`)**
  - Dual range sliders (Member count & average monthly fee) outputting real-time annual revenue saved.
- **Section 6: Testimonials Carousel (`components/blocks/framer-carousel.tsx` - 21st.dev ID 9481)**
  - Athlete transformation stories + Gym owner revenue growth case studies with video clips.
- **Section 7: Final High-Impact Conversion CTA & Footer (`components/layout/footer.tsx`)**

### Page 79: Lost-Member ROI & Churn Calculator (`/roi-calculator`)
- **Components:** Full-page interactive calculator, sensitivity matrix table, PDF ROI report export generator, and direct sales scheduling modal.

### Page 80: Pricing & Transparent Plans (`/pricing`)
- **Components:**
  - Interval Toggle: Monthly vs Annual (with "2 Months Free" Kinetic Volt badge).
  - Audience Switcher: B2C Athlete Tiers (Free ₹0, Pro ₹99, Elite ₹299) vs B2B Gym Tiers (Starter ₹2,999, Growth ₹5,999).
  - Dynamic Overage Slider (+50 Members ₹1,499 / +100 Members ₹2,799).
  - Full Feature Comparison Table (`components/blocks/pricing-comparison.tsx` - 21st.dev ID 1541) with sticky header and checkmarks.
  - Transparent Hardware & Setup FAQ Accordion (`components/ui/accordion.tsx`).

### Page 81: Enterprise & White-Label Hardware Specs (`/enterprise`)
- **Components:**
  - 3D-styled interactive smartphone mockups showcasing dedicated Apple App Store & Google Play listings ("Your Gym by Kynvelo").
  - Physical Turnstile Hardware Compatibility Matrix (Tripod, Flap Barrier, Speed Gate, Optical Turnstiles).
  - Local TCP/IP Relay & USB Barcode Wiring Diagram.
  - Enterprise Consultation & Custom Hardware RFP Form (`components/ui/form.tsx`).

### Page 82: Referral Partner Program Portal (`/partners`)
- **Components:**
  - Program Overview Hero (Earn ₹10,000/month per referred gym for 10 months).
  - Live Commission Calculator (e.g. 5 gyms = ₹50,000/month passive revenue).
  - Partner Registration Stepper Wizard.
  - Partner FAQ & Terms of Payouts.

### Page 83: Public Registration Wizard (`/signup`)
- **Components:**
  - Step 1: Identity Card Selector ("I am an Individual Athlete" vs "I am a Gym Owner / Manager").
  - Step 2: Contact & Credentials (Phone OTP verification via `components/ui/input-otp.tsx`).
  - Step 3: Gym Code / Referral Code entry (with real-time verification badge).
  - Step 4: Workspace Name & Instant Launch.

### Page 84: Legal, Compliance & DPDP Hub (`/legal/[slug]`)
- **Components:**
  - Sticky Table of Contents sidebar.
  - Clean typographic prose for Terms of Service, Refund Policy, and India DPDP Act 2023 Compliance.
  - Formal Data Processing Agreement (DPA) download action.

---

## 4. Component Breakdown: Member Mobile App (Screens 1 – 56)

Grouped into cohesive functional component patterns:

### 4.1 Daily Pulse & Access Hub (Screens 1 – 10)
- **Top Header Bar:** Gym White-Label Logo / Kynvelo badge, Notifications bell with unread badge, and 🔥 Streak Counter Pill.
- **Dynamic QR Check-in Card (`components/member/qr-card.tsx`):**
  - High-contrast pure white QR canvas with animated Kinetic Volt rotating border glow.
  - 15-second circular progress countdown timer using Framer Motion SVG stroke offset.
  - Tap-to-expand fullscreen modal with auto-screen brightness boost.
- **Habit & Telemetry Summary Grid:** Two-column card: Active Streak Days vs Daily Steps (synced via HealthKit).
- **Action Pills Bar:** Floating horizontal scroll: `[🏋️ Log Workout]` `[📷 Scan Meal]` `[💧 +250ml Water]`.
- **Membership Status Banner:** Plan name, days remaining pill, and "One-Tap Renew" action.

### 4.2 Workout & Strength Tracker (Screens 23 – 32 & 49 – 50)
- **Active Workout Sticky Header:** Live session timer (HH:MM:SS), finish session button with confirmation dialog.
- **Exercise Set Matrix Card (`components/member/set-matrix.tsx`):**
  - Exercise title with form instruction thumbnail.
  - Set Rows: Set # (Mono), Last Week's Weight/Reps hint, editable Weight (kg) & Reps inputs.
  - Set Completion Checkbox: Triggers haptic vibration, animated green check, and auto-starts the rest timer.
  - Superset / Dropset Tag Pills (`W` Warmup, `D` Dropset, `F` Failure).
- **Floating Haptic Rest Timer Drawer (`components/member/rest-timer-sheet.tsx`):**
  - Draggable bottom sheet with circular countdown progress ring, `+30s` quick-add, and sound/haptic toggle.
- **Barbell Plate Math Modal (Screen 49 - `components/member/plate-calc-modal.tsx`):**
  - Visual barbell sleeve diagram rendering Olympic plates (20kg, 15kg, 10kg, 5kg, 2.5kg, 1.25kg) needed per side.
- **Muscle Recovery Heatmap (Screen 50 - `components/member/muscle-heatmap.tsx`):**
  - Interactive anatomical human body SVG displaying muscle recovery state (Green/Amber/Red) calculated from logged volume.

### 4.3 Nutrition & Calorie Tracking (Screens 33 – 45 & 51 – 52)
- **Concentric Macro Rings Component (`components/member/macro-rings.tsx`):**
  - Four concentric animated SVG rings: Calories (Volt), Protein (Cyan), Carbs (Amber), Fat (Coral).
- **Meal Timeline Accordion (`components/member/meal-accordion.tsx`):**
  - Collapsible meal cards: Breakfast, Lunch, Dinner, Snacks with individual macro totals and `+ Add Item` trigger.
- **Camera Barcode & AI Food Scanner Viewport (`components/member/scanner-viewport.tsx`):**
  - Real-time video reticle with client-side Quagga2/ZXing decoding.
  - Photo mode capture with multi-item recognition and editable portion review table.
- **Meal Prep Batch Builder (Screen 51):**
  - Multi-ingredient batch recipe calculator dividing total nutrition by container count.
- **Fast Calorie Quick-Add Modal (Screen 52):**
  - Minimalist popover for entering raw estimated calories and protein in 5 seconds.

### 4.4 Membership, Renewals & Marketplace (Screens 11 – 22)
- **Renewal Duration Selector (`components/member/renewal-cards.tsx`):**
  - Radio cards for 1, 3, 6, and 12 months with duration discount callouts and net GST pricing.
- **UPI Deep-Link Checkout Sheet:**
  - One-tap trigger launching installed UPI apps (GPay, PhonePe, Paytm).
- **Add-On Marketplace Grid:**
  - Tabbed cards for Personal Training, Dietitian Consults, and Supplement products with live stock badges.

---

## 5. Component Breakdown: Gym Owner & Front-Desk Operations (Screens 57 – 77)

### 5.1 Fullscreen Turnstile Terminal (`app/(admin)/terminal/page.tsx`)
- **Kiosk Split-Layout:**
  - *Left 50%:* Live camera barcode viewport / USB scanner listener with audio feedback synthesizer (Access Granted chime vs Access Denied buzzer).
  - *Right 50%:* Real-time incoming access stream displaying member photo, full name, membership status, and assigned turnstile gate.
- **Assisted Entry Trigger:** Modal requiring staff to select a mandatory reason (`Forgot phone`, `Camera malfunction`) before issuing a manual relay pulse.

### 5.2 No-Show Red-List CRM Matrix (`app/(admin)/red-list/page.tsx`)
- **Filter Toolbar:** Risk buckets (10–14 days absent, 15–21 days, 22+ days) and trainer assignment dropdown.
- **Staff Anti-Collision Banner:** Highlights if another staff member is currently contacting that member.
- **Action Table Row:**
  - Member Avatar & Name.
  - Days Absent Badge (Amber for 10-14d, Red for 22+d).
  - Last Logged Outcome & Date.
  - 1-Tap WhatsApp Trigger: Opens native WhatsApp with personalized recovery message template.
  - 1-Tap Call Trigger: Launches native phone dialer.
  - Follow-up Modal Trigger: Opens outcome selector (`Will return tomorrow`, `Injured`, `Travelling`) and schedules next reminder.

### 5.3 Member Management & Financial Ledger (`app/(admin)/members`, `/admin/billing`)
- **Data Table:** Server-side paginated data grid (1,000+ members) with search-by-phone, active/paused filters, and plan freeze modals.
- **Billing Ledger:** Daily cash vs digital UPI reconciliation table with GST tax breakdown and 1-tap CSV export.

---

## 6. Global System & Security Components (Screens 85 – 89)

- **Permission Denied Boundary (`components/system/forbidden-403.tsx`):** Clean lock illustration explaining required user role with a return button.
- **Offline PWA Banner (`components/system/offline-banner.tsx`):** Ambient top banner indicating cached offline mode with local check-in queue indicator.
- **Biometric Session Interceptor (`components/system/biometric-modal.tsx`):** Device FaceID / Fingerprint re-authentication modal protecting sensitive billing ledgers.
- **Error Boundary (`components/system/error-boundary.tsx`):** Sentry event ID capture with a kinetic retry button.

---

## 7. Master Component Registry & File Mapping

```
frontend/components/
├── ui/                     # Shadcn Primitives (Radix UI)
│   ├── button.tsx          # Kinetic Volt button with hover glow
│   ├── dialog.tsx          # Modals (Plate Calc, Outcome Logger)
│   ├── sheet.tsx           # Drawers (Rest Timer, Cart)
│   ├── table.tsx           # Data tables (Red-List, Members, Billing)
│   ├── tabs.tsx            # Audience & Marketplace Tabs
│   ├── form.tsx            # Form validation wrappers (React Hook Form)
│   └── slider.tsx          # Member Overage & ROI Sliders
│
├── blocks/                 # Bespoke 21st.dev & Framer Motion Blocks
│   ├── audience-toggle.tsx # Framer Motion Athlete vs Gym Owner Toggle
│   ├── hero-kinetic.tsx    # Marketing Hero with Circuit Telemetry
│   ├── feature-bento.tsx   # 21st.dev ID 18898 Bento Feature Grid
│   ├── roi-slider.tsx      # Real-time Lost-Member Churn Calculator
│   ├── pricing-table.tsx   # 21st.dev ID 1541 Animated Pricing Matrix
│   ├── macro-rings.tsx     # Concentric SVG Calorie & Macro Progress Rings
│   ├── plate-calc.tsx      # Olympic Barbell Sleeve Plate Visualizer
│   └── muscle-heatmap.tsx  # Interactive Human Body Recovery Heatmap
│
└── layout/                 # Page Shell Containers
    ├── navbar.tsx          # Sticky Glass Navbar with Audience Pill
    ├── footer.tsx          # Public Footer with Legal Links
    ├── mobile-nav.tsx      # Member App 5-Tab Fixed Bottom Bar
    └── admin-sidebar.tsx   # Collapsible Gym Owner Desktop Navigation
```
