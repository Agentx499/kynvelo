/* Regression test for the defect that started this: `/` advertised two athlete
   tiers while `/pricing` advertised three, and their "Pro" tiers contained
   different features.

   Drives the real UI so it catches divergence in rendered output, not just in
   the constants file.
   Run: node _audit/pricing-consistency.mjs */

import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const BASE = "http://localhost:3210";
let fails = 0;
const fail = (m) => {
  console.log("  FAIL " + m);
  fails++;
};
const ok = (m) => console.log("  ok   " + m);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

/* --- Expected values, read from the single source of truth --- */
const src = readFileSync("lib/pricing.ts", "utf8");
const expectAthlete = ["Free", "Starter", "Pro"];
const expectGym = ["Starter", "Growth", "Enterprise"];

console.log("=== SOURCE OF TRUTH ===\n");
for (const [label, re] of [
  ["athlete Starter ₹99", /monthly:\s*99/],
  ["athlete Starter ₹899/yr", /annual:\s*899/],
  ["athlete Pro ₹299", /monthly:\s*299/],
  ["athlete Pro ₹2,499/yr", /annual:\s*2499/],
  ["gym Starter ₹2,999", /monthly:\s*2999/],
  ["gym Growth ₹5,999", /monthly:\s*5999/],
  ["block +50 ₹1,499", /members:\s*50,\s*monthly:\s*1499/],
  ["block +100 ₹2,799", /members:\s*100,\s*monthly:\s*2799/],
  ["commission 20%", /rate:\s*0\.2/],
  ["commission 6 months", /months:\s*6/],
  ["cap ₹10,000", /capPerGym:\s*10000/],
  ["min payout ₹1,000", /minPayout:\s*1000/],
]) {
  if (re.test(src)) ok(label);
  else fail(`lib/pricing.ts missing ${label}`);
}
/* The removed rungs must stay removed. */
if (/members:\s*150/.test(src)) fail("unspecced +150 block rung is back");
else ok("no unspecced +150 rung");
if (/members:\s*200/.test(src)) fail("unspecced +200 block rung is back");
else ok("no unspecced +200 rung");
if (/Elite/.test(src)) fail("'Elite' tier name present in pricing source");
else ok("no 'Elite' tier");

/* --- Athlete tiers on / --- */
console.log("\n=== ATHLETE TIERS: / vs /pricing ===\n");

await page.goto(`${BASE}/#pricing`, { waitUntil: "networkidle" });
const homeTiers = await page.evaluate(() => {
  const sec = document.querySelector("#pricing");
  return [...(sec?.querySelectorAll("h3") ?? [])].map((h) => h.textContent.trim());
});
console.log(`  / tiers      : ${homeTiers.join(", ")}`);

/* --- Athlete tiers on /pricing (needs the audience switch) --- */
await page.goto(`${BASE}/pricing`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "For athletes" }).click();
await page.waitForTimeout(250);
const pricingAthlete = await page.evaluate(() =>
  [...document.querySelectorAll("h3")]
    .map((h) => h.textContent.trim())
    .filter((t) => ["Free", "Starter", "Pro"].includes(t))
);
console.log(`  /pricing     : ${pricingAthlete.join(", ")}`);

for (const t of expectAthlete) {
  if (!homeTiers.includes(t)) fail(`/ is missing the ${t} athlete tier`);
  if (!pricingAthlete.includes(t)) fail(`/pricing is missing the ${t} athlete tier`);
}
if (
  expectAthlete.every((t) => homeTiers.includes(t)) &&
  expectAthlete.every((t) => pricingAthlete.includes(t))
) {
  ok("both pages render all three athlete tiers");
}

/* --- Prices must match across the two pages --- */
const readPrices = () =>
  page.evaluate(() =>
    [...document.querySelectorAll(".tnum")]
      .map((e) => e.textContent.trim())
      .filter((t) => /^₹[\d,]+$/.test(t))
  );

const pricingPrices = await readPrices();
await page.goto(`${BASE}/#pricing`, { waitUntil: "networkidle" });
const homePrices = await readPrices();

for (const p of ["₹899", "₹2,499"]) {
  if (homePrices.includes(p)) ok(`/ shows ${p}`);
  else fail(`/ does not show ${p}`);
  if (pricingPrices.includes(p)) ok(`/pricing shows ${p}`);
  else fail(`/pricing does not show ${p}`);
}

