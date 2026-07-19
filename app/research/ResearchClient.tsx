'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain, Shield, Sparkles, FileText, FlaskConical,
  FolderGit2, Database, Mic, Award, ExternalLink, ChevronRight,
  BookOpen, Cpu, Zap, Clock, Github, User,
} from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.08 },
  }),
}

/* ── Data ── */
const PROFILES = [
  {
    label: 'ORCID',
    desc: 'Academic identifier & publication record',
    href: 'https://orcid.org/0009-0005-6754-3864',
    logo: (
      <svg viewBox="0 0 256 256" className="w-8 h-8"><path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0z" fill="#A6CE39"/><path d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-20.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1 4.6-10.1 10.1-10.1 10.1 4.6 10.1 10.1z" fill="#fff"/></svg>
    ),
    status: 'live',
    color: 'border-green-500/20 bg-green-500/5 hover:border-green-500/40',
    badge: 'text-green-400 bg-green-500/10 border-green-500/20',
    badgeLabel: 'Active',
  },
  {
    label: 'Google Scholar',
    desc: 'Citation index & research metrics',
    href: null,
    logo: (
      <svg viewBox="0 0 512 512" className="w-8 h-8"><path d="M256 411.12L0 202.667 256 0l256 202.667z" fill="#4285F4"/><path d="M118.584 426.003C101.677 417.3 88 403.6 88 403.6V512l168-77.19-137.416-8.807z" fill="#356AC3"/><path d="M393.416 426.003C410.323 417.3 424 403.6 424 403.6V512L256 434.81l137.416-8.807z" fill="#A0C3FF"/><path d="M256 460.8c-97.2 0-176-78.8-176-176S158.8 108.8 256 108.8s176 78.8 176 176-78.8 176-176 176z" fill="#76A7FA"/><path d="M256 460.8c-97.2 0-176-78.8-176-176h352c0 97.2-78.8 176-176 176z" fill="#4285F4"/></svg>
    ),
    status: 'soon',
    color: 'border-white/10 bg-white/3 hover:border-white/20',
    badge: 'text-gray-500 bg-white/5 border-white/10',
    badgeLabel: 'Coming Soon',
  },
  {
    label: 'GitHub',
    desc: 'Open source projects & code',
    href: 'https://github.com/waqastayyab2004-tech',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    ),
    status: 'live',
    color: 'border-gray-500/20 bg-gray-500/5 hover:border-gray-400/40',
    badge: 'text-gray-300 bg-gray-500/10 border-gray-500/20',
    badgeLabel: 'Active',
  },
  {
    label: 'LinkedIn',
    desc: 'Professional profile & endorsements',
    href: 'https://www.linkedin.com/in/syedwaqastayyab/',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
    status: 'live',
    color: 'border-[#0A66C2]/20 bg-[#0A66C2]/5 hover:border-[#0A66C2]/40',
    badge: 'text-[#4A9FE0] bg-[#0A66C2]/10 border-[#0A66C2]/20',
    badgeLabel: 'Active',
  },
]
const INTERESTS = [
  { icon: Brain,    label: 'Enterprise AI',   desc: 'Applying large language models and agentic AI to enterprise IT workflows, automation, and decision support.', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  { icon: Cpu,      label: 'AIOps',           desc: 'AI-driven IT operations — predictive incident management, automated remediation, and intelligent monitoring pipelines.', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { icon: Shield,   label: 'Cloud Security',  desc: 'Zero Trust architecture, Azure Secure Score optimisation, IAM governance, and threat intelligence for enterprise cloud.', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { icon: Sparkles, label: 'Generative AI',   desc: 'Practical GenAI integration — RAG pipelines, prompt engineering, Claude/GPT tool use, and enterprise AI copilots.', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
]

const PUBLICATIONS = [
  // Add real publications here when ready
]

const CURRENT_RESEARCH = [
  {
    title: 'Enterprise AI Copilot for IT Operations',
    status: 'Literature Review',
    desc: 'Investigating how agentic AI systems can autonomously handle L1/L2 IT support tickets, reduce MTTR, and integrate with ServiceNow ITSM workflows.',
    tags: ['Agentic AI', 'ServiceNow', 'ITSM', 'Claude API'],
    started: 'Jan 2026',
    submission: 'Q4 2026',
  },
  {
    title: 'Human-AI Collaboration Framework',
    status: 'Active',
    desc: 'Developing a practical framework for IT teams to integrate AI assistants into daily operations while maintaining human oversight, auditability, and trust.',
    tags: ['Human-AI Interaction', 'Enterprise', 'Governance'],
    started: 'Mar 2026',
    submission: null,
  },
  {
    title: 'IT Asset Lifecycle Intelligence',
    status: 'In Progress',
    desc: 'Using ML models to predict asset failure, optimal refresh cycles, and procurement patterns from historical CMDB and ERP data.',
    tags: ['ML', 'CMDB', 'SAP', 'Asset Management'],
    started: 'May 2026',
    submission: null,
  },
]

const OPEN_SOURCE = [
  {
    name: 'Enterprise IT Copilot',
    desc: 'An agentic AI assistant that connects to ServiceNow, Microsoft 365, and SAP — answering IT queries, raising tickets, and summarising SLA status in natural language.',
    tags: ['Python', 'Claude API', 'ServiceNow', 'FastAPI'],
    status: 'Active',
    link: null,
    icon: '🤖',
  },
  {
    name: 'AI Asset Intelligence Platform',
    desc: 'Flask-based IT asset management platform with AI natural language query, predictive lifecycle analytics, Excel sync, and full audit trail — replacing manual Excel tracking.',
    tags: ['Python', 'Flask', 'SQLite', 'ML', 'AI Search'],
    status: 'Active',
    link: null,
    icon: '📦',
  },
  {
    name: 'AIOps Research Lab',
    desc: 'Experimental AIOps environment for testing AI-driven incident detection, automated root-cause analysis, and intelligent alert correlation across enterprise IT infrastructure.',
    tags: ['Python', 'AIOps', 'ML', 'Observability', 'Research'],
    status: 'In Progress',
    link: null,
    icon: '🔬',
  },
  {
    name: 'RAG Security Framework',
    desc: 'Retrieval-Augmented Generation framework for enterprise security teams — indexes threat intel, compliance docs, and runbooks so analysts can query using natural language.',
    tags: ['RAG', 'LLM', 'Security', 'Python', 'Vector DB'],
    status: 'In Progress',
    link: null,
    icon: '🔐',
  },
  {
    name: 'AI Ticket Classifier',
    desc: 'Classifies incoming ServiceNow incidents by category, urgency, and assignment group using fine-tuned LLM inference — reduces manual triage time by ~80%.',
    tags: ['Python', 'LLM', 'ServiceNow', 'NLP'],
    status: 'In Progress',
    link: null,
    icon: '🎫',
  },
  {
    name: 'WhatsApp SLA Monitor',
    desc: 'Automated Python daemon that watches ServiceNow SLA breaches and sends instant WhatsApp alerts via Twilio — never miss a P1 incident breach.',
    tags: ['Python', 'Twilio', 'ServiceNow', 'Automation'],
    status: 'Active',
    link: null,
    icon: '📲',
  },
]

const DATASETS = [
  {
    name: 'Enterprise IT Ticket Dataset',
    desc: 'Anonymised ServiceNow incident dataset covering 3 years of L1/L2 IT support — categories, resolution times, assignment groups, and SLA outcomes.',
    status: 'Coming Soon',
    tags: ['ITSM', 'ServiceNow', 'NLP', 'Classification'],
    icon: '🗂️',
  },
  {
    name: 'IT Asset Lifecycle Records',
    desc: 'Hardware asset data including procurement, assignment, LPA scan history, and disposal — useful for predictive refresh modelling.',
    status: 'Coming Soon',
    tags: ['Asset Management', 'ML', 'SAP'],
    icon: '💾',
  },
]

const SPEAKING = [
  { year: '2026', event: 'SAP AI Hub (AIG02)', type: 'Certification', desc: 'SAP Certified — AI Foundation & Generative AI for Enterprise', icon: Award, color: 'text-orange-400' },
  { year: '2026', event: 'SAP HANA Python ML', type: 'Certification', desc: 'SAP Certified — Python-based ML on SAP HANA Cloud', icon: Award, color: 'text-orange-400' },
  { year: '2025', event: 'Azure Security Engineer Associate', type: 'Certification', desc: 'Microsoft Certified — AZ-500 Azure Security', icon: Award, color: 'text-blue-400' },
  { year: '2024', event: 'CCNA Security', type: 'Certification', desc: 'Cisco Certified — Network Security Fundamentals', icon: Award, color: 'text-green-400' },
  { year: '2024', event: 'SAP S/4HANA Technology Consultant', type: 'Certification', desc: 'SAP Certified Application Associate', icon: Award, color: 'text-orange-400' },
  { year: '2023', event: 'MBA — Buckinghamshire New University, UK', type: 'Degree', desc: 'Master of Business Administration', icon: BookOpen, color: 'text-purple-400' },
]

/* ── Page ── */
export default function ResearchClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'progress'>('all')

  const filteredResearch = CURRENT_RESEARCH.filter(r => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return r.status === 'Active'
    return r.status === 'In Progress'
  })

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-blue/6 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">Research</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Research &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">Publications</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Exploring the intersection of enterprise IT operations, artificial intelligence, and cloud security.
            Building open tools that turn research into real-world impact.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-wrap gap-3 mt-6">
            {['Enterprise AI', 'AIOps', 'Cloud Security', 'Generative AI'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">{t}</span>
            ))}
          </motion.div>

          {/* Quick profile links on hero */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex flex-wrap gap-3 mt-4">
            <a href="https://orcid.org/0009-0005-6754-3864" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-all">
              🆔 ORCID Profile
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#4A9FE0] text-xs font-semibold hover:bg-[#0A66C2]/20 transition-all">
              💼 LinkedIn Profile
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://github.com/waqastayyab2004-tech" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-semibold hover:bg-white/10 transition-all">
              🐙 GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ── Research Profiles ── */}
        <section>
          <SectionHeader icon={User} label="Research Profiles" index={0} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {PROFILES.map((p, i) => (
              <motion.div key={p.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all group ${p.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {p.logo}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.badge}`}>{p.badgeLabel}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm group-hover:text-accent-blue transition-colors">{p.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-600 group-hover:text-accent-blue transition-colors mt-auto">
                      <ExternalLink className="w-3 h-3" /> View Profile
                    </div>
                  </a>
                ) : (
                  <div className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all ${p.color} opacity-60`}>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {p.logo}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.badge}`}>{p.badgeLabel}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{p.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-auto">
                      <Clock className="w-3 h-3" /> Coming Soon
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── The Bigger Picture ── */}
        <section>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
            className="rounded-2xl border border-accent-blue/15 bg-gradient-to-br from-accent-blue/5 via-dark-800/60 to-cyan-400/3 overflow-hidden">

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent-blue" />
                <h3 className="text-lg font-black text-white">The Bigger Picture</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                I&apos;m a <strong className="text-white">Senior IT Engineer at SAP</strong> with 15+ years in enterprise IT — and I&apos;m now actively transitioning into AI research and engineering.
                This isn&apos;t a side project. I&apos;m working on real research papers, building open-source tools used in production, and building the credentials to back it up.
              </p>
              <p className="text-sm leading-relaxed">
                Most people build <em className="text-gray-400">one</em> of these: a CV, a portfolio, a GitHub, a personal website, or an ORCID profile.
                I&apos;m building <span className="text-accent-blue font-bold">all of them together</span> — so each one strengthens the next.
              </p>
            </div>

            {/* Flow chain with descriptions */}
            <div className="px-6 py-6">
              <div className="flex flex-col gap-0">
                {[
                  {
                    icon: '🆔', label: 'ORCID', color: 'border-green-500/30 bg-green-500/8 text-green-400',
                    mine: 'ORCID 0009-0005-6754-3864 — registered and active. Every paper I publish will be permanently linked to this ID.',
                    href: 'https://orcid.org/0009-0005-6754-3864',
                  },
                  {
                    icon: '📄', label: 'Research Papers', color: 'border-accent-blue/30 bg-accent-blue/8 text-accent-blue',
                    mine: 'Currently in Literature Review on "Enterprise AI Copilot for IT Operations." Expected Q4 2026. Writing from 15 years of real enterprise experience — not theory.',
                    href: null,
                  },
                  {
                    icon: '🌐', label: 'HiTecH AI HUB', color: 'border-cyan-500/30 bg-cyan-500/8 text-cyan-400',
                    mine: 'This website — built entirely by me using Next.js, TypeScript, and Claude AI. It\'s both a portfolio and a live demonstration of what I build.',
                    href: 'https://www.hitechtechnologyhub.com',
                  },
                  {
                    icon: '🐙', label: 'GitHub', color: 'border-violet-500/30 bg-violet-500/8 text-violet-400',
                    mine: 'Active repos: Enterprise IT Copilot, AI Asset Intelligence Platform, AIOps Research Lab, RAG Security Framework. Real tools, not toy projects.',
                    href: 'https://github.com/waqastayyab2004-tech',
                  },
                  {
                    icon: '💼', label: 'LinkedIn + CV', color: 'border-orange-500/30 bg-orange-500/8 text-orange-400',
                    mine: '15+ years at SAP, 13+ certifications including Azure Security & SAP AI Hub, MBA from Buckinghamshire University UK. Every claim is verified.',
                    href: 'https://www.linkedin.com/in/syedwaqastayyab/',
                  },
                  {
                    icon: '🚀', label: 'AI Engineer Career', color: 'border-pink-500/30 bg-pink-500/8 text-pink-400',
                    mine: 'The goal: Senior AI/ML Engineer or AI Research Engineer role in enterprise tech. This entire ecosystem is built to make that transition undeniable.',
                    href: null,
                  },
                ].map((node, i, arr) => (
                  <div key={node.label} className="flex gap-4">
                    {/* Left: icon + connector line */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{width:44}}>
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl flex-shrink-0 ${node.color}`}>
                        {node.icon}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-white/10 my-1" style={{minHeight:24}} />
                      )}
                    </div>
                    {/* Right: label + personal detail */}
                    <div className={`flex-1 pb-5 ${i < arr.length - 1 ? 'border-b border-white/4' : ''}`}>
                      <div className="flex items-center gap-2 mb-1 mt-2">
                        <span className="font-bold text-white text-sm">{node.label}</span>
                        {node.href && (
                          <a href={node.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-accent-blue transition-colors">
                            <ExternalLink className="w-3 h-3" /> View
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{node.mine}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 border-t border-white/6 pt-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">This is not a hobby.</span> I publish, build, and ship — and this page is the proof.
                Every section here represents real work in progress, not aspirations.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Research Interests — hierarchical identity ── */}
        <section>
          <SectionHeader icon={Brain} label="Research Interests" index={0} />
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
            className="mt-6 rounded-2xl bg-dark-800/60 border border-white/8 overflow-hidden">

            {/* Core — Enterprise AI */}
            <div className="p-6 border-b border-white/6 bg-gradient-to-r from-accent-blue/8 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-white text-base">Enterprise AI</h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-accent-blue/20 border border-accent-blue/30 text-accent-blue uppercase tracking-wider">Core Focus</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">The foundation of my research identity</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed ml-13 pl-1">
                Applying large language models and agentic AI to enterprise IT workflows — turning complex operations into intelligent, autonomous systems that augment human decision-making.
              </p>
            </div>

            {/* Branches */}
            <div className="divide-y divide-white/5">
              {[
                {
                  icon: Cpu,
                  label: 'AIOps',
                  rel: 'Applied arm of Enterprise AI',
                  desc: 'AI-driven IT operations — predictive incident management, automated remediation, and intelligent monitoring pipelines that learn from enterprise environments.',
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/8',
                  border: 'border-blue-500/15',
                },
                {
                  icon: Shield,
                  label: 'Cloud Security',
                  rel: 'Where AI meets risk management',
                  desc: 'Zero Trust architecture, Azure Secure Score optimisation, and AI-assisted threat detection — securing the infrastructure that Enterprise AI runs on.',
                  color: 'text-red-400',
                  bg: 'bg-red-500/8',
                  border: 'border-red-500/15',
                },
                {
                  icon: Sparkles,
                  label: 'Generative AI',
                  rel: 'The engine powering it all',
                  desc: 'Practical GenAI integration — RAG pipelines, prompt engineering, Claude/GPT tool use, and enterprise AI copilots grounded in real operational data.',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/8',
                  border: 'border-cyan-500/15',
                },
              ].map((item, i) => (
                <div key={item.label} className="flex items-start gap-4 p-5 hover:bg-white/2 transition-colors">
                  {/* Tree line */}
                  <div className="flex flex-col items-center flex-shrink-0 mt-1" style={{width:20}}>
                    <div className="w-px flex-1 bg-white/10" style={{minHeight:8}} />
                    <div className="w-2 h-2 rounded-full border-2 border-white/20 bg-dark-800 flex-shrink-0" />
                    {i < 2 && <div className="w-px flex-1 bg-white/10" style={{minHeight:8}} />}
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border flex-shrink-0 ${item.bg} ${item.border}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-bold text-white text-sm">{item.label}</h4>
                      <span className={`text-[10px] font-medium ${item.color} opacity-70`}>— {item.rel}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Identity statement */}
            <div className="px-6 py-4 bg-white/2 border-t border-white/6">
              <p className="text-xs text-gray-600 italic text-center">
                &ldquo;These aren&apos;t scattered interests — they tell a coherent story: making enterprise IT smarter, safer, and more autonomous through AI.&rdquo;
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Publications ── */}
        <section>
          <SectionHeader icon={FileText} label="Publications" index={1} />
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
            className="mt-6 rounded-2xl border border-dashed border-white/10 bg-dark-800/30 p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-accent-blue" />
            </div>
            <p className="text-white font-bold mb-1">Publications Coming Soon</p>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Research papers and articles on Enterprise AI, AIOps, and Cloud Security are currently being prepared for submission.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-600">Expected Q4 2026</span>
            </div>
          </motion.div>
        </section>

        {/* ── Current Research ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionHeader icon={FlaskConical} label="Current Research" index={2} inline />
            <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-800/60 border border-white/8">
              {(['all','active','progress'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === t ? 'bg-accent-blue text-white' : 'text-gray-500 hover:text-white'}`}>
                  {t === 'progress' ? 'In Progress' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {filteredResearch.map((r, i) => (
              <motion.div key={r.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                className="p-5 rounded-2xl bg-dark-800/60 border border-white/8 hover:border-accent-blue/20 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-white text-sm">{r.title}</h3>
                  <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    r.status === 'Active' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                    r.status === 'Literature Review' ? 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue' :
                    'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                  }`}>
                    {r.status === 'Active' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse" />}
                    {r.status === 'Literature Review' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue mr-1 animate-pulse" />}
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {r.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-gray-500">{tag}</span>
                  ))}
                  <span className="ml-auto text-[10px] text-gray-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Started {r.started}</span>
                  {r.submission && (
                    <span className="text-[10px] text-accent-blue flex items-center gap-1 font-semibold"><FileText className="w-3 h-3" /> Expected {r.submission}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Open Source ── */}
        <section>
          <SectionHeader icon={FolderGit2} label="Open Source Projects" index={3} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {OPEN_SOURCE.map((p, i) => (
              <motion.div key={p.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                className="p-5 rounded-2xl bg-dark-800/60 border border-white/8 hover:border-accent-blue/20 transition-colors flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{p.icon}</span>
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                  </div>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'Active' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-gray-500">{t}</span>
                  ))}
                </div>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-accent-blue hover:underline mt-auto">
                    <Github className="w-3.5 h-3.5" /> View on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-gray-700 mt-auto">
                    <Github className="w-3.5 h-3.5" /> Repository coming soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Datasets ── */}
        <section>
          <SectionHeader icon={Database} label="Datasets" index={4} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {DATASETS.map((d, i) => (
              <motion.div key={d.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                className="p-5 rounded-2xl bg-dark-800/60 border border-dashed border-white/10 hover:border-accent-blue/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xl">{d.icon}</span>
                  <h3 className="font-bold text-white text-sm">{d.name}</h3>
                  <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-500/10 border border-gray-500/20 text-gray-500">{d.status}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{d.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/8 text-gray-500">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Speaking & Certifications ── */}
        <section>
          <SectionHeader icon={Mic} label="Speaking &amp; Certifications" index={5} />
          <div className="mt-6 space-y-3">
            {SPEAKING.map((s, i) => (
              <motion.div key={s.event} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/60 border border-white/8 hover:border-white/15 transition-colors">
                <div className={`w-9 h-9 rounded-xl bg-dark-700 border border-white/8 flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-white truncate">{s.event}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      s.type === 'Certification' ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                    }`}>{s.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
                <span className="text-[11px] font-bold text-gray-600 flex-shrink-0">{s.year}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Collaborate CTA ── */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
          className="rounded-2xl bg-gradient-to-br from-accent-blue/10 to-cyan-400/5 border border-accent-blue/20 p-8 text-center">
          <Zap className="w-8 h-8 text-accent-blue mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">Interested in Collaborating?</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-5">
            Open to research collaborations, co-authoring papers, and contributing to open source projects in Enterprise AI and IT Operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,.3)]">
              Get in Touch <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold hover:bg-white/10 transition-all">
              View All Projects
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/* ── Section header helper ── */
function SectionHeader({ icon: Icon, label, index, inline = false }: {
  icon: React.ElementType; label: string; index: number; inline?: boolean
}) {
  if (inline) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-accent-blue" />
        </div>
        <h2 className="text-lg font-black text-white">{label}</h2>
      </div>
    )
  }
  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
      className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-accent-blue" />
      </div>
      <h2 className="text-lg font-black text-white">{label}</h2>
      <div className="flex-1 h-px bg-white/6 ml-2" />
    </motion.div>
  )
}
