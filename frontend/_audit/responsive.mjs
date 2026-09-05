/* Responsive + a11y audit at the three breakpoints RULES.md 8.3 mandates.
   Checks the things that actually break: horizontal overflow, touch target
   size, contrast of the muted inks, and heading overflow.

   Temporary; delete after use.
   Run: node _audit/responsive.mjs */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3210";
const OUT = "_audit/shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 1000 },
];

const PAGES = [
  ["home", "/"],
  ["business", "/business"],
  ["pricing", "/pricing"],
  ["enterprise", "/enterprise"],
  ["roi", "/roi-calculator"],
  ["partners", "/partners"],
  ["legal", "/legal/privacy"],
  ["signup", "/signup"],
  ["404", "/this-page-does-not-exist"],
];

let fails = 0;
const fail = (m) => {
  console.log("  FAIL " + m);
  fails++;
};

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  console.log(`\n=== ${vp.name} (${vp.width}px) ===\n`);
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const [label, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);

    /* --- horizontal overflow ---
       Measure document.body, not document.documentElement. documentElement's
       scrollWidth includes descendants that are clipped inside an
       overflow-x-auto container, so a table intentionally scrolling inside its
       own box reads as a page-level overflow. body.scrollWidth reflects what
       the user can actually scroll. */
    const overflow = await page.evaluate(() => {
      return {
        scroll: document.body.scrollWidth,
        client: document.documentElement.clientWidth,
      };
    });
    const overflows = overflow.scroll > overflow.client + 1;
    if (overflows) {
      const culprits = await page.evaluate((vw) => {
        const out = [];
        for (const el of document.querySelectorAll("*")) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > vw + 1) {
            out.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`
            );
          }
          if (out.length >= 4) break;
        }
        return out;
      }, overflow.client);
      fail(
        `${label} @${vp.width} overflows (${overflow.scroll} > ${overflow.client}) :: ${culprits.join(" | ")}`
      );
    }

    // --- touch targets on mobile ---
    let smallTargets = [];
    if (vp.width === 375) {
      smallTargets = await page.evaluate(() => {
        const bad = [];
        for (const el of document.querySelectorAll(
          "a, button, input, [role=button]"
        )) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const style = getComputedStyle(el);
          if (style.visibility === "hidden" || style.display === "none") continue;
          // sr-only elements (skip link) are 1px until focused, at which point
          // they render at full size. Not a real touch target.
          if (r.height <= 2 && r.width <= 2) continue;
          // Inline text links inside paragraphs are exempt.
          const inProse = el.closest("p, li, dd, figcaption, caption, td, th");
          if (el.tagName === "A" && inProse) continue;
          if (r.height < 44) {
            bad.push(
              `${el.tagName.toLowerCase()}"${(el.textContent || "").trim().slice(0, 26)}" h=${Math.round(r.height)}`
            );
          }
        }
        return bad.slice(0, 6);
      });
      if (smallTargets.length)
        fail(`${label} @375 touch targets <44px :: ${smallTargets.join(" | ")}`);
    }

    // --- heading overflow (clipped display type) ---
    const clipped = await page.evaluate(() => {
      const bad = [];
      for (const h of document.querySelectorAll("h1, h2, h3")) {
        if (h.scrollWidth > h.clientWidth + 2) {
          bad.push(`${h.tagName} "${(h.textContent || "").trim().slice(0, 34)}"`);
        }
      }
      return bad.slice(0, 4);
    });
    if (clipped.length)
      fail(`${label} @${vp.width} heading overflow :: ${clipped.join(" | ")}`);

    const status = !overflows && !smallTargets.length && !clipped.length;
    console.log(`  ${status ? "ok  " : "    "} ${label}`);

    if (vp.width !== 768) {
      await page.screenshot({
        path: `${OUT}/${label}-${vp.name}.png`,
        fullPage: vp.width === 1280,
      });
    }
  }

  await ctx.close();
}

// --- contrast + reduced motion, desktop only ---
console.log("\n=== CONTRAST (computed, homepage) ===\n");
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle" });

const contrast = await page.evaluate(() => {
  const lum = (c) => {
    const [r, g, b] = c.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };

  const bg = parse(getComputedStyle(document.body).backgroundColor);
  const samples = {};
  for (const sel of ["p", "h1", "h2", "a", "dd", "figcaption", "th", "td"]) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const fg = parse(getComputedStyle(el).color);
    const size = parseFloat(getComputedStyle(el).fontSize);
    samples[sel] = { ratio: +ratio(fg, bg).toFixed(2), fontSize: size };
  }
  return samples;
});

for (const [sel, v] of Object.entries(contrast)) {
  const large = v.fontSize >= 24;
  const min = large ? 3 : 4.5;
  const ok = v.ratio >= min;
  console.log(
    `  ${ok ? "ok  " : "FAIL"} ${sel.padEnd(12)} ${v.ratio}:1  (${v.fontSize}px, needs ${min}:1)`
  );
  if (!ok) fails++;
}

console.log("\n=== REDUCED MOTION ===\n");
const rm = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
const rmPage = await rm.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "networkidle" });
const durations = await rmPage.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const s = getComputedStyle(el);
    const d = parseFloat(s.animationDuration) || 0;
    const t = parseFloat(s.transitionDuration) || 0;
    if (d > 0.05 || t > 0.05)
      out.push(`${el.tagName.toLowerCase()} anim=${d}s trans=${t}s`);
  }
  return out.slice(0, 5);
});
if (durations.length) {
  fail("reduced-motion not honoured :: " + durations.join(" | "));
} else {
  console.log("  ok   all animation and transition durations clamped");
}

await browser.close();
console.log(`\n=== ${fails === 0 ? "ALL RESPONSIVE CHECKS PASSED" : fails + " FAILURE(S)"} ===`);
process.exit(fails === 0 ? 0 : 1);

