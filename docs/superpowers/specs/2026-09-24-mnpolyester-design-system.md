# M.N. Polyester Website Design System

## Purpose and audience

This system defines the production visual language for a simple industrial company website serving buyers and existing customers. The page should make the manufacturer, product range, factory, and direct contact routes easy to understand without ornamental marketing devices or invented claims.

The generated concept PNGs in `docs/superpowers/specs/assets/` are layout and visual references only. The production interface must keep all text, icons, the approved logo, and authentic factory photography code-native or loaded from local repository assets. Do not extract, crop, or reuse rendered interface elements from the concepts.

## Page composition

Use this section order:

1. A quiet sticky header with the approved logo, simple text navigation, and one compact email action.
2. A 50/50 split hero with copy on the left and the authentic team photograph on the right.
3. About copy followed by the complete, ruled product list.
4. An editorial factory gallery.
5. Contact details, map, and opening hours.
6. A restrained footer.

Keep the overall layout open and rectangular. Sections should read as one continuous page rather than a grid of floating cards.

### Above-the-fold copy allowlist

Only the following visible copy is allowed above the fold:

- The approved M.N. Polyester logo.
- `About`
- `Products`
- `Factory`
- `Contact`
- `Email us`
- `Unsaturated Polyester Resin Manufacturer`
- `Precision and quality in every batch, every time.`
- `Contact our team`
- `View product range`

Do not add an eyebrow, kicker, badge, statistics, certifications, or supplementary marketing copy to the first screen.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Page | `#FFFFFF` | Primary page background |
| Surface | `#F5F7FA` | Cool-steel section background |
| Text | `#172033` | Headings and primary copy |
| Muted | `#475569` | Supporting copy and metadata |
| Brand blue | `#2E3192` | Primary actions, links, strong accents |
| Brand red | `#ED1C24` | Decorative rules and accent shapes only; never small text or focus indicators |
| Border | `#D9E1EA` | Rules, frames, dividers, and control borders |

Use solid colors only. Gradients are prohibited. Do not apply a color overlay, tint, blend mode, or artificial color treatment to photographs.

Use brand blue for section labels, product numbers, links, and focus outlines on white or cool-steel surfaces. On the brand-blue contact panel, labels, inline links, outlined-button text/borders, and focus outlines use white. Preserve brand red in the palette for non-text decorative details only.

## Typography

Use a strong system sans-serif stack so the site remains dependency-free and fast:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

The stack must degrade cleanly without loading a remote font. Headings should be bold and compact, body copy should have a relaxed readable line length, and navigation, buttons, labels, and product numbers should use deliberate control typography rather than decorative lettering.

Use responsive `clamp()` scales for major headings, body copy, and spacing. Preserve clear hierarchy without oversized display text that forces useful content below the fold.

Apply this exact responsive type scale:

| Role | Size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Display / `h1` | `clamp(2.5rem, 6vw, 4.75rem)` | `800` | `1` | `-0.045em` |
| Section / `h2` | `clamp(2rem, 4vw, 3.25rem)` | `800` | `1.06` | `-0.035em` |
| Subheading / `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | `700` | `1.2` | `-0.02em` |
| Lead | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | `400` | `1.5` | `-0.01em` |
| Body | `clamp(1rem, 0.97rem + 0.15vw, 1.125rem)` | `400` | `1.65` | `0` |
| Navigation and controls | `0.9375rem` | `700` | `1.2` | `0.01em` |
| Section label | `0.75rem` | `800` | `1.2` | `0.14em`, uppercase |

## Container, spacing, and shape

- Maximum content container: `1180px`.
- Keep text measures readable even within the full container.
- Use 8–12px corner radii only on media frames and buttons.
- Avoid pill-shaped controls, excessive rounding, shadows that suggest floating cards, and card-grid treatment.
- Let borders, alignment, white space, and alternating white/cool-steel surfaces establish structure.

Use these exact implementation tokens:

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
}

.shell {
  width: min(var(--container), calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
}

@media (max-width: 800px) {
  :root { --gutter: 24px; }
}

@media (max-width: 520px) {
  :root { --gutter: 18px; }
}
```

