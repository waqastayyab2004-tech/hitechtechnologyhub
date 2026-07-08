'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Lock, Star, Clock, Users,
  Award, Zap, Shield, Cloud, Server, Brain, Globe,
  Play, BookOpen, ChevronDown, ChevronUp, Mail, Phone,
} from 'lucide-react'

/* ── DATA ─────────────────────────────────────────────────────── */

const courses = [
  // FREE
  {
    id: 1,
    title: 'IT Career Roadmap: From L1 to Senior Engineer',
    category: 'Career & IT Foundations',
    level: 'Beginner',
    duration: '3 hours',
    students: '500+',
    rating: 4.9,
    price: 'Free',
    isFree: true,
    icon: '🗺️',
    color: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/8',
    badge: 'bg-green-500/15 text-green-400 border-green-500/30',
    description: 'A complete guide to building a 15-year IT career — certifications, skills, salary progression, and how to move from helpdesk to senior engineer at a multinational.',
    topics: [
      'IT career paths: helpdesk → L2/L3 → senior engineer',
      'Which certifications to get (and in what order)',
      'How to land roles at multinationals in MENA',
      'Building your portfolio and personal brand',
      'Real salary benchmarks by role and region',
    ],
  },
  {
    id: 2,
    title: 'ServiceNow Basics: Your First ITSM Dashboard',
    category: 'ITSM & ServiceNow',
    level: 'Beginner',
    duration: '2 hours',
    students: '350+',
    rating: 4.8,
    price: 'Free',
    isFree: true,
    icon: '🎫',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/8',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    description: 'Get up and running with ServiceNow in 2 hours. Learn ticket lifecycle, SLA setup, knowledge base creation, and basic dashboard reporting.',
    topics: [
      'Navigating the ServiceNow interface',
      'Creating and managing incidents',
      'Setting up SLA rules and targets',
      'Building a simple KB article',
      'Running your first performance report',
    ],
  },
  {
    id: 3,
    title: 'AI Tools for IT Professionals: Practical Guide',
    category: 'AI & Automation',
    level: 'Beginner',
    duration: '2.5 hours',
    students: '800+',
    rating: 5.0,
    price: 'Free',
    isFree: true,
    icon: '🤖',
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/8',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    description: 'Practical AI adoption for IT professionals — how to use ChatGPT, Claude, Copilot, and Gemini in your daily IT work. Real examples from enterprise environments.',
    topics: [
      'AI tools overview: ChatGPT, Claude, Copilot, Gemini',
      'Writing scripts and automations with AI',
      'Summarising email and tickets with AI',
      'AI-powered troubleshooting workflows',
      'Staying safe and compliant when using AI at work',
    ],
  },

  // PAID
  {
    id: 4,
    title: 'Microsoft 365 Administration Masterclass',
    category: 'Microsoft 365 & Azure',
    level: 'Intermediate',
    duration: '12 hours',
    students: '200+',
    rating: 4.9,
    price: '$149',
    isFree: false,
    icon: '☁️',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/8',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    description: 'Complete M365 administration from scratch — Exchange Online, Teams governance, SharePoint, Intune MDM, Conditional Access, and M365 Copilot. Based on 8 years of real enterprise M365 management.',
    topics: [
      'Tenant setup, domains, and licensing',
      'Exchange Online: mailboxes, mail flow, quarantine',
      'Teams admin: policies, governance, MTR setup',
      'SharePoint architecture and permissions management',
      'Intune / Autopilot: zero-touch device provisioning',
      'Conditional Access and MFA deployment',
      'M365 Copilot: deployment and adoption',
      'PowerShell automation for M365 admins',
    ],
    certificate: true,
  },
  {
    id: 5,
    title: 'Azure Security Engineer: Zero Trust Implementation',
    category: 'Cybersecurity & Azure',
    level: 'Advanced',
    duration: '16 hours',
    students: '150+',
    rating: 5.0,
    price: '$199',
    isFree: false,
    icon: '🛡️',
    color: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/8',
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    description: 'Go beyond the AZ-500 exam. Learn to design and deploy Zero Trust architecture in a real enterprise environment — Conditional Access, Defender, Intune compliance, PIM, and Azure Sentinel.',
    topics: [
      'Zero Trust architecture design principles',
      'Azure AD / Entra ID deep dive',
      'Conditional Access policy design and testing',
      'Microsoft Intune compliance + Autopilot',
      'Defender for M365: EDR, SIEM integration',
      'Privileged Identity Management (PIM)',
      'Azure Sentinel: SIEM setup and alerting',
      'Secure Score optimisation (real case study: 41% → 78%)',
    ],
    certificate: true,
  },
  {
    id: 6,
    title: 'ServiceNow ITSM: Enterprise Configuration & Automation',
    category: 'ITSM & ServiceNow',
    level: 'Intermediate',
    duration: '10 hours',
    students: '120+',
    rating: 4.8,
    price: '$129',
    isFree: false,
    icon: '⚙️',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/8',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    description: 'Build a production-ready ServiceNow environment from scratch — SLA frameworks, business rules, workflow automation, KB strategy, and PowerBI reporting integration. Based on managing 1,500+ tickets/year.',
    topics: [
      'SLA framework design (P1–P4 policies)',
      'Auto-assignment rules and routing logic',
      'Business rules and client scripts',
      'Knowledge base architecture and quality standards',
      'Change management workflow setup',
      'REST API integration with external systems',
      'PowerBI dashboard connected to SNOW data',
      'Migration from legacy ticketing to ServiceNow',
    ],
    certificate: true,
  },
  {
    id: 7,
    title: 'Python Automation for IT Engineers',
    category: 'AI & Automation',
    level: 'Intermediate',
    duration: '14 hours',
    students: '180+',
    rating: 4.9,
    price: '$159',
    isFree: false,
    icon: '⚡',
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/8',
    badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    description: 'Learn Python automation built specifically for IT engineers — REST API integration, ServiceNow automation, email agents, WhatsApp alerts, and PowerBI data pipelines. Every script is used in real production.',
    topics: [
      'Python fundamentals for IT (no prior coding needed)',
      'REST API calls: GET, POST, authentication',
      'ServiceNow API: read/write tickets via Python',
      'Microsoft Graph API: email and calendar automation',
      'Building a daily email summary agent',
      'WhatsApp SLA alerts via Twilio',
      'Scheduled scripts with cron / Task Scheduler',
      'PowerBI data feeds from Python scripts',
    ],
    certificate: true,
  },
  {
    id: 8,
    title: 'IT Infrastructure for Corporates: Enterprise Setup',
    category: 'IT Infrastructure',
    level: 'Intermediate',
    duration: '18 hours',
    students: '90+',
    rating: 4.9,
    price: '$179',
    isFree: false,
    icon: '🖥️',
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/8',
    badge: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    description: 'A complete enterprise IT infrastructure course — from Cisco networking and HP server setup to MDM deployment and meeting room AV. Built on 15 years of running infrastructure at a global multinational.',
    topics: [
      'Enterprise network design: Cisco, Aruba, WAN/LAN',
      'HP server room setup: racking, cabling, RAID',
      'Active Directory and GPO administration',
      'SCCM / Intune: device management at scale',
      'Mass OS deployment: Windows, macOS, Linux',
      'Meeting room AV: Teams MTR, Logitech, Evoko',
      'VPN, NAC controllers, and wireless security',
      'IT asset lifecycle management',
    ],
    certificate: true,
  },
  {
    id: 9,
    title: 'Amazon FBA & Seller Central: Start Selling on Amazon',
    category: 'E-Commerce',
    level: 'Beginner',
    duration: '6 hours',
    students: '300+',
    rating: 4.9,
    price: 'Free',
    isFree: true,
    icon: '📦',
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/8',
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    description: 'Complete beginner guide to selling on Amazon — account setup, product research, FBA logistics, listing optimisation, and getting your first sale. Includes MENA and international seller guidance.',
    topics: [
      'Amazon Seller Central account setup (individual & professional)',
      'Product research: tools and strategies to find winners',
      'FBA vs FBM — which model is right for you',
      'Creating optimised product listings (title, bullets, images)',
      'Pricing strategy and Buy Box optimisation',
      'Amazon PPC basics: sponsored ads on a small budget',
      'Selling from Saudi Arabia / MENA to US & UK markets',
      'Common mistakes that get accounts suspended',
    ],
  },
  {
    id: 10,
    title: 'Multi-Platform E-Commerce: Amazon, eBay, Noon & More',
    category: 'E-Commerce',
    level: 'Intermediate',
    duration: '14 hours',
    students: '150+',
    rating: 4.8,
    price: '$139',
    isFree: false,
    icon: '🛒',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/8',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    description: 'Master selling across multiple e-commerce platforms — Amazon, eBay, Noon, Etsy, Shopify, and AliExpress. Learn platform differences, cross-listing tools, fulfilment strategies, and scaling to multiple markets simultaneously.',
    topics: [
      'Amazon: advanced FBA, brand registry, A+ content',
      'eBay: listing, pricing, eBay Global Shipping Programme',
      'Noon: MENA marketplace setup and seller support',
      'Etsy: handmade, digital products, and brand building',
      'Shopify: your own store connected to all platforms',
      'Cross-listing tools: AutoDS, Vendoo, Sellbrite',
      'Inventory management across multiple warehouses',
      'Customer service, returns, and dispute resolution',
      'Scaling: from $1K to $10K/month revenue roadmap',
      'Tax, VAT, and compliance for international sellers',
    ],
    certificate: true,
  },
]

