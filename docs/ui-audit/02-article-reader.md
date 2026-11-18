# Article reading and section navigation

Baseline `de1dad4`. Use /blog/linux-experience and /blog/we-fell-in-code-in-october as reading fixtures.

## P1. Back to Blogs creates two interactive elements

At the bottom of a post, Tab through Back to Blogs and inspect its DOM. An anchor wraps the default Button, which renders a button. Chromium confirmed the nested controls on /blog/linux-experience at 390px.

[Article return](../../src/pages/blog/%5B...id%5D.astro#L172-L179) · [Button implementation](../../src/components/ui/button.tsx)

Use the existing Button styling on a single anchor. Hide the arrow icon from assistive technology if the renderer exposes it.

**Acceptance.** The action is one focus stop, announced as a link. Enter opens /blog and the context menu can open a new tab.

## Follow-up. Check the Home sticker hit area on short headings

On a phone, open a post with a short title. Compare the Home sticker's interactive wrapper with the top of the next image or article. The heading minimum is 56px and the shared Home wrapper has a 96px height. The first grid gap can be 16px. The nominal width also changes at the same breakpoint as reading tools. On /blog/linux-experience at 390px, Chromium measured the link bottom near y=322 and the next image top at y=337. That fixture cleared the image. Test other titles and widths before adjusting spacing.

[Reader heading and breakpoint](../../src/pages/blog/%5B...id%5D.astro#L223-L249) · [Home wrapper geometry](../../src/styles/sticker-navigation.css#L87-L115)

Use a shared dimension for the Home hit area and its reserved space, or anchor it inside the heading row. Keep the existing corner placement and artwork.

**Acceptance.** At 320px, 390px, 1199px and 1200px, the Home target and heading row do not cover a neighboring link or the hero. Include short and multiline titles.

## P2. Justified text produces large word gaps on narrow screens

Read a few paragraphs and list items at 320px, then increase text size. Both are forced to justify, which concentrates extra space on lines with few words.

[Article alignment](../../src/pages/blog/%5B...id%5D.astro#L238-L241)

Use start alignment in the narrow reader and keep the same font stack and content width. Verify paragraphs that include inline code and links.

## P2. Validate the TOC against late layout shifts

The mobile TOC caches section bounds built from `offsetTop`, then compares them with a document-space viewport. Open a direct section link, rotate the viewport, and wait for images or fonts to change layout. Compare the sticky section label with the section under it. Check nested sections and Intro as separate cases.

[Mobile region calculations](../../src/components/TOCHeader.astro#L150-L205)

If the label drifts, compute current document-space positions and update the cache after layout changes. Keep fragment links as ordinary anchors. Accept when the label, hash landing position and visible section agree through rotation and back/forward navigation.
