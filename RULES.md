# Kynvelo — Engineering & Behavioral Rules (RULES.md)

**Scope:** All code, architecture, database design, APIs, and AI agent implementations across the Kynvelo project.  
**Priority Order:** P0 (Safety, Legal, Multi-Tenant Isolation) > P1 (Architecture & Financial Integrity) > P2 (Code Quality & UX).

---

## 1. Core Engineering Philosophy

> **"Do not change working systems just for the sake of optimization."**  
> Before adding a new library, architecture pattern, database, cache, authentication system, or deployment service, verify that the project actually needs it.

---

## 2. Karpathy Behavioral Guidelines (Mandatory P0)

Every AI coding action, refactor, and implementation must adhere to Andrej Karpathy's core principles:

1. **Think Before Coding:**
   - State all assumptions explicitly before touching files.
   - If multiple valid approaches or tradeoffs exist, present them rather than picking silently.
   - If anything is unclear, **stop and ask**. Never guess or assume intent.
2. **Simplicity First:**
   - Build only the minimum code required to solve the immediate problem. Zero speculative abstractions.
   - No configurability or "flexibility" that was not explicitly requested.
   - No single-use helper classes. If 200 lines can be written cleanly in 50 lines, rewrite it to 50 lines.
3. **Surgical Changes:**
   - Touch ONLY lines directly relevant to the user request.
   - Never "improve", reformat, or refactor adjacent working code or comments.
   - Match existing codebase naming, conventions, and style.
   - Clean up only your own orphans (unused imports/variables created by your edits). Never delete unrelated dead code without asking.
4. **Goal-Driven Execution (Verify Every Step):**
   - Define verifiable success criteria before editing code.
   - Loop independently until tests pass and functionality is proven. Prove code works by executing it, not just checking that the file exists.

---

## 3. Multi-Tenant Isolation Rules (Non-Negotiable P0)

1. **Base ORM Manager Scoping:**
   - Every single database query in every module MUST be scoped by `gym_id` at the ORM base manager level:
     ```python
     # Example pattern:
     class TenantModel(models.Model):
         gym_id = models.UUIDField(db_index=True)
         objects = TenantManager()
         class Meta:
             abstract = True
     ```
   - Never rely on developers remembering to add `.filter(gym_id=...)` in individual views.
2. **No Cross-Tenant Data Leaks:**
   - Never trust client-supplied tenant IDs or headers without verifying against the authenticated user's session.
   - B2C direct users belong to the reserved system tenant `gym_id = "kynvelo-direct"`.
3. **Tenant Cache Isolation:**
   - All Redis cache keys MUST include the tenant prefix: `{gym_id}:{cache_key}`. Never store tenant-specific data in global shared cache keys.

---

## 4. Payment & Financial Integrity Rules (Non-Negotiable P0)

1. **Zero Credential Storage:** Never store raw credit card numbers, CVVs, or UPI PINs.
2. **Provider Status is Truth:** Provider status is the sole source of truth.
   - State Machine: `Created → Pending → Paid → Failed → Refunded → Reversed`.
   - **"Initiated" is NEVER "Paid".** Extend memberships or unlock add-ons **only** after receiving a cryptographically verified webhook callback or provider confirmation.
3. **Idempotent Webhooks:**
   - Webhook endpoints must consume events idempotently. Duplicate callbacks from payment gateways must never double-charge, double-extend, or create duplicate ledger entries.
4. **Zero Hard Deletes:**
   - Financial transactions, attendance corrections, and red-list audit trails MUST never be hard-deleted. Soft-delete and archive only.

---

## 5. Modular Monolith Architecture Rules

1. **Module Boundaries:**
   - One Django codebase, structured into 8 discrete apps:
     `Core`, `Pulse`, `Guard`, `Flow`, `Pay`, `Coach`, `Fuel`, `Metrics`.
   - Modules must communicate through Django signals, events, or defined internal service interfaces—never direct in-process cross-module database manipulation.
2. **Background Job Queue Isolation (Celery):**
   - Separate Celery queues per module:
     `queue=flow` (renewals), `queue=pay` (webhooks/payouts), `queue=fuel` (AI food scans), `queue=pulse` (check-ins).
   - A backlog or slow response in the `fuel` AI vision queue must NEVER stall the `pay` or `pulse` queues.
3. **Feature Flags:**
   - All major modules and sub-features must be wrapped in `FeatureFlag(gym_id, module_key, enabled)`.
   - Allows instant disabling of a failing module for a specific tenant without redeploying code.
