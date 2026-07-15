'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Shield, Cloud, Server, Zap, Monitor, Headphones,
  ArrowRight, MapPin, Wifi, Star, Users, TrendingUp, Award,
  Settings, Lock, Layers, CheckCircle, ChevronDown, ChevronUp,
  Globe, Cpu, Database, Code, Phone, Mail,
} from 'lucide-react'

/* ── DATA ──────────────────────────────────────────────────────────────── */

const stats = [
  { value: '15+', label: 'Years Enterprise IT' },
  { value: '44+', label: 'Projects Delivered' },
  { value: '200+', label: 'Users Supported' },
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
    title: 'Shared IT Specialist',
    desc: 'A cost-effective model where you get senior IT expertise shared across defined service areas. Ideal for SMBs and growing teams who need high-quality support without a full-time hire. Resources and expertise are available on demand.',
  },
  {
    icon: Star,
    title: 'Dedicated IT Consultant',
    desc: 'A personalised engagement with full focus on your environment. Deep knowledge of your systems, committed availability, and a single point of accountability. Best for enterprises with complex or regulated IT requirements.',
  },
  {
    icon: TrendingUp,
    title: 'Staff Augmentation',
    desc: 'Seamlessly integrate a senior IT specialist into your existing team. Whether short-term for a project or long-term for capacity, I plug directly into your workflows, tools, and communication channels.',
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

/* ── PAGE COMPONENT ─────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const [openProcess, setOpenProcess] = useState<number | null>(0)
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

      {/* ── MEET THE EXPERT ──────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50 border-y border-white/8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">Meet Your IT Specialist</h2>

          {/* Card — dark navy background, photo right like reference */}
          <div className="relative rounded-2xl overflow-hidden" style={{background:'linear-gradient(135deg,#0a1628 60%,#0d2040 100%)'}}>
            {/* Subtle diagonal lines bg */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(120deg,transparent,transparent 40px,rgba(59,130,246,0.3) 40px,rgba(59,130,246,0.3) 41px)'}}/>

            <div className="relative z-10 flex flex-col md:flex-row items-stretch">

              {/* Left — text content */}
              <div className="flex-1 p-8 md:p-10">
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

              {/* Right — photo with dark bg, cut-out style */}
              <div className="relative md:w-72 flex-shrink-0 flex items-end justify-center overflow-hidden"
                style={{background:'linear-gradient(180deg,#0d1e38 0%,#071020 100%)'}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/waqas-pro.jpg"
                  alt="Syed Waqas Tayyab — IT Specialist"
                  className="w-full h-80 md:h-full object-cover object-top"
                  style={{objectPosition:'center 0%'}}
                />
                {/* Bottom fade into dark */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#071020] to-transparent"/>
                {/* Side fade into content area */}
                <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-[#0a1628] to-transparent"/>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* ── WHY CHOOSE ME ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Why I&apos;m a Trusted IT Outsourcing Partner</h2>
          <p className="section-subheading">Clients choose me for measurable results — reduced downtime, stronger security, and IT that scales with their business.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {whyCards.map((w, i) => (
            <div key={i} className="glass-card p-7 hover:-translate-y-0.5 transition-transform duration-300">
              <div className="w-11 h-11 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-4">
                <w.icon className="w-5 h-5 text-accent-blue"/>
              </div>
              <h3 className="font-bold text-white mb-2">{w.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-lg">Explore what we can do for your business</p>
          <Link href="#contact-form" className="btn-primary px-8 py-3 whitespace-nowrap">Contact Me</Link>
        </div>
      </section>

      {/* ── DELIVERY MODELS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">The Right Service Delivery Model for You</h2>
            <p className="section-subheading">Whether you need flexible part-time support, a dedicated specialist, or team augmentation — we have a model that fits.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryModels.map((m, i) => (
              <div key={i} className="glass-card p-7 border-t-4 border-accent-blue/50 hover:-translate-y-0.5 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-5">
                  <m.icon className="w-6 h-6 text-accent-blue"/>
                </div>
                <h3 className="font-black text-white text-lg mb-3">{m.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-3">IT Services Provided</h2>
          <p className="section-subheading">Specialist services built on 15 years of hands-on enterprise experience — not templates, not theory.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {services.map((svc, i) => (
            <div key={i} className={`glass-card overflow-hidden flex flex-col border-l-4 ${svc.border} hover:-translate-y-1 transition-transform duration-300 ${(svc as any).isMedical ? 'ring-1 ring-rose-500/20' : ''}`}>
              <div className="h-44 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent"/>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-900/80 border border-white/10 text-gray-300">{svc.mode}</span>
                {/* HiTecH branding badge for medical */}
                {(svc as any).isMedical && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300">
                    HiTecH Technology HUB
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                {/* Icon — use Heart for medical, otherwise service icon */}
                <div className={`w-10 h-10 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center mb-4`}>
                  {(svc as any).isMedical
                    ? <span className="text-xl">🏥</span>
                    : <svc.icon className={`w-5 h-5 ${svc.color}`}/>
                  }
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{svc.title}</h3>
                <p className={`text-sm font-semibold ${svc.color} mb-4`}>{svc.tagline}</p>

                {/* Medical — extra HiTecH branding tagline */}
                {(svc as any).isMedical && (
                  <p className="text-xs text-gray-500 italic mb-3 border-l-2 border-rose-500/40 pl-3">
                    Delivered by HiTecH Technology HUB in partnership with certified HIPAA billing specialists (MTBC &amp; Bellmedex).
                  </p>
                )}

                <div className="space-y-1.5 mb-5 flex-1">
                  {svc.deliverables.map(d => (
                    <div key={d} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle className={`w-3.5 h-3.5 ${svc.color} flex-shrink-0 mt-0.5`}/>
                      {d}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {svc.tools.map(t => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
                {/* Medical billing — specialties + full details link */}
                {(svc as any).isMedical && (
                  <div className="mt-4 pt-4 border-t border-rose-500/15">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {['Mental Health', 'Internal Medicine', 'Chiropractic', 'Family Medicine', 'Transportation', 'DME'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300">{s}</span>
                      ))}
                    </div>
                    <Link href="/medical-billing"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-colors">
                      <span>🏥</span> See Full Service Details &amp; Get Free Billing Audit →
                    </Link>
                  </div>
                )}

                {/* E-Commerce — platforms + CTA */}
                {(svc as any).isEcom && (
                  <div className="mt-4 pt-4 border-t border-amber-500/15">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Platforms We Support</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[
                        { label: '📦 Amazon', color: 'text-orange-300 border-orange-500/25 bg-orange-500/10' },
                        { label: '🛍️ eBay', color: 'text-blue-300 border-blue-500/25 bg-blue-500/10' },
                        { label: '🌙 Noon', color: 'text-yellow-300 border-yellow-500/25 bg-yellow-500/10' },
                        { label: '🛒 Shopify', color: 'text-green-300 border-green-500/25 bg-green-500/10' },
                        { label: '🎨 Etsy', color: 'text-pink-300 border-pink-500/25 bg-pink-500/10' },
                        { label: '🌐 AliExpress', color: 'text-red-300 border-red-500/25 bg-red-500/10' },
                      ].map(p => (
                        <span key={p.label} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${p.color}`}>{p.label}</span>
                      ))}
                    </div>
                    <Link href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors">
                      <span>🛒</span> Get Free E-Commerce Consultation →
                    </Link>
                  </div>
                )}

                {/* Digital Marketing — social icons + CTA */}
                {(svc as any).isDigital && (
                  <div className="mt-4 pt-4 border-t border-pink-500/15">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Platforms & Networks</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[
                        { label: '📘 LinkedIn', color: 'text-blue-300 border-blue-500/25 bg-blue-500/10' },
                        { label: '📸 Instagram', color: 'text-pink-300 border-pink-500/25 bg-pink-500/10' },
                        { label: '📘 Facebook', color: 'text-indigo-300 border-indigo-500/25 bg-indigo-500/10' },
                        { label: '▶️ YouTube', color: 'text-red-300 border-red-500/25 bg-red-500/10' },
                        { label: '🐦 X/Twitter', color: 'text-sky-300 border-sky-500/25 bg-sky-500/10' },
                        { label: '🎵 TikTok', color: 'text-fuchsia-300 border-fuchsia-500/25 bg-fuchsia-500/10' },
                        { label: '🔍 Google SEO', color: 'text-green-300 border-green-500/25 bg-green-500/10' },
                      ].map(p => (
                        <span key={p.label} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${p.color}`}>{p.label}</span>
                      ))}
                    </div>
                    <Link href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold hover:bg-pink-500/20 transition-colors">
                      <span>📱</span> Get Free Digital Marketing Consultation →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="section-heading mb-3">How We Work Together</h2>
            <p className="section-subheading">A transparent, step-by-step process recognised for being purposeful and effective.</p>
          </div>
          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenProcess(openProcess === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-accent-blue font-black text-lg w-8 flex-shrink-0">{step.num}</span>
                    <h3 className="font-bold text-white">{step.title}</h3>
                  </div>
                  {openProcess === i
                    ? <ChevronUp className="w-5 h-5 text-accent-blue flex-shrink-0"/>
                    : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0"/>}
                </button>
                {openProcess === i && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{step.detail}</p>
                    {step.bullets.length > 0 && (
                      <ul className="space-y-1.5">
                        {step.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2 text-sm text-gray-500">
                            <CheckCircle className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5"/>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE BILLING EXPERT ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading mb-3">Meet Our Medical Billing Expert</h2>
            <p className="section-subheading">Our dedicated RCM specialist manages all medical billing operations — so you can focus entirely on patient care.</p>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Photo */}
              <div className="md:w-64 flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mujahid-profile.jpg" alt="Mujahid Hussain — Medical Billing Expert"
                  className="w-full h-72 md:h-full object-cover object-top"/>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent md:bg-gradient-to-l"/>
              </div>

              {/* Info */}
              <div className="flex-1 p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">Mujahid Hussain</h3>
                    <p className="text-accent-blue font-semibold text-sm">Team Lead Operations · Medical Billing & RCM Specialist</p>
                    <p className="text-gray-500 text-xs mt-1">Bellmedex Medical Billing Company · 2021 – Present</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/10 border border-green-500/30 text-green-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                    Available for RCM Projects
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-5 pb-5 border-b border-white/8">
                  {[
                    { v: '4+', l: 'Years RCM Experience' },
                    { v: 'HIPAA', l: 'Certified' },
                    { v: '98%+', l: 'Clean Claim Rate' },
                    { v: '8+', l: 'Billing Platforms' },
                  ].map(s => (
                    <div key={s.l}>
                      <div className="text-xl font-black gradient-text">{s.v}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  A highly motivated and results-driven RCM professional with deep expertise in Medical Billing, AR management, denial resolution, and team leadership. Currently serving as Team Lead Operations at Bellmedex Medical Billing Company, supervising billing teams, training staff, and driving revenue cycle performance for US healthcare practices.
                </p>

                {/* Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">RCM Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['AR Management', 'Denial Management', 'Payment Posting', 'VOB', 'Prior Auth', 'Appeals', 'Team Leadership', 'Revenue Cycle'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Billing Platforms</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['eClinicalWorks', 'Trizetto', 'Kareo', 'Simple Practice', 'TheraNest', 'Medifusion', 'My Client Plus', 'Genesis'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-dark-700 border border-white/10 text-gray-400">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-5">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Mental Health', 'Internal Medicine', 'Chiropractic', 'Family Medicine', 'Transportation / NEMT', 'DME'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-5 border-t border-white/8">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-3">Medical Billing Inquiries — Contact Directly</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://wa.me/923451525845" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp: +92 345 152 5845
                    </a>
                    <a href="mailto:adnanhamdani32@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue/10 border border-accent-blue/25 text-accent-blue text-xs font-semibold hover:bg-accent-blue/20 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      adnanhamdani32@gmail.com
                    </a>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-3 italic">
                    For IT services, cybersecurity, and general enquiries — contact Waqas directly via WhatsApp (+966 505 803 073) or email waqastayyab2004@gmail.com
                  </p>
                </div>
              </div>
            </div>
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
            <h2 className="section-heading mb-3">Project Case Studies</h2>
            <p className="section-subheading">Real engagements, real outcomes — delivered across enterprise environments in MENA and beyond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {caseStudies.map((c, i) => (
              <div key={i} className="glass-card overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent"/>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-900/80 border border-white/10 text-gray-300">{c.sector}</span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] bg-dark-900/80 border border-white/10 text-gray-400">
                      <MapPin className="w-2.5 h-2.5"/> {c.location}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-white mb-3">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                    {c.results.map(r => (
                      <div key={r} className="flex items-start gap-1.5 text-xs text-green-400">
                        <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5"/>
                        {r}
                      </div>
                    ))}
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
