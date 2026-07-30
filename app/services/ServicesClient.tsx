'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Shield, Cloud, Server, Zap, Monitor, Headphones,
  ArrowRight, MapPin, Wifi, Star, Users, TrendingUp, Award,
  Settings, Lock, Layers, CheckCircle, ChevronDown, ChevronUp,
  Globe, Cpu, Database, Code, Phone, Mail, Bot, Brain, Sparkles,
  Building2, Laptop, UserCheck, Briefcase, Clock, CalendarCheck,
} from 'lucide-react'

/* ── DATA ──────────────────────────────────────────────────────────────── */

const stats = [
  { value: '15+', label: 'Years Enterprise IT' },
  { value: '44+', label: 'Projects Delivered' },
  { value: '50+', label: 'Vendors & Clients Managed' },
  { value: '0', label: 'SLA Breaches (6 mo)' },
]

const expertPoints = [
  'Builds and leads high-performing, scalable IT environments',
  'Ensures reliability and resilience across critical enterprise systems',
  'Leads large-scale transformations, migrations, and AI automation projects',
]

const whyCards = [
  { icon: TrendingUp, title: 'Proven Downtime Reduction', desc: 'Proactive monitoring and rapid incident response keeps your systems online. My clients report up to 80% reduction in unplanned outages within 3 months.' },
  { icon: Layers, title: 'Support Across All Levels', desc: 'L1 to L3 — end-user support, infrastructure engineering, and strategic IT leadership. One specialist across the full stack.' },
  { icon: Users, title: 'Quick Staff Adjustments', desc: 'Scale your IT capability up or down instantly. No hiring cycles, no overhead — senior expertise on demand.' },
  { icon: Award, title: 'Cost Savings Approach', desc: 'Outsourcing to a senior specialist delivers enterprise IT at a fraction of a full-time team cost. ROI typically visible within 60 days.' },
  { icon: Lock, title: 'Security & Compliance', desc: 'Azure Security Engineer certified. Every engagement includes security hardening, compliance checks, and documented audit trails.' },
  { icon: Zap, title: 'AI & ML Integration', desc: 'AI-native approach — automation, intelligent monitoring, and predictive analytics built into every service from day one.' },
]

const deliveryModels = [
  {
    icon: Users,
    badge: '⭐ Top Rated',
    title: 'Shared IT Specialist',
    desc: 'Senior IT expertise shared across defined service areas — on demand, without a full-time hire. Ideal for SMBs and growing teams who need enterprise-grade support at a fraction of the cost.',
  },
  {
    icon: Star,
    badge: '🏆 Most Popular',
    title: 'Dedicated IT Consultant',
    desc: 'Full-focus engagement with deep knowledge of your environment, committed availability, and a single point of accountability. Best for enterprises with complex or regulated IT requirements.',
  },
  {
    icon: TrendingUp,
    badge: '🔥 High Demand',
    title: 'Staff Augmentation',
    desc: 'A senior IT specialist plugged directly into your existing team — short-term for a project or long-term for capacity. I integrate into your workflows, tools, and communication channels from day one.',
  },
  {
    icon: Bot,
    badge: '🤖 AI — New',
    title: 'AI Workflow Automation',
    desc: 'End-to-end AI automation of your operational workflows — email triage, ticket routing, SLA monitoring, and reporting. Reduce manual overhead by 60–80% using production-grade AI agents built on Claude, OpenAI, and MCP.',
  },
  {
    icon: Brain,
    badge: '🤖 AI — New',
    title: 'Corporate AI Training',
    desc: 'Hands-on AI training tailored to your team and industry. From Claude Code to ChatGPT for enterprise — your staff learns to deploy AI that actually works in production, not just demos. Live sessions, real use cases, measurable adoption.',
  },
  {
    icon: Sparkles,
    badge: '🤖 AI — New',
    title: 'AI Strategy & Roadmap',
    desc: 'A structured AI adoption roadmap built around your business. Identify the highest-ROI automation opportunities, select the right tools, and deliver a phased implementation plan your leadership can approve and your team can execute.',
  },
]

