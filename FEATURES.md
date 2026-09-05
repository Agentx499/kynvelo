# Kynvelo — Features & Benefits Master Index (FEATURES.md)

**Product:** Kynvelo (Fitness Business Operating System)  
**Scope:** Exhaustive catalog of all capabilities, operational benefits, functional logic, and target surfaces.  

---

## 1. Module: KYNVELO PULSE (Access, Attendance & Habit Retention)

### 1.1 Dynamic Rotating QR Code Check-in
- **Business Benefit & Problem Solved:** Eliminates proxy check-ins, screenshot sharing between friends, and front-desk logbook bottleneck. Reduces receptionist overhead by 80%.
- **What It Does:** Generates a cryptographic HMAC-SHA256 QR code on the member's device that regenerates every 15 seconds. Scanned by turnstile hardware or front-desk scanner. Validates active membership, unpaused status, and records check-in timestamp in <200ms.
- **Where It Lives:** Member App (`/app/checkin/qr`), Turnstile Hardware Relay, Front-Desk Terminal (`/admin/terminal`).
- **Primary Role:** Gym Members & Front-Desk Receptionists.

### 1.2 Hardware Turnstile Gateway Integration
- **Business Benefit & Problem Solved:** Autonomous 24/7 access control. Unpaid or expired members cannot enter the facility, eliminating awkward front-desk confrontations.
- **What It Does:** Communicates with physical tripod/flap turnstiles via local TCP/IP relays or USB barcode scanners. Pulses the relay dry-contact upon validation. Fails closed on internet outage with local cached allowlist.
- **Where It Lives:** Gym Floor Hardware, Front-Desk Terminal (`/admin/terminal`), Hardware Settings (`/ops/hardware/turnstiles`).
- **Primary Role:** Gym Owners & Hardware Integrators.

### 1.3 Assisted Manual Check-in with Mandatory Reason Logging
- **Business Benefit & Problem Solved:** Stops front-desk staff from granting unauthorized free entry to friends. Complete audit trail.
- **What It Does:** If a member forgets their phone, staff can search by name/phone. System forces staff to select a mandatory reason (`Forgot phone`, `Phone battery dead`, `Camera issue`) before unlocking the gate. Logs staff user ID and timestamp.
- **Where It Lives:** Front-Desk Mobile Ops (`/ops/assisted-checkin`), Web Terminal (`/admin/terminal`).
- **Primary Role:** Front-Desk Staff.

### 1.4 Daily Streak & Habit Psychology Engine
- **Business Benefit & Problem Solved:** Fixes gym dropout. Members who maintain a 3+ day streak renew at a 3.4x higher rate than erratic attendees.
- **What It Does:** Tracks consecutive days attended, all-time best streak, and weekly attendance goals (e.g. 4/4 days completed). Delivers celebratory haptic feedback and milestone badges upon entry.
- **Where It Lives:** Member App Home (`/app/pulse`), Streak Detail (`/app/attendance/streak`).
- **Primary Role:** Gym Members & Direct Athletes.

---

## 2. Module: KYNVELO FLOW (No-Show Red-List CRM & Anti-Churn Retention)

### 2.1 Automated No-Show Red-List Detection
- **Business Benefit & Problem Solved:** Recovers lost members *before* they lapse. Gyms typically lose 50% of members who disappear for 14+ days. Flow flags them immediately.
- **What It Does:** Automatically categorizes members who haven't checked in into 3 actionable risk tiers:
  - *Tier 1 (10–14 days absent):* Early drop-off risk (gentle check-in).
  - *Tier 2 (15–21 days absent):* Medium churn risk (motivational recovery).
  - *Tier 3 (22+ days absent):* High churn risk (intervention / plan adjustment).
- **Where It Lives:** Owner Mobile Ops (`/ops/red-list`), Web Command Center (`/admin/red-list`).
- **Primary Role:** Gym Owners, Managers, and Floor Trainers.

### 2.2 One-Tap WhatsApp & Call Outreach
- **Business Benefit & Problem Solved:** Removes outreach friction. Staff can contact 20 absent members in 5 minutes with zero manual typing.
- **What It Does:** Native deep links open WhatsApp with pre-filled personalized templates ("Hey Rahul, noticed you haven't been in for 10 days! Everything okay?") or launches the phone dialer.
- **Where It Lives:** Red-List Row Actions (`/ops/red-list`, `/admin/red-list`).
- **Primary Role:** Front-Desk Staff & Trainers.

