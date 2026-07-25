'use client'

import { useEffect, useRef } from 'react'

/* Each bot has a type (shape variant), position, speed, and colour */
interface Bot {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  type: number        // 0–4 different bot designs
  legPhase: number    // animation phase offset
  armPhase: number
}

const COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#10b981', // green
  '#f59e0b', // amber
  '#ec4899', // pink
]

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function makeBots(count: number, w: number, h: number): Bot[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, w),
    y: randomBetween(0, h),
    vx: randomBetween(-0.3, 0.3) || 0.15,
    vy: randomBetween(-0.15, 0.15),
    size: randomBetween(22, 38),
    color: COLORS[i % COLORS.length],
    type: i % 5,
    legPhase: randomBetween(0, Math.PI * 2),
    armPhase: randomBetween(0, Math.PI * 2),
  }))
}

function drawBot(ctx: CanvasRenderingContext2D, bot: Bot, t: number) {
  const { x, y, size: s, color, type, legPhase, armPhase } = bot
  const legSwing = Math.sin(t * 2 + legPhase) * 12
  const armSwing = Math.sin(t * 2 + armPhase) * 8
  const bodyBob  = Math.sin(t * 2 + legPhase) * 1.5

  ctx.save()
  ctx.translate(x, y + bodyBob)
  ctx.strokeStyle = color
  ctx.fillStyle   = color
  ctx.lineWidth   = 1.5
  ctx.lineCap     = 'round'
  ctx.lineJoin    = 'round'
  ctx.globalAlpha = 0.55

  const hw = s * 0.38  // half head width
  const hh = s * 0.32  // half head height

  if (type === 0) {
    // ── Classic box bot ──
    // head
    ctx.strokeRect(-hw, -s * 0.9, hw * 2, hh * 2)
    // eyes
    ctx.fillRect(-hw * 0.55, -s * 0.75, s * 0.1, s * 0.1)
    ctx.fillRect( hw * 0.2,  -s * 0.75, s * 0.1, s * 0.1)
    // antenna
    ctx.beginPath(); ctx.moveTo(0, -s * 0.9); ctx.lineTo(0, -s * 1.15)
    ctx.arc(0, -s * 1.18, s * 0.04, 0, Math.PI * 2); ctx.stroke()
    // neck
    ctx.beginPath(); ctx.moveTo(0, -s * 0.26); ctx.lineTo(0, -s * 0.1); ctx.stroke()
    // body
    ctx.strokeRect(-hw * 1.2, -s * 0.1, hw * 2.4, s * 0.55)
    // arms
    ctx.save(); ctx.rotate((armSwing * Math.PI) / 180)
    ctx.beginPath(); ctx.moveTo(-hw * 1.2, 0); ctx.lineTo(-hw * 2, s * 0.3); ctx.stroke()
    ctx.restore()
    ctx.save(); ctx.rotate((-armSwing * Math.PI) / 180)
    ctx.beginPath(); ctx.moveTo(hw * 1.2, 0); ctx.lineTo(hw * 2, s * 0.3); ctx.stroke()
    ctx.restore()
    // legs
    ctx.beginPath(); ctx.moveTo(-hw * 0.4, s * 0.45); ctx.lineTo(-hw * 0.4 + (legSwing * Math.PI) / 180, s * 0.85); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.4, s * 0.45); ctx.lineTo( hw * 0.4 - (legSwing * Math.PI) / 180, s * 0.85); ctx.stroke()

  } else if (type === 1) {
    // ── Round-head bot ──
    ctx.beginPath(); ctx.arc(0, -s * 0.72, hw, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath(); ctx.arc(-hw * 0.35, -s * 0.78, s * 0.06, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc( hw * 0.35, -s * 0.78, s * 0.06, 0, Math.PI * 2); ctx.fill()
    // smile
    ctx.beginPath(); ctx.arc(0, -s * 0.65, hw * 0.4, 0.2, Math.PI - 0.2); ctx.stroke()
    // antenna
    ctx.beginPath(); ctx.moveTo(0, -s * 0.72 - hw); ctx.lineTo(0, -s * 1.1)
    ctx.beginPath(); ctx.arc(0, -s * 1.13, s * 0.05, 0, Math.PI * 2); ctx.fill()
    ctx.stroke()
    // body (trapezoid)
    ctx.beginPath()
    ctx.moveTo(-hw * 0.9, -s * 0.1); ctx.lineTo(-hw * 1.3, s * 0.45)
    ctx.lineTo(hw * 1.3, s * 0.45);  ctx.lineTo(hw * 0.9, -s * 0.1)
    ctx.closePath(); ctx.stroke()
    // arms
    ctx.beginPath(); ctx.moveTo(-hw * 0.9, s * 0.05); ctx.lineTo(-hw * 2.1, s * 0.3 + (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.9, s * 0.05); ctx.lineTo( hw * 2.1, s * 0.3 - (armSwing * Math.PI) / 180); ctx.stroke()
    // legs
    ctx.beginPath(); ctx.moveTo(-hw * 0.5, s * 0.45); ctx.lineTo(-hw * 0.7, s * 0.85 + (legSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.5, s * 0.45); ctx.lineTo( hw * 0.7, s * 0.85 - (legSwing * Math.PI) / 180); ctx.stroke()

  } else if (type === 2) {
    // ── Visor bot ──
    ctx.strokeRect(-hw * 1.1, -s * 0.95, hw * 2.2, hh * 1.8)
    // visor bar
    ctx.fillStyle = color; ctx.globalAlpha = 0.25
    ctx.fillRect(-hw * 0.9, -s * 0.82, hw * 1.8, s * 0.18)
    ctx.globalAlpha = 0.55
    ctx.strokeStyle = color
    // chest
    ctx.strokeRect(-hw * 1.3, -s * 0.1, hw * 2.6, s * 0.6)
    // chest circle
    ctx.beginPath(); ctx.arc(0, s * 0.2, s * 0.12, 0, Math.PI * 2); ctx.stroke()
    // arms
    ctx.beginPath(); ctx.moveTo(-hw * 1.3, s * 0.1); ctx.lineTo(-hw * 2.2, s * 0.35 + (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 1.3, s * 0.1); ctx.lineTo( hw * 2.2, s * 0.35 - (armSwing * Math.PI) / 180); ctx.stroke()
    // legs
    ctx.beginPath(); ctx.moveTo(-hw * 0.5, s * 0.5); ctx.lineTo(-hw * 0.8, s * 0.9 + (legSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.5, s * 0.5); ctx.lineTo( hw * 0.8, s * 0.9 - (legSwing * Math.PI) / 180); ctx.stroke()

  } else if (type === 3) {
    // ── Tiny helper bot (smaller, scurrying) ──
    const sc = 0.75
    ctx.scale(sc, sc)
    ctx.strokeRect(-hw, -s * 0.9, hw * 2, hh * 1.6)
    ctx.beginPath(); ctx.arc(-hw * 0.4, -s * 0.68, s * 0.08, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc( hw * 0.4, -s * 0.68, s * 0.08, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.moveTo(0, -s * 0.9); ctx.lineTo(hw * 0.5, -s * 1.1); ctx.lineTo(hw * 0.5, -s * 1.2); ctx.stroke()
    ctx.strokeRect(-hw * 1.1, -s * 0.08, hw * 2.2, s * 0.5)
    ctx.beginPath(); ctx.moveTo(-hw * 1.1, s * 0.1); ctx.lineTo(-hw * 1.9, s * 0.3 + (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 1.1, s * 0.1); ctx.lineTo( hw * 1.9, s * 0.3 - (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-hw * 0.4, s * 0.42); ctx.lineTo(-hw * 0.6, s * 0.8 + (legSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.4, s * 0.42); ctx.lineTo( hw * 0.6, s * 0.8 - (legSwing * Math.PI) / 180); ctx.stroke()

  } else {
    // ── Tall industrial bot ──
    ctx.strokeRect(-hw * 0.9, -s * 1.05, hw * 1.8, hh * 1.5)
    ctx.fillRect(-hw * 0.35, -s * 0.9, s * 0.14, s * 0.14)
    ctx.fillRect( hw * 0.05, -s * 0.9, s * 0.14, s * 0.14)
    ctx.beginPath(); ctx.moveTo(-hw * 0.3, -s * 0.72); ctx.lineTo(hw * 0.3, -s * 0.72); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, -s * 1.05); ctx.lineTo(0, -s * 1.25); ctx.stroke()
    ctx.beginPath(); ctx.arc(0, -s * 1.28, s * 0.06, 0, Math.PI * 2); ctx.fill()
    ctx.strokeRect(-hw * 1.1, -s * 0.12, hw * 2.2, s * 0.65)
    ctx.strokeRect(-hw * 0.6, s * 0.1, hw * 1.2, s * 0.22)
    ctx.beginPath(); ctx.moveTo(-hw * 1.1, 0); ctx.lineTo(-hw * 2, s * 0.28 + (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 1.1, 0); ctx.lineTo( hw * 2, s * 0.28 - (armSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-hw * 0.45, s * 0.53); ctx.lineTo(-hw * 0.6, s * 0.95 + (legSwing * Math.PI) / 180); ctx.stroke()
    ctx.beginPath(); ctx.moveTo( hw * 0.45, s * 0.53); ctx.lineTo( hw * 0.6, s * 0.95 - (legSwing * Math.PI) / 180); ctx.stroke()
  }

  ctx.restore()
}

/* Thin connection line between nearby bots */
function drawConnections(ctx: CanvasRenderingContext2D, bots: Bot[]) {
  for (let i = 0; i < bots.length; i++) {
    for (let j = i + 1; j < bots.length; j++) {
      const dx = bots[i].x - bots[j].x
      const dy = bots[i].y - bots[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 140) {
        ctx.save()
        ctx.globalAlpha = (1 - dist / 140) * 0.12
        ctx.strokeStyle = bots[i].color
        ctx.lineWidth = 0.8
        ctx.setLineDash([3, 5])
        ctx.beginPath()
        ctx.moveTo(bots[i].x, bots[i].y)
        ctx.lineTo(bots[j].x, bots[j].y)
        ctx.stroke()
        ctx.restore()
      }
    }
  }
}

export default function RobotCommunity({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const botsRef   = useRef<Bot[]>([])
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      botsRef.current = makeBots(18, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let startTime = performance.now()

    const loop = (now: number) => {
      const t = (now - startTime) / 1000
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // Update positions
      botsRef.current.forEach(b => {
        b.x += b.vx
        b.y += b.vy
        // wrap around edges
        if (b.x < -50)  b.x = w + 50
        if (b.x > w + 50) b.x = -50
        if (b.y < -50)  b.y = h + 50
        if (b.y > h + 50) b.y = -50
      })

      // Draw connections first (behind bots)
      drawConnections(ctx, botsRef.current)

      // Draw each bot
      botsRef.current.forEach(b => drawBot(ctx, b, t))

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