/* --- Barcode scanning must sit in Starter on BOTH pages ---
   This was the subtle half of the bug: / put it in Pro at ₹299 while /pricing
   put it in Starter at ₹99. */
console.log("\n=== FEATURE PLACEMENT ===\n");
const barcodeTier = async () =>
  page.evaluate(() => {
    for (const card of document.querySelectorAll("div")) {
      const h = card.querySelector(":scope > div > h3");
      if (!h) continue;
      if (/barcode/i.test(card.textContent ?? "")) {
        const items = [...card.querySelectorAll("li")].map((l) => l.textContent);
        if (items.some((t) => /barcode/i.test(t ?? ""))) return h.textContent.trim();
      }
    }
    return null;
  });

const homeBarcode = await barcodeTier();
await page.goto(`${BASE}/pricing`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "For athletes" }).click();
await page.waitForTimeout(250);
const pricingBarcode = await barcodeTier();

console.log(`  / barcode in        : ${homeBarcode}`);
console.log(`  /pricing barcode in : ${pricingBarcode}`);
if (homeBarcode === pricingBarcode && homeBarcode === "Starter") {
  ok("barcode scanning is in Starter on both pages");
} else {
  fail(`barcode tier mismatch: / = ${homeBarcode}, /pricing = ${pricingBarcode}`);
}

/* --- Gym tiers --- */
console.log("\n=== GYM TIERS ===\n");
await page.getByRole("button", { name: "For gyms" }).click();
await page.waitForTimeout(250);
const gymTiers = await page.evaluate(() =>
  [...document.querySelectorAll("h3")]
    .map((h) => h.textContent.trim())
    .filter((t) => ["Starter", "Growth", "Enterprise"].includes(t))
);
console.log(`  /pricing gym : ${gymTiers.join(", ")}`);
for (const t of expectGym) {
  if (gymTiers.includes(t)) ok(`${t} present`);
  else fail(`gym tier ${t} missing`);
}

/* --- Overage base must follow the selected tier, not always Growth --- */
console.log("\n=== OVERAGE BASE FOLLOWS SELECTED TIER ===\n");
const overageFor = async (tier) => {
  const group = page.getByRole("group", { name: "Plan the blocks apply to" });
  await group.getByRole("button", { name: tier, exact: true }).click();
  await page.waitForTimeout(200);
  /* Read the computed total, which is the "₹N /month" figure that sits beside
     the "<Tier>, 100 members" label. Matching on the label text alone picked up
     a feature bullet that also ends in "members". */
  return page.evaluate(() => {
    for (const s of document.querySelectorAll("span")) {
      const t = s.textContent?.trim() ?? "";
      if (/^(Starter|Growth),\s*\d+\s*members$/.test(t)) {
        const row = s.parentElement;
        const price = row?.querySelector("span.tnum");
        return price?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      }
    }
    return "";
  });
};
const starterOverage = await overageFor("Starter");
const growthOverage = await overageFor("Growth");
console.log(`  Starter base : ${starterOverage}`);
console.log(`  Growth base  : ${growthOverage}`);
if (starterOverage !== growthOverage) {
  ok("Starter and Growth show different bases");
} else {
  fail("overage base identical for Starter and Growth — still hardcoded to one tier");
}

/* --- Partner commission uses shared constants --- */
console.log("\n=== PARTNER COMMISSION ===\n");
await page.goto(`${BASE}/partners`, { waitUntil: "networkidle" });
const partnerText = await page.evaluate(() => document.body.innerText);
for (const [label, needle] of [
  ["20%", "20%"],
  ["6 months", "6 months"],
  ["₹10,000 cap", "₹10,000"],
  ["₹1,000 min payout", "₹1,000"],
]) {
  if (partnerText.includes(needle)) ok(`/partners states ${label}`);
  else fail(`/partners missing ${label}`);
}
if (/10,000\s*(a|per)\s*month/i.test(partnerText) || partnerText.includes("10 months")) {
  fail("/partners still shows the retracted ₹10,000/month or 10-month terms");
} else {
  ok("no retracted ₹10,000/month or 10-month terms");
}

await browser.close();
console.log(
  `\n=== ${fails === 0 ? "PRICING IS CONSISTENT ACROSS ALL SURFACES" : fails + " FAILURE(S)"} ===`
);
process.exit(fails === 0 ? 0 : 1);
