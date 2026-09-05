# Kynvelo — Product Specification (PRODUCT.md)

**Product Name:** Kynvelo  
**Category:** Fitness Business Operating System ("Fitness Business OS")  
**Tagline:** *The Operating System for Modern Fitness.*  
**Status:** Living Product Document  

---

## 1. Executive Product Summary

Kynvelo is a white-label, multi-tenant Fitness Business Operating System combining:
1. **A Core Retention Operating Loop (B2B):** Attendance visibility → Early churn detection → Timely renewal → Contextual add-on revenue.
2. **A Fitness & Nutrition Utility (Member-facing):** Workout tracking, calorie/food logging with barcode + AI photo scanning, goal-setting, and habit streaks.
3. **A Direct Consumer App (B2C):** Standalone subscription app for individual fitness enthusiasts, sharing the exact same underlying codebase under a reserved system tenant.

---

## 2. Core Business Problem & Operating Solution

### 2.1 The Invisible Leak
Gyms do not lose members when a renewal fails; they lose them **10–15 days earlier when attendance becomes irregular and goes unnoticed**. By the time the renewal date passes, the member has mentally churned.

### 2.2 The Autonomous Operating Loop
```
Record Attendance → Detect Inactivity Risk → Contact Early → Recover Member → Collect Renewal On-Time → Deliver Add-Ons → Report ROI to Owner
```

### 2.3 Explicit Non-Promises
- The software cannot retain a member alone; facility cleanliness, equipment quality, coaching, and staff culture are external.
- Revenue outcomes depend on the gym owner's operational follow-through and pricing.
- Third-party messaging (SMS/WhatsApp) and payment gateway transaction fees are separate pass-through costs.

---

## 3. The Three Product Surfaces

Every account belongs to exactly one tenant (`gym_id`):

| Surface | Target User | Offering | Monetization |
|---|---|---|---|
| **Surface A: Kynvelo Direct (B2C)** | Individual fitness users without gym affiliation | Workout logging, food/calorie logging, barcode & AI photo scan, goal charts, streaks | Personal monthly/quarterly/annual subscription |
| **Surface B: Kynvelo for Gyms (B2B)** | Gym owners & fitness enterprises | Multi-tenant retention CRM, branded member mobile app, staff portals, owner dashboard | Gym monthly/annual subscription + member blocks |
| **Surface C: Referral Program** | Existing gym owners & personal trainers | Revenue share for onboarding new paying gyms | 20% recurring commission for 6 months (capped at ₹10,000 per gym) |

### Tenancy Architecture Rule
B2C individual users are modeled as members of a reserved system tenant:
```python
tenant_id = "kynvelo-direct"
```
This guarantees that B2C and B2B users run on the **exact same codebase, database models, and APIs** without maintaining separate redundant codepaths.

---

## 4. Module Specifications

### 4.1 Core & Pulse (Check-in & Attendance)
- **Rotating QR Engine:** Session-bound dynamic QR code updated every few seconds; screenshot sharing is blocked.
- **Duplicate Protection:** Scans within a configurable rejection window are ignored.
- **Assisted Front-Desk Check-in:** Front-desk staff can manually log a member's check-in with a mandatory reason.
- **Offline Check-in Queue:** PWA / local queue records attendance offline and syncs immediately when connectivity returns with true audit timestamps.
- **Streak Logic:** Three configurable streak modes:
  - *Planned Visit Streak:* Consecutive target workout days hit (default).
  - *Weekly Target Goal:* e.g., 4 of 4 planned workouts completed.
  - *Challenge Calendar Streak:* Daily check-in challenges.

### 4.2 Guard (No-Show Red List CRM)
- **Automated Absence Threshold:** Configurable per gym (default: 10+ consecutive absent days for active memberships).
- **Actionable Red-List View:** Member name/photo, phone, plan expiry, last check-in, days absent, assigned trainer, last contact outcome.
- **Mandatory Outcome Logging:** `Will return`, `Injured`, `Travelling`, `Timing issue`, `Unhappy`, `No response`, `Cancelled`.
- **Auto-Resolution:** Case automatically marks resolved and archives to history upon a qualifying return check-in.
- **Anti-Collision Guard:** Simultaneous duplicate contact by multiple staff members is locked out.
- **Strict Exclusion:** Paused, frozen, expired, or cancelled memberships are excluded from red-list alerts.

### 4.3 Flow (Auto-Renewal Engine)
- **Cadence:** Automated reminder alerts fired at 14, 7, 3 days before expiry, on expiry day, and +3 days post-expiry.
- **Member Self-Service Renewal:** Clean screen displaying current plan, renewal options (1, 3, 6, 12 months), pricing, transparent terms, and instant digital payment.
- **Payment Integrity Rules (P0):**
  - Never store raw card or UPI credentials.
  - Provider status is the single source of truth. "Initiated" ≠ "Paid".
  - Membership extension occurs **only after server-side verified webhook confirmation**.
  - Duplicate webhook delivery is handled idempotently.
  - Refunds and reversals create auditable rollback records.

### 4.4 Pay (Add-On Marketplace)
- Transparent marketplace for Personal Training packages, dietitian consultations, and sealed in-stock supplements.
- Offers presented contextually based on member stage (e.g. induction for beginners, PT packs for strength goal-seekers).
- Real-time stock verification prevents out-of-stock purchases.

