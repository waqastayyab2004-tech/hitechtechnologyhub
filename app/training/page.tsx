'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Lock, Star, Clock, Users,
  Award, ChevronDown, ChevronUp, Mail, Play, BookOpen,
  TrendingUp, Shield, Cloud, Server, Brain, Zap, Globe,
  Home, Library, Search,
} from 'lucide-react'

/* ── DATA ─────────────────────────────────────────────────────── */

const sidebarCategories = [
  { icon: Home, label: 'All Courses', key: 'All' },
  { icon: Brain, label: 'AI & Automation', key: 'AI & Automation' },
  { icon: Shield, label: 'Cybersecurity & Azure', key: 'Cybersecurity & Azure' },
  { icon: Cloud, label: 'Microsoft 365 & Azure', key: 'Microsoft 365 & Azure' },
  { icon: Server, label: 'IT Infrastructure', key: 'IT Infrastructure' },
  { icon: BookOpen, label: 'ITSM & ServiceNow', key: 'ITSM & ServiceNow' },
  { icon: Globe, label: 'E-Commerce', key: 'E-Commerce' },
  { icon: Zap, label: 'Digital Marketing', key: 'Digital Marketing' },
  { icon: Award, label: 'Career & IT Foundations', key: 'Career & IT Foundations' },
]

