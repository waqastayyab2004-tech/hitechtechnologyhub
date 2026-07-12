'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

/* ── Ticker items ──────────────────────────────────────────────── */
const TICKER = [
  '🚀 AI Automation · Built 4 live enterprise AI tools',
  '🛡️ Azure Security Engineer · Certified 2024',
  '📦 IT Asset Manager · 1,500–2,000+ devices tracked',
  '🎫 ServiceNow · 96%+ SLA compliance · 1,000+ tickets/yr',
  '☁️ M365 Admin · 200+ users · 3 offices · Riyadh KSA',
  '🤖 Claude AI · MCP integration · natural language IT ops',
  '🌐 Next.js Website · Live on Cloudflare · 1M+ community',
  '⚙️ Daily IT Ops · 10 domains · endpoint to network',
]

/* ── Nav items matching actual site ───────────────────────────── */
const NAV = [
  { label: 'Services',  href: '/services' },
  { label: 'Work',      href: '/projects' },
  { label: 'Learn',     href: '/training' },
  { label: 'Articles',  href: '/blog' },
  { label: 'Portfolio', href: '/about' },
]

/* ── Site sections — what each page does ─────────────────────── */
const SECTIONS = [
  {
    emoji: '💼', title: 'IT Services',       href: '/services',
    color: '#3b82f6', badge: 'Hire Me',
    desc: 'L1–L3 support, Azure Security, M365 admin, ServiceNow ITSM, AI automation, and IT Asset Management — onsite across MENA or remote worldwide.',
    tags: ['Cisco · Aruba', 'Intune/Autopilot', 'Azure AD', 'ServiceNow', 'M365 Admin', 'AI Automation'],
  },
  {
    emoji: '🗂️', title: 'Projects',          href: '/projects',
    color: '#8b5cf6', badge: '34 Projects',
    desc: '34 real enterprise projects with full PMP documentation — scope, outcomes, tools, and SLAs. From Zero Trust rollouts to AI dashboards.',
    tags: ['Daily IT Ops', 'Enterprise Rollouts', 'AI Tools Built', 'ITSM Implementations'],
  },
  {
    emoji: '🎓', title: 'IT Learning',        href: '/training',
    color: '#10b981', badge: '12 Free Courses',
    desc: 'Free IT courses for beginners through seniors — AI tools, cybersecurity, M365, ServiceNow, IT career roadmap, and more.',
    tags: ['AI for IT Pros', 'Azure Security', 'ServiceNow Basics', 'IT Career Roadmap'],
  },
  {
    emoji: '📰', title: 'Articles',           href: '/blog',
    color: '#f59e0b', badge: '18 Articles',
    desc: 'Practical IT and AI articles written from 15+ years of real enterprise experience — no fluff, no theory.',
    tags: ['AI & Automation', 'Cybersecurity', 'Cloud & M365', 'IT Career Tips'],
  },
  {
    emoji: '⚙️', title: 'Daily IT Ops',       href: '/projects#daily-operations',
    color: '#22d3ee', badge: '10 Areas',
    desc: 'A deep look at 10 technical areas I manage daily — MDM, endpoint security, M365 admin, provisioning, network, AV and more.',
    tags: ['Jamf MDM', 'Intune', 'Exchange Online', 'Cisco/Aruba', 'Teams Rooms'],
  },
  {
    emoji: '👤', title: 'Portfolio',           href: '/about',
    color: '#ec4899', badge: 'Full CV',
    desc: '15+ years of experience, 13 certifications, full work history, interactive skill map, and downloadable CV.',
    tags: ['Azure Security Cert', 'SAP AI Hub', 'MBA · UK', 'ITIL v3', 'PMP'],
  },
]

/* ── Key stats ────────────────────────────────────────────────── */
const STATS = [
  { val: '15+',  label: 'Years in IT',         color: '#3b82f6' },
  { val: '34',   label: 'Projects Delivered',   color: '#8b5cf6' },
  { val: '13+',  label: 'Certifications',        color: '#10b981' },
  { val: '200+', label: 'Users Supported',       color: '#f59e0b' },
  { val: '1M+',  label: 'Community Followers',   color: '#ec4899' },
  { val: '0',    label: 'SLA Breaches (6 mo)',   color: '#22d3ee' },
]

