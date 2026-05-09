import { describe, expect, it } from 'vitest'

import {
  buildCloudinaryTagListUrl,
  buildCloudinaryUploadUrl,
  normalizeCloudinaryList,
} from '../../src/lib/wallpapers/cloudinary'

describe('cloudinary helpers', () => {
  it("buildCloudinaryUploadUrl('demo-cloud') returns upload endpoint", () => {
    expect(buildCloudinaryUploadUrl('demo-cloud')).toBe(
      'https://api.cloudinary.com/v1_1/demo-cloud/image/upload'
    )
  })

  it("buildCloudinaryTagListUrl('demo-cloud', 'blogs-wallpapers') returns list endpoint", () => {
    expect(buildCloudinaryTagListUrl('demo-cloud', 'blogs-wallpapers')).toBe(
      'https://res.cloudinary.com/demo-cloud/image/list/blogs-wallpapers.json'
    )
  })

  it('normalizeCloudinaryList with one good resource returns one normalized object preserving width/height/publicId', () => {
    const normalized = normalizeCloudinaryList({
      resources: [
        {
          public_id: 'blogs/wallpapers/one',
          secure_url: 'https://res.cloudinary.com/demo/image/upload/v1/one.png',
          width: 1920,
          height: 1200,
          format: 'png',
          bytes: 1234,
          created_at: '2026-05-09T10:20:30Z',
        },
      ],
    })

    expect(normalized).toHaveLength(1)
    expect(normalized[0].publicId).toBe('blogs/wallpapers/one')
    expect(normalized[0].width).toBe(1920)
    expect(normalized[0].height).toBe(1200)
  })

  it('normalizeCloudinaryList drops malformed resources safely to []', () => {
    const normalized = normalizeCloudinaryList({
      resources: [
        {
          public_id: 'only-public-id-no-url',
        },
      ],
    })

    expect(normalized).toEqual([])
  })
})
