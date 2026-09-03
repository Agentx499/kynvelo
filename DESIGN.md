---
version: 1.0.0
name: Kynvelo-Kinetic-Volt-Design-System
description: "A high-performance athletic enterprise design system built around deep obsidian carbon surfaces, razor-sharp hairline borders, and the signature Kinetic Volt (#C6FF00 / oklch(0.85 0.20 135)) accent. Designed for rapid telemetry visualization, dark-mode OLED power efficiency, and zero-latency fitness workflows."
---

# Kynvelo Design System (DESIGN.md)

**Product:** Kynvelo (Fitness Business Operating System)  
**Selected Theme:** Option 1 — Kinetic Volt & Obsidian Carbon  
**Design Intelligence:** Impeccable (v3.9.1), UI/UX Pro Max, Awesome-Design-MD (Linear / Vercel benchmarks)  

---

## 1. Design Philosophy: Kinetic Precision

Kynvelo rejects decorative, low-contrast fluff and generic AI purple gradients. It is built on three core pillars:
1. **Athletic Velocity:** High-energy visual signals (Kinetic Volt) applied exclusively to active triggers, streak achievements, PR alerts, and primary CTAs.
2. **Flight-Deck Legibility:** Deep obsidian carbon canvas (`#0D0E11`) paired with crisp platinum text (`#F9F9F9`) providing $>14:1$ WCAG contrast.
3. **Data Density:** Dense, clean tabular telemetry (set weights, rest countdowns, macro splits, no-show timelines) formatted for sub-second comprehension on the gym floor.

---

## 2. Color Tokens (OKLCH Native Architecture)

All color tokens are strictly declared in OKLCH in CSS variables to eliminate gamut clipping and preserve perceptual luminance.

```css
:root {
  /* ==========================================================================
     CANVAS & ELEVATED SURFACES (Deep Obsidian Carbon)
     ========================================================================== */
  --kynvelo-canvas: oklch(0.12 0.005 260);          /* #0D0E11 - Main Page Background */
  --kynvelo-surface-1: oklch(0.15 0.007 260);       /* #131518 - Default Card & Panel */
  --kynvelo-surface-2: oklch(0.18 0.009 260);       /* #191C20 - Hover / Elevated Card */
  --kynvelo-surface-3: oklch(0.22 0.010 260);       /* #22252A - Modals, Drawers & Sheets */
  --kynvelo-surface-4: oklch(0.26 0.012 260);       /* #2B2F36 - Popovers & Dropdowns */

  /* ==========================================================================
     HAIRLINES & BORDERS (Precision 1px Separators)
     ========================================================================== */
  --kynvelo-hairline: oklch(0.24 0.010 260);        /* #24272D - Subtle Dividers */
  --kynvelo-hairline-strong: oklch(0.32 0.012 260); /* #373C45 - Card Borders */
  --kynvelo-hairline-hover: oklch(0.42 0.015 260);  /* #4E5562 - Interactive Borders */

  /* ==========================================================================
     PRIMARY BRAND COLOR: KINETIC VOLT (Athletic Energy)
     ========================================================================== */
  --kynvelo-primary: oklch(0.85 0.20 135);          /* #C6FF00 - Kinetic Volt Core */
  --kynvelo-primary-hover: oklch(0.88 0.22 135);    /* #D2FF1A - Brightened Hover */
  --kynvelo-primary-active: oklch(0.80 0.18 135);   /* #B4E600 - Pressed State */
  --kynvelo-primary-dim: oklch(0.85 0.20 135 / 0.15);/* Volt Tint for Badges/Pills */
  --kynvelo-on-primary: oklch(0.12 0.005 260);      /* #0D0E11 - Dark Text on Volt Buttons */

  /* ==========================================================================
     TYPOGRAPHY & INK (High-Contrast White & Grays)
     ========================================================================== */
  --kynvelo-ink: oklch(0.98 0.000 0);               /* #F9F9F9 - Primary Headlines & Body */
  --kynvelo-ink-muted: oklch(0.72 0.015 260);       /* #B0B5BE - Subheads & Secondary Labels */
  --kynvelo-ink-subtle: oklch(0.52 0.018 260);      /* #7A818E - Timestamps & Helper Text */
  --kynvelo-ink-disabled: oklch(0.38 0.015 260);    /* #535862 - Disabled State */

  /* ==========================================================================
     SEMANTIC STATUS TOKENS
     ========================================================================== */
  --kynvelo-success: oklch(0.75 0.18 145);          /* Active Member / PR Achieved / Green Check */
  --kynvelo-warning: oklch(0.78 0.18 70);           /* 10-14 Day Red-List / Expiring Soon */
  --kynvelo-danger: oklch(0.65 0.22 25);            /* 22+ Day Red-List / Payment Failed / Lapsed */
  --kynvelo-info: oklch(0.75 0.16 220);             /* Attendance Pulse / Informational Pills */

  /* ==========================================================================
     MACRONUTRIENT CODING (Nutrition Suite)
     ========================================================================== */
  --kynvelo-macro-protein: oklch(0.75 0.18 220);    /* Electric Cyan (Protein) */
  --kynvelo-macro-carbs: oklch(0.82 0.18 75);       /* Golden Amber (Carbohydrates) */
  --kynvelo-macro-fat: oklch(0.72 0.20 25);         /* Coral Pink (Dietary Fats) */
  --kynvelo-macro-calories: oklch(0.85 0.20 135);   /* Kinetic Volt (Total Energy Ring) */
}
```

