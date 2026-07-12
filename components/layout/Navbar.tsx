'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Menu, X, ChevronDown,
  Server, Shield, Globe, Brain, BookOpen, Briefcase,
  FileText, Lightbulb, Code, Users, ArrowRight,
  GraduationCap, Cpu, Newspaper,
} from 'lucide-react'

/* ── NAV STRUCTURE ─────────────────────────────────────────────
   Inspired by Vercel / Stripe / Linear:
   Logo | Services ▾ | Work ▾ | Learn ▾ | Blog | [Contact Us]
   Max 5 items + CTA. Secondary links in dropdown panels.
   ──────────────────────────────────────────────────────────── */

const nav = [
  {
    label: 'Services',
    href: '/services',
    seeAll: { href: '/services', label: 'View all IT services' },
    dropdown: [
      {
        group: 'What We Offer',
        items: [
          { href: '/services', icon: Server, label: 'IT Services', desc: 'Infrastructure, cloud, security & support' },
          { href: '/industries', icon: Globe, label: 'Industries', desc: 'Banking, energy, healthcare, telecom & more' },
          { href: '/medical-billing', icon: Shield, label: 'Medical Billing', desc: 'US RCM outsourcing & revenue cycle', badge: 'New' },
        ],
      },
      {
        group: 'Get Started',
        items: [
          { href: '/contact', icon: Users, label: 'Free Consultation', desc: 'Talk to us — no commitment', badge: 'Free' },
        ],
      },
    ],
  },
  {
    label: 'Work',
    href: '/projects',
    seeAll: { href: '/projects', label: 'View all projects' },
    dropdown: [
      {
        group: 'Portfolio',
        items: [
          { href: '/projects', icon: Code, label: 'Projects', desc: '24 real implementations with PMP docs' },
          { href: '/about', icon: Briefcase, label: 'Portfolio', desc: 'CV, experience, certifications' },
        ],
      },
      {
        group: 'Case Studies',
        items: [
          { href: '/projects', icon: FileText, label: 'Change Management', desc: 'SCCM→Intune, ServiceNow migrations' },
          { href: '/projects', icon: Brain, label: 'AI & Automation', desc: 'Python pipelines, Power Apps, ML tools' },
        ],
      },
    ],
  },
  {
    label: 'Learn',
    href: '/training',
    seeAll: { href: '/training', label: 'Browse all courses' },
    dropdown: [
      {
        group: 'Courses & Content',
        items: [
          { href: '/training', icon: GraduationCap, label: 'IT Learning', desc: '12 courses — free & paid', badge: '12 Courses' },
          { href: '/insights', icon: Lightbulb, label: 'Insights', desc: 'IT topics, guides, and trends' },
          { href: '/resources', icon: Cpu, label: 'AI Tools', desc: 'Top 20 AI tools for IT professionals' },
        ],
      },
      {
        group: 'Free Downloads',
        items: [
          { href: '/training', icon: FileText, label: 'CV Templates', desc: '5 free Word templates — download now', badge: 'Free' },
        ],
      },
    ],
  },
  {
    label: 'Articles',
    href: '/blog',
  },
  {
    label: 'Portfolio',
    href: '/about',
  },
]

