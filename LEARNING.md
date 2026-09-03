# Kynvelo — Continuous Learning & Feedback Loop (LEARNING.md)

**Purpose:** Captures past errors, fixed bugs, architectural decisions, and proven successful patterns across sessions. Every AI coding agent MUST read this file at session start to avoid repeating known mistakes and apply proven solutions.

---

## 1. Self-Improving Feedback Loop Protocol

Whenever an error is encountered, a bug is fixed, or a new pattern is proven successful:
1. Document the incident in Section 2 or Section 3 below.
2. Formulate a **Permanent Prevention Rule**.
3. If applicable, update [RULES.md](file:///e:/projects/matrix/KYNVELO/RULES.md) to enforce the rule systematically.

---

## 2. Incident & Bug Post-Mortems

### Incident 001: Antigravity PreToolUse Hook Path Quoting Failure on Windows
- **Date:** 2026-09-03
- **Context:** Tool execution within Antigravity agent runner.
- **Symptom:** Every single tool call (`run_command`, `list_dir`, `view_file`) immediately crashed with:
  ```
  JSON hook "jsonhook__googlecloudtools.datacloud_telemetry_PreToolUse_0_0" failed:
  Error: Cannot find module 'C:\Users\ANKIT SHAW\.gemini\config\plugins\googlecloudtools.datacloud_telemetry\"C:\Users\ANKIT'
  ```
- **Root Cause:** The `googlecloudtools.datacloud_telemetry` plugin had an unquoted path in its hook invocation command. On Windows systems where the user profile directory has spaces (`ANKIT SHAW`), Node.js split the arguments at the space, attempting to require `"C:\Users\ANKIT`.
- **Resolution:** Removed the broken telemetry plugin folder:
  `C:\Users\ANKIT SHAW\.gemini\config\plugins\googlecloudtools.datacloud_telemetry`.
- **Permanent Prevention Rule:**
  - On Windows, always ensure paths with spaces are enclosed in escaped double quotes (`"..."`).
  - When diagnosing system-wide tool failures, immediately inspect agent pre-tool hooks before assuming project codebase failure.

---

### Incident 002: PowerShell Multi-Byte UTF-8 String Stream Garbling
- **Date:** 2026-09-03
- **Context:** Appending Part III checklist content to `kynvelo-master-reference-v2.md`.
- **Symptom:** Multi-byte characters (em-dash `—` and section symbol `§`) were transcoded to `â€”` and `Â§`.
- **Root Cause:** Standard Windows PowerShell string pipelines (`Get-Content | Set-Content`) default to ANSI or mismatched codepages unless explicit `[System.IO.File]::WriteAllText(..., [System.Text.Encoding]::UTF8)` is used.
- **Resolution:** Sanitized all garbled instances using native `replace_file_content` tool calls.
- **Permanent Prevention Rule:**
  - Strictly enforce the rule: **`🚫 NO AUTOMATION SCRIPTS FOR CODE EDITS`**.
  - All file creations and edits MUST be performed using native tool calls (`write_to_file`, `replace_file_content`).

---

### Incident 003: Deprecation of Legacy Cliché Color Palette
- **Date:** 2026-09-03
- **Context:** Name research file (`kynvelo-name-research.md`) contained early color draft (`#3B49DF` Kinetic Indigo, `#0B0F19` Obsidian Slate, `#10B981` Neon Volt).
- **Symptom:** Risk of building generic AI-attractor UI (purple/indigo buttons, low contrast gray text).
- **Root Cause:** Early naming notes included draft hex tokens prior to adopting Impeccable and UI/UX Pro Max standards.
- **Resolution:** Stripped the legacy palette from `kynvelo-name-research.md`. Mandated an OKLCH contrast-first color system anchored by Impeccable's `palette.mjs` and UI/UX Pro Max.
- **Permanent Prevention Rule:**
  - Never use hardcoded hex `#3B49DF` indigo/purple or `#0B0F19` slate.
  - Enforce WCAG $\ge 4.5:1$ body contrast and $\ge 3:1$ display contrast using OKLCH tokens.

---

### Incident 004: Formalization of Mandatory Persistent Memory & Learning Auto-Update Rule
- **Date:** 2026-09-03
- **Context:** Project governance and cross-session knowledge retention across multiple AI coding agents.
- **Symptom:** Without a hard universal rule, AI agents across new sessions could fail to update `LEARNING.md` or `AGENTS.md`, causing memory degradation and repeated errors.
- **Root Cause:** Memory update guidelines were descriptive rather than prescriptive P0 system rules.
- **Resolution:** Added a strict TIER 0 universal rule to `.agent/rules/GEMINI.md` and P0 Section 10 to `KYNVELO/RULES.md` and `KYNVELO/AGENTS.md`. The rule makes updating `LEARNING.md` and `AGENTS.md` a mandatory action at the completion of every task or bug fix.
- **Permanent Prevention Rule:**
  - AI agents must automatically capture learnings, bug fixes, and proven patterns into `LEARNING.md` on every turn without prompting.
  - At every session startup, the AI MUST read `AGENTS.md`, `RULES.md`, and `LEARNING.md` before touching code.

---

### Incident 005: 89-Screen Expansion and Master Features Architecture Formalization
- **Date:** 2026-09-03
- **Context:** Design and functional scoping of the Member Mobile App, Gym Owner Ops, and Public Web Portal against the 30-Phase SaaS Checklist.
- **Symptom:** User's initial 68-screen mobile list lacked tenant mode switching (Kynvelo Direct vs Gym Member), referral partner portals (Surface C), dedicated trainer/dietitian tools, and essential security/error states (403, 404, offline PWA, biometrics).
- **Root Cause:** Product had evolved from a basic mobile app into a multi-surface Fitness Business Operating System without synchronizing the screen directory.
- **Resolution:** Created `SCREENS.md` mapping all 89 distinct frames across all surfaces with their respective 6 states, and created `FEATURES.md` categorizing all 9 functional modules with business benefits, technical mechanics, and surface locations.
- **Permanent Prevention Rule:**
  - Every UI implementation must trace back to a specific screen in `SCREENS.md` and feature in `FEATURES.md`.
  - All screens must support the 6 mandatory SaaS checklist states: Normal, Loading skeleton, Empty with CTA, Error with retry, Permission 403, and Mobile/Desktop responsiveness.

---

### Incident 006: Formalization of Design System (Option 1 Kinetic Volt) & 97-Screen Unified Suite
- **Date:** 2026-09-03
- **Context:** Design system finalization, brand asset generation, and unification of Workout, Nutrition, and Health Telemetry.
- **Symptom:** Disconnect between gym business features and athlete companion tools (plate loading, 1RM percentages, muscle recovery, step syncing, meal prep recipes).
- **Root Cause:** Fitness tracker, workout logger, and nutrition tracker were previously viewed as disjointed modules rather than a unified Member Performance Suite.
- **Resolution:** Approved Option 1 (Kinetic Volt `#C6FF00` on Obsidian Carbon `#0D0E11`). Created `DESIGN.md`. Confirmed flat kinetic monogram logo (`kynvelo-logo-master.jpg`) and hero banner (`kynvelo-hero-banner.jpg`). Expanded `FEATURES.md` with Module 10 (Kynvelo Vital) and enriched `SCREENS.md` to 97 mapped frames.
- **Permanent Prevention Rule:**
  - The Member App must present a seamless all-in-one experience replacing MyFitnessPal + Hevy + Strong without requiring third-party fitness app subscriptions.
  - All brand assets must align with the approved Kinetic Volt and Obsidian Carbon color tokens.

---

## 3. Proven Architectural & Implementation Patterns

### Pattern 001: Two-Stage AI Nutrition Quantification (Zero Hallucination)
- **Problem:** LLMs frequently hallucinate or invent wildly inaccurate calorie and macronutrient numbers for food.
- **Solution:**
  1. Vision LLM is used **strictly as an identification layer** (identifying food items and estimating portion size in structured JSON).
  2. The backend queries the authoritative **USDA FoodData Central** database using the detected food strings.
  3. All calorie, protein, carbohydrate, and fat values are computed from official USDA nutritional tables.
  4. The user verifies/edits portions before saving to `MealItem`.

---

### Pattern 002: Base Manager Multi-Tenant ORM Scoping
- **Problem:** Multi-tenant data leaks occur when a developer forgets to add `.filter(gym_id=...)` in a query.
- **Solution:**
  ```python
  class TenantManager(models.Manager):
      def get_queryset(self):
          return super().get_queryset().filter(gym_id=get_current_tenant_id())

  class TenantBaseModel(models.Model):
      gym_id = models.UUIDField(db_index=True)
      objects = TenantManager()
      all_objects = models.Manager() # For superadmin cross-tenant operations only

      class Meta:
          abstract = True
  ```
- **Rule:** Every model containing tenant-specific data must inherit from `TenantBaseModel`.

---

### Pattern 003: Idempotent Payment Webhook Consumption
- **Problem:** Payment gateways retry webhooks upon network timeouts, causing double-renewals or duplicate ledger entries.
- **Solution:**
  ```python
  @transaction.atomic
  def process_payment_webhook(event_id, payload):
      if WebhookEvent.objects.filter(event_id=event_id, processed=True).exists():
          return HttpResponse(status=200) # Acknowledge duplicate safely

      event = WebhookEvent.objects.create(event_id=event_id, payload=payload)
      verify_hmac_signature(payload)
      # Transition payment state: Created -> Paid
      order = apply_membership_extension(payload['order_id'])
      event.processed = True
      event.save()
  ```

---

### Pattern 004: Modular Celery Queue Segregation
- **Problem:** Slow external API calls (e.g. AI food photo processing) can exhaust Celery worker threads, blocking critical real-time operations like QR check-in verification or payment webhook processing.
- **Solution:** Separate background task queues:
  - `queue=flow`: Auto-renewal reminder dispatches.
  - `queue=pay`: Payment webhook processing and referral calculations.
  - `queue=fuel`: AI food photo scans and USDA lookups.
  - `queue=pulse`: Attendance sync and streak recalculations.

---

### Pattern 005: Client-Side Barcode Decoding
- **Problem:** Streaming video frames or full camera photos to the server for barcode extraction is slow and expensive.
- **Solution:** Client-side decode via `Quagga2` (web) or `ZXing` (native). The camera stream never leaves the client device; only the decoded UPC/EAN string (e.g. `"8901030383847"`) is transmitted to the server for an indexed $O(1)$ database key lookup.

---

### Pattern 006: Dynamic CSS Variable Themer for Multi-Tenant White-Labeling
- **Problem:** Building separate frontend bundles for hundreds of gyms creates massive build and deployment overhead.
- **Solution:** A single shared Next.js application bundle whose brand tokens (`--kynvelo-primary`, `--kynvelo-accent`, logo, display name) are injected as CSS custom properties dynamically upon tenant resolution. Only Enterprise-tier clients with custom app-store listings receive dedicated build targets via Capacitor/Expo.

---

### Pattern 007: Hybrid Component Assembly (Shadcn Primitives + 21st.dev Magic + Lucide React)
- **Problem:** Stitch UI generates raw static HTML/CSS files requiring tedious manual conversion to React. Building complex SaaS components from scratch is slow.
- **Solution:** Adopt a high-velocity hybrid component strategy:
  1. *Foundations:* Use **Shadcn UI (Radix Primitives)** for battle-tested accessible building blocks (Dialog, Table, Sheet, Tabs, Dropdowns).
  2. *Bespoke Blocks:* Use **21st.dev Magic MCP** to generate production-ready React+Tailwind blocks (Bento hero, ROI calculator, concentric macro rings).
  3. *Icons:* Use **Lucide React** for lightweight, tree-shakeable vector icons.

---

### Pattern 008: Dual-Audience Architecture (Athlete First + Gym Owner Enterprise) with Framer Motion
- **Problem:** SaaS landing pages that only pitch B2B gym owners fail to attract consumers, while consumer-only fitness apps fail to sell to enterprise gym owners.
- **Solution:** A unified Dual-Audience Landing Page where an animated toggle (`Framer Motion` spring physics) morphs headlines, hero mockups, feature cards, and CTAs dynamically between **Athlete Mode** (workout logger, AI nutrition, zero subscriptions) and **Gym Owner Mode** (turnstiles, no-show CRM, automated billing).

---

## 4. Known Pitfalls & Anti-Patterns to Avoid

| Category | Pitfall / Anti-Pattern | Correct Practice |
|---|---|---|
| **Security** | Hiding a UI button treated as authorization | Enforce role and permission checks strictly on the backend API |
| **Tenancy** | Trusting `X-Tenant-ID` header from untrusted clients | Always validate tenant against the authenticated user's session |
| **Payments** | Treating "Initiated" as "Paid" | Membership extended ONLY on server-side verified webhook |
| **Database** | Hard-deleting transactions or attendance records | Soft-delete with audit timestamps and user IDs |
| **Performance**| Missing database indexes on foreign keys and tenant lookups | Every `gym_id` and foreign key MUST have `db_index=True` |
| **Licensing** | Importing AGPL-3.0 or GPL libraries (`wger`, `ExerciseDB`) | Permissive only (MIT, Apache-2.0, BSD, CC0 1.0) |
| **Design** | Low-contrast light gray body text on light surfaces | Always maintain $\ge 4.5:1$ contrast using OKLCH color tokens |
