# Reproduction and verification

Baseline `de1dad4` from `origin/main`. This audit uses the committed version of the October post.

## Clean install failure

`npm ci` exited with `EUSAGE` because the lockfile lacks Vitest and associated packages. A disposable source copy with the unused-for-Astro Vitest development dependency removed from its manifest allowed an install against the existing lockfile. The audit commit leaves the original dependency files intact.

[Manifest](../../package.json) · [Lockfile](../../package-lock.json)

To make future audits repeatable, regenerate the lockfile with the supported npm version and verify a clean install and a production build from a fresh checkout. Keep that dependency repair as its own change.

## Observed in local Chromium

The local Astro dev server used the locked Astro 5.16.5. Chromium used a fresh profile and emulated viewport widths.

| Scenario | Observation |
| --- | --- |
| Home at 390px with scripts disabled | The All posts anchor had zero rendered rectangles. |
| Linux article at 390px | Back to Blogs contained a nested button. Article paragraph alignment computed to `justify`. |
| Home sticker beside the Linux article title at 390px | The link ended at about y=322 and the next image began at y=337. This fixture had clearance. |
| Synthetic Ctrl+D dispatched on the Linux article | The handler prevented the default action. |
| Theme switch with synthetic Alt+ArrowLeft | The offset and Reset state did not change. The existing theme exclusion works. |
| Reset after keyboard-moving Home at 1440px | The button container hid without an explicit focus transfer. |
| Collaborate without EmailJS configuration | A dummy submission requested /collaborate with name, email and message query keys. Copying a dummy textarea selection appended attribution. |

With Vitest supplied from a disposable dependency install, the locked Astro type check returned zero errors and the compiler generated 37 pages. An install that ignored the lockfile picked Astro 5.18.2 and produced type-check errors around the Movies page script. Use the locked version when comparing UI behavior.

## Regression checks for the fixes

| Environment | Route or transition | Check |
| --- | --- | --- |
| 320px and 390px, touch and keyboard | Home to archive to article to Home | Primary links remain available and targets avoid the article heading and image. |
| 1199px and 1200px | Reload an image post, then resize across the boundary | TOC, Home and body retain their placement. Previously saved offsets stay valid. |
| 1440px, keyboard | Move a sticker, activate Reset and continue tabbing | Focus returns to a visible control. The cloud never participates in movement. |
| 390px, high text zoom | Open a heading fragment on a long article | The heading is visible below the reading bar. Paragraphs remain readable and the active section tracks rotation. |
| Chromium, then physical Safari and Android Chrome | Toggle the theme, then navigate and reload | The site palette and switch agree. Explicit choices persist. System mode follows the device. |
| Fresh profile, scripts disabled | Home and article | Archive and Home links work independently of sticker placement. |
| Missing or mocked service config | Collaborate and Wallpapers | Form fallback and gallery error paths are legible. Exercise success and failure with dummy records. |

Chrome toolbar colors, touch long-press behavior and screen-reader announcements need device or assistive-technology checks. The sticky TOC and wallpaper cache findings need a follow-up browser pass. The route pass uses local pages and dummy inputs.

The accessibility review used [Vercel’s Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).