---

## 3. Typography System

Kynvelo utilizes a high-contrast dual-font architecture:
- **Primary Sans:** `Plus Jakarta Sans` (for geometric, clean, modern headings and UI labels).
- **Telemetry Monospace:** `JetBrains Mono` (for numbers, weights, set counts, rest timers, and turnstile timestamps).

### Typography Scale
| Token | Font Family | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| `display-xl` | Plus Jakarta Sans | 48px | 800 (ExtraBold) | 1.10 | -0.03em | Marketing Hero Headlines |
| `display-lg` | Plus Jakarta Sans | 36px | 700 (Bold) | 1.15 | -0.025em | Screen Titles, Big Stats |
| `heading-1` | Plus Jakarta Sans | 28px | 700 (Bold) | 1.20 | -0.02em | Section Headers, Modal Titles |
| `heading-2` | Plus Jakarta Sans | 22px | 600 (SemiBold) | 1.25 | -0.015em | Card Titles, Drawer Headers |
| `heading-3` | Plus Jakarta Sans | 18px | 600 (SemiBold) | 1.30 | -0.01em | Metric Card Labels, Subheads |
| `body-lg` | Plus Jakarta Sans | 16px | 400 (Regular) | 1.50 | 0.00em | Standard Body Copy, Descriptions |
| `body-md` | Plus Jakarta Sans | 14px | 400 (Regular) | 1.45 | 0.00em | Form Inputs, Table Cells |
| `body-sm` | Plus Jakarta Sans | 12px | 500 (Medium) | 1.40 | +0.01em | Metadata, Helper Text, Badges |
| `telemetry-lg`| JetBrains Mono | 24px | 700 (Bold) | 1.10 | -0.02em | Active Rest Timer, 1RM Weight |
| `telemetry-md`| JetBrains Mono | 16px | 600 (SemiBold) | 1.20 | 0.00em | Set Reps/Weight Matrix, Calorie Count |
| `telemetry-sm`| JetBrains Mono | 13px | 500 (Medium) | 1.20 | +0.02em | Turnstile Timestamp, Barcode Value |

---

## 4. Spacing, Radii, and Elevation Hierarchy

### 4.1 Spacing Scale (4px / 8px Baseline)
`2px`, `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`.

### 4.2 Border Radii
- **Badges & Pills:** `9999px` (`rounded-full`)
- **Buttons & Inputs:** `8px` (`rounded-lg`)
- **Cards & Data Panels:** `12px` (`rounded-xl`)
- **Modals, Drawers & Sheets:** `16px` (`rounded-2xl`)

### 4.3 Elevation & Shadows
- **Level 0 (Base Canvas):** No shadow. Flat 1px border `var(--kynvelo-hairline)`.
- **Level 1 (Card):** `0 1px 3px rgba(0, 0, 0, 0.4)`, border `var(--kynvelo-hairline-strong)`.
- **Level 2 (Hover / Elevated):** `0 4px 12px rgba(0, 0, 0, 0.6)`, border `var(--kynvelo-hairline-hover)`.
- **Level 3 (Modal / Floating QR):** `0 16px 40px rgba(0, 0, 0, 0.85)`, subtle Kinetic Volt ambient border glow: `0 0 20px rgba(198, 255, 0, 0.15)`.

