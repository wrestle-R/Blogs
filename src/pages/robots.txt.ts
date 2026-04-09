import type { APIRoute } from 'astro'

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = ({ url }) => {
  const sitemapURL = new URL('sitemap-index.xml', url)
  return new Response(getRobotsTxt(sitemapURL))
}
