import { NextResponse } from 'next/server'

export const revalidate = 3600

export interface NormalizedJob {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  city?: string
  url: string
  jobType: string
  salary?: string
  tags: string[]
  postedAt: string
  source: string
  sourceLabel: string
}

/* ── Adzuna (Saudi Arabia) ──────────────────────────────────────────
   Register free at https://developer.adzuna.com
   Set ADZUNA_APP_ID + ADZUNA_APP_KEY in .env.local
   Coverage: Indeed, company career pages, aggregated KSA boards
   ───────────────────────────────────────────────────────────────── */
async function fetchAdzuna(query: string, category: string): Promise<NormalizedJob[]> {
  const id  = process.env.ADZUNA_APP_ID
  const key = process.env.ADZUNA_APP_KEY
  if (!id || !key) return []

  const params = new URLSearchParams({
    app_id: id,
    app_key: key,
    results_per_page: '30',
    'content-type': 'application/json',
    where: 'Saudi Arabia',
  })
  if (query) params.set('what', query)
  if (category && category !== 'all') params.set('category', category)

  try {
    const res  = await fetch(`https://api.adzuna.com/v1/api/jobs/sa/search/1?${params}`)
    if (!res.ok) return []
    const data = await res.json()
    return (data.results ?? []).map((j: any): NormalizedJob => ({
      id:          `adzuna-${j.id}`,
      title:       j.title ?? '',
      company:     j.company?.display_name ?? 'Unknown',
      location:    j.location?.display_name ?? 'Saudi Arabia',
      city:        j.location?.area?.[3] ?? j.location?.area?.[2] ?? '',
      url:         j.redirect_url ?? '#',
      jobType:     j.contract_time === 'part_time' ? 'Part Time' : 'Full Time',
      salary:      j.salary_min ? `SAR ${Math.round((j.salary_min ?? 0) / 1000)}k – ${Math.round((j.salary_max ?? 0) / 1000)}k` : undefined,
      tags:        j.category?.label ? [j.category.label] : [],
      postedAt:    j.created ?? new Date().toISOString(),
      source:      'adzuna',
      sourceLabel: 'Indeed / Adzuna',
    }))
  } catch { return [] }
}

/* ── JSearch via RapidAPI ───────────────────────────────────────────
   Register free at https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
   Set RAPIDAPI_KEY in .env.local
   Coverage: LinkedIn, Indeed, Glassdoor, Bayt, Naukrigulf for KSA
   ───────────────────────────────────────────────────────────────── */
