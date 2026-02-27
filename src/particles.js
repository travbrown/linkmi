/**
 * Particle constellation system
 *
 * Colorful, glowing particles with connection lines and mouse interaction.
 * Respects prefers-reduced-motion.
 */
export function initParticles() {
  const canvas = document.getElementById('particle-canvas')
  if (!canvas) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const ctx = canvas.getContext('2d')
  let particles = []
  let width, height
  let mouseX = -1000
  let mouseY = -1000

  const COLORS = [
    { r: 0, g: 0, b: 0 },
    { r: 40, g: 40, b: 40 },
    { r: 60, g: 60, b: 60 },
    { r: 20, g: 20, b: 20 },
  ]

  const MOUSE_RADIUS = 120
  const CONNECTION_DIST = 50

  // Track mouse globally (canvas has pointer-events: none)
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  document.addEventListener('mouseleave', () => {
    mouseX = -1000
    mouseY = -1000
  })

  function resize() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    createParticles()
  }

  function createParticles() {
    const area = width * height
    const count = Math.min(Math.floor(area / 400), 3600)

    particles = Array.from({ length: count }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        color,
        opacity: Math.random() * 0.4 + 0.15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.005 + 0.002,
        amplitude: Math.random() * 0.2 + 0.08,
      }
    })
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Update and draw particles
    for (const p of particles) {
      p.phase += p.phaseSpeed

      // Base drift + gentle oscillation
      p.x += p.vx + Math.sin(p.phase) * p.amplitude
      p.y += p.vy + Math.cos(p.phase * 0.7) * p.amplitude

      // Mouse repulsion
      const dx = p.x - mouseX
      const dy = p.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
        p.x += (dx / dist) * force * 2.5
        p.y += (dy / dist) * force * 2.5
      }

      // Wrap edges seamlessly
      if (p.x < 0) p.x += width
      else if (p.x > width) p.x -= width
      if (p.y < 0) p.y += height
      else if (p.y > height) p.y -= height

      // Draw with glow
      ctx.save()
      ctx.shadowBlur = 3
      ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.5})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`
      ctx.fill()
      ctx.restore()
    }

    // Draw constellation connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.12
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  resize()
  animate()

  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 200)
  })
}
