'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Lock, Shield, Globe, Users,
  TrendingUp, Award, Clock, DollarSign, FileText, Phone,
  ChevronDown, ChevronUp, Star, Zap, Mail,
} from 'lucide-react'

/* ── DATA ─────────────────────────────────────────────────────────── */

const rcmServices = [
  {
    num: '01',
    title: 'Verification of Benefits',
    desc: 'Verify insurance eligibility and coverage before every claim. Confirm prior authorizations or referrals required by payer.',
    icon: Shield,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    num: '02',
    title: 'Medical Coding (ICD-10, CPT, HCPCS)',
    desc: 'Accurate code assignment based on clinical documentation. Full compliance with payer guidelines and CMS regulations.',
    icon: FileText,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    num: '03',
    title: 'Charge Entry & Clean Claim Submission',
    desc: 'Accurate charge entry with correct codes, modifiers, provider and facility data. Electronic and paper claim submission with rejection monitoring.',
    icon: Zap,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    num: '04',
    title: 'Payment Posting & Reconciliation',
    desc: 'Post payments from EOBs/ERAs. Apply contractual adjustments, co-pays, deductibles, and write-offs. Reconcile with bank deposits.',
    icon: DollarSign,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    num: '05',
    title: 'A/R Follow-Up & Denial Management',
    desc: 'Track unpaid and denied claims. Timely follow-up with payers. Root cause denial analysis, appeals preparation, and resubmission.',
    icon: TrendingUp,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    num: '06',
    title: 'Patient Billing & Support',
    desc: 'Accurate patient statements, billing inquiry handling, payment plan management, and friendly balance clarification.',
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    num: '07',
    title: 'Reporting & KPI Analytics',
    desc: 'Weekly/monthly performance reports tracking collection rate, aging A/R, denial trends, and revenue optimisation insights.',
    icon: Award,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    num: '08',
    title: 'HIPAA Compliance & Data Security',
    desc: 'Strict HIPAA compliance, regular billing audits, clean coding practices, and secure systems protecting patient data at all times.',
    icon: Lock,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
]

const specialties = [
  { name: 'Mental Health', icon: '🧠' },
  { name: 'Internal Medicine', icon: '⚕️' },
  { name: 'Chiropractic', icon: '🦴' },
  { name: 'Family Medicine', icon: '👨‍👩‍👧' },
  { name: 'Transportation', icon: '🚑' },
  { name: 'DME / Durable Medical Equipment', icon: '🏥' },
]

const platforms = [
  'Care Cloud', 'eClinicalWorks (eCW)', 'Office Ally',
  'Tebra', 'CollaborateMD', 'Athenahealth', 'FreeChiro',
]

const earningExample = [
  { label: 'Provider monthly collections', value: '$100,000' },
  { label: 'Billing fee (4%)', value: '$4,000' },
  { label: 'Operating expenses', value: '$1,000' },
  { label: 'Net profit per client', value: '$3,000' },
]

const whyUs = [
  { icon: Shield, title: 'HIPAA Certified & Compliant', desc: 'Full HIPAA compliance on every engagement. Patient data protected with the highest privacy and security standards.' },
  { icon: Globe, title: 'US-Focused Offshore Model', desc: 'Offshore efficiency with US-standard quality. You get a dedicated team without the overhead of in-house billing staff.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Claims submitted within 24 hours of charge entry. A/R follow-up initiated within 48 hours of denial or non-payment.' },
  { icon: TrendingUp, title: 'Performance-Based Pricing', desc: 'We charge 3–5% of collections — we only earn when you earn. No hidden fees, no flat monthly costs eating into your revenue.' },
  { icon: Award, title: '3+ Years RCM Expertise', desc: 'Certified medical biller with hands-on experience across multiple specialties, payers, and practice management platforms.' },
  { icon: Users, title: 'Dedicated Account Management', desc: 'Direct access to your billing team. Real-time updates, transparent reporting, and responsive communication — always.' },
]

const faqs = [
  {
    q: 'What is your pricing model?',
    a: 'We charge between 3% and 5% of total monthly collections, depending on your specialty and volume. No flat fees — we earn only when you earn. A trial period is available for new clients.',
  },
  {
    q: 'How do you handle HIPAA compliance?',
    a: 'All team members are HIPAA certified. We use encrypted, secure systems for all data transmission and storage. Regular internal audits ensure clean coding and billing practices at all times.',
  },
  {
    q: 'Which practice management systems do you support?',
    a: 'We work with Care Cloud, eClinicalWorks (eCW), Office Ally, Tebra, CollaborateMD, Athenahealth, FreeChiro, and more. We adapt to your existing system — no migration required.',
  },
  {
    q: 'Do you handle denials and appeals?',
    a: 'Yes — denial management is a core service. We identify root causes, prepare detailed appeal letters, track outcomes, and resubmit until maximum reimbursement is achieved.',
  },
  {
    q: 'How quickly do you submit claims?',
    a: 'Clean claims are submitted electronically within 24 hours of charge entry. Rejected claims are corrected and resubmitted within 24–48 hours of identification.',
  },
  {
    q: 'Are you available for practices outside the US?',
    a: 'Our billing expertise is focused on US payers and insurance systems. We serve practices across the United States, including those with international medical tourism components.',
  },
]

export default function MedicalBillingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80&auto=format&fit=crop"
            alt="Medical billing"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-accent-blue transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-accent-blue">Medical Billing</span>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Accepting New Clients — US &amp; UK
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-3 h-3" /> HIPAA Certified
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Medical Billing &amp;<br />
              <span className="gradient-text">RCM Outsourcing</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-4 max-w-2xl">
              Full-cycle Revenue Cycle Management for US medical practices — delivered offshore at a fraction of in-house cost, with <strong className="text-white">HIPAA-certified</strong> accuracy and compliance.
            </p>

            <p className="text-sm text-gray-500 italic mb-10 border-l-2 border-accent-blue/40 pl-4">
              &ldquo;We handle your complete billing backend — from eligibility verification to payment posting and denial appeals — so you focus entirely on patient care.&rdquo;
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact-form" className="btn-primary text-base px-8 py-3.5">
                Get a Free Billing Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="btn-outline text-base px-8 py-3.5">
                View All RCM Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-10 px-4 border-y border-white/8 bg-dark-800/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: '3–5%', l: 'Of Collections Only', c: 'text-green-400' },
            { v: '24hr', l: 'Claim Submission', c: 'text-accent-blue' },
            { v: '98%+', l: 'Clean Claim Rate', c: 'text-purple-400' },
            { v: 'HIPAA', l: 'Fully Certified', c: 'text-red-400' },
          ].map(s => (
            <div key={s.l}>
              <div className={`text-3xl font-black ${s.c} mb-1`}>{s.v}</div>
              <div className="text-gray-500 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEET THE EXPERT ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50 border-y border-white/8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">Meet Your Medical Billing Expert</h2>

          {/* Expert card — Portfolio style with circular photo */}
          <div className="glass-card overflow-hidden mb-8">
            <div className="flex flex-col sm:flex-row gap-8 p-8">

              {/* Photo — large circular with glow + badge + skill tags */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <style>{`
                  @keyframes expertGlow {
                    0%,100% { box-shadow: 0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(99,102,241,0.2); }
                    50%     { box-shadow: 0 0 40px rgba(239,68,68,0.8), 0 0 80px rgba(99,102,241,0.4); }
                  }
                  .expert-glow { animation: expertGlow 3s ease-in-out infinite; }
                `}</style>

                {/* Outer glow ring */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/30 to-indigo-500/20 blur-xl scale-110" />
                  {/* Photo circle */}
                  <div className="expert-glow relative w-48 h-48 rounded-full overflow-hidden border-2 border-rose-400/60 z-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/mujahid-billing-expert.jpg" alt="Mujahid Hussain"
                      className="w-full h-full object-cover" style={{objectPosition:'center 0%'}}/>
                  </div>
                  {/* Rotating dashed ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-rose-400/30 scale-110"
                    style={{animation:'orbit1 12s linear infinite'}}/>
                </div>

                {/* Available badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-dark-700/90 border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"/>
                  <span className="text-xs font-semibold text-white">Available for Projects</span>
                </div>

                {/* Skill tags — like in screenshot */}
                <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px]">
                  {[
                    { label: '🏥 Medical Billing', color: 'border-rose-500/40 text-rose-300 bg-rose-500/8' },
                    { label: '💳 AR Management', color: 'border-orange-500/40 text-orange-300 bg-orange-500/8' },
                    { label: '🔍 Denial Mgmt', color: 'border-purple-500/40 text-purple-300 bg-purple-500/8' },
                    { label: '📋 ICD-10/CPT', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/8' },
                    { label: '⚕️ HIPAA Certified', color: 'border-green-500/40 text-green-300 bg-green-500/8' },
                  ].map(t => (
                    <span key={t.label} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${t.color} whitespace-nowrap`}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">Mujahid Hussain</h3>
                    <p className="text-rose-400 font-semibold text-sm">Team Lead Operations · Medical Billing & RCM Specialist</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/10 border border-green-500/30 text-green-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>Available
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-white/8">
                  {[
                    { v: '4+', l: 'Years RCM', c: 'text-rose-400' },
                    { v: 'HIPAA', l: 'Certified', c: 'text-green-400' },
                    { v: '98%+', l: 'Clean Claims', c: 'text-accent-blue' },
                    { v: '10+', l: 'Billing Platforms', c: 'text-purple-400' },
                    { v: '500+', l: 'Providers Served', c: 'text-yellow-400' },
                  ].map(s => (
                    <div key={s.l}>
                      <div className={`text-lg font-black ${s.c}`}>{s.v}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  A highly motivated RCM professional with deep expertise in Medical Billing, AR management, denial resolution, and billing team leadership. Currently serving as Team Lead Operations at Bellmedex — supervising billing teams, training staff, and driving revenue cycle performance for US healthcare practices.
                </p>

                {/* Experience */}
                <div className="space-y-1.5 mb-4">
                  {[
                    'Team Lead Operations — Bellmedex Medical Billing (2021–Present): Supervised 10+ billing specialists, reduced denial rate by 35%',
                    'Account Operations Manager — MTBC (2020–2021): Managed multi-specialty billing operations, AR follow-up, and payer escalations',
                    'Implemented automated claim scrubbing reducing rejections by 40% across 50+ provider accounts',
                    'Generated weekly/monthly performance reports for management with KPI dashboards',
                    'Trained 15+ new billing staff on payer guidelines, coding compliance, and denial workflows',
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5"/>
                      {p}
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">RCM Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {['AR Management', 'Denial Management', 'Payment Posting', 'VOB', 'Prior Auth', 'Appeals', 'Claim Rejection', 'Revenue Analysis', 'Payer Negotiations', 'Compliance'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">Platforms</p>
                    <div className="flex flex-wrap gap-1">
                      {['eClinicalWorks', 'Trizetto', 'Kareo', 'Simple Practice', 'TheraNest', 'Medifusion', 'My Client Plus', 'Genesis', 'Green Way Intergy', 'MS Excel'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-dark-700 border border-white/10 text-gray-400">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {['Mental Health', 'Internal Medicine', 'Chiropractic', 'Family Medicine', 'Transportation', 'DME'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education + contact */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/8">
                  <p className="text-xs text-gray-500">🎓 BS Computer Science — University of AJK Muzaffarabad &nbsp;·&nbsp; English · Urdu · Hindko</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-colors">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      +966 505 803 073
                    </a>
                    <a href="mailto:waqastayyab2004@gmail.com"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-blue/10 border border-accent-blue/25 text-accent-blue text-xs font-bold hover:bg-accent-blue/20 transition-colors">
                      waqastayyab2004@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ORG CHART ── */}
          <div className="mt-10">
            <h3 className="text-lg font-black text-white mb-1">Billing Team Structure</h3>
            <p className="text-gray-500 text-sm mb-8">Mujahid leads a dedicated RCM team covering all billing functions — real team details coming soon.</p>

            {/* Org chart container */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[640px]">

                {/* Level 1 — Head of Medical Services: Dr. Abbas */}
                <div className="flex justify-center mt-12 mb-0">
                  <div className="flex flex-col items-center">
                    <div className="relative bg-gradient-to-b from-[#0a2a1f] to-[#071820] border-2 border-emerald-500/60 rounded-2xl px-6 pb-5 pt-16 w-64 text-center shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.7)] bg-dark-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/dr-abbas-tayyab.jpg" alt="Dr. Syed Abbas Tayyab"
                            className="w-full h-full object-cover" style={{objectPosition:'center 8%'}}/>
                        </div>
                      </div>
                      <p className="text-sm font-black text-white">Dr. Syed Abbas Tayyab</p>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Head of Medical Services</p>
                      <p className="text-[9px] text-gray-500 mt-1">Emergency Medicine · GMC UK · MRCEM</p>
                    </div>
                    {/* Connector down to Mujahid */}
                    <div className="w-px h-8 bg-gradient-to-b from-emerald-500/60 to-accent-blue/40"/>
                  </div>
                </div>

                {/* Level 2 — Team Lead: Mujahid */}
                <div className="flex justify-center mb-0">
                  <div className="flex flex-col items-center">
                    <div className="relative bg-gradient-to-b from-[#1e3a5f] to-[#0f2040] border-2 border-accent-blue/50 rounded-2xl px-6 pb-5 pt-16 w-56 text-center shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent-blue shadow-[0_0_16px_rgba(59,130,246,0.6)] bg-dark-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/mujahid-billing-expert.jpg" alt="Mujahid Hussain"
                            className="w-full h-full object-cover" style={{objectPosition:'center 5%'}}/>
                        </div>
                      </div>
                      <p className="text-sm font-black text-white">Mujahid Hussain</p>
                      <p className="text-[10px] text-accent-blue font-semibold mt-0.5">Team Lead Operations</p>
                      <p className="text-[9px] text-gray-500 mt-1">Bellmedex · RCM Head</p>
                    </div>
                    {/* Connector line down */}
                    <div className="w-px h-8 bg-gradient-to-b from-accent-blue/60 to-rose-500/40"/>
                    {/* Horizontal line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" style={{width:'540px'}}/>
                  </div>
                </div>

                {/* Level 3 — Team Members */}
                <div className="flex justify-center gap-4">
                  {[
                    { name: 'Team Member', role: 'AR Specialist', sub: 'Accounts Receivable', icon: '💼', color: 'border-rose-500/40 shadow-[0_0_12px_rgba(239,68,68,0.2)]' },
                    { name: 'Team Member', role: 'Billing Coder', sub: 'ICD-10 / CPT Coding', icon: '📋', color: 'border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.2)]' },
                    { name: 'Team Member', role: 'Denial Analyst', sub: 'Denial & Appeals', icon: '🔍', color: 'border-purple-500/40 shadow-[0_0_12px_rgba(139,92,246,0.2)]' },
                    { name: 'Team Member', role: 'Payment Poster', sub: 'EOB / ERA Processing', icon: '💳', color: 'border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]' },
                    { name: 'Team Member', role: 'VOB Specialist', sub: 'Eligibility & Auth', icon: '✅', color: 'border-green-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]' },
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* Connector up */}
                      <div className="w-px h-8 bg-gradient-to-b from-rose-500/40 to-transparent"/>
                      {/* Card */}
                      <div className={`bg-dark-800/80 border rounded-2xl px-4 pt-12 pb-4 w-[110px] text-center relative ${m.color}`}>
                        {/* Icon circle — above card */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                          <div className={`w-12 h-12 rounded-full bg-dark-700 border-2 ${m.color.split(' ')[0]} flex items-center justify-center text-2xl shadow-lg`}>
                            {m.icon}
                          </div>
                        </div>
                        <p className="text-[10px] font-black text-white leading-tight">{m.name}</p>
                        <p className="text-[9px] text-rose-300 font-semibold mt-0.5">{m.role}</p>
                        <p className="text-[8px] text-gray-600 mt-1">{m.sub}</p>
                        <p className="text-[8px] text-gray-700 mt-1 italic">Details soon</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── DR. ABBAS — HEAD OF MEDICAL SERVICES ─────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-900/60 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">⚕️</span>
            <h2 className="text-2xl font-black text-white">Head of Medical Services</h2>
          </div>

          <div className="glass-card overflow-hidden border border-emerald-500/20">
            <div className="flex flex-col sm:flex-row gap-8 p-8">

              {/* Photo — circular glow style */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <style>{`
                  @keyframes drGlow {
                    0%,100% { box-shadow: 0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(59,130,246,0.2); }
                    50%     { box-shadow: 0 0 40px rgba(16,185,129,0.8), 0 0 80px rgba(59,130,246,0.4); }
                  }
                  .dr-glow { animation: drGlow 3s ease-in-out infinite; }
                `}</style>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/20 blur-xl scale-110" />
                  <div className="dr-glow relative w-48 h-48 rounded-full overflow-hidden border-2 border-emerald-400/60 z-10 bg-[#0a1628]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/dr-abbas-tayyab.jpg" alt="Dr. Syed Abbas Tayyab"
                      className="w-full h-full object-cover" style={{objectPosition:'center 8%'}}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"/>
                  </div>
                  <div className="absolute inset-0 rounded-full border border-dashed border-emerald-400/30 scale-110"
                    style={{animation:'orbit2 14s linear infinite'}}/>
                </div>
                {/* Available badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-dark-700/90 border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
                  <span className="text-xs font-semibold text-white">GMC · IMC · PMDC Registered</span>
                </div>
                {/* Skill tags */}
                <div className="flex flex-wrap justify-center gap-1.5 max-w-[210px]">
                  {[
                    { label: '🏥 Emergency Medicine', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/8' },
                    { label: '🩺 MRCEM Qualified', color: 'border-blue-500/40 text-blue-300 bg-blue-500/8' },
                    { label: '💉 ATLS Certified', color: 'border-purple-500/40 text-purple-300 bg-purple-500/8' },
                    { label: '❤️ ACLS Provider', color: 'border-rose-500/40 text-rose-300 bg-rose-500/8' },
                    { label: '🧒 APLS Certified', color: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/8' },
                  ].map(t => (
                    <span key={t.label} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${t.color} whitespace-nowrap`}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">Dr. Syed Abbas Tayyab</h3>
                    <p className="text-emerald-400 font-semibold text-sm">Head of Medical Services · Emergency Medicine Registrar</p>
                    <p className="text-gray-500 text-xs mt-1">Cork University Hospital, Ireland · MSc Advanced Clinical Practice (RCSI)</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>GMC ID: 7967080
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-white/8">
                  {[
                    { v: '5+', l: 'Years Clinical Exp.', c: 'text-emerald-400' },
                    { v: 'MRCEM', l: 'Royal College EM', c: 'text-blue-400' },
                    { v: 'GMC', l: 'UK Registered', c: 'text-purple-400' },
                    { v: 'MSc', l: 'Advanced Clinical', c: 'text-cyan-400' },
                    { v: 'ATLS', l: 'Trauma Certified', c: 'text-rose-400' },
                  ].map(s => (
                    <div key={s.l}>
                      <div className={`text-lg font-black ${s.c}`}>{s.v}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  An inspirational, dedicated medical professional with over 5 years of diverse clinical experience in Emergency Medicine. Currently serving as Registrar at Cork University Hospital&apos;s Emergency Department — Ireland&apos;s largest statutory hospital and a Level 1 Trauma Centre. MRCEM qualified, GMC registered, and pursuing MSc in Advanced Clinical Practice at RCSI. Committed to delivering world-class patient care through advanced clinical expertise and leadership.
                </p>

                {/* Experience */}
                <div className="space-y-1.5 mb-4">
                  {[
                    'Registrar — Emergency Department, Cork University Hospital, Ireland (2025–Present)',
                    'Senior House Officer (SHO) — Emergency Department, Cork University Hospital (2024–2025)',
                    'Senior House Officer — Nephrology, University Hospital Limerick (2023–2024)',
                    'Post-Graduate Resident — Medicine, P.N.S Hafeez Hospital, Islamabad (2023)',
                    'Senior House Officer / Medical Officer — MedIQ Smart Healthcare, Islamabad (2023)',
                    'Presented clinical audits at international conferences including ACEP 2025 (USA)',
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5"/>
                      {p}
                    </div>
                  ))}
                </div>

                {/* Certifications grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">Medical Registrations</p>
                    <div className="flex flex-wrap gap-1">
                      {['GMC (UK) ID 7967080', 'IMC (Ireland)', 'PMDC (Pakistan)', 'MRCEM-OSCE', 'MRCEM-Intermediate', 'MRCEM-Primary', 'PLAB-1 & PLAB-2'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">Advanced Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      {['ATLS (RCSI/ACS)', 'APLS (ALSG UK)', 'ACLS Provider (AHA)', 'BLS Provider (AHA)', 'PALS (AMA)', 'AHLS (Hazmat)', 'POCUS Certificate (RCSI)', 'Pre-Hospital EM (RCSI)', 'Major Trauma Course'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-dark-700 border border-white/10 text-gray-400">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-1.5">Education</p>
                  <div className="space-y-1">
                    {[
                      'MSc Advanced Clinical Practice — Royal College of Surgeons in Ireland (RCSI) · 2024',
                      'MBBS (Bachelor of Medicine, Bachelor of Surgery) — Hamdard College of Medicine & Dentistry, Karachi',
                      'FCPS Residency (Medicine) — College of Physicians & Surgeons Pakistan (CPSP)',
                      'Family Medicine Certificate (USA) — APPNA MERIT · One Year Online Course',
                    ].map((e, i) => (
                      <p key={i} className="text-xs text-gray-500">🎓 {e}</p>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/8">
                  <div className="text-xs text-gray-500">
                    🌍 Cork, Ireland &nbsp;·&nbsp; LinkedIn: dr-syed-abbas-419188b3 &nbsp;·&nbsp; Languages: English · Urdu
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-colors">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      +966 505 803 073
                    </a>
                    <a href="mailto:waqastayyab2004@gmail.com"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors">
                      waqastayyab2004@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RCM SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-3">Full Revenue Cycle Management Services</h2>
          <p className="section-subheading max-w-2xl">Every step of the billing cycle handled end-to-end — from the moment a patient is seen to the final dollar collected.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rcmServices.map((svc, i) => (
            <div key={i} className={`glass-card p-6 border-t-4 ${svc.border} hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`w-11 h-11 rounded-xl ${svc.bg} border ${svc.border} flex items-center justify-center mb-4`}>
                <svc.icon className={`w-5 h-5 ${svc.color}`} />
              </div>
              <div className={`text-xs font-black ${svc.color} mb-1 uppercase tracking-widest`}>{svc.num}</div>
              <h3 className="font-bold text-white text-sm mb-2 leading-snug">{svc.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPECIALTIES ──────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading mb-4">Specialties We Serve</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Deep expertise across high-complexity specialties with unique billing requirements, payer rules, and documentation standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialties.map(s => (
                  <div key={s.name} className="glass-card px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-gray-300 text-sm font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-5">Practice Management Platforms</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                We work inside your existing system — no migration, no disruption. Certified on all major US billing platforms:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {platforms.map(p => (
                  <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                    {p}
                  </span>
                ))}
              </div>

              {/* Earning example card */}
              <div className="glass-card p-6 border border-green-500/20 bg-green-500/5">
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5" /> Example: 1 Client at $100K/Month
                </p>
                <div className="space-y-2 mb-4">
                  {earningExample.map(e => (
                    <div key={e.label} className="flex justify-between text-sm">
                      <span className="text-gray-400">{e.label}</span>
                      <span className={`font-bold ${e.label.includes('Net profit') ? 'text-green-400' : 'text-white'}`}>{e.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/8 pt-3">
                  <p className="text-gray-500 text-xs">
                    With just <strong className="text-white">3 clients</strong> at this volume — potential income of <strong className="text-green-400">$9,000+/month</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Why Practices Choose Us</h2>
          <p className="section-subheading">Offshore billing expertise combined with enterprise-grade IT security and data management.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((w, i) => (
            <div key={i} className="glass-card p-6 hover:-translate-y-0.5 transition-transform duration-300">
              <div className="w-11 h-11 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-4">
                <w.icon className="w-5 h-5 text-accent-blue" />
              </div>
              <h3 className="font-bold text-white mb-2">{w.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">How We Work Together</h2>
            <p className="section-subheading">Simple onboarding, transparent process, zero disruption to your practice.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Free Billing Audit', d: 'We review your current billing process, identify revenue leaks, and show you exactly what we can improve.' },
              { n: '02', t: 'BAA & HIPAA Setup', d: 'We sign a Business Associate Agreement and configure secure, HIPAA-compliant access to your systems.' },
              { n: '03', t: 'Seamless Onboarding', d: '1–2 week onboarding. We integrate with your existing PM software — no migration, no downtime.' },
              { n: '04', t: 'Ongoing RCM Service', d: 'Full billing cycle handled daily. Monthly performance reports. Direct access to your billing team at all times.' },
            ].map((s, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent-blue font-black text-sm">{s.n}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{s.t}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-3">FAQ</h2>
        <p className="text-gray-500 text-sm mb-10">Common questions from practice managers and clinic owners.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4">
                <h3 className="font-semibold text-white text-sm">{faq.q}</h3>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────── */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left */}
              <div className="p-10 lg:border-r border-white/8">
                <h2 className="text-2xl font-black text-white mb-2">Get a Free Billing Audit</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Tell us about your practice. We&apos;ll review your current billing setup and show you exactly where revenue is being lost — at no cost.
                </p>

                <div className="space-y-5 mb-8">
                  {[
                    { n: '1', t: 'We review your billing setup and current collections', sub: 'Free, no obligation' },
                    { n: '2', t: 'We identify revenue leaks and denial patterns', sub: 'Detailed written report' },
                    { n: '3', t: 'We propose a tailored RCM plan with clear pricing', sub: '3–5% of collections only' },
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
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-4">Contact directly</p>
                  <a href="https://wa.me/923451525845" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors text-sm">
                    <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    WhatsApp: +92 345 152 5845
                  </a>
                  <a href="mailto:adnanhamdani32@gmail.com"
                    className="flex items-center gap-3 text-accent-blue hover:text-cyan-400 transition-colors text-sm">
                    <div className="w-9 h-9 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    adnanhamdani32@gmail.com
                  </a>
                  <div className="flex items-start gap-3 text-gray-500 text-sm mt-4 pt-4 border-t border-white/5">
                    <Globe className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed">
                      Services delivered by <strong className="text-gray-400">Adnan Hamdani</strong> — Certified Medical Biller & RCM Specialist (MTBC & Bellmedex) — in partnership with HiTecH Technology HUB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-black text-white">Request Received!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">We&apos;ll review your practice details and contact you within 24 hours to schedule your free billing audit.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline text-sm px-6 py-2">Send Another</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Practice / Clinic Name *</label>
                      <input type="text" placeholder="Your practice name" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Contact Name *</label>
                      <input type="text" placeholder="Your full name" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
                      <input type="email" placeholder="you@practice.com" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Specialty</label>
                      <select className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50 transition-colors">
                        <option value="">Select specialty…</option>
                        <option>Mental Health</option>
                        <option>Internal Medicine</option>
                        <option>Chiropractic</option>
                        <option>Family Medicine</option>
                        <option>Transportation / NEMT</option>
                        <option>DME (Durable Medical Equipment)</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Monthly Collections (approx.)</label>
                      <select className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50 transition-colors">
                        <option value="">Select range…</option>
                        <option>Under $20,000</option>
                        <option>$20,000 – $50,000</option>
                        <option>$50,000 – $100,000</option>
                        <option>$100,000 – $250,000</option>
                        <option>Over $250,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Current Billing System</label>
                      <input type="text" placeholder="e.g. eClinicalWorks, Office Ally, other…"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tell us your main billing challenge</label>
                      <textarea rows={3} placeholder="e.g. high denial rate, slow collections, staff shortage…"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      Request Free Billing Audit <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3" /> HIPAA compliant. Your data is fully protected.
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
