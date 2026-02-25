import './stats-style.css'
import { getAnalytics } from './analytics.js'

function formatTime(ts) {
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function render() {
  const data = getAnalytics()
  const { pageViews, linkClicks } = data

  // --- Summary cards ---
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTs = today.getTime()

  const viewsToday = pageViews.filter((v) => v.timestamp >= todayTs).length
  const clicksToday = linkClicks.filter((c) => c.timestamp >= todayTs).length

  // Views last 7 days (today + 6 prior days)
  const weekAgo = todayTs - 6 * 86400000
  const viewsWeek = pageViews.filter((v) => v.timestamp >= weekAgo).length
  const clicksWeek = linkClicks.filter((c) => c.timestamp >= weekAgo).length

  document.getElementById('summary').innerHTML = `
    <div class="summary-card">
      <span class="summary-card__value">${pageViews.length}</span>
      <span class="summary-card__label">Total Views</span>
    </div>
    <div class="summary-card">
      <span class="summary-card__value">${linkClicks.length}</span>
      <span class="summary-card__label">Total Clicks</span>
    </div>
    <div class="summary-card">
      <span class="summary-card__value">${viewsToday}</span>
      <span class="summary-card__label">Views Today</span>
    </div>
    <div class="summary-card">
      <span class="summary-card__value">${clicksToday}</span>
      <span class="summary-card__label">Clicks Today</span>
    </div>
    <div class="summary-card">
      <span class="summary-card__value">${viewsWeek}</span>
      <span class="summary-card__label">Views (7d)</span>
    </div>
    <div class="summary-card">
      <span class="summary-card__value">${clicksWeek}</span>
      <span class="summary-card__label">Clicks (7d)</span>
    </div>
  `

  // --- Click breakdown by link (keyed by URL for accuracy) ---
  const clickCounts = {}
  const urlToTitle = {}
  for (const c of linkClicks) {
    const key = c.linkUrl
    clickCounts[key] = (clickCounts[key] || 0) + 1
    urlToTitle[key] = c.linkTitle || key
  }

  const sorted = Object.entries(clickCounts).sort((a, b) => b[1] - a[1])
  const maxClicks = sorted.length > 0 ? sorted[0][1] : 1

  if (sorted.length === 0) {
    document.getElementById('clicks-table').innerHTML =
      '<p class="stats-empty">No clicks recorded yet.</p>'
  } else {
    document.getElementById('clicks-table').innerHTML = sorted
      .map(
        ([url, count]) => `
      <div class="stats-row">
        <div class="stats-row__bar" style="width: ${(count / maxClicks) * 100}%"></div>
        <span class="stats-row__label">${urlToTitle[url]}</span>
        <span class="stats-row__value">${count}</span>
      </div>
    `
      )
      .join('')
  }

  // --- Recent activity feed ---
  const allEvents = [
    ...pageViews.map((v) => ({ ...v, _type: 'view' })),
    ...linkClicks.map((c) => ({ ...c, _type: 'click' })),
  ]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20)

  if (allEvents.length === 0) {
    document.getElementById('activity-feed').innerHTML =
      '<p class="stats-empty">No activity yet.</p>'
  } else {
    document.getElementById('activity-feed').innerHTML = allEvents
      .map(
        (e) => `
      <div class="feed-item">
        <span class="feed-item__dot feed-item__dot--${e._type}"></span>
        <span class="feed-item__text">
          ${e._type === 'view' ? 'Page view' : `Clicked "${e.linkTitle}"`}
        </span>
        <span class="feed-item__time">${formatTime(e.timestamp)}</span>
      </div>
    `
      )
      .join('')
  }

  // --- Referrers ---
  const refCounts = {}
  for (const v of pageViews) {
    const ref = v.referrer || '(direct)'
    // Simplify referrer to hostname
    let label = ref
    try {
      if (ref !== '(direct)' && ref.startsWith('http')) {
        label = new URL(ref).hostname
      }
    } catch {
      // keep as-is
    }
    refCounts[label] = (refCounts[label] || 0) + 1
  }

  const refSorted = Object.entries(refCounts).sort((a, b) => b[1] - a[1])
  const maxRef = refSorted.length > 0 ? refSorted[0][1] : 1

  if (refSorted.length === 0) {
    document.getElementById('referrers-table').innerHTML =
      '<p class="stats-empty">No referrer data yet.</p>'
  } else {
    document.getElementById('referrers-table').innerHTML = refSorted
      .map(
        ([ref, count]) => `
      <div class="stats-row">
        <div class="stats-row__bar" style="width: ${(count / maxRef) * 100}%"></div>
        <span class="stats-row__label">${ref}</span>
        <span class="stats-row__value">${count}</span>
      </div>
    `
      )
      .join('')
  }
}

// Clear data
document.getElementById('clear-btn').addEventListener('click', () => {
  if (confirm('Clear all analytics data? This cannot be undone.')) {
    localStorage.removeItem('linkmi_analytics')
    render()
  }
})

render()
