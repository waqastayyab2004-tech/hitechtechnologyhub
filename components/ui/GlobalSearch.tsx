'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, FileText, BookOpen, Code, Layout, GraduationCap, ChevronRight } from 'lucide-react'

/* ── Static search index ─────────────────────────────────────────────────── */

type ResultItem = {
  type: 'page' | 'article' | 'course' | 'project'
  title: string
  desc: string
  href: string
  tags?: string[]
}

const PAGES: ResultItem[] = [
  { type: 'page', title: 'Home',             desc: 'Welcome to HiTecH AI HUB',                       href: '/' },
  { type: 'page', title: 'IT Services',       desc: 'IT consulting, cloud, security & support',       href: '/services' },
  { type: 'page', title: 'Industries',        desc: 'Banking, energy, healthcare, telecom & more',    href: '/industries' },
  { type: 'page', title: 'Projects',          desc: '44 real IT implementations and built apps',      href: '/projects' },
  { type: 'page', title: 'Articles / Blog',   desc: '28 articles on AI, IT, automation & cloud',      href: '/blog' },
  { type: 'page', title: 'IT Learning',       desc: '22 courses — free & paid IT training',           href: '/training' },
  { type: 'page', title: 'AI Tools',          desc: 'Top AI tools for IT professionals',              href: '/resources' },
  { type: 'page', title: 'Portfolio',         desc: 'CV, certifications, experience, skill domains',  href: '/about' },
  { type: 'page', title: 'Contact Us',        desc: 'Free consultation — talk to Waqas',              href: '/contact' },
  { type: 'page', title: 'Insights',          desc: 'IT topics, guides and trends',                   href: '/insights' },
  { type: 'page', title: 'Medical Billing',   desc: 'US RCM outsourcing & revenue cycle',             href: '/medical-billing' },
  { type: 'page', title: 'Hire Waqas',        desc: 'Freelance & consulting engagement details',      href: '/hire' },
]

