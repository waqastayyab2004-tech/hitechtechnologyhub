'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.1 },
  }),
}

export default function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const ql = q.toLowerCase()
    if (/course|learn|train|tutorial/.test(ql))           router.push('/training')
    else if (/blog|article|read|post/.test(ql))           router.push('/blog')
    else if (/project|portfolio|work|built/.test(ql))     router.push('/projects')
    else if (/service|consult|hire|outsource/.test(ql))   router.push('/services')
    else if (/contact|email|whatsapp|reach/.test(ql))     router.push('/contact')
    else if (/about|cv|certif|skill|experience/.test(ql)) router.push('/about')
    else if (/ai|tool|resource/.test(ql))                 router.push('/resources')
    else router.push(`/blog?q=${encodeURIComponent(q)}`)
  }

  const CHIPS = [
    { label: 'IT Courses',   href: '/training' },
    { label: 'AI Tools',     href: '/resources' },
    { label: 'Projects',     href: '/projects' },
    { label: 'Articles',     href: '/blog' },
    { label: 'Services',     href: '/services' },
    { label: 'Hire Waqas',   href: '/hire' },
  ]

  const STATS = [
    { value: '15+',   label: 'Years Experience' },
    { value: '100+',  label: 'Projects Delivered' },
    { value: '13+',   label: 'Certifications' },
    { value: '200+',  label: 'Users Managed' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-900">

      {/* ── Background glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-500/5 rounded-full blur-[80px]" />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col items-center text-center gap-6">

        {/* Status badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/25 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects — MENA &amp; Remote
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-3xl"
        >
          Enterprise IT &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">
            AI Automation
          </span>
          {' '}for Teams
        </motion.h1>

        {/* Subline */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          Senior IT consulting, cloud security &amp; AI-powered automation —
          delivered onsite across MENA and remotely worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* ── Search bar ── */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="w-full max-w-xl"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent-blue/40 to-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl group-focus-within:border-accent-blue/40 transition-colors overflow-hidden">
              <Search className="w-4 h-4 text-gray-500 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, projects, articles…"
                className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none"
              />
              <button
                type="submit"
                className="m-1.5 px-4 py-2 rounded-xl bg-accent-blue/20 hover:bg-accent-blue/40 text-accent-blue text-xs font-bold transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>
          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {CHIPS.map(c => (
              <Link
                key={c.label}
                href={c.href}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/4 border border-white/8 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-4 border-t border-white/6 w-full max-w-lg"
        >
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-[11px] text-gray-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Cert badges — minimal, single row ── */}
        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {[
            { label: 'Azure Security', color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
            { label: 'SAP AI Hub',     color: 'text-orange-400 border-orange-500/20 bg-orange-500/5' },
            { label: 'SAP S/4HANA',   color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
            { label: 'CCNA Security', color: 'text-green-400 border-green-500/20 bg-green-500/5' },
            { label: 'ITIL v3',       color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' },
            { label: 'MBA · UK',      color: 'text-pink-400 border-pink-500/20 bg-pink-500/5' },
          ].map(c => (
            <span key={c.label} className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${c.color}`}>
              {c.label}
            </span>
          ))}
        </motion.div>

      </div>

      {/* ── Profile photo + bot — clean side-by-side below fold ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-4 pb-20 flex items-end justify-center gap-12 sm:gap-20"
      >
        {/* Photo */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-accent-blue/40 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/waqas-avatar.jpg" alt="Waqas Syed" className="w-full h-full object-cover" style={{ objectPosition: 'center 5%' }} />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-white">Waqas Syed</p>
            <p className="text-[10px] text-gray-500">IT Consultant · AI Engineer</p>
          </div>
        </div>

        {/* Divider beam */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0 pb-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent-blue/40 to-transparent" />
          <span className="text-[9px] text-gray-700 font-mono uppercase tracking-widest">+AI</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
        </div>

        {/* Bot */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-400/40 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-dark-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nexus-bot.jpg" alt="NEXUS-W1 AI Bot" className="w-full h-full object-cover object-top" />
            <span className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-cyan-400 rounded-full border-2 border-dark-900 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-cyan-400">NEXUS-W1</p>
            <p className="text-[10px] text-gray-500">Waqas AI Bot</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  )
}
