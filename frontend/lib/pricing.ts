/* ==========================================================================
   SINGLE SOURCE OF TRUTH FOR PRICING
   --------------------------------------------------------------------------
   Every price, tier, cap, fee and rate on the marketing site comes from here.

   WHY THIS FILE EXISTS: prices were previously duplicated across
   athlete-plans.tsx, pricing-tables.tsx and partner-calculator.tsx, with five
   independent currency formatters. The result was that `/` advertised two
   athlete tiers (Free + Pro ₹299) while `/pricing` advertised three
   (Free + Starter ₹99 + Pro ₹299), and the two "Pro" tiers contained
   different features - the homepage sold at ₹299 a bundle the pricing page
   sold at ₹99. Nothing caught it because nothing was shared.

   Canonical spec: PRODUCT.md section 5.
   Where PRODUCT.md and this file deliberately differ, it is marked DECISION
   and PRODUCT.md is being updated to match.
   ========================================================================== */

export type Interval = "monthly" | "annual";

export type Tier = {
  id: string;
  name: string;
  /** null = "Custom", quote-based. */
  monthly: number | null;
  annual: number | null;
  cap?: string;
  pitch: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

/* --------------------------------------------------------------------------
   ATHLETE TIERS (B2C) — PRODUCT.md 5.1
   Three tiers. Both `/` and `/pricing` render this same array, so they cannot
   drift again.

   DECISION (2026-09-04): Free keeps the plate calculator, personal records and
   1RM estimates. PRODUCT.md 5.1 scopes Free to "manual logging, 1 active goal,
   7-day history" only. Those three features are pure client-side arithmetic
   with no marginal serving cost, and they are the strongest adoption driver we
   have. PRODUCT.md is being updated to match this, not the reverse.
   -------------------------------------------------------------------------- */
export const ATHLETE_TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    annual: 0,
    pitch: "Everything you need to log a session properly.",
    features: [
      "Unlimited workout logging",
      "Olympic plate calculator",
      "Personal records and 1RM estimates",
      "Muscle recovery heatmap",
      "1 active goal, 7-day nutrition history",
      "Gym check-in pass",
    ],
    cta: { label: "Create free account", href: "/signup" },
  },
  {
    id: "starter",
    name: "Starter",
    monthly: 99,
    annual: 899,
    pitch: "Full nutrition tracking, unlimited history, streaks.",
    features: [
      "Everything in Free",
      "Barcode scanning",
      "Unlimited nutrition history",
      "Streaks and habit tracking",
      "Hydration and quick-add logging",
      "Steps and cardio sessions",
    ],
    cta: { label: "Choose Starter", href: "/signup" },
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 299,
    annual: 2499,
    pitch: "Adds the two-stage AI meal scan and full analytics.",
    features: [
      "Everything in Starter",
      "AI photo meal scan, USDA-verified",
      "Macro, micronutrient and PR analytics",
      "TDEE and readiness scoring",
      "Transformation photo vault",
      "Workout plan builder and data export",
    ],
    cta: { label: "Choose Pro", href: "/signup" },
    featured: true,
  },
];

/* --------------------------------------------------------------------------
   GYM TIERS (B2B) — PRODUCT.md 5.2
   -------------------------------------------------------------------------- */
export const GYM_TIERS: Tier[] = [
  {
    id: "gym-starter",
    name: "Starter",
    monthly: 2999,
    annual: 28999,
    cap: "Up to 100 members",
    pitch: "Access control, retention and billing.",
    features: [
      "Turnstile and QR check-in",
      "No-show red list CRM",
      "Auto-renewal reminders",
      "UPI payments and GST invoicing",
      "Cash and POS reconciliation",
      "Add-on marketplace",
    ],
    cta: { label: "Start trial", href: "/business/signup" },
  },
  {
    id: "gym-growth",
    name: "Growth",
    monthly: 5999,
    annual: 57999,
    cap: "Up to 100 members",
    pitch: "Adds the full member app under your own branding.",
    features: [
      "Everything in Starter",
      "Full workout and nutrition app for members",
      "Trainer and dietitian tools",
      "Owner metrics dashboard",
      "White-label branding",
      "Supplement inventory tracking",
    ],
    cta: { label: "Start trial", href: "/business/signup" },
    featured: true,
  },
  {
    id: "gym-enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    cap: "Multi-location",
    pitch: "Your own App Store listing, SSO and integrations.",
    features: [
      "Everything in Growth",
      "Multiple locations with rollup reporting",
      "Your own App Store and Play listing",
      "SSO via SAML or OIDC",
      "Custom integrations",
    ],
    cta: { label: "Talk to us", href: "/enterprise" },
  },
];

/* --------------------------------------------------------------------------
   MEMBER CAPACITY BLOCKS — PRODUCT.md 5.2
   Blocks apply to Starter AND Growth. The previous implementation always
   priced them against Growth, so a Starter buyer saw the wrong base.

   DECISION (2026-09-04): the invented +150 and +200 rungs are removed. Only
   +50 and +100 are specified; anything beyond that is a conversation, not a
   slider position.
   -------------------------------------------------------------------------- */
export const MEMBER_BLOCKS = [
  { members: 0, monthly: 0 },
  { members: 50, monthly: 1499 },
  { members: 100, monthly: 2799 },
] as const;

export const INCLUDED_MEMBERS = 100;

/* --------------------------------------------------------------------------
   SETUP FEE — PRODUCT.md 5.2
   -------------------------------------------------------------------------- */
