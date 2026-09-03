# Kynvelo — Master Screen Inventory & Specification (SCREENS.md)

**Product:** Kynvelo (Fitness Business Operating System)  
**Total Mapped Screens & Pages:** 97 Distinct Frames  
**Surfaces Covered:**
1. Member Mobile App & PWA (B2C Direct & Gym Members) — 56 Screens
2. Gym Owner & Staff Mobile Operations — 22 Screens
3. Gym Owner & Staff Web Command Center (Desktop / Tablet) — 7 Screens
4. Public Marketing & Sales Website — 7 Pages
5. Global System, Security & Error States — 5 Screens

---

## Part 1: Member Mobile App & PWA (Screens 1 – 56)

Shared by both **Direct B2C Fitness Enthusiasts** (`gym_id = "kynvelo-direct"`) and **B2B Gym Members**, dynamically re-skinned with the gym's branding upon login.

### 1. Auth, Onboarding & Mode Selection
- **Screen 1: Splash & Identity**
  - *Route:* `/app/splash`
  - *Purpose:* App launch brand moment. Displays the Kynvelo monogram (or the gym's white-label logo). Pre-warms JWT and local SQLite/IndexedDB cache.
  - *States:* Auto-transitions in 800ms; offline indicator banner if network is unreachable.
- **Screen 2: Login & Phone Number Entry**
  - *Route:* `/app/login`
  - *Purpose:* Primary authentication. Phone number input with country code picker (`+91`), single "Send OTP" kinetic button.
  - *States:* Validation on digit length; rate-limiting counter (60s countdown); fallback to email/password.
- **Screen 3: OTP Verification**
  - *Route:* `/app/login/verify`
  - *Purpose:* 6-box auto-focus OTP input with SMS auto-read capability. Resend OTP button.
  - *States:* Error shake animation on invalid OTP; 3-attempt lockout alert.
- **Screen 4: Welcome & Persona Onboarding Carousel**
  - *Route:* `/app/onboarding`
  - *Purpose:* 3-slide visual carousel introducing: 1) Dynamic QR check-in & streaks, 2) Barcode & AI photo food quantification, 3) Hassle-free one-tap renewals.
- **Screen 5: Workspace & Gym Mode Selector** *(Added per Master Spec)*
  - *Route:* `/app/mode-select`
  - *Purpose:* Allows user to select "Connect to My Gym" (enters 6-digit Gym Code or scans QR) OR "I Workout Independently" (Kynvelo Direct B2C).

### 2. Home, Attendance & Retention Streak
- **Screen 6: Home Dashboard (Daily Pulse)**
  - *Route:* `/app/pulse`
  - *Purpose:* Daily companion hub. Displays active streak badge (e.g. 🔥 5-day streak), today's check-in status (Checked-in / Pending), plan expiry countdown card, and quick-action buttons (Check-in, Log Meal, Log Workout).
  - *States:* Skeleton card loaders; expired membership banner replacing check-in button with "Renew Membership".
- **Screen 7: Dynamic QR Check-in Modal**
  - *Route:* `/app/checkin/qr`
  - *Purpose:* High-contrast rotating dynamic QR code (regenerates every 15s via HMAC token) to prevent screenshot sharing. Includes member photo and auto-screen brightness boost.
  - *States:* Offline cached token mode with countdown; expired warning if membership is paused or lapsed.
- **Screen 8: Check-in Success & Streak Celebration**
  - *Route:* `/app/checkin/success`
  - *Purpose:* Instant haptic confirmation screen with animated checkmark, recorded timestamp, turnstile gate number, and incremented attendance streak count.
- **Screen 9: Attendance History & Calendar View**
  - *Route:* `/app/attendance`
  - *Purpose:* Monthly interactive calendar with green attendance dots and weekly volume summary. Filterable by month and year.
  - *States:* Empty state with motivational quote if no visits recorded yet.
- **Screen 10: Streak & Habit Telemetry Detail**
  - *Route:* `/app/attendance/streak`
  - *Purpose:* Deep breakdown: current streak, all-time best streak, weekly target adherence (e.g. 4/4 days completed), and habit consistency tier.

### 3. Membership, Renewals & Digital Payments
- **Screen 11: Membership Plan Details**
  - *Route:* `/app/membership`
  - *Purpose:* Displays current plan name, start date, exact expiry timestamp, remaining days pill, freeze/pause history, and assigned gym details.