### 4.5 Fuel & Coach (Fitness & Nutrition Module — Phase 1.5 Differentiator)
- **Barcode Scanner:** Client-side decode (`ZXing` / `Quagga2`) sending pure UPC/EAN strings to server for instant lookup.
- **AI Photo Food Recognition (Two-Stage Architecture):**
  ```
  Food Photo → Vision LLM (OpenAI / Gemini paid tier) identifies items & portions (JSON)
             → Backend matches items against USDA FoodData Central database
             → Calories and macros are calculated strictly from USDA data (Zero AI Hallucinations)
             → Member reviews/confirms before saving
  ```
- **Workout & PR Tracking:** Exercise database (text/metadata from `wrkout/exercises.json`), workout builder, set/rep/weight logging, rest timers, and personal records.

### 4.6 Metrics (Owner Dashboard)
- Actionable KPIs prioritized over decorative charts:
  - Active members & today's check-ins.
  - Open no-show cases & recovered members.
  - Renewals due in 7 days & renewal collection rate.
  - Add-on conversion and monthly revenue.

---

## 5. Pricing Structure

### 5.1 Kynvelo Direct (B2C)
- **Free (₹0):** Unlimited workout logging, Olympic plate calculator, personal records & 1RM estimates, muscle recovery heatmap, 1 active goal, 7-day nutrition history, gym check-in pass.
- **Starter (₹99/mo | ₹899/yr):** Adds barcode scanning, unlimited nutrition history, streaks, hydration & quick-add logging, steps & cardio sessions.
- **Pro (₹299/mo | ₹2,499/yr):** Adds AI photo food scan, macro/micronutrient/PR analytics, TDEE & readiness scoring, transformation photo vault, workout plan builder, data export.

> **Free tier scope widened 2026-09-04.** Free previously covered only manual logging, 1 active goal and 7-day history. The plate calculator, personal records, 1RM estimation and the recovery heatmap are pure client-side arithmetic with no marginal serving cost, and they are the strongest adoption driver available. Gating them bought nothing. Implemented in `frontend/lib/pricing.ts` → `ATHLETE_TIERS`, which is the single source of truth every pricing surface reads.
>
> **Tier names are Free / Starter / Pro.** There is no "Elite" tier; that name appeared only in WIREFRAMES_AND_COMPONENTS.md and has been corrected.

### 5.2 Kynvelo for Gyms (B2B)
- **Starter (₹2,999/mo | ₹28,999/yr):** Up to 100 members. Core, Pulse, Guard, Flow, Pay modules.
- **Growth (₹5,999/mo | ₹57,999/yr):** Up to 100 members. Adds Fuel, Coach, Metrics, and white-label branding.
- **Enterprise (Custom):** Multi-location, dedicated app-store listing, SSO, custom integrations.
- **Member Expansion Blocks:**
  - +50 members: ₹1,499/mo
  - +100 members: ₹2,799/mo
- **Setup Fee:** One-time onboarding fee (₹5,000–₹15,000, waived on annual prepay) for branding setup, staff training, and member data migration. *Lifetime one-time subscriptions are strictly prohibited.*

### 5.3 Referral Program
- **Commission:** 20% recurring share of base plan fees for up to 6 months. Calculated on the base plan fee only — capacity blocks, setup fees and GST are excluded.
- **Caps:** ₹10,000 maximum payout per referred gym; payout ceases once 6 months or ₹10,000 is reached, whichever comes first.
- **Minimum payout:** ₹1,000. Balances below this roll into the following month until they clear the threshold, so bank transfer fees do not consume the payment. *(Added 2026-09-04; previously implemented in the frontend without a spec entry.)*
- **Accrual condition:** commission accrues for a month only once the referred gym's payment for that month has cleared. Kynvelo does not pay out on revenue it has not collected.
- **Attribution:** 6-character referral code with a 7-day post-signup self-service grace period. The code entered at signup wins; no split attribution, no last-touch override. Self-referrals do not qualify.

> **These are the authoritative terms.** FEATURES.md 8.1, SCREENS.md page 82 and WIREFRAMES_AND_COMPONENTS.md previously stated "₹10,000 per gym per month for 10 months", which is ~17× higher and exceeds the entire Starter plan fee. All three have been corrected to match this section.

---

## 6. Roles & Access Matrix

| Role | Scope | Key Permissions |
|---|---|---|
| **Platform Owner** | Global / Cross-tenant | Full platform config, tenant billing, refunds, referral payouts, feature flags, tenant provisioning |
| **Platform Support** | Global / Cross-tenant | Read-only impersonation, feature flag toggles, audit log inspection, support resolution (no money movement) |
| **Gym Owner** | Single Gym Tenant | Full gym config, staff accounts, member billing, reports, plan setup, add-on marketplace |
| **Gym Receptionist** | Single Gym Tenant | Check-in terminal, assisted check-in, red-list call logging, member activation |
| **Gym Trainer** | Single Gym Tenant | Assigned member workout programming, PT session tracking, progress notes |
| **Gym Dietitian** | Single Gym Tenant | Assigned member meal plans, macro targets, dietary consults |
| **Gym Member** | Self Account | QR attendance, workout & nutrition logging, renewal payments, add-on purchasing |
| **Referral Partner** | Self Account | Personal referral dashboard, referral code tracking, commission payout status |

---

## 7. Roadmap & Milestones

- **Phase 1 (MVP — 7-Day Prototype):** Multi-tenant gym setup → Member onboarding → QR check-in → No-show red list → Renewal flow → Simulated payments → Owner dashboard.
- **Phase 1.5 (Pilot Enhancement — 30-Day Pilot):** Live Matrix Sols payment gateway → WhatsApp/SMS notification triggers → Fitness & nutrition module (USDA FoodData + Barcode + AI Photo scan).
- **Phase 2 (Enterprise & Ecosystem):** Dedicated white-label app-store builds, trainer booking engine, automated hardware turnstile relays.
