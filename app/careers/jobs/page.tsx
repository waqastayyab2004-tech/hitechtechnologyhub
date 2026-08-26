'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search, MapPin, ExternalLink, Briefcase, Clock,
  RefreshCw, ChevronLeft, Bookmark, AlertCircle, Info,
} from 'lucide-react'
import type { NormalizedJob } from '@/app/api/careers/jobs/route'

const CATEGORIES = [
  { value: 'all',              label: 'All Jobs' },
  { value: 'it-jobs',          label: 'IT & Tech' },
  { value: 'engineering-jobs', label: 'Engineering' },
  { value: 'accounting-finance-jobs', label: 'Finance' },
  { value: 'healthcare-nursing-jobs', label: 'Healthcare' },
  { value: 'sales-jobs',       label: 'Sales' },
  { value: 'hr-jobs',          label: 'HR' },
  { value: 'management-jobs',  label: 'Management' },
]

const CITIES = ['All Cities', 'Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina', 'Tabuk', 'Abha']

const SOURCE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  linkedin:      { bg: 'bg-blue-500/10 border-blue-500/25',   text: 'text-blue-400',    dot: 'bg-blue-400' },
  indeed:        { bg: 'bg-violet-500/10 border-violet-500/25', text: 'text-violet-400', dot: 'bg-violet-400' },
  glassdoor:     { bg: 'bg-emerald-500/10 border-emerald-500/25', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  'baytcom':     { bg: 'bg-orange-500/10 border-orange-500/25', text: 'text-orange-400', dot: 'bg-orange-400' },
  naukrigulf:    { bg: 'bg-yellow-500/10 border-yellow-500/25', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  adzuna:        { bg: 'bg-cyan-500/10 border-cyan-500/25',    text: 'text-cyan-400',    dot: 'bg-cyan-400' },
  remotive:      { bg: 'bg-gray-500/10 border-gray-500/25',    text: 'text-gray-400',    dot: 'bg-gray-400' },
}

function sourceStyle(source: string) {
  return SOURCE_COLORS[source] ?? SOURCE_COLORS.adzuna
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

interface ApiResponse {
  jobs: NormalizedJob[]
  total: number
  sources: string[]
  configuredKeys: { adzuna: boolean; jsearch: boolean }
  cachedAt: string
}

export default function JobsPage() {
  const [data, setData]           = useState<ApiResponse | null>(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('all')
  const [city, setCity]           = useState('All Cities')
  const [query, setQuery]         = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({ category })
      if (query) params.set('q', query)
      const res  = await fetch(`/api/careers/jobs?${params}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to load jobs')
      setData(json)
      setLastUpdated(new Date())
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [category, query])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setQuery(search) }

  const saveJob = (job: NormalizedJob) => {
    const existing = JSON.parse(localStorage.getItem('career_tracker') || '[]')
    if (existing.find((j: any) => j.jobId === job.id)) { alert('Already saved!'); return }
    const entry = { id: Date.now(), jobId: job.id, title: job.title, company: job.company, url: job.url, status: 'saved', location: job.location, salary: job.salary ?? '', notes: '', dateAdded: new Date().toISOString() }
    localStorage.setItem('career_tracker', JSON.stringify([entry, ...existing]))
    alert(`"${job.title}" saved to tracker!`)
  }

  const filteredJobs = (data?.jobs ?? []).filter(j => {
    if (city === 'All Cities') return true
    return j.location?.toLowerCase().includes(city.toLowerCase()) || j.city?.toLowerCase().includes(city.toLowerCase())
  })

  const noKeys = data && !data.configuredKeys.adzuna && !data.configuredKeys.jsearch

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Header */}
        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-white">Jobs in Saudi Arabia</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">🇸🇦 KSA</span>
            </div>
            <p className="text-gray-500 text-sm">Live listings aggregated from LinkedIn, Indeed, Glassdoor, Bayt &amp; more — auto-refreshed hourly.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString()}</span>}
            <button onClick={fetchJobs} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors border border-white/8 px-3 py-1.5 rounded-lg hover:bg-white/5">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* Source badges */}
        {data?.sources && data.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {data.sources.map(s => (
              <span key={s} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {s}
              </span>
            ))}
          </div>
        )}

        {/* No keys warning */}
        {noKeys && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/25 text-amber-300 text-sm mb-5">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Add API keys to unlock Saudi Arabia jobs from LinkedIn, Indeed &amp; Bayt</p>
              <p className="text-xs text-amber-500">
                1. <strong>Adzuna</strong> — free at <a href="https://developer.adzuna.com" target="_blank" rel="noopener noreferrer" className="underline">developer.adzuna.com</a> →  add ADZUNA_APP_ID + ADZUNA_APP_KEY to .env.local{' '}
                &nbsp;·&nbsp;
                2. <strong>JSearch</strong> — free at <a href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target="_blank" rel="noopener noreferrer" className="underline">rapidapi.com</a> → add RAPIDAPI_KEY to .env.local
              </p>
              <p className="text-xs text-amber-600 mt-1">Showing remote jobs as fallback in the meantime.</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search job title, skills, company..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50" />
          </div>
          <select value={category} onChange={e => { setCategory(e.target.value) }}
            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-blue/50">
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={city} onChange={e => setCity(e.target.value)}
            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-blue/50">
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="px-6 py-3 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm transition-all">
            Search
          </button>
        </form>

        {/* Count row */}
        <div className="text-xs text-gray-600 mb-5">
          {loading ? 'Loading jobs...' : `${filteredJobs.length} jobs found in Saudi Arabia`}
          {city !== 'All Cities' && ` · Filtered: ${city}`}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {error}
          </div>
        )}

        {/* Job grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/6 bg-dark-800/60 animate-pulse h-52" />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 border border-white/6 rounded-2xl">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No jobs found</p>
            <p className="text-xs mt-1">Try a different search, category, or city</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => {
              const style = sourceStyle(job.source)
              return (
                <div key={job.id}
                  className="p-5 rounded-2xl border border-white/8 bg-dark-800/60 hover:border-white/16 transition-all duration-200 flex flex-col gap-3 group">

                  {/* Company + source */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      {job.companyLogo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={job.companyLogo} alt={job.company} className="w-9 h-9 rounded-lg object-contain bg-white/5 p-1 flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0 text-accent-blue font-black text-sm">
                          {job.company?.[0] ?? '?'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 truncate">{job.company}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${style.bg} ${style.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                      {job.sourceLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-accent-blue transition-colors line-clamp-2">
                    {job.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.city || job.location?.split(',')[0] || 'Saudi Arabia'}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.jobType}</span>
                    <span className="flex items-center gap-1 ml-auto"><Clock className="w-3 h-3" />{timeAgo(job.postedAt)}</span>
                  </div>

                  {/* Salary */}
                  {job.salary && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit">
                      {job.salary}
                    </span>
                  )}

                  {/* Tags */}
                  {job.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.tags.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] text-gray-500 bg-white/4 border border-white/8 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
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
              )
            })}
          </div>
        )}

        {/* Bottom note */}
        {!loading && filteredJobs.length > 0 && (
          <p className="text-center text-xs text-gray-700 mt-8">
            Jobs auto-refresh every hour · <button onClick={fetchJobs} className="text-gray-500 hover:text-gray-300 underline transition-colors">Refresh now</button>
          </p>
        )}
      </div>
    </div>
  )
}
