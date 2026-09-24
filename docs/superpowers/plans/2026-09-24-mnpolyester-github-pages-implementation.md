# M.N. Polyester GitHub Pages Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, publish, and connect a fast single-page M.N. Polyester website at `mnpolyester.in` using GitHub Pages while preserving the company’s original content, photography, and corrected full-mark favicon.

**Architecture:** The site is a dependency-free static document served from the repository root. Semantic HTML owns the content, one CSS file owns the responsive visual system, and one small JavaScript file owns the mobile navigation and gallery dialog. GitHub Actions deploys the root directory to GitHub Pages; DNS cutover happens only after a successful preview deployment and only through a verified `mnpolyester` account.

**Tech Stack:** HTML5, modern CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages, GitHub Actions

---

## File structure

- `index.html` — complete one-page information architecture and visible company content.
- `assets/css/styles.css` — design tokens, page layout, responsive behavior, focus states, and motion preferences.
- `assets/js/main.js` — mobile menu state and accessible factory-image dialog.
- `assets/images/*.jpg` — locally hosted, resized copies of the nine existing GoDaddy photographs.
- `assets/brand/*` — approved vector logo, compact mark, favicon, and raster exports.
- `test/site-content.test.mjs` — static regression checks for content, links, images, metadata, and file references.
- `test/brand-assets.test.mjs` — existing full-M–N–P favicon regression check.
- `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll` — custom-domain and crawler configuration.
- `.github/workflows/pages.yml` — deterministic GitHub Pages deployment.
- `README.md` — local preview, deployment, account-safety, and DNS instructions.
- `docs/superpowers/specs/assets/concept-*.png` — approved visual references used for fidelity QA.

### Task 1: Establish visual references and local photography

**Files:**
- Create: `docs/superpowers/specs/assets/concept-hero.png`
- Create: `docs/superpowers/specs/assets/concept-about-products.png`
- Create: `docs/superpowers/specs/assets/concept-factory.png`
- Create: `docs/superpowers/specs/assets/concept-contact.png`
- Create: `assets/images/hero-team.jpg`
- Create: `assets/images/product-drums.jpg`
- Create: `assets/images/factory-materials.jpg`
- Create: `assets/images/factory-floor.jpg`
- Create: `assets/images/factory-team.jpg`
- Create: `assets/images/factory-process-1.jpg`
- Create: `assets/images/factory-process-2.jpg`
- Create: `assets/images/factory-storage.jpg`
- Create: `assets/images/factory-dispatch.jpg`

- [ ] **Step 1: Generate four coordinated section concepts**

Use the frontend design workflow and the existing logo/photos as references. Generate one readable concept per major section with these exact constraints:

```text
Product: M.N. Polyester, a South Indian unsaturated polyester resin manufacturer.
Audience: industrial buyers and existing customers.
Information architecture: header; split hero; about and seven-product list; authentic factory gallery; contact details, hours, map, and footer.
Brand: preserve the approved MNP logo, #2E3192 blue, #ED1C24 red, crisp white, and a restrained steel-blue neutral.
Style: modern, simple, industrial, airy, rectangular rather than rounded-card-heavy.
Copy: preserve the approved specification; do not invent statistics, certifications, claims, badges, testimonials, or products.
Assets: use authentic factory photography; no generated factory scenes or replacement logo.
Hero: left-aligned copy on a clean light surface and an untreated factory photograph on the right; no color wash over the photograph.
Implementation: semantic static HTML/CSS, code-native text and controls, practical responsive layout.
```

Expected: four coordinated PNG references saved under `docs/superpowers/specs/assets/`, with readable typography and consistent section boundaries.

- [ ] **Step 2: Download the original photographs at web-appropriate sizes**

Run these exact downloads from the repository root:

