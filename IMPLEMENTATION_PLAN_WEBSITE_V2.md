# Kynvelo Website — Implementation Plan v2

**Status:** Awaiting sign-off. No code changes made for anything in Phases 1–8 below.
**Date:** 2026-09-04
**Scope:** Public marketing site only (`/`, `/business`, `/pricing`, `/enterprise`, `/roi-calculator`, `/partners`, `/legal/*`, auth routes). The member PWA (`/app/*`) and admin CRM (`/admin/*`) are explicitly out of scope except where noted in Phase 8.
**Method:** Findings produced with `impeccable` v3.9.1 (brand register), `ui-ux-pro-max`, `karpathy-guidelines`, plus four parallel codebase audits. Every claim below is cited to `file:line`.

---

## 0. What a turnstile is, and why `/enterprise` exists

You asked what this hardware page is. Short version: it is the single biggest reason a gym owner would pay you rather than use a spreadsheet, and it was specified in your own docs at `FEATURES.md:16-21`.

A **turnstile** is the waist-high physical gate at a gym entrance — the tripod arm you push through, or the glass flap barrier. Most mid-to-large Indian gyms already own one, wired to a cheap access-control panel from ZKTeco, eSSL, Hikvision or Dormakaba.

The gate opens on a **dry-contact relay**: two wires, briefly shorted together for about 300 ms. That is the entire electrical protocol. It does not care what decides to close that contact.

Kynvelo replaces the decision-maker, not the gate:

```
Member opens app  →  rotating 15s HMAC code
                  →  scanner at the door reads it
                  →  Kynvelo checks: paid? not frozen? not a repeat scan?
                  →  closes the relay for 300ms  →  arm unlocks
```

Why this matters commercially:

- **It is the moat.** Any developer can build a CRM. Driving physical hardware is what makes you infrastructure rather than another dashboard. It is also why a gym cannot casually churn off you — you are wired into their front door.
- **It removes the awkward conversation.** An expired member simply does not get through. No receptionist has to challenge anyone.
- **It is the honest, cheap pitch.** You do *not* sell hardware. You work with the gate they already bought. That is a genuinely strong differentiator against vendors who bundle proprietary panels.
- **`/enterprise` exists to answer one question:** *"will this work with MY gate?"* That is why I rebuilt that page around a compatibility matrix that includes a **"Case by case"** row for cloud-locked controllers we cannot drive (`app/enterprise/page.tsx:26-60`). Saying no up front is worth more than a sale you have to unwind.