### 2.3 Mandatory Outcome Logging & Follow-Up Scheduling
- **Business Benefit & Problem Solved:** Ensures accountability. Staff cannot simply click "Call" without documenting what happened.
- **What It Does:** Forces staff to record an outcome: `Will return tomorrow`, `Travelling`, `Injured / Medical`, `Fee dispute`, `Unreachable`. Sets an automated reminder date for the next touchpoint.
- **Where It Lives:** Outcome Modal (`/ops/red-list/{id}/outcome`), Web Red-List (`/admin/red-list`).
- **Primary Role:** Front-Desk Staff & Managers.

### 2.4 Staff Anti-Collision Locking
- **Business Benefit & Problem Solved:** Prevents two staff members from awkwardly calling the same absent member at the same time.
- **What It Does:** Puts a temporary 30-minute lock on a red-list member record the instant a staff member opens their contact sheet, displaying an "In contact by Priya" banner.
- **Where It Lives:** Web Red-List (`/admin/red-list`), Mobile Ops (`/ops/red-list`).
- **Primary Role:** Front-Desk Staff.

---

## 3. Module: KYNVELO PAY (Frictionless Renewals & Financial Integrity)

### 3.1 Self-Service In-App Renewals (No Auto-Debit Traps)
- **Business Benefit & Problem Solved:** Members renew on their own phone in 15 seconds without waiting in line at reception. Respects Indian RBI mandates (no surprise recurring credit card charges).
- **What It Does:** Displays clear 1, 3, 6, and 12-month renewal cards with transparent duration discounts. Direct UPI deep-link triggers Google Pay, PhonePe, or Paytm with one tap.
- **Where It Lives:** Member App (`/app/membership/renew`, `/app/membership/checkout`).
- **Primary Role:** Gym Members.

### 3.2 Webhook-Driven Payment State Machine ("Initiated" $\neq$ "Paid")
- **Business Benefit & Problem Solved:** Completely eliminates free membership extensions caused by spoofed frontend payment callbacks or network drops.
- **What It Does:** Frontend transitions payment to `PENDING`. Membership expiry is extended **only when the backend receives an authentic, HMAC-signed webhook from the payment gateway**. Idempotent transaction processing prevents double-crediting.
- **Where It Lives:** Backend Payment Webhook Handler (`/api/payments/webhook/`), Member Payment Pending Screen (`/app/membership/payment-pending`).
- **Primary Role:** System Automation & Security.

### 3.3 Cash & POS In-Person Reconciliation
- **Business Benefit & Problem Solved:** Accounts for cash-paying gym members while preventing staff pocketing cash.
- **What It Does:** Front-desk records cash or external card swipe transactions. Instantly generates an official digital receipt sent to the member's WhatsApp/SMS, locking the record in the owner's financial ledger.
- **Where It Lives:** Front-Desk Mobile Ops (`/ops/payments/confirm`), Web Billing Ledger (`/admin/billing`).
- **Primary Role:** Front-Desk Staff & Gym Owners.

### 3.4 Automated GST-Compliant Tax Invoicing
- **Business Benefit & Problem Solved:** Saves gym owners 10+ hours per month on CA accounting and tax filing.
- **What It Does:** Computes CGST/SGST/IGST breakdown, applies gym GSTIN, generates a sequential invoice number, and provides instant PDF downloads for members and accountants.
- **Where It Lives:** Member Invoices (`/app/membership/invoices`), Owner Billing Ledger (`/admin/billing`).
- **Primary Role:** Gym Owners, Accountants, Members.

---

## 4. Module: KYNVELO FUEL (Two-Stage AI Nutrition & Calorie Tracking)

### 4.1 Zero-Hallucination Two-Stage AI Food Photo Scan
- **Business Benefit & Problem Solved:** Members hate manual food weighing and text logging. Standard AI apps hallucinate calorie numbers wildly. Kynvelo delivers accurate nutrition with camera speed.
- **What It Does:**
  1. *Stage 1 (Vision):* Vision LLM identifies food items and estimated portions from a photo (e.g. "2 boiled eggs, 1 slice whole wheat bread").
  2. *Stage 2 (Authoritative Math):* Backend queries the official **USDA FoodData Central** database for the verified nutritional values.
  3. *User Verification:* Member edits portions in grams/pieces before confirming.
- **Where It Lives:** Member App Camera Scanner (`/app/nutrition/photo-scan`), Portion Review (`/app/nutrition/photo-result`).
- **Primary Role:** Gym Members & B2C Athletes.

