import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
await page.goto("http://localhost:3200/pricing", { waitUntil: "networkidle" });

const info = await page.evaluate(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;

  // Walk up from the widest offender to find who is failing to clip.
  const offenders = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1) {
      const cs = getComputedStyle(el);
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 70),
        w: Math.round(r.width),
        overflowX: cs.overflowX,
        minWidth: cs.minWidth,
        display: cs.display,
      });
    }
  }

  // Chain from the table upward.
  const table = document.querySelector("table.min-w-\\[680px\\]");
  const chain = [];
  let n = table;
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    const r = n.getBoundingClientRect();
    chain.push({
      tag: n.tagName.toLowerCase(),
      cls: String(n.className).slice(0, 60),
      w: Math.round(r.width),
      scrollW: n.scrollWidth,
      overflowX: cs.overflowX,
      minWidth: cs.minWidth,
      display: cs.display,
    });
    n = n.parentElement;
  }

  return {
    docScrollWidth: de.scrollWidth,
    clientWidth: vw,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: offenders.slice(0, 8),
    chain,
  };
});

console.log("doc.scrollWidth :", info.docScrollWidth);
console.log("doc.clientWidth :", info.clientWidth);
console.log("body.scrollWidth:", info.bodyScrollWidth);
console.log("\n--- elements wider than viewport ---");
for (const o of info.offenders) console.log(JSON.stringify(o));
console.log("\n--- chain from table upward ---");
for (const c of info.chain) console.log(JSON.stringify(c));

await browser.close();
