import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildCloudinaryUploadUrl } from '@/lib/wallpapers/cloudinary'
import { validateWallpaperCandidate } from '@/lib/wallpapers/validation'

type UploadStatus = 'ready' | 'invalid' | 'uploading' | 'uploaded' | 'failed'

type UploadRow = {
  id: string
  file: File
  name: string
  width: number
  height: number
  status: UploadStatus
  reason?: string
  uploadedUrl?: string
  uploadedPublicId?: string
  uploadedFormat?: string
  uploadedBytes?: number
  uploadedAt?: string
}

type LocalUploadCache = {
  resources?: Array<{
    publicId?: string
    url?: string
    width?: number
    height?: number
    format?: string
    bytes?: number
    createdAt?: string
  }>
}

const LOCAL_CACHE_KEY = 'wallpaper-upload-cache-v1'

function statusVariant(status: UploadStatus): 'default' | 'muted' | 'destructive' | 'outline' {
  if (status === 'uploaded') return 'default'
  if (status === 'invalid' || status === 'failed') return 'destructive'
  if (status === 'uploading') return 'outline'
  return 'muted'
}

type UploadedWallpaper = {
  uploadedUrl: string
  uploadedPublicId: string
  uploadedFormat: string
  uploadedBytes: number
  uploadedAt: string
}

function getStoredWallpaperResources(): NonNullable<LocalUploadCache['resources']> {
  const rawCache = globalThis.localStorage.getItem(LOCAL_CACHE_KEY)
  if (!rawCache) return []

  try {
    const parsedCache = JSON.parse(rawCache) as LocalUploadCache
    return Array.isArray(parsedCache.resources) ? parsedCache.resources : []
  } catch {
    return []
  }
}

function persistUploadedWallpaper(row: UploadRow, uploaded: UploadedWallpaper) {
  const nextResources = [
    {
      publicId: uploaded.uploadedPublicId,
      url: uploaded.uploadedUrl,
      width: row.width,
      height: row.height,
      format: uploaded.uploadedFormat || row.name.split('.').pop() || 'image',
      bytes: uploaded.uploadedBytes || row.file.size,
      createdAt: uploaded.uploadedAt,
    },
    ...getStoredWallpaperResources(),
  ]

  const deduped = new Map<string, (typeof nextResources)[number]>()
  for (const item of nextResources) {
    if (item.publicId) deduped.set(item.publicId, item)
  }

  globalThis.localStorage.setItem(
    LOCAL_CACHE_KEY,
    JSON.stringify({
      resources: [...deduped.values()].slice(0, 80),
    }),
  )
}

async function uploadWallpaperRow(
  row: UploadRow,
  uploadUrl: string,
  unsignedPreset: string,
  wallpaperFolder: string,
  wallpaperTag: string,
): Promise<UploadedWallpaper | null> {
  const formData = new FormData()
  formData.append('file', row.file)
  formData.append('upload_preset', unsignedPreset)
  formData.append('folder', wallpaperFolder)
  formData.append('tags', wallpaperTag)

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  const payload = await response.json()
  const uploadedUrl = String(payload.secure_url ?? '')
  const uploadedPublicId = String(payload.public_id ?? '')

  if (!uploadedUrl || !uploadedPublicId) {
    return null
  }

  return {
    uploadedUrl,
    uploadedPublicId,
    uploadedFormat: String(payload.format ?? ''),
    uploadedBytes: Number(payload.bytes ?? 0),
    uploadedAt: String(payload.created_at ?? new Date().toISOString()),
  }
}

