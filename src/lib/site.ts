const MANAGED_SUBDOMAINS = new Set(['blogs', 'runny', 'www'])

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.localhost')
  )
}

function stripManagedSubdomain(hostname: string): string {
  const [firstLabel, ...rest] = hostname.split('.')

  if (MANAGED_SUBDOMAINS.has(firstLabel) && rest.length > 0) {
    return rest.join('.')
  }

  return hostname
}

function buildUrl(currentUrl: URL, hostname: string): URL {
  const port = currentUrl.port ? `:${currentUrl.port}` : ''
  return new URL(`${currentUrl.protocol}//${hostname}${port}`)
}

function getBaseHostname(currentUrl: URL): string {
  if (isLocalHostname(currentUrl.hostname)) {
    return currentUrl.hostname
  }

  return stripManagedSubdomain(currentUrl.hostname)
}

function withManagedSubdomain(currentUrl: URL, subdomain?: string): URL {
  const hostname = getBaseHostname(currentUrl)

  if (!subdomain) {
    return buildUrl(currentUrl, hostname)
  }

  return buildUrl(currentUrl, `${subdomain}.${hostname}`)
}

export function getSiteLinks(currentUrl: URL) {
  return {
    website: withManagedSubdomain(currentUrl),
    blog: withManagedSubdomain(currentUrl, 'blogs'),
    runny: withManagedSubdomain(currentUrl, 'runny'),
  }
}
 
export function getNavHrefMap(currentUrl: URL) {
  const siteLinks = getSiteLinks(currentUrl)

  return {
    blog: new URL('/blog', siteLinks.blog).href,
    runny: siteLinks.runny.href,
    website: siteLinks.website.href,
  }
}

export function getCanonicalUrl(currentUrl: URL): URL {
  const canonicalUrl = new URL(currentUrl.toString())
  canonicalUrl.search = ''
  canonicalUrl.hash = ''
  return canonicalUrl
}

export function getAssetUrl(currentUrl: URL, pathname: string): URL {
  return new URL(pathname, currentUrl)
}