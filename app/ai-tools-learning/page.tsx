'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, ArrowRight, Clock, Star, Users, CheckCircle, BookOpen, Cpu, Zap, TrendingUp, Building2, Target, DollarSign, Linkedin, Globe, Briefcase, GraduationCap, FileText, Mail, Search } from 'lucide-react'

const TOOL_CATEGORIES = [
  { key: 'All',        label: 'All Tools',        icon: Brain    },
  { key: 'Claude',     label: 'Claude Code',      icon: Brain    },
  { key: 'ChatGPT',    label: 'ChatGPT',          icon: BookOpen },
  { key: 'Codex',      label: 'Codex / API',      icon: Cpu      },
  { key: 'Cursor',     label: 'Cursor AI',        icon: Zap      },
  { key: 'Perplexity', label: 'Perplexity',       icon: Globe    },
  { key: 'Copilot',    label: 'GitHub Copilot',   icon: BookOpen },
  { key: 'More',       label: 'More AI Tools',    icon: Cpu      },
]

const courses = [
  {
    slug: 'claude-code', category: 'Claude',
    title: 'Claude Code 101', subtitle: 'AI-Powered Developer Workflow',
    description: "Anthropic's official agentic coding tool — understands your codebase, edits files, runs commands, and integrates with your developer tools.",
    duration: '2h', rating: 5.0, students: '0+',
    isFree: true, isNew: true, isLive: true,
    icon: Brain, color: 'from-violet-600 to-purple-700',
    modules: ['What is Claude Code?','Your first prompt','Daily workflows','Customizing Claude Code','Quiz'],
  },
]

const comingSoon = [
  { key: 'ChatGPT',    title: 'ChatGPT for Enterprise — Prompts That Ship Results',   icon: BookOpen, color: 'text-green-400'  },
  { key: 'Codex',      title: 'OpenAI Codex — AI-Powered Code Generation at Scale',   icon: Cpu,      color: 'text-blue-400'   },
  { key: 'Cursor',     title: 'Cursor AI — Code Faster with AI Pair Programming',      icon: Zap,      color: 'text-yellow-400' },
  { key: 'Perplexity', title: 'Perplexity AI — Research & Knowledge at Speed',         icon: Brain,    color: 'text-cyan-400'   },
  { key: 'Copilot',    title: 'GitHub Copilot — Enterprise AI Coding at Scale',        icon: BookOpen, color: 'text-orange-400' },
  { key: 'More',       title: 'Gemini, Mistral, Llama & Open Source AI Tools',         icon: Globe,    color: 'text-violet-400' },
]

const impacts = [
  { icon: TrendingUp, color: 'text-green-400 bg-green-400/10',  title: 'Real Business Growth',  desc: 'AI that drives measurable outcomes — reduced costs, faster decisions, higher output.' },
  { icon: DollarSign, color: 'text-yellow-400 bg-yellow-400/10',title: 'Reduce AI Token Costs', desc: 'Most companies overspend on AI by 60–80%. Learn to right-size models and architect prompts.' },
  { icon: Building2,  color: 'text-blue-400 bg-blue-400/10',   title: 'Corporate AI Sessions', desc: 'Live training from zero to deployed AI workflows, tailored to your industry.' },
  { icon: Target,     color: 'text-violet-400 bg-violet-400/10',title: 'AI for Your Use Case',  desc: 'A roadmap built around your specific workflows — not generic AI advice.' },
]

const internalLinks = [
  { href: '/about',    icon: Briefcase,     label: 'Portfolio'   },
  { href: '/training', icon: GraduationCap, label: 'IT Learning' },
  { href: '/projects', icon: Target,        label: 'Projects'    },
  { href: '/blog',     icon: FileText,      label: 'Articles'    },
  { href: '/sap',      icon: Cpu,           label: 'SAP Hub'     },
  { href: '/contact',  icon: Mail,          label: 'Contact'     },
]