async function readImageSize(file: File): Promise<{ width: number; height: number }> {
  const objectUrl = URL.createObjectURL(file)

  try {
    const size = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image()

      image.onload = () => {
        resolve({ width: image.naturalWidth, height: image.naturalHeight })
      }

      image.onerror = () => {
        reject(new Error('Could not read image dimensions.'))
      }

      image.src = objectUrl
    })

    return size
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export default function WallpaperUploadClient() {
  const [items, setItems] = useState<UploadRow[]>([])
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)

  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  const unsignedPreset = import.meta.env.PUBLIC_CLOUDINARY_UNSIGNED_PRESET
  const wallpaperTag = import.meta.env.PUBLIC_CLOUDINARY_WALLPAPER_TAG
  const wallpaperFolder = import.meta.env.PUBLIC_CLOUDINARY_WALLPAPER_FOLDER
  const uploadUrl = useMemo(() => buildCloudinaryUploadUrl(cloudName), [cloudName])

  const envReady = Boolean(cloudName && unsignedPreset && wallpaperTag && wallpaperFolder)

  function updateRow(rowId: string, updater: (row: UploadRow) => UploadRow) {
    setItems((current) => current.map((item) => (item.id === rowId ? updater(item) : item)))
  }

  function markRowUploading(rowId: string) {
    updateRow(rowId, (row) => ({ ...row, status: 'uploading', reason: undefined }))
  }

  function markRowUploaded(rowId: string, uploaded: UploadedWallpaper) {
    updateRow(rowId, (row) => ({
      ...row,
      status: 'uploaded',
      uploadedUrl: uploaded.uploadedUrl,
      uploadedPublicId: uploaded.uploadedPublicId,
      uploadedFormat: uploaded.uploadedFormat,
      uploadedBytes: uploaded.uploadedBytes,
      uploadedAt: uploaded.uploadedAt,
      reason: undefined,
    }))
  }

  function markRowFailed(rowId: string) {
    updateRow(rowId, (row) => ({ ...row, status: 'failed', reason: 'Upload failed.' }))
  }

  async function prepareRows(fileList: FileList | File[]): Promise<UploadRow[]> {
    const files = Array.from(fileList)

    return Promise.all(
      files.map(async (file) => {
        const id = `${file.name}-${file.lastModified}-${crypto.randomUUID()}`

        try {
          const size = await readImageSize(file)
          const verdict = validateWallpaperCandidate({
            name: file.name,
            type: file.type,
            size: file.size,
            width: size.width,
            height: size.height,
          })

          if (!verdict.ok) {
            return {
              id,
              file,
              name: file.name,
              width: size.width,
              height: size.height,
              status: 'invalid' as const,
              reason: verdict.reason,
            }
          }

          return {
            id,
            file,
            name: file.name,
            width: size.width,
            height: size.height,
            status: 'ready' as const,
          }
        } catch {
          return {
            id,
            file,
            name: file.name,
            width: 0,
            height: 0,
            status: 'invalid' as const,
            reason: 'Could not read image dimensions.',
          }
        }
      })
    )
  }

  async function queueFiles(fileList: FileList | File[]) {
    const rows = await prepareRows(fileList)
    setItems((current) => [...rows, ...current])
  }

  async function uploadOneRow(row: UploadRow) {
    markRowUploading(row.id)

    try {
      const uploaded = await uploadWallpaperRow(
        row,
        uploadUrl,
        unsignedPreset,
        wallpaperFolder,
        wallpaperTag,
      )

      if (!uploaded) {
        markRowFailed(row.id)
        return
      }

      markRowUploaded(row.id, uploaded)
      persistUploadedWallpaper(row, uploaded)
    } catch {
      markRowFailed(row.id)
    }
  }

  async function uploadReady() {
    if (!envReady || busy) return

    const readyItems = items.filter((item) => item.status === 'ready')
    if (readyItems.length === 0) return

    setBusy(true)

    for (const row of readyItems) {
      await uploadOneRow(row)
    }

    setBusy(false)
  }

  const readyCount = items.filter((item) => item.status === 'ready').length
  const uploadedCount = items.filter((item) => item.status === 'uploaded').length

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border bg-card/90">
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg">Upload New Wallpapers</CardTitle>
          <p className="text-sm text-muted-foreground">
            Public upload to Cloudinary with strict validation: exact 1920x1200 only.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            type="button"
            className={`block w-full rounded-xl border border-dashed p-8 text-center transition ${
              dragging ? 'border-primary bg-primary/5' : 'border-border bg-card'
            }`}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              void queueFiles(event.dataTransfer.files)
            }}
            onClick={(event) => {
              event.preventDefault()
              const input = globalThis.document.getElementById('wallpaper-upload-input') as HTMLInputElement | null
              input?.click()
            }}
          >
            <p className="text-sm font-medium">Drag and drop wallpapers here</p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, WEBP only, max 15MB, exact 1920x1200
            </p>
            <span className="mt-4 inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-sm hover:bg-muted">
              Choose files
            </span>
          </button>
          <input
            id="wallpaper-upload-input"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={(event) => {
              const files = event.currentTarget.files
              if (files && files.length > 0) {
                void queueFiles(files)
              }
              event.currentTarget.value = ''
            }}
          />

          {envReady ? null : (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              Missing Cloudinary public environment variables.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={uploadReady} disabled={!envReady || busy || readyCount === 0}>
              {busy ? 'Uploading...' : `Upload Ready (${readyCount})`}
            </Button>
            <div className="flex-1" />
            <Button
              variant="outline"
              onClick={() => {
                globalThis.localStorage.removeItem(LOCAL_CACHE_KEY)
                globalThis.location.reload()
              }}
            >
              Refresh Local Cache
            </Button>
            <a
              href="/wallpapers"
              className="flex items-center justify-center rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              View Wallpapers ✨
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Queued</p>
            <p className="text-2xl font-semibold">{readyCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Uploaded</p>
            <p className="text-2xl font-semibold">{uploadedCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Files</p>
            <p className="text-2xl font-semibold">{items.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border bg-card p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.width}x{item.height}
                </p>
              </div>
              <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
            </div>

            {item.reason ? (
              <p className="mt-2 text-xs text-destructive">{item.reason}</p>
            ) : null}

            {item.uploadedUrl ? (
              <a
                className="mt-2 inline-block text-xs text-primary underline-offset-4 hover:underline"
                href={item.uploadedUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open uploaded image
              </a>
            ) : null}
          </article>
        ))}

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files selected yet.</p>
        ) : null}
      </div>
    </div>
  )
}