Use the spacing scale for layout gaps, padding, and margins, with `--section-space` for primary section padding. The two documented button-padding tokens are the only component-specific spacing exceptions. Exact icon geometry, image/frame heights, border widths, and media dimensions may use documented component values because they are not layout rhythm.

### Responsive breakpoints

- Above `800px`: desktop navigation, two-column hero, and multi-column content compositions.
- At `800px` and below: mobile menu, stacked hero with copy first, stacked About/contact layouts, and a two-column gallery where space allows.
- At `520px` and below: compact gutters, single-column gallery, and full-width action buttons.

Do not add intermediary layout breakpoints unless browser verification demonstrates a concrete overflow defect.

### Shape and control dimensions

- Standard buttons: minimum height `48px`, horizontal padding `var(--button-inline-padding)` (`20px`), radius `8px`.
- Compact header button: minimum height `44px`, horizontal padding `var(--button-compact-inline-padding)` (`14px`), radius `8px`.
- Icon-only controls: exactly `44px × 44px`, radius `8px`.
- Media frames: radius `12px`.
- All other sections, lists, split panels, and structural surfaces remain square-cornered.

## Components

### Header and navigation

The sticky header should be quiet and compact, with a solid page background, a subtle bottom border, the local vector logo, simple anchor links, and a clearly visible focus state. The brand link must be an inline-flex control with a minimum `44px` target. On mobile, replace the navigation row with an accessible menu toggle and a vertically stacked navigation panel.

### Buttons and links

Primary actions use a solid brand-blue background with white text. Secondary actions on light surfaces use an outlined treatment with brand-blue text and border. The inverse secondary-button variant on the brand-blue contact panel uses white text and a white border. Keep labels direct and provide a minimum 44px interactive target. Text links, contact inline links, and footer links must use inline-flex alignment with a minimum `44px` height. A text link may use a small external/arrow icon where it clarifies destination or movement.

Use a `3px` brand-blue focus outline with a `4px` offset on light surfaces. Override the outline to white for controls inside the brand-blue contact panel.

The dialog close control sits over both dark dialog chrome and arbitrary photography, so it requires a dual-color focus indicator: a `2px` text-color inner outline at a `2px` offset plus a `5px` white outer ring. This treatment must replace, not merely inherit, the global focus rule:

```css
.image-dialog [data-dialog-close]:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
  box-shadow: 0 0 0 5px var(--page);
}
```

### Product list

Present products as a ruled, numbered list rather than individual cards. Product numbers use brand blue, not brand red. The number column, product name, and supporting qualifier should share a consistent baseline and collapse cleanly on narrow screens.

### Factory gallery

Use an editorial composition with one large anchor frame and smaller supporting frames. Preserve natural image ratios where practical. Gallery controls should be discoverable by keyboard and include a simple zoom icon and truthful image alternative text.

### Contact section

Use a blue/white split composition: direct contact information on the strong blue panel, and the map plus opening hours on a white or cool-steel panel. The contact-panel section label is white. Keep email, phone, WhatsApp, address, and directions as ordinary functional links when appropriate. Frame the map cleanly and show hours in a simple table, not separate cards.

### Footer

Use a restrained footer with the approved logo or company name, copyright, and concise contact/navigation links. Avoid promotional bands, decorative illustrations, or duplicate large calls to action.

## Authentic media inventory

Use only the local image assets below. The descriptions are authoritative: use them exactly as each production image's alternative text. Gallery captions may be shorter, but they must remain factual.

| Asset | Truthful content / alt text |
| --- | --- |
| `assets/images/hero-team.jpg` | Factory staff wearing hard hats, masks and gloves outside the facility. |
| `assets/images/product-drums.jpg` | Three blue resin drums labelled “RESIN” in English and Tamil. |
| `assets/images/factory-materials.jpg` | Four blue M.N.P resin containers in a row. |
| `assets/images/factory-floor.jpg` | Color-coded waste barrels labelled other waste, plastic, and paper/cotton. |
| `assets/images/factory-team.jpg` | Staff wearing protective equipment beside stored blue containers at the factory entrance. |
| `assets/images/factory-process-1.jpg` | Worker handling a suspended material cage near stacked bags and blue containers inside the factory. |
| `assets/images/factory-process-2.jpg` | Worker moving a blue M.N.P container among rows of stored containers. |
| `assets/images/factory-storage.jpg` | Factory staff beside blue containers, raw-material bags, and color-coded bins. |
| `assets/images/factory-dispatch.jpg` | Worker using a backpack sprayer beside a delivery truck. |

