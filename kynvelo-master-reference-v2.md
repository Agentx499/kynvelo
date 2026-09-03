# Kynvelo â€” Master Reference Document (v2)

**Purpose of this file:** This is the single source-of-truth document for the product, now branded **Kynvelo** (see `kynvelo-name-research.md` for the naming/legal clearance detail). It consolidates (1) the original retention-app concept, (2) the fitness/nutrition/scanner expansion, (3) the multi-tenant role model, (4) the full commercial-licensing research for every third-party dependency under consideration â€” **Part I, Â§0â€“Â§15, unchanged from v1** â€” and now (5) **Part II, Â§16â€“Â§23**: the three-sided business model, pricing, referral program, white-label architecture, fault isolation, RBAC, and a hosting plan sized to the actual instance in use (2 vCPU / 12 GB RAM / 200 GB storage). Treat this as the document you split *from* â€” e.g. pull Â§3â€“Â§8 into a `PRODUCT_SPEC.md`, Â§9 into a `LICENSING.md`, Â§16â€“Â§17 into a `BUSINESS_MODEL.md`, Â§18â€“Â§21 into an `ARCHITECTURE.md`, etc. Â§15 and Â§23 both track open decisions still needed before coding starts.

---

## 0. Product Summary

A white-label, multi-tenant SaaS product, sold per-gym, combining:
- A **retention operating loop** (attendance visibility â†’ early churn detection â†’ timely renewal â†’ relevant add-on revenue) â€” the original concept.
- A **fitness & nutrition module** (workout tracking, calorie/food logging with barcode + photo scanning, goal-setting, progress charts) â€” layered on top so the member app has daily-use utility beyond just checking in.

Each gym that buys this product gets its own branded instance/tenant. You (the developer) operate the underlying platform across all tenants.

---

## 1. Core Business Problem & Solution

### 1.1 Problem
Gyms lose members silently. A member trains regularly, attendance quietly becomes irregular, nobody notices systematically, the member disappears for 10â€“15 days, and the owner only finds out when a renewal payment fails to arrive â€” by which point the member has already mentally left. The visible problem owners chase (new member acquisition) is not the real leak; the real leak is **unnoticed churn of existing members**.

### 1.2 Solution â€” the operating loop
> Record attendance â†’ detect risk â†’ contact early â†’ bring the member back â†’ collect renewal on time â†’ deliver useful add-ons (incl. fitness/nutrition tracking) â†’ show the owner what worked.

### 1.3 Explicit Non-Promises
- The app cannot retain a member by itself â€” coaching quality, hygiene, crowding, and staff attitude are outside its control.
- Retention/revenue outcomes depend on the gym's own pricing, execution, and follow-through.
- Notification and payment-gateway costs are a separate commercial/scope decision per deployment.

---

## 2. Roles & Access Model (Multi-Tenant)

| Role | Scope | Core Actions |
|---|---|---|
| **Developer / Super Admin** (you) | Cross-tenant | Platform config, feature flags, per-gym billing/subscription control, impersonation for support, tenant provisioning/deprovisioning |
| **Gym Owner** | Single tenant (their gym) | Full config, staff management, billing, all reports, plan/pricing/add-on setup |
| **Gym Staff / Front-desk** | Single tenant, operational only | Check-in, red-list follow-ups, membership activation, payment confirmation â€” no billing/config access |
| **Gym Member** | Self, single tenant | Check-in, view own data, renew/pay, browse add-ons, log workouts/meals, set goals |
| **Trainer** *(Phase 2)* | Single tenant, assigned members only | View assigned members/sessions, update PT package usage, optional progress notes |

**Tenancy rule:** every data model in Â§8 is scoped by `gym_id` (tenant) from day one â€” this avoids a costly re-architecture later even though MVP targets one gym at a time.

---

## 3. Core Retention Modules

### 3.1 No-Show Red List
**Purpose:** Tell the owner exactly who to contact today, without relying on memory or a register.

- Auto-calculated inactivity threshold (configurable per gym; sample default 10+ consecutive absent days)
- Red-list row: name/photo, phone, plan + expiry, last check-in, absent days, assigned trainer, last outcome, actions (Call / WhatsApp / Mark Outcome)
- Filters: 10â€“14 / 15â€“21 / 22+ days / expiring soon
- Mandatory outcome logging on contact: `Will return / Injured / Travelling / Timing issue / Unhappy / No response / Cancelled`
- Auto-resolves case on a qualifying return visit; history retained (never deleted)
- Excludes paused/frozen/expired/cancelled memberships
- No duplicate simultaneous contact by multiple staff for the same case
- Marketing consent and service-communication consent tracked separately

**Metrics:** contact rate, contact-to-return rate, avg days-to-return, churn reasons by category, recovered membership value.

### 3.2 QR Check-in & Streak
**Purpose:** Fast attendance entry; make the member's own habit visible to them.

- Rotating/session-bound QR (a static QR screenshot must not be indefinitely reusable)
- Duplicate-scan rejection window
- Assisted check-in for front desk, with mandatory reason
- Offline check-in queue that syncs later with an audit timestamp
- Attendance history
- Configurable streak logic:

| Type | Rule | Best for |
|---|---|---|
| Visit streak | Consecutive *planned* visits completed | Most members |
| Weekly goal | e.g., 4 of 4 planned visits/week | Flexible schedules |
| Calendar streak | Visit every calendar day | Challenges only |

- Streaks must encourage, never shame; rest days/approved pauses must not unfairly break a streak; members can disable motivational notifications.

**Metrics:** QR adoption, weekly active members, planned-visit completion rate, avg visits/active member, attendance-correction count.

### 3.3 Auto Renewal
**Purpose:** Replace manual chasing with a timely, verified-payment renewal flow.

**Reminder timeline:** 14 / 7 / 3 days before expiry, expiry day, +3 days after.

**Member sees:** current plan + exact expiry, 3/6/12-month options, base price/discount/final amount, benefits, refund/cancellation terms, secure payment action, payment status, downloadable receipt.

**Payment integrity rules (non-negotiable):**
- Never store raw card/UPI credentials.
- Payment-provider status is the single source of truth.
- "Initiated" â‰  "Paid" â€” extend membership only after **verified** payment (webhook/provider confirmation).
- Handle duplicate webhook callbacks **idempotently**.
- Refunds/reversals are separate, auditable records.

**Payment states:** `Created, Pending, Paid, Failed, Refunded, Reversed`

**Metrics:** renewal-before-expiry rate, reminder-to-payment conversion, failed-payment recovery, renewal plan mix, avg renewal delay.

### 3.4 Add-on Earnings (PT / Diet / Supplements)
**Purpose:** Offer relevant paid services transparently, never pre-selected.

- Member sees: name, outcome, duration, price, qualification (where relevant), session count/validity, stock status, inclusions/exclusions, actions (View Plan / Ask a Question / Buy)
- Offer logic tied to member state: beginner â†’ induction session; goal-specific â†’ PT assessment; nutrition request â†’ qualified consult; product buyer â†’ in-stock sealed items only, invoiced; expiring PT pack â†’ usage summary shown before renewal
- Trust rules: never pre-selected; medical/nutrition claims require a qualified professional; stock/price always current; trainer availability checked pre-payment; cancellation terms shown pre-purchase; revenue never presented as guaranteed profit

**Metrics:** view-to-purchase rate, PT utilisation, add-on revenue/active member, refund rate, repeat purchase rate.

---

## 4. Fitness & Nutrition Module (Member-Facing Add-on Feature Set)

### 4.1 Food Logging & Scanning
- Barcode scan â†’ packaged food nutrition lookup
- Photo-based food recognition â†’ auto-estimate items, portions, calories, macros
- Manual text search + log ("1 cup rice")
- Recent/frequent/favorite foods for fast re-logging
- Custom food/recipe creation (home-cooked meals)
- Meal categorization (breakfast/lunch/dinner/snack)
- Water intake logging

### 4.2 Goals & Targets
- Calorie goal (deficit/surplus/maintenance)
- Macro targets (protein/carbs/fat) â€” auto-suggested from weight/goal/activity level, editable
- Optional micronutrient targets (advanced tier)
- Weight goal + target date
- Goals auto-recalculate as weight updates

### 4.3 Tracking & Visualization
- Daily calorie/macro chart (today vs. goal)
- Weekly/monthly trend charts (calories, macros, weight)
- Nutrition-logging streak (separate from, but visually consistent with, the gym-attendance streak)
- Body weight + measurement logging (waist, arms, etc.)
- Timestamped progress photos

### 4.4 Workout/Fitness Tracking
- Exercise library (name, muscle group, equipment, instructions/media)
- Workout plan builder (templates + custom routines)
- Session logging: sets, reps, weight, rest timer
- Personal record (PR) tracking per exercise
- Workout history + volume/progress charts
- Optional: auto weight-progression suggestions (simple linear progression logic)

### 4.5 Cross-Cutting
- Everything scoped per-member, per-gym (multi-tenant)
- Feeds into the owner dashboard as an engagement metric ("active members using nutrition/fitness tracker")
- Reuses the existing notification engine for meal/workout log reminders
- Members can export their own history

---

## 5. Owner Dashboard & KPIs

**Top cards:** active members, today's check-ins, 7-day active members, open no-show cases, members returned after follow-up, renewals due in 7 days, renewal amount collected, add-on revenue this month.

