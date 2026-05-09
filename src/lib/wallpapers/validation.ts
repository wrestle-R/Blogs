import type {
  WallpaperCandidate,
  WallpaperValidationResult,
} from './types'

export const WALLPAPER_WIDTH = 1920
export const WALLPAPER_HEIGHT = 1200
export const MAX_WALLPAPER_BYTES = 15 * 1024 * 1024

const ALLOWED_WALLPAPER_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
])

export function validateWallpaperCandidate(
  candidate: WallpaperCandidate
): WallpaperValidationResult {
  if (!ALLOWED_WALLPAPER_MIME_TYPES.has(candidate.type)) {
    return { ok: false, reason: 'Only PNG, JPG, or WEBP files are allowed.' }
  }

  if (candidate.size > MAX_WALLPAPER_BYTES) {
    return { ok: false, reason: 'File size must be 15MB or less.' }
  }

  if (
    candidate.width !== WALLPAPER_WIDTH ||
    candidate.height !== WALLPAPER_HEIGHT
  ) {
    return { ok: false, reason: 'Image must be exactly 1920x1200.' }
  }

  return { ok: true }
}
