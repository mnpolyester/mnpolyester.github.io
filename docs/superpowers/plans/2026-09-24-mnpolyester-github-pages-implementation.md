# M.N. Polyester GitHub Pages Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and publish a fast single-page M.N. Polyester website independently at `https://mnpolyester.github.io/` while preserving the company’s original content, photography, and corrected full-mark favicon.

**Architecture:** The site is a dependency-free static document served from the repository root. Semantic HTML owns the content, one CSS file owns the responsive visual system, and one small JavaScript file owns the mobile navigation and gallery dialog. GitHub Actions deploys the root directory to the default GitHub Pages host through a verified `mnpolyester` account. No Pages custom domain or repository-managed DNS cutover is part of this deployment.

**Tech Stack:** HTML5, modern CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages, GitHub Actions

**Design source of truth:** The approved design specification and `docs/superpowers/specs/2026-09-24-mnpolyester-design-system.md` control the implementation. Code in this plan is an implementation aid; if an illustrative snippet conflicts with either approved document, follow the design system.

---

## File structure

- `index.html` — complete one-page information architecture and visible company content.
- `assets/css/styles.css` — design tokens, page layout, responsive behavior, focus states, and motion preferences.
- `assets/js/main.js` — mobile menu state and accessible factory-image dialog.
- `assets/images/*.jpg` — locally hosted, resized copies of the nine existing GoDaddy photographs.
- `assets/brand/*` — approved vector logo, compact mark, favicon, and raster exports.
- `test/site-content.test.mjs` — static regression checks for content, links, images, metadata, and file references.
- `test/brand-assets.test.mjs` — existing full-M–N–P favicon regression check.
- `robots.txt`, `sitemap.xml`, `.nojekyll` — default-domain crawler and static-hosting configuration; no `CNAME` file.
- `.github/workflows/pages.yml` — deterministic GitHub Pages deployment.
- `README.md` — local preview, deployment, account safety, and owner-managed forwarding boundary.
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
Brand: preserve the approved MNP logo, #2E3192 blue, #ED1C24 red, #FFFFFF white, and the #F5F7FA cool-steel surface.
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
  assert.match(html, /<link rel="canonical" href="https:\/\/mnpolyester\.github\.io\/"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<h1[^>]*>\s*Unsaturated Polyester Resin Manufacturer\s*<\/h1>/);
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
    <meta name="theme-color" content="#2E3192">
    <link rel="canonical" href="https://mnpolyester.github.io/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="M.N. Polyester | Unsaturated Polyester Resin Manufacturer">
    <meta property="og:description" content="Precision and quality in every batch, every time.">
    <meta property="og:url" content="https://mnpolyester.github.io/">
    <meta property="og:image" content="https://mnpolyester.github.io/assets/brand/mnpolyester-logo-1400.png">
    <title>M.N. Polyester | Unsaturated Polyester Resin Manufacturer</title>
    <link rel="icon" href="assets/brand/mnpolyester-favicon.svg" type="image/svg+xml">
    <link rel="icon" href="assets/brand/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
    <link rel="stylesheet" href="assets/css/styles.css">
    <script defer src="assets/js/main.js"></script>
  </head>
  <body>
    <svg class="icon-sprite" aria-hidden="true" focusable="false">
      <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
      <symbol id="icon-external" viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-9 9M19 13v6H5V5h6"/></symbol>
      <symbol id="icon-zoom" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4 4M8 10.5h5M10.5 8v5"/></symbol>
      <symbol id="icon-location" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24"><path d="M7.2 3h3l1.4 4.6-2 1.7a15.3 15.3 0 0 0 5.1 5.1l1.7-2L21 13.8v3A4.2 4.2 0 0 1 16.8 21 13.8 13.8 0 0 1 3 7.2 4.2 4.2 0 0 1 7.2 3Z"/></symbol>
      <symbol id="icon-whatsapp" viewBox="0 0 24 24"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z"/><path d="M8.6 8.1c.5 2.8 2.3 4.6 5.1 5.2l1.3-1.2 2.1 1.1c-.2 1.5-1.1 2.3-2.6 2.3-3.6-.2-6.8-3.4-7-7 0-1.4.7-2.3 2.2-2.5l1.1 2.1-1.2 1.3"/></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
    </svg>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header" data-header>
      <div class="site-header__inner shell">
        <a class="brand" href="#top" aria-label="M.N. Polyester home">
          <img src="assets/brand/mnpolyester-mark.svg" alt="M.N. Polyester">
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-nav-toggle>
          <span class="sr-only">Toggle navigation</span><svg class="icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
        </button>
        <nav id="primary-navigation" class="site-nav" aria-label="Primary navigation" data-nav>
          <a href="#about">About</a><a href="#products">Products</a><a href="#factory">Factory</a><a href="#contact">Contact</a>
        </nav>
        <a class="button button--small header-contact" href="mailto:contact@mnpolyester.in"><svg class="icon" aria-hidden="true"><use href="#icon-mail"></use></svg>Email us</a>
      </div>
    </header>
    <main id="main-content">
      <section class="hero" id="top" aria-labelledby="hero-title">
        <div class="hero__copy shell">
          <div>
            <h1 id="hero-title">Unsaturated Polyester Resin Manufacturer</h1>
            <p>Precision and quality in every batch, every time.</p>
            <div class="hero__actions">
              <a class="button" href="mailto:contact@mnpolyester.in"><svg class="icon" aria-hidden="true"><use href="#icon-mail"></use></svg>Contact our team</a>
              <a class="text-link" href="#products">View product range</a>
            </div>
          </div>
          <figure class="hero__media media--edge-crop"><img src="assets/images/hero-team.jpg" alt="Factory staff wearing hard hats, masks and gloves outside the facility." width="1200" height="900"></figure>
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
          <figure><img src="assets/images/product-drums.jpg" alt="Three blue resin drums labelled “RESIN” in English and Tamil." width="800" height="500"></figure>
          <div><p class="section-label">Our product range</p><h2 id="products-title">Resins and gelcoats for composite applications</h2><ol class="product-list"><li>GP Resin with and without UV Stabilization</li><li>GP Resin Superior with and without UVS</li><li>GP Gelcoat only with UVS</li><li>ISO Resin with and without UVS</li><li>ISO Gelcoat only with UVS</li><li>ROOFLITE Resin with and without UVS</li><li>F.R.R Resin with and without UVS</li></ol></div>
        </div>
      </section>
      <section class="section factory" id="factory" aria-labelledby="factory-title">
        <div class="shell">
          <div class="section-heading"><div><p class="section-label">Our factory</p><h2 id="factory-title">Where every batch is made</h2></div><p>Explore our production floor, team, storage and dispatch operations.</p></div>
          <div class="gallery" data-gallery>
            <button class="gallery__item" type="button" data-full="assets/images/factory-materials.jpg" data-caption="Four blue M.N.P resin containers in a row."><img src="assets/images/factory-materials.jpg" alt="Four blue M.N.P resin containers in a row." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-floor.jpg" data-caption="Color-coded waste barrels labelled other waste, plastic, and paper/cotton."><img src="assets/images/factory-floor.jpg" alt="Color-coded waste barrels labelled other waste, plastic, and paper/cotton." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item media--edge-crop" type="button" data-edge-crop data-full="assets/images/factory-team.jpg" data-caption="Staff wearing protective equipment beside stored blue containers at the factory entrance."><img src="assets/images/factory-team.jpg" alt="Staff wearing protective equipment beside stored blue containers at the factory entrance." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-process-1.jpg" data-caption="Worker handling a suspended material cage near stacked bags and blue containers inside the factory."><img src="assets/images/factory-process-1.jpg" alt="Worker handling a suspended material cage near stacked bags and blue containers inside the factory." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-process-2.jpg" data-caption="Worker moving a blue M.N.P container among rows of stored containers."><img src="assets/images/factory-process-2.jpg" alt="Worker moving a blue M.N.P container among rows of stored containers." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-storage.jpg" data-caption="Factory staff beside blue containers, raw-material bags, and color-coded bins."><img src="assets/images/factory-storage.jpg" alt="Factory staff beside blue containers, raw-material bags, and color-coded bins." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
            <button class="gallery__item" type="button" data-full="assets/images/factory-dispatch.jpg" data-caption="Worker using a backpack sprayer beside a delivery truck."><img src="assets/images/factory-dispatch.jpg" alt="Worker using a backpack sprayer beside a delivery truck." loading="lazy"><span class="gallery__zoom" aria-hidden="true"><svg class="icon"><use href="#icon-zoom"></use></svg></span></button>
          </div>
        </div>
      </section>
      <section class="contact" id="contact" aria-labelledby="contact-title">
        <div class="shell contact__grid">
          <div>
            <p class="section-label">Contact us</p><h2 id="contact-title">Better yet, see us in person.</h2><p>We love our customers, so feel free to visit during normal business hours.</p>
            <div class="contact-actions">
              <a class="button button--light" href="mailto:contact@mnpolyester.in"><svg class="icon" aria-hidden="true"><use href="#icon-mail"></use></svg>contact@mnpolyester.in</a>
              <a class="button button--outline-light" href="https://wa.me/919442549200"><svg class="icon" aria-hidden="true"><use href="#icon-whatsapp"></use></svg>Message us on WhatsApp</a>
            </div>
            <div class="contact-detail">
              <svg class="icon" aria-hidden="true"><use href="#icon-location"></use></svg>
              <address><strong>M.N. Polyester</strong><br>Sales Office of M.N. Polyester (India) Pvt Ltd<br>7th Street, Tatabad, Coimbatore, Tamil Nadu, India<br><a href="tel:+919442549200"><svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg>+91 94425 49200</a><br><a href="tel:+919442549490"><svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg>+91 94425 49490</a></address>
            </div>
          </div>
          <div class="hours-map"><table><caption>Business hours</caption><tbody><tr><th>Monday–Saturday</th><td>9:00 a.m.–7:00 p.m.</td></tr><tr><th>Sunday</th><td>Closed</td></tr></tbody></table><iframe title="Map to M.N. Polyester sales office" src="https://www.google.com/maps?q=11.0211825,76.962676&amp;z=14&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="text-link" href="https://maps.google.com/maps?ll=11.021183,76.962676&amp;z=14" target="_blank" rel="noreferrer">Get directions<svg class="icon" aria-hidden="true"><use href="#icon-external"></use></svg></a></div>
        </div>
      </section>
    </main>
    <footer class="site-footer"><div class="shell"><img src="assets/brand/mnpolyester-logo.svg" alt="M.N. Polyester"><p>Copyright © 2026 M.N. Polyester. All rights reserved.</p><a href="mailto:contact@mnpolyester.in"><svg class="icon" aria-hidden="true"><use href="#icon-mail"></use></svg>contact@mnpolyester.in</a></div></footer>
    <dialog class="image-dialog" aria-labelledby="factory-dialog-title" aria-describedby="factory-dialog-caption" data-image-dialog><h2 class="sr-only" id="factory-dialog-title">Factory image preview</h2><button type="button" aria-label="Close image" data-dialog-close><svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg></button><div class="image-dialog__media"><img src="assets/images/factory-materials.jpg" alt="" data-dialog-image></div><p id="factory-dialog-caption" data-dialog-caption></p></dialog>
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