**Formulas:**
```
Attendance activity rate = members with â‰¥1 valid visit in period / active members
No-show recovery rate    = red-list members who returned / contacted red-list members
Renewal rate              = memberships renewed / eligible expiring memberships
On-time renewal rate      = memberships renewed before expiry / renewed memberships
Add-on conversion rate    = members who purchased / members shown a relevant offer
```

**Design principle:** actionable lists over decorative charts. Every metric should answer: who do I call today, which fee is due, which payment failed, who came back, which add-on still needs delivering.

---

## 6. Automations (Background Jobs)

| # | Automation | Logic |
|---|---|---|
| A | Daily no-show scan | Excludes paused/frozen/expired/cancelled; opens exactly one case per eligible member |
| B | Valid QR check-in | Verifies session + membership â†’ rejects duplicates â†’ saves attendance â†’ updates streak â†’ auto-resolves matching case |
| C | Renewal reminders | Fires at 14/7/3/0-day windows; one message per stage; stops on verified payment/cancellation/opt-out |
| D | Payment confirmation | Consumes verified webhook â†’ marks Paid exactly once (idempotent) â†’ extends membership/add-on â†’ generates receipt |
| E | Daily owner summary | Check-ins, new red-list members, follow-ups, renewals, add-on orders, tomorrow's PT sessions |
| F | Data-quality alerts | Missing expiry, paid order with no provider reference, correction with no reason, negative stock, trainer double-booking |

---

## 7. Message Templates

- **No-show care:** `Hi {{name}}, aapka last gym check-in {{last_visit}} ko tha. Sab theek hai? ... {{support_link}}`
- **Renewal reminder:** `Hi {{name}}, aapki {{plan}} membership {{expiry_date}} ko expire hogi. ... {{renewal_link}}`
- **Payment success:** `â‚¹{{amount}} payment received. Membership active till {{new_expiry}}. Receipt: {{receipt_link}}`
- **Payment failed:** `Payment complete nahi hua. ... Retry: {{payment_link}} | Help: {{support_link}}`
- **Streak update:** `Great work, {{name}}! {{completed}}/{{target}} planned visits complete. Next: {{next_visit}}.`
- **PT reminder:** `PT session {{date}} {{time}} with {{trainer}}. Reschedule: {{session_link}}`

**Rule:** transactional and marketing messages require separate consent controls â€” no promotions without explicit opt-in.

---

## 8. Full Data Model

### 8.1 Retention/Membership Tables
| Table | Key Fields |
|---|---|
| `Gyms` (tenant) | name, branding, timezone, settings, subscription plan |
| `Members` | gym_id, name, phone, consent, join date, status, assigned trainer, risk state |
| `Plans` | gym_id, name, duration, base price, discount, benefits, active flag |
| `Memberships` | member_id, plan_id, start, expiry, status, freeze dates, renewal source |
| `Attendance` | member_id, check-in time, source, QR session id, correction reason, staff actor |
| `Streaks` | member_id, rule type, target, current value, best value, last update |
| `NoShowCases` | member_id, threshold date, risk days, owner, status, next action |
| `FollowUps` | case_id, channel, outcome, notes, staff, timestamp, next action date |
| `Payments` | member_id, order id, provider reference, amount, status, verified time |
| `RenewalOrders` | membership_id, selected plan, amount, discount, payment_id, status |
| `AddOns` | gym_id, type, title, price, validity, capacity/stock, active flag |
| `AddOnOrders` | member_id, addon_id, trainer/product, quantity, amount, usage, status |
| `Notifications` | member_id, template, channel, scheduled time, delivery/conversion status |
| `Settings` | gym_id, thresholds, streak rules, renewal timing, policies |
| `AuditLogs` | actor, action, record type, record id, before/after summary, timestamp |

### 8.2 Fitness/Nutrition Tables
```
Exercise         (id, name, category, equipment, primary_muscles, secondary_muscles, difficulty, instructions, media, source_license_metadata)
WorkoutPlan      (gym_id, member_id, template/custom, exercises[])
WorkoutSession   (member_id, plan_id, date, duration)
WorkoutSet       (session_id, exercise_id, set_number, reps, weight, rest_seconds)
PersonalRecord   (member_id, exercise_id, value, achieved_date)
Food             (id, usda_fdc_id, name, brand, serving_size, calories, protein, carbohydrate, fat, fiber, sugars, micronutrients, barcode_mappings, source_provenance)
Meal             (member_id, date, category)
MealItem         (meal_id, food_id, quantity, computed_calories/macros)
BodyWeightLog    (member_id, date, weight, measurements)
HabitCheckin     (member_id, type, date)          -- nutrition-logging streak, water, etc.
Goal             (member_id, type, target_value, target_date)
```

### 8.3 Status Enums
- **Member:** Active, Paused, Expired, Cancelled, Blocked
- **Membership:** Pending, Active, Frozen, Expired, Cancelled
- **NoShowCase:** Open, Contacted, Follow-up due, Returned, Closed
- **Payment:** Created, Pending, Paid, Failed, Refunded, Reversed
- **AddOnOrder:** Pending, Paid, Active, Completed, Cancelled, Refunded
- **Notification:** Scheduled, Sent, Delivered, Failed, Clicked, Converted, Opted out

> **Rule:** never hard-delete financial records, attendance corrections, or follow-up history â€” soft-delete/archive only.

---

## 9. Technology & Commercial-Licensing Strategy

> Consolidated from two independent research passes. **Guiding standard:** no AGPL/GPL/copyleft dependencies (unless you intentionally open-source your own code); no non-commercial or source-available licenses. Prefer MIT / Apache-2.0 / BSD / CC0 / public domain, or commercial APIs whose terms explicitly permit closed-source, multi-tenant, white-label SaaS resale.
>
> **Important caveat that came up repeatedly in research:** a repo's overall code license (e.g. MIT) does **not** automatically cover every asset inside it â€” bundled images, icons, fonts, and datasets can carry separate, stricter licenses. Each must be checked independently.

### 9.1 Executive Conclusion / Recommended Stack

| Module | Recommended Choice | License/Terms | Notes |
|---|---|---|---|
| Exercise data | **wrkout/exercises.json** or **Free Exercise DB** (text/metadata only) | Unlicense (public domain) | Use text schema only; do **not** ship bundled images â€” provenance unresolved (see Â§9.2) |
| Exercise media | Custom/clean-room renders, or **Workout.cool**'s bundled media | MIT (Workout.cool) | Workout.cool was built specifically to avoid the image-licensing problem other projects have |
| Full reference app (optional) | **Lyftr** | MIT | Strongest full-featured MIT candidate (workout + nutrition + barcode + weight tracking) â€” audit dependencies/assets before reuse |
| Nutrition database | **USDA FoodData Central** | CC0 1.0 / public domain | Cleanest possible legal foundation â€” no share-alike obligation at all |
| Barcode scanning | **ZXing** (native/mobile) or **Quagga2** (web/PWA) | Apache-2.0 / MIT | Client-side decode only; server does a simple lookup |
| Food photo recognition | **OpenAI** or **paid Gemini** API (identify food + estimate portion) â†’ resolve nutrition against USDA | Commercial API terms | Never let the model invent the final calorie/macro numbers â€” it identifies, USDA quantifies |
| Gamification/streaks | **Native Django models** (not a third-party engine) | N/A | Simpler, avoids dependency-license risk entirely; MIT engines exist as reference only |

### 9.2 Exercise / Workout Data â€” Detailed Findings

| Resource | License | Commercial Resale Verdict | Notes |
|---|---|---|---|
| `yuhonas/free-exercise-db` (data) | Unlicense | âœ… Safe (text/schema only) | Bundled images have **unresolved provenance** â€” community reports images scraped from ExRx.net. Do not ship the images. |
| `wrkout/exercises.json` | Unlicense | âœ… Safe | Public-domain JSON dataset, safe for full commercial reuse including images per this source |
| **Workout.cool** (full app) | MIT | âœ… Safe | Built specifically to fix the image-licensing gap other projects have; 1,200+ exercises with clean media |
| **Lyftr** (full app) | MIT | âœ… Safe at code level | Full-featured (workout+nutrition+barcode+weight); audit dependencies/assets before shipping wholesale |
| ExerciseDB (open-source repo) | **AGPL-3.0** | âŒ **NOT SAFE** | Network-copyleft â€” would force you to open-source your backend |
| ExerciseDB (commercial API/RapidAPI) | Commercial terms | âš ï¸ Contract required | Public terms don't clearly confirm unrestricted white-label resale â€” get this in writing before relying on it |
| exerciseapi.dev | Commercial API | âœ… Safe (paid tiers) | Free tier: 100 req/day; paid from ~$5/mo |
| **wger** (full app) | AGPL-3.0-or-later (code) + CC-BY-SA (initial data) | âŒ **STRICTLY NOT SAFE** | Both the code and initial dataset carry copyleft/share-alike obligations â€” do not use as a foundation |
| Wingfit | CC-BY-SA-4.0 | âŒ NOT SAFE | Share-alike |
| Gym Tracker | MIT | âœ… Safe | Archived/unmaintained â€” usable as reference only |
| Fit Journal | Apache-2.0 | âœ… Safe (code) | Audit bundled icon assets (credits Flaticon â€” separately licensed) |
| GymLog | MIT | âœ… Safe (code); uses Free Exercise DB data | Same image caveat applies |
| CasettaFit, Pumpel, Treening, Fitly | MIT | âœ… Safe | Smaller reference implementations |