The hero must show `hero-team.jpg` naturally and untreated. Do not place a blue overlay, darkening tint, colored wash, or gradient above it. Text belongs in the separate left column, never over the photograph.

### Intentional capture-edge crop

`hero-team.jpg` and `factory-team.jpg` contain thin, baked-in near-white borders from the original capture. Do not edit, retouch, or regenerate either source file. Crop only the outer 1–3% in CSS. Apply the correction to the hero, the gallery thumbnail, and the dialog display. The standard hero/thumbnail implementation uses a 2% crop on every edge:

```css
.media--edge-crop {
  position: relative;
  overflow: hidden;
}

.media--edge-crop img {
  position: absolute;
  inset: -2%;
  width: 104%;
  height: 104%;
  max-width: none;
  object-fit: cover;
  object-position: center;
}
```

For the dialog, put the image inside an overflow-hidden media wrapper and toggle a `data-edge-crop` attribute on the dialog image when `factory-team.jpg` opens. A static `scale(1.0417)` crops approximately 2% from each source edge:

```css
.image-dialog__media { overflow: hidden; }

.image-dialog img[data-edge-crop] {
  transform: scale(1.0417);
  transform-origin: center;
}
```

This transform is a static capture correction, not motion, and must remain applied under reduced-motion preferences. Focal-position adjustments may keep people comfortably framed, but the border correction must remain within the outer 1–3%. Do not add a filter, overlay, tint, contrast adjustment, saturation adjustment, blend mode, or any other color/tone treatment.

## Icon inventory

The required icon set is:

- Menu.
- External/arrow link.
- Gallery zoom.
- Location.
- Mail.
- Phone.
- WhatsApp.
- Close.

Implement all eight icons as a code-native inline SVG symbol sprite with `<use>` instances. Use 2px `currentColor` outlines with round joins and caps; the WhatsApp symbol may use its recognizable authentic glyph where an outline abstraction would reduce clarity. The menu toggle uses Menu, each gallery control uses Zoom, the address uses Location, email actions use Mail, both telephone links use Phone, the WhatsApp action uses WhatsApp, directions uses External/arrow, and the dialog close button uses Close.

Decorative icon instances use `aria-hidden="true"`; visible text remains beside action icons. Icons supplement labels and must never replace the menu's visually hidden label, link text, or the close button's accessible name.

The image dialog must have `aria-labelledby` pointing to a visually hidden heading and `aria-describedby` pointing to its dynamic caption. Keep the close button's explicit accessible name. The caption text must be populated before `showModal()`.

## Responsive behavior

- Replace desktop navigation with an accessible mobile header toggle.
- Stack the hero on narrow screens with copy first and the photograph second.
- Collapse product rows, gallery composition, and the contact split without losing reading order or information.
- Maintain at least 44px touch targets for interactive controls.
- Prevent horizontal overflow at all supported viewport widths.
- Keep images inside their containers with intentional `object-fit` and focal positioning.
- Retain visible keyboard focus and logical source order across breakpoints.

## Motion

Motion is limited to subtle opacity/translate entrances and restrained hover feedback. Entrances use `240ms`, `var(--motion-ease)`, and no more than `12px` of vertical travel. Hover feedback uses `160ms`, the same easing, and no more than `2px` of vertical travel; an image hover may scale to at most `1.02`. Motion must never delay access to content.

Disable motion completely when reduced motion is requested:

```css
@media (prefers-reduced-motion: reduce) {
  :root { scroll-behavior: auto; }

  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }

  [data-reveal],
  .button,
  .gallery__item img {
    opacity: 1 !important;
    transform: none !important;
  }

  .image-dialog img[data-edge-crop] {
    transform: scale(1.0417) !important;
  }
}
```

## Concept reference index

- `docs/superpowers/specs/assets/concept-hero.png`
- `docs/superpowers/specs/assets/concept-about-products.png`
- `docs/superpowers/specs/assets/concept-factory.png`
- `docs/superpowers/specs/assets/concept-contact.png`

These files preserve the accepted visual direction. They are not production website assets and should not be linked from `index.html`.
