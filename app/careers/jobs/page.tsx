'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search, MapPin, ExternalLink, Briefcase, Clock,
  ChevronLeft, Bookmark, Globe,
} from 'lucide-react'

/* ── KSA Job Boards ───────────────────────────────────────────── */
const BOARDS = [
  {
    name: 'Bayt.com',
    desc: 'Top Middle East job portal — millions of KSA listings',
    color: 'from-blue-600 to-blue-800',
    logo: 'https://www.google.com/s2/favicons?domain=bayt.com&sz=64',
    home: 'https://www.bayt.com',
    url: (q: string) => q
      ? `https://www.bayt.com/en/saudi-arabia/jobs/?q%5Btitle_cont%5D=${encodeURIComponent(q)}`
      : 'https://www.bayt.com/en/saudi-arabia/jobs/',
  },
  {
    name: 'Gulf Naukri',
    desc: 'Saudi Arabia & Gulf region specialists',
    color: 'from-orange-500 to-red-600',
    logo: 'https://www.google.com/s2/favicons?domain=gulfnaukri.com&sz=64',
    home: 'https://www.gulfnaukri.com',
    url: (q: string) => q
      ? `https://www.gulfnaukri.com/jobs?q=${encodeURIComponent(q)}&l=Saudi+Arabia`
      : 'https://www.gulfnaukri.com',
  },
  {
    name: 'Naukrigulf',
    desc: 'Leading Gulf jobs board — Riyadh, Jeddah, Dammam',
    color: 'from-yellow-500 to-orange-500',
    logo: 'https://www.google.com/s2/favicons?domain=naukrigulf.com&sz=64',
    home: 'https://www.naukrigulf.com',
    url: (q: string) => q
      ? `https://www.naukrigulf.com/search-jobs?q=${encodeURIComponent(q)}&l=saudi-arabia`
      : 'https://www.naukrigulf.com',
  },
  {
    name: 'Tanqeeb',
    desc: 'Saudi-first job platform — local & expat roles',
    color: 'from-emerald-500 to-teal-600',
    logo: 'https://www.google.com/s2/favicons?domain=tanqeeb.com&sz=64',
    home: 'https://www.tanqeeb.com',
    url: (q: string) => q
      ? `https://www.tanqeeb.com/jobs?search=${encodeURIComponent(q)}&country=SA`
      : 'https://www.tanqeeb.com',
  },
  {
    name: 'LinkedIn Jobs',
    desc: 'Professional network — all industries in KSA',
    color: 'from-blue-500 to-blue-700',
    logo: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=64',
    home: 'https://www.linkedin.com/jobs',
    url: (q: string) => q
      ? `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=Saudi+Arabia`
      : 'https://www.linkedin.com/jobs',
  },
  {
    name: 'Indeed KSA',
    desc: "World's largest job site — Saudi Arabia edition",
    color: 'from-violet-500 to-purple-700',
    logo: 'https://www.google.com/s2/favicons?domain=sa.indeed.com&sz=64',
    home: 'https://sa.indeed.com',
    url: (q: string) => q
      ? `https://sa.indeed.com/jobs?q=${encodeURIComponent(q)}`
      : 'https://sa.indeed.com',
  },
  {
    name: 'Glassdoor',
    desc: 'Jobs + company reviews & salary insights',
    color: 'from-green-500 to-emerald-700',
    logo: 'https://www.google.com/s2/favicons?domain=glassdoor.com&sz=64',
    home: 'https://www.glassdoor.com',
    url: (q: string) => q
      ? `https://www.glassdoor.com/Job/saudi-arabia-${encodeURIComponent(q)}-jobs-SRCH_IL.0,12_IN195.htm`
      : 'https://www.glassdoor.com/Job/saudi-arabia-jobs-SRCH_IL.0,12_IN195.htm',
  },
  {
    name: 'Wuzzuf',
    desc: 'Leading Middle East & MENA job search',
    color: 'from-pink-500 to-rose-600',
    logo: 'https://www.google.com/s2/favicons?domain=wuzzuf.net&sz=64',
    home: 'https://wuzzuf.net',
    url: (q: string) => q
      ? `https://wuzzuf.net/search/jobs/?q=${encodeURIComponent(q)}`
      : 'https://wuzzuf.net',
  },
]