/* ── Who this site is for ─────────────────────────────────────── */
const AUDIENCES = [
  {
    icon: '🏢', title: 'Hiring Managers & Recruiters',
    desc: 'Looking for a senior IT or AI engineer for a full-time role in MENA or remote? View the full portfolio, download the CV, and contact directly.',
    cta: 'View Portfolio', href: '/about', color: '#3b82f6',
  },
  {
    icon: '💡', title: 'Businesses & IT Managers',
    desc: 'Need IT consulting, M365 administration, ServiceNow setup, or AI automation? Outsource to a certified enterprise IT specialist.',
    cta: 'View Services', href: '/services', color: '#8b5cf6',
  },
  {
    icon: '📚', title: 'IT Professionals & Students',
    desc: 'Learning IT, AI, Azure, or ServiceNow? Access 12 free courses, 18 articles, and real enterprise project documentation.',
    cta: 'Start Learning', href: '/training', color: '#10b981',
  },
]

/* ── Certs strip ──────────────────────────────────────────────── */
const CERTS = [
  { label: 'Azure Security Engineer', color: '#3b82f6' },
  { label: 'SAP Gen AI Hub (AIG02)',   color: '#f97316' },
  { label: 'SAP Python ML',            color: '#f97316' },
  { label: 'SAP S/4HANA Admin',        color: '#f97316' },
  { label: 'ITIL v3 Foundation',       color: '#06b6d4' },
  { label: 'PMP — 35 PDUs',            color: '#f59e0b' },
  { label: 'CCNA Security',            color: '#10b981' },
  { label: 'MBA · UK',                 color: '#ec4899' },
]

