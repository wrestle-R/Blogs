/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CLOUDINARY_CLOUD_NAME: string
  readonly PUBLIC_CLOUDINARY_UNSIGNED_PRESET: string
  readonly PUBLIC_CLOUDINARY_WALLPAPER_TAG: string
  readonly PUBLIC_CLOUDINARY_WALLPAPER_FOLDER: string
  readonly PUBLIC_RUNBLOG_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
