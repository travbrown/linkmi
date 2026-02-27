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
      title: 'Art',
      url: 'https://www.instagram.com/xprsn__/',
      icon: 'pencil',
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
    background: '#f5f5f3',
    cardBackground: 'rgba(255, 255, 255, 0.7)',
    textColor: '#0a0a0a',
    textSecondary: 'rgba(0, 0, 0, 0.45)',
    borderColor: 'rgba(0, 0, 0, 0.06)',
    accentColor: 'rgba(0, 0, 0, 0.8)',
    fontFamily: "'Outfit', sans-serif",
  },

  // SEO
  meta: {
    title: 'Travis Brown — Links',
    description: 'All my important links in one place.',
  },
}
