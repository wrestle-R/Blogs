# Interactive pages and failure states

Baseline `de1dad4`.

## P1. Collaborate silently falls back to a native form submission when unconfigured

Run locally without the public EmailJS settings and open /collaborate. Use dummy text only. The form renders a Send Message button, but the setup function returns before binding the submit listener. The markup supplies neither a delivery action nor a POST method. In local Chromium, submitting dummy data requested /collaborate with the name, email and message query keys.

[Configuration guard](../../src/pages/collaborate.astro#L195-L212) · [Submit handler](../../src/pages/collaborate.astro#L290-L312)

Expose an email link and a visible unavailable message when the form cannot deliver. Ensure that native submission cannot put message fields into a URL, including when scripts fail to load. When configured, expose pending and final feedback in an accessible live region.

**Acceptance.** With no config, users get a working contact alternative and dummy field values stay out of the address bar. With test config, mocked success and failure each produce readable feedback. The form retains the draft after a failed send.

## P2. Wallpaper cache errors can hide the fetched gallery

On /wallpapers, allow a valid manifest response and make the local cache malformed or unavailable. Local cache reads and parsing share the manifest's `try` block. A cache error leads to the full-page error and retries keep encountering the same bad cache. This is a source finding. The gallery island stayed in its initial state during the local browser probe, so it did not confirm the cache-specific behavior.

[Gallery load and retry](../../src/components/wallpapers/WallpaperGalleryClient.tsx#L59-L77)

Isolate optional cache reads and parsing. Render the remote manifest even if the cache cannot be read. Reserve the Retry view for failure to obtain usable gallery data.

**Acceptance.** A valid manifest renders with malformed, missing or blocked local storage. A failed manifest produces actionable retry feedback and a later success clears it.

## P2. Copying a form field changes what gets pasted

On /collaborate, type a dummy value into the message field. Select part of it, copy, and paste into a scratch editor. The document-wide listener handles text-control selections and adds attribution. A Chromium clipboard event returned the dummy selection with the attribution appended. The listener also trims selected whitespace, which can matter in prose and code.

[Layout copy handler](../../src/layouts/Layout.astro#L43-L76)

Limit any attribution to article prose. Leave form fields and code snippets to normal browser copy behavior.

**Acceptance.** Copy and paste a selection from a form field and a command from a post. Each retains exactly the selected text. Confirm an ordinary article paragraph follows the chosen attribution rule.
