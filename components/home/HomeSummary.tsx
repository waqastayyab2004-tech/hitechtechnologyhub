'use client'

import Link from 'next/link'
import { ArrowRight, Shield, BookOpen, FileText, FolderOpen, Zap, Cloud, Server, Brain, Network, Code } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

/* ── Services summary ───────────────────────────────────────────── */
const SERVICES = [
  { icon: Server,  color: '#3b82f6', title: 'IT Infrastructure & Support',    desc: 'L1–L3 support, Cisco/Aruba networking, HP servers, endpoint management — onsite MENA or remote.' },
  { icon: Shield,  color: '#ef4444', title: 'Azure Security & Cybersecurity', desc: 'Zero Trust, Conditional Access, MFA, Defender for M365, Azure Security Engineer certified.' },
  { icon: Cloud,   color: '#0ea5e9', title: 'Microsoft 365 & Cloud Admin',    desc: 'Full M365 tenant: Exchange, Teams, SharePoint, OneDrive, Intune, Copilot rollout.' },
  { icon: Zap,     color: '#f59e0b', title: 'AI Automation & Development',    desc: 'Python agents, Power Apps, WhatsApp alerts, AI dashboards — tools that save hours daily.' },
  { icon: Network, color: '#10b981', title: 'ServiceNow ITSM',               desc: 'SNOW implementation, SLA framework design, KB architecture, legacy migration.' },
  { icon: Brain,   color: '#8b5cf6', title: 'IT Asset Management',           desc: 'Asset registers, lifecycle tracking, SAP Ariba procurement, audit reports.' },
]

/* ── Featured article ───────────────────────────────────────────── */
const FEATURED_ARTICLE = {
  emoji: '🤖',
  tag: 'AI Automation',
  tagColor: '#f59e0b',
  title: 'How I Built a Real-Time AI Dashboard That Replaced 5 Tools',
  excerpt: 'A FastAPI + WebKit native app that pulls SAP Mail, ServiceNow tickets, Gmail, and WhatsApp alerts into one dark-mode dashboard — built in a weekend, runs every morning.',
  href: '/blog/ai-dashboard-replace-5-tools',
}

/* ── Featured project ───────────────────────────────────────────── */
const FEATURED_PROJECT = {
  emoji: '📦',
  color: '#10b981',
  title: 'IT Asset Manager',
  subtitle: 'Flask Web App · 1,500+ assets tracked',
  status: 'Live',
  href: '/projects',
}

/* ── Featured course ────────────────────────────────────────────── */
const FEATURED_COURSE = {
  emoji: '🤖',
  title: 'AI Tools for IT Professionals',
  students: '800+',
  level: 'All levels',
  href: '/training',
}

/* ── Courses ────────────────────────────────────────────────────── */
const COURSES = [
  { emoji: '🤖', title: 'AI Tools for IT Professionals',   students: '800+', level: 'All levels'  },
  { emoji: '🛡️', title: 'Azure Security & Zero Trust',     students: '600+', level: 'Intermediate' },
  { emoji: '🎫', title: 'ServiceNow Basics for IT Teams',   students: '350+', level: 'Beginner'    },
]

/* ── Recent articles ────────────────────────────────────────────── */
const ARTICLES = [
  { emoji: '🤖', tag: 'AI',         tagColor: '#f59e0b', title: 'Top AI Tools Every IT Engineer Must Know in 2026',     href: '/blog' },
  { emoji: '🛡️', tag: 'Security',  tagColor: '#ef4444', title: 'Zero Trust Architecture: A Practical Enterprise Guide', href: '/blog' },
  { emoji: '☁️', tag: 'Cloud',     tagColor: '#0ea5e9', title: 'Microsoft 365 Copilot — What IT Admins Need to Know',   href: '/blog' },
  { emoji: '⚡', tag: 'Automation', tagColor: '#f59e0b', title: 'How I Built a WhatsApp SLA Alert Bot with Python',      href: '/blog' },
]

/* ── Projects ───────────────────────────────────────────────────── */
const PROJECTS = [
  { emoji: '🤖', color: '#3b82f6', title: 'Waqas AI Hub',         subtitle: 'macOS AI Dashboard',             status: 'Live'      },
  { emoji: '📦', color: '#10b981', title: 'IT Asset Manager',      subtitle: 'Flask Web App · 1,500+ assets',  status: 'Live'      },
  { emoji: '🔔', color: '#f59e0b', title: 'SNOW SLA Pipeline',     subtitle: 'WhatsApp Alerts · Python',       status: 'Live'      },
  { emoji: '🔐', color: '#ef4444', title: 'Zero Trust Rollout',    subtitle: 'Secure Score 41% → 78%',         status: 'Completed' },
]

const statusColor: Record<string, string> = {
  Live:      'bg-green-500/15 text-green-400 border-green-500/30',
  Completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
}