export const SETUP_FEE = {
  min: 5000,
  max: 15000,
  waivedOn: "annual prepay",
} as const;

/* --------------------------------------------------------------------------
   TAX — RULES.md section 4, SAC 999723 fitness centre services
   -------------------------------------------------------------------------- */
export const GST = {
  rate: 0.18,
  cgst: 0.09,
  sgst: 0.09,
  sac: "999723",
  label: "18% GST (9% CGST + 9% SGST)",
} as const;

/* --------------------------------------------------------------------------
   PARTNER COMMISSION — PRODUCT.md 5.3

   SPEC CONFLICT, RESOLVED IN FAVOUR OF PRODUCT.md:
   FEATURES.md 8.1, SCREENS.md p82 and WIREFRAMES all state "₹10,000 per gym
   per month for 10 months" (= ₹100,000 per gym). On the Starter plan that pays
   the partner more than the gym pays us, every month. PRODUCT.md 5.3 states
   20% of base plan fees for 6 months capped at ₹10,000 total, which is
   solvent. Those three documents are being corrected.

   DECISION (2026-09-04): the ₹1,000 minimum payout threshold is retained and
   added to PRODUCT.md. Below that figure, bank transfer fees consume a
   meaningful share of the payment.
   -------------------------------------------------------------------------- */
export const COMMISSION = {
  rate: 0.2,
  months: 6,
  capPerGym: 10000,
  minPayout: 1000,
} as const;

/* --------------------------------------------------------------------------
   FEATURE COMPARISON MATRIX (gym tiers)
   -------------------------------------------------------------------------- */
export type ComparisonValue = boolean | string;

export const GYM_COMPARISON: {
  group: string;
  rows: {
    label: string;
    starter: ComparisonValue;
    growth: ComparisonValue;
    enterprise: ComparisonValue;
  }[];
}[] = [
  {
    group: "Access and attendance",
    rows: [
      { label: "Rotating 15-second QR check-in", starter: true, growth: true, enterprise: true },
      { label: "Turnstile relay integration", starter: true, growth: true, enterprise: true },
      { label: "Assisted entry with reason audit", starter: true, growth: true, enterprise: true },
      { label: "Offline check-in queue", starter: true, growth: true, enterprise: true },
    ],
  },
  {
    group: "Retention",
    rows: [
      { label: "No-show red list, 3 risk tiers", starter: true, growth: true, enterprise: true },
      { label: "One-tap WhatsApp and call", starter: true, growth: true, enterprise: true },
      { label: "Mandatory outcome logging", starter: true, growth: true, enterprise: true },
      { label: "Staff anti-collision lock", starter: true, growth: true, enterprise: true },
      { label: "Member attendance streaks", starter: false, growth: true, enterprise: true },
      { label: "Owner metrics dashboard", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    group: "Money",
    rows: [
      { label: "Self-service UPI renewals", starter: true, growth: true, enterprise: true },
      { label: "GST invoicing (CGST/SGST)", starter: true, growth: true, enterprise: true },
      { label: "Cash and POS reconciliation", starter: true, growth: true, enterprise: true },
      { label: "Add-on marketplace", starter: true, growth: true, enterprise: true },
      { label: "Supplement inventory and low-stock alerts", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    group: "What your members get",
    rows: [
      { label: "Workout logging and plate math", starter: false, growth: true, enterprise: true },
      { label: "AI nutrition scan, USDA-verified", starter: false, growth: true, enterprise: true },
      { label: "Recovery heatmap and readiness", starter: false, growth: true, enterprise: true },
      { label: "Steps, cardio and Health sync", starter: false, growth: true, enterprise: true },
      { label: "Transformation photo vault", starter: false, growth: true, enterprise: true },
      { label: "Trainer and dietitian tools", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    group: "Branding and platform",
    rows: [
      { label: "White-label branding", starter: false, growth: true, enterprise: true },
      { label: "Your own App Store listing", starter: false, growth: false, enterprise: true },
      { label: "Locations", starter: "1", growth: "1", enterprise: "Unlimited" },
      { label: "Included members", starter: "100", growth: "100", enterprise: "Custom" },
      { label: "SSO", starter: false, growth: false, enterprise: true },
    ],
  },
];

/* --------------------------------------------------------------------------
   DERIVED HELPERS
   -------------------------------------------------------------------------- */

/** Annual saving against paying monthly for twelve months. */
export function annualSaving(tier: Tier): number {
  if (!tier.monthly || !tier.annual) return 0;
  return Math.max(0, tier.monthly * 12 - tier.annual);
}

/** Effective monthly cost, so annual and monthly can be compared honestly. */
export function monthlyEquivalent(tier: Tier, interval: Interval): number | null {
  if (tier.monthly === null || tier.annual === null) return null;
  return interval === "annual" ? Math.round(tier.annual / 12) : tier.monthly;
}

/**
 * What a gym's members would pay individually for the same app.
 * This is the Growth-tier argument: 100 members on Pro is worth far more than
 * the plan costs. Derived from ATHLETE_TIERS so it can never go stale.
 */
export function memberValueComparison(memberCount = INCLUDED_MEMBERS) {
  const pro = ATHLETE_TIERS.find((t) => t.id === "pro");
  const growth = GYM_TIERS.find((t) => t.id === "gym-growth");
  const perMember = pro?.monthly ?? 0;
  const individualTotal = perMember * memberCount;
  const planCost = growth?.monthly ?? 0;
  return {
    memberCount,
    perMember,
    individualTotal,
    planCost,
    multiple: planCost > 0 ? individualTotal / planCost : 0,
  };
}