export default function HomePreviewPage() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(n => (n + 1) % TICKER.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 text-white">

      {/* ── PREVIEW BANNER ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-yellow-500 text-black text-center py-2 px-4 text-sm font-black tracking-wide">
        👁️ PREVIEW ONLY — This is the new Home page design. Not live yet.&nbsp;
        <Link href="/" className="underline font-black">View current Home →</Link>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

            {/* LEFT */}
            <div className="flex flex-col justify-center">

              {/* Status pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Open to Work · MENA + Remote
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Available for IT Consulting
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                <span className="text-white">Syed </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">Waqas Tayyab</span>
              </h1>
              <p className="text-xl font-bold text-blue-400 mb-1">Senior IT System Engineer · IT Service Delivery Lead</p>
              <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                📍 Riyadh, Saudi Arabia · SAP · 15+ Years · Iqama Transferable
              </p>

              {/* Summary */}
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
                Enterprise IT expert specialising in <span className="text-white font-semibold">AI automation</span>, <span className="text-white font-semibold">Azure security</span>, <span className="text-white font-semibold">Microsoft 365</span>, <span className="text-white font-semibold">ServiceNow ITSM</span>, and <span className="text-white font-semibold">endpoint management</span>.
                I build tools that save hours daily, run IT for 200+ users across 3 offices, and share everything I learn through free courses and articles.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
                {STATS.map(s => (
                  <div key={s.label} className="glass-card p-3 text-center rounded-xl border border-white/8">
                    <div className="text-lg font-black" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-gray-500 text-[9px] leading-tight mt-0.5 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/about" className="btn-primary px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
                  👤 View Portfolio
                </Link>
                <Link href="/services" className="btn-outline px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  💼 Hire / Outsource IT
                </Link>
                <Link href="/training" className="px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                  🎓 Free IT Courses
                </Link>
                <a href="/Waqas-Syed-CV.pdf" download className="px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10 transition-all">
                  📄 Download CV
                </a>
              </div>

              {/* Quick contact */}
              <div className="flex flex-wrap gap-2">
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="mailto:waqastayyab2004@gmail.com"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  Email
                </a>
              </div>
            </div>

            {/* RIGHT — Photo + certifications */}
            <div className="hidden lg:flex flex-col items-center gap-8">
              {/* Photo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-[50px] opacity-40"
                  style={{ background: 'radial-gradient(circle, #3b82f6, #8b5cf6)' }} />
                <div className="relative w-72 h-72 rounded-full p-[3px]"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)' }}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-dark-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/waqas-pro.jpg" alt="Syed Waqas Tayyab"
                      className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
                  style={{ background: 'rgba(8,14,24,0.95)', border: '1px solid rgba(59,130,246,0.5)' }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs font-semibold">Available for Projects</span>
                </div>
              </div>

              {/* Cert badges */}
              <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                {CERTS.map(c => (
                  <span key={c.label} className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                    style={{ background: `${c.color}15`, borderColor: `${c.color}35`, color: c.color }}>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Live ticker */}
        <div className="relative z-10 max-w-7xl mx-auto mt-4">
          <div className="glass-card px-5 py-3 rounded-xl border border-white/8 flex items-center gap-4 overflow-hidden">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex-shrink-0">LIVE</span>
            <div className="flex-1 overflow-hidden">
              <p key={tick} className="text-sm text-gray-300 font-medium truncate animate-pulse">
                {TICKER[tick]}
              </p>
            </div>
            <span className="text-[10px] text-gray-600 flex-shrink-0 font-mono">{tick + 1}/{TICKER.length}</span>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS SITE IS ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3">What is HiTecH Technology HUB?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              One Platform. Three Purposes.
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
              A personal brand built on 15+ years of real enterprise IT at SAP —
              available to hire, available to consult, and sharing everything freely with the community.
            </p>
          </div>

          {/* Three audience cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {AUDIENCES.map(a => (
              <div key={a.title} className="glass-card p-7 flex flex-col gap-4 border border-white/8 hover:-translate-y-1 transition-all duration-200">
                <div className="text-5xl">{a.icon}</div>
                <div>
                  <h3 className="text-white font-black text-lg mb-2">{a.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
                <Link href={a.href}
                  className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all hover:scale-105"
                  style={{ background: `${a.color}15`, borderColor: `${a.color}40`, color: a.color }}>
                  {a.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Site sections grid */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Explore the Site</h2>
            <p className="text-gray-500 text-sm">Every section has real content — no filler, no placeholders</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTIONS.map(s => (
              <Link key={s.title} href={s.href}
                className="glass-card p-6 flex flex-col gap-4 border border-white/8 hover:-translate-y-1 transition-all duration-200 group"
                style={{ borderTopWidth: 2, borderTopColor: `${s.color}50` }}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
                    style={{ background: `${s.color}12`, borderColor: `${s.color}35`, color: s.color }}>
                    {s.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-black text-base mb-1.5 group-hover:text-blue-400 transition-colors">{s.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] bg-white/5 border border-white/8 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                  Explore {s.title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT WAQAS STRIP ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, transparent 50%, rgba(139,92,246,0.04) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-white/8">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/waqas-pro.jpg" alt="Waqas" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-sm">✓</div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">About the Author</div>
              <h2 className="text-2xl font-black text-white mb-3">Syed Waqas Tayyab</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-2xl">
                Senior IT System Engineer and IT Service Delivery Lead at <span className="text-blue-400 font-semibold">SAP Saudi Arabia</span>.
                15+ years managing enterprise IT across 3 offices in MENA — covering device management, cloud security,
                AI automation, and ITSM. Azure Security Certified, SAP AI Certified, MBA (UK).
                Building the <span className="text-cyan-400 font-semibold">HiTecH Technology HUB</span> to share real IT knowledge with 1M+ community followers.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['SAP · Riyadh KSA', 'Azure Security', 'SAP AI Hub', 'MBA · UK', 'ITIL v3', '1M+ Community', 'English · Arabic'].map(t => (
                  <span key={t} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/about" className="btn-primary px-6 py-3 text-sm font-bold text-center">
                Full Portfolio
              </Link>
              <a href="/Waqas-Syed-CV.pdf" download
                className="btn-outline px-6 py-3 text-sm font-semibold text-center border-green-500/30 text-green-400 hover:bg-green-500/10">
                Download CV
              </a>
              <Link href="/contact"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-center bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all">
                Get in Touch
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-center"
        style={{ background: 'linear-gradient(to bottom, rgba(8,14,24,1), rgba(15,23,42,1))' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to work together?</h2>
          <p className="text-gray-400 text-base mb-8 leading-relaxed">
            Whether you need a senior IT hire, an outsourced IT specialist, or free IT education —
            you&apos;re in the right place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-primary px-8 py-3.5 text-base font-bold">
              Free IT Consultation →
            </Link>
            <Link href="/services" className="btn-outline px-8 py-3.5 text-base font-semibold">
              View IT Services
            </Link>
            <Link href="/training"
              className="px-8 py-3.5 rounded-xl text-base font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
              Browse Free Courses
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-6">
            📍 Riyadh, Saudi Arabia · Remote Worldwide · waqastayyab2004@gmail.com
          </p>
        </div>
      </section>

    </div>
  )
}