### 4.2 Client-Side Camera Barcode Scanner
- **Business Benefit & Problem Solved:** Zero latency barcode lookup. Private and fast — video stream never touches the server.
- **What It Does:** Uses client-side `Quagga2`/`ZXing` to decode packaged food UPC/EAN barcodes directly in the browser/app. Fetches nutrition facts in <100ms via indexed database key lookup.
- **Where It Lives:** Member App Barcode Scanner (`/app/nutrition/barcode`).
- **Primary Role:** Gym Members & B2C Athletes.

### 4.3 Daily Calorie Ring & Dynamic Macro Target Splits
- **Business Benefit & Problem Solved:** Real-time visual adherence. Members understand exactly how much protein, carbohydrates, and fat they have remaining for the day.
- **What It Does:** Displays animated concentric progress rings (Calories Consumed vs Target) and horizontal macro breakdown bars. Color-coded alerts when exceeding limits.
- **Where It Lives:** Member Nutrition Dashboard (`/app/nutrition`), Meal Log (`/app/nutrition/log`).
- **Primary Role:** Gym Members.

### 4.4 Hydration Water Log & Hydration Adherence
- **Business Benefit & Problem Solved:** Eliminates the need for separate habit trackers; reinforces daily lifestyle consistency.
- **What It Does:** Quick tap-to-add 250ml glasses or custom ml counter with daily hydration progress bar and automated hourly drink reminders.
- **Where It Lives:** Member Nutrition (`/app/nutrition/water`).
- **Primary Role:** Gym Members & Athletes.

### 4.5 Recipe & Meal Prep Batch Builder
- **Business Benefit & Problem Solved:** Enables meal-preppers to calculate per-serving calories and macros without weighing individual cooked portions each day.
- **What It Does:** Combines multiple raw ingredients into a batch recipe (e.g. 4-day chicken rice meal prep), computes total weight, and automatically divides into equal container portions with verified USDA nutrition facts.
- **Where It Lives:** Member Nutrition (`/app/nutrition/recipes/new`).
- **Primary Role:** Gym Members & Dietitians.

### 4.6 Fast Calorie & Protein Quick-Add
- **Business Benefit & Problem Solved:** Reduces tracking abandonment when members eat out at restaurants or consume homemade meals where exact ingredients are unknown.
- **What It Does:** Allows 5-second entry of estimated Calories (kcal) and Protein (g) directly into a meal slot without requiring ingredient search.
- **Where It Lives:** Quick-Add Modal (`/app/nutrition/quick-add`).
- **Primary Role:** Gym Members.

### 4.7 Net Carbs, Fiber & Micronutrient Breakdown
- **Business Benefit & Problem Solved:** Accommodates specialized diets (Ketogenic, Diabetic, Low-Sodium, High-Fiber) for advanced health and medical adherence.
- **What It Does:** Calculates Net Carbs (Total Carbs minus Dietary Fiber) and tracks daily intake of Sodium, Sugar, Potassium, and Vitamin D against recommended dietary allowances.
- **Where It Lives:** Food Item Detail (`/app/nutrition/item/{id}`), Macro Breakdown (`/app/nutrition`).
- **Primary Role:** Gym Members & Dietitians.

---

## 5. Module: KYNVELO COACH (Workout Telemetry & Performance Progression)

### 5.1 Active Workout Session Logger with Rest Timer
- **Business Benefit & Problem Solved:** Replaces messy paper workout logs and phone notes apps. Keeps athletes focused between sets.
- **What It Does:** Real-time set-by-set recording of weight (kg) and reps. Checkbox auto-starts a customizable countdown rest timer (e.g. 90s) with audio and haptic buzz upon completion. Auto-fills previous session's weight for progressive overload.
- **Where It Lives:** Member Active Workout (`/app/workout/active`).
- **Primary Role:** Gym Members & Athletes.

### 5.2 400+ Exercise Library & Execution Cues
- **Business Benefit & Problem Solved:** Prevents beginner gym intimidation and poor lifting form.
- **What It Does:** Searchable and filterable database by muscle group (Chest, Quads, Lats) and equipment type (Barbell, Cable, Machine). Shows anatomical muscle highlights and execution cues.
- **Where It Lives:** Exercise Library (`/app/workout/exercises`), Exercise Detail (`/app/workout/exercises/{id}`).
- **Primary Role:** Gym Members & Personal Trainers.