const categories = ['All', 'Career & IT Foundations', 'Microsoft 365 & Azure', 'Cybersecurity & Azure', 'ITSM & ServiceNow', 'AI & Automation', 'IT Infrastructure', 'E-Commerce']

const stats = [
  { v: '10', l: 'Courses Available', c: 'text-accent-blue' },
  { v: '3,000+', l: 'Students Trained', c: 'text-green-400' },
  { v: '4.9★', l: 'Average Rating', c: 'text-yellow-400' },
  { v: '4', l: 'Free Courses', c: 'text-purple-400' },
]

/* ── PAGE ─────────────────────────────────────────────────────── */

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [submitted, setSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? courses
    : courses.filter(c => c.category === activeCategory)

  const free = filtered.filter(c => c.isFree)
  const paid = filtered.filter(c => !c.isFree)

  return (
    <div className="min-h-screen bg-dark-900">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80&auto=format&fit=crop"
            alt="IT Training" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent-blue">IT Training</span>
          </div>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5"/> Online & Live Training
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest">
                <Play className="w-3.5 h-3.5"/> 3 Free Courses Available
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              IT Training by a<br/>
              <span className="gradient-text">Senior Practitioner</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-3 max-w-2xl">
              Learn enterprise IT skills from someone who does this every day — not a lecturer. Real tools, real workflows, real corporate environments.
            </p>
            <p className="text-sm text-gray-500 italic mb-10 border-l-2 border-accent-blue/40 pl-4">
              &ldquo;15+ years at a global multinational teaching me what works in production — and what doesn&apos;t. Now sharing it all.&rdquo;
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#courses" className="btn-primary text-base px-8 py-3.5">
                Browse All Courses <ArrowRight className="w-4 h-4"/>
              </a>
              <a href="#inquiry" className="btn-outline text-base px-8 py-3.5">
                Course Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="py-10 px-4 border-y border-white/8 bg-dark-800/40">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.l}>
              <div className={`text-3xl font-black ${s.c} mb-1`}>{s.v}</div>
              <div className="text-gray-500 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURSES ───────────────────────────────────────────── */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-3">All Training Courses</h2>
          <p className="section-subheading">Practical, hands-on courses built from real enterprise experience — not slides and theory.</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-accent-blue border-accent-blue text-white'
                  : 'bg-dark-700 border-white/10 text-gray-400 hover:border-accent-blue/40 hover:text-gray-300'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Free courses */}
        {free.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-green-500/20"/>
              <h3 className="text-sm font-black text-green-400 uppercase tracking-widest px-3">🎁 Free Courses</h3>
              <div className="flex-1 h-px bg-green-500/20"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {free.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Paid courses */}
        {paid.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-accent-blue/20"/>
              <h3 className="text-sm font-black text-accent-blue uppercase tracking-widest px-3">🎓 Professional Courses</h3>
              <div className="flex-1 h-px bg-accent-blue/20"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paid.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── WHY LEARN FROM ME ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Why Learn From a Practitioner?</h2>
            <p className="section-subheading">Not a trainer who reads from textbooks — someone who implements this in production every week.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏢', t: 'Real Corporate Experience', d: '15+ years managing IT at a global multinational — every lesson is from a real project, not a lab.' },
              { icon: '🎯', t: 'Focused on What Matters', d: 'No fluff. Every hour of content directly applies to your job or your next career step.' },
              { icon: '🌍', t: 'MENA & Global Context', d: 'Understand how enterprise IT works in Saudi Arabia, MENA, and global corporate environments specifically.' },
              { icon: '🤖', t: 'AI-Native Teaching', d: 'Every course includes how AI tools accelerate the subject — because that\'s how real engineers work today.' },
              { icon: '📜', t: 'Certificate of Completion', d: 'All paid courses include a signed certificate of completion — useful for your CV and LinkedIn.' },
              { icon: '💬', t: 'Direct Access', d: 'Ask questions, get real answers. No ticket system — direct WhatsApp and email support included.' },
            ].map((w, i) => (
              <div key={i} className="glass-card p-6 hover:-translate-y-0.5 transition-transform duration-300">
                <span className="text-3xl mb-4 block">{w.icon}</span>
                <h3 className="font-bold text-white mb-2 text-sm">{w.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ──────────────────────────────────────── */}
      <section id="inquiry" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left */}
              <div className="p-10 lg:border-r border-white/8">
                <h2 className="text-2xl font-black text-white mb-2">Course Inquiry</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Interested in a course? Want a custom corporate training for your team? Get in touch — I&apos;ll respond within 24 hours.
                </p>
                <div className="space-y-5 mb-8">
                  {[
                    { n: '1', t: 'Tell me which course interests you', sub: 'Or describe what you want to learn' },
                    { n: '2', t: 'I confirm availability and next session dates', sub: 'Online, self-paced or live cohort' },
                    { n: '3', t: 'You enroll and get instant access', sub: 'All materials, exercises, and certificate' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                      <div>
                        <p className="text-gray-200 text-sm font-medium">{s.t}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/8 space-y-3">
                  <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors text-sm">
                    <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    WhatsApp: +966 505 803 073
                  </a>
                  <a href="mailto:waqastayyab2004@gmail.com"
                    className="flex items-center gap-3 text-accent-blue hover:text-cyan-400 transition-colors text-sm">
                    <div className="w-9 h-9 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                      <Mail className="w-4 h-4"/>
                    </div>
                    waqastayyab2004@gmail.com
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <div className="p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400"/>
                    </div>
                    <h3 className="text-xl font-black text-white">Inquiry Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">I&apos;ll get back to you within 24 hours with course details, availability, and next steps.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline text-sm px-6 py-2">Send Another</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
                      <input type="text" placeholder="Your full name" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
                      <input type="email" placeholder="you@email.com" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone / WhatsApp</label>
                      <input type="tel" placeholder="+966 5xx xxx xxxx"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Course Interested In *</label>
                      <select required className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50 transition-colors">
                        <option value="">Select a course…</option>
                        {courses.map(c => (
                          <option key={c.id} value={c.title}>{c.isFree ? '🎁 ' : '🎓 '}{c.title} — {c.price}</option>
                        ))}
                        <option value="corporate">Corporate / Team Training (custom)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Current Role & Experience Level</label>
                      <input type="text" placeholder="e.g. IT Support, 2 years experience"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message</label>
                      <textarea rows={3} placeholder="Any specific goals or questions about the course?"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"/>
                    </div>
                    <button type="submit" className="w-full bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      Send Inquiry <ArrowRight className="w-4 h-4"/>
                    </button>
                    <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3"/> Your details are kept private. No spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ── Course Card Component ─────────────────────────────────── */
function CourseCard({ course }: { course: typeof courses[0] }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={`glass-card overflow-hidden flex flex-col border-t-4 ${course.border} hover:-translate-y-1 transition-transform duration-300`}>

      {/* Top */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-3xl">{course.icon}</span>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${course.badge}`}>
            {course.price}
          </span>
        </div>

        <h3 className="font-black text-white text-base leading-snug mb-1">{course.title}</h3>
        <p className={`text-xs font-semibold ${course.color} mb-3`}>{course.category}</p>
        <p className="text-gray-400 text-xs leading-relaxed mb-4">{course.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3"/> {course.duration}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3 h-3"/> {course.students}
          </span>
          <span className="flex items-center gap-1 text-xs text-yellow-400">
            <Star className="w-3 h-3 fill-yellow-400"/> {course.rating}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Award className="w-3 h-3"/> {course.level}
          </span>
        </div>

        {/* Topics */}
        <div className="space-y-1.5 mb-2">
          {(showAll ? course.topics : course.topics.slice(0, 3)).map(t => (
            <div key={t} className="flex items-start gap-2 text-xs text-gray-500">
              <CheckCircle className={`w-3 h-3 ${course.color} flex-shrink-0 mt-0.5`}/>
              {t}
            </div>
          ))}
        </div>
        {course.topics.length > 3 && (
          <button onClick={() => setShowAll(!showAll)}
            className={`text-[11px] font-semibold ${course.color} flex items-center gap-1 mt-1`}>
            {showAll ? <><ChevronUp className="w-3 h-3"/>Show less</> : <><ChevronDown className="w-3 h-3"/>+{course.topics.length - 3} more topics</>}
          </button>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-5 pt-4 border-t border-white/5 flex gap-2">
        <a href="#inquiry"
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
            course.isFree
              ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
              : 'bg-accent-blue text-white hover:bg-blue-500'
          }`}>
          {course.isFree ? <><Play className="w-3.5 h-3.5"/> Enroll Free</> : <><BookOpen className="w-3.5 h-3.5"/> Enroll — {course.price}</>}
        </a>
        <a href="#inquiry"
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-dark-700 border border-white/10 text-gray-300 hover:bg-dark-600 transition-colors whitespace-nowrap">
          Inquiry
        </a>
      </div>

    </div>
  )
}