```bash
mkdir -p assets/images
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_16%20Office%20Lens.jpg/:/rs=w:2400,m' -o assets/images/hero-team.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2017_18%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/product-drums.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2016_51%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/factory-materials.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2017_09%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/factory-floor.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_17%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/factory-team.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_19%20Office%20Lens%20(1).jpg/:/rs=w:1600,m' -o assets/images/factory-process-1.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_20%20Office%20Lens%20(1).jpg/:/rs=w:1600,m' -o assets/images/factory-process-2.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_21%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/factory-storage.jpg
curl -fsSL 'https://img1.wsimg.com/isteam/ip/15f94bc1-0f2a-4011-bda2-eab7eb17bade/2020_08_18%2018_24%20Office%20Lens.jpg/:/rs=w:1600,m' -o assets/images/factory-dispatch.jpg
```

Expected: nine JPEG files; `file assets/images/*.jpg` reports valid JPEG data for every path.

- [ ] **Step 3: Inspect every downloaded image**

Use `view_image` on each file and record accurate alt text before HTML implementation. Do not infer machinery or processes that the photograph does not visibly show.

- [ ] **Step 4: Commit the visual references and photographs**

```bash
git add docs/superpowers/specs/assets/concept-*.png assets/images/*.jpg
git commit -m "assets: preserve factory photography and design references"
```

### Task 2: Add failing site-content tests

**Files:**
- Create: `test/site-content.test.mjs`

- [ ] **Step 1: Write the static site regression test**

Create `test/site-content.test.mjs` with:

```js
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(resolve(root, "index.html"), "utf8");

test("preserves approved company content", () => {
  for (const text of [
    "Unsaturated Polyester Resin Manufacturer",
    "Precision and quality in every batch, every time.",
    "M.N. Polyester (India) Pvt. Ltd.",
    "GP Resin with and without UV Stabilization",
    "GP Resin Superior with and without UVS",
    "GP Gelcoat only with UVS",
    "ISO Resin with and without UVS",
    "ISO Gelcoat only with UVS",
    "ROOFLITE Resin with and without UVS",
    "F.R.R Resin with and without UVS",
    "contact@mnpolyester.in",
    "+91 94425 49200",
    "+91 94425 49490",
  ]) {
    assert.ok(html.includes(text), `missing approved text: ${text}`);
  }
});

test("contains direct contact actions", () => {
  assert.match(html, /href="mailto:contact@mnpolyester\.in"/);
  assert.match(html, /href="tel:\+919442549200"/);
  assert.match(html, /href="tel:\+919442549490"/);
  assert.match(html, /href="https:\/\/wa\.me\/919442549200"/);
});

test("uses the approved local brand and factory assets", async () => {
  const paths = [
    "assets/brand/mnpolyester-logo.svg",
    "assets/brand/mnpolyester-mark.svg",
    "assets/brand/mnpolyester-favicon.svg",
    "assets/brand/apple-touch-icon.png",
    "assets/images/hero-team.jpg",
    "assets/images/product-drums.jpg",
    "assets/images/factory-materials.jpg",
    "assets/images/factory-floor.jpg",
    "assets/images/factory-team.jpg",
    "assets/images/factory-process-1.jpg",
    "assets/images/factory-process-2.jpg",
    "assets/images/factory-storage.jpg",
    "assets/images/factory-dispatch.jpg",
    "assets/css/styles.css",
    "assets/js/main.js",
  ];

  for (const path of paths) {
    assert.ok(html.includes(path), `index.html does not reference ${path}`);
    await access(resolve(root, path));
  }
});

test("includes canonical, sharing, and structural metadata", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/mnpolyester\.in\/"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<h1>\s*Unsaturated Polyester Resin Manufacturer\s*<\/h1>/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/site-content.test.mjs`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Commit the failing test**

```bash
git add test/site-content.test.mjs
git commit -m "test: define website content contract"
```

### Task 3: Implement the semantic page and approved content

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the complete page structure**

