/* Verification pass over the rendered HTML. No browser needed - this checks
   what the server actually emits, which is where per-page metadata, canonicals
   and link integrity either work or don't.

   Temporary; delete after use.
   Run: node _audit/verify.mjs */

const BASE = "http://localhost:3210";

const PAGES = [
  "/",
  "/business",
  "/for-gyms",
  "/pricing",
  "/enterprise",
  "/roi-calculator",
  "/partners",
  "/signup",
  "/login",
  "/business/signup",
  "/business/login",
  "/legal/terms",
  "/legal/privacy",
  "/legal/refunds",
  "/legal/dpdp",
  "/legal/security",
  "/legal/dpa",
];

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

let fails = 0;
const fail = (m) => {
  console.log("  FAIL " + m);
  fails++;
};

console.log("=== PER-PAGE METADATA ===\n");

const titles = new Map();
const store = {};

for (const path of PAGES) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  store[path] = html;

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const ogTitle = pick(html, /<meta property="og:title" content="([^"]*)"/);
  const robots = pick(html, /<meta name="robots" content="([^"]*)"/);

  console.log(`${path}`);
  console.log(`  status    ${res.status}`);
  console.log(`  title     ${title}`);
  console.log(`  canonical ${canonical}`);
  console.log(`  robots    ${robots ?? "(default)"}`);

  if (res.status !== 200) fail(`${path} returned ${res.status}`);
  if (!title) fail(`${path} has no <title>`);
  if (!desc) fail(`${path} has no meta description`);
  if (!canonical) fail(`${path} has no canonical`);
  if (!ogTitle) fail(`${path} has no og:title`);

  if (title) {
    if (titles.has(title)) {
      fail(`duplicate title shared by ${titles.get(title)} and ${path}`);
    } else {
      titles.set(title, path);
    }
  }
  console.log("");
}

console.log("=== FONTS / TOKENS ON HOMEPAGE ===\n");
const home = store["/"];
for (const [label, re] of [
  ["Barlow Condensed loaded", /Barlow_Condensed|barlow-condensed/i],
  ["JetBrains Mono loaded", /JetBrains|jetbrains/i],
  ["Plus Jakarta absent", /Plus_Jakarta|jakarta/i],
]) {
  const found = re.test(home);
  const want = !label.includes("absent");
  console.log(`  ${found === want ? "ok  " : "FAIL"} ${label} (found=${found})`);
  if (found !== want) fails++;
}

console.log("\n=== SKIP LINK + LANDMARKS ===\n");
for (const [label, re] of [
  ["skip-to-content link", /Skip to content/],
  ["main landmark id", /id="main"/],
  ["h1 present", /<h1/],
]) {
  const ok = re.test(home);
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) fails++;
}

console.log("\n=== ROBOTS / SITEMAP / MANIFEST ===\n");
const robotsTxt = await (await fetch(BASE + "/robots.txt")).text();
console.log(robotsTxt.trim().split("\n").map((l) => "  " + l).join("\n"));

const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`\n  sitemap urls: ${locs.length}`);

const manifest = await (await fetch(BASE + "/manifest.webmanifest")).json();
console.log(`  manifest name: ${manifest.name}`);
console.log(`  manifest start_url: ${manifest.start_url}`);

// Every sitemap URL must resolve 200.
console.log("\n=== SITEMAP URL RESOLUTION ===\n");
for (const loc of locs) {
  const p = new URL(loc).pathname;
  const r = await fetch(BASE + p, { redirect: "manual" });
  if (r.status !== 200) fail(`sitemap lists ${p} which returned ${r.status}`);
}
console.log(`  checked ${locs.length} sitemap urls`);

// robots must not disallow anything the sitemap advertises.
const disallowed = [...robotsTxt.matchAll(/Disallow:\s*(\S+)/g)].map((m) => m[1]);
for (const loc of locs) {
  const p = new URL(loc).pathname;
  for (const d of disallowed) {
    if (d !== "/" && p.startsWith(d)) {
      fail(`sitemap lists ${p} but robots disallows ${d}`);
    }
  }
}

console.log("\n=== INTERNAL LINK INTEGRITY ===\n");
const seen = new Set();
const broken = [];
for (const [path, html] of Object.entries(store)) {
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const h of new Set(hrefs)) {
    if (h.match(/\.(svg|png|ico|webmanifest|xml|txt|css|js)$/)) continue;
    const key = h;
    if (seen.has(key)) continue;
    seen.add(key);
    const r = await fetch(BASE + h, { redirect: "manual" });
    if (r.status >= 400) broken.push(`${h} -> ${r.status} (linked from ${path})`);
  }
}
console.log(`  checked ${seen.size} unique internal links`);
if (broken.length) {
  broken.forEach((b) => fail("broken link " + b));
} else {
  console.log("  ok   no broken internal links");
}

console.log("\n=== 404 / ERROR ROUTES ===\n");
const nf = await fetch(BASE + "/this-page-does-not-exist");
console.log(`  /this-page-does-not-exist -> ${nf.status} ${nf.status === 404 ? "ok" : "FAIL"}`);
if (nf.status !== 404) fails++;

const badSlug = await fetch(BASE + "/legal/not-a-real-doc");
console.log(`  /legal/not-a-real-doc     -> ${badSlug.status} ${badSlug.status === 404 ? "ok" : "FAIL"}`);
if (badSlug.status !== 404) fails++;

console.log(`\n=== ${fails === 0 ? "ALL CHECKS PASSED" : fails + " FAILURE(S)"} ===`);
process.exit(fails === 0 ? 0 : 1);


