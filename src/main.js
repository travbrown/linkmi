import './style.css'
import config from '../linkmi.config.js'
import { getIcon, getSocialIcon } from './icons.js'
import { initParticles } from './particles.js'
import { inject } from '@vercel/analytics'

// --- Theme ---

function applyTheme(theme) {
  if (!theme) return
  const root = document.documentElement
  if (theme.background) root.style.setProperty('--bg', theme.background)
  if (theme.cardBackground) root.style.setProperty('--surface', theme.cardBackground)
  if (theme.textColor) root.style.setProperty('--text', theme.textColor)
  if (theme.textSecondary)
    root.style.setProperty('--text-secondary', theme.textSecondary)
  if (theme.borderColor) root.style.setProperty('--border', theme.borderColor)
  if (theme.accentColor) root.style.setProperty('--accent-1', theme.accentColor)
  if (theme.fontFamily) root.style.setProperty('--font-body', theme.fontFamily)
}

// --- SEO Meta ---

function applyMeta(meta) {
  if (!meta) return
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
    <div class="profile__avatar-wrapper">
      <div class="profile__avatar-ring"></div>
      <div class="profile__avatar">
        ${
          profile.avatar
            ? `<img src="${profile.avatar}" alt="${profile.name}" />`
            : `<span class="profile__initials">${initials}</span>`
        }
      </div>
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
        style="animation-delay: ${0.35 + i * 0.08}s"
      >
        <span class="link-card__icon">${getIcon(link.icon)}</span>
        <span class="link-card__title">${link.title}</span>
        <span class="link-card__arrow">${getIcon('arrow-right')}</span>
      </a>
    `
    )
    .join('')

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
        style="animation-delay: ${0.8 + i * 0.05}s"
      >
        ${getSocialIcon(social.platform)}
      </a>
    `
    )
    .join('')
}

// --- Card Interactions (cursor glow + 3D tilt) ---

function initCardInteractions() {
  const cards = document.querySelectorAll('.link-card')

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      // Cursor glow position
      card.style.setProperty('--mouse-x', `${x * 100}%`)
      card.style.setProperty('--mouse-y', `${y * 100}%`)

      // 3D tilt (only after entrance animation completes)
      if (card.classList.contains('tilt-enabled')) {
        const tiltX = (y - 0.5) * -6
        const tiltY = (x - 0.5) * 6
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`
      }
    })

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%')
      card.style.setProperty('--mouse-y', '50%')
      if (card.classList.contains('tilt-enabled')) {
        card.style.transform = ''
      }
    })
  })

  // Enable tilt after entrance animations finish
  const maxDelay = 0.35 + (cards.length - 1) * 0.08 + 0.7
  setTimeout(() => {
    cards.forEach((card) => card.classList.add('tilt-enabled'))
  }, maxDelay * 1000 + 100)
}

// --- Init ---

function init() {
  applyTheme(config.theme)
  applyMeta(config.meta)
  renderProfile(config.profile)
  renderLinks(config.links)
  renderSocials(config.socials)
  initParticles()
  initCardInteractions()
  inject()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