const ARTICLES: ResultItem[] = [
  { type: 'article', title: 'How I Replaced 5 Daily IT Tools With One AI Dashboard',     href: '/blog/ai-dashboard-replace-5-tools',          desc: 'AI Automation · Python · FastAPI',                           tags: ['AI','Python','FastAPI'] },
  { type: 'article', title: 'AI Is Replacing IT Manual Work — Are You Ready?',           href: '/blog/ai-is-replacing-it-manual-work',         desc: 'AI · Automation · IT Career',                               tags: ['AI','Automation'] },
  { type: 'article', title: 'Azure Security in the Real World',                          href: '/blog/azure-security-real-world',              desc: 'Azure · Security · Cloud',                                  tags: ['Azure','Security'] },
  { type: 'article', title: 'Best AI Tools for IT Professionals in 2026',                href: '/blog/best-ai-tools-2026',                     desc: 'AI Tools · Productivity',                                   tags: ['AI','Tools'] },
  { type: 'article', title: 'Claude Code Beginner Guide',                                href: '/blog/claude-code-beginner-guide',              desc: 'Claude · AI · Coding',                                      tags: ['Claude','AI'] },
  { type: 'article', title: 'Cybersecurity Basics for IT Teams',                         href: '/blog/cybersecurity-basics',                   desc: 'Security · Zero Trust · Enterprise',                        tags: ['Cybersecurity'] },
  { type: 'article', title: 'Excel to Flask: Build an IT Asset Manager',                 href: '/blog/excel-to-flask-it-asset-manager',        desc: 'Python · Flask · SQLite · Asset Management',               tags: ['Python','Flask'] },
  { type: 'article', title: 'How AI Is Changing IT Support',                             href: '/blog/how-ai-is-changing-it-support',           desc: 'AI · ServiceNow · Automation',                              tags: ['AI','ServiceNow'] },
  { type: 'article', title: 'Intune Autopilot: Modern Workplace Deployment',             href: '/blog/intune-autopilot-modern-workplace-deployment', desc: 'Intune · Autopilot · Microsoft 365',                 tags: ['Intune','Microsoft'] },
  { type: 'article', title: 'IT Admin to AI Engineer Roadmap',                           href: '/blog/it-admin-to-ai-engineer-roadmap',        desc: 'Career · AI · Certification',                               tags: ['Career','AI'] },
  { type: 'article', title: 'IT Asset Lifecycle Management Complete Guide',              href: '/blog/it-asset-lifecycle-management-complete-guide', desc: 'Asset Management · ITAM · Enterprise',             tags: ['ITAM'] },
  { type: 'article', title: 'IT Asset Management Best Practices: 1500 Devices',         href: '/blog/it-asset-management-best-practices-1500-devices', desc: 'ITAM · Enterprise · SAP',                      tags: ['ITAM','SAP'] },
  { type: 'article', title: 'IT Asset Management in a Multinational',                    href: '/blog/it-asset-management-multinational',      desc: 'ITAM · Global · Strategy',                                  tags: ['ITAM'] },
  { type: 'article', title: 'Top 5 IT Asset Management Tools & Best Practices',         href: '/blog/it-asset-management-top-5-tools-best-practices', desc: 'ITAM · Tools · Comparison',                    tags: ['ITAM','Tools'] },
  { type: 'article', title: 'IT Career in the AI Era: Stay Relevant',                   href: '/blog/it-career-ai-era-stay-relevant',         desc: 'Career · AI · Upskilling',                                  tags: ['Career','AI'] },
  { type: 'article', title: 'IT Pickup Point: Signifi Smart Locker Enterprise',         href: '/blog/it-pickup-point-signifi-smart-locker-enterprise', desc: 'Smart Locker · IT Operations',                 tags: ['IT Ops'] },
  { type: 'article', title: 'Microsoft 365 Admin Enterprise Guide',                     href: '/blog/microsoft-365-admin-enterprise-guide',   desc: 'M365 · Exchange · Admin',                                   tags: ['Microsoft','M365'] },
  { type: 'article', title: 'Power BI for IT Teams',                                    href: '/blog/powerbi-for-it-teams',                   desc: 'Power BI · Analytics · IT',                                 tags: ['PowerBI','Analytics'] },
  { type: 'article', title: 'Python Password Generator App Walkthrough',                href: '/blog/python-password-generator-app-walkthrough', desc: 'Python · Security · App Dev',                          tags: ['Python','Security'] },
  { type: 'article', title: 'SAP Ariba: IT Procurement Guide',                          href: '/blog/sap-ariba-it-procurement-guide',         desc: 'SAP · Ariba · Procurement',                                 tags: ['SAP'] },
  { type: 'article', title: 'SAP S/4HANA for IT Professionals',                         href: '/blog/sap-s4hana-for-it-professionals',        desc: 'SAP · S/4HANA · ERP',                                       tags: ['SAP'] },
  { type: 'article', title: 'ServiceNow CSM/FSM + AI Copilot',                          href: '/blog/servicenow-csm-fsm-ai-copilot-it-support', desc: 'ServiceNow · AI · CSM · FSM',                           tags: ['ServiceNow','AI'] },
  { type: 'article', title: 'ServiceNow Mastery for Enterprise IT',                     href: '/blog/servicenow-mastery-enterprise',          desc: 'ServiceNow · ITSM · Enterprise',                            tags: ['ServiceNow'] },
  { type: 'article', title: 'Sustainable IT: Green Technology in Enterprise',           href: '/blog/sustainable-it-green-technology-enterprise', desc: 'Green IT · Sustainability · Enterprise',             tags: ['GreenIT'] },
  { type: 'article', title: 'VIP IT Support for Executives',                            href: '/blog/vip-it-support-executives',              desc: 'VIP · C-Suite · IT Support',                                tags: ['VIP','Support'] },
  { type: 'article', title: 'WhatsApp + ServiceNow SLA Alerts with Python',             href: '/blog/whatsapp-servicenow-sla-alerts-python',  desc: 'Python · WhatsApp · ServiceNow · Automation',              tags: ['Python','ServiceNow'] },
  { type: 'article', title: 'Windows Automation Tips for IT Admins',                    href: '/blog/windows-automation-tips',                desc: 'Windows · PowerShell · Automation',                         tags: ['Windows','Automation'] },
  { type: 'article', title: 'Zero Trust: Secure Score 41 to 78',                        href: '/blog/zero-trust-secure-score-41-to-78',       desc: 'Zero Trust · Azure · Security Score',                       tags: ['Security','Azure'] },
]