const courses = [
  {
    id: 1,
    title: 'IT Career Roadmap: From L1 to Senior Engineer',
    category: 'Career & IT Foundations',
    level: 'Beginner', duration: '3h', students: '500+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Career Planning', 'Certifications', 'MENA IT Market'],
    description: 'Build a 15-year IT career — certifications, salary progression, and how to move from helpdesk to senior engineer at a multinational.',
    topics: ['IT career paths: helpdesk → L2/L3 → senior engineer', 'Which certifications to get (and in what order)', 'How to land roles at multinationals in MENA', 'Real salary benchmarks by role and region'],
  },
  {
    id: 2,
    title: 'AI Tools for IT Professionals: Practical Guide',
    category: 'AI & Automation',
    level: 'Beginner', duration: '2h 30m', students: '800+', rating: 5.0,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ChatGPT', 'Claude AI', 'M365 Copilot', 'Prompt Engineering'],
    description: 'Practical AI adoption for IT professionals — use ChatGPT, Claude, Copilot in daily IT work with real enterprise examples.',
    topics: ['AI tools overview: ChatGPT, Claude, Copilot, Gemini', 'Writing scripts and automations with AI', 'AI-powered troubleshooting workflows'],
  },
  {
    id: 3,
    title: 'ServiceNow Basics: Your First ITSM Dashboard',
    category: 'ITSM & ServiceNow',
    level: 'Beginner', duration: '2h', students: '350+', rating: 4.8,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ServiceNow', 'ITSM', 'SLA Management', 'KB Articles'],
    description: 'Get up and running with ServiceNow — ticket lifecycle, SLA setup, knowledge base creation, and dashboard reporting.',
    topics: ['Navigating the ServiceNow interface', 'Creating and managing incidents', 'Setting up SLA rules and targets'],
  },
  {
    id: 4,
    title: 'E-Commerce: Learn Amazon & Start Selling Online',
    category: 'E-Commerce',
    level: 'Beginner', duration: '6h', students: '300+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Amazon FBA', 'Product Research', 'Listing Optimisation', 'PPC Ads'],
    description: 'Launch on Amazon and grow your e-business — FBA setup, product research, listings, and first sales. Covers MENA and international sellers.',
    topics: ['Amazon Seller Central account setup', 'Product research tools and strategies', 'FBA vs FBM — which model to choose', 'Creating optimised product listings'],
  },
  {
    id: 5,
    title: 'Digital Marketing: Social Media, SEO & Online Growth',
    category: 'Digital Marketing',
    level: 'Beginner', duration: '8h', students: '400+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['LinkedIn', 'Instagram', 'SEO', 'Google Ads', 'Email Marketing'],
    description: 'Grow your brand using social media, SEO, email, and paid ads. Perfect for IT professionals building an online presence.',
    topics: ['Social media: LinkedIn, Instagram, Facebook, TikTok', 'SEO basics: get found on Google', 'Email marketing and list building'],
  },
  {
    id: 6,
    title: 'Microsoft 365 Administration Masterclass',
    category: 'Microsoft 365 & Azure',
    level: 'Intermediate', duration: '12h', students: '200+', rating: 4.9,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Exchange Online', 'Teams Admin', 'Intune MDM', 'SharePoint', 'Conditional Access'],
    description: 'Complete M365 administration — Exchange Online, Teams governance, SharePoint, Intune MDM, and M365 Copilot from real enterprise experience.',
    topics: ['Exchange Online: mailboxes, mail flow, quarantine', 'Teams admin: policies, governance, MTR setup', 'Intune / Autopilot: zero-touch provisioning', 'Conditional Access and MFA deployment'],
    certificate: true,
  },
  {
    id: 7,
    title: 'Azure Security Engineer: Zero Trust Implementation',
    category: 'Cybersecurity & Azure',
    level: 'Advanced', duration: '16h', students: '150+', rating: 5.0,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Zero Trust', 'Azure AD', 'Defender for M365', 'PIM', 'Sentinel'],
    description: 'Design and deploy Zero Trust in a real enterprise — Conditional Access, Defender, Intune compliance, PIM, and Azure Sentinel.',
    topics: ['Zero Trust architecture design', 'Conditional Access policy design and testing', 'Defender for M365: EDR, SIEM integration', 'Secure Score from 41% → 78% case study'],
    certificate: true,
  },
  {
    id: 8,
    title: 'Python Automation for IT Engineers',
    category: 'AI & Automation',
    level: 'Intermediate', duration: '14h', students: '180+', rating: 4.9,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Python', 'REST APIs', 'ServiceNow API', 'Microsoft Graph API', 'Automation'],
    description: 'Build real automation tools — ServiceNow automation, email agents, WhatsApp alerts, PowerBI pipelines. Every script used in production.',
    topics: ['Python fundamentals for IT professionals', 'ServiceNow API: read/write tickets via Python', 'Microsoft Graph API: email and calendar automation', 'WhatsApp SLA alerts via Twilio'],
    certificate: true,
  },
  {
    id: 9,
    title: 'ServiceNow ITSM: Enterprise Configuration',
    category: 'ITSM & ServiceNow',
    level: 'Intermediate', duration: '10h', students: '120+', rating: 4.8,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ServiceNow', 'SLA Design', 'Business Rules', 'KB Strategy', 'PowerBI'],
    description: 'Build a production-ready ServiceNow environment — SLA frameworks, business rules, workflow automation, and KB strategy from 1,500+ tickets/year experience.',
    topics: ['SLA framework design (P1–P4)', 'Auto-assignment rules and routing', 'Business rules and client scripts', 'REST API integration'],
    certificate: true,
  },
  {
    id: 10,
    title: 'IT Infrastructure for Corporates: Enterprise Setup',
    category: 'IT Infrastructure',
    level: 'Intermediate', duration: '18h', students: '90+', rating: 4.9,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Cisco', 'HP Servers', 'Intune', 'Active Directory', 'Teams MTR'],
    description: 'Complete enterprise IT infrastructure — Cisco networking, HP server setup, MDM deployment and meeting room AV from 15 years at a global multinational.',
    topics: ['Enterprise network design: Cisco, Aruba', 'HP server room setup and management', 'SCCM / Intune: device management at scale', 'Meeting room AV: Teams MTR, Logitech'],
    certificate: true,
  },
  {
    id: 11,
    title: 'E-Commerce: Master Amazon, eBay, Noon, Shopify & More',
    category: 'E-Commerce',
    level: 'Intermediate', duration: '14h', students: '150+', rating: 4.8,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Amazon', 'eBay', 'Noon', 'Shopify', 'Etsy', 'Cross-listing'],
    description: 'Sell across all major platforms — Amazon, eBay, Noon, Shopify, Etsy, AliExpress. Cross-listing tools, inventory sync, and scaling to $10K/month.',
    topics: ['Amazon: advanced FBA, brand registry', 'eBay: listing and Global Shipping', 'Noon MENA marketplace setup', 'Shopify store connected to all platforms'],
    certificate: true,
  },
  {
    id: 12,
    title: 'Advanced Digital Marketing & Growth Strategy',
    category: 'Digital Marketing',
    level: 'Intermediate', duration: '16h', students: '180+', rating: 4.9,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Google Ads', 'Meta Ads', 'SEO', 'Marketing Automation', 'Funnels'],
    description: 'Advanced SEO, paid media, marketing automation, funnel building, and data-driven growth. Tools used by top marketing teams at global brands.',
    topics: ['Advanced SEO: technical, backlinks, schema', 'Google Ads and Meta Ads management', 'Marketing automation: HubSpot, Mailchimp', 'Sales funnel design: awareness → conversion'],
    certificate: true,
  },
]

