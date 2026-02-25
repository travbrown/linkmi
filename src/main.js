import './style.css'
import config from '../linkmi.config.js'
import { getIcon, getSocialIcon } from './icons.js'
import { initParticles } from './particles.js'
import { initAnalytics, trackClick } from './analytics.js'

// --- Theme ---

function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--bg', theme.background)
  root.style.setProperty('--card-bg', theme.cardBackground)
  root.style.setProperty('--text', theme.textColor)
  root.style.setProperty('--text-secondary', theme.textSecondary)
  root.style.setProperty('--border', theme.borderColor)
  root.style.setProperty('--hover-bg', theme.hoverBackground)
  root.style.setProperty('--accent', theme.accentColor)
  root.style.setProperty('--font', theme.fontFamily)
}

// --- SEO Meta ---

function applyMeta(meta) {
  if (meta.title) document.title = meta.title

  let desc = document.querySelector('meta[name="description"]')
  if (!desc) {
    desc = document.createElement('meta')
    desc.name = 'description'
    document.head.appendChild(desc)
  }
  desc.content = meta.description || ''
}

// --- Profile ---

function renderProfile(profile) {
  const el = document.getElementById('profile')
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  el.innerHTML = `
    <div class="profile__avatar">
      ${
        profile.avatar
          ? `<img src="${profile.avatar}" alt="${profile.name}" />`
          : `<span class="profile__initials">${initials}</span>`
      }
    </div>
    <h1 class="profile__name">${profile.name}</h1>
    ${profile.bio ? `<p class="profile__bio">${profile.bio}</p>` : ''}
  `
}

// --- Links ---

function renderLinks(links) {
  const el = document.getElementById('links')

  el.innerHTML = links
    .map(
      (link, i) => `
      <a
        href="${link.url}"
        class="link-card"
        target="_blank"
        rel="noopener noreferrer"
        data-index="${i}"
        style="animation-delay: ${0.1 + i * 0.06}s"
      >
        <span class="link-card__icon">${getIcon(link.icon)}</span>
        <span class="link-card__title">${link.title}</span>
        <span class="link-card__arrow">${getIcon('arrow-right')}</span>
      </a>
    `
    )
    .join('')

  // Attach click tracking
  el.querySelectorAll('.link-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index, 10)
      trackClick(links[idx])
    })
  })
}

// --- Socials ---

function renderSocials(socials) {
  if (!socials || socials.length === 0) return

  const el = document.getElementById('socials')
  el.innerHTML = socials
    .map(
      (social, i) => `
      <a
        href="${social.url}"
        class="social-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${social.platform}"
        style="animation-delay: ${0.4 + i * 0.05}s"
      >
        ${getSocialIcon(social.platform)}
      </a>
    `
    )
    .join('')
}

// --- Init ---

function init() {
  applyTheme(config.theme)
  applyMeta(config.meta)
  renderProfile(config.profile)
  renderLinks(config.links)
  renderSocials(config.socials)
  initParticles()

  if (config.analytics?.enabled) {
    initAnalytics(config.analytics)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