async function fetchJSearch(query: string): Promise<NormalizedJob[]> {
  const key = process.env.RAPIDAPI_KEY
  if (!key) return []

  const q = query ? `${query} jobs in Saudi Arabia` : 'jobs in Saudi Arabia'
  try {
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search-v2?query=${encodeURIComponent(q)}&country=sa&num_pages=2&date_posted=all`,
      {
        headers: {
          'x-rapidapi-key':  key,
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
          'Content-Type':    'application/json',
        },
      }
    )
    if (!res.ok) return []
    const data = await res.json()

    // search-v2 returns { data: { jobs: [...] } }; search returned { data: [...] }
    const jobs: any[] = Array.isArray(data.data) ? data.data : (data.data?.jobs ?? [])

    const sourceMap: Record<string, string> = {
      linkedin:   'LinkedIn',
      indeed:     'Indeed',
      glassdoor:  'Glassdoor',
      bayt:       'Bayt.com',
      naukrigulf: 'Naukrigulf',
    }

    return jobs.map((j: any): NormalizedJob => {
      const pub = (j.job_publisher ?? '').toLowerCase()
      const label = Object.entries(sourceMap).find(([k]) => pub.includes(k))?.[1] ?? j.job_publisher ?? 'JSearch'
      return {
        id:          `jsearch-${j.job_id}`,
        title:       j.job_title ?? '',
        company:     j.employer_name ?? 'Unknown',
        companyLogo: j.employer_logo ?? undefined,
        location:    [j.job_city, j.job_state, 'Saudi Arabia'].filter(Boolean).join(', '),
        city:        j.job_city ?? '',
        url:         j.job_apply_link ?? j.job_google_link ?? '#',
        jobType:     j.job_employment_type === 'PARTTIME' ? 'Part Time' : 'Full Time',
        salary:      j.job_min_salary
          ? `${j.job_salary_currency ?? 'SAR'} ${Math.round((j.job_min_salary ?? 0) / 1000)}k – ${Math.round((j.job_max_salary ?? 0) / 1000)}k`
          : undefined,
        tags:        (j.job_required_skills ?? j.job_highlights?.Qualifications ?? []).slice(0, 6),
        postedAt:    j.job_posted_at_timestamp
          ? new Date(j.job_posted_at_timestamp * 1000).toISOString()
          : new Date().toISOString(),
        source:      label.toLowerCase().replace(/\s|\./g, ''),
        sourceLabel: label,
      }
    })
  } catch { return [] }
}

/* ── Remotive (remote only — fallback when no keys configured) ───── */
async function fetchRemotive(query: string): Promise<NormalizedJob[]> {
  try {
    // Try multiple categories to always return results
    const categories = query ? [''] : ['software-dev', 'devops-sysadmin', 'data', 'product', 'management']
    const results: NormalizedJob[] = []

    for (const cat of categories.slice(0, 2)) {
      const params = new URLSearchParams({ limit: '15' })
      if (cat) params.set('category', cat)
      if (query) params.set('search', query)
      const res  = await fetch(`https://remotive.com/api/remote-jobs?${params}`)
      if (!res.ok) continue
      const data = await res.json()
      const jobs = (data.jobs ?? []).map((j: any): NormalizedJob => ({
        id:          `remotive-${j.id}`,
        title:       j.title,
        company:     j.company_name,
        companyLogo: j.company_logo,
        location:    j.candidate_required_location || 'Remote / Worldwide',
        url:         j.url,
        jobType:     j.job_type?.replace('_', ' ') ?? 'Full Time',
        salary:      j.salary || undefined,
        tags:        j.tags ?? [],
        postedAt:    j.publication_date,
        source:      'remotive',
        sourceLabel: 'Remotive',
      }))
      results.push(...jobs)
      if (results.length >= 20) break
    }
    return results
  } catch { return [] }
}

/* ── Dedup helper ──────────────────────────────────────────────────── */
function dedup(jobs: NormalizedJob[]): NormalizedJob[] {
  const seen = new Set<string>()
  return jobs.filter(j => {
    const key = `${j.title.toLowerCase().trim()}|${j.company.toLowerCase().trim()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/* ── Route handler ─────────────────────────────────────────────────── */
function isRealKey(val: string | undefined, prefix?: string): boolean {
  if (!val || val.startsWith('your_') || val === '') return false
  if (prefix && !val.startsWith(prefix)) return false
  return val.length > 8
}

export async function GET() {
  const query    = ''
  const category = 'all'

  const hasAdzuna  = isRealKey(process.env.ADZUNA_APP_ID) && isRealKey(process.env.ADZUNA_APP_KEY)
  const hasJSearch = isRealKey(process.env.RAPIDAPI_KEY)

  let jobs: NormalizedJob[] = []
  const sources: string[]   = []

  if (hasAdzuna || hasJSearch) {
    const [adzuna, jsearch] = await Promise.all([
      fetchAdzuna(query, category),
      fetchJSearch(query),
    ])
    if (adzuna.length)  sources.push('Adzuna (Indeed · Company Sites)')
    if (jsearch.length) sources.push('JSearch (LinkedIn · Indeed · Glassdoor · Bayt)')
    jobs = dedup([...jsearch, ...adzuna])
  } else {
    jobs = await fetchRemotive(query)
    if (jobs.length) sources.push('Remotive (Remote Jobs — add Adzuna & JSearch keys for KSA jobs)')
  }

  const configuredKeys = {
    adzuna:  hasAdzuna,
    jsearch: hasJSearch,
  }

  return NextResponse.json({
    jobs,
    total:        jobs.length,
    sources,
    configuredKeys,
    cachedAt:     new Date().toISOString(),
    revalidatesIn: '1 hour',
  })
}