/* ── COMPONENT ──────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openDropdown = (label: string) => {
    clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const isActive = (item: typeof nav[0]) => {
    if (item.href === pathname) return true
    if (item.dropdown) return item.dropdown.some(g => g.items.some(i => i.href === pathname))
    return false
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}>

        {/* ── Tagline strip ── */}
        <div className="w-full border-b border-white/5 overflow-hidden"
          style={{ background: 'rgba(6,182,212,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            <p className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-cyan-400 text-center">
              IT Consulting · AI Automation · Free IT Courses · Real-World Tech Insights
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <style>{`
                @keyframes logoGlow {
                  0%,100% { box-shadow: 0 0 10px rgba(59,130,246,0.3), 0 0 20px rgba(59,130,246,0.1); }
                  50%      { box-shadow: 0 0 22px rgba(59,130,246,0.8), 0 0 40px rgba(6,182,212,0.35); }
                }
                @keyframes textGlow {
                  0%,100% { text-shadow: 0 0 8px rgba(59,130,246,0.3); }
                  50%      { text-shadow: 0 0 16px rgba(59,130,246,0.8), 0 0 30px rgba(6,182,212,0.4); }
                }
                @keyframes tagFade {
                  0%,100% { opacity: 0.45; }
                  50%      { opacity: 0.85; }
                }
                .logo-icon  { animation: logoGlow 3.5s ease-in-out infinite; }
                .logo-text  { animation: textGlow 3.5s ease-in-out infinite; }
                .logo-tag   { animation: tagFade 3.5s ease-in-out infinite; }
              `}</style>

              {/* Icon — bigger */}
              <div className="logo-icon w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-cyan-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Zap className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col leading-none">
                <span className="logo-text font-black text-base tracking-tight">
                  <span className="text-accent-blue">HiTecH</span>
                  <span className="text-white"> AI HUB</span>
                </span>
                <span className="logo-tag text-[9px] text-gray-500 font-medium tracking-wide hidden sm:block mt-0.5">
                  IT Consulting · Training · AI
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.dropdown && openDropdown(item.label)}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive(item)
                        ? 'text-white bg-white/8'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => item.dropdown && setActiveDropdown(null)}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-accent-blue' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown panel */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl border border-white/10 bg-dark-800/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden"
                        onMouseEnter={() => clearTimeout(closeTimer.current)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="p-3 space-y-1">
                          {item.dropdown.map((group, gi) => (
                            <div key={gi}>
                              {gi > 0 && <div className="h-px bg-white/6 my-2" />}
                              <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-2 py-1">{group.group}</p>
                              {group.items.map((di) => (
                                <Link key={di.href + di.label} href={di.href}
                                  className="flex items-start gap-3 px-2.5 py-2.5 rounded-xl hover:bg-white/6 transition-colors duration-150 group/item"
                                  onClick={() => setActiveDropdown(null)}>
                                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-accent-blue/20 transition-colors">
                                    <di.icon className="w-4 h-4 text-accent-blue" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <p className="text-sm font-semibold text-white leading-tight group-hover/item:text-accent-blue transition-colors">{di.label}</p>
                                      {(di as any).badge && (
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-blue/15 text-accent-blue border border-accent-blue/20 flex-shrink-0">{(di as any).badge}</span>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500 leading-snug">{di.desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        {/* See all footer — GitHub/Stripe pattern */}
                        {(item as any).seeAll && (
                          <Link href={(item as any).seeAll.href}
                            className="flex items-center justify-between px-4 py-3 text-xs font-semibold text-gray-500 hover:text-accent-blue transition-colors border-t border-white/6 group/sa"
                            onClick={() => setActiveDropdown(null)}>
                            <span>{(item as any).seeAll.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/sa:translate-x-0.5 transition-transform" />
                          </Link>
                        )}
                        {/* Bottom accent line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Desktop Right: Status + CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                Open to Work
              </span>
              <Link href="/contact"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-blue hover:bg-blue-500 text-white text-sm font-bold transition-all duration-200 shadow-[0_0_16px_rgba(59,130,246,0.3)] hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]">
                Contact Us
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* ── Mobile: Status dot + Hamburger ── */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Menu">
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4.5 h-4.5" /></motion.span>
                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4.5 h-4.5" /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>

        {/* ── Hairline progress bar on scroll ── */}
        {scrolled && <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />}
      </header>

      {/* ── Mobile Full-Screen Drawer ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-2xl flex flex-col pt-14"
          >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">

              {/* Nav items */}
              {nav.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-white hover:bg-white/5 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180 text-accent-blue' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-0.5">
                              {item.dropdown.flatMap(g => g.items).map((di) => (
                                <Link key={di.href + di.label} href={di.href}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                                  onClick={() => setMobileOpen(false)}>
                                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/15 flex items-center justify-center flex-shrink-0">
                                    <di.icon className="w-4 h-4 text-accent-blue" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-white">{di.label}</p>
                                    <p className="text-xs text-gray-500">{di.desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        pathname === item.href ? 'text-accent-blue bg-accent-blue/8' : 'text-white hover:bg-white/5'
                      }`}
                      onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="h-px bg-white/8 my-2" />

              {/* CTA */}
              <Link href="/contact"
                className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-accent-blue hover:bg-blue-500 text-white text-base font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                onClick={() => setMobileOpen(false)}>
                Contact Us — Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-2">
                <a href="/Waqas-Syed-CV.pdf" download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/3 text-sm text-gray-300 hover:bg-white/8 transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  <FileText className="w-4 h-4 text-accent-blue" />
                  Download CV
                </a>
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/5 text-sm text-green-400 hover:bg-green-500/10 transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Bottom brand strip */}
            <div className="px-5 py-4 border-t border-white/6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black"><span className="text-accent-blue">HiTecH</span><span className="text-white"> AI HUB</span></p>
                <p className="text-[10px] text-gray-600">IT Consulting · Training · AI</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to Work
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