Implement the approved concepts with the following design-system foundations:

```css
:root {
  --page: #FFFFFF;
  --surface: #F5F7FA;
  --text: #172033;
  --muted: #475569;
  --brand-blue: #2E3192;
  --brand-red: #ED1C24;
  --border: #D9E1EA;
  --container: 1180px;
  --gutter: 32px;
  --space-1: 8px;
  --space-2: 12px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 72px;
  --space-8: 112px;
  --section-space: clamp(64px, 8vw, var(--space-8));
  --radius-control: 8px;
  --radius-media: 12px;
  --control-min: 44px;
  --button-min: 48px;
  --button-inline-padding: 20px;
  --button-compact-inline-padding: 14px;
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-ease: cubic-bezier(.2, .8, .2, 1);
  --motion-enter-distance: 12px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  background: var(--page);
  scroll-behavior: smooth;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; color: var(--text); background: var(--page); font-size: clamp(1rem, .97rem + .15vw, 1.125rem); font-weight: 400; line-height: 1.65; }
img { display: block; max-width: 100%; }
a { color: inherit; }
button, input, textarea { font: inherit; }
.icon-sprite { position: absolute; width: 0; height: 0; overflow: hidden; }
.icon { width: 20px; height: 20px; flex: 0 0 auto; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.shell { width: min(var(--container), calc(100% - (var(--gutter) * 2))); margin-inline: auto; }
.section { padding-block: var(--section-space); }
.section-label { margin: 0 0 var(--space-2); color: var(--brand-blue); font-size: .75rem; font-weight: 800; line-height: 1.2; letter-spacing: .14em; text-transform: uppercase; }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 12ch; font-size: clamp(2.5rem, 6vw, 4.75rem); font-weight: 800; line-height: 1; letter-spacing: -.045em; }
h2 { max-width: 14ch; font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 800; line-height: 1.06; letter-spacing: -.035em; }
h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 700; line-height: 1.2; letter-spacing: -.02em; }
:focus-visible { outline: 3px solid var(--brand-blue); outline-offset: 4px; }
.skip-link { position: fixed; z-index: 100; top: var(--space-3); left: var(--space-3); transform: translateY(-180%); padding: var(--space-2) var(--space-3); background: var(--page); }
.skip-link:focus { transform: none; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.button { display: inline-flex; min-height: var(--button-min); align-items: center; justify-content: center; gap: var(--space-1); padding: var(--space-2) var(--button-inline-padding); border: 1px solid var(--brand-blue); border-radius: var(--radius-control); background: var(--brand-blue); color: var(--page); font-size: .9375rem; font-weight: 700; line-height: 1.2; letter-spacing: .01em; text-decoration: none; transition: transform var(--motion-fast) var(--motion-ease); }
.button:hover { transform: translateY(-2px); }
.button--small { min-height: var(--control-min); padding: var(--space-2) var(--button-compact-inline-padding); }
.button--light { border-color: var(--page); background: var(--page); color: var(--brand-blue); }
.button--outline-light { border-color: var(--page); background: transparent; color: var(--page); }
.text-link, .contact address a, .site-footer a { display: inline-flex; min-height: var(--control-min); align-items: center; gap: var(--space-1); }
.text-link { color: var(--brand-blue); font-weight: 700; text-underline-offset: .28em; }
.site-header { position: sticky; z-index: 20; top: 0; border-bottom: 1px solid var(--border); background: var(--page); }
.site-header__inner { display: flex; min-height: 78px; align-items: center; gap: var(--space-5); }
.brand { display: inline-flex; min-height: var(--control-min); align-items: center; margin-right: auto; }
.brand img { width: 164px; height: auto; }
.site-nav { display: flex; gap: var(--space-4); }
.site-nav a { min-height: var(--control-min); display: inline-flex; align-items: center; font-size: .9375rem; font-weight: 700; line-height: 1.2; letter-spacing: .01em; text-decoration: none; }
.nav-toggle { display: none; }
.hero { overflow: hidden; padding-block: clamp(var(--space-5), 5vw, var(--space-7)); background: var(--surface); }
.hero__copy { display: grid; min-height: min(720px, calc(100vh - 120px)); grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; gap: clamp(var(--space-5), 6vw, var(--space-8)); }
.hero__copy > div > p { max-width: 34ch; color: var(--muted); font-size: clamp(1.125rem, 1.05rem + .4vw, 1.375rem); font-weight: 400; line-height: 1.5; letter-spacing: -.01em; }
.hero__actions, .contact-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }
.hero__media { margin: 0; height: min(640px, 70vh); border-radius: var(--radius-media); }
.hero__media img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.media--edge-crop { position: relative; overflow: hidden; }
.hero__media.media--edge-crop img, .gallery__item.media--edge-crop img { position: absolute; inset: -2%; width: 104%; height: 104%; max-width: none; object-fit: cover; object-position: center; }
.about__grid, .products__grid, .contact__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(var(--space-5), 8vw, var(--space-8)); }
.prose { max-width: 62ch; }
.products { background: var(--surface); }
.products figure { margin: 0; align-self: stretch; }
.products figure img { width: 100%; height: 100%; min-height: 480px; border-radius: var(--radius-media); object-fit: cover; }
.product-list { margin: var(--space-5) 0 0; padding: 0; list-style: none; counter-reset: products; }
.product-list li { display: grid; grid-template-columns: 2.5rem 1fr; gap: var(--space-2); padding-block: var(--space-2); border-top: 1px solid var(--border); counter-increment: products; }
.product-list li::before { content: counter(products, decimal-leading-zero); color: var(--brand-blue); font-weight: 800; }
.section-heading { display: flex; justify-content: space-between; gap: var(--space-5); align-items: end; margin-bottom: var(--space-6); }
.section-heading > p { max-width: 34ch; color: var(--muted); }
.gallery { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-3); }
.gallery__item { position: relative; grid-column: span 4; min-height: 280px; padding: 0; border: 0; border-radius: var(--radius-media); background: var(--surface); cursor: zoom-in; overflow: hidden; }
.gallery__item:first-child { grid-column: span 8; grid-row: span 2; }
.gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--motion-fast) var(--motion-ease); }
.gallery__item:hover img { transform: scale(1.02); }
.gallery__zoom { position: absolute; z-index: 2; right: var(--space-2); bottom: var(--space-2); display: grid; width: var(--control-min); height: var(--control-min); place-items: center; border-radius: var(--radius-control); background: var(--page); color: var(--brand-blue); pointer-events: none; }
.contact { padding-block: var(--section-space); background: var(--surface); color: var(--text); }
.contact__grid { gap: 0; }
.contact__grid > div { padding: clamp(var(--space-5), 5vw, var(--space-7)); }
.contact__grid > div:first-child { background: var(--brand-blue); color: var(--page); }
.contact__grid > div:first-child .section-label { color: var(--page); }
.contact__grid > div:first-child :focus-visible { outline-color: var(--page); }
.hours-map { background: var(--page); }
.contact__grid > div:first-child address a { color: inherit; }
.contact-detail { display: grid; grid-template-columns: var(--space-4) minmax(0, 1fr); gap: var(--space-2); align-items: start; margin-top: var(--space-6); }
.contact-detail > .icon { margin-top: var(--space-1); }
.contact address { margin: 0; font-style: normal; }
.hours-map table { width: 100%; margin-bottom: var(--space-4); border-collapse: collapse; }
.hours-map caption { margin-bottom: var(--space-2); text-align: left; font-weight: 800; }
.hours-map th, .hours-map td { padding: var(--space-2) 0; border-bottom: 1px solid var(--border); text-align: left; }
.hours-map iframe { width: 100%; min-height: 320px; border: 0; }
.site-footer { padding-block: var(--space-5); border-top: 1px solid var(--border); }
.site-footer .shell { display: flex; align-items: center; gap: var(--space-5); }
.site-footer img { width: 135px; }
.site-footer p { margin: 0 auto 0 0; color: var(--muted); }
.image-dialog { width: min(960px, calc(100% - (var(--gutter) * 2))); padding: 0; border: 0; background: var(--text); color: var(--page); }
.image-dialog::backdrop { background: rgb(23 32 51 / 82%); }
.image-dialog__media { overflow: hidden; }
.image-dialog img { width: 100%; max-height: 78vh; object-fit: contain; }
.image-dialog img[data-edge-crop] { transform: scale(1.0417); transform-origin: center; }
.image-dialog button { position: absolute; top: var(--space-2); right: var(--space-2); display: grid; width: var(--control-min); height: var(--control-min); place-items: center; border: 0; border-radius: var(--radius-control); background: var(--page); color: var(--text); cursor: pointer; }
.image-dialog [data-dialog-close]:focus-visible { outline: 2px solid var(--text); outline-offset: 2px; box-shadow: 0 0 0 5px var(--page); }
.image-dialog button svg { width: 22px; height: 22px; }
.image-dialog p { margin: 0; padding: var(--space-3) var(--space-4); }

@media (max-width: 800px) {
  :root { --gutter: 24px; }
  .header-contact { display: none; }
  .nav-toggle { display: inline-grid; width: var(--control-min); height: var(--control-min); place-items: center; border: 1px solid var(--border); border-radius: var(--radius-control); background: var(--page); }
  .nav-toggle .icon { width: 22px; height: 22px; }
  .site-nav { position: absolute; top: 100%; right: 0; left: 0; display: none; flex-direction: column; padding: var(--space-4) var(--space-3); border-bottom: 1px solid var(--border); background: var(--page); }
  .site-nav[data-open="true"] { display: flex; }
  .hero { background: var(--surface); }
  .hero__copy, .about__grid, .products__grid, .contact__grid { grid-template-columns: 1fr; }
  .hero__copy { min-height: 0; padding-block: var(--space-6); }
  .hero__media { height: 58vw; min-height: 320px; }
  .products figure img { min-height: 320px; }
  .section-heading, .site-footer .shell { align-items: flex-start; flex-direction: column; }
  .gallery__item, .gallery__item:first-child { grid-column: span 6; grid-row: auto; min-height: 220px; }
  .site-footer p { margin: 0; }
}

@media (max-width: 520px) {
  :root { --gutter: 18px; }
  .gallery__item, .gallery__item:first-child { grid-column: 1 / -1; min-height: 240px; }
  .hero__actions, .contact-actions { align-items: stretch; flex-direction: column; }
  .button { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  :root { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  [data-reveal], .button, .gallery__item img { opacity: 1 !important; transform: none !important; }
  .image-dialog img[data-edge-crop] { transform: scale(1.0417) !important; }
}
```