---

## 5. Core Component Specifications

### 5.1 Kinetic Primary Button (`.btn-primary`)
- **Background:** `var(--kynvelo-primary)` (`#C6FF00`)
- **Text Color:** `var(--kynvelo-on-primary)` (`#0D0E11` bold)
- **Border:** None.
- **Height:** `44px` minimum (enforces strict mobile touch target compliance).
- **Hover:** `background: var(--kynvelo-primary-hover)`, subtle box shadow `0 0 12px rgba(198, 255, 0, 0.35)`.
- **Active:** Scale transform `scale(0.98)`, `background: var(--kynvelo-primary-active)`.
- **Transition:** `all 150ms cubic-bezier(0.16, 1, 0.3, 1)`.

### 5.2 Secondary / Ghost Button (`.btn-secondary`)
- **Background:** `transparent`
- **Text Color:** `var(--kynvelo-ink)` (`#F9F9F9`)
- **Border:** `1px solid var(--kynvelo-hairline-strong)`
- **Hover:** `background: var(--kynvelo-surface-2)`, `border-color: var(--kynvelo-hairline-hover)`.

### 5.3 Active Dynamic QR Container
- **Card Background:** Pure white `#FFFFFF` (maximizes camera barcode scanner contrast on member screens).
- **Surrounding Frame:** Deep obsidian panel with animated rotating border halo and auto-boosted screen brightness.
- **Refresh Indicator:** 15s circular countdown progress bar in Kinetic Volt.

### 5.4 Workout Set-by-Set Logging Row
- **Columns:** Set Number (Mono), Previous Session Weight/Reps (Subtle), Weight Input (kg), Reps Input, Completion Checkbox.
- **Checkbox:** Kinetic Volt border. Upon click, triggers green fill checkmark, records timestamp, and auto-starts the rest timer floating bar.

### 5.5 Nutrition Concentric Calorie & Macro Progress Ring
- **Outer Ring:** Total Calories Consumed vs Budget (Kinetic Volt).
- **Inner Ring 1:** Protein Grams vs Goal (Electric Cyan).
- **Inner Ring 2:** Carbohydrate Grams vs Goal (Golden Amber).
- **Inner Ring 3:** Fat Grams vs Goal (Coral Pink).

### 5.6 No-Show Red-List CRM Member Card
- **Layout:** Row card with member photo, full name, phone number, and days absent pill (`14 days` amber badge).
- **Quick Actions:** Instant WhatsApp icon button (deep link), Call icon button (native tel:), and "Log Outcome" trigger button.
- **Collision Flag:** Inactive amber outline if another staff member is currently reviewing.

---

## 6. Dynamic White-Label Theming Engine

For Starter and Growth tier gyms, the Next.js frontend injects custom variables at runtime based on the resolved `gym_id`:

```css
/* Gym Tenant Branding Overrides */
[data-tenant="olympic-fitness"] {
  --kynvelo-primary: var(--gym-primary-color);
  --kynvelo-primary-hover: var(--gym-primary-hover);
  --kynvelo-primary-dim: var(--gym-primary-dim);
  --kynvelo-on-primary: var(--gym-on-primary-color);
}
```
*The base dark canvas, hairline borders, and typography remain invariant, ensuring that white-labeled gyms look professionally engineered while honoring their unique brand palette.*

---

## 7. Accessibility & Anti-Cliché Invariants

1. **Strict Purple Ban:** Never use purple/violet buttons or backgrounds.
2. **Text Contrast Floor:** Body text (`--kynvelo-ink` on `--kynvelo-canvas`) must always exceed $7:1$. Secondary text (`--kynvelo-ink-muted`) must exceed $4.5:1$.
3. **No Dark Text on Dark Backgrounds:** Form inputs, placeholders, and table headers must remain sharply visible.
4. **Touch Targets:** All interactive controls, pills, and checkboxes must have a minimum clickable area of $44 \times 44\text{px}$.
5. **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, all pulse animations and transitions are clamped to 0ms instant state changes.
