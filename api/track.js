/**
 * Linkmi Analytics — Serverless Endpoint
 *
 * Receives analytics events from the client.
 * Deploy as a Vercel serverless function.
 *
 * In production, you'd store events in a database (Vercel KV, Supabase, etc.)
 * For now, this validates and logs the event.
 *
 * Usage: set `analytics.endpoint: '/api/track'` in linkmi.config.js
 */
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const event = req.body

  // Basic validation
  if (!event || !event.type || !event.timestamp) {
    return res.status(400).json({ error: 'Invalid event' })
  }

  // Log the event (replace with database write in production)
  console.log('[linkmi:analytics]', JSON.stringify(event))

  return res.status(200).json({ ok: true })
}