- **Screen 12: Renewal Plan Selection**
  - *Route:* `/app/membership/renew`
  - *Purpose:* 1, 3, 6, and 12-month renewal cards displaying base price, duration discount badge, and final net payable amount. No auto-recurring subscription traps.
- **Screen 13: Payment Checkout Screen**
  - *Route:* `/app/membership/checkout`
  - *Purpose:* Order summary, GST tax breakup, payment method selector (UPI Apps: GPay/PhonePe/Paytm, Credit/Debit Card, Netbanking).
- **Screen 14: Payment Pending & Verification Modal**
  - *Route:* `/app/membership/payment-pending`
  - *Purpose:* Awaiting server webhook confirmation. Polls `/api/payments/{id}/status/` every 2s with clear polling spinner and instructions: "Do not close this screen".
- **Screen 15: Payment Success & Instant Receipt**
  - *Route:* `/app/membership/payment-success`
  - *Purpose:* Green confirmation, transaction ID, new membership expiry date, and "Download Official Invoice" button.
- **Screen 16: Payment Failed & Recovery**
  - *Route:* `/app/membership/payment-failed`
  - *Purpose:* Clear failure explanation (e.g. Bank declined, UPI timeout) with one-tap "Retry Payment" and "Try Different Payment Method" options.
- **Screen 17: Tax Invoice & Receipts Archive**
  - *Route:* `/app/membership/invoices`
  - *Purpose:* List of all past renewal receipts with date, plan, amount, GST breakdown, and PDF download actions.

### 4. Add-On Services & Marketplace
- **Screen 18: Add-ons Marketplace**
  - *Route:* `/app/marketplace`
  - *Purpose:* Categorized horizontal tabs: Personal Training, Dietitian Consultation, and Gym Supplements. Cards show upfront pricing without pre-selected toggles.
- **Screen 19: Add-on Product/Service Detail**
  - *Route:* `/app/marketplace/{id}`
  - *Purpose:* In-depth view: Trainer/Dietitian credentials, package session count, supplement stock count, ingredients, and validity window.
- **Screen 20: Add-on Order Checkout**
  - *Route:* `/app/marketplace/checkout`
  - *Purpose:* Order review and payment for selected add-on packages.
- **Screen 21: My Active Add-on Packages**
  - *Route:* `/app/marketplace/my-orders`
  - *Purpose:* Tracks remaining session credits (e.g. 7/12 PT sessions remaining), assigned trainer name, and expiry date.
- **Screen 22: Ask-a-Trainer / Front-Desk Contact Form**
  - *Route:* `/app/contact-staff`
  - *Purpose:* Direct in-app messaging to gym front desk or personal trainer with inquiry category dropdown (`Schedule`, `Nutrition question`, `Equipment issue`).

### 5. Workout & Fitness Telemetry
- **Screen 23: Workout Hub**
  - *Route:* `/app/workout`
  - *Purpose:* Today's planned workout card, "Quick Start Empty Workout" button, recent PR highlight reel, and weekly volume bar chart.
- **Screen 24: Exercise Library & Filter**
  - *Route:* `/app/workout/exercises`
  - *Purpose:* Searchable list of 400+ exercises with muscle group filter pills (Chest, Back, Legs, Core) and equipment filter (Barbell, Dumbbell, Machine, Cable, Bodyweight).
- **Screen 25: Exercise Detail & Execution Guide**
  - *Route:* `/app/workout/exercises/{id}`
  - *Purpose:* Target primary and secondary muscles, step-by-step cues, common mistakes, and user's past performance log on this exercise.
- **Screen 26: Workout Routines & Templates**
  - *Route:* `/app/workout/routines`
  - *Purpose:* List of pre-built workout splits (Push/Pull/Legs, Upper/Lower, Full Body) and user-saved custom routines.
- **Screen 27: Workout Routine Builder**
  - *Route:* `/app/workout/routines/new`
  - *Purpose:* Create custom workout: Add exercises, configure target sets, reps, and default rest interval.
- **Screen 28: Active Workout Session Tracker**
  - *Route:* `/app/workout/active`
  - *Purpose:* Live session view: Set-by-set input (Weight in kg, Reps completed, RPE), set completion checkbox, interactive rest timer with haptic buzzer.
- **Screen 29: Post-Workout Summary & PR Alerts**
  - *Route:* `/app/workout/summary`
  - *Purpose:* Total tonnage moved, session duration, completed sets, and celebratory gold badge for new Personal Records achieved.