### 5.3 Automated Personal Record (PR) Detection & Celebration
- **Business Benefit & Problem Solved:** Delivers powerful dopamine rewards that keep gym members engaged and proud of their progress.
- **What It Does:** Automatically detects when a member exceeds their prior best lift on an exercise (highest weight or estimated 1RM). Triggers a celebratory gold badge and archives the record in the PR Vault.
- **Where It Lives:** Post-Workout Summary (`/app/workout/summary`), PR Records Vault (`/app/workout/records`).
- **Primary Role:** Gym Members & Personal Trainers.

### 5.4 Barbell Plate Loading Calculator
- **Business Benefit & Problem Solved:** Eliminates mental math errors and gym confusion when loading heavy barbells under fatigue.
- **What It Does:** Input target working weight (e.g. 102.5kg) $\rightarrow$ Instantly visualizes the barbell sleeve showing the exact plate combination needed per side (e.g. 20kg bar + 1x20kg, 1x15kg, 1x5kg, 1x1.25kg plates). Supports 20kg Olympic, 15kg Women's, and custom bars.
- **Where It Lives:** Plate Calculator Modal (`/app/workout/plate-calc`).
- **Primary Role:** Athletes & Powerlifters.

### 5.5 1RM Percentage & RPE Intensity Calculator
- **Business Benefit & Problem Solved:** Preserves coaching precision. Allows lifters to follow percentage-based training programs (e.g. 5x5 at 75% 1RM) without manual calculation.
- **What It Does:** Auto-computes one-rep max from set/rep inputs using the Brzycki & Epley formulas. Generates a live target table: 95%, 90%, 85%, 80%, 75%, 70% with associated RPE ratings.
- **Where It Lives:** Active Workout Set Input (`/app/workout/active`), PR Vault (`/app/workout/records`).
- **Primary Role:** Athletes & Trainers.

### 5.6 Superset, Dropset & Warmup Set Tagging
- **Business Benefit & Problem Solved:** Supports advanced bodybuilding and athletic training protocols beyond standard straight sets.
- **What It Does:** Allows tagging sets as Warmup (`W`), Dropset (`D`), or Failure (`F`). Lets users link two consecutive exercises as a Superset (A1 / A2) with a shared rest timer.
- **Where It Lives:** Active Workout Session (`/app/workout/active`).
- **Primary Role:** Athletes & Bodybuilders.

### 5.7 Progressive Overload In-Set Advisor
- **Business Benefit & Problem Solved:** Solves muscle growth plateaus. Tells members exactly what target they need to beat their last performance.
- **What It Does:** Displays a subtle inline indicator above each exercise: "Last week: 80kg × 8 reps. Today's target: 80kg × 9 reps or 82.5kg × 6 reps."
- **Where It Lives:** Active Workout Set Matrix (`/app/workout/active`).
- **Primary Role:** Gym Members & Coaches.

### 5.8 Interactive Muscle Recovery Heatmap
- **Business Benefit & Problem Solved:** Prevents overtraining and guides daily workout selection (e.g. avoiding heavy squats when quads are still 90% fatigued).
- **What It Does:** Visual 3D/2D anatomical human body model showing muscle recovery status (Green = Recovered 100%, Amber = Recovering 50%, Red = Heavily Fatigued) calculated dynamically based on training volume logged in the past 48–72 hours.
- **Where It Lives:** Workout Hub (`/app/workout`), Recovery View (`/app/workout/muscle-recovery`).
- **Primary Role:** Gym Members, Athletes & Personal Trainers.

### 5.9 Personal Trainer Client Roster & Session Countdown
- **Business Benefit & Problem Solved:** Eliminates disputes over how many PT sessions a client has remaining.
- **What It Does:** Trainers view their assigned clients, see remaining prepaid session counts (e.g. 8/12 sessions remaining), and log session completion with one tap. Member receives an instant verification alert.
- **Where It Lives:** Trainer Mobile Ops (`/ops/trainer/clients`), Member Add-on Hub (`/app/marketplace/my-orders`).
- **Primary Role:** Personal Trainers & Gym Members.

---

## 6. Module: KYNVELO MARKET (Add-on Services & Supplement Revenue)

