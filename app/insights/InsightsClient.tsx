'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Zap, Shield, Cloud, Code, Network, Terminal, Server, Mail, Globe, Container, Lightbulb, ArrowRight, BookOpen, PlayCircle, FileText } from 'lucide-react'

const topics = [
  { icon: Brain,     label: 'AI & Machine Learning',  color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', count: 12, image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80', highlights: ['LLMs & Prompt Engineering','AI Agents & Tools','AIOps & Automation','RAG Pipelines','AI for IT Ops'] },
  { icon: Zap,       label: 'IT Automation',           color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', count: 8,  image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&q=80', highlights: ['Python Automation','Power Apps / Automate','API Integrations','SNOW Workflows','Cron & Daemons'] },
  { icon: Shield,    label: 'Cybersecurity',           color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    count: 9,  image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80', highlights: ['Zero Trust','Azure Security','Endpoint Protection','IAM & MFA','Compliance'] },
  { icon: Cloud,     label: 'Cloud & Azure',           color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   count: 14, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', highlights: ['Azure Architecture','Hybrid Cloud','IaaS / PaaS','Cost Optimisation','Azure DevOps'] },
  { icon: Server,    label: 'IT Infrastructure',       color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/20',    count: 11, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80', highlights: ['Cisco & Aruba','Windows Server','Active Directory','SCCM & Intune','L2/L3 Support'] },
  { icon: Mail,      label: 'Microsoft 365',           color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', count: 11, image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&q=80', highlights: ['Exchange Online','Teams Admin','SharePoint','Intune MDM','Conditional Access'] },
  { icon: Container, label: 'ServiceNow & ITSM',       color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',count: 7,  image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80', highlights: ['SLA Design','KB Strategy','Workflow Automation','ITIL v3','Ticket Management'] },
  { icon: Code,      label: 'Python & Development',    color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20',  count: 15, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80', highlights: ['Python Scripting','FastAPI / Flask','REST APIs','PowerShell','Git & DevOps'] },
  { icon: Network,   label: 'Networking',              color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   count: 7,  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80', highlights: ['TCP/IP & Subnetting','DNS & DHCP','VLANs','Firewall Rules','VPN & SD-WAN'] },
  { icon: Terminal,  label: 'Linux & DevOps',          color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', count: 9,  image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80', highlights: ['Shell Scripting','Docker / K8s','CI/CD Pipelines','System Hardening','SSH & Remote'] },
  { icon: Globe,     label: 'IT Career & Growth',      color: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   count: 6,  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', highlights: ['Career Planning','Certifications','Enterprise Skills','AI Upskilling','Portfolio Building'] },
  { icon: Lightbulb, label: 'IT Tips & Guides',        color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  count: 20, image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&q=80', highlights: ['Productivity Tools','Troubleshooting','Tool Reviews','Real-World Scenarios','Quick Wins'] },
]

const featuredInsights = [
  { type: 'Article', title: 'How AI Replaced 80% of My Manual IT Work', desc: 'ServiceNow automation, email summarisation, and Python scripts that reclaimed 100 minutes every day.', tag: 'AI & Automation', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop', slug: 'ai-is-replacing-it-manual-work', color: 'text-purple-400', border: 'border-l-purple-500' },
  { type: 'Article', title: 'Azure Security in the Real World', desc: 'What the AZ-500 certification doesn\'t teach you — Zero Trust, Conditional Access, and 200+ user deployments.', tag: 'Cybersecurity', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop', slug: 'azure-security-real-world', color: 'text-red-400', border: 'border-l-red-500' },
  { type: 'Guide', title: 'ServiceNow Mastery: 1,500 Tickets/Year', desc: 'SLA design, KB strategy, auto-assignment, and the metrics that actually matter in enterprise ITSM.', tag: 'ServiceNow', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop', slug: 'servicenow-mastery-enterprise', color: 'text-emerald-400', border: 'border-l-emerald-500' },
  { type: 'Guide', title: 'Intune/Autopilot in 90 Days', desc: 'From legacy SCCM to Modern Workplace — the exact rollout plan, mistakes to avoid, and before/after metrics.', tag: 'Microsoft 365', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop', slug: 'intune-autopilot-modern-workplace-deployment', color: 'text-sky-400', border: 'border-l-sky-500' },
  { type: 'Article', title: 'IT Career in the AI Era', desc: 'Honest advice on staying relevant — skills trajectory, what to drop, and the 4 career profiles that matter now.', tag: 'Career', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop', slug: 'it-career-ai-era-stay-relevant', color: 'text-pink-400', border: 'border-l-pink-500' },
  { type: 'Guide', title: 'PowerBI for IT Teams', desc: 'Build dashboards that leadership actually reads — architecture, 5 essential charts, and adoption tactics.', tag: 'Analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop', slug: 'powerbi-for-it-teams', color: 'text-yellow-400', border: 'border-l-yellow-500' },
]

const allCategories = ['All', 'AI & Automation', 'Cybersecurity', 'Microsoft 365', 'ServiceNow', 'Cloud & Azure', 'Career', 'Infrastructure', 'Analytics']

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? featuredInsights
    : featuredInsights.filter(i => i.tag === activeCategory || i.tag.includes(activeCategory.split(' ')[0]))

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80&auto=format&fit=crop"
            alt="Insights" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/88 to-dark-900/60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent-blue">Insights</span>
          </div>
          {/* Featured article overlay */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/25 text-accent-blue text-xs font-bold mb-5">
              <BookOpen className="w-3 h-3"/> Featured Insight
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              How AI Replaced 80% of My Manual IT Work
            </h1>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              ServiceNow automation, email summarisation, and Python scripts that reclaimed 100 minutes every day — a real story from enterprise IT.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog/ai-is-replacing-it-manual-work" className="btn-primary px-7 py-3">
                <BookOpen className="w-4 h-4"/> Read Article
              </Link>
              <Link href="/blog" className="btn-outline px-7 py-3">
                All Articles <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-white/8 bg-dark-800/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: '16+', l: 'Articles Published' },
            { v: '12', l: 'Technology Topics' },
            { v: '15+', l: 'Years of Insights' },
            { v: 'Free', l: 'All Content' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-3xl font-black gradient-text mb-1">{s.v}</div>
              <div className="text-gray-500 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Insights with filter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="section-heading mb-3">IT Insights &amp; Guides</h2>
          <p className="section-subheading max-w-2xl">Practical, real-world knowledge from 15+ years in enterprise IT — no fluff, no theory-only content.</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-accent-blue border-accent-blue text-white'
                  : 'bg-dark-700 border-white/10 text-gray-400 hover:border-accent-blue/40 hover:text-gray-300'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((ins, i) => (
            <Link key={i} href={`/blog/${ins.slug}`}
              className={`glass-card overflow-hidden flex flex-col border-l-4 ${ins.border} hover:-translate-y-1 transition-transform duration-300 group`}>
              <div className="h-44 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ins.img} alt={ins.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"/>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-900/80 border border-white/10 text-gray-300 flex items-center gap-1">
                  {ins.type === 'Article' ? <FileText className="w-2.5 h-2.5"/> : <BookOpen className="w-2.5 h-2.5"/>}
                  {ins.type}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-900/80 border border-white/10 ${ins.color}`}>{ins.tag}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className={`font-bold text-white mb-2 group-hover:${ins.color} transition-colors leading-snug`}>{ins.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{ins.desc}</p>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold ${ins.color}`}>
                  Read more <ArrowRight className="w-3 h-3"/>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" className="btn-primary px-8 py-3.5">
            View All Articles <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
      </section>

      {/* Topics section — merged from Topics page */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="section-heading mb-3">Browse by Topic</h2>
            <p className="section-subheading max-w-2xl">12 technology domains covered — from AI and cybersecurity to networking, M365, and career development.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map((topic, i) => (
              <Link key={topic.label} href="/blog"
                className={`glass-card overflow-hidden transition-all duration-300 border ${topic.border} hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] group flex flex-col`}>
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={topic.image} alt={topic.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/90"/>
                  <div className={`absolute bottom-3 left-3 w-8 h-8 rounded-lg ${topic.bg} border ${topic.border} flex items-center justify-center`}>
                    <topic.icon className={`w-4 h-4 ${topic.color}`}/>
                  </div>
                  <span className={`absolute bottom-3 right-3 text-[10px] font-mono ${topic.color} bg-black/40 px-1.5 py-0.5 rounded-full`}>
                    {topic.count} articles
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className={`font-bold text-white text-sm mb-2 group-hover:${topic.color} transition-colors`}>{topic.label}</h3>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {topic.highlights.slice(0, 3).map(h => (
                      <span key={h} className={`text-[10px] px-1.5 py-0.5 rounded ${topic.bg} ${topic.color} border ${topic.border}`}>{h}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center">
          <BookOpen className="w-10 h-10 text-accent-blue mx-auto mb-4"/>
          <h2 className="text-2xl font-black text-white mb-3">Stay Ahead of Enterprise IT</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Practical articles, real-world guides, and IT career insights — published regularly. All free, no spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <input type="email" placeholder="your@email.com"
              className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
            <button className="btn-primary px-6 py-3 whitespace-nowrap">Subscribe Free</button>
          </div>
          <p className="text-xs text-gray-600">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  )
}