- **Screen 30: Workout History Archive**
  - *Route:* `/app/workout/history`
  - *Purpose:* Chronological list of logged workouts with date, exercises performed, and volume.
- **Screen 31: Personal Records (PR) Vault**
  - *Route:* `/app/workout/records`
  - *Purpose:* Best 1RM and heaviest lift per exercise with date achieved.
- **Screen 32: Strength & Volume Analytics Charts**
  - *Route:* `/app/workout/analytics`
  - *Purpose:* Interactive trend graphs showing monthly tonnage progression, muscle volume distribution, and strength growth curves.

### 6. Nutrition & Calorie Tracking (Two-Stage Architecture)
- **Screen 33: Nutrition Dashboard**
  - *Route:* `/app/nutrition`
  - *Purpose:* Daily calorie progress ring (Consumed vs Budget) and macro bar breakdown (Protein, Carbs, Fats vs Targets).
- **Screen 34: Daily Meal Log**
  - *Route:* `/app/nutrition/log`
  - *Purpose:* Grouped meal sections: Breakfast, Lunch, Dinner, Snacks. Shows logged items, individual macro totals, and "+ Add Food" buttons.
- **Screen 35: Food Search & Recent Items**
  - *Route:* `/app/nutrition/search`
  - *Purpose:* Instant search query over USDA FoodData Central and regional food database. Tabs for Recent, Favorites, and Custom Foods.
- **Screen 36: Barcode Scanner Viewport**
  - *Route:* `/app/nutrition/barcode`
  - *Purpose:* Fullscreen camera viewport with scanning reticle using client-side `Quagga2`/`ZXing` to decode UPC/EAN barcodes in real-time.
- **Screen 37: AI Food Photo Capture**
  - *Route:* `/app/nutrition/photo-scan`
  - *Purpose:* Camera capture interface with framing tips ("Position meal clearly under good lighting"). Allows image upload from camera roll.
- **Screen 38: AI Food Photo Detection & Portions Review**
  - *Route:* `/app/nutrition/photo-result`
  - *Purpose:* Displays Vision LLM recognized items. **Mandatory user portion review:** User edits gram weights/servings before confirming. Official USDA values applied.
- **Screen 39: Food Item Detail & Serving Adjuster**
  - *Route:* `/app/nutrition/item/{id}`
  - *Purpose:* Full nutritional label (Calories, Protein, Total Carbs, Dietary Fiber, Sugars, Fats, Micronutrients). Dynamic serving size slider.
- **Screen 40: Custom Food & Recipe Creator**
  - *Route:* `/app/nutrition/custom`
  - *Purpose:* Create private custom meals: Title, serving size, calories, protein, carbs, and fat.
- **Screen 41: Water Intake Counter**
  - *Route:* `/app/nutrition/water`
  - *Purpose:* Quick tap-to-add 250ml glasses or custom ml counter with daily hydration progress bar.
- **Screen 42: Calorie & Macro Goals Setup**
  - *Route:* `/app/nutrition/goals`
  - *Purpose:* Configure daily calorie deficit/surplus and macro split ratio (e.g. 40% Protein / 30% Carbs / 30% Fat).
- **Screen 43: Body Weight & Measurements Log**
  - *Route:* `/app/body/measurements`
  - *Purpose:* Log scale weight, waist, chest, arms, and body fat percentage with date selector.
- **Screen 44: Private Timestamped Progress Photo Vault**
  - *Route:* `/app/body/photos`
  - *Purpose:* Encrypted front, side, and back comparison photo gallery. Side-by-side date comparison slider.
- **Screen 45: Nutrition & Weight Trend Analytics**
  - *Route:* `/app/nutrition/trends`
  - *Purpose:* Weekly/monthly caloric balance vs scale weight trend lines.

### 7. Profile, Privacy & Settings
- **Screen 46: Notifications Inbox**
  - *Route:* `/app/notifications`
  - *Purpose:* Important system alerts: Check-in confirmations, renewal countdowns, workout reminders, and trainer messages.
- **Screen 47: Consent & Notification Preferences**
  - *Route:* `/app/settings/notifications`
  - *Purpose:* Granular toggles: Transactional alerts (always active) vs Marketing announcements (optional, per DPDP Act).
- **Screen 48: Profile & Account Settings**
  - *Route:* `/app/settings/profile`
  - *Purpose:* Edit name, profile picture, emergency contact, connected gym info, dark mode toggle, and "Export My Data / Delete Account" actions.

