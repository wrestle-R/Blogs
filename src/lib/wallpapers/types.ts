export interface WallpaperCandidate {
  name: string
  type: string
  size: number
  width: number
  height: number
}

export interface WallpaperValidationResult {
  ok: boolean
  reason?: string
}

export interface CloudinaryListResource {
  public_id?: string
  secure_url?: string
  width?: number
  height?: number
  format?: string
  bytes?: number
  created_at?: string
}

export interface CloudinaryListPayload {
  resources?: CloudinaryListResource[]
}

export interface WallpaperAsset {
  publicId: string
  url: string
  width: number
  height: number
  format: string
  bytes: number
  createdAt: string
}
