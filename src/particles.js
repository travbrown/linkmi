/**
 * Particle animation system
 *
 * Renders gentle floating particles on a canvas behind the content.
 * Lightweight, GPU-friendly, and respects prefers-reduced-motion.
 */
export function initParticles() {
  const canvas = document.getElementById('particle-canvas')
  if (!canvas) return

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const ctx = canvas.getContext('2d')
  let particles = []
  let width, height

  function resize() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    createParticles()
  }

  function createParticles() {
    // Scale particle count to screen size, capped for performance
    const area = width * height
    const count = Math.min(Math.floor(area / 18000), 70)

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.05 + 0.02,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      // Gentle oscillation parameters
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.003 + 0.001,
      amplitude: Math.random() * 0.15 + 0.05,
    }))
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    for (const p of particles) {
      // Update oscillation
      p.phase += p.phaseSpeed

      // Move with drift + gentle sine wave
      p.x += p.vx + Math.sin(p.phase) * p.amplitude
      p.y += p.vy + Math.cos(p.phase * 0.7) * p.amplitude

      // Wrap around edges with padding
      if (p.x < -20) p.x = width + 20
      if (p.x > width + 20) p.x = -20
      if (p.y < -20) p.y = height + 20
      if (p.y > height + 20) p.y = -20

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  resize()
  animate()

  // Debounced resize handler
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 200)
  })
}
