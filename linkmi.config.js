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
      title: 'My Website',
      url: 'https://example.com',
      icon: 'globe',
    },
    {
      title: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      title: 'Read My Blog',
      url: 'https://blog.example.com',
      icon: 'pencil',
    },
    {
      title: 'Latest Project',
      url: 'https://project.example.com',
      icon: 'rocket',
    },
    {
      title: 'Get In Touch',
      url: 'mailto:hello@example.com',
      icon: 'mail',
    },
  ],

  // Social icons (displayed as a row below links)
  socials: [
    { platform: 'twitter', url: 'https://twitter.com' },
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'youtube', url: 'https://youtube.com' },
  ],

  // Theme
  theme: {
    background: '#fafafa',
    cardBackground: '#ffffff',
    textColor: '#0a0a0a',
    textSecondary: '#737373',
    borderColor: 'rgba(0, 0, 0, 0.06)',
    hoverBackground: '#f0f0f0',
    accentColor: '#0a0a0a',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  // Analytics
  analytics: {
    enabled: true,
    // Set a serverless endpoint for production analytics:
    // endpoint: '/api/track',
  },

  // SEO
  meta: {
    title: 'Travis Brown — Links',
    description: 'All my important links in one place.',
  },
}
