# Behaviors — klruniversal.com `/`

## Scroll sweep
- Header: `position: static`, no background/shadow change observed at scroll 0 vs scroll 600px. Not sticky.
- No scroll-snap, no scroll-driven IntersectionObserver effects detected on section transitions.
- Floating "Enquire Now" tab (`.sgpb-floating-button`) becomes visible after scrolling past the hero (WP Popup Builder default behavior) — treated as a simple fixed-position CTA, not deeply reverse-engineered (low priority per skill defaults, out of core scope).

## Click sweep
- **Header → "Products"**: click opens `.products-modal`, a fixed red drawer sliding in from the right edge, full viewport height, with a dark scrim over the rest of the page. Lists two grouped link lists (Drilling Rigs ×5, Drilling Tools ×3) and a close (×) button top-right. **Interaction model: click-driven drawer**, not a hover dropdown.
- **Header → hamburger (mobile, <768px)**: opens a mobile nav (not deeply inspected — implement as a standard slide-in/overlay panel with the same links as desktop nav).
- **"Explore Our Solutions" / "See Our Journey" / "Explore More" / "Get In Touch" / "Enquire Now"**: standard link/button navigation, no special JS behavior beyond page navigation or form submit.

## Hover sweep
- Category cards / blog cards / stat cards: standard card treatment (no elaborate hover animation was observed beyond default browser link states in the static extraction pass). Build with a subtle hover (slight shadow/translate) consistent with the visual weight of the design — not verified against a live hover diff, flagged as a reasonable inference rather than an extracted fact.

## Time-driven
- **Flagship carousel** (`.flagship-slider`, slick-carousel): auto-advancing single-slide carousel cycling through ~10 product images (`flagship-img-1` class), 560×315px slide size at desktop. Treated as autoplay, loop, no visible arrows/dots in the captured markup.
- **Background video** (`.video-section video`): autoplay, loop, muted, no controls — Earth-from-space footage (`Desktop-Size-_1_1_1.mp4`).

## Responsive sweep (1440 / 768 / 390)
- **Hero**: visible ≥768px, `display:none` and 0-height collapse <768px (desktop-only asset via `.showOnDesktop` class — no separate mobile hero asset was found rendering, so mobile genuinely skips straight from header to the red "Drilling Innovation" section).
- **Header nav**: full inline nav ≥768px; hamburger + red globe/language icon <768px.
- **"Why KLR Universal" feature boxes**: single-column stacked icon+text rows at ≤768px; row-oriented at desktop (five items).
- **Product category cards**: 5-across row at 1440px; single column at 390px (768px not explicitly captured for this section — treat as 2–3 col at md as a reasonable interpolation).
- **Stats grid**: multi-column (4 + 3) at desktop; single column at mobile.
- **Blog cards**: 3-across at desktop; single column at mobile.
- **Contact form**: 2-column field grid at desktop; single column at mobile.

## Known gaps (documented, not fabricated)
- Exact slick-carousel autoplay interval/easing for the flagship carousel was not measured (slick default is ~3000ms `ease` linear scroll) — built using slick's documented defaults.
- Mobile hamburger menu's exact open/close transition (slide vs fade, duration) was not diffed before/after click — built as a standard 300ms slide-in panel matching the red drawer treatment used by the Products menu.
- Card/link hover states were not diffed against a live `:hover` capture — built as a subtle, design-consistent hover, not an extracted fact.
