/**
 * Linkmi Configuration
 *
 * Edit this file to customize your link page.
 * Then deploy to Vercel, Netlify, or Cloudflare Pages.
 */
export default {
  // Profile
  profile: {
    name: 'Travis Brown',
    bio: 'Developer & Creator',
    avatar: '', // URL to avatar image (leave empty for initials)
  },

  // Links (displayed in order)
  links: [
    {
      title: 'REBUILD-JA',
      url: 'https://www.rebuild-ja.com/',
      icon: 'globe',
    },
    {
      title: 'Art IG',
      url: 'https://www.instagram.com/xprsn__/',
      icon: 'pencil',
    },
    {
      title: 'Artistic Portfolio',
      url: 'https://xprsv.vercel.app/',
      icon: 'star',
    },
    {
      title: 'Executive Rentals',
      url: 'https://www.instagram.com/serenehaven.ja/',
      icon: 'link',
    },
  ],

  // Social icons (displayed as a row above links)
  socials: [
    { platform: 'github', url: 'https://github.com/travbrown' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/xprsn/' },
    { platform: 'instagram', url: 'https://www.instagram.com/travxtech/' },
  ],

  // Theme
  theme: {
    background: '#0a0a0a',
    cardBackground: 'rgba(255, 255, 255, 0.07)',
    textColor: '#f5f5f3',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    accentColor: 'rgba(255, 255, 255, 0.8)',
    fontFamily: "'Outfit', sans-serif",
  },

  // SEO
  meta: {
    title: 'Travis Brown — Links',
    description: 'All my important links in one place.',
  },
}
