'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, Lock, Phone, Mail, MapPin,
  Linkedin, Award, Server, Shield, Cloud, Brain, Network,
  Monitor, Zap, ChevronDown, ChevronUp,
} from 'lucide-react'

/* ── DATA ─────────────────────────────────────────────────────────── */

const experiences = [
  {
    role: 'Senior IT System Engineer / IT Service Delivery Lead',
    company: 'Global Technology Enterprise', location: 'Riyadh, Saudi Arabia',
    period: 'Jul 2019 – Present', duration: '5+ yrs',
    color: 'border-accent-blue', badge: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    points: [
      'Enterprise IT field service & proactive monitoring across all network layers',
      'IT asset lifecycle management — procurement, deployment, and disposal (MENA region)',
      'Full ServiceNow ticket lifecycle aligned to SLAs and KPIs',
      'C-level and executive IT support — meetings, events, VIP deployments',
      'Built AI automation tools replacing manual IT workflows — saving 100+ min/day',
      'Modern Workplace: Intune/Autopilot, Azure AD, M365, digital signage',
    ],
  },
  {
    role: 'IT Support Specialist (IT SPOC)',
    company: 'Global Technology Enterprise', location: 'Riyadh · Jeddah · AlKhobar',
    period: 'Jul 2015 – Jul 2019', duration: '4 yrs',
    color: 'border-cyan-500', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    points: [
      'IT SPOC for 3 regional offices — part of Global IT EMEA team',
      'HP server administration, Cisco/Aruba networking, LAN/WAN/NAC',
      'Mass OS deployment (Windows, macOS, Linux) and SCCM management',
      'M365, Teams, Exchange Online, OneDrive, SharePoint administration',
    ],
  },
  {
    role: 'System Security Officer',
    company: 'Banque Saudi Fransi', location: 'Riyadh, Saudi Arabia',
    period: '2012 – 2015', duration: '3 yrs',
    color: 'border-red-500', badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    points: [
      'ATM and branch physical security — Siecep, G4S MultiMax, CCTV, IoT sensors',
      'Access control management and 24/7 security command centre operations',
      'BMC Remedy incident tracking and security audit support',
    ],
  },
]