**Recommended approach:** import Free Exercise DB / wrkout JSON **metadata only** into your own `Exercise` model; commission or generate your own visuals (or use Workout.cool's clean-media set) rather than shipping any image set with unclear provenance.

### 9.3 Nutrition Database â€” Detailed Findings

| Resource | License | Verdict | Notes |
|---|---|---|---|
| **USDA FoodData Central** | **CC0 1.0 / public domain** | âœ… **Best foundation found** | No royalties, no share-alike, no attribution requirement (attribution requested, not required). Rate limit ~1,000 req/hour/IP by default; higher limits available on request. |
| Open Food Facts (database) | ODbL 1.0 | âš ï¸ Conditional | Commercial use permitted, but share-alike: a derivative database must also be published under ODbL. If used, isolate it in its own microservice DB, separate from tenant data, to avoid "derivative database" contamination questions. |
| Open Food Facts (product images) | CC-BY-SA | âŒ Not safe under a permissive-only standard | Separate from the database license |
| FatSecret Platform | Commercial ToS | âœ… Safe on Premier Business/Enterprise tier | Free/Basic tier requires visible attribution â€” conflicts with a white-label product unless you're on the tier that waives it. One vendor can cover food search + barcode + image recognition + nutrition. |
| Edamam Food/Nutrition API | Commercial ToS | âœ… Safe on paid commercial tiers only | Lower/basic plans are explicitly marked non-commercial â€” do not use those tiers in production. Roughly $9â€“$399+/mo depending on tier and volume (verify current pricing before committing). |
| Spoonacular | Commercial ToS | âš ï¸ Usable, re-verify current pricing | Freemium + paid tiers; don't rely on old cached pricing figures. |
| Nutritionix | Commercial/enterprise | âš ï¸ Contract required | Get written confirmation the agreement covers multi-tenant, white-label, commercial SaaS resale before depending on it. |

**Recommended approach:** build your own normalized `Food` table seeded from USDA FoodData Central (id, name, brand, serving size, calories, macros, micronutrients, provenance), with your own barcode-mapping layer on top. Treat any commercial API as a supplementary/branded-food layer, gated behind the correct paid tier.

### 9.4 Barcode Scanning â€” Detailed Findings

| Resource | License | Verdict |
|---|---|---|
| **ZXing** | Apache-2.0 | âœ… Safe â€” best for native Android/iOS |
| **Quagga2** | MIT | âœ… Safe â€” best for web/PWA (maintained fork of QuaggaJS) |
| QuaggaJS | MIT | âœ… Safe â€” Quagga2 is the more actively maintained successor |
| Google ML Kit Barcode Scanning | Google API/ML terms (not pure OSS) | âœ… Generally safe commercially, but it's a vendor ToS, not a permissive license â€” ZXing is legally cleaner if you want to avoid vendor-term dependencies |

**Pipeline:** camera â†’ client-side barcode decode â†’ UPC/EAN/GTIN string â†’ server-side lookup against your `Food` table. This keeps image data off your servers entirely and turns the backend cost into a cheap key lookup.

### 9.5 Food Photo Recognition â€” Detailed Findings

**Self-hosted models** (Hugging Face, Food-101-based):
| Model | License | Verdict |
|---|---|---|
| Food-101 fine-tuned ViT/ResNet variants | MIT / Apache-2.0 (model weights) | âœ… Model license is safe; âš ï¸ underlying Food-101 training-dataset provenance should be separately audited before treating the whole pipeline as fully cleared |

**Commercial vision APIs:**
| Provider | Verdict | Notes |
|---|---|---|
| LogMeal AI API | âœ… Safe (commercial ToS) | 30-day/200-query free trial; paid from ~â‚¬28/mo |
| Passio.ai (Nutrition AI SDK) | âœ… Safe (commercial ToS) | Enterprise pricing by MAU/scan volume |
| FatSecret Image Recognition | âœ… Safe on Premier Business/Enterprise | Same vendor as food DB/barcode â€” one contract can cover everything |
| Edamam Vision | âš ï¸ Contract/pricing verification required | Capability exists; public pricing not fully transparent |

**General-purpose vision LLMs (recommended primary approach):**
| Provider | Verdict | Approx. cost | Notes |
|---|---|---|---|
| **OpenAI (GPT-4o-mini class)** | âœ… Safe â€” commercial Services Agreement covers SaaS/closed-source use | ~$0.00015â€“$0.0003/image | No standing free production tier |
| **Google Gemini (paid tier)** | âœ… Safe under Gemini API terms | As low as ~$0.00002/image on Flash-class models | Do **not** build the production business on the free tier â€” treat paid as the baseline |
| **Anthropic Claude** | âš ï¸ Likely safe, but verify current exact commercial terms before relying on it as a primary dependency | ~$0.00025â€“$0.0008/image (Haiku-class) | Supports image input |

**Recommended architecture (repeated because it's the key risk-mitigation point):**
```
Photo â†’ Vision LLM identifies food items + estimates portion (JSON output)
      â†’ Backend matches identified food string against your USDA-seeded Food table
      â†’ Nutrition numbers come from USDA data, NOT from the model's guess
      â†’ Member confirms/edits before the meal is saved
```
Never let the vision model be the sole source of the final calorie/macro numbers â€” use it purely as an identification/perception layer, and resolve actual nutrition values against your authoritative database.

### 9.6 Gamification / Streaks

| Resource | License | Verdict |
|---|---|---|
| django-gamification (Matt Egan) | BSD-3-Clause | âœ… Safe |
| django-gamification (Stephen Jones) | MIT | âœ… Safe |
| ActiDoo Gamification Engine | MIT (core) | âœ… Code license safe; âš ï¸ dependency tree includes non-MIT/Apache licenses â€” audit before importing wholesale |
| Gamification Server | MIT | âœ… Safe, but old â€” reference architecture only |
| Streak Calendar | MIT | âœ… Safe for UI patterns |

**Recommendation:** implement streaks/XP/achievements natively as Django ORM models rather than importing an external engine â€” it's a simple date-interval calculation (same-day-gap â†’ increment; gap > 1 day â†’ reset current streak, preserve best streak) and avoids all dependency-license risk. Make XP/achievement rules **tenant-configurable** so each gym can run its own program. Example XP table:

```
WorkoutCompleted       +100 XP
MealLogged              +20 XP
DailyCheckin            +10 XP
GoalCompleted          +250 XP
PersonalRecord         +150 XP
7-Day Streak           +300 XP
30-Day Streak         +1500 XP
```

### 9.7 Master Safe / Not-Safe Matrix

| Item | License / Terms | Closed-source commercial SaaS? |
|---|---|---|
| Free Exercise DB â€” data | Unlicense | âœ… YES |
| Free Exercise DB â€” images | Provenance unclear | âš ï¸ NOT CLEARED |
| wrkout/exercises.json | Unlicense | âœ… YES |
| Workout.cool | MIT | âœ… YES |
| Lyftr | MIT | âœ… YES (audit deps/assets) |
| Gym Tracker / Fit Journal / GymLog / CasettaFit / Pumpel / Treening / Fitly | MIT / Apache-2.0 | âœ… YES (audit bundled assets) |
| wger (code + initial data) | AGPL-3.0 + CC-BY-SA | âŒ **NO** |
| Wingfit | CC-BY-SA-4.0 | âŒ NO |
| ExerciseDB open-source code | AGPL-3.0 | âŒ NO |
| ExerciseDB commercial API | Commercial contract | âš ï¸ Contract required |
| exerciseapi.dev | Commercial API | âœ… YES (paid tiers) |
| USDA FoodData Central | CC0/public domain | âœ… **YES â€” strongest option overall** |
| Open Food Facts (database) | ODbL | âš ï¸ Yes, with share-alike obligations |
| Open Food Facts (images) | CC-BY-SA | âŒ NO |
| FatSecret Basic/free | Free, limited, attribution required | âš ï¸ Limited â€” not for white-label |
| FatSecret Premier Business | Commercial agreement | âœ… YES |
| Edamam (basic/non-commercial plans) | Non-commercial | âŒ NO |
| Edamam (commercial tiers) | Commercial | âœ… YES |
| Spoonacular / Nutritionix | Commercial | âš ï¸ Re-verify current terms/pricing directly |
| ZXing | Apache-2.0 | âœ… YES |
| QuaggaJS / Quagga2 | MIT | âœ… YES |
| Google ML Kit Barcode | Vendor ToS | âœ… Generally yes |
| Food-101 MIT/Apache models | MIT/Apache-2.0 | âœ… Model license safe; âš ï¸ dataset provenance |
| OpenAI API | Commercial Services Agreement | âœ… YES |
| Gemini paid API | Gemini API Terms | âœ… YES |
| Gemini free tier | Free-tier restrictions | âš ï¸ Don't build production business on it |
| Anthropic API | Commercial terms | âš ï¸ Verify current exact terms |
| LogMeal / Passio.ai / FatSecret vision | Commercial ToS | âœ… YES (paid tiers) |
| django-gamification (both variants) | BSD-3 / MIT | âœ… YES |
| ActiDoo Gamification Engine | MIT core | âœ… Code; âš ï¸ dependency audit |
| Streak Calendar | MIT | âœ… YES |

### 9.8 Legal/Process Checklist Before Shipping Any Dependency
- [ ] Store the exact upstream repo URL + commit/tag used
- [ ] Store a copy of the exact LICENSE file at time of import
- [ ] Generate a Software Bill of Materials (SBOM)
- [ ] Audit transitive dependencies for GPL/AGPL/LGPL/other copyleft terms
- [ ] Audit bundled images/GIFs/icons/fonts/videos **separately** from code
- [ ] Record license + provenance of every imported dataset
- [ ] Keep attribution/NOTICE files where Apache/MIT/etc. require them
- [ ] Never assume an MIT repo's third-party assets are also MIT
- [ ] For commercial APIs, obtain and archive the exact contract terms covering multi-tenant white-label SaaS resale
- [ ] Get written vendor confirmation wherever public docs are ambiguous about caching/redistribution/white-label resale
- [ ] Keep a versioned source/provenance record for all imported food/exercise data
- [ ] Do a tenant-isolation/security review (this is a multi-tenant system)
- [ ] Separately review privacy/data-protection requirements for health/fitness data and uploaded food photos

> **Disclaimer:** this section is a licensing/commercial-use research summary, not legal advice. Before shipping a commercial product, verify the exact license/version/contract that applies to each dependency, ideally with counsel review for anything material.

---

## 10. Build Plan

### 10.1 Seven-Day Prototype
| Day | Focus |
|---|---|
| 1 | Gym/tenant setup + data model (profile, plans, prices, staff, statuses, sample data) |
| 2 | Member + membership (profile, plan, expiry, pause, history) |
| 3 | QR attendance (session validity, duplicate/expired states, assisted check-in) |
| 4 | Red list + follow-up (inactivity calc, filters, outcomes, resolution) |
| 5 | Streak + renewal (weekly goal, payment states, receipt) |
| 6 | Add-ons + owner dashboard (PT/diet/product cards, order status, metrics) |
| 7 | Failure-state testing â€” use simulated payments until a real provider is wired up |

### 10.2 Fitness/Nutrition Module â€” Suggested Follow-on Sprint
| Sprint | Focus |
|---|---|
| 1 | Import USDA FoodData Central â†’ normalized `Food` model; barcode mapping table |
| 2 | Barcode scan flow (Quagga2/ZXing) + manual food search/log |
| 3 | Photo-scan flow (vision LLM â†’ USDA resolution â†’ confirm/edit â†’ save) |
| 4 | Goals + daily/weekly nutrition charts |
| 5 | Exercise library import (Free Exercise DB/wrkout metadata) + workout plan builder |
| 6 | Workout session logging, PRs, progress charts |
| 7 | Native streak/XP/achievement system, tenant-configurable |

### 10.3 Thirty-Day Pilot
- **Baseline:** active paid members, avg weekly check-ins, members absent 10+ days, current renewal rate, avg renewal delay, monthly PT/add-on sales, current follow-up method + response rate.
- **Week 1:** import verified real members, train front desk on QR/assisted check-in, verify attendance accuracy nightly â€” no marketing messages yet.
- **Week 2:** activate red list, contact a manageable daily batch, log every outcome, fix pause/expiry data issues immediately.
- **Week 3:** start renewal reminders, verify payment/receipt states, surface only 2â€“3 relevant add-ons, track PT *utilisation* not just sales.
- **Week 4 â€” evaluate:** red-list return rate, top churn reasons, on-time renewal improvement, payment-failure recovery, streak comprehension, add-on usage after purchase, whether staff can run it without developer help.

---

## 11. QA / Failure-State Test Checklist
- [ ] Duplicate QR scan blocked without losing legitimate attendance
- [ ] Expired membership blocks check-in appropriately
- [ ] Approved pause suspends red-list eligibility correctly
- [ ] Offline check-in syncs with correct audit timestamp
- [ ] Wrong/missing expiry date is flagged, not silently accepted
- [ ] Failed payment clearly distinguished from pending
- [ ] Duplicate payment webhook does not double-charge or double-extend
- [ ] Refund/reversal correctly rolls back membership state
- [ ] Trainer double-booking is prevented/flagged
- [ ] Out-of-stock product cannot be purchased
- [ ] Notification opt-out respected across all channels
- [ ] Assisted check-in requires staff identity + reason, and is logged
- [ ] Red list correctly excludes paused/frozen/expired members
- [ ] Owner dashboard numbers reconcile against underlying records
- [ ] Barcode scan correctly rejects unrecognized/malformed codes
- [ ] Photo-scan flow degrades gracefully when vision API is unavailable (manual fallback)
- [ ] Nutrition numbers always resolve from USDA data, never solely from AI-model output

---

## 12. Discovery Questions (per-gym, before onboarding)
1. Active / paused / expired member counts today?
2. Current attendance method (register, card, biometric, app)?
3. Absence threshold that should trigger first follow-up?
4. Allowed pause reasons and who approves them?
5. All plans, prices, discounts, freeze rules?
6. How many days before expiry should renewal reminders start?
7. Which payment provider / receipt process is used?
8. Who calls red-list members and logs outcomes?
9. Which streak rule is fair for this gym's schedules?
10. How do PT packages allocate sessions/validity/trainer?
11. Who delivers qualified diet advice?
12. Who manages supplement stock, invoicing, returns, expiry?
13. What are the 5 numbers the owner needs every single day?
14. How was member communication consent captured?
15. What is the pilot's measurable definition of success?
16. Does this gym want the fitness/nutrition module enabled, or retention-only?

---

## 13. Owner Pitch & Objection Handling

**30-second pitch:** *"This isn't just a QR attendance app. Any active member who hasn't shown up in 10 days automatically lands on a call list. Members see their own attendance streak. Renewal options and payment show up seven days before expiry. PT, diet, and supplements are offered transparently in the same app â€” and now members can also track workouts and calories daily, so they open the app even on days they don't come in. We measure attendance accuracy, returned members, and on-time renewals over a 30-day pilot before scaling further."*

**"Register already hai":** Register stores attendance; it doesn't generate a daily risk list, follow-up outcomes, a renewal pipeline, or measurable recovery automatically.

**"Members app use nahi karenge":** The core repeated action (QR check-in) is minimal friction. Renewal, streaks, and now fitness/nutrition logging build around that same habit. Pilot adoption is measured, not assumed.

**"Revenue guarantee doge?":** No â€” the app provides visibility and workflow. Results depend on owner follow-through, gym experience, pricing, and member behavior. We agree on measurable pilot metrics up front.

---

## 14. Definition of Done (MVP)
The MVP is complete when the full operating loop works end-to-end for one real gym:
> Record attendance â†’ detect risk â†’ contact early â†’ bring the member back â†’ collect renewal on time â†’ deliver useful add-ons â†’ show the owner what worked.

The fitness/nutrition module is a **Phase 1.5 differentiator**, not a blocker for the retention-loop MVP â€” it can ship in the follow-on sprint (Â§10.2) once the core loop is proven.

---

## 15. Open Decisions Needed Before Coding Starts
- [ ] Confirm final tech stack: Django backend (established) + frontend choice (native/React Native/Flutter/web) for the member-facing app
- [ ] Pick the exercise-data source: `wrkout/exercises.json` vs. Free Exercise DB (metadata-only) vs. forking Workout.cool vs. Lyftr as a full starting codebase
- [ ] Decide whether to build an exercise-media library in-house or license/commission one
- [ ] Choose the vision-LLM vendor for photo-scan (OpenAI vs. Gemini) and confirm current commercial terms directly with the vendor before committing
- [ ] Decide if/when to add a commercial nutrition API (FatSecret/Edamam) on top of USDA data for branded/restaurant food coverage, and which paid tier is required
- [ ] Confirm payment gateway (per your Matrix Sols UPI/crypto integration context) and its webhook/idempotency handling
- [ ] Decide rollout order: retention-loop MVP first (as originally planned) vs. bundling the fitness/nutrition module into the first pilot
- [ ] Set up the legal/licensing tracking process from Â§9.8 as an actual repo file (e.g. `THIRD_PARTY_LICENSES.md` + SBOM) before any external code/data is imported

---

# PART II â€” Business Model, Pricing, Referral Program & Platform Architecture

*(v2 addendum. Builds on and does not replace Part I, Â§0â€“Â§15 above â€” same core loop, same data model, same modules. This part defines who pays for what, how much, and how the platform stays stable as it grows across three customer types on one shared codebase.)*

## 16. Business Model â€” Three Product Surfaces

Three customer segments, one shared engine (Â§8 data model, Â§3â€“Â§4 feature modules), never colliding at the data or billing layer:

| Surface | Who | What they get | Billing |
|---|---|---|---|
| **A. Kynvelo Direct (B2C)** | Individual fitness users, no gym affiliation | The member-facing app only: workout tracking, food/calorie logging + scanning, goals, streaks | Personal subscription (monthly/quarterly/annual) |
| **B. Kynvelo for Gyms (B2B)** | Gym owners | Full retention CRM + a branded member app for their own members, staff accounts, owner dashboard | Gym subscription + per-member scaling |
| **C. Referral Program** | Existing gym owners & trainers | Commission for bringing in new paying gyms | Revenue-share payout, not a customer-facing product |

**Load-bearing architectural rule for all three:** every account belongs to exactly one tenant. Surface A's individual users are modeled as members of a reserved system tenant (`tenant_id = "kynvelo-direct"`) rather than as a special case â€” so the same `Members`, `WorkoutSession`, `Meal`, etc. tables and the same fitness/nutrition module code (Â§4) serve both A and B members with no second codepath. Detail in Â§18.

---

## 17. Pricing â€” Recommendations

*(Starting points to validate against your real costs â€” vision-API calls, SMS/WhatsApp, payment-gateway fees â€” before finalizing. INR, aimed at the Indian market implied by the existing Hinglish templates in Â§7.)*

### 17.1 Kynvelo Direct (B2C individual app)

| Plan | Monthly | Quarterly | Annual | Included |
|---|---|---|---|---|
| **Free** | â‚¹0 | â€” | â€” | Manual food/workout logging, 1 active goal, 7-day history |
| **Starter** | â‚¹99 | â‚¹249 (â€“16%) | â‚¹899 (â€“24%) | Full logging, barcode scan, unlimited history, streaks |
| **Pro** | â‚¹299 | â‚¹749 (â€“16%) | â‚¹2,499 (â€“30%) | + AI photo food-scan, macro/PR analytics, workout plan builder, data export |

A free tier costs you almost nothing (no vision-API calls) and is standard for consumer-app acquisition. Keep the **AI photo food-scan** â€” your one feature with a real per-use cost, since it calls a paid vision LLM â€” behind Pro only. That single line directly protects margin.

### 17.2 Kynvelo for Gyms (B2B)

| Plan | Monthly | Included members | Modules included |
|---|---|---|---|
| **Starter** | â‚¹2,999/mo (â‚¹28,999/yr, â€“19%) | 100 | Core, Pulse, Guard, Flow, Pay â€” the retention loop only |
| **Growth** | â‚¹5,999/mo (â‚¹57,999/yr, â€“19%) | 100 | + Coach, Fuel, Metrics, white-label branding |
| **Enterprise** | Custom | Custom | Multi-location, SSO, dedicated support, dedicated app-store listing |

**Overage / additional members**, on top of the 100 included in Starter/Growth:

| Block | Price |
|---|---|
| +50 members | â‚¹1,499/mo |
| +100 members | â‚¹2,799/mo (cheaper per-head than the 50-block, rewards scale) |
| 500+ members | negotiate Enterprise per-member rate (roughly â‚¹15â€“20/member) |

**Why blocks, not pure per-member metering:** your own payment-integrity rules (Â§3.3 â€” never extend on "Initiated," only on verified "Paid," idempotent webhooks) are far simpler to guarantee against a handful of fixed plan/add-on SKUs than against a continuously-recalculated per-head bill. Blocks also make the gym owner's invoice predictable, which matters to them more than shaving a few hundred rupees.

**On "one-time payment" plans:** you floated this as an option. Recommendation â€” **don't sell a true lifetime/one-time plan.** Hosting, vision-API, SMS/WhatsApp, and payment-gateway costs are all recurring per active gym; a one-time fee eventually turns into a permanently loss-making account you can't walk back. Two alternatives that still front-load cash without that risk:
- A **one-time onboarding/setup fee** (â‚¹5,000â€“15,000, waived on annual prepay) for white-label asset setup, staff training, and data migration â€” a real one-time cost on your side, so fair to charge once.
- The **annual prepay discount** already shown above (â€“19%) â€” gets you cash upfront with no open-ended commitment.

### 17.3 Referral Program

- **Rate:** 20% of the referred gym's recurring plan fee (Starter/Growth, not member add-on blocks), paid monthly.
- **Duration cap:** up to 6 months per referred gym.
- **Value cap:** â‚¹10,000 total per referred gym.
- Payout stops at **whichever cap hits first** â€” merges both ideas you floated (a time limit and a currency limit) into one rule instead of two competing ones.
- **Eligibility:** the referred gym's most recent payment must have cleared (not pending/failed/refunded) for that month's commission to release â€” reuses the existing verified-payment logic from Â§3.3/Â§8.1, no separate payment-integrity system needed.
- **Attribution â€” a code, not a link, per your spec:** an optional **Referral Code** field at gym-owner signup (the referrer's phone number, or a generated 6-character code) attaches the new gym to that referrer. A shareable link that pre-fills the same code is generated too, purely as a convenience â€” the code stays the real mechanism.
- **Late-attribution grace window:** a forgotten code can be entered up to **7 days after signup** (self-service), or added indefinitely by a Developer/Support admin (Â§20) with an audit-log entry.
- **New tables:** `ReferralPartner` (user_id, code, created_at) and `ReferralPayout` (referrer_id, referred_gym_id, month, amount, running_total, status) â€” `running_total` is what enforces the â‚¹10,000 cap.

---

## 18. Multi-Tenancy & White-Label Architecture

Extends Â§2 (Roles) and Â§8 (Data Model) â€” same `gym_id`-scoped tenancy rule, now applied across three tenant *kinds*:

| Tenant kind | `gym_id` value | Branding | App experience |
|---|---|---|---|
| Kynvelo Direct | reserved system tenant | Kynvelo's own brand | Shared Kynvelo app |
| Standard gym (Starter/Growth) | per-gym UUID | Gym's logo/colors/name via `Settings.branding` (already in Â§8.1) | **Shared multi-tenant app**, re-skinned dynamically at login (gym code or subdomain selects the tenant, then the UI re-themes) |
| Enterprise gym | per-gym UUID | Full white-label | **Separate app-store listing** â€” own package ID, own Apple/Google submission â€” same backend, same codebase, distinct build target |

**Recommendation:** default every gym to the shared, dynamically-themed app â€” no extra app-store review per gym, and it still feels fully "their app" once a member logs in. Reserve a genuinely separate app-store listing for **Enterprise only**; a separate listing is real ongoing overhead (review cycles, two release pipelines, two crash-report streams) that isn't worth it below that tier.

**Non-collision guarantee, concretely:** every query in every module is scoped by `gym_id` at the ORM level â€” a shared base queryset/manager, not a per-view filter someone has to remember to add. That's what actually prevents Gym A's data ever leaking into Gym B's dashboard, more than any UI-level separation does.

---

## 19. Fault Isolation â€” "One Broken Feature Should Never Break the Whole App"

Given the hardware (2 vCPU / 12 GB RAM), full microservices-on-Kubernetes would spend more of that RAM on orchestration than on the app itself â€” not recommended at this scale. Instead:

**Modular monolith, not microservices.** One Django codebase, one deploy â€” but hard module boundaries mirroring your own Â§4 module list (Core, Pulse, Guard, Flow, Pay, Coach, Fuel, Metrics = one Django app each, own models/views/permissions, no cross-module imports except through a defined internal API). Almost all the isolation benefit of microservices, none of the operational cost of running eight services on a 2-core box.

**Where isolation has to be real:**
1. **Per-request:** each module's endpoints are wrapped so an exception in one (e.g. Fuel's photo-scanner failing because the vision API is down) returns a clean error for *that* request only â€” it can't 500 an unrelated request like a Pulse check-in, since they're already separate HTTP requests. The discipline: modules talk through signals/events, not direct function calls whose failures can propagate in-process.
2. **Background jobs:** Celery with **separate queues per module** (`queue=flow`, `queue=pay`, `queue=fuel`, â€¦). If the Fuel queue backs up because the vision API is slow, the Pay queue (renewal reminders, payment webhooks) keeps moving â€” the single highest-value isolation move here, since Â§6's automations must never stall.
3. **Feature flags, not code deploys, to disable a broken module.** A `FeatureFlag(gym_id, module_key, enabled)` table (global default + per-tenant override), checked by a lightweight middleware/decorator at every module's entry points. This is what lets you â€” or later, a gym owner for their own tenant â€” turn off just "Fuel" for one gym without touching anyone else and without a deploy. Directly answers the "even the minute features" toggle requirement.
4. **Circuit breaker on external calls.** Wrap the vision-LLM call, the payment-gateway call, and the SMS/WhatsApp call each in a simple failure-count breaker: after N consecutive failures, stop calling that provider for a cooldown window and degrade gracefully (Fuel's photo-scan falls back to manual entry â€” already required by your own Â§11 QA checklist) instead of piling up slow/failing requests.

**Upgrading one module without downtime for the rest:** since modules don't share in-process state, a deploy touching only Fuel's code still requires restarting the one Django process â€” on a single box that brief restart can't be fully avoided. If zero-downtime deploys become a hard requirement later, that's the point to add a second, smaller VPS behind a load balancer and roll deploys between the two â€” not needed on day one.

---

## 20. Roles & Permissions (extends Â§2)

The original Â§2 covered gym-level roles well. Adding the platform-level split requested:

| Role | Scope | Can do | Cannot do |
|---|---|---|---|
| **Platform Owner** (you) | Cross-tenant | Everything: billing, tenant lifecycle, refunds, referral payouts, feature flags, impersonation | â€” |
| **Platform Developer/Support** | Cross-tenant | Impersonate for debugging, toggle feature flags, view logs/audit trail, resolve support tickets | Move money â€” no refund/payout/billing access |
| **Gym Owner** | Own tenant | Full config, staff, billing for their own gym; sees their own referral dashboard if applicable | Access other tenants |
| **Gym Staff â€” Receptionist** | Own tenant, operational | Check-in, red-list follow-up, membership activation | Billing/config |
| **Gym Staff â€” Trainer** | Own tenant, assigned members | Programming, scheduling, progress notes | Billing/config, other trainers' clients |
| **Gym Staff â€” Dietitian** | Own tenant, assigned members | Meal plans, nutrition targets for assigned members only | Billing/config, workout programming |
| **Gym Member** | Self | Own data, check-in, renew, log workouts/meals | Anyone else's data |
| **Referral Partner** | Own referrals only | View their own referral dashboard (conversions, running payout total) | Anyone else's referral data |

Splitting **Platform Developer/Support** from **Platform Owner** is the one gap worth flagging: standard least-privilege practice for anyone doing day-to-day debugging/impersonation who shouldn't also be able to move money â€” cheaper to build in from day one than to retrofit once more people hold platform-level logins.

---

## 21. Hosting Plan for the Stated Instance (2 vCPU / 12 GB RAM / 200 GB SSD)

| Component | Choice | Why |
|---|---|---|
| Reverse proxy / TLS | Nginx (or Caddy for auto-TLS) | Lightweight, terminates HTTPS on your purchased domain |
| App server | Gunicorn/Uvicorn behind Nginx, 2â€“3 workers | Matches the 2 vCPU â€” more workers than cores just adds context-switch overhead |
| Database | PostgreSQL | JSONB support helps per-tenant `Settings`/branding config; better multi-tenant query planning than MySQL at this scale |
| Cache / queue broker | Redis | Both Celery broker and cache in one process â€” don't run two Redis instances, RAM is tight |
| Background jobs | Celery, multiple queues (Â§19) | One worker process, concurrency tuned low (2â€“4) to leave RAM for Postgres |
| Containers | Docker Compose, not Kubernetes | Full k8s control-plane overhead isn't worth it on a single 12 GB box; Compose gives the same "each service in its own container" isolation without the tax |
| Media storage | **Off-box** â€” an S3-compatible bucket (Cloudflare R2 / Backblaze B2) for food photos, progress photos, receipts | 200 GB fills fast with user-uploaded images if kept on-disk; off-box storage also makes backups and any future second server trivial |
| Backups | Nightly `pg_dump` to the same object-storage bucket | Cheap, decoupled from the single VPS's own disk |

**Rough 12 GB allocation:** Postgres ~3â€“4 GB, Redis ~0.5â€“1 GB, Django/Gunicorn ~2â€“3 GB, Celery worker ~1â€“2 GB, OS/Nginx/headroom ~2â€“3 GB. Comfortably fits a pilot gym plus a modest Kynvelo Direct user base â€” the vision-LLM and SMS/WhatsApp calls are external, not local load, so they don't eat into this budget.

**When to upgrade:** watch (1) Postgres connection count once several gym dashboards are polling at once, and (2) Celery queue depth as photo-scan volume grows â€” both show up as slow response time well before the box actually falls over, so basic uptime/latency monitoring from day one (even a free tier like UptimeRobot) tells you when it's time to move up rather than guessing.

---

## 22. New / Updated Data Model (extends Â§8)

| Table | Key fields |
|---|---|
| `SubscriptionPlan` | plan_type (`b2c`/`b2b`), tier, price, billing_cycle, included_members (b2b only), module_entitlements |
| `MemberBlockAddon` | gym_id, block_size, price, active_from |
| `FeatureFlag` | gym_id (nullable = global default), module_key, enabled, updated_by, updated_at |
| `ReferralPartner` | user_id, code, created_at |
| `ReferralPayout` | referrer_id, referred_gym_id, month, amount, running_total, status |
| `PlatformAdminUser` | user_id, role (`owner` / `developer_support`), audit_log_ref |
| `TenantBranding` (extends existing `Gyms.branding`) | logo_url, primary_color, app_display_name, dedicated_app flag |

---

## 23. Open Decisions — Updated

Carried over from §15, narrowed by the decisions above:

- [x] ~~Tech stack~~ — Django + Postgres + Redis/Celery on Docker Compose, confirmed for the current hosting instance (§21)
- [x] ~~Payment gateway~~ — via Matrix Sols UPI/crypto integration, webhook idempotency per §3.3, now also covering referral payout triggers (§17.3)
- [ ] Confirm final B2C/B2B price points against real vision-API and SMS/WhatsApp per-message costs before launch — §17 is a starting point, not final
- [ ] Set the exact Enterprise-tier per-member overage rate once you have 2–3 large-gym conversations to benchmark against
- [ ] Pick the object-storage provider (R2 vs B2 vs other) for §21 media offload
- [ ] Decide whether Dietitian ships as a distinct role from day one, or as "Trainer with a nutrition flag" in the MVP with its own role added later — §20 recommends distinct from day one, but this affects onboarding UI scope
- [ ] Everything else in the original §15 not addressed above remains open (exercise data source, exercise media, vision-LLM vendor)


---

# PART III — The Complete 30-Phase Web & SaaS Building & Verification System (§24–§54)

*(Integrated master checklist based on complete_web_saas_vibe_coding_checklist.md. Comprises 30 distinct engineering and production phases with 400 granular verification points. Every feature built in Kynvelo MUST be planned, verified, and audited against this operational framework.)*

# Complete Web & SaaS Building Checklist

A practical checklist for building websites, web apps, dashboards, SaaS products and similar projects with AI coding or vibe coding.

This checklist is intentionally practical. The goal is not to turn every project into a giant enterprise system. The goal is to make sure the important things that are commonly forgotten during AI assisted development are checked before launch.

Use only the sections that apply to your project. A simple portfolio website does not need the same infrastructure as a multi user SaaS.

---

## How to Use This Checklist

Do not give the entire checklist to an AI agent and tell it to change everything at once.

A safer workflow is:

1. Understand the project
2. Inspect the existing code
3. Plan the work
4. Implement one phase at a time
5. Test after every important phase
6. Review the final project
7. Deploy only after the final checks

The most important rule is:

> Do not change working systems just for the sake of optimization.

Before adding a new library, architecture pattern, database, cache, authentication system or deployment service, check whether the project actually needs it.

---

## PHASE 1 — Understand the Project

Before coding, clearly define what you are building.

**Product**
- What does the product do?
- Who is it for?
- What is the main problem it solves?
- What is the primary user journey?
- What are the most important features?
- What is required for the first release?
- What is intentionally out of scope?

**Users**
- Guest user
- Registered user
- Admin
- Other roles if actually required

**Features**

For every important feature, define:
- Normal flow
- Loading state
- Empty state
- Error state
- Permission denied state
- Mobile behavior
- What happens if the user refreshes?
- What happens if the request fails?

Do this before writing a lot of code. AI agents are much less likely to create inconsistent behavior when the expected behavior is already clear.

**Prompt — Project Understanding**

```
Before making any code changes, understand this project completely.

First inspect the existing project structure, technologies, routes, components, APIs, database, authentication, configuration and tests.

Understand what the product is supposed to do and identify the main user flows.

Do not start rewriting the project.

Create a practical implementation plan based on the existing codebase.

Separate the plan into:
1. Required changes
2. Optional improvements
3. Risks
4. Things that should not be changed

Prefer the simplest solution that fits the current project.

Do not introduce unnecessary frameworks, libraries, services or architecture changes.

After the plan is ready, verify that it can be implemented without breaking existing functionality.
```

---

## PHASE 2 — Project Structure and Code Quality

Before adding more features, make sure the codebase is understandable.

- Clear folder structure
- Components are reasonably reusable
- Business logic is not duplicated everywhere
- API logic is not mixed randomly into UI components
- Environment variables are handled properly
- No obvious temporary files
- No old test files that are no longer relevant
- No unused dependencies where easy to identify
- No duplicate components doing the same job
- No broken imports
- No unnecessary comments explaining obvious code
- Naming is consistent
- Formatting is consistent
- Type checking works if TypeScript is used
- Linting works if configured

Do not perform a massive cleanup just because the code "looks messy". Remove things only when their purpose is understood.

**Prompt — Safe Code Cleanup**

```
Perform a careful code quality review of the existing project.

First understand how the project works.

Find obvious dead code, duplicate logic, unused imports, unused dependencies, inconsistent naming and unnecessary temporary files.

Do not rewrite working systems unnecessarily.

Do not change application behavior.

Do not remove code simply because it looks unused unless you can verify that it is actually unused.

Keep the current architecture unless there is a clear technical reason to improve it.

After cleanup, run the existing checks and make sure the project still works exactly as before.
```

---

## PHASE 3 — UI and UX

A functional application can still feel broken if the user experience is incomplete.

For each page check:
- Desktop layout
- Tablet layout
- Mobile layout
- Navigation
- Loading state
- Empty state
- Error state
- Success state
- Disabled state
- Form validation
- Confirmation for destructive actions
- Clear error messages
- Consistent buttons
- Consistent spacing
- Consistent typography
- Consistent icons
- Keyboard usability
- Focus states
- Touch friendly controls

Do not make every screen visually different. Reuse the same design system and components.

---

## PHASE 4 — Responsive Design

Never test only the desktop screen.

Check common widths such as:
- Small phone
- Large phone
- Tablet
- Laptop
- Large desktop

Also check:
- Navigation does not overflow
- Tables remain usable
- Modals fit on small screens
- Forms fit correctly
- Buttons do not become impossible to tap
- Text does not overlap
- Images do not break the layout
- Horizontal scrolling is intentional only when necessary

---

## PHASE 5 — Database

If the application uses a database:
- Tables or collections are planned
- Relationships are correct
- Important fields have validation
- Unique fields are actually unique
- Important queries have suitable indexes
- Created and updated timestamps exist where useful
- Delete behavior is understood
- Migrations are tracked
- Seed data is separate from production data
- Backups exist for production
- Restore process is tested

For SaaS:
- Every tenant or organization is properly identified
- User data belongs to the correct tenant
- Queries always use the correct tenant scope
- Users cannot access another tenant's records

You do not need a complicated database architecture to have a good SaaS. A clean relational database with proper constraints and authorization is often enough.

**Prompt — Database Review**

```
Audit the current database implementation without unnecessarily redesigning it.

Check schema structure, relationships, validation, unique constraints, indexes, migrations and important queries.

Identify only practical improvements that are justified by the current application.

Pay special attention to data ownership and tenant isolation if this is a multi user or multi tenant application.

Do not delete production data.

Do not create destructive migrations.

For every database change, verify its effect on existing features.

After changes, run the relevant tests and verify that the application still works.
```

---

## PHASE 6 — Authentication

If users can log in, check:
- Registration
- Login
- Logout
- Password reset
- Email verification if needed
- Session expiration
- Session invalidation
- Secure cookies if cookies are used
- Brute force protection
- Rate limiting on login
- Rate limiting on password reset
- Secure password handling
- MFA only if needed

If JWT is used:
- Token expiration
- Secure token handling
- Refresh token strategy where needed
- Token revocation strategy where needed
- Proper signature verification
- No secrets inside tokens
- The server does not blindly trust client supplied identity information

Do not add JWT just because it sounds modern. Use the authentication approach that fits the application.

---

## PHASE 7 — Authorization

Authentication answers: **"Who are you?"**
Authorization answers: **"What are you allowed to do?"**

This is one of the most commonly forgotten parts of AI generated applications.

Check:
- Every protected page is protected
- Every protected API is protected
- Users can access only their own data
- Admin actions require admin permission
- Role checks happen on the server
- Ownership checks happen on the server
- Tenant checks happen on the server
- Hiding a button is not treated as security

Test negative cases too:
- User tries to access another user's record
- Normal user tries an admin endpoint
- User changes an ID in the request
- User calls an API directly without using the UI

**Prompt — Authentication and Authorization**

```
Audit authentication and authorization in the existing application.

First identify the current authentication architecture.

Check login, logout, registration, password reset, session handling, token handling, cookies, role checks and protected routes.

Then verify authorization for every important resource and API.

The frontend must never be treated as the security boundary.

The server must verify identity, permissions and ownership.

For multi tenant systems, verify that one tenant cannot access another tenant's data.

Test both allowed and denied cases.

Do not replace the current authentication system unless there is a real security or architectural reason.

Do not weaken security to make a feature easier to implement.
```

---

## PHASE 8 — API

If your project has APIs:
- Request validation
- Response validation where useful
- Authentication
- Authorization
- Clear error responses
- Pagination for large lists
- Search limits
- File upload limits
- Request size limits
- Rate limiting
- Timeout handling
- Retry behavior where appropriate
- Idempotency for operations that may be retried
- API documentation for important APIs

Remember that the API must remain secure even when someone completely bypasses the frontend.

---

## PHASE 9 — Input Validation

Treat all external input as untrusted.

Check:
- Forms
- Query parameters
- URL parameters
- Request bodies
- Headers where relevant
- Uploaded files
- Webhooks
- External API responses

Validate:
- Type
- Length
- Allowed values
- Format
- Size

Protect against common problems such as:
- SQL injection
- XSS
- Command injection
- Path traversal
- SSRF where URLs are accepted

Do not rely only on frontend validation. Validate again on the server.

---

## PHASE 10 — File Uploads

If users can upload files:
- File size limit
- File type validation
- Extension validation
- MIME validation where appropriate
- Safe filenames
- Random storage names
- Access control
- Private files stay private
- Signed URLs if appropriate
- Storage limits
- Safe image processing
- Dangerous file types rejected

---

## PHASE 11 — Rate Limiting

Rate limiting is often forgotten until an application is abused.

At minimum consider:
- Login
- Password reset
- OTP
- Email sending
- Search
- Expensive API operations
- File uploads
- Public APIs
- AI generation endpoints

Use stronger limits for actions that can cost money, send emails or consume significant resources.

Do not necessarily rate limit every endpoint aggressively. Choose limits based on the actual product.

---

## PHASE 12 — Caching

Caching can make an application much faster, but incorrect caching can create serious bugs.

For anything you cache, decide:
- What is being cached?
- How long should it live?
- When is it invalidated?
- Can two users safely share the cache?
- Is the data private?
- Is tenant information part of the cache key?

Common layers:
- Browser cache
- CDN cache
- Server cache
- Database or application cache

Never accidentally place private user data in a shared public cache.

For the first version of a small app, simple caching is usually better than building an elaborate caching system.

**Prompt — Caching**

```
Review caching in the existing application.

First identify what is currently cached and why.

Do not add caching everywhere.

Only cache data that benefits from caching.

For each new cache, define a sensible TTL and invalidation behavior.

Verify that private user data, authenticated responses and tenant specific data cannot leak through shared caches.

Prefer simple and reliable caching over complicated cache architecture.

Measure or reason about the actual performance benefit before introducing a new caching layer.
```

---

## PHASE 13 — CDN and Static Assets

If the project is public or serves large assets:
- CDN is used where appropriate
- Images are optimized
- JS and CSS assets are cacheable
- Assets have versioned filenames or suitable cache invalidation
- Compression is enabled
- Large files are not served unnecessarily from the application server
- Private content is not accidentally cached publicly

A CDN is mainly useful for assets and content that benefit from being served close to users. Do not put every authenticated API response behind a public cache.

---

## PHASE 14 — Performance

Before optimizing everything, find actual bottlenecks.

Check:
- Initial page load
- JavaScript bundle size
- Images
- Fonts
- API response time
- Database queries
- Number of network requests
- Unnecessary rerenders
- Large components
- Slow third party services

Useful improvements include:
- Lazy loading
- Code splitting
- Image optimization
- Query optimization
- Pagination
- Caching where useful
- CDN for suitable assets
- Removing unnecessary requests

Do not optimize tiny code paths while ignoring a slow database query or huge image.

---

## PHASE 15 — SEO

For public pages:
- Good page title
- Good meta description
- One clear main heading
- Correct heading structure
- Clean URLs
- Canonical URLs where needed
- robots.txt
- XML sitemap
- Proper 404 page
- Redirect strategy
- Internal links
- Image alt text
- Open Graph metadata
- Social sharing image
- Structured data where genuinely applicable
- Mobile friendly rendering
- Fast public pages
- Search engine indexing checked

For private dashboards, focus on preventing accidental indexing rather than trying to SEO them.

Do not create thousands of low quality AI generated pages just to create more URLs.

---

## PHASE 16 — GEO and AI Search Visibility

There is no magic switch that guarantees visibility in AI search systems.

The practical approach is to make public content clear, useful and easy to understand.

Check:
- Clear company or product identity
- Clear About page
- Clear product descriptions
- Useful documentation
- Useful FAQ pages where appropriate
- Good internal linking
- Structured data where applicable
- Clear author or organization information where useful
- Original useful content
- Consistent naming of products and entities

Focus on real usefulness rather than mass producing generic AI content.

---

## PHASE 17 — Accessibility

At minimum check:
- Keyboard navigation
- Visible focus
- Form labels
- Helpful form errors
- Semantic HTML
- Buttons used for actions
- Links used for navigation
- Images have meaningful alt text when needed
- Color is not the only way information is communicated
- Text remains readable
- Modal dialogs can be closed with keyboard
- Screen reader behavior is not obviously broken

---

## PHASE 18 — Analytics

Only collect the data you actually need.

Check:
- Analytics installed correctly
- Important conversions tracked
- Signup tracked
- Login failure tracked where useful
- Key product actions tracked
- Errors tracked
- UTM parameters handled if using campaigns
- Sensitive information is not accidentally sent to analytics

Analytics should help answer real product questions rather than collect everything possible.

---

## PHASE 19 — Email

If the application sends email:
- Email provider configured
- Domain configuration
- SPF
- DKIM
- DMARC
- Verification emails
- Password reset emails
- Transactional emails
- Failure handling
- Retry handling
- Clear templates
- No sensitive information unnecessarily included in emails

---

## PHASE 20 — Payments

Only applicable if the product charges money.

Check:
- Test payments
- Production payments
- Webhook verification
- Idempotency
- Failed payment handling
- Subscription creation
- Upgrade
- Downgrade
- Cancellation
- Refund
- Invoice
- Tax handling where applicable
- Payment status is verified server side

Never trust the frontend to tell your backend that a payment succeeded.

---

## PHASE 21 — Webhooks

For every webhook:
- Signature verification
- Replay protection where appropriate
- Duplicate event handling
- Retry handling
- Logging
- Failure monitoring
- Safe event processing

Webhook handlers should be able to handle the same event more than once without creating duplicate actions.

---

## PHASE 22 — Secrets and Environment Variables

Never put these directly into source code:
- API keys
- Database passwords
- Payment secrets
- OAuth secrets
- JWT secrets
- Cloud credentials
- Private tokens

Check:
- .env is ignored correctly
- Production secrets are stored securely
- Development and production secrets are separate
- Secrets are not committed to Git
- Leaked keys can be rotated

Also check logs. A secret accidentally printed into an error log is still a leaked secret.

---

## PHASE 23 — Environments

Keep environments separate where practical:
- Local
- Development
- Preview or staging
- Production

Production should not accidentally use:
- Test payment keys
- Development database
- Test email account
- Debug mode
- Fake credentials
- Development URLs

---

## PHASE 24 — Testing

You do not need thousands of tests for every small project. Focus on important behavior.

- Authentication tests
- Authorization tests
- Main feature tests
- Important API tests
- Form validation tests
- Payment tests if applicable
- Webhook tests if applicable
- Tenant isolation tests if applicable
- Mobile UI checks
- Production build check

Always test failure cases too.

A good test is not only: "Does the user succeed?"
It is also: "What happens when the request fails?"

---

## PHASE 25 — Error Handling

A production application needs graceful failure.

Check:
- API errors
- Network errors
- Database errors
- Invalid input
- Expired session
- Missing resource
- Permission denied
- Third party API failure
- Payment failure
- File upload failure

Users should receive understandable messages.

Developers should receive enough logging to debug the actual problem.

Do not show stack traces, secrets or internal implementation details to normal users.

---

## PHASE 26 — Logging and Monitoring

At minimum for production:
- Application logs
- Error tracking
- Basic uptime monitoring
- Important API failure monitoring
- Payment failure monitoring if applicable
- Database health monitoring
- Background job monitoring if applicable

Logs should help answer:
- What happened?
- When?
- Which request?
- Which user or tenant when appropriate?
- What failed?

Avoid logging passwords, tokens and unnecessary sensitive personal data.

---

## PHASE 27 — Backups

If the application stores important data:
- Automated database backups
- Backup retention
- Backup storage separate from the primary database
- Recovery process documented
- Restore test performed

A backup is not fully trusted until you know it can actually be restored.

---

## PHASE 28 — Deployment

Before going live:
- Production environment works
- Domain works
- HTTPS works
- Database migrations are safe
- Environment variables are correct
- Production secrets are correct
- Error monitoring works
- Analytics works
- Emails work
- Payments work if applicable
- Backups work
- Rollback process is understood

---

## PHASE 29 — Legal and Privacy

Keep this as a separate phase.

The exact requirements depend on your country, users, business model, age group, industry and data processing.

Typical items to review include:
- Privacy Policy
- Terms of Service
- Cookie information where relevant
- Refund and cancellation policy where relevant
- Contact information
- Data collection explanation
- Data deletion process
- Account deletion
- Data retention
- Third party services
- Analytics and tracking
- Marketing communication
- User generated content rules where relevant
- Intellectual property
- Open source license obligations
- Taxes and invoicing where relevant

For India based products, check which provisions of applicable Indian privacy and digital regulations apply to your actual business and data processing.

Do not ask an AI to invent legal requirements. Use it to identify what needs review and to keep the implementation consistent with your actual legal documents.

---

## PHASE 30 — Final Pre Launch Checklist

Before launch, ask:

**Product**
- Does the main user journey work?
- Are important features complete?
- Are error and empty states handled?

**Security**
- Is authentication working?
- Is authorization enforced on the backend?
- Is rate limiting present where needed?
- Are secrets protected?
- Are user and tenant boundaries safe?
- Are uploads validated?

**Performance**
- Are pages reasonably fast?
- Are images optimized?
- Are large unnecessary requests removed?
- Are slow queries addressed?

**SEO**
- Titles
- Meta descriptions
- Canonicals
- Robots
- Sitemap
- Structured data where needed
- Social metadata

**Reliability**
- Error tracking
- Monitoring
- Backups
- Recovery plan
- Rollback plan

**Legal**
- Privacy policy
- Terms
- Refund or cancellation information where needed
- Actual product behavior matches published policies

**Mobile**
- Phone
- Tablet
- Desktop

---

## MASTER PROMPT — BUILD OR IMPROVE A WEB / SAAS PROJECT

Use this when you want an AI coding agent to work on the project.

```
You are working on an existing production oriented web application.

Do not immediately start changing code.

First understand what the project is supposed to do.

Inspect the actual codebase, project structure, framework, dependencies, routes, components, APIs, database, authentication, authorization, environment configuration, deployment configuration and tests.

Do not guess about the existing architecture.

Your first responsibility is to preserve working functionality.

Before implementation, create a practical plan based on the existing system.

The plan should cover only the areas relevant to this project.

Consider:
Product requirements
UI and UX
Responsive design
Database
Authentication
Authorization
API
Input validation
File uploads
Rate limiting
Caching
CDN and static assets
Performance
SEO
GEO or AI search visibility
Accessibility
Analytics
Email
Payments
Webhooks
Logging
Monitoring
Backups
Deployment
Privacy
Legal implementation

Do not force every item into the project.

For example, a simple marketing website does not need a complex caching layer, multi tenant architecture, background job system or advanced authentication system.

Use the simplest architecture that safely satisfies the actual requirements.

Never replace working technology merely because another technology is more popular.

Never add a dependency without a reason.

Never trust frontend only validation.

Never trust frontend only authorization.

Never trust client supplied roles, permissions, prices, payment states or ownership.

Enforce security on the server.

For multi tenant applications, make sure tenant boundaries are enforced server side.

For authentication, use the authentication architecture already chosen unless there is a concrete reason to improve it.

If JWT is used, verify its signature, expiration and intended use correctly.

If sessions and cookies are used, verify secure cookie configuration and session lifecycle.

For APIs, validate input, enforce authorization, handle errors safely, use reasonable rate limits and prevent excessive resource usage.

For caching, verify that private data cannot leak through shared caches.

For file uploads, validate type and size and make sure users cannot access files they are not allowed to access.

For external services, handle failures, timeouts and retries carefully.

For payments and webhooks, verify events server side and make processing safe against duplicate delivery.

For SEO, make public pages crawlable and properly configured without accidentally exposing private application pages.

For performance, optimize actual bottlenecks rather than performing unnecessary micro optimization.

For legal and privacy, do not invent laws or legal conclusions. Identify the product behavior and areas that need jurisdiction specific review.

Make changes incrementally.

After every major change, verify that the affected functionality still works.

Run appropriate tests, type checks, lint checks and production builds when available.

Test important negative cases, not only successful cases.

After implementation, inspect the final diff.

Remove only code that you can confidently identify as unused or unnecessary.

Do not break unrelated functionality.

Before declaring the work complete, perform a final review covering:
Functionality
Security
Authentication
Authorization
Database
API
Rate limiting
Caching
Performance
SEO
Accessibility
Analytics
Reliability
Deployment
Privacy
Legal consistency

Return a final report with:
What was changed
What was not changed
Files affected
Tests performed
Problems found
Problems fixed
Remaining risks
Deployment requirements

Never claim that a check passed unless it was actually verified.
```

---

## MASTER PROMPT — FINAL AUDIT

Use this after the project is considered finished.

```
Act as the final pre launch reviewer for this web application.

Do not rebuild the project.

Inspect the final implementation and verify that the application is actually ready for release.

Check the most important user flows first.

Then check:
UI and responsive behavior
Authentication
Authorization
API security
Input validation
Rate limiting
Caching
CDN and assets
Database
Performance
SEO
Accessibility
Analytics
Email
Payments if present
Webhooks if present
Logging
Monitoring
Backups
Environment variables
Deployment
Privacy and legal consistency

Look specifically for things that AI generated code commonly forgets.

Look for:
Missing authorization
Exposed private data
Incorrect tenant isolation
Missing rate limits
Unsafe file uploads
Leaked secrets
Broken environment configuration
Bad error handling
Missing loading and empty states
Broken mobile layouts
Missing SEO metadata
Missing sitemap
Wrong canonical URLs
Accidental indexing of private routes
Slow queries
Duplicate logic
Unnecessary dependencies
Broken production configuration

Do not create unnecessary architecture changes.

Classify findings as:
BLOCKER
HIGH
MEDIUM
LOW

Fix only problems that are safe to fix without changing unrelated behavior.

Then run the relevant tests and production build.

Finally report whether the project is:
READY
READY WITH MINOR RISKS
NOT READY

Explain the evidence for the result.
```

---

## Simple Rule to Remember

The goal of vibe coding is not:

> "AI wrote a lot of code."

The goal is:

> "AI understood the existing system, changed only what was needed, tested it, and did not leave important production details forgotten."

Build the feature.
Secure the feature.
Make it fast enough.
Make it usable.
Make it discoverable.
Make it observable.
Make the legal and privacy behavior match reality.

Then launch.

