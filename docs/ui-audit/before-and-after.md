# Zeno before and after

The October post was the clearest repro. Scroll to the end on a phone and the cloud hangs below the section trigger, the last few paragraphs have big gaps between words, and the wallpaper sticker gets a row to itself before the footer. Those three things now have their own space and behave consistently across posts.

This pass follows the audit of all 36 published pages and two 404 URLs. Most fixes live in shared templates, so an article or tag fix reaches every page using that template.

## Reading a post

| Before | After |
| --- | --- |
| On mobile, the section trigger was 44px tall and the cloud's hit area extended 20px below it. | The cloud and section trigger each have a 56px slot in the same sticky row. The expanded menu starts below them. |
| Choosing The Hackathon and resizing from 390px to 320px could leave the URL on that section while the bar said Changing with AI. | The heading stays 72px from the top in the same repro. The bar agrees with the URL. Manual scrolling resumes normal section tracking. |
| At 1200px the bar dropped 76px, and the sidebar appeared only at 1280px. | The bar stays at the top through 1279px. The sidebar takes over at 1280px. |
| Narrow paragraphs and lists stretched short lines to fill the column. Metadata could wrap around loose separators. | Prose aligns to the start. Dates and reading times wrap as units, and the Home sticker has a taller title row. |
| Back to Blogs wrapped a button in a link. | One styled link provides a single keyboard stop and a 44px minimum target. |
| The vpSSH terminal and map images were hard to inspect on a phone. | Each theme's image links to its original size. |

## Getting around

| Before | After |
| --- | --- |
| The notebook was the only archive link on Home, and it depended on sticker placement. | All posts has a normal text link beside Latest Posts. The footer has Home, All posts, and Wallpapers links. |
| Page 1 and Previous on archive page two sent you to Home. The last archive page left a large gap before pagination. | Both links stay inside the archive. Pagination follows the last card. A compact All posts heading shows the page number, and each archive page has its own browser title. |
| Short author and tag pages used a breadcrumb as the only page title and left a large gap above the footer. | Explicit headings identify the pages, and their footer follows the content. The author profile uses the author's name once as the primary heading and calls the list Posts. |
| The 404 breadcrumb said “???” and the recovery action only led to Home. | The error page gives readers a direct route to the archive as well. Double Take stays unpublished. |
| Sitcoms showed 1 min on its card and 6 min on its page. | The card uses the article's reading time for standalone posts. Series retain their combined reading time. |
| The wallpaper sticker reserved a separate row above the mobile footer. Keyboard Reset could hide the focused button. | Wallpapers appears in the footer links. Desktop keeps the wallpaper sticker. Reset returns keyboard focus to the moved sticker or Portfolio. |

## Theme, forms and other pages

| Before | After |
| --- | --- |
| The global D handler could cancel a delivered Ctrl+D or Cmd+D. The initial system palette was saved as a user choice, and browser chrome used the same color for both themes. | The cloud works with its native button controls. The OS preference applies until you toggle the theme, and browser chrome follows the active palette. |
| Without EmailJS config, the Collaborate form still appeared and a native submission put fields in the URL. Copying from a form field could append blog attribution. | The page offers direct email when the form is unavailable. The configured form waits for its handler, uses POST as a fallback, and exposes status. Clipboard attribution applies to article prose. |
| A malformed local wallpaper cache could interrupt a healthy gallery. Hover could open a preview by itself. | The public manifest still loads. Preview opens explicitly in a labeled modal that fits the image, with native Escape and focus handling. |
| About and the guitar intro left extra space. Songs used a tall return row and flashed a zero track count. The Spotify headline shared a narrow column with the Home sticker. | About and Guitar start sooner. Songs has a shorter return row and a loading label. Spotify gives the headline its own space on mobile. |
| Movie browsing and suggesting looked like one action. The upload page repeated its requirements in two panels. | Movies has a keyboard-operable suggestions toggle and a labeled suggestion field. Upload requirements sit next to the file picker. |
| A fresh install failed because Vitest was missing from the lockfile. | The lockfile includes the declared test dependencies, and the locked Astro version stays at 5.16.5. |

## Verification

- `npm ci` completed and `npm run build` generated 37 pages with zero Astro check errors.
- All 508 existing tests passed.
- Local Chromium checked the shared reader at 320px, 390px, 1200px, 1280px and 1440px. It also checked archive links, the scripts-disabled Home fallback, the Collaborate fallback, Sitcoms reading time, a malformed wallpaper cache, and opening the wallpaper modal.
- Physical-device safe areas, actual audio playback, and configured third-party submissions were outside the checks. The annotated audit remains the before reference.
