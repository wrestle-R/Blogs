import { describe, expect, it } from 'vitest'

import {
  MAX_WALLPAPER_BYTES,
  validateWallpaperCandidate,
  WALLPAPER_HEIGHT,
  WALLPAPER_WIDTH,
} from '../../src/lib/wallpapers/validation'

describe('validateWallpaperCandidate', () => {
  it('valid exact 1920x1200 under limit passes', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.webp',
      type: 'image/webp',
      size: MAX_WALLPAPER_BYTES - 1,
      width: WALLPAPER_WIDTH,
      height: WALLPAPER_HEIGHT,
    })

    expect(result).toEqual({ ok: true })
  })

  it('valid exact 1920x1200 png at exactly 15MB passes', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.png',
      type: 'image/png',
      size: MAX_WALLPAPER_BYTES,
      width: WALLPAPER_WIDTH,
      height: WALLPAPER_HEIGHT,
    })

    expect(result).toEqual({ ok: true })
  })

  it('valid exact 1920x1200 jpeg under limit passes', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.jpg',
      type: 'image/jpeg',
      size: MAX_WALLPAPER_BYTES - 1024,
      width: WALLPAPER_WIDTH,
      height: WALLPAPER_HEIGHT,
    })

    expect(result).toEqual({ ok: true })
  })

  it('wrong dimensions rejected and reason contains 1920x1200', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.png',
      type: 'image/png',
      size: 1024,
      width: 1919,
      height: WALLPAPER_HEIGHT,
    })

    expect(result.ok).toBe(false)
    expect(result.reason).toContain('1920x1200')
  })

  it('unsupported mime rejected and reason contains PNG, JPG, or WEBP', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.gif',
      type: 'image/gif',
      size: 1024,
      width: WALLPAPER_WIDTH,
      height: WALLPAPER_HEIGHT,
    })

    expect(result.ok).toBe(false)
    expect(result.reason).toContain('PNG, JPG, or WEBP')
  })

  it('oversized rejected and reason contains 15MB', () => {
    const result = validateWallpaperCandidate({
      name: 'wallpaper.jpg',
      type: 'image/jpeg',
      size: MAX_WALLPAPER_BYTES + 1,
      width: WALLPAPER_WIDTH,
      height: WALLPAPER_HEIGHT,
    })

    expect(result.ok).toBe(false)
    expect(result.reason).toContain('15MB')
  })
})