export default function HomeSummary() {
  return (
    <div className="space-y-0">

      {/* ══ IT SERVICES — 3-col grid, all 6 ══════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">What I Help With</p>
              <h2 className="text-3xl font-black text-white">IT Services</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Enterprise IT consulting and managed services — onsite across MENA or fully remote worldwide.
              </p>
            </div>
            <Link href="/services" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.title} delay={i * 0.07}>
                  <Link href="/services"
                    className="glass-card p-5 flex gap-4 items-start hover:-translate-y-0.5 transition-all duration-200 group h-full"
                    style={{ borderTopWidth: 2, borderTopColor: `${s.color}40` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-bold mb-1 group-hover:text-blue-400 transition-colors">{s.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ LATEST WORK — asymmetric 2-col layout ════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.03), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Recent Output</p>
              <h2 className="text-3xl font-black text-white">Latest Work</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Articles, projects and courses — all built from real enterprise experience, not theory.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/blog"     className="btn-outline text-sm inline-flex items-center gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">Articles <ArrowRight className="w-4 h-4"/></Link>
              <Link href="/projects" className="btn-outline text-sm inline-flex items-center gap-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/10">Projects <ArrowRight className="w-4 h-4"/></Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Featured article — wider left column */}
            <ScrollReveal className="lg:col-span-3">
              <Link href={FEATURED_ARTICLE.href}
                className="glass-card p-7 flex flex-col h-full hover:-translate-y-0.5 transition-all duration-200 group border border-white/6 hover:border-yellow-500/25">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-4 w-fit"
                  style={{ color: FEATURED_ARTICLE.tagColor, background: `${FEATURED_ARTICLE.tagColor}15`, border: `1px solid ${FEATURED_ARTICLE.tagColor}30` }}>
                  {FEATURED_ARTICLE.tag}
                </span>
                <h3 className="text-white text-xl font-bold mb-3 leading-snug group-hover:text-yellow-400 transition-colors">
                  {FEATURED_ARTICLE.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{FEATURED_ARTICLE.excerpt}</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-yellow-400 group-hover:text-yellow-300">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </span>
              </Link>
            </ScrollReveal>

            {/* Right column — project + recent articles stacked */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Featured project */}
              <ScrollReveal delay={0.1}>
                <Link href={FEATURED_PROJECT.href}
                  className="glass-card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 group border border-white/6 hover:border-green-500/25"
                  style={{ borderLeftWidth: 3, borderLeftColor: `${FEATURED_PROJECT.color}60` }}>
                  <span className="text-3xl flex-shrink-0">{FEATURED_PROJECT.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-purple-400 mb-1">Featured Project</p>
                    <h3 className="text-white text-sm font-bold mb-0.5 group-hover:text-green-400 transition-colors">{FEATURED_PROJECT.title}</h3>
                    <p className="text-gray-500 text-xs mb-2">{FEATURED_PROJECT.subtitle}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusColor[FEATURED_PROJECT.status]}`}>{FEATURED_PROJECT.status}</span>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Recent articles list */}
              <ScrollReveal delay={0.15}>
                <div className="glass-card p-5 flex flex-col gap-3 border border-white/6">
                  <p className="text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-1">Recent Articles</p>
                  {ARTICLES.map((a) => (
                    <Link key={a.title} href={a.href}
                      className="flex items-start gap-3 group py-2 border-b border-white/5 last:border-0 last:pb-0">
                      <span className="text-base flex-shrink-0 mt-0.5">{a.emoji}</span>
                      <p className="text-gray-300 text-xs leading-snug group-hover:text-white transition-colors">{a.title}</p>
                    </Link>
                  ))}
                  <Link href="/blog" className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 font-semibold mt-1">
                    All Articles <ArrowRight className="w-3 h-3"/>
                  </Link>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* ══ IT LEARNING — 3 courses + projects row ═══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.03), transparent)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Courses */}
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Free Education</p>
              <h2 className="text-3xl font-black text-white">IT Learning</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Free courses built from 15+ years of real enterprise IT — practical skills, not textbook theory.
              </p>
            </div>
            <Link href="/training" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
              All 12 Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {COURSES.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.07}>
                <Link href="/training"
                  className="glass-card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 group h-full border border-white/6 hover:border-emerald-500/25">
                  <span className="text-3xl flex-shrink-0">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors leading-snug">{c.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-gray-500 font-mono">{c.students} students</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">{c.level}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-auto">FREE</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Projects row */}
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-1">Real Enterprise Work</p>
              <h2 className="text-2xl font-black text-white">Featured Projects</h2>
            </div>
            <Link href="/projects" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              All 44 Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.07}>
                <Link href="/projects"
                  className="glass-card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 group h-full"
                  style={{ borderLeftWidth: 3, borderLeftColor: `${p.color}60` }}>
                  <span className="text-3xl flex-shrink-0">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-bold mb-0.5 group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    <p className="text-gray-500 text-xs mb-2">{p.subtitle}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusColor[p.status]}`}>{p.status}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
