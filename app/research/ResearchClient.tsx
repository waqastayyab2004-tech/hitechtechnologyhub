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
    href: 'https://orcid.org/0009-0007-8361-6123',
    icon: '🆔',
    status: 'live',
    color: 'border-green-500/20 bg-green-500/5 hover:border-green-500/40',
    badge: 'text-green-400 bg-green-500/10 border-green-500/20',
    badgeLabel: 'Active',
  },
  {
    label: 'Google Scholar',
    desc: 'Citation index & research metrics',
    href: null,
    icon: '🎓',
    status: 'soon',
    color: 'border-white/10 bg-white/3 hover:border-white/20',
    badge: 'text-gray-500 bg-white/5 border-white/10',
    badgeLabel: 'Coming Soon',
  },
  {
    label: 'GitHub',
    desc: 'Open source projects & code',
    href: 'https://github.com/waqastayyab2004-tech',
    icon: '🐙',
    status: 'live',
    color: 'border-accent-blue/20 bg-accent-blue/5 hover:border-accent-blue/40',
    badge: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
    badgeLabel: 'Active',
  },
  {
    label: 'LinkedIn',
    desc: 'Professional profile & endorsements',
    href: 'https://www.linkedin.com/in/syedwaqastayyab/',
    icon: '💼',
    status: 'live',
    color: 'border-[#0A66C2]/20 bg-[#0A66C2]/5 hover:border-[#0A66C2]/40',
    badge: 'text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/20',
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
    name: 'AI Asset Manager',
    desc: 'Flask-based IT asset management app with AI natural language query, Excel sync, and audit trail — built to replace manual Excel tracking for enterprise IT teams.',
    tags: ['Python', 'Flask', 'SQLite', 'AI Search'],
    status: 'Active',
    link: null,
    icon: '📦',
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
                      <span className="text-2xl">{p.icon}</span>
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
                      <span className="text-2xl">{p.icon}</span>
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

        {/* ── Research Interests ── */}
        <section>
          <SectionHeader icon={Brain} label="Research Interests" index={0} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {INTERESTS.map((item, i) => (
              <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                className="p-5 rounded-2xl bg-dark-800/60 border border-white/8 hover:border-white/15 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.label}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
