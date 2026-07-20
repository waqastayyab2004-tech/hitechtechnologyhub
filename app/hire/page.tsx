import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Briefcase, Globe, Shield, Brain, Cpu, Mail, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hire Waqas — Senior IT Consultant & AI Engineer | HiTecH AI HUB',
  description: 'Hire Waqas Syed — Senior IT Consultant with 15+ years, Azure Security certified, SAP AI Hub certified, MBA. Available for IT consulting, AI automation, Azure security, and ServiceNow engagements across MENA and remote worldwide.',
}

const SERVICES = [
  { icon: Cpu,      label: 'Enterprise IT Consulting',  desc: 'L1–L3 support, IT operations, ITSM, infrastructure design, and managed IT services.', from: '$600', color: 'text-blue-400 border-blue-500/20 bg-blue-500/8' },
  { icon: Brain,    label: 'AI & Automation',            desc: 'Agentic AI pipelines, Python automation, Claude/GPT integration, ServiceNow automation.', from: '$500', color: 'text-violet-400 border-violet-500/20 bg-violet-500/8' },
  { icon: Shield,   label: 'Azure Security',             desc: 'Zero Trust, Conditional Access, Secure Score improvement, Defender for M365, IAM.', from: '$600', color: 'text-red-400 border-red-500/20 bg-red-500/8' },
  { icon: Globe,    label: 'Microsoft 365 & SAP',        desc: 'Full M365 tenant admin, Exchange, Teams, Intune/Autopilot, SAP S/4HANA systems.', from: '$400', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/8' },
  { icon: Briefcase,label: 'Web App Development',        desc: 'Next.js, FastAPI, Flask — full-stack apps for IT operations, dashboards, and automation.', from: '$800', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/8' },
  { icon: CheckCircle,label:'Senior IT Role (FT/PT)',    desc: 'Open to senior IT roles — IT Manager, IT Lead, AI Engineer. Onsite MENA or remote global.', from: 'Negotiable', color: 'text-orange-400 border-orange-500/20 bg-orange-500/8' },
]

const CERTS = [
  'Microsoft Certified: Azure Security Engineer Associate (Renewed Jul 2027)',
  'SAP Certified: Generative AI Hub (AIG02)',
  'SAP Certified: Python ML for SAP HANA',
  'SAP S/4HANA Technology Consultant',
  'CCNA Security — Cisco',
  'ITIL v3 Foundation',
  'MBA — Buckinghamshire New University, UK',
]

export default function HirePage() {
  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/25 text-green-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for New Projects — MENA &amp; Remote Worldwide
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">Waqas Syed</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Senior IT Engineer &amp; AI Automation specialist with 15+ years at SAP, 13+ certifications, and 100+ enterprise projects delivered across MENA.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 font-bold hover:bg-green-500/20 transition-all">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href="mailto:waqastayyab2004@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-all">
            <Mail className="w-4 h-4" /> Email Directly
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/6 bg-dark-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { v: '15+',  l: 'Years Experience',    c: 'text-accent-blue' },
              { v: '100+', l: 'Projects Delivered',  c: 'text-cyan-400' },
              { v: '13+',  l: 'Certifications',       c: 'text-purple-400' },
              { v: 'MENA+',l: 'Remote Worldwide',    c: 'text-green-400' },
            ].map(s => (
              <div key={s.l}>
                <div className={`text-3xl font-black ${s.c}`}>{s.v}</div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Rates */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-black text-white mb-2">Services &amp; Rates</h2>
        <p className="text-gray-500 text-sm mb-8">All rates are starting points — final pricing depends on scope and duration.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <div key={s.label} className={`p-5 rounded-2xl border ${s.color} flex gap-4`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-white text-sm">{s.label}</h3>
                  <span className="text-xs font-bold text-gray-400 whitespace-nowrap">From {s.from}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-2xl font-black text-white mb-6">Certifications &amp; Credentials</h2>
        <div className="space-y-2">
          {CERTS.map(c => (
            <div key={c} className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/60 border border-white/6">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-accent-blue/10 to-cyan-400/5 border border-accent-blue/20 p-8 text-center">
          <h3 className="text-xl font-black text-white mb-2">Ready to work together?</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">Tell me about your project and I will get back to you within 24 hours.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