Use these design-system values exactly. Focal `object-position` may be adjusted during browser QA to keep subjects comfortably framed. For the thin baked-in near-white capture borders in `hero-team.jpg` and `factory-team.jpg`, retain the dedicated 2% CSS edge crop (permitted range: 1–3%) and do not edit the source files. Do not apply photo filters, overlays, tints, gradients, blend modes, or any other color/tone treatment. Keep the palette and section order fixed.

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
test("exposes the complete accessible interaction contract", async () => {
  const script = await readFile(resolve(root, "assets/js/main.js"), "utf8");
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /data-nav-toggle/);
  assert.match(html, /<dialog[^>]+aria-labelledby="factory-dialog-title"[^>]+aria-describedby="factory-dialog-caption"[^>]+data-image-dialog/);
  assert.match(html, /id="factory-dialog-title"[^>]*>Factory image preview<\/h2>/);
  assert.match(html, /id="factory-dialog-caption"[^>]*data-dialog-caption/);
  assert.match(html, /aria-label="Close image"[^>]+data-dialog-close/);
  assert.match(html, /data-full="assets\/images\//);
  assert.match(html, /data-edge-crop/);

  for (const icon of ["menu", "external", "zoom", "location", "mail", "phone", "whatsapp", "close"]) {
    assert.match(html, new RegExp(`<symbol id="icon-${icon}"`));
    assert.match(html, new RegExp(`href="#icon-${icon}"`));
  }

  const galleryItems = html.match(/data-full="assets\/images\//g) ?? [];
  const zoomIcons = html.match(/href="#icon-zoom"/g) ?? [];
  assert.equal(zoomIcons.length, galleryItems.length, "every gallery control needs a zoom icon");

  assert.match(script, /navToggle\?\.addEventListener\("click"/);
  assert.match(script, /dialog\.showModal\(\)/);
  assert.match(script, /toggleAttribute\("data-edge-crop",\s*button\.hasAttribute\("data-edge-crop"\)\)/);
});
```

- [ ] **Step 2: Run it to confirm the JavaScript contract is incomplete**

Run: `node --test test/site-content.test.mjs`

Expected: FAIL while the HTML hooks are incomplete, `assets/js/main.js` is absent or empty, or edge-crop propagation is missing. It passes only after the complete interaction contract is implemented.

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
  dialogImage.toggleAttribute("data-edge-crop", button.hasAttribute("data-edge-crop"));
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

### Task 6: Add GitHub Pages and default-domain crawler configuration

**Files:**
- Create: `.nojekyll`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `.github/workflows/pages.yml`
- Modify: `README.md`

- [ ] **Step 1: Add the default-domain crawler and static-hosting markers**

`.nojekyll` is an empty file.

`robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://mnpolyester.github.io/sitemap.xml
```

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mnpolyester.github.io/</loc>
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

Static website for M.N. Polyester, hosted directly at [mnpolyester.github.io](https://mnpolyester.github.io/).

## Local preview

Run `python3 -m http.server 4173` from the repository root, then open `http://127.0.0.1:4173/`.

## Tests

Run `node --test test/*.test.mjs`.

## Deployment

Pushes to `main` deploy through `.github/workflows/pages.yml`. No custom domain is configured and no `CNAME` file is present, so `https://mnpolyester.github.io/` remains the canonical site.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Do not use `Arunothia-Marappan` credentials.
```

Document that any optional GoDaddy forwarding is owner-managed, outside this repository, and must preserve the mail records for `contact@mnpolyester.in`.

- [ ] **Step 4: Test configuration files**

Run:

```bash
test ! -e CNAME
xmllint --noout sitemap.xml
node --test test/*.test.mjs
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 5: Commit hosting configuration**

```bash
git add .nojekyll robots.txt sitemap.xml .github/workflows/pages.yml README.md
git commit -m "chore: configure default GitHub Pages domain"
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

Fix every material mismatch and repeat the screenshots. The allowed above-the-fold visible copy is only the approved logo; “About,” “Products,” “Factory,” “Contact,” “Email us,” “Unsaturated Polyester Resin Manufacturer,” “Precision and quality in every batch, every time.,” “Contact our team,” and “View product range.”

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

### Task 8: Release independently at `mnpolyester.github.io`

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

- [ ] **Step 4: Clear the Pages custom domain and preserve workflow deployment**

Use the verified `mnpolyester` account to select GitHub Actions as the Pages source if it is not already configured. Remove any custom-domain value from the repository's Pages settings while preserving `build_type: workflow`.

- [ ] **Step 5: Verify the deployment and Pages settings**

Wait for the Pages workflow to complete successfully. Query the repository's Pages settings and confirm that the custom domain is empty and the published URL is `https://mnpolyester.github.io/`.

- [ ] **Step 6: Verify the independent public URL**

Verify:

```sh
curl -I https://mnpolyester.github.io/
curl -sS https://mnpolyester.github.io/
```

Expected: the GitHub Pages URL returns the website directly over HTTPS with no redirect to `mnpolyester.in`, and the document declares the GitHub Pages URL as canonical.

- [ ] **Step 7: Preserve the owner-managed forwarding boundary**

Do not change GoDaddy, DNS, domain registration, or mail records. Any optional forwarding from `mnpolyester.in` is performed separately by the site owner, and `contact@mnpolyester.in` remains the official company email.

- [ ] **Step 8: Hand off**

Report the successful workflow, direct GitHub Pages URL, empty custom-domain setting, and live response verification. Remind the user that GoDaddy forwarding remains their separate task.
