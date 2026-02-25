/**
 * Linkmi Analytics
 *
 * Lightweight, privacy-first analytics.
 * - No cookies, no fingerprinting
 * - Stores events in localStorage for the site owner
 * - Optionally sends to a serverless endpoint for production use
 */

const STORAGE_KEY = 'linkmi_analytics'

let config = {}

function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { pageViews: [], linkClicks: [] }
  } catch {
    return { pageViews: [], linkClicks: [] }
  }
}

function saveStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // localStorage full or unavailable
  }
}

function sendToEndpoint(event) {
  if (!config.endpoint) return

  // Fire-and-forget beacon
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      config.endpoint,
      new Blob([JSON.stringify(event)], { type: 'application/json' })
    )
  } else {
    fetch(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {})
  }
}

/**
 * Initialize analytics — tracks a page view on load.
 */
export function initAnalytics(analyticsConfig = {}) {
  config = analyticsConfig

  const event = {
    type: 'pageview',
    timestamp: Date.now(),
    referrer: document.referrer || '(direct)',
    path: window.location.pathname,
  }

  const store = getStore()
  store.pageViews.push(event)

  // Cap at 1000 page views to avoid storage bloat
  if (store.pageViews.length > 1000) {
    store.pageViews = store.pageViews.slice(-1000)
  }

  saveStore(store)
  sendToEndpoint(event)
}

/**
 * Track a link click.
 */
export function trackClick(link) {
  const event = {
    type: 'click',
    timestamp: Date.now(),
    linkUrl: link.url,
    linkTitle: link.title,
  }

  const store = getStore()
  store.linkClicks.push(event)

  // Cap at 5000 click events
  if (store.linkClicks.length > 5000) {
    store.linkClicks = store.linkClicks.slice(-5000)
  }

  saveStore(store)
  sendToEndpoint(event)
}

/**
 * Get all analytics data (used by the dashboard).
 */
export function getAnalytics() {
  return getStore()
}