/* ── Remotive remote jobs ─────────────────────────────────────── */
interface RemoteJob {
  id: number
  url: string
  title: string
  company_name: string
  company_logo: string
  category: string
  tags: string[]
  job_type: string
  publication_date: string
  candidate_required_location: string
  salary: string
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

const REMOTE_CATEGORIES = [
  { value: '',                    label: 'All Remote' },
  { value: 'software-dev',       label: 'Software Dev' },
  { value: 'devops-sysadmin',    label: 'DevOps / Cloud' },
  { value: 'data',               label: 'Data & AI' },
  { value: 'product',            label: 'Product' },
  { value: 'backend',            label: 'Backend' },
  { value: 'frontend',           label: 'Frontend' },
]

export default function JobsPage() {
  const [search, setSearch]           = useState('')
  const [submitted, setSubmitted]     = useState('')
  const [remoteJobs, setRemoteJobs]   = useState<RemoteJob[]>([])
  const [remoteLoading, setRemoteLoading] = useState(true)
  const [remoteCat, setRemoteCat]     = useState('')

  const fetchRemote = useCallback(async () => {
    setRemoteLoading(true)
    try {
      const params = new URLSearchParams({ limit: '12' })
      if (remoteCat) params.set('category', remoteCat)
      if (submitted)  params.set('search', submitted)
      const res  = await fetch(`https://remotive.com/api/remote-jobs?${params}`)
      const data = await res.json()
      setRemoteJobs(data.jobs ?? [])
    } catch { setRemoteJobs([]) }
    finally  { setRemoteLoading(false) }
  }, [remoteCat, submitted])

  useEffect(() => { fetchRemote() }, [fetchRemote])

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(search) }

  const openAll = () => {
    BOARDS.forEach(b => window.open(b.home, '_blank', 'noopener'))
  }

  const saveJob = (job: RemoteJob) => {
    const existing = JSON.parse(localStorage.getItem('career_tracker') || '[]')
    if (existing.find((j: any) => j.jobId === job.id)) { alert('Already saved!'); return }
    const entry = { id: Date.now(), jobId: job.id, title: job.title, company: job.company_name,
      url: job.url, status: 'saved', location: job.candidate_required_location, salary: job.salary ?? '',
      notes: '', dateAdded: new Date().toISOString() }
    localStorage.setItem('career_tracker', JSON.stringify([entry, ...existing]))
    alert(`"${job.title}" saved to tracker!`)
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Header */}
        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-white">Jobs in Saudi Arabia &amp; Middle East</h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"> KSA &amp; GCC</span>
          </div>
          <p className="text-gray-500 text-sm">Search across 8 major KSA job boards at once, or browse remote-friendly global roles below.</p>
        </div>

        {/* ── Search bar ── */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="e.g. SAP Consultant, IT Manager, Cloud Engineer..."
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50"
            />
          </div>
          <button type="submit"
            className="px-6 py-3 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm transition-all">
            Search
          </button>
          <button type="button" onClick={openAll}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap">
            <Globe className="w-4 h-4" /> Open All Boards
          </button>
        </form>

        {/* ── KSA Job Boards Grid ── */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">KSA &amp; Gulf Job Boards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BOARDS.map(board => (
              <a
                key={board.name}
                href={board.home}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl border border-white/8 bg-dark-800/60 hover:border-white/20 hover:bg-dark-800 transition-all duration-200 flex flex-col gap-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${board.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
                <div className="flex items-center justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={board.logo} alt={board.name} className="w-8 h-8 rounded-lg object-contain bg-white/5 p-1" />
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{board.name}</p>
                  <p className="text-[11px] text-gray-500 leading-snug mt-0.5 line-clamp-2">{board.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Remote Jobs (Remotive) ── */}
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Remote-Friendly Global Roles</h2>
              <p className="text-xs text-gray-600 mt-0.5">Live from Remotive — open to worldwide applicants including Saudi Arabia</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={remoteCat} onChange={e => setRemoteCat(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-gray-400 text-xs focus:outline-none">
                {REMOTE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {remoteLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-5 rounded-2xl border border-white/6 bg-dark-800/60 animate-pulse h-44" />
              ))}
            </div>
          ) : remoteJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-white/6 rounded-2xl">
              <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No remote jobs found — try a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {remoteJobs.map(job => (
                <div key={job.id}
                  className="p-5 rounded-2xl border border-white/8 bg-dark-800/60 hover:border-white/16 transition-all duration-200 flex flex-col gap-3 group">

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      {job.company_logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={job.company_logo} alt={job.company_name}
                          className="w-9 h-9 rounded-lg object-contain bg-white/5 p-1 flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0 text-accent-blue font-black text-sm">
                          {job.company_name?.[0] ?? '?'}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 truncate pt-1">{job.company_name}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 bg-gray-500/10 border-gray-500/25 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                      Remote
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-accent-blue transition-colors line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.candidate_required_location || 'Worldwide'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {job.job_type || 'full time'}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {timeAgo(job.publication_date)}
                    </span>
                  </div>

                  {job.salary && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit">
                      {job.salary}
                    </span>
                  )}

                  {job.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.tags.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] text-gray-500 bg-white/4 border border-white/8 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto pt-1">
                    <a href={job.url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent-blue hover:bg-blue-500 text-white font-semibold text-xs transition-all">
                      Apply <ExternalLink className="w-3 h-3" />
                    </a>
                    <button onClick={() => saveJob(job)}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 text-xs transition-all"
                      title="Save to tracker">
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <Link href="/careers/resume"
                      className="px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/15 text-xs font-semibold transition-all">
                      Match CV
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