### 8. Advanced Fitness, Workout & Health Telemetry Suite
- **Screen 49: Barbell Plate Loading Calculator Modal**
  - *Route:* `/app/workout/plate-calc`
  - *Purpose:* Interactive visual barbell rack showing exact Olympic plate arrangement per sleeve for target weight.
- **Screen 50: Interactive Muscle Recovery Heatmap**
  - *Route:* `/app/workout/muscle-recovery`
  - *Purpose:* Color-coded anatomical model (Green/Amber/Red) indicating muscle recovery readiness based on logged volume in the past 72 hours.
- **Screen 51: Recipe & Meal Prep Batch Builder**
  - *Route:* `/app/nutrition/recipes/new`
  - *Purpose:* Combine multiple raw ingredients, set total container servings, and calculate per-serving verified USDA macros.
- **Screen 52: Fast Calorie & Protein Quick-Add Modal**
  - *Route:* `/app/nutrition/quick-add`
  - *Purpose:* 5-second rapid logging of estimated calories and protein for restaurant and homemade meals.
- **Screen 53: Daily Step Tracking & Active Cardio Session Logger**
  - *Route:* `/app/cardio`
  - *Purpose:* Live tracking for outdoor walks, treadmill runs, rowing, and cycling with pace, distance, and calorie telemetry.
- **Screen 54: Daily Morning Readiness & Energy Survey**
  - *Route:* `/app/pulse/readiness`
  - *Purpose:* 3-tap morning check-in (Sleep, Soreness, Energy) outputting a 0-100% daily workout volume readiness score.
- **Screen 55: Side-by-Side Transformation Photo Comparison**
  - *Route:* `/app/body/photos/compare`
  - *Purpose:* Interactive draggable split-screen slider comparing Day 1 vs current progress photos with optional gym watermark export.
- **Screen 56: Apple Health & Google Health Connect Synchronization**
  - *Route:* `/app/settings/health-sync`
  - *Purpose:* Background step and active calorie synchronization with Apple Health and Android Health Connect.

---

## Part 2: Gym Owner & Staff Mobile Operations (Screens 49 – 70)

Designed for fast, one-handed mobile operations on the gym floor or at reception.

- **Screen 49: Owner & Staff Login**
  - *Route:* `/ops/login`
  - *Purpose:* Secure staff authentication with gym code prefix, role detection (Owner, Manager, Front-Desk, Trainer, Dietitian).
- **Screen 50: Owner Executive Dashboard**
  - *Route:* `/ops/dashboard`
  - *Purpose:* Top operational cards: Active members, today's check-ins, open red cases, renewals due in 7 days, and add-on revenue collected.
- **Screen 51: No-Show Red-List Mobile CRM**
  - *Route:* `/ops/red-list`
  - *Purpose:* High-velocity retention list: Member name, phone, absent days (e.g. 14 days), last logged outcome. One-tap "Call", "WhatsApp", and "Log Outcome" buttons.
- **Screen 52: Red-List Tier Filters & Sorting**
  - *Route:* `/ops/red-list/filters`
  - *Purpose:* Quick filtering by absent buckets: 10–14 days (Early drop-off), 15–21 days (Medium risk), 22+ days (High risk), and Expiring this week.
- **Screen 53: Member Deep Profile (Staff View)**
  - *Route:* `/ops/members/{id}`
  - *Purpose:* Full member dossier: Current plan, emergency contact, attendance frequency, payment history, and assigned personal trainer.
- **Screen 54: Follow-up Outcome Logger Modal**
  - *Route:* `/ops/red-list/{id}/outcome`
  - *Purpose:* Mandatory outcome selector (`Will return tomorrow`, `Travelling`, `Injured`, `Fee dispute`, `Unreachable`) + Next follow-up date picker.
- **Screen 55: Renewal Pipeline Tracker**
  - *Route:* `/ops/renewals`
  - *Purpose:* Chronological pipeline of upcoming plan expirations with status pills (`Due today`, `Due in 3 days`, `Expired`).
- **Screen 56: Member Roster Directory**
  - *Route:* `/ops/members`
  - *Purpose:* Searchable list of all members with search-by-phone, active/paused status filter, and quick freeze toggle.
- **Screen 57: Add New Member Form**
  - *Route:* `/ops/members/new`
  - *Purpose:* Fast in-person registration: Name, phone, plan selection, payment method (Cash/UPI), and start date.