Create `index.html` with semantic `header`, `nav`, `main`, `section`, `address`, `table`, `dialog`, and `footer` elements. Use this exact section and content contract:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="M.N. Polyester supplies unsaturated polyester resins, gelcoats and specialised resin solutions from Coimbatore, Tamil Nadu.">
    <meta name="theme-color" content="#2e3192">
    <link rel="canonical" href="https://mnpolyester.in/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="M.N. Polyester | Unsaturated Polyester Resin Manufacturer">
    <meta property="og:description" content="Precision and quality in every batch, every time.">
    <meta property="og:url" content="https://mnpolyester.in/">
    <meta property="og:image" content="https://mnpolyester.in/assets/brand/mnpolyester-logo-1400.png">
    <title>M.N. Polyester | Unsaturated Polyester Resin Manufacturer</title>
    <link rel="icon" href="assets/brand/mnpolyester-favicon.svg" type="image/svg+xml">
    <link rel="icon" href="assets/brand/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
    <link rel="stylesheet" href="assets/css/styles.css">
    <script defer src="assets/js/main.js"></script>
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header" data-header>
      <div class="site-header__inner shell">
        <a class="brand" href="#top" aria-label="M.N. Polyester home">
          <img src="assets/brand/mnpolyester-mark.svg" alt="M.N. Polyester">
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-nav-toggle>
          <span class="sr-only">Toggle navigation</span><span aria-hidden="true"></span>
        </button>
        <nav id="primary-navigation" class="site-nav" aria-label="Primary navigation" data-nav>
          <a href="#about">About</a><a href="#products">Products</a><a href="#factory">Factory</a><a href="#contact">Contact</a>
        </nav>
        <a class="button button--small header-contact" href="mailto:contact@mnpolyester.in">Email us</a>
      </div>
    </header>
    <main id="main-content">
      <section class="hero" id="top" aria-labelledby="hero-title">
        <div class="hero__copy shell">
          <div>
            <h1 id="hero-title">Unsaturated Polyester Resin Manufacturer</h1>
            <p>Precision and quality in every batch, every time.</p>
            <div class="hero__actions">
              <a class="button" href="mailto:contact@mnpolyester.in">Contact our team</a>
              <a class="text-link" href="#products">View product range</a>
            </div>
          </div>
          <figure class="hero__media"><img src="assets/images/hero-team.jpg" alt="M.N. Polyester factory team wearing protective equipment" width="1200" height="900"></figure>
        </div>
      </section>
      <section class="section about" id="about" aria-labelledby="about-title">
        <div class="shell about__grid">
          <div><p class="section-label">About M.N. Polyester</p><h2 id="about-title">Two decades of specialised resin expertise</h2></div>
          <div class="prose"><h3>Our mission</h3><p>M.N. Polyester (India) Pvt. Ltd. has been a cornerstone of the South Indian composites industry since 2005. With two decades of specialised expertise, we are a leading supplier of premium unsaturated polyester resins. We pride ourselves on delivering high-performance, tailored solutions that meet the rigorous demands of our diverse clientele.</p></div>
        </div>
      </section>
      <section class="section products" id="products" aria-labelledby="products-title">
        <div class="shell products__grid">
          <figure><img src="assets/images/product-drums.jpg" alt="Blue M.N. Polyester resin drums" width="800" height="500"></figure>
          <div><p class="section-label">Our product range</p><h2 id="products-title">Resins and gelcoats for composite applications</h2><ol class="product-list"><li>GP Resin with and without UV Stabilization</li><li>GP Resin Superior with and without UVS</li><li>GP Gelcoat only with UVS</li><li>ISO Resin with and without UVS</li><li>ISO Gelcoat only with UVS</li><li>ROOFLITE Resin with and without UVS</li><li>F.R.R Resin with and without UVS</li></ol></div>
        </div>
      </section>
      <section class="section factory" id="factory" aria-labelledby="factory-title">
        <div class="shell">
          <div class="section-heading"><div><p class="section-label">Our factory</p><h2 id="factory-title">Where every batch is made</h2></div><p>Explore our production floor, team, storage and dispatch operations.</p></div>
          <div class="gallery" data-gallery>
            <button class="gallery__item" type="button" data-full="assets/images/factory-materials.jpg" data-caption="Blue M.N. Polyester resin containers ready for use"><img src="assets/images/factory-materials.jpg" alt="Blue M.N. Polyester resin containers lined up at the factory" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-floor.jpg" data-caption="Clearly labelled waste-separation barrels at the factory"><img src="assets/images/factory-floor.jpg" alt="Colour-coded waste-separation barrels labelled for paper, plastic and other waste" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-team.jpg" data-caption="Factory team wearing protective equipment"><img src="assets/images/factory-team.jpg" alt="M.N. Polyester factory staff in hard hats, masks and protective gloves" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-process-1.jpg" data-caption="Production work inside the M.N. Polyester factory"><img src="assets/images/factory-process-1.jpg" alt="Factory worker handling resin containers beside raw-material bags" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-process-2.jpg" data-caption="M.N. Polyester containers moving through the factory"><img src="assets/images/factory-process-2.jpg" alt="Factory worker moving a blue M.N. Polyester resin container" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-storage.jpg" data-caption="Factory storage and production area"><img src="assets/images/factory-storage.jpg" alt="Factory staff beside stored containers and stacked raw-material bags" loading="lazy"></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-dispatch.jpg" data-caption="Dispatch preparation beside a delivery truck"><img src="assets/images/factory-dispatch.jpg" alt="Worker using a backpack sprayer beside a delivery truck" loading="lazy"></button>
          </div>
        </div>
      </section>
      <section class="contact" id="contact" aria-labelledby="contact-title">
        <div class="shell contact__grid"><div><p class="section-label">Contact us</p><h2 id="contact-title">Better yet, see us in person.</h2><p>We love our customers, so feel free to visit during normal business hours.</p><div class="contact-actions"><a class="button button--light" href="mailto:contact@mnpolyester.in">contact@mnpolyester.in</a><a class="button button--outline-light" href="https://wa.me/919442549200">Message us on WhatsApp</a></div><address><strong>M.N. Polyester</strong><br>Sales Office of M.N. Polyester (India) Pvt Ltd<br>7th Street, Tatabad, Coimbatore, Tamil Nadu, India<br><a href="tel:+919442549200">+91 94425 49200</a><br><a href="tel:+919442549490">+91 94425 49490</a></address></div><div class="hours-map"><table><caption>Business hours</caption><tbody><tr><th>Monday–Saturday</th><td>9:00 a.m.–7:00 p.m.</td></tr><tr><th>Sunday</th><td>Closed</td></tr></tbody></table><iframe title="Map to M.N. Polyester sales office" src="https://www.google.com/maps?q=11.0211825,76.962676&amp;z=14&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="text-link text-link--light" href="https://maps.google.com/maps?ll=11.021183,76.962676&amp;z=14" target="_blank" rel="noreferrer">Get directions</a></div></div>
      </section>
    </main>
    <footer class="site-footer"><div class="shell"><img src="assets/brand/mnpolyester-logo.svg" alt="M.N. Polyester"><p>Copyright © 2026 M.N. Polyester. All rights reserved.</p><a href="mailto:contact@mnpolyester.in">contact@mnpolyester.in</a></div></footer>
    <dialog class="image-dialog" data-image-dialog><button type="button" aria-label="Close image" data-dialog-close><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg></button><img src="assets/images/factory-materials.jpg" alt="" data-dialog-image><p data-dialog-caption></p></dialog>
  </body>