const certifications = [
  { name: 'Discovering SAP Generative AI Hub (AIG02)', issuer: 'SAP', year: 'Jun 2026', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', hot: true },
  { name: 'Developing AI Models with Python ML for SAP HANA', issuer: 'SAP', year: 'May 2026', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hot: true },
  { name: 'AI-Driven Project Manager: 10X Productivity with GenAI', issuer: 'QAS', year: 'Dec 2025', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', hot: true },
  { name: 'Microsoft Certified: Azure Security Engineer Associate', issuer: 'Microsoft', year: 'Jul 2025 · Renewed Jul 2027', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hot: true },
  { name: 'SAP Certified Technology Consultant — SAP S/4HANA Admin', issuer: 'SAP', year: 'Mar 2022', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hot: false },
  { name: 'SAP Certified Application Associate — SAP Analytics Cloud', issuer: 'SAP', year: 'Jan 2023', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hot: false },
  { name: 'PMP Training — 35 PDUs', issuer: 'PMI', year: 'Feb 2017', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', hot: false },
  { name: 'ITIL v3 Foundation', issuer: 'AXELOS', year: 'Jan 2017', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', hot: false },
  { name: 'CCNA Security', issuer: 'Cisco', year: 'Sep 2013', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', hot: false },
  { name: 'MBA (iMBA)', issuer: 'Buckinghamshire New University, UK', year: '2023', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', hot: false },
  { name: 'BSc Information Technology', issuer: 'University of Greenwich, UK', year: '2010', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', hot: false },
]

const services = [
  { icon: Brain, title: 'AI & Automation Engineering', desc: 'Python ML, LLMs, Power Apps, ServiceNow automation, AI dashboards.', tags: ['Python ML', 'Claude AI', 'Power Apps', 'FastAPI'], color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { icon: Shield, title: 'Cybersecurity & Azure Security', desc: 'Zero Trust, Intune MDM, Conditional Access, Defender for M365.', tags: ['Azure Security', 'Zero Trust', 'Intune', 'MFA'], color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { icon: Cloud, title: 'Cloud & Microsoft 365', desc: 'M365 governance, Azure AD, SharePoint, Teams, Exchange Online, M365 Copilot.', tags: ['M365', 'Azure', 'Teams', 'SharePoint'], color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: Server, title: 'IT Infrastructure & L2/L3 Support', desc: 'Cisco, Aruba, HP Servers, WAN/LAN, SCCM, Intune, OS deployment.', tags: ['Cisco', 'HP Servers', 'SCCM', 'LAN/WAN'], color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20' },
  { icon: Network, title: 'ServiceNow & ITSM', desc: 'SNOW setup, SLA design, workflow automation, KB strategy, ITIL-aligned delivery.', tags: ['ServiceNow', 'ITIL v3', 'SLA Design', 'PowerBI'], color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Monitor, title: 'IT Asset Management', desc: 'Full lifecycle — procurement, tracking, refresh planning, certified disposal.', tags: ['SAP Ariba', 'Asset Lifecycle', 'DocuSign', 'PowerBI'], color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
]

const stats = [
  { v: '15+', l: 'Years IT Experience', c: 'text-accent-blue' },
  { v: '100+', l: 'Projects & Implementations', c: 'text-cyan-400' },
  { v: '13+', l: 'Certifications', c: 'text-purple-400' },
  { v: 'MENA', l: 'Primary Region', c: 'text-green-400' },
]

export default function ContactClient() {
  const [openExp, setOpenExp] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* ── FREE CONSULTATION FORM (TOP) ─────────────────────────── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
              Available for New Projects — MENA &amp; Remote
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
              Request a Free{' '}
              <span className="gradient-text">IT Consultation</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6">
              30 minutes. No commitment. Real advice from a senior IT specialist who has solved it before.
            </p>
            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="/Waqas-Syed-CV.pdf" download="Waqas-Syed-CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download My CV
              </a>
              <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] text-sm font-bold hover:bg-[#0A66C2]/20 transition-colors">
                <Linkedin className="w-4 h-4"/> View LinkedIn
              </a>
              <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold hover:bg-emerald-500/20 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Now
              </a>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-10 lg:border-r border-white/8">
                <h2 className="text-2xl font-black text-white mb-2">What Happens Next?</h2>
                <p className="text-gray-500 text-sm mb-8">Simple, fast, and completely confidential.</p>
                <div className="space-y-6 mb-10">
                  {[
                    { n: '1', t: 'An expert contacts you after reviewing your requirements', sub: 'Usually within 24 hours' },
                    { n: '2', t: 'If needed, we sign an NDA to ensure the highest privacy level', sub: 'Mutual NDA — standard practice' },
                    { n: '3', t: 'We submit a comprehensive project proposal', sub: 'Scope, estimates, timelines, CVs' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                      <div>
                        <p className="text-gray-200 text-sm font-medium">{s.t}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/8 space-y-3">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-4">Or contact directly</p>
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
                  <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#0A66C2] hover:text-blue-400 transition-colors text-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center">
                      <Linkedin className="w-4 h-4"/>
                    </div>
                    linkedin.com/in/syedwaqastayyab
                  </a>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4"/>
                    </div>
                    Riyadh, Saudi Arabia · Remote Worldwide
                  </div>
                </div>
              </div>
              {/* Right — form */}
              <div className="p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400"/>
                    </div>
                    <h3 className="text-xl font-black text-white">Request Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">Thank you. Our team will review your requirements and contact you within 24 hours.</p>
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
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Corporate Email *</label>
                      <input type="email" placeholder="you@company.com" required
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone / WhatsApp *</label>
                      <input type="tel" placeholder="+966 5xx xxx xxxx" required
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
                        <option>Full-time / Contract Role</option>
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
                      <label htmlFor="nda" className="text-xs text-gray-500 cursor-pointer">I want to protect my data by signing an NDA before sharing details.</label>
                    </div>
                    <button type="submit" className="w-full bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      Send Request <ArrowRight className="w-4 h-4"/>
                    </button>
                    <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3"/> Your privacy is protected. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────── */}
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

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">What I Can Do For You</h2>
          <p className="section-subheading">Senior IT consulting across 6 specialist domains — Onsite (MENA) and Remote (Worldwide).</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div key={i} className={`glass-card p-6 border-t-4 ${svc.border} hover:-translate-y-0.5 transition-transform duration-300`}>
              <div className={`w-11 h-11 rounded-xl ${svc.bg} border ${svc.border} flex items-center justify-center mb-4`}>
                <svc.icon className={`w-5 h-5 ${svc.color}`}/>
              </div>
              <h3 className="font-bold text-white mb-2">{svc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map(t => <span key={t} className="tag text-[10px]">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="btn-outline px-8 py-3.5">
            View Full IT Services <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Professional Experience</h2>
            <p className="section-subheading">15+ years across enterprise IT — from network administration to AI automation and C-suite IT leadership.</p>
          </div>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <div key={i} className={`glass-card overflow-hidden border-l-4 ${exp.color}`}>
                <button onClick={() => setOpenExp(openExp === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{exp.role}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${exp.badge}`}>{exp.duration}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{exp.company} · {exp.location} · {exp.period}</p>
                  </div>
                  {openExp === i ? <ChevronUp className="w-5 h-5 text-accent-blue flex-shrink-0 ml-4"/> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4"/>}
                </button>
                {openExp === i && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-1.5">
                    {exp.points.map(p => (
                      <div key={p} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5"/>
                        {p}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Certifications &amp; Education</h2>
          <p className="section-subheading">13+ professional certifications across AI, cloud security, SAP, ITIL, networking, and project management.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <div key={i} className={`glass-card p-4 flex items-start gap-3 border ${cert.border} hover:-translate-y-0.5 transition-transform duration-200`}>
              <div className={`w-9 h-9 rounded-lg ${cert.bg} border ${cert.border} flex items-center justify-center flex-shrink-0`}>
                <Award className={`w-4 h-4 ${cert.color}`}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <p className="text-white text-xs font-semibold leading-snug flex-1">{cert.name}</p>
                  {cert.hot && <span className="text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full flex-shrink-0">NEW</span>}
                </div>
                <p className={`text-[11px] ${cert.color}`}>{cert.issuer} · {cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to Work Together?</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Freelance project, full-time role, or short-term engagement — let&apos;s have a 30-minute call. Free, no pressure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="btn-primary px-8 py-3.5">
              Request Consultation <ArrowRight className="w-4 h-4"/>
            </a>
            <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
              className="btn-outline px-8 py-3.5 border-green-500/40 text-green-400 hover:bg-green-500/10">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
