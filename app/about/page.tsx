import type { Metadata } from 'next'
import { Cpu, Zap, Shield, Cloud, Target, Calendar, Facebook, Linkedin, Mail, Brain, Network, Briefcase, Star, Phone, MessageCircle, Globe, Users, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'Syed Waqas — IT Consultant, AI Engineer, Corporate IT Expert with 15+ years. 1M+ followers across social platforms. Based in Riyadh, Saudi Arabia.',
}

const roles = [
  { icon: Briefcase, label: 'IT Service Delivery Lead', color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  { icon: Globe, label: 'IT Consultant', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: Cpu, label: 'Senior IT System Engineer', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Brain, label: 'AI Engineer & MLOps', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Zap, label: 'Agentic AI Builder', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Shield, label: 'Azure Security Certified', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Cloud, label: 'Cloud & Infrastructure Pro', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { icon: Network, label: 'CCNA & Networking Expert', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Award, label: 'SAP Certified (3 certs)', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Users, label: 'AI Trainer & Mentor', color: 'text-pink-400', bg: 'bg-pink-500/10' },
]

const topSkills = [
  { label: 'IT Service Delivery', level: 99, color: 'bg-accent-blue' },
  { label: 'IT Consulting & Advisory', level: 96, color: 'bg-cyan-400' },
  { label: 'ServiceNow ITSM', level: 97, color: 'bg-blue-400' },
  { label: 'Azure Security', level: 92, color: 'bg-red-400' },
  { label: 'SAP Operations', level: 96, color: 'bg-orange-400' },
  { label: 'M365 Administration', level: 94, color: 'bg-indigo-400' },
  { label: 'AI & Automation', level: 88, color: 'bg-purple-400' },
  { label: 'Cybersecurity', level: 91, color: 'bg-rose-400' },
  { label: 'IT Infrastructure', level: 98, color: 'bg-sky-400' },
  { label: 'Office Technology', level: 95, color: 'bg-teal-400' },
  { label: 'Python & FastAPI', level: 82, color: 'bg-green-400' },
  { label: 'Cloud Computing', level: 89, color: 'bg-blue-300' },
]

const socialProof = [
  { platform: 'Facebook', handle: 'HiTech Technology HUB', followers: '71', growth: 'Growing daily', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61551726961739' },
  { platform: 'LinkedIn', handle: 'syedwaqastayyab', followers: '500+', growth: 'Connections', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Linkedin, href: 'https://www.linkedin.com/in/syedwaqastayyab/' },
  { platform: 'Community', handle: 'IT & AI Community', followers: '1M+', growth: 'Across platforms', color: 'text-accent-yellow', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Users, href: '#' },
  { platform: 'Reach', handle: 'Tech Content Views', followers: '100K+', growth: 'Monthly reach', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: TrendingUp, href: '#' },
]

const socialLinks = [
  { icon: Phone, label: '+966 505803073', href: 'tel:+966505803073', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/966505803073', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Mail, label: 'waqastayyab2004@gmail.com', href: 'mailto:waqastayyab2004@gmail.com', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Linkedin, label: 'linkedin.com/in/syedwaqastayyab', href: 'https://www.linkedin.com/in/syedwaqastayyab/', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Facebook, label: 'HiTech Technology HUB', href: 'https://www.facebook.com/profile.php?id=61551726961739', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
]

const skills = [
  'IT Service Delivery', 'IT Consulting', 'SLA & KPI Management', 'ITIL v3', 'PMP (35 PDUs)',
  'ServiceNow ITSM', 'SNOW Knowledge Base', 'Incident Management', 'Problem Management',
  'Azure Security Engineer', 'Zero Trust Architecture', 'Endpoint & Identity Mgmt', 'Intune MDM',
  'MFA & Conditional Access', 'Defender for M365', 'Cybersecurity Risk',
  'SAP S/4HANA Admin', 'SAP Analytics Cloud', 'SAP BTP', 'SAP Ariba', 'SAP Build',
  'Microsoft 365', 'Exchange Online', 'SharePoint', 'Teams Admin', 'M365 Copilot',
  'Digital Signage', 'Office Technology', 'Meeting Room Tech',
  'Python', 'FastAPI', 'Flask', 'Next.js', 'TypeScript', 'PowerShell', 'REST APIs',
  'Agentic AI', 'Claude AI', 'Machine Learning', 'MLOps', 'LLMs', 'Prompt Engineering',
  'SAP HANA Python ML', 'AI-Driven Project Management',
  'Cloud Computing', 'Azure', 'Hybrid Cloud', 'IaaS / PaaS',
  'CCNA Security', 'Cisco / Aruba', 'LAN / WAN', 'NAC Controllers',
  'HP Servers', 'Windows / Linux / macOS', 'Vendor Management', 'IT Asset Management',
  'English (Fluent)', 'Arabic (Fluent)',
]

const timeline = [
  { year: '2026', title: 'HiTecH AI HUB Launched', desc: 'Personal brand website with Next.js, full blog, hire page, and AI tech showcase.' },
  { year: '2026', title: 'SAP Python ML Certification', desc: 'Developing AI Models with Python ML Client for SAP HANA — issued May 2026.' },
  { year: '2025', title: 'AI-Driven Project Manager Cert', desc: 'Certified in 10X Productivity with Generative AI — QAS, Dec 2025.' },
  { year: '2024', title: 'Azure Security Engineer Certified', desc: 'Microsoft Certified: Azure Security Engineer Associate — Jul 2024.' },
  { year: '2023', title: 'MBA Completed', desc: 'Master of Business Administration (iMBA) — Buckinghamshire New University, UK.' },
  { year: '2022', title: 'SAP S/4HANA Certified', desc: 'SAP Certified Technology Consultant — SAP S/4HANA System Administration.' },
  { year: '2019', title: 'Promoted to Senior IT System Engineer @ SAP', desc: 'Led IT infrastructure, service delivery, and cloud operations for SAP Saudi Arabia.' },
  { year: '2015', title: 'Joined SAP as IT Support Specialist', desc: 'IT SPOC for SAP Saudi Arabia — Riyadh, Jeddah, AlKhobar locations.' },
  { year: '2012', title: 'System Security Officer — Banque Saudi Fransi', desc: 'Managed ATM and branch security systems, access control, 24/7 monitoring.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal className="text-center mb-12">
        <h1 className="section-heading mb-4">About <span className="gradient-text">Waqas</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Senior IT System Engineer · IT Service Delivery Lead · IT Consultant · AI/ML Enthusiast
        </p>
      </ScrollReveal>

      {/* ── Main profile — 3 column on desktop ── */}
      <ScrollReveal>
        <div className="glass-card p-7 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* LEFT — Skills panel */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" /> Top Skills
              </h3>
              <div className="space-y-3">
                {topSkills.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-300 font-medium">{s.label}</span>
                      <span className="text-xs text-gray-500 font-mono">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.color}`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact quick links */}
              <h3 className="text-sm font-bold text-accent-blue uppercase tracking-widest mt-7 mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Contact
              </h3>
              <div className="space-y-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${s.bg} ${s.color} border border-current/20 hover:opacity-80 transition-opacity w-full`}
                  >
                    <s.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — Profile info */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {/* Avatar + name row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="relative w-36 h-36">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-blue/40 animate-spin-slow scale-110" />
                    <div className="absolute inset-0 rounded-full bg-accent-blue/10 blur-xl scale-110" />
                    <div className="relative w-36 h-36 rounded-full border-2 border-accent-blue/60 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-dark-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/waqas-pro.jpg" alt="Syed Waqas Tayyab" className="w-full h-full object-cover" style={{objectPosition:'center 10%'}} />
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-0.5">Syed Waqas Tayyab</h2>
                  <p className="text-accent-blue font-semibold text-sm mb-0.5">Senior IT System Engineer · IT Service Delivery Lead · IT Consultant</p>
                  <p className="text-cyan-400 font-medium text-sm mb-3">AI Engineer · SAP · Riyadh, Saudi Arabia · 15+ Years IT</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xl">
                    AI, ML, Agentic AI, Cyber &amp; Cloud expert with 15+ years and 100+ projects at SAP and leading organisations.
                    IT Service Delivery Lead, Azure Security Certified Engineer, MBA graduate.
                    Training young IT professionals to adopt AI faster — bridging corporate knowledge gaps.
                  </p>
                  {/* 1M+ followers badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/10 border border-yellow-500/30 mb-4">
                    <TrendingUp className="w-4 h-4 text-accent-yellow" />
                    <span className="text-accent-yellow font-bold text-sm">1M+ Followers</span>
                    <span className="text-gray-400 text-xs">across social platforms</span>
                  </div>
                  {/* Role pills */}
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {roles.map((role) => (
                      <span key={role.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${role.bg} ${role.color} border border-current/20`}>
                        <role.icon className="w-3.5 h-3.5" />
                        {role.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* ── Social Proof — 1M+ followers ── */}
      <ScrollReveal delay={0.08}>
        <div className="glass-card p-7 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-accent-yellow" />
              <h3 className="text-xl font-bold text-white">Social Reach &amp; Community</h3>
              <span className="ml-auto badge bg-yellow-500/10 text-accent-yellow border border-yellow-500/30 text-xs font-bold px-3 py-1">
                1M+ Total Followers
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialProof.map((s) => (
                <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`glass-card p-4 flex flex-col items-center gap-2 text-center border ${s.border} hover:-translate-y-1 transition-all duration-200`}>
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.followers}</div>
                  <div className="text-white text-xs font-semibold">{s.platform}</div>
                  <div className="text-gray-500 text-xs">{s.growth}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Mission */}
      <ScrollReveal delay={0.1}>
        <div className="glass-card p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-blue" /> Mission
            </h3>
            <blockquote className="text-gray-300 text-lg leading-relaxed border-l-2 border-accent-blue pl-5">
              &ldquo;AI, ML, Agentic AI, Cyber &amp; Cloud — daily news, tech tips, tricks &amp; tutorials
              for IT enthusiasts and pros. Elevate your learning &amp; stay ahead of the IT game
              in the modern era of AI.&rdquo;
            </blockquote>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Neuron / Neural Network Dashboard ── */}
      <ScrollReveal delay={0.12}>
        <div className="glass-card p-6 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-blue/5 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" /> Neural Knowledge Map
            </h3>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Neuron SVG */}
              <div className="flex-shrink-0 w-full lg:w-72 h-56">
                <NeuronDashboard />
              </div>
              {/* Domain stats */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { domain: 'IT Service Delivery', years: '11y', projects: '100+', color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
                  { domain: 'Cybersecurity', years: '13y', projects: '50+', color: 'text-red-400', bg: 'bg-red-500/10' },
                  { domain: 'Cloud & Azure', years: '8y', projects: '40+', color: 'text-sky-400', bg: 'bg-sky-500/10' },
                  { domain: 'SAP Operations', years: '11y', projects: '60+', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { domain: 'AI & ML', years: '3y', projects: '15+', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { domain: 'Networking', years: '15y', projects: '80+', color: 'text-green-400', bg: 'bg-green-500/10' },
                  { domain: 'M365 & Office Tech', years: '9y', projects: '45+', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                  { domain: 'Automation', years: '5y', projects: '30+', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                  { domain: 'Infrastructure', years: '15y', projects: '70+', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                ].map((d) => (
                  <div key={d.domain} className={`${d.bg} rounded-xl p-3 border border-current/10`}>
                    <div className={`text-xs font-bold ${d.color} mb-1`}>{d.domain}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-bold">{d.projects}</span>
                      <span className="text-gray-500 text-xs">{d.years}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Full skills cloud */}
      <ScrollReveal delay={0.15}>
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Tech Stack &amp; Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="tag text-sm py-1 px-3">{skill}</span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal delay={0.2}>
        <h3 className="text-xl font-bold text-white mb-6">Career &amp; Achievements Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-blue/30 to-transparent" />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07} className="pl-12 relative">
                <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-accent-blue border-2 border-dark-900 shadow-glow" />
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal delay={0.2} className="mt-14 text-center">
        <Link href="/hire" className="btn-primary px-8 py-3.5 text-base inline-flex">
          View Full Profile &amp; Hire Me
        </Link>
      </ScrollReveal>
    </div>
  )
}

/* ── Animated Neural Network Dashboard SVG ── */
function NeuronDashboard() {
  const nodes = [
    { id: 'in1', x: 40,  y: 40,  color: '#3B82F6', label: 'IT Ops' },
    { id: 'in2', x: 40,  y: 100, color: '#06B6D4', label: 'SAP' },
    { id: 'in3', x: 40,  y: 160, color: '#8B5CF6', label: 'Cloud' },
    { id: 'in4', x: 40,  y: 220, color: '#10B981', label: 'Security' },
    { id: 'h1',  x: 140, y: 60,  color: '#FACC15', label: 'AI/ML' },
    { id: 'h2',  x: 140, y: 130, color: '#F97316', label: 'Automate' },
    { id: 'h3',  x: 140, y: 200, color: '#EC4899', label: 'DevOps' },
    { id: 'out', x: 240, y: 130, color: '#3B82F6', label: 'Impact' },
  ]
  const edges = [
    ['in1','h1'],['in1','h2'],['in2','h1'],['in2','h2'],['in2','h3'],
    ['in3','h2'],['in3','h3'],['in4','h3'],['in4','h2'],
    ['h1','out'],['h2','out'],['h3','out'],
  ]
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  return (
    <svg viewBox="0 0 290 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodeMap[a], nb = nodeMap[b]
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={na.color} strokeWidth="1" opacity="0.25"
            strokeDasharray="4 3">
            <animate attributeName="stroke-dashoffset" values="20;0" dur={`${1.2 + i * 0.15}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.15;0.45;0.15" dur={`${2 + i * 0.2}s`} repeatCount="indefinite"/>
          </line>
        )
      })}
      {/* Travelling pulses */}
      {edges.slice(0,6).map(([a,b], i) => {
        const na = nodeMap[a], nb = nodeMap[b]
        return (
          <circle key={i} r="3" fill={na.color} opacity="0.9" filter="url(#nodeGlow)">
            <animateMotion dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
              <mpath href={`#edge-${i}`}/>
            </animateMotion>
            <animateMotion dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}
              path={`M${na.x},${na.y} L${nb.x},${nb.y}`}/>
          </circle>
        )
      })}
      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          {/* Glow ring */}
          <circle cx={n.x} cy={n.y} r="16" fill={n.color} opacity="0.08">
            <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.06;0.14;0.06" dur="3s" repeatCount="indefinite"/>
          </circle>
          {/* Node */}
          <circle cx={n.x} cy={n.y} r="12" fill="#0d1824" stroke={n.color} strokeWidth="1.5" filter="url(#nodeGlow)"/>
          <circle cx={n.x} cy={n.y} r="6" fill={n.color} opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          {/* Label */}
          <text x={n.id === 'out' ? n.x + 20 : n.id.startsWith('in') ? n.x - 16 : n.x}
            y={n.y + 4}
            fontFamily="monospace" fontSize="7" fill={n.color} opacity="0.7"
            textAnchor={n.id === 'out' ? 'start' : n.id.startsWith('in') ? 'end' : 'middle'}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
