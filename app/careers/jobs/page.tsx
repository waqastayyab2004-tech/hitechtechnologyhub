'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search, MapPin, ExternalLink, Briefcase, Clock,
  RefreshCw, ChevronLeft, Bookmark, AlertCircle,
} from 'lucide-react'

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'c7ab47aedamsh79674eb55041da6p17a442jsn3237f9e7d80f'

const CATEGORIES = [
  { value: 'all',         label: 'All Jobs' },
  { value: 'IT',          label: 'IT & Tech' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Finance',     label: 'Finance' },
  { value: 'Healthcare',  label: 'Healthcare' },
  { value: 'Sales',       label: 'Sales' },
  { value: 'HR',          label: 'HR' },
  { value: 'Management',  label: 'Management' },
]

const CITIES = ['All Cities', 'Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina', 'Tabuk', 'Abha',
                'Dubai', 'Abu Dhabi', 'Kuwait City', 'Doha', 'Manama', 'Muscat']

const SOURCE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  LinkedIn:   { bg: 'bg-blue-500/10 border-blue-500/25',    text: 'text-blue-400',    dot: 'bg-blue-400' },
  Indeed:     { bg: 'bg-violet-500/10 border-violet-500/25', text: 'text-violet-400', dot: 'bg-violet-400' },
  Glassdoor:  { bg: 'bg-emerald-500/10 border-emerald-500/25', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  Bayt:       { bg: 'bg-orange-500/10 border-orange-500/25', text: 'text-orange-400', dot: 'bg-orange-400' },
  Naukrigulf: { bg: 'bg-yellow-500/10 border-yellow-500/25', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  Tanqeeb:    { bg: 'bg-pink-500/10 border-pink-500/25',    text: 'text-pink-400',    dot: 'bg-pink-400' },
  default:    { bg: 'bg-gray-500/10 border-gray-500/25',    text: 'text-gray-400',    dot: 'bg-gray-400' },
}

function sourceStyle(publisher: string) {
  for (const [key, val] of Object.entries(SOURCE_COLORS)) {
    if (publisher?.toLowerCase().includes(key.toLowerCase())) return val
  }
  return SOURCE_COLORS.default
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  city?: string
  country?: string
  url: string
  jobType: string
  salary?: string
  tags: string[]
  postedAt: string
  publisher: string
}

function normalizeJSearch(item: any): Job {
  const salaryMin = item.job_min_salary
  const salaryMax = item.job_max_salary
  const currency  = item.job_salary_currency ?? 'SAR'
  const salary = salaryMin && salaryMax
    ? `${currency} ${Math.round(salaryMin/1000)}k–${Math.round(salaryMax/1000)}k`
    : salaryMin ? `${currency} ${Math.round(salaryMin/1000)}k+`
    : undefined

  return {
    id:          item.job_id,
    title:       item.job_title,
    company:     item.employer_name,
    companyLogo: item.employer_logo ?? undefined,
    location:    [item.job_city, item.job_state, item.job_country].filter(Boolean).join(', '),
    city:        item.job_city ?? item.job_state ?? undefined,
    country:     item.job_country ?? undefined,
    url:         item.job_apply_link,
    jobType:     item.job_employment_type?.replace('_', ' ')?.toLowerCase() ?? 'full time',
    salary,
    tags:        item.job_required_skills?.slice(0, 5) ?? [],
    postedAt:    item.job_posted_at_datetime_utc ?? new Date().toISOString(),
    publisher:   item.job_publisher ?? 'JSearch',
  }
}

async function fetchJSearchJobs(query: string): Promise<Job[]> {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&num_pages=2&page=1`,
    {
      headers: {
        'X-RapidAPI-Key':  RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    }
  )
  if (!res.ok) throw new Error(`JSearch error: ${res.status}`)
  const data = await res.json()
  return (data.data ?? []).map(normalizeJSearch)
}

export default function JobsPage() {
  const [jobs, setJobs]           = useState<Job[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('all')
  const [city, setCity]           = useState('All Cities')
  const [activeQuery, setActiveQuery] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchJobs = useCallback(async () => {
    if (!RAPIDAPI_KEY) {
      setError('NEXT_PUBLIC_RAPIDAPI_KEY is not set. Add it in Cloudflare Pages → Settings → Environment Variables.')
      setLoading(false)
      return
    }
    setLoading(true); setError('')
    try {
      const cat  = category !== 'all' ? `${category} ` : ''
      const loc  = city !== 'All Cities' ? city : 'Saudi Arabia'
      const q    = activeQuery ? `${activeQuery} jobs in ${loc}` : `${cat}jobs in ${loc}`
      const results = await fetchJSearchJobs(q)
      setJobs(results)
      setLastUpdated(new Date())
    } catch (e: any) {
      setError(e.message ?? 'Failed to load jobs')
    } finally {
      setLoading(false) }
  }, [category, city, activeQuery])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setActiveQuery(search) }

  const saveJob = (job: Job) => {
    const existing = JSON.parse(localStorage.getItem('career_tracker') || '[]')
    if (existing.find((j: any) => j.jobId === job.id)) { alert('Already saved!'); return }
    const entry = { id: Date.now(), jobId: job.id, title: job.title, company: job.company, url: job.url,
      status: 'saved', location: job.location, salary: job.salary ?? '', notes: '', dateAdded: new Date().toISOString() }
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

        <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-white">Jobs in Saudi Arabia &amp; Middle East</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">🇸🇦 KSA &amp; GCC</span>
            </div>
            <p className="text-gray-500 text-sm">
              Live listings from LinkedIn, Indeed KSA, Glassdoor, Bayt, Naukrigulf &amp; more — powered by JSearch.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString()}</span>}
            <button onClick={fetchJobs}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors border border-white/8 px-3 py-1.5 rounded-lg hover:bg-white/5">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search job title, skills, company..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-blue/50">
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={city} onChange={e => setCity(e.target.value)}
            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-blue/50">
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit"
            className="px-6 py-3 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm transition-all">
            Search
          </button>
        </form>

        {/* Count row */}
        <div className="text-xs text-gray-600 mb-5">
          {loading ? 'Fetching live jobs...' : `${jobs.length} live jobs found`}
          {city !== 'All Cities' && ` · ${city}`}
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
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 border border-white/6 rounded-2xl">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No jobs found</p>
            <p className="text-xs mt-1">Try a different search or city</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => {
              const style = sourceStyle(job.publisher)
              return (
                <div key={job.id}
                  className="p-5 rounded-2xl border border-white/8 bg-dark-800/60 hover:border-white/16 transition-all duration-200 flex flex-col gap-3 group">

                  {/* Company + source */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      {job.companyLogo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={job.companyLogo} alt={job.company}
                          className="w-9 h-9 rounded-lg object-contain bg-white/5 p-1 flex-shrink-0" />
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
                      {job.publisher}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-accent-blue transition-colors line-clamp-2">
                    {job.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{job.city || job.location?.split(',')[0] || 'Saudi Arabia'}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <Briefcase className="w-3 h-3" />{job.jobType}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />{timeAgo(job.postedAt)}
                    </span>
                  </div>

                  {/* Salary */}
                  {job.salary && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit">
                      {job.salary}
                    </span>
                  )}

                  {/* Tags */}
                  {job.tags.length > 0 && (
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

        {!loading && jobs.length > 0 && (
          <p className="text-center text-xs text-gray-700 mt-8">
            Live jobs from JSearch · <button onClick={fetchJobs} className="text-gray-500 hover:text-gray-300 underline transition-colors">Refresh now</button>
          </p>
        )}
      </div>
    </div>
  )
}
