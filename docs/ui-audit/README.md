# Zeno UI audit

Audit of `origin/main` at `de1dad4`. The proposed changes keep the existing sticker navigation, theme, and article layout.

| Priority | Change | Why first |
| --- | --- | --- |
| P1 | Add usable archive and Home links before sticker placement runs | Readers can recover when scripts fail or are disabled. |
| P1 | Fix the Collaborate fallback | Users see a working contact option and draft field values stay out of the URL. |
| P1 | Render Back to Blogs as one anchor | The archive return has one focus stop and one role. |
| P1 | Stop the theme shortcut from consuming modifier combinations | Zeno leaves browser shortcuts and app shortcuts available. |
| P2 | Start-align narrow article text | Paragraphs and lists avoid large word gaps at phone widths. |
| P2 | Restore focus after Reset | Keyboard users can continue navigating after Reset hides. |
| P2 | Guard the optional wallpaper cache separately | A healthy manifest keeps the gallery available. |

Start with the first four changes as separate, small patches. Use the linked acceptance checks before adjusting placement or typography. Check the Home hit area and sticky TOC across more articles, fragment links and orientation changes before changing them. Keep browser chrome color and device-specific refinements for a follow-up.

## Reports

- [Navigation and sticker controls](01-navigation.md)
- [Article reading and section navigation](02-article-reader.md)
- [Theme and motion](03-theme-and-motion.md)
- [Interactive pages and failure states](04-interactions-and-fallbacks.md)
- [Reproduction and verification](05-verification.md)

## Review coverage

Gemini 3.8 Flash low, medium, and high were unavailable in the configured environment. Three OpenCode DeepSeek V4.1 Flash Free runs were requested at low, high, and max. No delegate report was available when this audit was compiled. The findings combine source review and local Chromium probes, with the evidence recorded in the reports.
