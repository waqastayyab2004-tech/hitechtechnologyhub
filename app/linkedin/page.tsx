'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import {
  Linkedin, LogOut, Mail, CheckCircle, User,
  Search, Building2, ArrowRight, ExternalLink,
  Briefcase, Users, Globe, Link2, ChevronRight,
} from 'lucide-react'

interface Profile {
  id: string; name: string; firstName: string; lastName: string
  picture: string; email: string; emailVerified: boolean
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(?:^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : null
}

function extractLinkedInUsername(input: string): string {
  const clean = input.trim().replace(/\/$/, '')
  const m = clean.match(/linkedin\.com\/in\/([^/?#]+)/)
  if (m) return m[1]
  const m2 = clean.match(/linkedin\.com\/company\/([^/?#]+)/)
  if (m2) return m2[1]
  return clean.replace(/^@/, '')
}

type SearchTab = 'people' | 'company' | 'lookup'

export default function LinkedInPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading]  = useState(true)
  const [error, setError]      = useState('')
  const [tab, setTab]          = useState<SearchTab>('people')
  const [query, setQuery]      = useState('')
  const [searched, setSearched] = useState(false)
  const [lookupInput, setLookupInput] = useState('')
  const [lookupResult, setLookupResult] = useState<{ username: string; type: 'in' | 'company' } | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const err = params.get('error')
    if (err) {
      const msgs: Record<string, string> = {
        auth_failed:    'Authentication failed. Please try again.',
        token_failed:   'Sign-in incomplete. Please try again.',
        profile_failed: 'Could not load your profile. Please try again.',
      }
      setError(msgs[err] ?? 'Sign-in failed. Please try again.')
      window.history.replaceState({}, '', '/linkedin')
    }
    const raw = getCookie('li_profile')
    if (raw) { try { setProfile(JSON.parse(raw)) } catch {} }
    setLoading(false)
  }, [])

  const handleSignIn = () => {
    const state = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('li_oauth_state', state)
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: '78w7hz3csiwxll',
      redirect_uri: `${window.location.origin}/api/auth/linkedin/callback`,
      scope: 'openid profile email',
      state,
    })
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`
  }

  const signOut = () => { document.cookie = 'li_profile=; max-age=0; path=/'; setProfile(null) }

  const buildSearchUrl = () => {
    const q = encodeURIComponent(query.trim())
    return tab === 'people'
      ? `https://www.linkedin.com/search/results/people/?keywords=${q}&origin=GLOBAL_SEARCH_HEADER`
      : `https://www.linkedin.com/search/results/companies/?keywords=${q}`
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearched(true)
  }

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lookupInput.trim()) return
    const input = lookupInput.trim()
    const isCompany = input.includes('/company/') || input.toLowerCase().includes('company')
    const username = extractLinkedInUsername(input)
    setLookupResult({ username, type: isCompany ? 'company' : 'in' })
  }

  const quickChips = {
    people:  ['IT Engineer', 'Cloud Architect', 'SAP Consultant', 'DevOps Engineer', 'AI Engineer'],
    company: ['SAP', 'Microsoft', 'Amazon', 'Google', 'Accenture'],
    lookup:  [],
  }

  if (loading) return (
    <div className="min-h-screen bg-dark-900 pt-20 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#0A66C2] border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center mx-auto mb-4">
            <Linkedin className="w-8 h-8 text-[#0A66C2]" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">LinkedIn Hub</h1>
          <p className="text-gray-400 text-sm">Sign in · Search people &amp; companies · Profile lookup</p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>
        )}

        <div className="space-y-4">

          {/* ── Profile / Sign-in card ── */}
          {profile ? (
            <div className="rounded-2xl border border-[#0A66C2]/30 bg-dark-800/60 overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-[#0A66C2]/40 via-[#0A66C2]/20 to-cyan-600/15 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(10,102,194,0.4),transparent_60%)]" />
              </div>
              <div className="px-6 pb-6 -mt-10">
                <div className="flex items-end justify-between mb-4">
                  {profile.picture
                    ? <img src={profile.picture} alt={profile.name} className="w-20 h-20 rounded-2xl border-4 border-dark-800 object-cover shadow-xl" />
                    : <div className="w-20 h-20 rounded-2xl border-4 border-dark-800 bg-[#0A66C2]/20 flex items-center justify-center shadow-xl"><User className="w-8 h-8 text-[#0A66C2]" /></div>
                  }
                  <button onClick={signOut} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
                <h2 className="text-xl font-black text-white mb-1">{profile.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {profile.email}
                  {profile.emailVerified && <span className="flex items-center gap-1 text-xs text-green-400 font-semibold"><CheckCircle className="w-3 h-3" /> Verified</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2.5 rounded-lg bg-white/4 border border-white/8 text-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">First Name</p>
                    <p className="text-sm text-white font-bold">{profile.firstName}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/4 border border-white/8 text-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">Last Name</p>
                    <p className="text-sm text-white font-bold">{profile.lastName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://www.linkedin.com/in/me/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#0957a8] text-white text-xs font-bold transition-all">
                    <Linkedin className="w-3.5 h-3.5" /> My LinkedIn Profile <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link href="/careers/jobs" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10 transition-all">
                    <Briefcase className="w-3.5 h-3.5 text-accent-blue" /> Find Jobs
                  </Link>
                  <Link href="/careers/resume" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10 transition-all">
                    Resume Tools <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-dark-800/60 p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 space-y-2.5">
                  <p className="text-white font-bold text-sm mb-3">Sign in to see your LinkedIn profile here</p>
                  {[
                    { icon: User,         text: 'Your name, photo & email shown on this page' },
                    { icon: CheckCircle,  text: 'One-time redirect → brought back to this site' },
                    { icon: Briefcase,    text: 'Quick access to jobs, resume & career tools' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <Icon className="w-4 h-4 text-[#0A66C2] flex-shrink-0" />{text}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <a href="/linkedin/auth/"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0A66C2] hover:bg-[#0957a8] text-white font-bold text-sm transition-all shadow-[0_0_24px_rgba(10,102,194,0.35)]">
                    <Linkedin className="w-5 h-5" /> Sign in with LinkedIn
                  </a>
                  <p className="text-[10px] text-gray-600">Nothing is posted on your behalf</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Search / Lookup Hub ── */}
          <div className="rounded-2xl border border-white/10 bg-dark-800/60 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/8">
              {([
                { key: 'people',  label: 'People',    Icon: Users },
                { key: 'company', label: 'Companies', Icon: Building2 },
                { key: 'lookup',  label: 'Profile Lookup', Icon: Link2 },
              ] as { key: SearchTab; label: string; Icon: any }[]).map(({ key, label, Icon }) => (
                <button key={key} onClick={() => { setTab(key); setQuery(''); setSearched(false); setLookupResult(null) }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3.5 text-xs font-semibold transition-all ${tab === key ? 'text-[#0A66C2] border-b-2 border-[#0A66C2] bg-[#0A66C2]/5' : 'text-gray-500 hover:text-gray-300'}`}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* People / Company search */}
              {(tab === 'people' || tab === 'company') && (
                <>
                  <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input value={query} onChange={e => { setQuery(e.target.value); setSearched(false) }}
                        placeholder={tab === 'people' ? 'Name, job title, company…' : 'Company name…'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#0A66C2]/50" />
                    </div>
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0957a8] text-white text-sm font-bold transition-all">Search</button>
                  </form>

                  {!searched && (
                    <div className="flex flex-wrap gap-2">
                      {quickChips[tab].map(s => (
                        <button key={s} onClick={() => { setQuery(s); setSearched(true) }}
                          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/4 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {searched && query.trim() && (
                    <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-2">
                      <p className="text-xs text-gray-500 mb-3">
                        {tab === 'people' ? 'People' : 'Company'} results for <span className="text-white font-semibold">&quot;{query}&quot;</span> — opens on LinkedIn in new tab
                      </p>
                      {tab === 'people' ? (
                        <>
                          <SearchRow icon={Users}    label={`All people: "${query}"`}                url={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`} />
                          <SearchRow icon={Globe}    label={`"${query}" — 1st & 2nd connections`}    url={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}&network=%5B%22F%22%2C%22S%22%5D`} />
                          <SearchRow icon={Briefcase} label={`"${query}" — in Saudi Arabia`}          url={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}&geoUrn=%5B%22101363308%22%5D`} />
                        </>
                      ) : (
                        <>
                          <SearchRow icon={Building2} label={`Companies: "${query}"`}                 url={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(query)}`} />
                          <SearchRow icon={Globe}     label={`${query} company page`}                 url={`https://www.linkedin.com/company/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}/`} />
                          <SearchRow icon={Users}     label={`People who work at "${query}"`}         url={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`} />
                        </>
                      )}
                      <a href={buildSearchUrl()} target="_blank" rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0957a8] text-white text-sm font-bold transition-all">
                        <ExternalLink className="w-4 h-4" /> Open full results on LinkedIn
                      </a>
                    </div>
                  )}
                </>
              )}

              {/* Profile Lookup */}
              {tab === 'lookup' && (
                <>
                  <form onSubmit={handleLookup} className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input value={lookupInput} onChange={e => { setLookupInput(e.target.value); setLookupResult(null) }}
                        placeholder="linkedin.com/in/username or username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#0A66C2]/50" />
                    </div>
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0957a8] text-white text-sm font-bold transition-all">Look up</button>
                  </form>

                  {lookupResult && (
                    <div className="rounded-xl border border-[#0A66C2]/20 bg-[#0A66C2]/5 p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center flex-shrink-0">
                          {lookupResult.type === 'in' ? <User className="w-6 h-6 text-[#0A66C2]" /> : <Building2 className="w-6 h-6 text-[#0A66C2]" />}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">@{lookupResult.username}</p>
                          <p className="text-gray-500 text-xs">linkedin.com/{lookupResult.type}/{lookupResult.username}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <a href={`https://www.linkedin.com/${lookupResult.type}/${lookupResult.username}/`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all group">
                          <span className="text-sm text-white">View Profile on LinkedIn</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#0A66C2]" />
                        </a>
                        <a href={`https://www.linkedin.com/${lookupResult.type}/${lookupResult.username}/recent-activity/`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all group">
                          <span className="text-sm text-gray-300">Recent Activity</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                        </a>
                        {lookupResult.type === 'in' && (
                          <a href={`https://www.linkedin.com/messaging/compose/?to=${lookupResult.username}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all group">
                            <span className="text-sm text-gray-300">Send Message</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                          </a>
                        )}
                        {lookupResult.type === 'company' && (
                          <a href={`https://www.linkedin.com/company/${lookupResult.username}/jobs/`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all group">
                            <span className="text-sm text-gray-300">View Open Jobs</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {!lookupResult && (
                    <p className="text-xs text-gray-600">
                      Paste a LinkedIn profile or company URL (or just the username) to get quick links for that profile.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link href="/careers" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">← Back to Career Resources</Link>
        </div>
      </div>
    </div>
  )
}

function SearchRow({ icon: Icon, label, url }: { icon: any; label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/12 transition-all group">
      <div className="flex items-center gap-2.5">
        <Icon className="w-3.5 h-3.5 text-[#0A66C2] flex-shrink-0" />
        <span className="text-sm text-gray-300 group-hover:text-white">{label}</span>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#0A66C2] flex-shrink-0" />
    </a>
  )
}