</html>
```

- [ ] **Step 2: Run the content test**

Run: `node --test test/site-content.test.mjs`

Expected: FAIL only because CSS and JavaScript files do not yet exist or are not referenced correctly; all copy and direct-contact assertions pass.

- [ ] **Step 3: Commit the semantic document**

```bash
git add index.html
git commit -m "feat: add company website content"
```

### Task 4: Implement the responsive visual system

**Files:**
- Create: `assets/css/styles.css`

- [ ] **Step 1: Create the shared design tokens and component rules**

Implement the approved concepts with these locked foundations:

```css
:root {
  --brand-blue: #2e3192;
  --brand-red: #ed1c24;
  --ink: #151827;
  --muted: #5d6374;
  --line: #dfe2ea;
  --surface: #f5f7fa;
  --white: #fff;
  --steel: #8ca3b2;
  --shell: min(1180px, calc(100% - 40px));
  --space-1: .5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: clamp(4rem, 8vw, 7rem);
  --shadow: 0 18px 50px rgb(21 24 39 / 12%);
  --transition: 180ms ease;
  font-family: "Avenir Next", "Segoe UI", Arial, sans-serif;
  color: var(--ink);
  background: var(--white);
  scroll-behavior: smooth;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; color: var(--ink); background: var(--white); line-height: 1.65; }
