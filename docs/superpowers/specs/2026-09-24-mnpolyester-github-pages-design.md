# M.N. Polyester GitHub Pages Website Design

## Purpose

Replace the current GoDaddy-hosted website with a lightweight, modern, single-page website hosted on GitHub Pages at `mnpolyester.in`. The redesign should feel more polished while remaining as simple as the current site and preserving its established content, factory photography, and contact details.

## Audience and goals

The primary audience is customers and prospective customers seeking unsaturated polyester resin products in South India. The page should quickly establish what the company manufactures, communicate its experience and product range, show the factory, and make direct contact easy.

The site succeeds when visitors can:

- Understand the company and its product offering from the first screen.
- Review the complete seven-item product range.
- See authentic factory and product photographs.
- Contact the company by email, phone, or WhatsApp.
- Find the sales office, business hours, map, and directions.
- Use the page comfortably on phones and desktop browsers.

## Content and page structure

The website will be one responsive page with anchored navigation and these sections:

1. **Header** — M.N. Polyester wordmark, links to About, Products, Factory, and Contact, plus a compact contact action.
2. **Hero** — A strong factory photograph, the heading “Unsaturated Polyester Resin Manufacturer,” the existing quality statement, and one direct contact action. No invented claims, statistics, badges, or decorative marketing copy.
3. **About** — The existing company history and mission text, edited only for punctuation and presentation without changing its meaning.
4. **Products** — The original seven product categories, preserving references to UV stabilization and resin type.
5. **Factory** — A responsive gallery using the existing factory and product photographs, with accessible alternative text and a simple lightbox only if it remains dependency-free and robust.
6. **Contact** — `contact@mnpolyester.in` as the official email address, the existing two phone numbers, WhatsApp link, Tatabad sales-office address, existing opening hours, an embedded map, and a directions link.
7. **Footer** — Copyright, company name, and quick contact links. The GoDaddy attribution and cookie banner will not be carried over because the new static site does not need them.

## Visual direction

The visual identity will retain the current blue-grey industrial character and authentic blue resin containers, while improving typography, spacing, hierarchy, and mobile responsiveness. The design will use a restrained palette, crisp white space, large photographic moments, and simple rectangular controls rather than ornamental cards or elaborate animation.

The implementation will use a small design system covering colors, typography, spacing, responsive containers, buttons, navigation, product rows, gallery frames, and contact details. Motion will be limited to subtle transitions and will respect reduced-motion preferences.

## Logo assets

The established M–N–P oval-and-orbit logo will be preserved rather than redesigned. The existing 700 × 297 source artwork will be deterministically traced into scalable vector paths, retaining its letter shapes, swooshes, proportions, “INDIA PVT LTD” line, and original blue and red palette (`#2E3192` and `#ED1C24`). Generative image tools will not redraw or reinterpret the mark.

The website asset set will contain:

- The complete logo with the original “INDIA PVT LTD” line in SVG and transparent high-resolution PNG formats.
- An authentic mark-only variant that removes only the tiny legal line for placements where it would be unreadable.
- A square favicon and touch-icon variant containing the complete existing M–N–P mark, centered without distortion or invented symbolism.

SVG will be preferred in the website so the logo remains sharp at every size. PNG exports will be retained for sharing, social metadata, and systems that cannot use SVG.

## Technical architecture

The site will be built with semantic HTML, CSS, and minimal vanilla JavaScript. This approach is recommended over React, Vite, or Jekyll because the site has no application state, backend, or templated content and should remain easy to host and maintain.

Repository deliverables will include:

- `index.html` for the page structure and content.
- Styles and minimal behavior in focused static asset files.
- Locally hosted, optimized versions of the existing site photographs and the approved logo asset set.
- `CNAME` containing `mnpolyester.in`.
- Basic metadata, social sharing metadata, favicon assets, robots directives, and a sitemap where appropriate.
- A concise README explaining local preview, GitHub Pages setup, and DNS records.

All resource paths will work from the repository root on GitHub Pages. The site will not require a paid hosting service, package installation, server process, database, analytics account, or API key.

## Interactions and external services

Navigation links will scroll to page sections. Email, phone, WhatsApp, Google Maps, and directions actions will use standard external links. The embedded map will use a public Google Maps embed URL that does not require an API key.

There will be no contact form because a static form would need an external submission service. Direct contact links provide the intended functionality without adding cost or operational dependencies.

If an external service is unavailable, the core company information and contact details remain visible as ordinary text. Images will use stable local files rather than hotlinking the GoDaddy-hosted originals.

## Hosting and domain migration

GitHub Pages will publish the repository from the configured branch and serve the custom domain `mnpolyester.in`. The apex domain should point to GitHub Pages using GitHub’s current documented DNS records, and `www.mnpolyester.in` should be configured as the canonical companion host when the DNS provider supports it. HTTPS enforcement should be enabled after GitHub issues the certificate.

The domain registration must remain active even though GoDaddy website-builder hosting can be discontinued. DNS changes will only be made after the new GitHub Pages deployment has been verified, minimizing downtime.

## Credential and release constraints

No Git operation may use the `Arunothia-Marappan` GitHub account. Local commits will use repository-local author identity `mnpolyester <contact@mnpolyester.in>`. Push and GitHub Pages configuration will wait until an authenticated `mnpolyester` session is available and verified.

## Verification

Before release, the site will be checked for:

- Accurate content against the current website and this specification.
- Correct official email address and all phone, WhatsApp, map, and navigation links.
- Desktop and mobile layout, keyboard navigation, visible focus styles, contrast, and reduced-motion behavior.
- Successful loading of every local image and absence of browser console errors.
- Valid static paths, custom-domain configuration, and a clean Git working tree.
- Visual fidelity to the approved modern redesign concept at representative desktop and mobile sizes.

DNS cutover will be verified separately by checking GitHub Pages status, HTTPS availability, apex-domain resolution, and `www` behavior.
