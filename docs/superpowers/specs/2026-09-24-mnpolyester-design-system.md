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
| Brand red | `#ED1C24` | Small authentic brand accents only |
| Border | `#D9E1EA` | Rules, frames, dividers, and control borders |

Use solid colors only. Gradients are prohibited. Do not apply a color overlay, tint, blend mode, or artificial color treatment to photographs.

## Typography

Use a strong system sans-serif stack so the site remains dependency-free and fast:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

The stack must degrade cleanly without loading a remote font. Headings should be bold and compact, body copy should have a relaxed readable line length, and navigation, buttons, labels, and product numbers should use deliberate control typography rather than decorative lettering.

Use responsive `clamp()` scales for major headings, body copy, and spacing. Preserve clear hierarchy without oversized display text that forces useful content below the fold.

## Container, spacing, and shape

- Maximum content container: `1180px`.
- Use roomy, consistent section rhythm with responsive `clamp()` spacing.
- Keep text measures readable even within the full container.
- Use 8–12px corner radii only on media frames and buttons.
- Avoid pill-shaped controls, excessive rounding, shadows that suggest floating cards, and card-grid treatment.
- Let borders, alignment, white space, and alternating white/cool-steel surfaces establish structure.

## Components

### Header and navigation

The sticky header should be quiet and compact, with a solid page background, a subtle bottom border, the local vector logo, simple anchor links, and a clearly visible focus state. On mobile, replace the navigation row with an accessible menu toggle and a vertically stacked navigation panel.

### Buttons and links

Primary actions use a solid brand-blue background with white text. Secondary actions use an outlined treatment with brand-blue text and border. Keep labels direct and provide a minimum 44px interactive target. Text links may use a small external/arrow icon where it clarifies destination or movement.

### Product list

Present products as a ruled, numbered list rather than individual cards. The number column, product name, and supporting qualifier should share a consistent baseline and collapse cleanly on narrow screens.

### Factory gallery

Use an editorial composition with one large anchor frame and smaller supporting frames. Preserve natural image ratios where practical. Gallery controls should be discoverable by keyboard and include a simple zoom icon and truthful image alternative text.

### Contact section

Use a blue/white split composition: direct contact information on the strong blue panel, and the map plus opening hours on a white or cool-steel panel. Keep email, phone, WhatsApp, address, and directions as ordinary functional links when appropriate. Frame the map cleanly and show hours in a simple table, not separate cards.

### Footer

Use a restrained footer with the approved logo or company name, copyright, and concise contact/navigation links. Avoid promotional bands, decorative illustrations, or duplicate large calls to action.

## Authentic media inventory

Use only the local image assets below with the associated truthful descriptions. These descriptions are the source of truth for accessible alternative text; adjust punctuation or brevity only when the surrounding caption already conveys the same information.

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

Implement icons as simple inline SVGs with 2px outlines and `currentColor`, keeping stroke joins and caps consistent. The WhatsApp icon may use its recognizable authentic glyph where an outline abstraction would reduce clarity. Icons supplement visible labels; they must not replace necessary accessible names.

## Responsive behavior

- Replace desktop navigation with an accessible mobile header toggle.
- Stack the hero on narrow screens with copy first and the photograph second.
- Collapse product rows, gallery composition, and the contact split without losing reading order or information.
- Maintain at least 44px touch targets for interactive controls.
- Prevent horizontal overflow at all supported viewport widths.
- Keep images inside their containers with intentional `object-fit` and focal positioning.
- Retain visible keyboard focus and logical source order across breakpoints.

## Motion

Motion is limited to subtle opacity/translate entrances and restrained hover feedback. It must never delay access to content or move large distances. Disable all nonessential transitions, transforms, and animations under `prefers-reduced-motion: reduce`.

## Concept reference index

- `docs/superpowers/specs/assets/concept-hero.png`
- `docs/superpowers/specs/assets/concept-about-products.png`
- `docs/superpowers/specs/assets/concept-factory.png`
- `docs/superpowers/specs/assets/concept-contact.png`

These files preserve the accepted visual direction. They are not production website assets and should not be linked from `index.html`.