### 6.1 Gym Add-On Marketplace (PT, Dietitians & Supplements)
- **Business Benefit & Problem Solved:** Unlocks 30–40% additional recurring revenue for gym owners beyond basic floor memberships.
- **What It Does:** In-app digital storefront for booking Personal Training packages, custom Dietitian consultations, and purchasing gym-stocked protein powders and pre-workouts.
- **Where It Lives:** Member App (`/app/marketplace`), Owner Add-on Config (`/ops/addons`, `/admin/inventory`).
- **Primary Role:** Gym Members & Gym Owners.

### 6.2 Real-Time Supplement Inventory & Low-Stock Alerts
- **Business Benefit & Problem Solved:** Prevents stock theft and out-of-stock situations at the front desk.
- **What It Does:** Automatically deducts inventory upon in-app purchase or front-desk POS sale. Alerts owner when an SKU drops below threshold (e.g. <5 tubs remaining). Blocks overselling.
- **Where It Lives:** Owner Mobile Ops (`/ops/addons`), Web Inventory (`/admin/inventory`).
- **Primary Role:** Gym Owners & Front-Desk Staff.

---

## 7. Module: KYNVELO WHITE-LABEL & THEME ENGINE

### 7.1 Runtime Dynamic Tenant Themer (No Rebuilds)
- **Business Benefit & Problem Solved:** Gyms get their own custom-branded app experience without requiring expensive separate app store publishing for standard tiers.
- **What It Does:** Injects gym logo, display title, primary brand color, and accent color into CSS custom properties (`--kynvelo-primary`, `--kynvelo-accent`) the instant a member logs into that gym's tenant.
- **Where It Lives:** Member App Framework, Owner Branding Settings (`/ops/settings/branding`).
- **Primary Role:** Gym Owners & Members.

### 7.2 Dedicated Enterprise App-Store Target (Capacitor/Expo)
- **Business Benefit & Problem Solved:** Prestige for elite multi-location gym chains. Dedicated app-store presence on Apple App Store & Google Play ("Gold's Gym by Kynvelo").
- **What It Does:** Uses a single shared codebase with a distinct build target to compile native `.ipa` and `.apk`/`.aab` binaries with dedicated app IDs, bundle identifiers, and push notification certificates.
- **Where It Lives:** Enterprise Build Pipeline, Enterprise Web Showcase (`/enterprise`).
- **Primary Role:** Enterprise Gym Chains.

---

## 8. Module: KYNVELO PARTNERS (Viral Growth & Referral Engine)

### 8.1 Transparent Referral Partner Commission Portal (Surface C)
- **Business Benefit & Problem Solved:** Creates a viral army of fitness trainers, equipment dealers, and consultants selling Kynvelo to gym owners.
- **What It Does:** Provides partners with a unique referral link. Tracks onboarded gyms, active months, and automated monthly commission payouts of **20% of the gym's base plan fee for 6 months, capped at ₹10,000 total per referred gym**, with a ₹1,000 minimum payout threshold.
  > **Corrected 2026-09-04.** This entry previously stated "₹10,000 per active gym for 10 months (capped at ₹10,000/mo)". That is ~17× higher than PRODUCT.md 5.3 and exceeds the entire Starter plan fee of ₹2,999/mo, so it would have paid the partner more than the gym pays Kynvelo, every month. PRODUCT.md 5.3 is the specification of record and the frontend implements it. See `frontend/lib/pricing.ts` → `COMMISSION`.
- **Where It Lives:** Partner Web Portal (`/partners`), Partner Dashboard (`/ops/partner/payouts`).
- **Primary Role:** Referral Partners & Affiliates.

### 8.2 Interactive Member Churn & ROI Calculator
- **Business Benefit & Problem Solved:** Irresistible sales tool for closing gym owners on the website. Demonstrates that recovering just 4 members per month pays for the entire software 5x over.
- **What It Does:** Live interactive calculator: User adjusts member count and monthly membership fee $\rightarrow$ Visualizes exact annual revenue lost to no-shows and projected revenue recovered using Kynvelo Red-List CRM.
- **Where It Lives:** Public Website (`/roi-calculator`, `/`).
- **Primary Role:** Prospective Gym Owners & Sales Team.

---

## 9. Module: KYNVELO GUARD (Security, Multi-Tenancy & Compliance)

### 9.1 Multi-Tenant Base Manager ORM Isolation (`gym_id`)
- **Business Benefit & Problem Solved:** Zero data leaks between rival gyms. Guarantees 100% tenant privacy.
- **What It Does:** All database models inherit from `TenantBaseModel`. Custom Django ORM `TenantManager` automatically restricts every `.filter()`, `.all()`, and `.get()` query to the authenticated `gym_id`.
- **Where It Lives:** Backend Core ORM (`core.models.TenantBaseModel`).
- **Primary Role:** System Architecture & Data Security.

