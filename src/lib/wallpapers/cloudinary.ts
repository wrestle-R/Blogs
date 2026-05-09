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

export function buildCloudinaryUploadUrl(cloudName: string): string {
  return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
}

export function buildCloudinaryTagListUrl(cloudName: string, tag: string): string {
  return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
}

function isValidResource(resource: CloudinaryListResource): resource is Required<CloudinaryListResource> {
  return (
    typeof resource.public_id === 'string' &&
    typeof resource.secure_url === 'string' &&
    typeof resource.width === 'number' &&
    typeof resource.height === 'number' &&
    typeof resource.format === 'string' &&
    typeof resource.bytes === 'number' &&
    typeof resource.created_at === 'string' &&
    Number.isFinite(Date.parse(resource.created_at))
  )
}

export function normalizeCloudinaryList(payload: CloudinaryListPayload): WallpaperAsset[] {
  const resources = Array.isArray(payload.resources) ? payload.resources : []

  return resources
    .filter(isValidResource)
    .map((resource) => ({
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      bytes: resource.bytes,
      createdAt: resource.created_at,
    }))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}
