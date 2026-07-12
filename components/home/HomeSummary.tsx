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

/* ── Courses summary ────────────────────────────────────────────── */
const COURSES = [
  { emoji: '🤖', title: 'AI Tools for IT Professionals',        students: '800+', level: 'All levels' },
  { emoji: '🛡️', title: 'Azure Security & Zero Trust',          students: '600+', level: 'Intermediate' },
  { emoji: '🎫', title: 'ServiceNow Basics for IT Teams',        students: '350+', level: 'Beginner' },
  { emoji: '☁️', title: 'Microsoft 365 Administration',          students: '500+', level: 'Intermediate' },
  { emoji: '🚀', title: 'IT Career Roadmap: L1 → Senior',        students: '500+', level: 'All levels' },
  { emoji: '💻', title: 'Python Automation for IT',              students: '400+', level: 'Beginner' },
]

/* ── Articles summary ───────────────────────────────────────────── */
const ARTICLES = [
  { emoji: '🤖', tag: 'AI',            title: 'Top AI Tools Every IT Engineer Must Know in 2026' },
  { emoji: '🛡️', tag: 'Security',      title: 'Zero Trust Architecture: A Practical Enterprise Guide' },
  { emoji: '☁️', tag: 'Cloud',         title: 'Microsoft 365 Copilot — What IT Admins Need to Know' },
  { emoji: '⚡', tag: 'Automation',    title: 'How I Built a WhatsApp SLA Alert Bot with Python' },
  { emoji: '🎫', tag: 'ITSM',          title: 'ServiceNow SLA Design: The Framework That Works' },
  { emoji: '📦', tag: 'IT Asset Mgmt', title: 'Replace Excel Asset Tracking with a Web App' },
]

/* ── Projects summary ───────────────────────────────────────────── */
const PROJECTS = [
  { emoji: '🤖', color: '#3b82f6', title: 'Waqas AI Hub',            subtitle: 'macOS AI Dashboard',         status: 'Live' },
  { emoji: '📦', color: '#10b981', title: 'IT Asset Manager',         subtitle: 'Flask Web App · 1,500+ assets', status: 'Live' },
  { emoji: '🔔', color: '#f59e0b', title: 'SNOW SLA Pipeline',        subtitle: 'WhatsApp Alerts · Python',   status: 'Live' },
  { emoji: '🖥️', color: '#8b5cf6', title: 'Modern Workplace Migration', subtitle: 'Intune/Autopilot · 200 users', status: 'Completed' },
  { emoji: '🔐', color: '#ef4444', title: 'Zero Trust Architecture',  subtitle: 'Secure Score 41%→78%',       status: 'Completed' },
  { emoji: '📊', color: '#06b6d4', title: 'PowerBI IT Dashboard',     subtitle: 'KPI · SAP Work Zone · Live', status: 'Live' },
]

const statusColor: Record<string, string> = {
  Live: 'bg-green-500/15 text-green-400 border-green-500/30',
  Completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
}

export default function HomeSummary() {
  return (
    <div className="space-y-0">

      {/* ══ IT SERVICES ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">What We Offer</p>
              <h2 className="text-3xl font-black text-white">IT Services</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Enterprise IT consulting and managed services — onsite across MENA or fully remote worldwide.
              </p>
            </div>
            <Link href="/services" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0">
              All Services <ArrowRight className="w-4 h-4" />
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

      {/* ══ IT LEARNING ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.03), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Free Education</p>
              <h2 className="text-3xl font-black text-white">IT Learning</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                12 free courses covering AI, Azure Security, M365, ServiceNow, networking, and IT career growth.
              </p>
            </div>
            <Link href="/training" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
              All 12 Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.07}>
                <Link href="/training"
                  className="glass-card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 group h-full border border-white/6 hover:border-emerald-500/25">
                  <span className="text-3xl flex-shrink-0">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors leading-snug">{c.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-gray-500 font-mono">{c.students} students</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <span className="text-[10px] text-emerald-500 font-semibold">{c.level}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-auto">FREE</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ARTICLES ═════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(245,158,11,0.03), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">Insights & Guides</p>
              <h2 className="text-3xl font-black text-white">Latest Articles</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Practical IT and AI articles from 15+ years of real enterprise experience — no fluff.
              </p>
            </div>
            <Link href="/blog" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              All 18 Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.07}>
                <Link href="/blog"
                  className="glass-card p-5 flex gap-4 items-start hover:-translate-y-0.5 transition-all duration-200 group h-full border border-white/6 hover:border-yellow-500/25">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{a.emoji}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full mb-2 inline-block">{a.tag}</span>
                    <h3 className="text-white text-sm font-bold leading-snug group-hover:text-yellow-400 transition-colors">{a.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ═════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.03), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-2">Real Enterprise Work</p>
              <h2 className="text-3xl font-black text-white">Featured Projects</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                34 real projects with full PMP documentation — scope, outcomes, tools, and SLAs.
              </p>
            </div>
            <Link href="/projects" className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              All 34 Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
