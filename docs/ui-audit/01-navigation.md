# Navigation and sticker controls

Baseline `de1dad4`. The live layout mounts [StickerNavigation](../../src/layouts/Layout.astro#L27-L34). The older Header component is outside this path.

## P1. Primary destinations depend on decoration placement

At mobile widths, open the homepage with JavaScript disabled. Try to reach the archive through the visible navigation. The All posts sticker starts hidden and the placement code reveals it only after finding a visible slot. The regular footer links lead to external profiles and email. At 390px in Chromium, All posts was the only archive anchor and had zero rendered rectangles with scripts disabled. Wallpapers uses the same initially hidden pattern.

[Initial markup](../../src/components/StickerNavigation.astro#L61-L69) · [Hidden-state CSS](../../src/styles/sticker-navigation.css#L6-L7) · [Slot lookup](../../src/lib/sticker-navigation.js#L225-L229) · [Footer](../../src/components/Footer.astro#L12-L27)

Add ordinary in-flow links for the archive and other core destinations where the reader expects them. Reuse the current labels and URLs. Keep movable sticker art as a progressive enhancement. Ensure any duplicate link exposed to keyboard users serves a distinct navigation region.

**Acceptance.** On a fresh load with scripts disabled, reach the archive from Home and return to Home from a post. Repeat with scripts enabled at 390px and 1440px. Tab through in document order.

## P2. Reset can leave keyboard focus behind

Move a sticker, tab to Reset, and activate it with Enter. Reset hides itself without choosing a focus destination. The next Tab can jump away from the previous navigation context.

[Reset handler](../../src/lib/sticker-navigation.js#L128-L133)

After keyboard activation, restore focus to the last moved sticker if visible, with a deterministic navigation link as fallback. Check focus at both widths and after a route transition.
