const runnyBase = (import.meta.env.PUBLIC_RUNBLOG_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://127.0.0.1:3000' : 'https://runny.russel.is-a.dev')).replace(/\/$/, '')

export const SPOTIFY_API_BASE = `${runnyBase}/api/blogs/spotify`

export async function fetchSpotify(endpoint: string, init: RequestInit = {}) {
  const response = await fetch(`${SPOTIFY_API_BASE}/${endpoint}`, init)
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || data.error || 'Spotify music is temporarily unavailable.')
  return data
}

export function escapeSpotifyHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!)
}
