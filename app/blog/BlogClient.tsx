'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Search, BookOpen } from 'lucide-react'

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return dateStr }
}

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
}

const CATEGORIES = [
  { key: 'All',                  label: 'All Articles',         tags: [] as string[] },
  { key: 'AI & Automation',      label: 'AI & Automation',      tags: ['AI', 'AI Automation', 'AI Engineering', 'Automation', 'AI Tools', 'Claude AI', 'Claude Code', 'AI Copilot'] },
  { key: 'ServiceNow & ITSM',    label: 'ServiceNow & ITSM',    tags: ['ServiceNow', 'ITSM', 'CSM/FSM', 'AI Copilot', 'Walk-up Queue', 'IT Support'] },
  { key: 'Cybersecurity',        label: 'Cybersecurity',        tags: ['Cybersecurity', 'Zero Trust', 'Azure Security', 'MFA', 'Conditional Access', 'Password', 'Security'] },
  { key: 'Python Development',   label: 'Python Development',   tags: ['Python', 'Flask', 'FastAPI', 'SQLite', 'Desktop App', 'PyInstaller'] },
  { key: 'IT Asset Management',  label: 'IT Asset Management',  tags: ['IT Asset Management', 'SAP Ariba', 'ERP', 'Procurement', 'Inventory', 'CLEA'] },
  { key: 'Enterprise IT',        label: 'Enterprise IT',        tags: ['Enterprise IT', 'IT Operations', 'Intune', 'Microsoft 365', 'SharePoint', 'Autopilot'] },
  { key: 'IT Career',            label: 'IT Career & Learning', tags: ['IT Career', 'Career', 'MLOps', 'Self-Taught', 'AI Engineering'] },
]

function matchesCategory(tags: string[], catKey: string): boolean {
  if (catKey === 'All') return true
  const cat = CATEGORIES.find(c => c.key === catKey)
  if (!cat || !cat.tags.length) return false
  return tags.some(t => cat.tags.some(ct =>
    t.toLowerCase().includes(ct.toLowerCase()) || ct.toLowerCase().includes(t.toLowerCase())
  ))
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => posts.filter(p => {
    const matchesCat = matchesCategory(p.tags, activeCategory)
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesSearch
  }), [posts, activeCategory, searchQuery])

  const featured = activeCategory === 'All' && !searchQuery ? posts.find(p => p.featured) : undefined
  const articles = featured ? filtered.filter(p => !p.featured) : filtered

  const catCount = (key: string) => key === 'All'
    ? posts.length
    : posts.filter(p => matchesCategory(p.tags, key)).length

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="flex">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-white/8 min-h-screen sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white"/>
              </div>
              <div>
                <p className="text-xs font-black text-white">Articles</p>
                <p className="text-[10px] text-accent-blue font-semibold">IT · AI · Cybersecurity · Cloud</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input
                placeholder="Search articles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-dark-700 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"
              />
            </div>
          </div>
          <nav className="p-3 flex-1">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-2">Topics</p>
            {CATEGORIES.map(cat => (
              <button key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setSearchQuery('') }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-0.5 ${
                  activeCategory === cat.key && !searchQuery
                    ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === cat.key && !searchQuery ? 'bg-accent-blue/20 text-accent-blue' : 'bg-white/5 text-gray-500'}`}>
                  {catCount(cat.key)}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">

          {/* Mobile pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setSearchQuery('') }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.key ? 'bg-accent-blue border-accent-blue text-white' : 'bg-dark-700 border-white/10 text-gray-400'
                }`}>
                {cat.key === 'All' ? 'All' : cat.label}
              </button>
            ))}
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white mb-1">
              {searchQuery ? `Search: "${searchQuery}"` : activeCategory === 'All' ? 'All Articles' : CATEGORIES.find(c => c.key === activeCategory)?.label ?? activeCategory}
            </h1>
            <p className="text-gray-400 text-sm">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} · Written from 15+ years of real enterprise IT experience
            </p>
          </div>

          {/* Featured article */}
          {featured && (
            <Link href={`/blog/${featured.slug}`}
              className="block glass-card p-6 md:p-8 mb-8 group hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-accent-blue/50">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden flex-shrink-0 border border-white/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/waqas-ai-expert.png" alt={featured.title} className="w-full h-full object-cover object-center"/>
                </div>
                <div className="flex-1">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full mb-3">★ Featured</span>
                  <h2 className="text-xl font-black text-white mb-2 group-hover:text-accent-blue transition-colors leading-snug">{featured.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {featured.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {featured.tags.slice(0, 4).map(t => (
                      <span key={t} className="text-[10px] bg-white/5 border border-white/8 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Articles grid */}
          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-semibold mb-2">No articles found</p>
              <p className="text-sm">Try a different search or topic</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {articles.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="glass-card p-5 flex flex-col group hover:-translate-y-0.5 transition-all duration-200 hover:border-accent-blue/25">
                  <div className="w-full h-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple mb-4 flex-shrink-0"/>
                  <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-accent-blue transition-colors line-clamp-2 flex-shrink-0">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] bg-white/5 border border-white/8 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-600 flex-shrink-0">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