const featuredTracks = [
  { title: 'IT Infrastructure & Security', icon: '🛡️', courses: 3, color: 'from-blue-600/30 to-blue-900/20', border: 'border-blue-500/20', skills: ['Azure Security', 'Zero Trust', 'Cisco Networking', 'Intune'] },
  { title: 'AI & Automation Engineer', icon: '🤖', courses: 2, color: 'from-purple-600/30 to-purple-900/20', border: 'border-purple-500/20', skills: ['Python', 'AI Tools', 'ServiceNow API', 'Power Automate'] },
  { title: 'E-Commerce & Digital Business', icon: '🛒', courses: 4, color: 'from-amber-600/30 to-amber-900/20', border: 'border-amber-500/20', skills: ['Amazon FBA', 'Shopify', 'Digital Marketing', 'SEO'] },
  { title: 'Microsoft 365 Expert', icon: '☁️', courses: 2, color: 'from-sky-600/30 to-sky-900/20', border: 'border-sky-500/20', skills: ['Exchange Online', 'Teams Admin', 'Intune', 'Copilot'] },
]

/* ── COURSE CARD ──────────────────────────────────────────────── */
function CourseCard({ course, size = 'normal' }: { course: typeof courses[0], size?: 'normal' | 'small' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 group cursor-pointer">
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${size === 'small' ? 'h-32' : 'h-44'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.img} alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"/>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-dark-900/90 text-white">
          {course.duration}
        </span>
        {/* Free / Inquire badge */}
        <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black ${
          course.isFree ? 'bg-green-500/20 border border-green-500/40 text-green-300' : 'bg-accent-blue/20 border border-accent-blue/40 text-accent-blue'
        }`}>
          {course.isFree ? '🎁 Free' : '$ Inquire'}
        </span>
        {/* Popular */}
        {course.isPopular && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
            Popular
          </span>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white ml-0.5"/>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-widest mb-1">{course.category}</p>
        <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-500 text-xs mb-1">By {course.instructor}</p>

        {/* Rating + students */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
            <span className="text-xs font-bold text-yellow-400">{course.rating}</span>
          </div>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-xs text-gray-500">{course.students} students</span>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.skills.slice(0, 3).map(s => (
            <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-dark-700 border border-white/8 text-gray-400">{s}</span>
          ))}
        </div>

        {/* Expand topics */}
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-[11px] text-accent-blue mb-2 mt-auto">
          {open ? <><ChevronUp className="w-3 h-3"/>Hide topics</> : <><ChevronDown className="w-3 h-3"/>What you&apos;ll learn</>}
        </button>
        {open && (
          <div className="space-y-1 mb-3">
            {course.topics.map(t => (
              <div key={t} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                <CheckCircle className="w-3 h-3 text-accent-blue flex-shrink-0 mt-0.5"/>
                {t}
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2 pt-3 border-t border-white/5 mt-auto">
          <a href="#inquiry" className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${
            course.isFree
              ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
              : 'bg-accent-blue text-white hover:bg-blue-500'
          }`}>
            {course.isFree ? <><Play className="w-3 h-3"/>Enroll Free</> : <><BookOpen className="w-3 h-3"/>Inquire & Enroll</>}
          </a>
          {(course as any).certificate && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-dark-700 border border-white/8 text-[10px] text-yellow-400">
              <Award className="w-3 h-3"/>Cert
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── PAGE ─────────────────────────────────────────────────────── */
export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [submitted, setSubmitted] = useState(false)

  const filtered = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory)
  const free = filtered.filter(c => c.isFree)
  const paid = filtered.filter(c => !c.isFree)
  const popular = courses.filter(c => c.isPopular).slice(0, 5)

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="flex">

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-white/8 min-h-screen sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white"/>
              </div>
              <div>
                <p className="text-xs font-black text-white">HiTecH</p>
                <p className="text-[10px] text-accent-blue font-semibold">IT Learning</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input placeholder="Search courses…"
                className="w-full bg-dark-700 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
            </div>
          </div>

          <nav className="p-3 flex-1">
            {/* Library */}
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-2">Library</p>
            {sidebarCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-0.5 ${
                  activeCategory === cat.key
                    ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}>
                <cat.icon className="w-4 h-4 flex-shrink-0"/>
                {cat.label}
              </button>
            ))}

            {/* Trending */}
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mt-5 mb-2">Trending Topics</p>
            {['AI & Machine Learning', 'Cybersecurity', 'Cloud & Azure', 'E-Commerce', 'Digital Marketing'].map(t => (
              <button key={t} onClick={() => setActiveCategory(t.includes('AI') ? 'AI & Automation' : t.includes('Cyber') ? 'Cybersecurity & Azure' : t.includes('Cloud') ? 'Microsoft 365 & Azure' : t.includes('E-Com') ? 'E-Commerce' : 'Digital Marketing')}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-0.5">
                {t}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">

          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {sidebarCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.key ? 'bg-accent-blue border-accent-blue text-white' : 'bg-dark-700 border-white/10 text-gray-400'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── FREE RESOURCES — CV Templates ─────────────────── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-dark-800/60 overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-green-500/15">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎁</span>
                    <div>
                      <h2 className="text-base font-black text-white">Free Downloads — Professional CV Templates</h2>
                      <p className="text-xs text-gray-500">Industry-specific Word templates built by a senior IT practitioner. Download, customise, and start applying.</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black bg-green-500/15 border border-green-500/30 text-green-400 uppercase tracking-widest">
                    100% Free · No Sign-up
                  </span>
                </div>

                {/* Template cards */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[
                    {
                      file: 'CV-IT-Support-Engineer-L1-L2.docx',
                      title: 'IT Support Engineer',
                      level: 'L1 / L2',
                      icon: '🖥️',
                      color: 'text-sky-400 border-sky-500/25 bg-sky-500/8',
                      desc: 'Perfect for your first IT role or moving from L1 to L2. Includes ServiceNow, M365, AD skills.',
                      for: 'Entry Level · 0–3 years',
                    },
                    {
                      file: 'CV-Senior-IT-System-Engineer.docx',
                      title: 'Senior IT Engineer',
                      level: 'Senior Level',
                      icon: '⚙️',
                      color: 'text-accent-blue border-accent-blue/25 bg-accent-blue/8',
                      desc: 'Based on a real SAP senior engineer profile. Azure certs, ITSM, infrastructure, AI tools.',
                      for: 'Mid–Senior · 5–15 years',
                    },
                    {
                      file: 'CV-Azure-Cloud-Security-Engineer.docx',
                      title: 'Azure Security Engineer',
                      level: 'Specialist',
                      icon: '🛡️',
                      color: 'text-red-400 border-red-500/25 bg-red-500/8',
                      desc: 'AZ-500 level CV. Zero Trust, Intune, Defender, SIEM, PIM. Highly in-demand role.',
                      for: 'Specialist · 3–8 years',
                    },
                    {
                      file: 'CV-IT-Consultant-Freelancer.docx',
                      title: 'IT Consultant',
                      level: 'Freelancer',
                      icon: '💼',
                      color: 'text-purple-400 border-purple-500/25 bg-purple-500/8',
                      desc: 'For consultants and freelancers. Shows services, projects, engagement models.',
                      for: 'Consultant · Freelance',
                    },
                    {
                      file: 'CV-Career-Change-Into-IT.docx',
                      title: 'Career Change → IT',
                      level: 'Beginner',
                      icon: '🚀',
                      color: 'text-green-400 border-green-500/25 bg-green-500/8',
                      desc: 'Transitioning from another field? Shows how to frame transferable skills + home lab projects.',
                      for: 'Career Changer · Any',
                    },
                  ].map((t, i) => (
                    <div key={i} className={`rounded-xl border ${t.color} p-4 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform duration-200`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl">{t.icon}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${t.color}`}>{t.level}</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">{t.title}</p>
                        <p className="text-gray-500 text-[11px] leading-snug mb-2">{t.desc}</p>
                        <p className="text-[10px] text-gray-600 italic">{t.for}</p>
                      </div>
                      <a
                        href={`/cv-templates/${t.file}`}
                        download={t.file}
                        className="mt-auto flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Word
                      </a>
                    </div>
                  ))}
                </div>

                <div className="px-5 pb-4">
                  <p className="text-[11px] text-gray-600 italic">
                    💡 <strong className="text-gray-500">Tip:</strong> All templates are fully editable Microsoft Word (.docx) files. Replace placeholder text with your own details. No sign-up required — just download and start.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Learning Paths ── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <h2 className="text-lg font-black text-white mb-1">Build Skills for Your Goals</h2>
              <p className="text-gray-500 text-sm mb-5">Curated learning paths for IT professionals, entrepreneurs, and career changers.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {featuredTracks.map((track, i) => (
                  <div key={i} className={`rounded-xl border ${track.border} bg-gradient-to-br ${track.color} p-5 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer`}>
                    <span className="text-3xl mb-3 block">{track.icon}</span>
                    <h3 className="font-black text-white text-sm mb-1">{track.title}</h3>
                    <p className="text-gray-400 text-[11px] mb-3">{track.courses} courses</p>
                    <div className="flex flex-wrap gap-1">
                      {track.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Popular courses row ── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-white">Popular Courses</h2>
                <span className="text-xs text-gray-500">Highly rated · Most enrolled</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {popular.slice(0, 4).map(c => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </section>
          )}

          {/* ── Free Courses ── */}
          {free.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-green-500/20"/>
                <h2 className="text-base font-black text-green-400 uppercase tracking-widest whitespace-nowrap">🎁 Free Courses</h2>
                <div className="flex-1 h-px bg-green-500/20"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {free.map(c => <CourseCard key={c.id} course={c} />)}
              </div>
            </section>
          )}

          {/* ── Professional Courses ── */}
          {paid.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-accent-blue/20"/>
                <h2 className="text-base font-black text-accent-blue uppercase tracking-widest whitespace-nowrap">🎓 Professional Courses</h2>
                <div className="flex-1 h-px bg-accent-blue/20"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paid.map(c => <CourseCard key={c.id} course={c} />)}
              </div>
            </section>
          )}

          {/* ── Professional Credentials ── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <div className="glass-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="text-lg font-black text-white mb-2">Prepare, Earn &amp; Maintain Professional Credentials</h2>
                  <p className="text-gray-400 text-sm mb-4">All paid courses include a signed certificate of completion — recognised for your CV, LinkedIn, and client proposals.</p>
                  <a href="#inquiry" className="btn-primary inline-flex text-sm px-6 py-2.5">
                    Explore Certification Programmes <ArrowRight className="w-4 h-4"/>
                  </a>
                </div>
                <div className="flex-shrink-0 w-40 h-28 rounded-xl border border-white/10 bg-dark-700 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Award className="w-10 h-10 text-accent-blue mx-auto mb-2"/>
                    <p className="text-[10px] text-gray-400 font-semibold">HiTecH Technology HUB</p>
                    <p className="text-[9px] text-gray-600">Certificate of Completion</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Course Inquiry Form ── */}
          <section id="inquiry" className="mb-10">
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:border-r border-white/8">
                  <h2 className="text-xl font-black text-white mb-2">Course Inquiry</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">Interested in a course? Want corporate training for your team? Our team responds within 24 hours.</p>
                  <div className="space-y-4 mb-6">
                    {[
                      { n: '1', t: 'Tell us which course interests you', sub: 'Or what skill you want to develop' },
                      { n: '2', t: 'We confirm availability and session dates', sub: 'Online self-paced or live cohort' },
                      { n: '3', t: 'You enrol and get instant access', sub: 'All materials, exercises, and certificate' },
                    ].map(s => (
                      <div key={s.n} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                        <div>
                          <p className="text-gray-200 text-sm font-medium">{s.t}</p>
                          <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-4 border-t border-white/8">
                    <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors text-sm">
                      <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                      WhatsApp: +966 505 803 073
                    </a>
                    <a href="mailto:waqastayyab2004@gmail.com"
                      className="flex items-center gap-3 text-accent-blue hover:text-cyan-400 transition-colors text-sm">
                      <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5"/>
                      </div>
                      waqastayyab2004@gmail.com
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                      <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-green-400"/>
                      </div>
                      <h3 className="text-lg font-black text-white">Inquiry Sent!</h3>
                      <p className="text-gray-400 text-sm max-w-xs">Our team will respond within 24 hours with course details and next steps.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-outline text-sm px-5 py-2">Send Another</button>
                    </div>
                  ) : (
                    <form className="space-y-3" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name *</label>
                          <input type="text" placeholder="Your name" required
                            className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Email *</label>
                          <input type="email" placeholder="you@email.com" required
                            className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Phone / WhatsApp</label>
                        <input type="tel" placeholder="+966 5xx xxx xxxx"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Course Interested In *</label>
                        <select required className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50">
                          <option value="">Select a course…</option>
                          {courses.map(c => (
                            <option key={c.id} value={c.title}>{c.isFree ? '🎁 Free — ' : '🎓 Paid — '}{c.title}</option>
                          ))}
                          <option value="corporate">Corporate / Team Training (custom)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Current Role</label>
                        <input type="text" placeholder="e.g. IT Support, 2 years experience"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                        <textarea rows={2} placeholder="Any questions or specific goals?"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 resize-none"/>
                      </div>
                      <button type="submit" className="w-full bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        Send Inquiry <ArrowRight className="w-4 h-4"/>
                      </button>
                      <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3"/> Your details are kept private.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
