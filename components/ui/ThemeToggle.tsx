'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

// Force light theme by walking the DOM and overriding inline styles
function applyLightTheme() {
  const root = document.documentElement
  root.classList.add('light-mode')
  root.classList.remove('dark')
  root.setAttribute('data-theme', 'light')

  // Override CSS custom properties on :root
  root.style.setProperty('--bg-primary',   '#f3f2ef')
  root.style.setProperty('--bg-secondary', '#ffffff')
  root.style.setProperty('--bg-tertiary',  '#f3f2ef')
  root.style.setProperty('--text-primary', '#1c1e21')
  root.style.setProperty('--border-color', '#e4e6eb')
  root.style.setProperty('--card-bg',      '#ffffff')
  root.style.setProperty('--nav-bg',       'rgba(255,255,255,0.98)')

  // Inject targeted CSS
  let el = document.getElementById('ht-light') as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = 'ht-light'
    document.head.appendChild(el)
  }
  el.textContent = `
    html.light-mode, html.light-mode body { background:#f3f2ef!important; color:#1c1e21!important; }
    html.light-mode header { background:rgba(255,255,255,0.98)!important; border-bottom:1px solid #e4e6eb!important; box-shadow:0 1px 3px rgba(0,0,0,0.07)!important; }
    html.light-mode footer { background:#ffffff!important; border-top:1px solid #e4e6eb!important; }

    /* ─ Override every dark bg Tailwind generates ─ */
    html.light-mode .bg-\\[\\#0B1220\\],
    html.light-mode .bg-dark-900 { background-color:#f3f2ef!important; }

    html.light-mode .bg-dark-800,
    html.light-mode .bg-dark-800\\/40,
    html.light-mode .bg-dark-800\\/50,
    html.light-mode .bg-dark-800\\/60,
    html.light-mode .bg-dark-800\\/80,
    html.light-mode .bg-dark-800\\/90,
    html.light-mode .bg-dark-800\\/95,
    html.light-mode .bg-dark-800\\/98 {
      background-color:#ffffff!important;
    }
    html.light-mode .bg-dark-900\\/80,
    html.light-mode .bg-dark-900\\/90,
    html.light-mode .bg-dark-900\\/95,
    html.light-mode .bg-dark-900\\/98 {
      background-color:rgba(243,242,239,0.98)!important;
    }
    html.light-mode .bg-dark-700 { background-color:#f8f9fa!important; }

    /* ─ Text ─ */
    html.light-mode .text-white { color:#1c1e21!important; }
    html.light-mode .text-gray-100,html.light-mode .text-gray-200 { color:#374151!important; }
    html.light-mode .text-gray-300,html.light-mode .text-gray-400 { color:#6b7280!important; }
    html.light-mode .text-gray-500,html.light-mode .text-gray-600,html.light-mode .text-gray-700 { color:#9ca3af!important; }

    /* ─ Borders ─ */
    html.light-mode .border-white\\/5,html.light-mode .border-white\\/6,html.light-mode .border-white\\/8 { border-color:#e9ebee!important; }
    html.light-mode .border-white\\/10,html.light-mode .border-white\\/12 { border-color:#dde1e8!important; }
    html.light-mode .border-white\\/15,html.light-mode .border-white\\/20 { border-color:#d1d5db!important; }

    /* ─ Transparent white overlays ─ */
    html.light-mode .bg-white\\/3,html.light-mode .bg-white\\/4,html.light-mode .bg-white\\/5 { background-color:rgba(0,0,0,0.04)!important; }
    html.light-mode .bg-white\\/8,html.light-mode .bg-white\\/10 { background-color:rgba(0,0,0,0.06)!important; }

    /* ─ glass-card (project/course/blog cards) ─ */
    html.light-mode .glass-card,
    html.light-mode .glass-card-hover {
      background-color:#ffffff!important;
      border-color:#e4e6eb!important;
      box-shadow:0 1px 3px rgba(0,0,0,0.09),0 1px 2px rgba(0,0,0,0.06)!important;
    }

    /* ─ Cards get shadow ─ */
    html.light-mode .rounded-2xl,html.light-mode .rounded-xl { box-shadow:0 1px 3px rgba(0,0,0,0.09),0 1px 2px rgba(0,0,0,0.06)!important; }

    /* ─ Gradient text ─ */
    html.light-mode .gradient-text { background-image:linear-gradient(to right,#1d4ed8,#0284c7,#1d4ed8)!important; -webkit-background-clip:text!important; background-clip:text!important; -webkit-text-fill-color:transparent!important; }

    /* ─ Hero ─ */
    html.light-mode section.relative.min-h-screen { background:#f3f2ef!important; }
    html.light-mode .bg-dark-900.min-h-screen,html.light-mode .min-h-screen.bg-dark-900 { background:#f3f2ef!important; }

    /* ─ Backdrop blur panels ─ */
    html.light-mode .backdrop-blur-xl,html.light-mode .backdrop-blur-md,html.light-mode .backdrop-blur-sm { background-color:rgba(255,255,255,0.95)!important; }
  `
}

function applyDarkTheme() {
  const root = document.documentElement
  root.classList.remove('light-mode')
  root.classList.add('dark')
  root.setAttribute('data-theme', 'dark')

  // Remove all inline overrides
  root.style.removeProperty('--bg-primary')
  root.style.removeProperty('--bg-secondary')
  root.style.removeProperty('--bg-tertiary')
  root.style.removeProperty('--text-primary')
  root.style.removeProperty('--border-color')
  root.style.removeProperty('--card-bg')
  root.style.removeProperty('--nav-bg')

  const el = document.getElementById('ht-light')
  if (el) el.textContent = ''
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem('hitech-theme') as 'dark' | 'light') || 'dark'
    saved === 'light' ? applyLightTheme() : applyDarkTheme()
    setTheme(saved)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    next === 'light' ? applyLightTheme() : applyDarkTheme()
    localStorage.setItem('hitech-theme', next)
    setTheme(next)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark'
        ? <Sun className="w-4 h-4 text-yellow-400" />
        : <Moon className="w-4 h-4" style={{color:'#374151'}} />
      }
    </button>
  )
}
