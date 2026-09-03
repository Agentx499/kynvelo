# Kynvelo — Agent Orchestration & Persistent Session Memory (AGENTS.md)

> **MANDATORY SESSION BOOTSTRAP:** This file acts as the primary persistent memory and behavior orchestrator for all AI pair programming sessions on Kynvelo. Every AI agent must load, understand, and apply these directives at the start of every session.

---

## 1. Project Identity & Active Context

- **Project:** Kynvelo (Fitness Business Operating System)
- **Repo Directory:** `e:\projects\matrix\KYNVELO\`
- **Master Reference:** [kynvelo-master-reference-v2.md](file:///e:/projects/matrix/KYNVELO/kynvelo-master-reference-v2.md)
- **Product Spec:** [PRODUCT.md](file:///e:/projects/matrix/KYNVELO/PRODUCT.md)
- **Rules & Invariants:** [RULES.md](file:///e:/projects/matrix/KYNVELO/RULES.md)
- **Design System (Option 1 Kinetic Volt):** [DESIGN.md](file:///e:/projects/matrix/KYNVELO/DESIGN.md)
- **Design Architecture:** [DESIGN_ARCHITECTURE.md](file:///e:/projects/matrix/KYNVELO/DESIGN_ARCHITECTURE.md)
- **Screen Inventory (97 Screens):** [SCREENS.md](file:///e:/projects/matrix/KYNVELO/SCREENS.md)
- **Features & Benefits Index:** [FEATURES.md](file:///e:/projects/matrix/KYNVELO/FEATURES.md)
- **Component Wireframes & Architecture:** [WIREFRAMES_AND_COMPONENTS.md](file:///e:/projects/matrix/KYNVELO/WIREFRAMES_AND_COMPONENTS.md)
- **Design Knowledge Base:** [awesome-design-md](file:///e:/projects/matrix/KYNVELO/awesome-design-md) (Linear, Stripe, Vercel design references)
- **Self-Improving Memory Log:** [LEARNING.md](file:///e:/projects/matrix/KYNVELO/LEARNING.md)
- **Remote GitHub Repository:** [https://github.com/Agentx499/kynvelo](https://github.com/Agentx499/kynvelo) (Authenticated via `Agentx499`)
- **Active Branches & Flow:** Enterprise PR Workflow (Issues #1–#15, PRs #2, #4, #6, #8, #10, #12, #14, #16 merged to `main`)
- **Verification Standard:** 30-Phase Complete Web & SaaS Building Checklist (Part III of Master Reference)

---

## 2. Session Startup Protocol (Step-by-Step)

Before writing any code or modifying any file in this project, execute this mental checklist:

```
Step 1: Check Current Phase in the 30-Phase Checklist (Part III of Master Reference).
Step 2: Read LEARNING.md to review past bugs, edge cases, and successful architectural patterns.
Step 3: Check RULES.md for multi-tenant isolation, Karpathy guidelines, and copyleft licensing bans.
Step 4: Execute Impeccable Context Check:
        node .agents/skills/impeccable/scripts/context.mjs --target KYNVELO
Step 5: Apply Intelligent Specialist Routing and announce:
        🤖 Applying knowledge of @[specialist-agent]...
```

---

## 3. Specialist Agent Routing & Delegation Map

| Domain / Task Type | Specialist Agent | Active Skills & References | Core Responsibilities |
|---|---|---|---|
| **High-level Coordination & Synthesis** | `orchestrator` | `coordinator-mode`, `parallel-agents`, `brainstorming` | Multi-module coordination, task breakdown, architectural synthesis |
| **Requirements, Phases & Scope** | `project-planner` | `plan-writing`, `architecture` | 4-phase methodology, implementation plans, milestone gating |
| **Frontend UI / UX / Styling** | `frontend-specialist` | `impeccable`, `ui-ux-pro-max`, `frontend-design`, `tailwind-patterns` | Actionable UI, OKLCH color palettes, anti-cliché design, responsive layout (375px/768px/1280px+) |
| **Backend / DB / APIs / Tenancy** | `backend-specialist` | `api-patterns`, `database-design`, `python-patterns`, `clean-code` | Modular Django apps, `gym_id` ORM base manager, Celery queues, Redis cache, S3/R2 storage |
| **Security / Payments / Webhooks** | `security-auditor` | `vulnerability-scanner`, `testing-patterns` | Payment idempotency, cryptographic webhook verification, Indian DPDP Act compliance |
| **Root Cause Analysis & Bug Fixes** | `debugger` | `systematic-debugging`, `verify-changes` | 4-phase debugging (observe, reproduce, isolate, fix), regression testing |

---

## 4. Integrated Skill Toolkit

### 4.1 Impeccable (`.agents/skills/impeccable/`)
- **Context Inspection:** `node .agents/skills/impeccable/scripts/context.mjs --target KYNVELO`
- **Color Palette:** `node .agents/skills/impeccable/scripts/palette.mjs` (OKLCH contrast enforcement, no dull grays).
- **Steering Commands:** `/audit`, `/polish`, `/typeset`, `/colorize`, `/animate`, `/bolder`, `/quieter`, `/layout`, `/onboard`.

### 4.2 UI/UX Pro Max (`.agents/skills/ui-ux-pro-max/`)
- **Intelligence Engine:** Searchable local database of 84 styles, 192 palettes, 74 font pairings, and 22 stacks.
- **Search Command:**
  ```bash
  python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain> [--stack <stack>]
  ```
- **Domains:** `product`, `style`, `typography`, `color`, `landing`, `chart`, `ux`, `icons`, `react`, `web`.

### 4.3 Karpathy Guidelines (`.agents/skills/karpathy-guidelines/`)
- **Simplicity First:** Zero speculative abstractions.
- **Surgical Edits:** Touch only necessary lines; clean up only own orphans.
- **Goal-Driven Loops:** Formulate testable success criteria before modifying code.

### 4.4 Context7 MCP & External Documentation
- Used to retrieve the latest official API documentation, SDK reference manuals, and live library definitions without hallucinating deprecated signatures.

---

## 5. Architectural Guardrails (Always Active)

1. **Multi-Tenancy:** Every database query MUST inherit from `TenantModel` using `gym_id`. B2C users belong to `gym_id = "kynvelo-direct"`.
2. **Payment Integrity:** "Initiated" $\neq$ "Paid". Server-side webhook confirmation is mandatory. Idempotent processing.
3. **AI Vision Nutrition:** Vision LLM detects items in JSON $\rightarrow$ Backend resolves calories/macros from USDA FoodData Central. Zero AI hallucinations on calories.
4. **License Defense:** AGPL-3.0 and copyleft dependencies are strictly forbidden.

---

## 6. Mandatory Self-Improvement & Memory Auto-Update Loop

> 🔴 **STRICT AUTOMATIC ENFORCEMENT:** You do NOT wait for the user to ask you to record learnings. Updating persistent memory is a mandatory action.

At the conclusion of each task, turn, or bug fix:
1. **Errors & Bugs:** Immediately log the incident (Date, Symptom, Root Cause, Fix, Prevention Rule) in [LEARNING.md](file:///e:/projects/matrix/KYNVELO/LEARNING.md).
2. **Architectural & Design Decisions:** Log new patterns in `LEARNING.md` (Section 3: Proven Patterns) and update `AGENTS.md` / `.agent.md`.
3. **Session Handoff:** Ensure all newly discovered state, active module flags, and open tasks are documented so the next AI agent picks up with 100% fidelity.
