import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Blogs',
  description:
    'Personal blog and thoughts from Russel Daniel Paul and friends.',
  href: 'https://russeldanielpaul.tech',
  author: 'Russel Daniel Paul',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 5,
}

const PRIMARY_HOSTNAME = new URL(SITE.href).hostname

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/songs',
    label: 'songs',
  },
  // {
  //   href: '/movies',
  //   label: 'movies'
  // },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/collaborate',
    label: 'collaborate',
  },
  {
    href: `https://runny.${PRIMARY_HOSTNAME}`,
    label: 'runny',
  },
  {
    href: `https://${PRIMARY_HOSTNAME}`,
    label: 'website',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/wrestle-R',
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/russeldanielpaul',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:russeldanielpaul@gmail.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
}
