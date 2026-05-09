# Wallpapers Cloudinary Integration Design

## Summary
Build two new public pages in `Blogeshwar/Blogs`:
- `/wallpapers` to display wallpapers fetched from Cloudinary.
- `/wallpaper-upload` to upload wallpapers to Cloudinary.

This design uses the existing static Astro setup (no adapter migration) and relies on Cloudinary public delivery APIs plus client-side upload.

## Goals
- Upload all existing local wallpapers from `/home/rdp/Desktop/code/Linux/Wallpaper` to Cloudinary.
- Provide a public upload page for future wallpapers.
- Enforce exact `1920x1200` dimensions before upload.
- Show the uploaded wallpaper set on `/wallpapers`.
- Use a visually polished 21st.dev-style shadcn component pattern for the gallery cards.

## Non-Goals
- Private authentication/authorization for uploads.
- Astro server adapter migration or server-side upload validation.
- Content moderation pipeline.

## Constraints
- Route names are fixed:
  - `/wallpapers`
  - `/wallpaper-upload`
- Upload flow is public.
- Gallery must source assets from Cloudinary, not local static files.
- Use Cloudinary folder/tag isolation for this feature.

## Architecture

### Cloudinary organization
- Folder: `blogs/wallpapers`
- Tag: `blogs-wallpapers`
- Resource type: `image`

### Data sources
- Upload page posts directly to Cloudinary unsigned upload endpoint:
  - `https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`
- Gallery page fetches Cloudinary public list by tag endpoint:
  - `https://res.cloudinary.com/<cloud_name>/image/list/blogs-wallpapers.json`

### Why this architecture
- Works with current static Astro output.
- Avoids adding server runtime complexity.
- Keeps all wallpaper state in Cloudinary.

## Page Designs

### `/wallpaper-upload`
- Public upload UI with drag-and-drop and file picker.
- Allowed formats: `image/png`, `image/jpeg`, `image/webp`.
- Client-side validations per file:
  - MIME type allowed.
  - Max size (15MB).
  - Exact dimensions `1920x1200`.
- Per-file status chips:
  - `Invalid size`
  - `Uploading`
  - `Uploaded`
  - `Failed`
- Successful items show thumbnail, file name, and open link.
- CTA to open `/wallpapers` after upload.

### `/wallpapers`
- Clean hero/title matching existing blog visual language.
- Responsive card grid using a 21st.dev-inspired shadcn card pattern.
- Card content:
  - Thumbnail
  - File name/title
  - Resolution badge
- Card action opens full-size image in new tab.
- States:
  - Loading skeleton
  - Empty state
  - Error state with retry

## Validation and Security Posture
- Primary enforcement for dimensions is client-side.
- Public upload inherently allows third-party use of preset endpoint if discovered.
- Risk mitigation in scope:
  - strict file type + size gate in UI,
  - exact dimension gate before upload,
  - Cloudinary tagging/folder isolation for monitoring.

## Error Handling
- Upload page:
  - clear reason for each rejected file,
  - upload failures shown per-file without breaking the queue.
- Gallery page:
  - friendly fetch failure message,
  - retry action,
  - no raw stack traces exposed in UI.

## Implementation Units
1. Cloudinary upload/list utilities in `src/lib`.
2. Upload UI component(s) in `src/components`.
3. New page routes:
   - `src/pages/wallpaper-upload.astro`
   - `src/pages/wallpapers.astro`
4. Navigation link updates in site constants/header so pages are discoverable.
5. One-time local bulk upload script execution for existing wallpapers.

## Testing Strategy
- Local functional checks:
  - invalid dimension file is blocked,
  - valid `1920x1200` file uploads,
  - uploaded image appears on `/wallpapers` after refresh,
  - loading/empty/error UI states render correctly.
- Build verification:
  - `npm run build` passes in `Blogeshwar/Blogs`.

## Rollout Notes
- Existing local wallpaper files will be uploaded once through Cloudinary MCP.
- Future uploads happen through `/wallpaper-upload`.
- Gallery remains Cloudinary-backed for ongoing updates.
