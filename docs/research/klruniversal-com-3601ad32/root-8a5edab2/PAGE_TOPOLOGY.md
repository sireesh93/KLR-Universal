# Page Topology — klruniversal.com `/`

Source: WordPress (Gutenberg custom blocks, theme `klr-child`). Font: **Saira** (Google Font, sans-serif), weights 400/500/600/700 used. Primary red: `#DA2129`. Section backgrounds alternate white (`#FFFFFF`), off-white (`#F7F7F7`/`#F9F9F9`), red (`#DA2129`), near-black (`#0A0A0A`).

No CSS `zoom`/`transform` scaling found; some computed values (e.g. `7.5px` radius, `3.75px` padding) reflect the theme's own fractional CSS values, not a scale bug.

## Order (top to bottom)

1. **Header** (`header.header`) — flow, `position: static` (NOT sticky/scroll-reactive). bg `#F9F9F9`.
2. **Hero** (`section.video-banner-block.cta-section.menu-products`) — desktop-only (`display:none` below 768px via `.showOnDesktop` image class + collapses to 0 height on mobile). Full-bleed photo, text card overlay on left, CTA button.
3. **Why KLR Universal / redbox** (`section.wp-block-naviddev-gutenberg-blocks-abous-us.redbox`) — red bg, heading+body+CTA, then 5 feature boxes (icon+text). Faint diagonal-diamond pattern decoration (`redbox-layer`, `redbox-layer2` SVGs).
4. **Product Categories** (`section.product-categories.solutions-padd`) — white bg, heading+intro paragraph, 5 category cards in a row (desktop); slick-carousel-capable markup (`slick-slide` classes present but effectively a static 5-across row at 1440px — carousel behavior only engages at narrower widths).
5. **Flagship / "Performance That Sets Standards"** (`section.flagship`) — red bg banner, left text block, right an auto-advancing **slick carousel** (`flagship-slider.slick-initialized`) of ~10+ product photos, single slide visible (560×315 desktop), diagonal pattern decoration.
6. **Video section** (`section.video-section`) — full-bleed, near-black bg, autoplaying/looping muted background video of Earth from space (`Desktop-Size-_1_1_1.mp4`), small logo watermark top-right.
7. **Highlights / stats** (`section.highlights.pos-rel`) — red bg, heading+intro, 7 stat cards (icon + title + text) in a 4-col/3-col two-row grid at desktop, single column at mobile. Card bg `#FFFEF2` (warm off-white), radius `7.5px`.
8. **Blog / Resources** (`section.resources-section`) — off-white bg (`#F7F7F7`), heading + "All Blogs" button top-right, 3 blog cards (image + excerpt + "Read more") in a row.
9. **Contact form CTA** (`section.contact-us-form.contact-us-form-lp`) — red left panel (heading+text) + white form panel (2-col field grid: Name, Email, Phone w/ country-code flag dropdown, Country, Drilling Depth, Drilling Diameter, Category select, Product select, message textarea, Submit button). Backed by WPCF7 (Contact Form 7) + sell.do CRM tracker in the original — clone renders the same UI as a client-side mock form (no real backend, per scope defaults).
10. **Footer** (`footer.footer`) — near-black (`#0A0A0A`) bg, logo + address/contact left, 3 link columns (Quick Links, Drilling Rigs, Drilling Tools), Follow Us social icons (YouTube, LinkedIn, X/Twitter), "Make in India" badge, copyright bar.

## Overlays / non-flow elements

- **Products mega-drawer** (`.products-modal`): click "Products" in header → red panel slides in from the right, full page height, semi-transparent scrim behind it, close (×) button top-right. Lists "Drilling Rigs" (5 links) and "Drilling Tools" (3 links). Click-driven, not scroll-driven.
- **Floating "Enquire Now" tab** (`.sgpb-floating-button`, WP Popup Builder plugin): fixed, vertical text tab pinned to the right edge of viewport, appears while scrolling past the hero. Low priority for the clone — treated as a simple fixed CTA tab.
- **Mobile hamburger menu** (`.mob-menu-logo` + hamburger icon): below 768px, header nav collapses to a hamburger; full-screen slide-in menu (not deeply inspected — build as a standard slide-in drawer with the same nav links).
- **Google Translate widget**: third-party, not part of the design system — excluded from the clone.

## Breakpoints observed

- **≥768px (md+)**: desktop header nav visible, hero visible, feature-boxes/category-cards in a row.
- **<768px**: hamburger nav, hero hidden entirely, feature-boxes and category-cards stack to single column, stats grid stacks to single column.
- **1440px (desktop reference)**: 5-column category grid, 2-row/4-col stats grid, 3-column blog grid, 2-column form fields.