The page also carries white-labelling (your gym's branding in the member app) and multi-location rollups, which are the Enterprise-tier features from `FEATURES.md:223-236`.

**One correction to your framing:** "business" and "enterprise" are not two audiences. `/business` is the gym-owner landing page for all gyms. `/enterprise` is a sub-page of it, for multi-location chains who need their own App Store listing and SSO. Same audience, deeper tier.

---

## 1. Audit results

### 1.1 Design quality — the overhaul is clean

`impeccable`'s slop detector over the whole rewritten surface returns **exactly one finding**, and it is in an out-of-scope file:

```
bounce-easing (warning) — app/admin/terminal/page.tsx:157 — animate-bounce
```

Marketing surfaces are clear of every absolute ban: no `glass-panel`, no `glow-*`, no `bg-clip-text`, no purple, no `rounded-3xl`, no `animate-ping`, no Plus Jakarta Sans. Contrast measured in a real browser on `/`:

| Element | Ratio | Required | Result |
|---|---|---|---|
| `p` (17px) | 9.08:1 | 4.5:1 | pass |
| `h1` (72px) | 19.05:1 | 3:1 | pass |
| `figcaption` (13px) | 5.23:1 | 4.5:1 | pass |
| `th` / `td` | 5.23:1 | 4.5:1 | pass |

`prefers-reduced-motion` verified: every animation and transition duration clamped.

### 1.2 Mobile responsiveness — one real defect left

Tablet (768px) and desktop (1280px) pass cleanly on all 9 audited pages. At 375px:

- **FALSE POSITIVE, corrected:** the `/pricing` "overflow" my first audit reported is not real. `body.scrollWidth` is 375 and the comparison table sits in a container with `width: 335, scrollWidth: 680, overflowX: auto` — a table scrolling inside its own box, which is intended. My script was measuring `documentElement.scrollWidth`, which counts clipped descendants. **No page scrolls horizontally.**
- **FIXED already:** range sliders were 6px-tall hit areas; segmented toggles were 38px. Both now 44px via `.k-slider` and `.k-seg` in `app/globals.css`.
- **STILL BROKEN:** logo links are 36px in header/footer and 27px in `AuthShell`, 32px on the 404. Needs 44px. → Phase 7.

### 1.3 Pricing — confirmed broken, and worse than you thought

You were right that two pages disagree. The specifics:

| Surface | Athlete tiers shown |
|---|---|
| `/` via `athlete-plans.tsx:16-47` | **Free ₹0 + Pro ₹299** — two tiers |
| `/pricing` via `pricing-tables.tsx:25-66` | **Free ₹0 + Starter ₹99 + Pro ₹299** — three tiers |

So **the ₹99 tier does not exist on the homepage.** A visitor converting from `/` never sees the cheapest paid option.

Worse, the two "Pro" tiers are different products. `athlete-plans.tsx:38` puts barcode scanning inside Pro (₹299); `pricing-tables.tsx:45` puts it in Starter (₹99). The homepage sells at ₹299 a bundle the pricing page sells at ₹99. `athlete-plans.tsx:9` claims PRODUCT.md 5.1 as its source while contradicting it.

Additional contradictions found:

| Figure | Canonical | Stale source |
|---|---|---|
| Athlete tier names | Free/Starter/Pro — `PRODUCT.md:113-115` | **Free/Pro/Elite** — `WIREFRAMES_AND_COMPONENTS.md:76` (only place "Elite" exists anywhere) |
| Partner commission | 20%, 6 months, ₹10,000 cap **total** — `PRODUCT.md:127-129` | **₹10,000 per month × 10 months** — `FEATURES.md:242`, `SCREENS.md:279`, `SCREENS.md:329`, `WIREFRAMES:90-91`. ~17× higher, and on Starter it pays out **more than the gym pays in** |
| Annual discount | −24% / −30% real | **"2 Months Free" badge** — `WIREFRAMES:76`. Arithmetically wrong |
| Free tier scope | "1 active goal, 7-day history" — `PRODUCT.md:114` | `athlete-plans.tsx:22-26` adds unlimited sessions, plate calc, PRs, check-in pass |
| Overage base | Blocks apply to Starter **and** Growth — `PRODUCT.md:122` | `pricing-tables.tsx:203` prices blocks against **Growth only** |
| Block rungs | +50 / +100 only | `pricing-tables.tsx:123-124` invents 150 / 200 rungs |
| Min payout ₹1,000 | — | `partners/page.tsx:43` — frontend invention, in no spec |

**Root cause:** there is no shared pricing module. Prices are duplicated across `athlete-plans.tsx`, `pricing-tables.tsx` and `partner-calculator.tsx`, and there are **five independent currency formatters** — `lib/utils.ts:8-14` (used only by product pages) plus four local ones in marketing.

### 1.4 Feature coverage — you are selling about a third of the product

`FEATURES.md` contains **42 user-facing features**. Current site: 13 prominent, 15 passing mention, **14 absent**.

The absence clusters, badly:

- **KYNVELO VITAL (module 10) is 100% invisible.** All five features — steps/cardio, Health sync, readiness score, transformation slider, TDEE/BMR — appear nowhere. `FEATURES.md:277-305`.
- **KYNVELO MARKET (module 6) is invisible on `/business`.** The 30–40% add-on revenue argument exists only as the string `"Add-on marketplace"` in a pricing array.
- **`/business` never mentions what members get.** Reading it end to end: no occurrence of "member app", "nutrition", "workout", "trainer", "marketplace" or "your brand". The entire ₹2,999 → ₹5,999 upgrade is justified by **two grey check marks** at `pricing-tables.tsx:159-161`, on a different page.

Two doc bugs found in passing: `FEATURES.md:189-197` duplicates the 5.3 PR body inside the 5.8 heatmap entry, and the PT roster at `:198` is mislabelled `5.4`, colliding with the plate calculator at `:164`. Module 5 has 9 features, not 8.

### 1.5 Connectivity

- **Dead links: zero.** Every internal href resolves.
- **Orphan anchors:** `#pricing` on `/` (`page.tsx:317`) and `#calculator` on `/business` (`business/page.tsx:196`) exist but nothing links to them.
- **Broken skip link on 12 routes.** `app/layout.tsx:97` renders `href="#main"` on every route, but no `/app/*` or `/admin/*` page declares `id="main"`. WCAG 2.4.1 failure on exactly the screens keyboard users live in.
- **`/partners` has one inbound link site-wide** — `site-footer.tsx:34`. Not in any header nav. Effectively invisible.
- **`/legal/dpa` is in the sitemap but linked from nowhere** except other legal pages.
- **Marketing → authenticated leak:** `not-found.tsx:19` links to `/app/pulse`, which is `Disallow`ed in `robots.ts:14`.
- **Audience bleed:** `/pricing` hardcodes `audience="gym"` (`pricing/page.tsx:63`) but sits in the *athlete* nav (`site-header.tsx:26`). An athlete clicking "Pricing" is silently converted — sign-in becomes `/business/login`, CTA becomes "Start trial". Same on `/legal/*`. The footer is audience-blind and shows all three columns everywhere.
- **No `middleware.ts` exists.** All 7 `/app/*` and 5 `/admin/*` routes are publicly reachable. `robots.txt` is not access control. Out of scope for this plan but must be logged.

### 1.6 30-phase SaaS state coverage

Of 72 required public-route state slots (12 routes × 6 states), **24 are satisfied on the route itself** (normal + responsive). Loading and error are satisfied only by root-level inheritance. **Empty and 403 are satisfied nowhere.**

- Only four convention files exist, all at root: `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`. **No route-level boundaries at all.**
- `app/loading.tsx` is marketing-shaped but applies to all 24 routes, so `/app/pulse` and `/admin/terminal` would flash a wide-display skeleton inside no shell.
- **`components/system/forbidden.tsx` (Screen 85) has zero imports.** Built, never wired.
- **`components/system/offline-banner.tsx` (Screen 87) has zero imports.** Also, `app/manifest.ts` exists but there is **no service worker**, so PWA offline is not real.
- **Screen 88 (biometric re-auth) does not exist.**
- Screen 89 surfaces `error.digest`, not a Sentry ID — `error.tsx:21` carries the TODO.

Screen inventory vs disk:

| SCREENS.md part | Specified | On disk | Missing |
|---|---|---|---|
| 1 — Member app | 56 | 7 | 49 |
| 2 — `/ops/*` owner mobile | 22 | **0** | 22 |
| 3 — `/admin/*` command centre | 7 | 4 | 3 |
| 4 — Public marketing | 7 | **7** | **0** |
| 5 — System states | 5 | 2 wired | 3 |

Also: `SCREENS.md:3` says 97 frames, its own summary matrix says 89, and screens 49–56 are double-assigned between Part 1 and Part 2. Needs reconciling.

---

## 2. The 3D decision

You are right, and the fix also happens to be a significant performance win.

**Current state:** `three@0.185.1` (~600 KB minified) is loaded to render a barbell on `/` and a turnstile on `/business`. Neither communicates a feature — they are decoration, and on an Indian mobile connection they are 600 KB of decoration ahead of first meaningful paint.

**Decision: remove Three.js from the marketing site entirely.** Replace with purpose-built SVG/CSS components that each demonstrate a *real feature*. Every replacement below is lighter, sharper, and provable.

| Location | Remove | Replace with | Feature demonstrated |
|---|---|---|---|
| `/` hero | `Barbell3DScene` | **Device frame with live set matrix** — set rows filling, rest timer counting, PR badge firing. CSS + SVG. | 5.1, 5.4, 5.7 |
| `/business` hero | `Turnstile3DScene` | **Reception terminal stream** — access-granted events prepending in real time, member name + plan status, one denied row. Mirrors the real `/admin/terminal`. | 1.1, 1.2, 1.3 |
| `/` `#recovery` | 3 text rows | **Interactive anatomical body SVG** — clickable muscle groups, green/amber/red fill, readiness dial beside it | 5.8, 10.3 |
| `/` `#nutrition` | — | **Animated calorie + macro rings** — `stroke-dashoffset` fill on scroll, remaining grams labelled | 4.3 |
| `/` new section | — | **Draggable before/after slider** | 10.4 |
| `/` new section | — | **Live TDEE/BMR widget** — real Mifflin-St Jeor, named formula | 10.5 |
| `/` gym pass | — | **QR with 15→0 countdown ring** | 1.1 |
| `/business` new | — | **Theme swatch picker** — click a colour, phone mock re-themes live. Literally demonstrates `--kynvelo-primary` injection. | 7.1 |
| `/business` new | — | **Add-on revenue calculator** — owner-set inputs, same honesty pattern as `ChurnCalculator` | 6.1 |
| `/business` billing | — | **GST invoice mock** — CGST/SGST rows, SAC 999723 visible | 3.4 |

Net effect: `three` and `@types/three` drop out of the marketing bundle. If you want genuine 3D later, the one place it would earn its keep is an interactive plate-loading barbell that responds to a weight input — because that *is* feature 5.4 rather than an ornament. Flagging as optional, not planned.

**On 21st.dev Magic MCP:** staged in `.setup/mcp.json` but `disabled: true` — it needs an API key and its package name is not in Kiro's verified registry. Every component above is hand-buildable on the existing stack (Tailwind v4, Framer Motion 13, Radix, Lucide). I will not block on Magic. If you enable it, I will use it for the device frame and carousel shells and hand-build the data-driven pieces regardless, since they encode real product logic.

---

## 3. Feature value scores

Scored 1–5 on **Hook** (compelling to a cold visitor), **Differentiation** (rare vs MyFitnessPal / Hevy / Strong / Indian gym CRMs), **Provable** (demonstrable without inventing statistics). Absent-from-site features only, ranked.

### Athlete side — build these

| Feature | FEATURES.md | H | D | P | /15 | Notes |
|---|---|---|---|---|---|---|
| **Transformation photo slider** | 10.4 `:296-301` | 5 | 4 | 5 | **14** | Highest-value absence on the whole site. Sells itself with zero copy. |
| **Morning readiness score** | 10.3 `:290-295` | 4 | 5 | 4 | **13** | Nothing in the consumer category does this. |
| **Meal-prep batch builder** | 4.5 `:124-129` | 4 | 4 | 5 | **13** | Very high intent audience; MyFitnessPal does it badly. |
| **Calorie ring + remaining macros** | 4.3 `:112-117` | 4 | 1 | 5 | **10** | Low differentiation but it is *the* screen every visitor recognises. Table stakes we currently fail. |
| **TDEE / BMR calculator** | 10.5 `:302-305` | 4 | 2 | 5 | **11** | Doubles as a standalone SEO asset. |
| **1RM % + RPE table** | 5.5 `:170-175` | 3 | 3 | 5 | **11** | Currently a bare `Figure value="Brzycki"`. |
| **Net carbs & micronutrients** | 4.7 `:136-141` | 3 | 3 | 4 | **10** | Unlocks keto / diabetic / low-sodium segments. |
| **Superset / dropset tagging** | 5.6 `:176-181` | 3 | 3 | 4 | **10** | Two markup chips on the existing table. Nearly free. |
| **Steps + cardio logging** | 10.1 `:278-283` | 3 | 2 | 4 | **9** | Currently a *promise with no proof* — `page.tsx:104-113` claims "does all three" and never substantiates. Worse than absent. |
| **Health / Health Connect sync** | 10.2 `:284-289` | 4 | 2 | 3 | **9** | |
| **Hydration log** | 4.4 `:118-123` | 2 | 1 | 4 | **7** | One line in a row of three. Do not give it a section. |
| **Quick-add calories** | 4.6 `:130-135` | 3 | 1 | 4 | **8** | Tab inside the nutrition widget. |
| **DPDP export / erase** | 9.2 `:262-267` | 3 | 4 | 4 | **11** | For an Indian audience "delete everything, one tap, by law" is stronger than "no ads". |

### Gym-owner side — the member-value bundle

This is the pricing argument the page currently omits entirely.

| Feature | FEATURES.md | H | D | P | /15 |
|---|---|---|---|---|---|
| **Add-on marketplace — PT, dietitian, supplements** | 6.1 `:208-213` | 5 | 4 | 5 | **14** |
| **The whole athlete stack, included for members** | modules 4, 5, 10 | 5 | 4 | 5 | **14** |
| **Self-service in-app renewal (reception load removal)** | 3.1 `:69-74` | 5 | 3 | 5 | **13** |
| **Trainer roster + session countdown** | 5.9 `:198-205` | 4 | 4 | 5 | **13** |
| **White-label branded member app** | 7.1 `:224-229` | 4 | 4 | 5 | **13** |
| **Supplement inventory + low-stock** | 6.2 `:214-220` | 3 | 3 | 5 | **11** |
| **Streaks as a retention mechanism the owner buys** | 1.4 `:28-33` | 4 | 2 | 4 | **10** |
| **Biometric re-auth on the ledger** | 9.3 `:268-274` | 3 | 4 | 4 | **11** |
| **Tenant isolation — "your rival can't see your members"** | 9.1 `:256-261` | 2 | 2 | 2 | **6** |

**The commercial point to make explicit on `/business`:** Growth at ₹5,999/month gives 100 members the full athlete app. Bought individually at Pro (₹299/mo) that is ₹29,900/month of member-facing value. That comparison is currently made nowhere on the site, and it is the strongest argument you have for the upgrade.

---

## 4. Section plans

### `/` — athlete

| # | Section | Status | Features | Visual |
|---|---|---|---|---|
| 1 | Hero | **replace visual** | 5.1, 5.4, 5.7 | Device frame, live set matrix. Kills `Barbell3DScene`. |
| 2 | "One app instead of three" | **pay off the claim** | 5.1, 4.1, 10.1 | 3-column comparison table, not prose |
| 3 | Training | keep, extend | + 5.6, 5.5 | Add `W`/`D`/`F` chips + `A1/A2` bracket to existing table; render the real 1RM % table |
| 4 | Nutrition | keep, extend | + 4.3, 4.7, 4.6, 4.5 | Animated calorie ring + macro bars; tab widget: Photo / Barcode / Quick-add / Recipe batch |
| 5 | **Recovery & readiness** | **new visual** | 5.8, 10.3 | Interactive anatomical SVG + readiness dial with draggable sleep/soreness/energy |
| 6 | **Progress you can see** | **new** | 10.4, 5.3, 1.4 | Draggable before/after slider, PR badge stack, streak heatmap |
| 7 | **Your body's numbers** | **new** | 10.5, 10.1, 10.2, 4.4 | Live TDEE widget; quiet row for cardio modes, Health sync, hydration |
| 8 | Gym pass | keep, extend | 1.1, 3.1, 6.1, 9.2 | QR countdown ring + three lines the athlete is never told: renew by UPI, buy PT/supplements in-app, download GST invoice, export/erase your data |
| 9 | Pricing | **fix** | — | Three tiers, from the shared module. Must match `/pricing`. |
| 10 | Cross-audience | keep | — | Unchanged |

### `/business` — gym owner

Insert member value **between the calculator and billing**, where the owner has just accepted the ROI premise.

| # | Section | Status | Features | Visual |
|---|---|---|---|---|
| 1 | Hero | **replace visual** | 1.1, 1.2, 1.3 | Reception terminal stream. Kills `Turnstile3DScene`. |
| 2 | The loop | keep | 1.1, 1.3, 2.1, 3.1, 3.2 | Optionally animated 4-node SVG flow |
| 3 | Red list | keep, extend | 2.1–2.4 | Add "In contact by Priya" lock banner on one row to make 2.4 visible |
| 4 | Calculator | keep | 8.2 | Unchanged |
| 5 | **What your members get** | **new** | modules 4, 5, 10 + 1.1, 1.4, 3.1 | 3-up device shots + "Your gym / Kynvelo gym" table + the ₹29,900-of-value comparison |
| 6 | **Revenue above the floor fee** | **new** | 6.1, 6.2, 5.9 | Add-on revenue calculator; trainer roster mock; low-stock row |
| 7 | **Your brand, your app** | **new** | 7.1, 7.2 | Theme swatch picker, live re-theme. Links on to `/enterprise`. |
| 8 | Billing | keep, extend | 3.4, 3.3 | GST invoice mock |
| 9 | **Trust & audit** | **new** | 1.3, 9.1, 9.3, 9.2 | Audit-log table + 3 lines on isolation, biometric re-auth, consent separation |
| 10 | Limits | keep, do not move | — | "What Kynvelo cannot do" stays immediately before the CTA |
| 11 | CTA | keep | — | Unchanged |

---

## 5. Phased plan

### Phase 1 — Pricing single source of truth `[blocking everything else]`
1. Create `lib/pricing.ts`: athlete tiers, gym tiers, blocks, commission, setup fee, GST, comparison matrix. Typed, one export per concept.
2. Refactor `athlete-plans.tsx`, `pricing-tables.tsx`, `partner-calculator.tsx` to import from it. Delete all four local currency formatters; everything uses `lib/utils.ts` `formatCurrency`.
3. Fix `athlete-plans.tsx` to render **three** tiers matching `/pricing`.
4. Fix `pricing-tables.tsx:203` so blocks price against the selected tier, not always Growth.
5. Remove the invented 150/200 block rungs, or get your decision to keep them.
6. **Decision needed from you:** the ₹1,000 minimum payout at `partners/page.tsx:43` is in no spec. Keep and add to PRODUCT.md, or drop?

### Phase 2 — Reconcile the specs
Update the stale docs to match PRODUCT.md, with a changelog note in each:
- `FEATURES.md:242` — commission → 20% / 6 months / ₹10,000 cap total
- `SCREENS.md:279`, `SCREENS.md:329` — same
- `WIREFRAMES:90-91` — same; `WIREFRAMES:76` — drop "Elite", use Free/Starter/Pro; remove the wrong "2 Months Free" badge
- `WIREFRAMES:58` — remove the unsupportable stat ticker figures
- `FEATURES.md:189-205` — fix the duplicated 5.3 body and the mis-numbered 5.4
- `SCREENS.md:3` vs summary matrix — resolve 97 vs 89 and the 49–56 double-assignment
- Decide whether Free includes the plate calculator and PRs (`PRODUCT.md:114` says no, the site says yes). **I recommend the site's version** — those cost nothing to serve and drive adoption.

### Phase 3 — Replace both 3D components
1. Build `components/marketing/device-frame.tsx` + `live-set-matrix.tsx` → `/` hero.
2. Build `components/marketing/terminal-stream.tsx` → `/business` hero.
3. Delete `barbell-3d-scene.tsx`, `turnstile-3d-scene.tsx`. Remove `three` and `@types/three` from `package.json`.
4. Verify bundle drop and LCP improvement.

### Phase 4 — Athlete feature sections
Build in value order: recovery body + readiness (13–14), transformation slider (14), calorie rings (10 but table stakes), TDEE widget (11), nutrition tab widget, 1RM table, set-tag chips, gym-pass extensions.

### Phase 5 — Gym-owner member-value sections
Member-value section with the ₹29,900 comparison, add-on revenue calculator, theme picker, GST invoice mock, trust & audit block.

### Phase 6 — Connectivity
1. Add `/partners` and `/roi-calculator` to the gym header nav.
2. Link `/legal/dpa` from the footer.
3. Make the footer audience-aware, or accept it as deliberate and document why.
4. Fix `/pricing` and `/legal/*` audience bleed — take an `audience` prop, or split `/pricing` per audience.
5. Remove the `/app/pulse` link from `not-found.tsx:19`.
6. Wire the orphan anchors `#pricing` and `#calculator`, or remove the ids.
7. Add a `/business` → `/` cross-audience band to match the athlete side.

### Phase 7 — Mobile and a11y finish
1. Logo hit areas to 44px: `site-header`, `site-footer`, `auth-shell`, `not-found`.
2. Add `id="main"` to `mobile-shell.tsx` and `admin-layout.tsx` so the skip link works on all 24 routes.
3. Re-run `_audit/responsive.mjs` to zero failures at 375 / 768 / 1280.

### Phase 8 — 30-phase state coverage
1. Wire `Forbidden` and `OfflineBanner` — currently dead code.
2. Route-level `loading.tsx` for `/app/*` and `/admin/*` with shell-shaped skeletons.
3. Route-level `error.tsx` for `/roi-calculator` and `/business` (the interactive compute).
4. Real form error states in `auth-form.tsx` — field-level validation and submit failure.
5. Empty-state fallback for `legal/[slug]` when `sections` is empty.
6. Service worker, or remove the offline claims and drop `manifest.ts` until one exists.
7. **Log as separate work, not this plan:** no `middleware.ts` means `/app/*` and `/admin/*` are fully public. This is a security gap, not a website gap, and needs its own issue.

---

## 6. Open decisions for you

1. **Subdomains.** You mentioned marketing pages on subdomains. Current `lib/site.ts:3` hardcodes `https://kynvelo.com` and everything is path-based. Do you want `gyms.kynvelo.com` / `app.kynvelo.com`? That changes canonicals, the sitemap, `metadataBase`, and needs middleware for host routing. **Not in this plan** until you confirm.
2. **Free tier scope** — PRODUCT.md's narrow version or the site's generous version?
3. **₹1,000 minimum payout** — keep or drop?
4. **150/200 block rungs** — keep or drop?
5. **21st.dev Magic** — provide an API key, or hand-build everything?
6. **Testimonials.** `WIREFRAMES:82` specifies a testimonials carousel. You have no customers yet. I removed it rather than fabricate quotes. Confirm that stays out until real ones exist.

---

## 7. What is already done

For the record, completed before this plan:

- Design system rebuilt flat and anti-clutter; glassmorphism, glow, blurred-gradient stack all removed
- Fonts moved Plus Jakarta Sans → Barlow Condensed + Barlow (Jakarta is on impeccable's reflex-reject list)
- Brand assets generated from the logo: `icon.svg`, `apple-icon`, `opengraph-image`, `manifest`, `logo.svg`; the `create-next-app` default favicon deleted
- Per-page metadata, canonicals and robots directives on all 17 public URLs, verified over HTTP
- `sitemap.ts` + `robots.ts` from a shared route registry; all 16 sitemap URLs verified 200
- 404, 500, global-error, loading skeleton, 403 component, offline banner built
- `/partners` built (was entirely missing)
- `/pricing` and `/roi-calculator` fleshed out to spec
- Legal hub extended from 4 to 6 slugs; soft-404 fixed with `dynamicParams = false`
- 3 navbars consolidated to 1 audience-aware header; footer's 6 dead `#features` anchors fixed
- 17 orphaned components deleted
- 8 unverifiable marketing claims removed (uptime %, revenue recovered, workouts logged, star rating, recovery-rate statistics, "audited against 240+ datasets")
- `tsc --noEmit` clean, production build clean, 37 static pages
