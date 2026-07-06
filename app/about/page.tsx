'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Cpu, Zap, Shield, Cloud, Brain, Network, Briefcase, Star, Phone,
  MessageCircle, Globe, Users, TrendingUp, Award, Mail, Linkedin,
  Facebook, CheckCircle, Calendar, MapPin, GraduationCap, ExternalLink,
  Download, Code, Server, Database, ChevronDown, ChevronUp,
} from 'lucide-react'
import NeuralNetwork from '@/components/ui/NeuralNetwork'

/* ─── DATA ─────────────────────────────────────────────────────────── */

const certifications = [
  { name: 'Azure Security Engineer Associate', issuer: 'Microsoft', year: '2024', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
  { name: 'SAP Python ML for SAP HANA', issuer: 'SAP', year: '2026', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'SAP S/4HANA System Admin', issuer: 'SAP', year: '2022', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'SAP Analytics Cloud', issuer: 'SAP', year: '2021', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'AI-Driven Project Manager', issuer: 'QAS', year: '2025', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25' },
  { name: 'CCNA Security', issuer: 'Cisco', year: '2014', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25' },
  { name: 'ITIL v3 Foundation', issuer: 'Axelos', year: '2016', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' },
  { name: 'PMP — 35 PDUs', issuer: 'PMI', year: '2018', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/25' },
  { name: 'Microsoft 365 Admin', issuer: 'Microsoft', year: '2020', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
  { name: 'MBA (iMBA)', issuer: 'Buckinghamshire Univ, UK', year: '2023', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/25' },
  { name: 'BSc Information Technology', issuer: 'University of Greenwich, UK', year: '2010', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25' },
]

const experience = [
  {
    role: 'Senior IT System Engineer / IT Service Delivery Lead',
    company: 'SAP',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jul 2019 – Present',
    color: 'border-accent-blue',
    badge: 'text-accent-blue',
    highlights: [
      'Enterprise IT field service & proactive monitoring across all network layers',
      'Secure lifecycle management of IT assets — procurement via SAP Ariba (MENA)',
      'Full ServiceNow ticket lifecycle aligned to SLAs & KPIs',
      'Meeting room & digital signage tech: Poly, Crestron, Cisco, Logitech',
      'Led IT onboarding/offboarding — Active Directory, Intune, M365',
      'Built AI automation tools replacing manual workflows — saving hours daily',
      'Trained team on AI adoption: Copilot, Claude, Gemini, ChatGPT in SAP context',
    ],
    skills: ['ServiceNow', 'SAP Ariba', 'Azure AD', 'Intune', 'M365', 'Python AI', 'ITIL'],
  },
  {
    role: 'IT Support Specialist (IT SPOC)',
    company: 'SAP Saudi Arabia',
    location: 'Riyadh · Jeddah · AlKhobar',
    period: 'Jan 2015 – Jun 2019',
    color: 'border-cyan-500',
    badge: 'text-cyan-400',
    highlights: [
      'Single point of contact for IT across 3 Saudi Arabia office locations',
      'Managed SAP S/4HANA, SAP Analytics Cloud, SAP BTP operations',
      'HP Server administration, Windows/Linux/macOS support',
      'Network infrastructure — Cisco/Aruba LAN/WAN, NAC controllers',
      'Vendor management and hardware procurement',
    ],
    skills: ['SAP S/4HANA', 'HP Servers', 'Cisco/Aruba', 'Windows', 'Linux'],
  },
  {
    role: 'System Security Officer',
    company: 'Banque Saudi Fransi',
    location: 'Riyadh, Saudi Arabia',
    period: '2012 – 2015',
    color: 'border-red-500',
    badge: 'text-red-400',
    highlights: [
      'Managed ATM and branch security systems, access control, 24/7 monitoring',
      'CCTV & physical security infrastructure across branches',
      'Incident response and security audit support',
    ],
    skills: ['Physical Security', 'CCTV', 'Access Control', 'Incident Response'],
  },
]

const projects = [
  {
    emoji: '🤖',
    title: 'Waqas AI Hub',
    subtitle: 'macOS AI Dashboard',
    desc: 'Native macOS Swift app + FastAPI backend integrating Gmail, SAP Outlook, Calendar, ServiceNow tickets, and WhatsApp SLA alerts in one dashboard.',
    tags: ['FastAPI', 'Python', 'Swift', 'ServiceNow', 'Twilio'],
    status: 'Live',
    color: 'border-accent-blue',
  },
  {
    emoji: '📦',
    title: 'IT Asset Manager',
    subtitle: 'Enterprise Web App',
    desc: 'Full-stack Flask app replacing Excel-based asset tracking at SAP. KPI dashboard, Excel import/export, AI chat widget, full audit log.',
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js'],
    status: 'Live',
    color: 'border-cyan-500',
  },
  {
    emoji: '🔔',
    title: 'SNOW SLA Pipeline',
    subtitle: 'WhatsApp Automation',
    desc: 'Python daemons polling ServiceNow every 5 min — fires WhatsApp via Twilio 30 min before SLA breach. Zero manual checking.',
    tags: ['Python', 'ServiceNow', 'Twilio', 'REST API'],
    status: 'Live',
    color: 'border-green-500',
  },
  {
    emoji: '🌐',
    title: 'HiTecH AI HUB',
    subtitle: 'Personal Brand Website',
    desc: 'This site — Next.js 14, TypeScript, Tailwind CSS, AI chatbot, blog, hire page. Deployed on Cloudflare Pages.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Cloudflare'],
    status: 'Live',
    color: 'border-purple-500',
  },
  {
    emoji: '🔗',
    title: 'SAP O365 MCP Server',
    subtitle: 'Claude AI ↔ M365 Bridge',
    desc: 'MCP server giving Claude AI direct access to SAP Outlook, Calendar, OneDrive, SharePoint via OAuth2 + Microsoft Graph API.',
    tags: ['Python', 'OAuth2', 'Graph API', 'MCP'],
    status: 'Live',
    color: 'border-orange-500',
  },
  {
    emoji: '📊',
    title: 'SNOW SLA Predictor',
    subtitle: 'Python ML Model',
    desc: 'ML model on real SAP ServiceNow data predicting ticket SLA breaches before they happen — scikit-learn Random Forest pipeline.',
    tags: ['Python', 'scikit-learn', 'Pandas', 'SAP BTP'],
    status: 'In Dev',
    color: 'border-yellow-500',
  },
]

const skillDomains = [
  {
    icon: Server,
    title: 'IT Service Delivery',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    items: ['ServiceNow ITSM', 'SLA & KPI Management', 'ITIL v3', 'Incident Management', 'Problem Management', 'Change Management', 'Asset Lifecycle'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Azure',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    items: ['Azure Security Engineer', 'Zero Trust Architecture', 'Intune MDM', 'MFA & Conditional Access', 'Defender for M365', 'Endpoint Security', 'CCNA Security'],
  },
  {
    icon: Globe,
    title: 'SAP & Enterprise',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    items: ['SAP S/4HANA Admin', 'SAP Analytics Cloud', 'SAP BTP', 'SAP Ariba', 'SAP Build', 'SAP HANA ML', 'SAP IT Operations'],
  },
  {
    icon: Cpu,
    title: 'M365 & Office Tech',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    items: ['Microsoft 365 Admin', 'Exchange Online', 'SharePoint', 'Teams Admin', 'M365 Copilot', 'Digital Signage', 'Meeting Room AV'],
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    items: ['Agentic AI', 'Python ML / MLOps', 'LLMs & Prompt Engineering', 'FastAPI', 'Flask', 'Next.js', 'REST APIs', 'PowerShell'],
  },
  {
    icon: Network,
    title: 'Infrastructure & Cloud',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    items: ['Azure / Hybrid Cloud', 'IaaS / PaaS', 'Cisco / Aruba Networking', 'LAN / WAN', 'HP Servers', 'Windows / Linux / macOS', 'NAC Controllers'],
  },
]

const stats = [
  { value: '15+', label: 'Years in IT', color: 'text-accent-blue' },
  { value: '100+', label: 'Projects Delivered', color: 'text-cyan-400' },
  { value: '13', label: 'Certifications', color: 'text-purple-400' },
  { value: '1M+', label: 'Community Followers', color: 'text-yellow-400' },
]

const contacts = [
  { icon: Phone, label: '+966 505803073', href: 'tel:+966505803073', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/966505803073', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Mail, label: 'waqastayyab2004@gmail.com', href: 'mailto:waqastayyab2004@gmail.com', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Linkedin, label: 'syedwaqastayyab', href: 'https://www.linkedin.com/in/syedwaqastayyab/', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Facebook, label: 'HiTech Technology HUB', href: 'https://www.facebook.com/profile.php?id=61551726961739', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
]

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(0)
  const [showAllCerts, setShowAllCerts] = useState(false)

  const displayedCerts = showAllCerts ? certifications : certifications.slice(0, 6)

  return (
    <div className="min-h-screen bg-dark-900">

      {/* ── HERO — full-bleed photo with dark overlay ─────────────── */}
      <section className="relative overflow-hidden pt-16">

        {/* Subtle dark background with glow — no photo here, photo is on the right */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-900" />
          <div className="absolute right-0 top-0 w-[700px] h-full"
            style={{ background: 'linear-gradient(to left, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
          <div className="absolute right-1/4 top-1/3 w-96 h-96 rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* Content — sits above background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-12">

            {/* LEFT — text */}
            <div className="flex flex-col justify-center">
              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit mb-6"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.30)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-accent-blue text-xs font-semibold">Open to Work · MENA + Remote</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 whitespace-nowrap">
                Syed <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-400 to-purple-400">Waqas Tayyab</span>
              </h1>

              <p className="text-xl text-accent-blue font-bold mb-2">
                Senior IT System Engineer · IT Service Delivery Lead
              </p>
              <p className="text-sm text-cyan-400 font-medium mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Riyadh, Saudi Arabia · SAP · 15+ Years IT
              </p>

              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
                AI, ML, Agentic AI, Cyber &amp; Cloud expert with 15+ years and 100+ projects at SAP.
                Azure Security Certified. MBA graduate. Building automation systems that save hours daily.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-8 max-w-lg">
                {stats.map((s) => (
                  <div key={s.label} className="p-3 text-center rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-gray-400 text-[10px] leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/hire" className="btn-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Hire Me
                </Link>
                <Link href="/contact" className="btn-outline px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
                <a href="https://www.linkedin.com/in/syedwaqastayyab/"
                  target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', color: '#d1d5db' }}>
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            {/* RIGHT — your photo, clearly visible */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Glow ring behind photo */}
              <div className="absolute w-[380px] h-[380px] rounded-full blur-[60px]"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)' }} />

              {/* Photo card */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Rotating border ring */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                  {/* Animated gradient ring */}
                  <div className="absolute inset-0 rounded-full p-[3px] animate-spin"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)', animationDuration: '8s' }}>
                    <div className="w-full h-full rounded-full bg-dark-900" />
                  </div>
                  {/* Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/waqas-pro.jpg"
                    alt="Syed Waqas Tayyab"
                    className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top"
                    style={{ boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
                  />
                  {/* Available badge on photo */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap z-20"
                    style={{ background: 'rgba(8,14,24,0.95)', border: '1px solid rgba(59,130,246,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-white text-xs font-semibold">Available for Projects</span>
                  </div>
                </div>

                {/* Floating tech tags around the photo */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xs">
                  {[
                    { label: '☁️ Azure Security', text: '#93c5fd', border: 'rgba(59,130,246,0.4)', bg: 'rgba(59,130,246,0.12)' },
                    { label: '🟠 SAP S/4HANA',   text: '#fdba74', border: 'rgba(249,115,22,0.4)',  bg: 'rgba(249,115,22,0.12)' },
                    { label: '🤖 AI / ML',        text: '#c4b5fd', border: 'rgba(139,92,246,0.4)', bg: 'rgba(139,92,246,0.12)' },
                    { label: '🎫 ServiceNow',     text: '#86efac', border: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.12)'  },
                    { label: '💼 M365 Admin',     text: '#a5b4fc', border: 'rgba(99,102,241,0.4)', bg: 'rgba(99,102,241,0.12)' },
                    { label: '🐍 Python',         text: '#fde68a', border: 'rgba(234,179,8,0.4)',  bg: 'rgba(234,179,8,0.12)'  },
                  ].map((t) => (
                    <div key={t.label}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm"
                      style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text }}>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #080e18)' }} />
        {/* Thin accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)' }} />
      </section>

      {/* ── QUICK CONTACT BAR ──────────────────────────────────────── */}
      <section className="bg-dark-800/50 border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {contacts.map((c) => (
              <a key={c.label} href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${c.bg} ${c.color} border border-current/20 hover:opacity-80 transition-opacity`}>
                <c.icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── ABOUT ME ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Users className="w-5 h-5 text-accent-blue" />} title="About Me" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-7">
              <p className="text-gray-300 leading-relaxed mb-4">
                I&apos;m <span className="text-white font-semibold">Syed Waqas Tayyab</span>, a Senior IT System Engineer and IT Service Delivery Lead at <span className="text-accent-blue font-semibold">SAP Saudi Arabia</span> with over 15 years in corporate IT. I specialise in enterprise IT operations, AI automation, Azure security, SAP systems, and Microsoft 365.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                I hold an <span className="text-white font-semibold">MBA from Buckinghamshire New University, UK</span> and a <span className="text-white font-semibold">BSc IT from University of Greenwich, UK</span>, plus 13 professional certifications including Azure Security Engineer and SAP Python ML.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My mission: bridge the gap between corporate IT and modern AI — training teams to adopt tools like Copilot, Claude, and Gemini, and building automation systems that save hours of manual work every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['English (Fluent)', 'Arabic (Fluent)', 'Riyadh, KSA', 'MENA + Remote', 'Open to Work'].map((t) => (
                  <span key={t} className="tag text-xs py-1 px-3">{t}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col gap-5">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-pink-500/8 border border-pink-500/20">
                    <div className="text-white text-sm font-semibold">MBA (iMBA)</div>
                    <div className="text-pink-400 text-xs">Buckinghamshire New Univ · UK · 2023</div>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-500/8 border border-indigo-500/20">
                    <div className="text-white text-sm font-semibold">BSc Information Technology</div>
                    <div className="text-indigo-400 text-xs">University of Greenwich · UK · 2010</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Social Reach
                </div>
                <div className="space-y-2">
                  {[
                    { label: '1M+ Followers', sub: 'Across all platforms', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { label: '500+ LinkedIn', sub: 'syedwaqastayyab', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: '100K+ Monthly', sub: 'Tech content views', color: 'text-green-400', bg: 'bg-green-500/10' },
                  ].map((s) => (
                    <div key={s.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${s.bg}`}>
                      <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
                      <span className="text-gray-500 text-xs">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS — Neural Brain Network ────────────────────────── */}
        <section>
          <SectionHeader icon={<Brain className="w-5 h-5 text-purple-400" />} title="Skills Neural Network" />
          <NeuralNetwork />
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Briefcase className="w-5 h-5 text-cyan-400" />} title="Work Experience" />
          <div className="space-y-4">
            {experience.map((job, i) => (
              <div key={job.role} className={`glass-card border-l-4 ${job.color} overflow-hidden`}>
                <button
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-white/2 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-base">{job.role}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`font-semibold ${job.badge}`}>{job.company}</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{job.location}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{job.period}
                      </span>
                    </div>
                  </div>
                  {expandedJob === i
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
                </button>
                {expandedJob === i && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-2 mb-4">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="tag text-xs py-1 px-2">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Code className="w-5 h-5 text-green-400" />} title="Projects I've Built" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.title} className={`glass-card border-l-4 ${p.color} p-5 hover:-translate-y-0.5 transition-all duration-200`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{p.emoji}</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${p.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-0.5">{p.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{p.subtitle}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="tag text-[10px] py-0.5 px-2">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/projects" className="btn-outline px-6 py-2.5 text-sm inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Full Project Details
            </Link>
          </div>
        </section>

        {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Award className="w-5 h-5 text-yellow-400" />} title="Certifications & Education" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedCerts.map((c) => (
              <div key={c.name} className={`glass-card p-4 border ${c.border} flex items-start gap-3`}>
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <Award className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold leading-snug">{c.name}</div>
                  <div className={`text-xs font-medium mt-0.5 ${c.color}`}>{c.issuer} · {c.year}</div>
                </div>
              </div>
            ))}
          </div>
          {certifications.length > 6 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="btn-outline px-5 py-2 text-sm inline-flex items-center gap-2"
              >
                {showAllCerts ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {certifications.length} Certs</>}
              </button>
            </div>
          )}
        </section>

        {/* ── HIRE CTA ─────────────────────────────────────────────── */}
        <section>
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-purple-500/8 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-accent-blue" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Let&apos;s Work Together
              </h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto mb-7">
                15+ years of IT expertise + AI/ML skills. Available for IT Service Delivery, AI Automation, Azure Security, SAP, M365, and Web App projects — MENA and remote.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/hire" className="btn-primary px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> View Services & Pricing
                </Link>
                <a href="mailto:waqastayyab2004@gmail.com" className="btn-outline px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-lg text-sm font-semibold bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

/* ─── Section Header helper ────────────────────────────────────────── */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-dark-700 border border-white/8 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  )
}