- **Screen 58: Membership Plans Config**
  - *Route:* `/ops/plans`
  - *Purpose:* View and edit active membership plans, duration, pricing, and allowed freeze days.
- **Screen 59: Add-On Services & Supplement Stock**
  - *Route:* `/ops/addons`
  - *Purpose:* Supplement SKU inventory counts, PT package pricing, and stock low alerts.
- **Screen 60: Staff Roster & Permission Matrix**
  - *Route:* `/ops/staff`
  - *Purpose:* Manage front-desk staff, trainers, and dietitians. Toggle financial view permissions.
- **Screen 61: Reports & Retention Metrics**
  - *Route:* `/ops/reports`
  - *Purpose:* 30-day retention curve, churn percentage, member acquisition cost, and revenue per square foot.
- **Screen 62: Daily Owner Summary**
  - *Route:* `/ops/summary`
  - *Purpose:* Auto-generated end-of-day recap: Total footfalls, new signups, collected revenue, and red-cases contacted.
- **Screen 63: Assisted Manual Check-in**
  - *Route:* `/ops/assisted-checkin`
  - *Purpose:* Receptionist search for member by phone/name with mandatory reason dropdown (`Forgot phone`, `Camera malfunction`).
- **Screen 64: Member Lookup & Verification**
  - *Route:* `/ops/lookup`
  - *Purpose:* Instant QR scan or phone lookup to verify active status and photo match at turnstiles.
- **Screen 65: In-Person Payment Confirmation**
  - *Route:* `/ops/payments/confirm`
  - *Purpose:* Record manual cash or POS card payments, issuing an instant digital receipt.
- **Screen 66: Trainer Dedicated Client Roster** *(Added per Master Spec)*
  - *Route:* `/ops/trainer/clients`
  - *Purpose:* Personal trainer view: Assigned clients, remaining PT sessions, and one-tap session completion logger.
- **Screen 67: Dietitian Client Consult Tracker** *(Added per Master Spec)*
  - *Route:* `/ops/dietitian/clients`
  - *Purpose:* Clinical view for assigned nutrition clients, diet plan uploads, and consult notes.
- **Screen 68: Turnstile Hardware Gateway Status** *(Added per Master Spec)*
  - *Route:* `/ops/hardware/turnstiles`
  - *Purpose:* Hardware relay status (Online/Offline), manual gate pulse trigger for emergencies.
- **Screen 69: White-Label Gym Customizer** *(Added per Master Spec)*
  - *Route:* `/ops/settings/branding`
  - *Purpose:* Upload gym logo, pick primary brand color (OKLCH), set custom display title, and live app mockup preview.
- **Screen 70: Referral Partner Commission Tracker** *(Added per Master Spec §17.3)*
  - *Route:* `/ops/partner/payouts`
  - *Purpose:* Surface C dashboard: Referral link, referred gyms list, active gym months, and ₹10,000 monthly commission payout status.

---

## Part 3: Gym Owner & Staff Web Command Center (Screens 71 – 77)

Desktop and tablet-optimized administrative interface with multi-column data grids, keyboard shortcuts, and export controls.

- **Screen 71: Web Executive Command Center**
  - *Route:* `/admin/dashboard`
  - *Layout:* 3-column desktop layout with real-time footfall pulse, retention waterfall, revenue KPIs, and active red cases.
- **Screen 72: Fullscreen Reception & Turnstile Terminal**
  - *Route:* `/admin/terminal`
  - *Layout:* High-contrast kiosk mode for front-desk PCs with USB barcode scanner integration and instant audio chimes.
- **Screen 73: Red-List Desktop Matrix**
  - *Route:* `/admin/red-list`
  - *Layout:* Sortable, filterable table with staff assignment columns, collision detection indicators, and bulk WhatsApp trigger.
- **Screen 74: Member Management & CSV Export Grid**
  - *Route:* `/admin/members`
  - *Layout:* Server-side paginated data grid (1,000+ members), bulk status actions, and GST-compliant CSV exports.
- **Screen 75: Financial Reconciliation & Billing Ledger**
  - *Route:* `/admin/billing`
  - *Layout:* Daily cash vs digital reconciliation, payment gateway fee audit, and tax invoice generation.
- **Screen 76: Add-On Inventory & Capacity Planner**
  - *Route:* `/admin/inventory`
  - *Layout:* Warehouse stock alerts for supplements and trainer utilization calendars.
