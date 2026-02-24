# Linkmi — Architecture & Design Thinking

This document captures the architectural decisions and design rationale for Linkmi. It's intended as a reference for anyone contributing to or building on the project.

## Problem Statement

Linktree (and its clones) charge $5–24/month for features that are trivially simple to implement: custom themes, analytics, link scheduling, thumbnails. The core product is a **single HTML page with links**. The essential complexity is near zero.

Linkmi exists to give all of those "premium" features away for free, as a beautiful open-source project anyone can deploy.

## Core Design Decision: Static Over Dynamic

The critical architectural fork:

| Approach | Pros | Cons |
|----------|------|------|
| **Static site** (Option A) | Simple, fast, cheap/free hosting, no server to maintain | Links updated via config + redeploy |
| **Dynamic app** (Option B) | Web admin panel, real-time updates | Auth, database, hosting costs, operational burden |

**Decision: Static site.** A link page doesn't need a server. Config-driven, deployed as static HTML. This keeps the project honest — minimal complexity for a minimal product.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Linkmi Page                    │
│                                                  │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │  Config File │  │    Static HTML/CSS/JS    │  │
│  │  (links,     │──│                          │  │
│  │   theme,     │  │  - Responsive layout     │  │
│  │   metadata)  │  │  - Theme engine          │  │
│  └─────────────┘  │  - Animation system       │  │
│                    │  - Link renderer          │  │
│                    └────────────┬─────────────┘  │
│                                 │                 │
│                    ┌────────────▼─────────────┐  │
│                    │   Analytics Module        │  │
│                    │  - Lightweight, no-cookie │  │
│                    │  - Click events           │  │
│                    │  - Referrer capture        │  │
│                    │  - Privacy-first          │  │
│                    └──────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Key Decisions & Rationale

### 1. Config-Driven Content

All links, theme settings, and metadata live in a single config file. No database. No admin panel.

**Why:** A config file is version-controlled, portable, and dead simple. It's the right abstraction for a single-user link page. If someone wants an admin UI, that's a separate project that reads/writes this config.

### 2. Mobile-First Design

The primary viewport is a phone screen in a social media app's in-app browser. Design for that first, then ensure it looks good on desktop.

**Why:** 90%+ of Linktree traffic comes from mobile (Instagram bio, TikTok bio, Twitter bio). Desktop is the edge case.

### 3. Privacy-First Analytics

No cookies. No third-party trackers. Lightweight event capture that respects visitors.

**Options to explore:**
- Self-hosted analytics endpoint (simple serverless function)
- Plausible/Umami integration (open-source analytics)
- Client-side only with localStorage (limited but zero-infra)

**Tradeoff:** The analytics piece is the only part that may need a tiny backend (a serverless function to receive click events). This is the one place where "static" breaks down slightly.

### 4. Theme System

Users should be able to fully customize appearance: colors, fonts, backgrounds, layout style, animations. All via config.

**Design goal:** Ship with 5-10 beautiful default themes. Make it trivial to create custom themes.

### 5. Everything Linktree Paywalls

The differentiator is generosity. Every feature Linktree charges for should be free in Linkmi:

- Custom themes & appearance
- Click analytics & insights
- Link scheduling (show/hide by date)
- Priority/spotlight links
- Link thumbnails & icons
- Social icons
- SEO metadata
- Animations & effects
- Email/phone collection

### 6. One-Click Deploy

Target platforms: Vercel, Netlify, Cloudflare Pages. The deploy story should be "fork, edit config, deploy" — under 5 minutes.

## What This Project Is NOT

- **Not a SaaS platform** (no multi-tenancy, no auth, no billing)
- **Not a CMS** (no admin panel, no WYSIWYG editor)
- **Not a social network** (no profiles, no discovery, no feeds)

It's a single beautiful page. Keep it that way.

## Open Questions

1. **Analytics backend:** Serverless function? Third-party integration? What's the simplest path that still gives meaningful data?
2. **Tech stack:** Plain HTML/CSS/JS? Or a lightweight framework (Astro, 11ty) for the build step?
3. **Config format:** JSON, YAML, or TOML?
4. **Email collection:** Where do collected emails go? A simple webhook? A file?

## Guiding Quotes

> *"Do one thing and do it well."* — Unix philosophy

> *"Simplicity is prerequisite for reliability."* — Tony Hoare

> *"The most dangerous thing you can do with a project this simple is make it complicated."* — Architect session notes
