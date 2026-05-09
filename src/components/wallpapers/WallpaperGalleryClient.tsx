import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { normalizeCloudinaryList } from '@/lib/wallpapers/cloudinary'
import type { WallpaperAsset } from '@/lib/wallpapers/types'

const MANIFEST_PATH = '/wallpapers-manifest.json'
const LOCAL_CACHE_KEY = 'wallpaper-upload-cache-v1'
const PAGE_SIZE = 12

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

function mergeAndDeduplicate(a: WallpaperAsset[], b: WallpaperAsset[]): WallpaperAsset[] {
  const map = new Map<string, WallpaperAsset>()

  for (const item of [...a, ...b]) {
    map.set(item.publicId || item.url, item)
  }

  return [...map.values()].sort(
    (left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt),
  )
}

function buildDownloadUrl(url: string): string {
  return url.includes('/upload/')
    ? url.replace('/upload/', '/upload/fl_attachment/')
    : url
}

export default function WallpaperGalleryClient() {
  const [items, setItems] = useState<WallpaperAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [activePublicId, setActivePublicId] = useState<string | null>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const manifestUrl = useMemo(
    () => `${MANIFEST_PATH}?t=${Date.now()}`,
    [],
  )

  async function load() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(manifestUrl, { cache: 'no-store' })
      if (!response.ok) throw new Error('Fetch failed')

      const payload = await response.json()
      const manifestItems = normalizeCloudinaryList(payload)

      let cachedItems: WallpaperAsset[] = []
      const rawCache = globalThis.localStorage.getItem(LOCAL_CACHE_KEY)
      if (rawCache) {
        const cachePayload = JSON.parse(rawCache) as LocalUploadCache
        cachedItems = normalizeCloudinaryList(cachePayload)
      }

      setItems(mergeAndDeduplicate(cachedItems, manifestItems))
    } catch {
      setError('Could not load wallpapers right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestUrl])

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const pagedItems = items.slice(start, start + PAGE_SIZE)
  const activeItem = items.find((item) => item.publicId === activePublicId) ?? null

  useEffect(() => {
    if (!activeItem) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePublicId(null)
      }
    }

    globalThis.addEventListener('keydown', onKeyDown)
    return () => {
      globalThis.removeEventListener('keydown', onKeyDown)
    }
  }, [activeItem])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => {
          const skeletonId = `skeleton-card-${index}`
          return (
            <Card key={skeletonId} className="overflow-hidden rounded-2xl">
              <div className="h-48 w-full animate-pulse bg-muted" />
              <CardContent className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          )
        })}
      </section>
    )
  }

  if (error) {
    return (
      <div className="space-y-3 rounded-2xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button
          variant="outline"
          onClick={() => {
            void load()
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">No wallpapers uploaded yet.</p>
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <style>{`
        @keyframes persistent-shine {
          0% { transform: translateX(-200%) skewX(-20deg); }
          50% { transform: translateX(300%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
        .sexy-card-hover {
          transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sexy-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -16px rgba(0, 0, 0, 0.55);
          border-color: color-mix(in oklab, currentColor 28%, transparent);
          z-index: 20;
        }
        .sexy-card-hover .sexy-shine {
          opacity: 0;
        }
        .sexy-card-hover:hover .sexy-shine {
          opacity: 1;
          animation: persistent-shine 1.3s infinite;
        }
        .sexy-card-hover img {
          transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sexy-card-hover:hover img {
          transform: scale(1.03);
        }
      `}</style>

      <div className="grid gap-4 sm:grid-cols-2">
        {pagedItems.map((item) => {
          const filename = item.publicId.split('/').pop() ?? item.publicId

          return (
            <Card
              key={item.publicId}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-card/95 sexy-card-hover"
              onMouseEnter={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
                hoverTimerRef.current = setTimeout(() => {
                  setActivePublicId(item.publicId)
                }, 1300)
              }}
              onMouseLeave={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
              }}
            >
              {/* Gradient overlay for bottom text blending */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-80" />
              
              {/* Continuous animated shine on hover */}
              <div className="sexy-shine pointer-events-none absolute inset-0 z-20 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent mix-blend-overlay" />
              
              <button
                type="button"
                onClick={() => setActivePublicId(item.publicId)}
                className="relative z-0 block w-full text-left overflow-hidden aspect-[16/10]"
              >
                <img
                  src={item.url}
                  alt={filename}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.opacity = '0.3'
                  }}
                />
              </button>

              <CardContent className="absolute bottom-0 left-0 right-0 z-30 space-y-2 p-4 pt-10">
                <div>
                  <h3 className="truncate text-base font-semibold drop-shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary">
                    {filename}
                  </h3>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          <p className="min-w-20 text-center text-sm text-muted-foreground">
            {safePage} / {totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          >
            Next
          </Button>
        </div>
      ) : null}

      {activeItem ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[84vw] rounded-xl border border-white/10 bg-card/50 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-2">
              <p className="truncate text-base font-semibold text-white/90">
                {activeItem.publicId.split('/').pop() ?? activeItem.publicId}
              </p>
              <div className="flex items-center gap-3">
                <Button asChild size="sm" variant="default" className="font-semibold shadow-md">
                  <a href={buildDownloadUrl(activeItem.url)}>Download HQ</a>
                </Button>
                <Button size="sm" variant="outline" onClick={() => setActivePublicId(null)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="flex h-[min(78vh,calc(100dvh-10rem))] justify-center overflow-hidden rounded-lg bg-black/40">
              <img
                src={activeItem.url}
                alt={activeItem.publicId}
                className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