- **Screen 77: Platform SuperAdmin Portal** *(Master Spec §20)*
  - *Route:* `/superadmin/tenants`
  - *Layout:* Platform-wide gym SaaS tenant subscriptions, MRR tracking, platform health, and tenant provisioning.

---

## Part 4: Public Marketing & Sales Website (Pages 78 – 84)

High-performance Server-Side Rendered (SSR) marketing pages adhering to **Phase 15 SEO & Open Graph standards**.

- **Page 78: Public Homepage & Hero Showcase**
  - *Route:* `/`
  - *Components:* Hero section with video demo, "The Operating System for Modern Fitness", interactive retention loop breakdown, customer proof.
- **Page 79: Interactive Member ROI & Churn Calculator**
  - *Route:* `/roi-calculator`
  - *Components:* Dynamic sliders: Number of members, average monthly fee, current drop-off rate $\rightarrow$ Computes annual revenue recovered by Kynvelo Red-List.
- **Page 80: Pricing & Transparent Plans**
  - *Route:* `/pricing`
  - *Components:* Starter (₹2,999) vs Growth (₹5,999) B2B comparison, member block overage sliders (+50 / +100 blocks), B2C Direct pricing (₹0 / ₹99 / ₹299), setup fee FAQ.
- **Page 81: Enterprise & White-Label Hardware Specs**
  - *Route:* `/enterprise`
  - *Components:* Dedicated app-store listing preview, turnstile relay hardware compatibility (TCP/IP & USB), SLA tiers, executive consultation form.
- **Page 82: Referral Partner Program Portal**
  - *Route:* `/partners`
  - *Components:* Explanation of ₹10,000 monthly commission per referred gym for 10 months, partner registration form.
- **Page 83: Public Registration & Onboarding Wizard**
  - *Route:* `/signup`
  - *Components:* Clean 3-step signup: Account type (Gym vs Athlete) $\rightarrow$ Business details $\rightarrow$ Referral code validation.
- **Page 84: Legal, Compliance & Privacy Hub**
  - *Route:* `/legal/{terms|privacy|refunds|dpdp}`
  - *Components:* DPDP Act 2023 compliance, data retention terms, refund and membership transfer rules.

---

## Part 5: Global System, Security & Error States (Screens 85 – 89)

Mandatory states from **Phases 3, 4, 6 & 25 of the SaaS Checklist**.

- **Screen 85: Permission Denied (403 State)**
  - *Route:* Global Error Boundary
  - *Components:* Clean lock illustration, "Access Restricted", explanation of required role (e.g. "Only Gym Owners can view billing ledgers"), and "Return to Dashboard" button.
- **Screen 86: Not Found (404 State)**
  - *Route:* Global Catch-All
  - *Components:* Sleek athletic 404 graphic, search input, and button to home.
- **Screen 87: Offline / Network Disconnected State**
  - *Route:* PWA Service Worker Fallback
  - *Components:* "Working Offline" banner with access to cached check-in QR and offline workout logger.
- **Screen 88: Session Timeout & Biometric Re-Auth Modal**
  - *Route:* Global Session Interceptor
  - *Components:* Modal triggering device FaceID / Fingerprint or 4-digit PIN to re-authenticate without losing current form state.
- **Screen 89: General Server Error (500 State with Sentry ID)**
  - *Route:* Global 500 Handler
  - *Components:* Friendly error explanation, unique Sentry Event ID for support lookup, and "Try Again" action.

---

## Summary Matrix

| Section | Target Surface | Screen Count | Key Capabilities |
|---|---|---|---|
| **Part 1** | Member Mobile App (B2C & Gym) | 48 | Attendance, Dynamic QR, Workouts, Food AI Scan, Renewals |
| **Part 2** | Gym Owner & Staff Mobile | 22 | Red-List CRM, Turnstiles, Member Roster, Branding Themer |
| **Part 3** | Gym Owner Web Command Center | 7 | Fullscreen Kiosk, Multi-column Grids, Billing Ledger |
| **Part 4** | Public Marketing Website | 7 | SSR Hero, ROI Calculator, Pricing, Enterprise & Partners |
| **Part 5** | Global Security & System States | 5 | 403 Forbidden, 404, Offline PWA, Biometrics, Sentry 500 |
| **Total** | **All Product Surfaces** | **89** | **Complete Master Specification** |
