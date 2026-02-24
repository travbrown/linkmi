# Linkmi

**Everything Linktree charges for. Free. Open source.**

Linkmi is a beautiful, minimal link-in-bio page that gives you all the premium features other platforms hold behind a paywall — analytics, custom themes, custom domains, and more — completely free.

## Why Linkmi?

Linktree and its clones gate basic features behind $5–24/month plans. Linkmi's philosophy: **a link page is simple — the tools around it should be too.**

| Feature | Linktree Free | Linktree Pro ($9/mo) | Linkmi |
|---------|:---:|:---:|:---:|
| Unlimited links | ✅ | ✅ | ✅ |
| Custom themes & appearance | ❌ | ✅ | ✅ |
| Click analytics & insights | ❌ | ✅ | ✅ |
| Custom domains | ❌ | ✅ | ✅ |
| Link scheduling | ❌ | ✅ | ✅ |
| Priority/spotlight links | ❌ | ✅ | ✅ |
| Link thumbnails & icons | ❌ | ✅ | ✅ |
| Social icons | ❌ | ✅ | ✅ |
| SEO metadata | ❌ | ✅ | ✅ |
| Animations & effects | ❌ | ✅ | ✅ |
| Email/phone collection | ❌ | ✅ | ✅ |
| Self-hosted / own your data | ❌ | ❌ | ✅ |

## Design Principles

- **Mobile-first** — designed for the screen it's actually viewed on
- **Minimal & clean** — no clutter, no noise, just beautiful typography and spacing
- **Fast** — sub-second load times, no bloat
- **Open** — fork it, theme it, make it yours

## Architecture Overview

Linkmi is a **static site with lightweight analytics**. No heavy backend, no database server to manage.

```
┌─────────────────────────────────┐
│         Visitor Browser         │
│   hits your Linkmi page URL     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│        Static Site (HTML)       │
│  - Single page, fast render     │
│  - Config-driven links/theme    │
│  - Mobile-first responsive      │
└──────────────┬──────────────────┘
               │ click event
               ▼
┌─────────────────────────────────┐
│      Lightweight Analytics      │
│  - Click counts per link        │
│  - Referrer tracking            │
│  - Device/geo breakdown         │
│  - No cookies, privacy-first    │
└─────────────────────────────────┘
```

## Quick Start

> **Coming soon** — project is in initial setup.

```bash
# Clone the repo
git clone https://github.com/travbrown/linkmi.git
cd linkmi

# Configure your links
# Edit config file (details TBD)

# Deploy
# Instructions TBD
```

## Configuration

All links, themes, and settings are driven by a single config file — no admin panel needed, no database required. Edit, commit, deploy.

## Analytics

Privacy-first analytics built in:
- **Click tracking** — which links get tapped, when, how often
- **Referrer data** — where your visitors come from
- **Device breakdown** — mobile vs desktop split
- **No cookies** — respects visitor privacy, no consent banners needed

## Roadmap

- [ ] Core link page with config-driven content
- [ ] Theme system (custom colors, fonts, layouts)
- [ ] Click analytics dashboard
- [ ] Link thumbnails and social icons
- [ ] Link scheduling (show/hide by date)
- [ ] Priority/spotlight links with animations
- [ ] Email collection widget
- [ ] SEO metadata customization
- [ ] Custom domain support docs
- [ ] One-click deploy guides (Vercel, Netlify, Cloudflare Pages)

## License

MIT — use it, fork it, make it yours.

---

Built with taste. No subscription required.