img { display: block; max-width: 100%; }
a { color: inherit; }
button, input, textarea { font: inherit; }
.shell { width: var(--shell); margin-inline: auto; }
.section { padding-block: var(--space-6); }
.section-label { margin: 0 0 .75rem; color: var(--brand-red); font-size: .78rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 12ch; font-size: clamp(2.7rem, 6vw, 5.75rem); line-height: .98; letter-spacing: -.055em; }
h2 { max-width: 14ch; font-size: clamp(2rem, 4vw, 3.75rem); line-height: 1.05; letter-spacing: -.04em; }
:focus-visible { outline: 3px solid var(--brand-red); outline-offset: 4px; }
.skip-link { position: fixed; z-index: 100; top: 1rem; left: 1rem; transform: translateY(-180%); padding: .75rem 1rem; background: var(--white); }
.skip-link:focus { transform: none; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.button { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; padding: .8rem 1.25rem; border: 1px solid var(--brand-blue); background: var(--brand-blue); color: var(--white); font-weight: 750; text-decoration: none; transition: background var(--transition), color var(--transition), transform var(--transition); }
.button:hover { transform: translateY(-2px); background: #202473; }
.button--small { min-height: 40px; padding: .55rem .9rem; }
.button--light { border-color: var(--white); background: var(--white); color: var(--brand-blue); }
.button--outline-light { border-color: rgb(255 255 255 / 55%); background: transparent; }
.text-link { font-weight: 750; text-underline-offset: .28em; }
.text-link--light { color: var(--white); }
.site-header { position: sticky; z-index: 20; top: 0; border-bottom: 1px solid rgb(223 226 234 / 85%); background: rgb(255 255 255 / 92%); backdrop-filter: blur(14px); }
.site-header__inner { display: flex; min-height: 78px; align-items: center; gap: 2rem; }
.brand { margin-right: auto; }
.brand img { width: 164px; height: auto; }
.site-nav { display: flex; gap: 1.65rem; }
.site-nav a { font-size: .94rem; font-weight: 700; text-decoration: none; }
.nav-toggle { display: none; }
.hero { overflow: hidden; padding-block: clamp(2rem, 5vw, 5rem); background: linear-gradient(90deg, var(--surface) 0 54%, var(--white) 54%); }
.hero__copy { display: grid; min-height: min(720px, calc(100vh - 120px)); grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr); align-items: center; gap: clamp(2rem, 6vw, 6rem); }
.hero__copy > div > p { max-width: 34ch; color: var(--muted); font-size: clamp(1.1rem, 2vw, 1.35rem); }
.hero__actions, .contact-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
.hero__media { margin: 0; height: min(640px, 70vh); }
.hero__media img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.about__grid, .products__grid, .contact__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(2.5rem, 8vw, 7rem); }
.prose { max-width: 62ch; }
.products { background: var(--surface); }
.products figure { margin: 0; align-self: stretch; }
.products figure img { width: 100%; height: 100%; min-height: 480px; object-fit: cover; }
.product-list { margin: 2rem 0 0; padding: 0; list-style: none; counter-reset: products; }
.product-list li { display: grid; grid-template-columns: 2.5rem 1fr; gap: .75rem; padding-block: .9rem; border-top: 1px solid var(--line); counter-increment: products; }
.product-list li::before { content: counter(products, decimal-leading-zero); color: var(--brand-red); font-weight: 800; }
.section-heading { display: flex; justify-content: space-between; gap: 2rem; align-items: end; margin-bottom: 2.5rem; }
.section-heading > p { max-width: 34ch; color: var(--muted); }
.gallery { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; }
.gallery__item { grid-column: span 4; min-height: 280px; padding: 0; border: 0; background: var(--surface); cursor: zoom-in; overflow: hidden; }
.gallery__item:first-child { grid-column: span 8; grid-row: span 2; }
.gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform 350ms ease; }
.gallery__item:hover img { transform: scale(1.025); }
.contact { padding-block: var(--space-6); background: #191d55; color: var(--white); }
.contact a { color: inherit; }
.contact address { margin-top: 2.5rem; font-style: normal; }
.hours-map table { width: 100%; margin-bottom: 1.5rem; border-collapse: collapse; }
.hours-map caption { margin-bottom: .75rem; text-align: left; font-weight: 800; }
.hours-map th, .hours-map td { padding: .7rem 0; border-bottom: 1px solid rgb(255 255 255 / 22%); text-align: left; }
.hours-map iframe { width: 100%; min-height: 320px; border: 0; filter: grayscale(.85) contrast(1.05); }
.site-footer { padding-block: 2rem; border-top: 1px solid var(--line); }
.site-footer .shell { display: flex; align-items: center; gap: 2rem; }
.site-footer img { width: 135px; }
.site-footer p { margin: 0 auto 0 0; color: var(--muted); }
.image-dialog { width: min(960px, calc(100% - 32px)); padding: 0; border: 0; background: var(--ink); color: var(--white); box-shadow: var(--shadow); }
.image-dialog::backdrop { background: rgb(10 12 22 / 82%); }
.image-dialog img { width: 100%; max-height: 78vh; object-fit: contain; }
.image-dialog button { position: absolute; top: .75rem; right: .75rem; display: grid; width: 44px; height: 44px; place-items: center; border: 0; background: var(--white); color: var(--ink); cursor: pointer; }
.image-dialog button svg { width: 22px; height: 22px; }
.image-dialog p { margin: 0; padding: 1rem 1.25rem; }

@media (max-width: 800px) {
  :root { --shell: min(100% - 28px, 680px); }
  .header-contact { display: none; }
  .nav-toggle { display: inline-grid; width: 44px; height: 44px; place-items: center; border: 1px solid var(--line); background: var(--white); }
  .nav-toggle span[aria-hidden] { width: 18px; height: 2px; background: var(--ink); box-shadow: 0 -6px var(--ink), 0 6px var(--ink); }
  .site-nav { position: absolute; top: 100%; right: 0; left: 0; display: none; flex-direction: column; padding: 1.25rem var(--space-3); border-bottom: 1px solid var(--line); background: var(--white); }
  .site-nav[data-open="true"] { display: flex; }
  .hero { background: var(--surface); }
  .hero__copy, .about__grid, .products__grid, .contact__grid { grid-template-columns: 1fr; }
  .hero__copy { min-height: 0; padding-block: 3rem; }
  .hero__media { height: 58vw; min-height: 320px; }
  .products figure img { min-height: 320px; }
  .section-heading, .site-footer .shell { align-items: flex-start; flex-direction: column; }
  .gallery__item, .gallery__item:first-child { grid-column: span 6; grid-row: auto; min-height: 220px; }
  .site-footer p { margin: 0; }
}

@media (max-width: 520px) {
  h1 { font-size: clamp(2.55rem, 14vw, 4rem); }
  .gallery__item, .gallery__item:first-child { grid-column: 1 / -1; min-height: 240px; }
  .hero__actions, .contact-actions { align-items: stretch; flex-direction: column; }
  .button { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  :root { scroll-behavior: auto; }
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
```

Tune exact spacing, crop positions, and typography only to match the accepted concept screenshots. Keep the token palette and section order fixed.

- [ ] **Step 2: Run static tests**

Run: `node --test test/*.test.mjs`

Expected: remaining failure is only the missing `assets/js/main.js`.

- [ ] **Step 3: Commit styling**

```bash
git add assets/css/styles.css
git commit -m "feat: add responsive industrial design system"
```

### Task 5: Implement accessible navigation and gallery behavior

**Files:**
- Create: `assets/js/main.js`
- Modify: `test/site-content.test.mjs`

- [ ] **Step 1: Add interaction assertions**

Append this test:

```js
test("exposes accessible navigation and gallery hooks", () => {
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /data-nav-toggle/);
  assert.match(html, /<dialog[^>]+data-image-dialog/);
  assert.match(html, /data-dialog-close/);
  assert.match(html, /data-full="assets\/images\//);
});
```

- [ ] **Step 2: Run it to confirm the JavaScript contract is incomplete**

Run: `node --test test/site-content.test.mjs`

Expected: FAIL until all gallery buttons and `assets/js/main.js` exist.

- [ ] **Step 3: Implement `assets/js/main.js`**

```js
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(open));
  nav?.setAttribute("data-open", String(open));
});

nav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;
  navToggle?.setAttribute("aria-expanded", "false");
  nav.removeAttribute("data-open");
});

const dialog = document.querySelector("[data-image-dialog]");
const dialogImage = dialog?.querySelector("[data-dialog-image]");
const dialogCaption = dialog?.querySelector("[data-dialog-caption]");

document.querySelector("[data-gallery]")?.addEventListener("click", (event) => {
  const button = event.target instanceof Element
    ? event.target.closest("[data-full]")
    : null;
  if (!(button instanceof HTMLButtonElement) || !(dialog instanceof HTMLDialogElement)) return;

  const image = button.querySelector("img");
  if (!(dialogImage instanceof HTMLImageElement) || !image) return;
  dialogImage.src = button.dataset.full ?? image.src;
  dialogImage.alt = image.alt;
  if (dialogCaption) dialogCaption.textContent = button.dataset.caption ?? image.alt;
  dialog.showModal();
});

dialog?.querySelector("[data-dialog-close]")?.addEventListener("click", () => {
  if (dialog instanceof HTMLDialogElement) dialog.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog && dialog instanceof HTMLDialogElement) dialog.close();
});
```

- [ ] **Step 4: Run all static tests**

Run: `node --test test/*.test.mjs`

Expected: PASS, including the brand favicon regression.

- [ ] **Step 5: Commit the interactions**

```bash
git add assets/js/main.js index.html test/site-content.test.mjs
git commit -m "feat: add navigation and factory gallery interactions"
```

### Task 6: Add GitHub Pages, domain, and crawler configuration

**Files:**
- Create: `CNAME`
- Create: `.nojekyll`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `.github/workflows/pages.yml`
- Modify: `README.md`

- [ ] **Step 1: Add the custom domain and static-hosting markers**

`CNAME`:

```text
mnpolyester.in
```

`.nojekyll` is an empty file.

`robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://mnpolyester.in/sitemap.xml
```

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mnpolyester.in/</loc>
    <lastmod>2026-09-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Add the GitHub Pages workflow**

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Replace the repository README**

Document:

```markdown
# M.N. Polyester website

Static website for [mnpolyester.in](https://mnpolyester.in/), hosted with GitHub Pages.

## Local preview

Run `python3 -m http.server 4173` from the repository root, then open `http://127.0.0.1:4173/`.

## Tests

Run `node --test test/*.test.mjs`.

## Deployment

Pushes to `main` deploy through `.github/workflows/pages.yml`. The repository custom domain is declared in `CNAME`.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Do not use `Arunothia-Marappan` credentials.
```

Add a DNS section only after verifying GitHub’s current official Pages records during release.

- [ ] **Step 4: Test configuration files**

Run:

```bash
test "$(cat CNAME)" = "mnpolyester.in"
xmllint --noout sitemap.xml
node --test test/*.test.mjs
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 5: Commit hosting configuration**

```bash
git add CNAME .nojekyll robots.txt sitemap.xml .github/workflows/pages.yml README.md
git commit -m "chore: configure GitHub Pages and custom domain"
```

### Task 7: Browser, responsive, and fidelity verification

**Files:**
- Modify as needed: `index.html`
- Modify as needed: `assets/css/styles.css`
- Modify as needed: `assets/js/main.js`
- Create temporarily, then remove: browser screenshots and QA artifacts

- [ ] **Step 1: Start a local server**

Run: `python3 -m http.server 4173`

Expected: the repository is available at `http://127.0.0.1:4173/`.

- [ ] **Step 2: Verify with Browser/IAB first**

Open the page, inspect the first viewport, scroll through every section, and exercise:

- Header navigation and mobile menu.
- Email, telephone, WhatsApp, map, and directions URLs without submitting or sending anything.
- Every gallery item and dialog close path.
- Keyboard focus order, Escape behavior, and visible focus indicators.
- Browser console logs.

- [ ] **Step 3: Capture desktop and mobile screenshots**

Check at approximately 1440 × 1000 and 390 × 844. Confirm no horizontal overflow, clipped headings, illegible logo use, broken gallery crops, or overlapping contact content.

- [ ] **Step 4: Compare against the accepted concepts with `view_image`**

Inspect the concept and browser screenshot pairs directly. Record at least five comparison points covering:

1. Header/logo scale and first-viewport balance.
2. Hero copy, photo treatment, and primary action.
3. Product-list structure and typography.
4. Gallery rhythm, image crops, and spacing.
5. Contact palette, map framing, and mobile collapse.

Fix every material mismatch and repeat the screenshots. The allowed above-the-fold copy is only the header navigation, hero heading, quality statement, “Contact our team,” and “View product range.”

- [ ] **Step 5: Run fresh verification and commit QA fixes**

```bash
node --test test/*.test.mjs
xmllint --noout sitemap.xml assets/brand/*.svg
git diff --check
git status --short
```

Expected: tests pass; XML/SVG files parse; no whitespace errors; only intentional changes are present.

```bash
git add index.html assets/css/styles.css assets/js/main.js test
git commit -m "fix: complete responsive and accessibility QA"
```

### Task 8: Release through `mnpolyester` and cut over DNS

**Files:**
- No source changes unless release verification finds a defect.

- [ ] **Step 1: Verify GitHub identity before any network write**

Run: `gh auth status --hostname github.com`

Expected: active account is exactly `mnpolyester`. If it is `Arunothia-Marappan` or any other account, stop and ask the user to authenticate `mnpolyester`; do not push, configure Pages, or alter credentials automatically.

- [ ] **Step 2: Run the final local gate**

```bash
node --test test/*.test.mjs
git status --short --branch
git log -1 --format='%an <%ae>'
```

Expected: all tests pass; working tree is clean; the local author is `mnpolyester <contact@mnpolyester.in>`.

- [ ] **Step 3: Push only after identity verification**

Run: `git push origin main`

Expected: the `main` branch updates on `mnpolyester/mnpolyester.github.io`.

- [ ] **Step 4: Enable or verify Pages deployment**

Use the verified `mnpolyester` account to select GitHub Actions as the Pages source if it is not already configured. Wait for the Pages workflow, verify its conclusion is successful, and test the temporary `https://mnpolyester.github.io/` URL before DNS changes.

- [ ] **Step 5: Verify current official GitHub Pages DNS records**

Consult GitHub’s official custom-domain documentation immediately before changing DNS. Do not rely on stale copied addresses. Confirm the required apex A/AAAA records and the `www` CNAME target for `mnpolyester.github.io`.

- [ ] **Step 6: Confirm the exact DNS mutation at action time**

Show the user the resolved current records, explain that changing them will move live traffic from GoDaddy hosting to GitHub Pages, and obtain the required action-time confirmation before saving DNS changes.

- [ ] **Step 7: Cut over and verify without cancelling the domain**

Update only the web-hosting DNS records, preserve mail-related MX/TXT records for `contact@mnpolyester.in`, and do not cancel the domain registration. Verify:

```bash
dig +short mnpolyester.in A
dig +short www.mnpolyester.in CNAME
curl -I https://mnpolyester.in/
curl -I https://www.mnpolyester.in/
```

Expected: DNS resolves to GitHub Pages; HTTPS returns a successful response; `www` behaves consistently with the canonical apex domain; email DNS records remain unchanged.

- [ ] **Step 8: Enable HTTPS and hand off**

After GitHub provisions the certificate, enable HTTPS enforcement. Re-run desktop and mobile smoke tests on the live domain. Only then tell the user the GoDaddy website-builder plan can be cancelled; retain the domain registration and email service.