4. **Circuit Breakers on External APIs:**
   - All network calls to external providers (Vision LLMs, SMS/WhatsApp gateways, Payment Gateways) must have circuit breakers with fallback modes (e.g. Vision LLM outage falls back gracefully to manual text food search).

---

## 6. Licensing & Third-Party Dependency Rules (P0 Legal)

1. **Strict Copyleft Ban:**
   - ❌ **AGPL-3.0, GPL, and CC-BY-SA libraries are strictly forbidden.**
   - Do NOT import `wger` (AGPL-3.0 + CC-BY-SA) or open-source `ExerciseDB` (AGPL-3.0).
2. **Permissive Only:**
   - ✅ Allowed: MIT, Apache-2.0, BSD-2/3, CC0 1.0 (Public Domain).
   - ✅ Exercise Data: `wrkout/exercises.json` / Free Exercise DB (text metadata only; no scraped ExRx images).
   - ✅ Exercise Media: `Workout.cool` (clean MIT media) or custom renders.
   - ✅ Nutrition Data: **USDA FoodData Central** (CC0 1.0 public domain).
   - ✅ Barcode Scanning: `ZXing` (Apache-2.0) / `Quagga2` (MIT) client-side decode.

---

## 7. AI Nutrition Architecture (Zero Hallucination Rule)

When implementing the food photo recognition feature:
```
1. Photo uploaded → Vision LLM (OpenAI / Gemini paid tier) detects items + portions (JSON).
2. Backend matches detected food string against the authoritative USDA FoodData Central table.
3. Nutrition numbers (calories, protein, carbs, fat, fiber) are resolved strictly from USDA data.
4. The AI model is NEVER allowed to guess or invent final calorie/macro numbers.
5. Member confirms or adjusts portion size before the meal is saved.
```

---

## 8. UI/UX Design System Rules (Impeccable & UI/UX Pro Max)

1. **Actionable Over Decorative:**
   - Every dashboard card must answer an immediate operational question: *Who do I call today? Which payment failed? Who returned?* Avoid empty decorative charts.
2. **Strict Color Rules (OKLCH):**
   - Discard legacy `#3B49DF` Indigo and `#0B0F19` Slate.
   - Use OKLCH tokens throughout.
   - Body text must meet $\ge 4.5:1$ contrast against background; headers $\ge 3:1$.
   - **No low-contrast grey text.** Light grey body text on white is strictly banned.
3. **Typography & Layout:**
   - Display headings capped at `clamp(..., 6rem)`.
   - Display letter spacing floor: $\ge -0.04\text{em}$ (never overly cramped).
   - Cards used only when genuinely the best affordance; nested cards are forbidden.
   - Responsive breakpoints tested across mobile phone (375px), tablet (768px), and desktop (1280px+).

---

## 9. Security, Privacy & Compliance (Indian DPDP Act)

1. **Input Validation:**
   - Validate all inputs on the server side: type, length, format, allowed values. Frontend validation is for UX only, never security.
2. **Consent Separation:**
   - Transactional communication (attendance alerts, payment receipts, renewals) and promotional marketing messages require separate consent flags.
3. **Media Offloading:**
   - User progress photos, meal photos, and receipts must be stored off-box in S3/R2/B2 object storage with pre-signed URLs. Never store large user media on the VPS disk.

---

## 10. Mandatory Memory & Self-Improvement Auto-Update Rule (Strict P0)

1. **Automatic Continuous Updates:**
   - Every AI coding agent working on Kynvelo MUST automatically update `LEARNING.md` and `AGENTS.md` / `.agent.md` without waiting to be reminded whenever:
     - A bug, failure, or edge case is encountered and resolved (recording Date, Symptom, Root Cause, Fix, and Prevention Rule).
     - A new architectural pattern, schema model, or integration is proven successful.
     - A key design decision, tradeoff, or invariant is established.
2. **Session Start Continuity:**
   - At the beginning of every session, the AI MUST read `AGENTS.md`, `RULES.md`, and `LEARNING.md` before executing implementation work.

---

## 11. Enterprise GitHub Issue, Branching & PR Standard (Strict P0)

1. **Zero Direct-to-Main Development:** All feature implementation and bug fixes must occur on semantic feature branches (`feature/<slug>` or `fix/<slug>`).
2. **Issue Tracking:** Before starting a feature, create or link a GitHub Issue via `gh issue create`.
3. **Pull Request Protocol:**
   - Every completed branch must be pushed to remote and merged via Pull Request (`gh pr create`).
   - PR description must include issue linkage (`Closes #...`), verification details, and changelog.
   - Merged cleanly into `main` using squash merge (`gh pr merge --squash --delete-branch`).
4. **Conventional Commits:** Every commit must follow Conventional Commits standard (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).