### 9.2 Indian DPDP Act 2023 Compliance & Consent Architecture
- **Business Benefit & Problem Solved:** Protects gym owners and Kynvelo from massive legal liabilities and fines under India's Digital Personal Data Protection Act.
- **What It Does:** Separates transactional operational notifications (check-in alerts, payment receipts) from promotional marketing. Provides members with one-tap "Export All My Data" and "Delete Account / Erase Biometrics" capabilities.
- **Where It Lives:** Member Privacy Settings (`/app/settings/notifications`, `/app/settings/profile`), Legal Hub (`/legal/dpdp`).
- **Primary Role:** All Users & Compliance Officers.

### 9.3 Biometric Re-Authentication & Session Security
- **Business Benefit & Problem Solved:** Protects sensitive gym financial data if an owner leaves their tablet or phone unattended at the front desk.
- **What It Does:** Sensitive operations (financial ledger, staff permission changes) trigger native device FaceID, fingerprint, or 4-digit PIN re-auth before proceeding.
- **Where It Lives:** Global Session Interceptor (`/ops/*`, `/admin/*`).
- **Primary Role:** Gym Owners & Financial Managers.

---

## 10. Module: KYNVELO VITAL (Health, Steps, Recovery & Body Telemetry)

### 10.1 Daily Step Tracking & Active Cardio Session Logger
- **Business Benefit & Problem Solved:** Eliminates the need for members to switch to Strava, Apple Health, or Fitbit. Provides a single total daily energy expenditure snapshot.
- **What It Does:** Logs daily walking steps and active cardio sessions (Treadmill, Elliptical, Outdoor Run, Cycling, Rowing) with distance (km), duration, pace, and estimated calorie burn.
- **Where It Lives:** Member App Pulse (`/app/pulse`), Cardio Logger (`/app/cardio`).
- **Primary Role:** Gym Members & B2C Athletes.

### 10.2 Apple Health & Google Health Connect Synchronization
- **Business Benefit & Problem Solved:** Completely frictionless telemetry. Steps, active energy, resting heart rate, and sleep hours sync in the background without manual data entry.
- **What It Does:** Native HealthKit and Health Connect background bridge. Reads daily steps and active energy (kcal) into the member's daily budget. Never sells or exposes health data to third parties.
- **Where It Lives:** Mobile Settings (`/app/settings/health-sync`), Home Pulse (`/app/pulse`).
- **Primary Role:** Gym Members.

### 10.3 Daily Morning Readiness & Recovery Check-in
- **Business Benefit & Problem Solved:** Prevents gym burnout, injury, and fatigue dropout. Personalizes workout intensity recommendations based on physiological state.
- **What It Does:** A 5-second 3-question morning tap survey: Sleep Quality (1–5), Muscle Soreness (1–5), Energy Level (1–5). Computes a Daily Readiness Score (0–100%) that dynamically adjusts suggested working set volume.
- **Where It Lives:** Morning Prompt / Home Pulse (`/app/pulse/readiness`).
- **Primary Role:** Gym Members & Athletes.

### 10.4 Side-by-Side Visual Transformation Photo Slider
- **Business Benefit & Problem Solved:** The ultimate retention motivator. Members who see visual side-by-side evidence of body recomposition never quit the gym.
- **What It Does:** Allows members to pick two private timestamped progress photos (e.g. Day 1 vs Day 60) and displays an interactive draggable split-screen slider. Option to export a branded transformation collage with gym watermark.
- **Where It Lives:** Body Progress Vault (`/app/body/photos/compare`).
- **Primary Role:** Gym Members, Coaches & Personal Trainers.

### 10.5 TDEE & Basal Metabolic Rate (BMR) Dynamic Calculator
- **Business Benefit & Problem Solved:** Removes nutrition guesswork. Dynamically calculates realistic calorie targets for fat loss, muscle building, or maintenance.
- **What It Does:** Computes BMR using the Mifflin-St Jeor & Katch-McArdle formulas based on age, gender, height, weight, and body fat %. Combines with logged workout volume and step telemetry to compute actual daily TDEE.
- **Where It Lives:** Nutrition Goals Setup (`/app/nutrition/goals`).
- **Primary Role:** Gym Members & Dietitians.

