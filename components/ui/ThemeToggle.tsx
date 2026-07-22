'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

// LinkedIn/Notion inspired light theme — direct class overrides
const LIGHT_CSS = `
/* ── Page background ── */
html.light-mode, html.light-mode body {
  background-color: #f3f2ef !important;
  color: #1c1e21 !important;
}

/* ── Navbar ── */
html.light-mode header {
  background: rgba(255,255,255,0.98) !important;
  border-bottom: 1px solid #e4e6eb !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07) !important;
}

/* ── All dark background classes ── */
html.light-mode .bg-dark-900  { background-color: #f3f2ef !important; }
html.light-mode .bg-dark-800  { background-color: #ffffff !important; border-color: #e4e6eb !important; }
html.light-mode .bg-dark-700  { background-color: #f3f2ef !important; }
html.light-mode .bg-dark-600  { background-color: #e9ebee !important; }

/* Opacity variants */
html.light-mode [class~="bg-dark-900\/80"],
html.light-mode [class~="bg-dark-900\/90"],
html.light-mode [class~="bg-dark-900\/95"],
html.light-mode [class~="bg-dark-900\/98"] { background-color: rgba(243,242,239,0.98) !important; }
html.light-mode [class~="bg-dark-800\/40"],
html.light-mode [class~="bg-dark-800\/50"],
html.light-mode [class~="bg-dark-800\/60"],
html.light-mode [class~="bg-dark-800\/80"],
html.light-mode [class~="bg-dark-800\/90"],
html.light-mode [class~="bg-dark-800\/95"],
html.light-mode [class~="bg-dark-800\/98"] { background-color: rgba(255,255,255,0.98) !important; }

/* ── Text ── */
html.light-mode .text-white { color: #1c1e21 !important; }
html.light-mode .text-gray-100 { color: #1e293b !important; }
html.light-mode .text-gray-200 { color: #334155 !important; }
html.light-mode .text-gray-300 { color: #4b5563 !important; }
html.light-mode .text-gray-400 { color: #6b7280 !important; }
html.light-mode .text-gray-500 { color: #9ca3af !important; }
html.light-mode .text-gray-600 { color: #b0b7c3 !important; }
html.light-mode .text-gray-700 { color: #c4c9d4 !important; }

/* ── Borders ── */
html.light-mode [class~="border-white/5"],
html.light-mode [class~="border-white/6"],
html.light-mode [class~="border-white/8"]  { border-color: #e9ebee !important; }
html.light-mode [class~="border-white/10"] { border-color: #dde1e8 !important; }
html.light-mode [class~="border-white/15"],
html.light-mode [class~="border-white/20"] { border-color: #d1d5db !important; }

/* ── Semi-transparent white bg used for hover states etc ── */
html.light-mode [class~="bg-white/3"],
html.light-mode [class~="bg-white/4"],
html.light-mode [class~="bg-white/5"]  { background-color: rgba(0,0,0,0.04) !important; }
html.light-mode [class~="bg-white/8"],
html.light-mode [class~="bg-white/10"] { background-color: rgba(0,0,0,0.06) !important; }

/* ── Card shadows in light ── */
html.light-mode .rounded-2xl, html.light-mode .rounded-xl {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05) !important;
}

/* ── Gradient text ── */
html.light-mode .gradient-text {
  background-image: linear-gradient(to right,#1d4ed8,#0284c7,#1d4ed8) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

/* ── Hero section ── */
html.light-mode .bg-hero-gradient,
html.light-mode .min-h-screen.bg-dark-900 {
  background: linear-gradient(135deg,#f3f2ef 0%,#dbeafe 60%,#f3f2ef 100%) !important;
}

/* ── Tagline strip ── */
html.light-mode [style*="rgba(6,182,212"] {
  background: rgba(37,99,235,0.05) !important;
  border-bottom: 1px solid #e4e6eb !important;
}

/* ── Footer ── */
html.light-mode footer {
  background-color: #ffffff !important;
  border-top: 1px solid #e4e6eb !important;
}

/* ── Sidebar ── */
html.light-mode aside {
  background-color: #ffffff !important;
  border-color: #e4e6eb !important;
}

/* ── Back button bar ── */
html.light-mode .backdrop-blur-md {
  background-color: rgba(255,255,255,0.95) !important;
  border-bottom: 1px solid #e4e6eb !important;
}

/* ── Scrollbar ── */
html.light-mode ::-webkit-scrollbar-track { background: #f3f2ef !important; }
html.light-mode ::-webkit-scrollbar-thumb { background: #c4cad4 !important; }

/* ── Transparent/dark overlays on sections ── */
html.light-mode .bg-gradient-to-t.from-dark-900 { opacity: 0 !important; }
html.light-mode [class~="from-dark-900"] { --tw-gradient-from: #f3f2ef !important; }

/* ── Accent colours stay ── */
html.light-mode .text-accent-blue { color: #2563eb !important; }
html.light-mode .bg-accent-blue { background-color: #2563eb !important; }
html.light-mode .border-accent-blue { border-color: #2563eb !important; }
`

let styleEl: HTMLStyleElement | null = null

function injectLight() {
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = 'hitech-light-theme'
    document.head.appendChild(styleEl)
  }
  styleEl.textContent = LIGHT_CSS
}

function removeLight() {
  if (styleEl) styleEl.textContent = ''
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem('hitech-theme') as 'dark' | 'light') || 'dark'
    apply(saved)
    setTheme(saved)
    setMounted(true)
  }, [])

  function apply(t: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', t)
    if (t === 'light') {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark')
      injectLight()
    } else {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark')
      removeLight()
    }
    localStorage.setItem('hitech-theme', t)
  }

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    apply(next)
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
        : <Moon className="w-4 h-4 text-slate-700" />
      }
    </button>
  )
}