const COURSES: ResultItem[] = [
  { type: 'course', title: 'IT Asset Lifecycle Management',                 href: '/training/101', desc: 'Corporate IT · Intermediate · 1h' },
  { type: 'course', title: 'Corporate Email Administration (Exchange)',      href: '/training/102', desc: 'Corporate IT · Intermediate · 1h' },
  { type: 'course', title: 'macOS Device Management (Jamf)',                 href: '/training/103', desc: 'Corporate IT · Intermediate · 2h' },
  { type: 'course', title: 'Meeting Room Technology & AV Support',          href: '/training/104', desc: 'Corporate IT · Beginner · 1h' },
  { type: 'course', title: 'Corporate Network & VPN Support',               href: '/training/105', desc: 'Corporate IT · Intermediate · 1h' },
  { type: 'course', title: 'IT Onboarding & Offboarding Processes',         href: '/training/106', desc: 'Corporate IT · Beginner · 1h' },
  { type: 'course', title: 'Enterprise Print Services Management',          href: '/training/107', desc: 'Corporate IT · Beginner · 1h' },
  { type: 'course', title: 'Mobile Device Management iOS & Android',        href: '/training/108', desc: 'Corporate IT · Intermediate · 1h 30m' },
  { type: 'course', title: 'Information Security Awareness',                href: '/training/109', desc: 'Corporate IT · Beginner · 30m' },
  { type: 'course', title: 'Self-Service Password Reset & MFA Recovery',    href: '/training/110', desc: 'Corporate IT · Beginner · 30m' },
  { type: 'course', title: 'ITLC Walk-up Kiosk & Queue Monitor Setup',      href: '/training/111', desc: 'ITSM · Intermediate · 1h 30m' },
  { type: 'course', title: 'Corporate Cybersecurity in Practice',           href: '/training/112', desc: 'Security · Intermediate · 4h · 8 modules' },
  { type: 'course', title: 'Build Social Media Manager App with Python',    href: '/training/113', desc: 'Python · Digital Marketing · 3h' },
  { type: 'course', title: 'Build Password Generator App with Python',      href: '/training/114', desc: 'Python · Security · 2h' },
  { type: 'course', title: 'CLEA App: SAP Asset Lifecycle Management',      href: '/training/115', desc: 'SAP · ITSM · 2h' },
  { type: 'course', title: 'ServiceNow CSM/FSM + HCSM AI Copilot',         href: '/training/116', desc: 'ServiceNow · AI · IT Ticketing' },
  { type: 'course', title: 'Office AV Technology — Build-Out & Commission', href: '/training/117', desc: 'AV · Office Tech · Intermediate' },
  { type: 'course', title: 'IT Pickup Point: Signifi Smart Locker',         href: '/training/118', desc: 'IT Ops · Smart Locker · Intermediate' },
  { type: 'course', title: 'IT Service Delivery with Python & AI',          href: '/training/3',   desc: 'Python · AI · Automation' },
  { type: 'course', title: 'ServiceNow ITSM Administration',                href: '/training/9',   desc: 'ServiceNow · ITSM · Enterprise' },
]

const PROJECTS: ResultItem[] = [
  { type: 'project', title: 'IT Asset Manager (Flask App)',         href: '/projects', desc: 'Python · Flask · SQLite · Excel sync' },
  { type: 'project', title: 'Waqas AI Hub Dashboard',              href: '/projects', desc: 'FastAPI · Python · ServiceNow · M365' },
  { type: 'project', title: 'ITLC Walk-up Kiosk Deployment',       href: '/projects', desc: 'ServiceNow · Queue Mgmt · Daily Ops' },
  { type: 'project', title: 'CLEA Asset Lifecycle Operations',      href: '/projects', desc: 'SAP · Asset Lifecycle · AI Automation' },
  { type: 'project', title: 'Password Generator Pro',              href: '/projects', desc: 'Python · Security · Web App' },
  { type: 'project', title: 'HiTecH Page Manager',                 href: '/projects', desc: 'React · CMS · Content Management' },
  { type: 'project', title: 'HiTecH AI HUB Website',               href: '/projects', desc: 'Next.js · Tailwind · Cloudflare Pages' },
  { type: 'project', title: 'SCCM → Intune Migration',             href: '/projects', desc: 'Intune · Autopilot · Enterprise IT' },
  { type: 'project', title: 'ServiceNow ITSM Implementation',       href: '/projects', desc: 'ServiceNow · ITSM · SAP' },
  { type: 'project', title: 'Azure Security Hardening',             href: '/projects', desc: 'Azure · Zero Trust · Secure Score 78' },
  { type: 'project', title: 'Microsoft 365 Tenant Deployment',     href: '/projects', desc: 'M365 · Exchange · Teams · Intune' },
  { type: 'project', title: 'SAP S/4HANA Rollout Support',         href: '/projects', desc: 'SAP · ERP · Change Management' },
]

const ALL_ITEMS: ResultItem[] = [...PAGES, ...ARTICLES, ...COURSES, ...PROJECTS]

const TYPE_META: Record<ResultItem['type'], { label: string; icon: React.ElementType; color: string }> = {
  page:    { label: 'Page',    icon: Layout,        color: 'text-cyan-400'   },
  article: { label: 'Article', icon: FileText,      color: 'text-violet-400' },
  course:  { label: 'Course',  icon: GraduationCap, color: 'text-emerald-400'},
  project: { label: 'Project', icon: Code,          color: 'text-amber-400'  },
}

const QUICK_LINKS: ResultItem[] = [
  { type: 'page',    title: 'IT Services',        href: '/services',  desc: 'View all services'    },
  { type: 'article', title: 'Latest Articles',    href: '/blog',      desc: '28 articles'          },
  { type: 'course',  title: 'Browse Courses',     href: '/training',  desc: '22 free & paid'       },
  { type: 'project', title: 'All Projects',       href: '/projects',  desc: '44 projects'          },
  { type: 'page',    title: 'Contact / Hire',     href: '/contact',   desc: 'Free consultation'    },
  { type: 'page',    title: 'Portfolio',          href: '/about',     desc: 'CV & certifications'  },
]