export default function AIToolsLearningPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filteredLive = courses.filter(c =>
    c.isLive &&
    (activeCategory === 'All' || c.category === activeCategory) &&
    (!search || c.title.toLowerCase().includes(search.toLowerCase()))
  )
  const filteredSoon = comingSoon.filter(c =>
    (activeCategory === 'All' || c.key === activeCategory) &&
    (!search || c.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-[#0a0f1e] pt-20 pb-20">
      <div className="flex min-h-screen">

        {/* ── LEFT LIBRARY SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/8 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto self-start">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-violet-400"/>
              </div>
              <div>
                <p className="text-xs font-black text-white">AI Tools Learning</p>
                <p className="text-[10px] text-violet-400 font-semibold">Course Library</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input
                placeholder="Search courses…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-dark-700 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
          <nav className="p-3 flex-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold px-2 mb-2">Library</p>
            {TOOL_CATEGORIES.map(cat => {
              const Icon = cat.icon
              const count = cat.key === 'All'
                ? courses.filter(c => c.isLive).length + comingSoon.length
                : courses.filter(c => c.isLive && c.category === cat.key).length + comingSoon.filter(c => c.key === cat.key).length
              return (
                <button key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); setSearch('') }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-0.5 ${
                    activeCategory === cat.key
                      ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}>
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 shrink-0"/>{cat.label}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat.key ? 'bg-violet-500/20 text-violet-300' : 'bg-white/8 text-gray-400'
                  }`}>{count}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 flex gap-6 p-6 lg:p-8 items-start">
          <div className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">AI Tools Learning</span>
            </div>

            {/* Heading — catchy hook at top, detail hidden behind Read More */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                <Brain className="w-4 h-4 text-violet-400"/>
              </div>
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">AI Tools Learning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Stop Googling.<br/>
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Start Building with AI.</span>
            </h1>
            <p className="text-base text-gray-300 max-w-xl mb-2 leading-relaxed">
              Real courses. Real tools. Zero toy examples. Each one built from production deployments — not demo videos.
            </p>
            {/* Collapsible detail */}
            <details className="max-w-xl mb-8 group">
              <summary className="text-xs text-violet-400 cursor-pointer hover:text-violet-300 transition-colors select-none list-none flex items-center gap-1 mb-2">
                <span className="group-open:hidden">▸ Read more about this programme</span>
                <span className="hidden group-open:inline">▾ Hide details</span>
              </summary>
              <div className="space-y-3 pt-2 border-t border-white/8">
                <p className="text-sm text-violet-300 italic leading-relaxed">
                  &ldquo;Most companies are using AI like a search engine. The ones winning are using it as an operational layer — automating the repeated, accelerating the complex, and freeing humans to focus on what actually builds the business.&rdquo;
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  These courses teach you how to implement AI tools around <span className="text-white font-semibold">your specific use case</span> — not generic prompts that work in a demo and fail in production. Whether you are an IT professional, a team lead, or an enterprise decision-maker, you will learn how to deploy AI that measurably reduces operational cost, eliminates repetitive workload, and delivers real business impact.
                </p>
              </div>
            </details>

            {/* Available Now */}
            {filteredLive.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-5">Available Now</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {filteredLive.map(course => {
                    const Icon = course.icon
                    return (
                      <Link key={course.slug} href={`/ai-tools-learning/${course.slug}`}
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 hover:bg-white/8 transition-all duration-300">
                        {course.isFree && <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest bg-green-600/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full uppercase">Free</span>}
                        {course.isNew && <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full uppercase">New</span>}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 mt-5`}>
                          <Icon className="w-6 h-6 text-white"/>
                        </div>
                        <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-violet-300 transition-colors">{course.title}</h3>
                        <p className="text-xs text-violet-400 font-medium mb-2">{course.subtitle}</p>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{course.duration}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>{course.rating}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{course.students}</span>
                        </div>
                        <ul className="space-y-1 mb-4">
                          {course.modules.map(m => (
                            <li key={m} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle className="w-3 h-3 text-violet-500 shrink-0"/>{m}
                            </li>
                          ))}
                        </ul>
                        <span className="flex items-center gap-2 text-sm font-semibold text-violet-400 group-hover:text-violet-300">
                          Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Coming Soon */}
            {filteredSoon.length > 0 && (
              <section className="mb-20">
                <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-5">Coming Soon</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredSoon.map(c => {
                    const Icon = c.icon
                    return (
                      <div key={c.title} className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className={`w-4 h-4 ${c.color}`}/>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 font-medium leading-snug">{c.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">In development</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Enterprise consulting */}
            <section className="border-t border-white/8 pt-14">
              <div className="text-center mb-10">
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Enterprise AI Consulting</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                  Beyond the Chatbot.<br/>
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Real AI Impact for Your Business.</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                  Most businesses are paying for AI tools they barely use — or using them wrong. I help enterprises identify where AI creates genuine operational value, implement it correctly, and measure the results.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {impacts.map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="bg-white/4 border border-white/8 rounded-2xl p-5">
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-5 h-5"/>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
              <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/30 border border-violet-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-2">Corporate AI Sessions Available</p>
                  <h3 className="text-2xl font-bold text-white mb-3">Let AI work. Let humans build.</h3>
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    &ldquo;Stop investing time in tasks AI can do in seconds. Invest that time back into the processes, decisions and relationships that only humans can drive. That&apos;s where real business growth happens.&rdquo;
                  </p>
                  <p className="text-gray-400 text-sm mt-3">
                    Engagements available across corporate AI training, tool audits, implementation consulting and enterprise AI strategy roadmaps.
                  </p>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
                    Book a Consultation <ArrowRight className="w-4 h-4"/>
                  </Link>
                  <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
                    View AI Services
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* ── RIGHT STICKY PROFILE SIDEBAR ── */}
          <aside className="hidden xl:flex flex-col w-68 shrink-0 sticky top-6 self-start gap-4" style={{width:'272px'}}>

            {/* Photo — tall */}
            <div className="relative rounded-2xl overflow-hidden border border-violet-500/30 shadow-[0_0_50px_rgba(139,92,246,0.18)] w-full" style={{height:'300px'}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/waqas-trainer.jpg" alt="Syed Waqas Tayyab" className="w-full h-full object-cover object-top"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/85 via-transparent to-transparent"/>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                Corporate AI &amp; IT Trainer
              </span>
            </div>

            {/* Bio */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-white font-bold text-base leading-tight mb-0.5">Syed Waqas Tayyab</p>
              <p className="text-violet-400 text-xs font-semibold mb-3">Corporate AI &amp; IT Coach · SAP Senior Engineer</p>
              <p className="text-gray-300 text-xs leading-relaxed mb-3">
                With over 15 years inside global enterprise environments — including 11 years at SAP Saudi Arabia — Waqas brings hands-on IT engineering depth and practical AI implementation experience to every corporate training engagement.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                He designs and delivers corporate sessions that move teams from AI curiosity to AI productivity — reducing costs, accelerating workflows, and building the confidence to sustain AI adoption independently.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['SAP BTP','Azure','ServiceNow','AI Automation','Corporate Training','M365'].map(s => (
                  <span key={s} className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <p className="text-gray-500 text-xs flex items-center gap-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0"/> Available for corporate engagements · Riyadh, KSA &amp; Remote
              </p>
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm mb-3">
                Book a Session <ArrowRight className="w-4 h-4"/>
              </Link>
              <div className="flex gap-2">
                <a href="https://www.linkedin.com/in/waqas-syed-tayyab" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-colors text-xs font-medium">
                  <Linkedin className="w-3.5 h-3.5"/> LinkedIn
                </a>
                <a href="https://www.facebook.com/HiTecHAIHUB" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 hover:border-blue-600/50 hover:bg-blue-600/10 text-gray-400 hover:text-blue-500 transition-colors text-xs font-medium">
                  <Globe className="w-3.5 h-3.5"/> HiTecH Hub
                </a>
              </div>
            </div>

            {/* Internal nav */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Explore My Work</p>
              <div className="grid grid-cols-2 gap-2">
                {internalLinks.map(({ href, icon: Icon, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/30 text-gray-400 hover:text-violet-300 transition-all text-xs font-medium">
                    <Icon className="w-3.5 h-3.5 shrink-0"/> {label}
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  )
}