const services = [
  {
    icon: Server,
    title: 'L1–L3 IT Infrastructure Support',
    tagline: 'Enterprise infrastructure that never sleeps',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&auto=format&fit=crop',
    mode: 'Onsite + Remote',
    color: 'text-accent-blue',
    border: 'border-l-accent-blue',
    deliverables: [
      'L1/L2/L3 technical support & escalation management',
      'Network: Cisco, Aruba, WAN/LAN/VPN configuration',
      'Server administration — Windows Server & Linux',
      'HP server room build-out, racking, cabling',
      'SCCM / Autopilot / Intune device management',
      'Proactive monitoring & incident response 24/7',
    ],
    tools: ['Cisco', 'Aruba', 'Windows Server', 'Linux', 'SCCM', 'ServiceNow', 'Intune'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Azure Security',
    tagline: 'Zero Trust. Zero compromises.',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote',
    color: 'text-red-400',
    border: 'border-l-red-500',
    deliverables: [
      'Azure Security Engineer-level architecture & hardening',
      'Zero Trust: Conditional Access, MFA, Named Locations',
      'Microsoft Intune / Autopilot MDM rollout',
      'Defender for M365 + Endpoint Protection',
      'Trellix / McAfee compliance & HIPS management',
      'Security audit, Secure Score improvement, compliance',
    ],
    tools: ['Azure AD', 'Intune', 'Defender', 'Trellix', 'JamF', 'SIEM', 'PIM'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Microsoft 365',
    tagline: 'Your M365 tenant — governed, secured, optimised',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote',
    color: 'text-sky-400',
    border: 'border-l-sky-500',
    deliverables: [
      'M365 tenant setup, licensing & governance',
      'Azure AD / Entra ID identity management',
      'Exchange Online, Teams & SharePoint administration',
      'Teams governance, naming conventions, retention',
      'OneDrive backup, recovery & data management',
      'M365 Copilot deployment & user adoption training',
    ],
    tools: ['M365', 'Azure', 'SharePoint', 'Teams MTR', 'Exchange Online', 'PowerShell'],
  },
  {
    icon: Headphones,
    title: 'ServiceNow & ITSM',
    tagline: 'Service management that actually closes tickets',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote',
    color: 'text-emerald-400',
    border: 'border-l-emerald-500',
    deliverables: [
      'ServiceNow instance setup, configuration & migration',
      'SLA framework design & ITIL-aligned KPI structure',
      'Workflow automation, business rules, notifications',
      'Knowledge Base architecture & quality standards',
      'ITSM reporting dashboards (SNOW + PowerBI)',
      'Legacy to SNOW migration planning & execution',
    ],
    tools: ['ServiceNow', 'ITIL v3', 'IT Direct', 'PowerBI', 'REST API', 'BMC Remedy'],
  },
  {
    icon: Zap,
    title: 'AI Automation & Development',
    tagline: 'Automate the work that drains your team daily',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote',
    color: 'text-purple-400',
    border: 'border-l-purple-500',
    deliverables: [
      'Python automation scripts for ITSM, email & reporting',
      'Power Apps / Power Automate business workflows',
      'AI dashboards integrating SNOW, SharePoint, ERP data',
      'WhatsApp & email SLA alert pipelines (Twilio)',
      'Custom IT asset management web applications',
      'PowerBI dashboards with live data connectors',
    ],
    tools: ['Python', 'Power Apps', 'FastAPI', 'REST APIs', 'PowerBI', 'Twilio'],
  },
  {
    icon: Monitor,
    title: 'IT Asset Management',
    tagline: 'Know what you own. Know where it is. Know what it costs.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
    mode: 'Onsite + Remote',
    color: 'text-yellow-400',
    border: 'border-l-yellow-500',
    deliverables: [
      'Asset register setup & migration from Excel',
      'Full lifecycle: procurement, tagging, assignment, disposal',
      'Ariba procurement workflow integration',
      'Warranty tracking, refresh planning & budget forecasting',
      'Onboarding/offboarding asset workflows with DocuSign',
      'Audit-ready reports & certified disposal documentation',
    ],
    tools: ['SAP Ariba', 'ServiceNow', 'PowerBI', 'SharePoint', 'DocuSign', 'Python'],
  },
  {
    icon: Shield,
    title: 'Medical Billing & RCM Outsourcing',
    tagline: 'Maximize collections. Eliminate billing errors. Focus on patient care.',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote · US Practices',
    color: 'text-rose-400',
    border: 'border-l-rose-500',
    isMedical: true,
    deliverables: [
      'Full Revenue Cycle Management (RCM) — end-to-end',
      'Insurance eligibility verification & prior authorizations',
      'Medical coding: ICD-10, CPT, HCPCS — payer compliant',
      'Clean claim submission & rejection monitoring',
      'A/R follow-up, denial management & appeals',
      'Payment posting, patient billing & monthly KPI reports',
      'HIPAA certified — patient data fully protected',
      'Platforms: eCW, Office Ally, Tebra, Athenahealth & more',
    ],
    tools: ['Care Cloud', 'eClinicalWorks', 'Office Ally', 'Tebra', 'Athenahealth', 'HIPAA Compliant'],
  },
  {
    icon: Globe,
    title: 'E-Commerce Setup, Support & Growth',
    tagline: 'Launch, grow and scale your online store — Amazon to Shopify.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote · Global',
    color: 'text-amber-400',
    border: 'border-l-amber-500',
    isEcom: true,
    deliverables: [
      'Amazon Seller Central setup, FBA configuration & listing',
      'eBay store setup, listing optimisation & Global Shipping',
      'Noon marketplace (MENA) account setup & management',
      'Shopify store build — theme, payments, shipping & apps',
      'Etsy shop setup for digital or handmade products',
      'Product research, pricing strategy & competitor analysis',
      'Amazon / eBay PPC ad campaign setup & management',
      'Cross-platform inventory sync & order management tools',
      'Customer service workflow & returns/dispute guidance',
      'Seller account health monitoring & suspension recovery',
    ],
    tools: ['Amazon FBA', 'eBay', 'Noon', 'Shopify', 'Etsy', 'AutoDS', 'Sellbrite'],
  },
  {
    icon: Zap,
    title: 'Digital Marketing & Social Media',
    tagline: 'Grow your brand, attract clients, and dominate your niche online.',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&auto=format&fit=crop',
    mode: 'Remote · Global',
    color: 'text-pink-400',
    border: 'border-l-pink-500',
    isDigital: true,
    deliverables: [
      '📘 LinkedIn strategy for B2B and professional brand building',
      '📸 Instagram & Facebook page setup, content & ads',
      '▶️ YouTube channel setup and video SEO optimisation',
      '🐦 Twitter/X and TikTok profile management',
      '🔍 SEO setup: Google ranking, keyword strategy, meta tags',
      '📧 Email marketing: list building, campaigns, automation',
      '💰 Google Ads & Meta Ads setup and management',
      'Google Analytics (GA4) + Search Console setup & reporting',
      'Content calendar planning and scheduling tools setup',
      'Personal brand strategy for IT consultants & freelancers',
    ],
    tools: ['LinkedIn', 'Meta Ads', 'Google Ads', 'GA4', 'Mailchimp', 'Canva', 'Buffer'],
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Needs Assessment',
    detail: 'A 30-minute consultation to understand your IT environment, pain points, and objectives. We review your existing systems, identify risks, and define the scope.',
    bullets: ['Current infrastructure and tooling review', 'Incident history and SLA gap analysis', 'Security posture and compliance assessment', 'Priority areas and quick-win identification'],
  },
  {
    num: '02',
    title: 'Proposal & Service Planning',
    detail: 'A clear written proposal with scope of work, timelines, deliverables, and pricing. No hidden fees — everything is documented before we start.',
    bullets: [],
  },
  {
    num: '03',
    title: 'Roles & Access Onboarding',
    detail: 'NDA signing, access provisioning, tool setup, and a team introduction session. I document everything from day one.',
    bullets: [],
  },
  {
    num: '04',
    title: 'Service Delivery & Execution',
    detail: 'Systematic delivery with weekly status updates. Direct access — no account managers, no relay. You communicate with the person doing the work.',
    bullets: [],
  },
  {
    num: '05',
    title: 'Handover, Documentation & Ongoing Support',
    detail: 'Full knowledge transfer, runbooks, and documentation at project end. Optional ongoing retainer for continued support and monitoring.',
    bullets: [],
  },
]

const techStack = [
  { name: 'ServiceNow', category: 'ITSM' },
  { name: 'Microsoft Azure', category: 'Cloud' },
  { name: 'Microsoft 365', category: 'Cloud' },
  { name: 'Intune / Autopilot', category: 'MDM' },
  { name: 'Azure AD / Entra ID', category: 'Identity' },
  { name: 'Defender for M365', category: 'Security' },
  { name: 'Cisco / Aruba', category: 'Network' },
  { name: 'SCCM / ConfigMgr', category: 'Endpoint' },
  { name: 'JamF', category: 'Mac MDM' },
  { name: 'PowerBI', category: 'Analytics' },
  { name: 'Power Apps', category: 'Low-Code' },
  { name: 'Python / FastAPI', category: 'Dev' },
  { name: 'SharePoint', category: 'Collaboration' },
  { name: 'SAP Ariba', category: 'Procurement' },
  { name: 'Trellix / McAfee', category: 'Security' },
  { name: 'Twilio', category: 'Automation' },
]

const caseStudies = [
  {
    title: 'Zero Trust Security Rollout — 200+ Users',
    sector: 'Global Enterprise',
    location: 'Saudi Arabia',
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&q=80&auto=format&fit=crop',
    desc: 'Deployed Zero Trust architecture across a multinational — Intune MDM, Conditional Access, MFA, and Defender for M365. Device compliance rate increased from 62% to 94% in 90 days.',
    results: ['Device compliance: 62% → 94%', 'Secure Score: 41% → 78%', 'Legacy auth attacks: eliminated', 'Setup time: 3.5 hrs → 45 min'],
  },
  {
    title: 'SNOW SLA Automation — 1,500 Tickets/Year',
    sector: 'IT Service Management',
    location: 'MENA Region',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80&auto=format&fit=crop',
    desc: 'Designed and automated ServiceNow SLA monitoring pipeline. Python daemons poll SNOW every 5 minutes, fire WhatsApp alerts 30 minutes before breach. Zero SLA breaches for 6 consecutive months.',
    results: ['Zero SLA breaches for 6 months', 'Daily monitoring time: 45 min → 0', 'First Contact Resolution: 75%+', '1,500+ tickets/year managed'],
  },
  {
    title: 'Office IT Infrastructure — 1.2M SAR Project',
    sector: 'Corporate IT Infrastructure',
    location: 'Riyadh, Saudi Arabia',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop',
    desc: 'Led end-to-end IT infrastructure deployment for a major office renovation — 15 meeting rooms (MTR, Crestron, Poly), full network rebuild, server room, and digital signage deployment.',
    results: ['15 meeting rooms deployed', 'Cisco/Aruba network rebuilt', '200+ users migrated seamlessly', 'Zero business downtime during move'],
  },
]

const testimonials = [
  {
    quote: 'Waqas transformed our IT operations completely. From SNOW chaos to a fully automated, SLA-compliant service desk in under 3 months. Outstanding.',
    name: 'IT Manager',
    role: 'Regional Enterprise, MENA',
    stars: 5,
  },
  {
    quote: 'The Azure security rollout was flawless. Our Secure Score went from 41% to 78%. Every step was documented, communicated, and delivered on time.',
    name: 'Head of Technology',
    role: 'Multinational Corporation',
    stars: 5,
  },
  {
    quote: 'We needed a senior IT specialist for our office move and infrastructure rebuild. Waqas delivered everything — on budget, on schedule, zero disruption.',
    name: 'Operations Director',
    role: 'Corporate Headquarters, KSA',
    stars: 5,
  },
]

const faqs = [
  { q: 'What is the difference between Onsite and Remote IT services?', a: 'Onsite means I physically work at your location — ideal for infrastructure setup, device deployment, and hands-on technical work. Remote services cover everything that can be delivered digitally: cloud administration, ServiceNow, cybersecurity, automation development. Many engagements combine both depending on the phase.' },
  { q: 'How do your services compare to a full-time IT hire?', a: 'You get senior-level expertise (Azure-certified, 10+ years, C-suite track record) without the cost, benefits overhead, and management burden of a full-time employee. Most clients achieve better IT outcomes at 40–60% lower cost than a comparable in-house hire.' },
  { q: 'Do you work with small businesses or only large enterprises?', a: 'Both. My background is in global enterprises, but I apply the same rigour to SMBs — often delivering enterprise-quality IT management that was previously inaccessible to smaller organisations.' },
  { q: 'What happens if something goes wrong outside working hours?', a: 'Critical support arrangements include defined response time SLAs and out-of-hours escalation protocols. Our team brings 10+ years of supporting C-suite executives — availability and responsiveness are non-negotiable in every engagement.' },
  { q: 'Do you sign NDAs?', a: 'Yes. All engagements include a mutual NDA before any access or information sharing. We operate at the highest levels of corporate IT where confidentiality is essential and absolute.' },
  { q: 'How quickly can you start?', a: 'Typically within 1–2 weeks of proposal agreement — NDA, access setup, and onboarding. For urgent situations, faster start is possible. Contact me to discuss your timeline.' },
]

const engagementTypes = [
  { icon: Clock, label: 'Short-Term', desc: 'Days to weeks — project sprints, cover, urgent deployments', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: CalendarCheck, label: 'Long-Term', desc: 'Months to years — embedded specialist, managed service', color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20' },
  { icon: Briefcase, label: 'Permanent', desc: 'Full-time placement — hire through us, no agency fees', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
]

const consultants: {
  name: string; role: string; level: string; skills: string[]; location: string;
  available: string; engagements: string[]; bio: string; contact?: string;
}[] = [
  // ─── ADD YOUR CONSULTANTS HERE ──────────────────────────────────────────────
  // Copy the block below and fill in the details for each person:
  //
  // {
  //   name: 'Full Name',
  //   role: 'Job Title',
  //   level: 'Senior | Mid | Junior | Lead',
  //   skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  //   location: 'City, Country · Onsite / Remote',
  //   available: 'Immediate | 2 Weeks Notice | From [Month]',
  //   engagements: ['Short-Term', 'Long-Term', 'Permanent'],   // pick 1–3
  //   bio: 'One or two sentences about background and what they deliver.',
  //   contact: 'WhatsApp or email (optional)',
  // },
  // ────────────────────────────────────────────────────────────────────────────
]

/* ── PAGE COMPONENT ─────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => { document.title = 'IT Services — Syed Waqas Tayyab' }, [])

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
            alt="IT Operations" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/92 to-dark-900/50"/>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent-blue">IT Services</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
              Available for New Projects — MENA &amp; Remote Worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Outsource IT.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-400 to-purple-400">
                Accelerate Everything.
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-3 max-w-2xl">
              Senior IT consulting and managed services — <strong className="text-white">Onsite across MENA</strong> and <strong className="text-white">Remote globally</strong>. Enterprise-grade IT delivered with the speed and flexibility you actually need.
            </p>
            <p className="text-sm text-gray-500 italic mb-10 border-l-2 border-accent-blue/40 pl-4">
              &ldquo;10+ years managing IT for global multinationals — now available to transform your operations, security, and automation without the overhead of a full department.&rdquo;
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#contact-form" className="btn-primary text-base px-8 py-3.5">
                Book Free Consultation <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link href="#services" className="btn-outline text-base px-8 py-3.5">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY MODELS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">The Right Service Delivery Model for You</h2>
            <p className="section-subheading">Whether you need flexible part-time support, a dedicated specialist, AI automation, or team augmentation — we have a model that fits.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryModels.map((m, i) => (
              <div key={i} className="glass-card p-7 border-t-4 border-accent-blue/50 hover:-translate-y-0.5 transition-transform duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                    <m.icon className="w-6 h-6 text-accent-blue"/>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/8 text-gray-300 border border-white/10">{m.badge}</span>
                </div>
                <h3 className="font-black text-white text-lg mb-3">{m.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONSITE & REMOTE STAFFING ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-widest mb-6">
                <Users className="w-3.5 h-3.5"/> Onsite &amp; Remote IT Staffing
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
                The Right IT Professional.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">
                  Deployed for Your Project.
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-xl">
                We have a network of top-tier IT professionals — engineers, consultants, architects, and specialists — ready to be placed onsite at your location or deployed remotely, exactly when you need them.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl border-l-2 border-accent-blue/40 pl-4">
                Whether you need one specialist for a two-week deployment, a team for a six-month infrastructure project, or a permanent senior hire — we match the right person to the right job. No guesswork. No generic CVs. Tell us your requirement and we build your shortlist.
              </p>
            </div>

            {/* Right — 3 capability cards */}
            <div className="lg:w-96 space-y-4 flex-shrink-0">
              {[
                { icon: Building2, title: 'Onsite Deployment', desc: 'Professionals placed at your office, data centre, or project site — hands-on delivery from day one.', color: 'text-accent-blue' },
                { icon: Laptop, title: 'Remote Specialists', desc: 'Fully remote IT talent integrated into your tools, systems, and team — no location barrier.', color: 'text-cyan-400' },
                { icon: UserCheck, title: 'Right Person, Right Job', desc: 'We discuss your exact requirement and match skill, experience level, and availability — not just a CV match.', color: 'text-purple-400' },
              ].map((c, i) => {
                const Icon = c.icon
                return (
                  <div key={i} className="glass-card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${c.color}`}/>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{c.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Engagement type strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {engagementTypes.map((e, i) => {
              const Icon = e.icon
              return (
                <div key={i} className={`glass-card p-6 flex items-center gap-5 border ${e.border}`}>
                  <div className={`w-12 h-12 rounded-xl ${e.bg} border ${e.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${e.color}`}/>
                  </div>
                  <div>
                    <h3 className={`font-black text-base mb-1 ${e.color}`}>{e.label}</h3>
                    <p className="text-gray-500 text-xs leading-snug">{e.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA banner */}
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-10"
            style={{background:'linear-gradient(135deg,#0a1a35 0%,#0d2040 50%,#0a1628 100%)'}}>
            <div className="absolute inset-0 opacity-10"
              style={{backgroundImage:'repeating-linear-gradient(120deg,transparent,transparent 40px,rgba(59,130,246,0.4) 40px,rgba(59,130,246,0.4) 41px)'}}/>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Let&apos;s Discuss Your Requirement</h3>
                <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                  Tell us the role, the skills, the location, and how long you need them — we&apos;ll match you with the right professional from our network and handle the deployment logistics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-500/25 transition-colors whitespace-nowrap">
                  <Phone className="w-4 h-4"/> WhatsApp Us
                </a>
                <a href="#contact-form"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white text-sm font-bold hover:bg-blue-500 transition-colors whitespace-nowrap">
                  Send a Brief <ArrowRight className="w-4 h-4"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IT TALENT POOL ────────────────────────────────────────────── */}
      <section id="talent-pool" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">Available Professionals</p>
              <h2 className="section-heading mb-3">IT Talent Pool</h2>
              <p className="text-gray-400 max-w-2xl">
                A curated roster of vetted IT professionals available for short-term, long-term, and permanent engagements — onsite or remote. Each profile is a real person, not a job board listing.
              </p>
            </div>
            <a href="#contact-form"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue/10 border border-accent-blue/25 text-accent-blue text-sm font-bold hover:bg-accent-blue/20 transition-colors whitespace-nowrap">
              Submit a Requirement <ArrowRight className="w-4 h-4"/>
            </a>
          </div>

          {/* Consultant cards — renders when consultants array is populated */}
          {consultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {consultants.map((c, i) => (
                <div key={i} className="glass-card p-6 flex flex-col hover:-translate-y-0.5 transition-transform duration-200">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-purple-500/10 border border-white/10 flex items-center justify-center text-lg font-black text-white flex-shrink-0">
                      {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 border border-green-500/25 text-green-400 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/> {c.available}
                    </span>
                  </div>
                  {/* Name + role */}
                  <h3 className="font-black text-white text-base mb-0.5">{c.name}</h3>
                  <p className="text-accent-blue text-xs font-semibold mb-1">{c.role}</p>
                  <p className="text-gray-600 text-[10px] mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3"/> {c.location}
                  </p>
                  {/* Bio */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{c.bio}</p>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">{s}</span>
                    ))}
                  </div>
                  {/* Engagement types */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.engagements.map(e => {
                      const cfg = engagementTypes.find(t => t.label === e)
                      return (
                        <span key={e} className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg?.border ?? 'border-white/10'} ${cfg?.color ?? 'text-gray-400'}`}>{e}</span>
                      )
                    })}
                  </div>
                  {/* Level badge */}
                  <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wide">{c.level}</span>
                    <a href={c.contact ? `mailto:${c.contact}` : '#contact-form'}
                      className="text-xs font-bold text-accent-blue hover:text-cyan-400 transition-colors flex items-center gap-1">
                      Enquire <ArrowRight className="w-3 h-3"/>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state — shown until profiles are added */
            <div className="glass-card p-12 text-center mb-12 border border-dashed border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8 text-accent-blue"/>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Profiles Coming Soon</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed mb-6">
                We are currently onboarding vetted IT professionals to this roster. Send us your requirement now — we&apos;ll match you from our network immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-500/25 transition-colors">
                  <Phone className="w-4 h-4"/> WhatsApp: +966 505 803 073
                </a>
                <a href="mailto:waqastayyab2004@gmail.com"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-bold hover:bg-accent-blue/20 transition-colors">
                  <Mail className="w-4 h-4"/> Email Us Your Brief
                </a>
              </div>
            </div>
          )}

          {/* Are you a consultant? CTA */}
          <div className="glass-card p-7 flex flex-col md:flex-row items-center justify-between gap-6 border border-accent-blue/15 bg-accent-blue/3">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-accent-blue"/>
              </div>
              <div>
                <h3 className="font-black text-white text-base mb-1">Are You an IT Professional Looking for Work?</h3>
                <p className="text-gray-400 text-sm max-w-lg">
                  We place experienced IT consultants, engineers, and specialists with clients across MENA and globally. If you are available for short-term, long-term, or permanent roles — get in touch and we will add you to our talent pool.
                </p>
              </div>
            </div>
            <a href="mailto:waqastayyab2004@gmail.com?subject=IT Professional — Talent Pool Application"
              className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-blue text-white text-sm font-bold hover:bg-blue-500 transition-colors whitespace-nowrap">
              Submit Your Profile <ArrowRight className="w-4 h-4"/>
            </a>
          </div>
        </div>
      </section>

      {/* ── MEET THE EXPERT ──────────────────────────────────────────── */}      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50 border-y border-white/8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">Meet Your IT Specialist</h2>

          {/* Card — dark navy background, photo right like reference */}
          <div className="relative rounded-2xl overflow-hidden" style={{background:'linear-gradient(135deg,#0a1628 60%,#0d2040 100%)'}}>
            {/* Subtle diagonal lines bg */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(120deg,transparent,transparent 40px,rgba(59,130,246,0.3) 40px,rgba(59,130,246,0.3) 41px)'}}/>

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-stretch">

              {/* Left — text content */}
              <div className="flex-1 p-6 md:p-10">
                <h3 className="text-2xl font-black text-white mb-1">Syed Waqas Tayyab</h3>
                <p className="text-accent-blue font-semibold text-sm mb-6">Senior IT System Engineer · IT Service Delivery Lead · AI Automation Specialist</p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-8 mb-6 pb-6 border-b border-white/8">
                  {stats.map(s => (
                    <div key={s.label}>
                      <div className="text-2xl font-black text-white">{s.value}</div>
                      <div className="text-gray-500 text-xs mt-0.5 max-w-[120px] leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  A senior IT specialist with 10+ years managing enterprise IT operations, cybersecurity, cloud infrastructure, and AI automation across global multinationals — keeping critical systems secure, reliable, and ahead of the curve.
                </p>

                <div className="space-y-2 mb-8">
                  {expertPoints.map(p => (
                    <div key={p} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5"/>
                      {p}
                    </div>
                  ))}
                </div>

                {/* CTA strip */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-white/8">
                  <p className="text-gray-200 font-medium text-sm max-w-xs leading-snug">Ready to assess your IT challenge and help you solve it. Schedule a call to start.</p>
                  <Link href="#contact-form"
                    className="flex-shrink-0 bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                    Request Consultation
                  </Link>
                </div>
              </div>

              {/* Right — photo */}
              <div className="relative md:w-72 flex-shrink-0 flex items-end justify-center overflow-hidden"
                style={{background:'linear-gradient(180deg,#0d1e38 0%,#071020 100%)'}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/waqas-pro.jpg"
                  alt="Syed Waqas Tayyab — IT Specialist"
                  className="w-full h-48 md:h-full object-cover object-top"
                  style={{objectPosition:'center 10%'}}
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#071020] to-transparent"/>
                <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-[#0a1628] to-transparent hidden md:block"/>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* ── WHY CHOOSE ME ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">Why Work With Me</p>
          <h2 className="section-heading mb-3">A Trusted IT Outsourcing Partner</h2>
          <p className="text-gray-400 text-lg max-w-2xl">Clients choose me for measurable results — reduced downtime, stronger security, and IT that scales with their business.</p>
        </div>
        {/* Asymmetric grid: large feature left, 2-col grid right */}
        <div className="grid lg:grid-cols-5 gap-5 mb-8">
          {/* Featured card — spans 2 cols, larger */}
          {(() => { const FeaturedIcon = whyCards[0].icon; return (
          <div className="lg:col-span-2 glass-card p-8 flex flex-col justify-between border-l-4 border-accent-blue/50 hover:-translate-y-0.5 transition-transform duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-5">
                <FeaturedIcon className="w-6 h-6 text-accent-blue"/>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">{whyCards[0].title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{whyCards[0].desc}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/8">
              <p className="text-5xl font-black text-accent-blue">80%</p>
              <p className="text-gray-500 text-sm mt-1">reduction in unplanned outages reported by clients within 3 months</p>
            </div>
          </div>
          )})()}
          {/* 2x2 grid right */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {whyCards.slice(1).map((w, i) => (
              <div key={i} className="glass-card p-6 hover:-translate-y-0.5 transition-transform duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors">
                  <w.icon className="w-5 h-5 text-accent-blue"/>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{w.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-accent-blue/15 bg-accent-blue/5">
          <div>
            <p className="text-white font-semibold">Ready to see what enterprise IT expertise looks like?</p>
            <p className="text-gray-400 text-sm mt-0.5">Free 30-min consultation — no commitment, real advice.</p>
          </div>
          <Link href="#contact-form" className="btn-primary px-8 py-3 whitespace-nowrap flex-shrink-0">Book Free Consultation</Link>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Core IT services */}
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">Core IT Services</p>
          <h2 className="section-heading mb-3">IT Services Provided</h2>
          <p className="text-gray-400 max-w-2xl">Specialist services built on 15 years of hands-on enterprise experience — not templates, not theory.</p>
        </div>
        {/* Stripe-style horizontal service rows */}
        <div className="space-y-3 mb-16">
          {services.filter(s => !(s as any).isMedical && !(s as any).isEcom && !(s as any).isDigital).map((svc, i) => (
            <div key={i} className={`glass-card group hover:border-white/15 transition-all duration-200`}
              style={{ borderLeft: `3px solid ${svc.color.replace('text-','').replace('-400','').replace('accent-blue','#3b82f6').includes('#') ? svc.color : ''}` }}>
              <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-5">
                {/* Icon + title block */}
                <div className="flex items-center gap-4 lg:w-72 shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center shrink-0
                    group-hover:border-white/20 transition-colors">
                    <svc.icon className={`w-5 h-5 ${svc.color}`}/>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-snug">{svc.title}</h3>
                    <p className={`text-xs font-medium ${svc.color} mt-0.5`}>{svc.mode}</p>
                  </div>
                </div>
                {/* Tagline */}
                <p className="text-gray-400 text-sm lg:w-64 shrink-0 lg:border-l lg:border-white/8 lg:pl-5">{svc.tagline}</p>
                {/* Deliverables — scrollable on mobile */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {svc.deliverables.slice(0, 4).map(d => (
                    <span key={d} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/3 border border-white/6 px-2.5 py-1 rounded-lg">
                      <CheckCircle className={`w-3 h-3 ${svc.color} shrink-0`}/>
                      {d}
                    </span>
                  ))}
                  {svc.deliverables.length > 4 && (
                    <span className="text-xs text-gray-600 px-2.5 py-1">+{svc.deliverables.length - 4} more</span>
                  )}
                </div>
                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 lg:w-48 shrink-0 lg:border-l lg:border-white/8 lg:pl-5">
                  {svc.tools.slice(0, 4).map(t => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Billing link card */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-5 border border-rose-500/15 bg-rose-500/3 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 text-xl">🏥</div>
            <div>
              <h3 className="font-black text-white text-base mb-0.5">Medical Billing &amp; RCM Outsourcing</h3>
              <p className="text-gray-400 text-sm">Full Revenue Cycle Management for US healthcare practices — coding, claims, A/R, denials, and reporting. HIPAA certified.</p>
            </div>
          </div>
          <Link href="/medical-billing"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-bold hover:bg-rose-500/20 transition-colors whitespace-nowrap">
            View Full Details <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">How We Work</p>
            <h2 className="section-heading mb-3">From First Call to Full Delivery</h2>
            <p className="text-gray-400 max-w-2xl">A transparent, step-by-step process — purposeful, documented, and with no surprises.</p>
          </div>
          {/* Horizontal step bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" style={{zIndex:0}}/>
            {processSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center px-4 mb-8 md:mb-0" style={{zIndex:1}}>
                {/* Number circle */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 font-black text-lg
                  bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/30 text-accent-blue">
                  {step.num}
                </div>
                <h3 className="font-bold text-white text-sm mb-2 leading-snug">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.detail.split('—')[0].trim()}</p>
                {step.bullets.length > 0 && (
                  <div className="mt-3 text-left w-full max-w-[160px]">
                    {step.bullets.slice(0, 2).map(b => (
                      <p key={b} className="text-[10px] text-gray-600 flex items-start gap-1 mb-1">
                        <span className="text-accent-blue mt-0.5">·</span>{b}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="section-heading mb-3">Tech Stack</h2>
          <p className="section-subheading max-w-2xl">Proven enterprise tools and modern platforms — selected for reliability, security, and the value they deliver to your operations.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {techStack.map(t => (
            <div key={t.name} className="glass-card px-4 py-3 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wide bg-accent-blue/10 px-2 py-0.5 rounded">{t.category}</span>
              <span className="text-sm font-medium text-gray-300">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">Proven Results</p>
            <h2 className="section-heading mb-3">Project Case Studies</h2>
            <p className="text-gray-400 max-w-2xl">Real engagements, real outcomes — delivered across enterprise environments in MENA and beyond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((c, i) => (
              <div key={i} className="glass-card overflow-hidden flex flex-col group hover:-translate-y-0.5 transition-transform duration-200">
                <div className="h-40 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/40 to-transparent"/>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-900/80 border border-white/10 text-gray-300">{c.sector}</span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] bg-dark-900/80 border border-white/10 text-gray-400">
                      <MapPin className="w-2.5 h-2.5"/> {c.location}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-white mb-2 leading-snug">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{c.desc}</p>
                  {/* Metric highlights — large numbers */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    {c.results.map(r => {
                      const num = r.match(/[\d%→+]+/g)?.[0] || ''
                      const label = r.replace(num, '').replace(/^[\s:–—-]+/, '').trim()
                      return (
                        <div key={r} className="bg-white/3 rounded-xl p-3">
                          <p className="text-accent-blue font-black text-lg leading-none">{num}</p>
                          <p className="text-gray-500 text-[10px] mt-1 leading-snug">{label}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Testimonials</h2>
          <p className="section-subheading">What clients say after working with a senior IT specialist — not a generic support ticket system.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-7 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-white text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-3">FAQ</h2>
          <p className="text-gray-500 text-sm mb-10">Straight answers before we talk.</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <h3 className="font-semibold text-white text-sm">{faq.q}</h3>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-accent-blue flex-shrink-0"/>
                    : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0"/>}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM CTA ──────────────────────────────────────────── */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-10 lg:border-r border-white/8">
                <h2 className="text-3xl font-black text-white mb-3">Book a Free IT Consultation</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">30 minutes. No commitment. Real advice from a senior IT specialist who has solved it before.</p>
                <div className="space-y-5 mb-8">
                  {[
                    { n: '1', t: 'You describe your IT challenge in the form →' },
                    { n: '2', t: 'Our specialist contacts you after reviewing your requirements' },
                    { n: '3', t: 'We sign an NDA if needed to ensure full confidentiality' },
                    { n: '4', t: 'I submit a clear proposal with scope, timeline, and pricing' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent-blue/15 border border-accent-blue/25 text-accent-blue text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                      <p className="text-gray-300 text-sm">{s.t}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/8">
                  <p className="text-gray-500 text-xs mb-4 uppercase tracking-widest font-semibold">Contact directly</p>
                  <div className="space-y-2">
                    <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-green-400 text-sm hover:text-green-300 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Phone className="w-4 h-4"/>
                      </div>
                      WhatsApp: +966 505 803 073
                    </a>
                    <a href="mailto:waqastayyab2004@gmail.com"
                      className="flex items-center gap-3 text-accent-blue text-sm hover:text-cyan-400 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                        <Mail className="w-4 h-4"/>
                      </div>
                      waqastayyab2004@gmail.com
                    </a>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4"/>
                      </div>
                      Riyadh, Saudi Arabia · Remote Worldwide
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="p-10">
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
                    <input type="text" placeholder="Your full name" required
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Corporate Email *</label>
                    <input type="email" placeholder="you@company.com" required
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" placeholder="+966 5xx xxx xxxx"
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Service Required</label>
                    <select className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50 transition-colors">
                      <option value="">Select a service…</option>
                      <option>IT Infrastructure & L2/L3 Support</option>
                      <option>Cybersecurity & Azure Security</option>
                      <option>Cloud & Microsoft 365</option>
                      <option>ServiceNow & ITSM</option>
                      <option>AI Automation & Development</option>
                      <option>IT Asset Management</option>
                      <option>Other / General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Describe Your Requirements *</label>
                    <textarea rows={4} placeholder="Tell me about your IT challenge, current environment, and what you want to achieve…" required
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"/>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <input type="checkbox" id="nda" className="mt-1 accent-accent-blue"/>
                    <label htmlFor="nda" className="text-xs text-gray-500">I want to protect my data by signing an NDA before sharing details.</label>
                  </div>
                  <button type="submit" className="w-full btn-primary py-3.5 text-sm font-bold justify-center">
                    Send Request <ArrowRight className="w-4 h-4"/>
                  </button>
                  <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3"/> Your privacy is protected. No spam, ever.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