function score(item: ResultItem, q: string): number {
  const ql = q.toLowerCase()
  const t  = item.title.toLowerCase()
  const d  = item.desc.toLowerCase()
  const tags = (item.tags || []).join(' ').toLowerCase()
  if (t === ql)              return 100
  if (t.startsWith(ql))      return 90
  if (t.includes(ql))        return 80
  if (tags.includes(ql))     return 70
  if (d.includes(ql))        return 60
  const words = ql.split(/\s+/).filter(Boolean)
  const hits  = words.filter(w => t.includes(w) || d.includes(w) || tags.includes(w)).length
  return hits > 0 ? 40 + hits * 5 : 0
}

/* ── Component ────────────────────────────────────────────────────────────── */

interface Props {
  open: boolean
  onClose: () => void
}

export default function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery]         = useState('')
  const [results, setResults]     = useState<ResultItem[]>([])
  const [cursor, setCursor]       = useState(0)
  const inputRef  = useRef<HTMLInputElement>(null)
  const listRef   = useRef<HTMLDivElement>(null)
  const router    = useRouter()

  /* Search */
  useEffect(() => {
    const q = query.trim()
    if (!q) { setResults([]); setCursor(0); return }
    const scored = ALL_ITEMS
      .map(item => ({ item, s: score(item, q) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(x => x.item)
    setResults(scored)
    setCursor(0)
  }, [query])

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60)
      setQuery('')
      setResults([])
      setCursor(0)
    }
  }, [open])

  /* Keyboard navigation */
  const displayList = query.trim() ? results : QUICK_LINKS
  const navigate    = useCallback((item: ResultItem) => {
    router.push(item.href)
    onClose()
  }, [router, onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape')     { onClose(); return }
      if (e.key === 'ArrowDown')  { e.preventDefault(); setCursor(c => Math.min(c + 1, displayList.length - 1)) }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)) }
      if (e.key === 'Enter' && displayList[cursor]) navigate(displayList[cursor])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, cursor, displayList, navigate, onClose])

  /* Scroll active item into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  /* Group results by type */
  const grouped = displayList.reduce<Record<string, ResultItem[]>>((acc, item) => {
    const g = item.type
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})

  let flatIdx = 0
  const groups = Object.entries(grouped)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[201] w-full max-w-2xl px-4"
          >
            <div className="rounded-2xl border border-white/10 bg-dark-800/98 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden">

              {/* Search input row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search pages, articles, courses, projects…"
                  className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded border border-white/10 bg-white/5 text-[10px] text-gray-600 font-mono flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
                {groups.length === 0 && query.trim() ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2">
                    <Search className="w-8 h-8 text-gray-700" />
                    <p className="text-sm text-gray-500">No results for <span className="text-white">"{query}"</span></p>
                    <p className="text-xs text-gray-700">Try "azure", "python", "servicenow", "courses"</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {/* Section label */}
                    {!query.trim() && (
                      <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                        Quick links
                      </p>
                    )}

                    {groups.map(([type, items]) => {
                      const meta = TYPE_META[type as ResultItem['type']]
                      const Icon = meta.icon
                      return (
                        <div key={type}>
                          {query.trim() && (
                            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                              <Icon className={`w-3 h-3 ${meta.color}`} />
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                                {meta.label}s
                              </span>
                            </div>
                          )}
                          {items.map(item => {
                            const idx = flatIdx++
                            const active = cursor === idx
                            const Icon2 = TYPE_META[item.type].icon
                            return (
                              <button
                                key={item.href + item.title}
                                data-idx={idx}
                                onClick={() => navigate(item)}
                                onMouseEnter={() => setCursor(idx)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75 ${
                                  active ? 'bg-accent-blue/15' : 'hover:bg-white/5'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                  active ? 'bg-accent-blue/25 border border-accent-blue/30' : 'bg-white/5 border border-white/8'
                                }`}>
                                  <Icon2 className={`w-4 h-4 ${active ? 'text-accent-blue' : TYPE_META[item.type].color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium truncate ${active ? 'text-white' : 'text-gray-300'}`}>
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-gray-600 truncate">{item.desc}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-opacity ${active ? 'opacity-100 text-accent-blue' : 'opacity-0'}`} />
                              </button>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/6 bg-white/2">
                <div className="flex items-center gap-3 text-[10px] text-gray-700">
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-white/8 px-1.5 py-0.5 rounded text-[9px]">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-white/8 px-1.5 py-0.5 rounded text-[9px]">↵</kbd> open</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-white/8 px-1.5 py-0.5 rounded text-[9px]">ESC</kbd> close</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/60" />
                  HiTecH AI HUB Search
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
