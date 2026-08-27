'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, BarChart2, FileText, Copy, Check, Loader2, AlertCircle } from 'lucide-react'

const WORKER_URL = 'https://ai-proxy.aisite.workers.dev'

type Tab = 'match' | 'generate'

interface MatchResult {
  score: number
  verdict: string
  matched: string[]
  missing: string[]
  recommendations: string[]
}

function parseJSON(text: string) {
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('Could not parse AI response')
  return JSON.parse(m[0])
}

async function workerPost(body: object) {
  const res = await fetch(WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(`AI error: ${res.status}`)
  return res.json()
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/8 bg-dark-800/60">
      <div className="relative w-28 h-28 mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{score}</span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-bold" style={{ color }}>{score >= 75 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Weak Match'}</p>
    </div>
  )
}

export default function ResumePage() {
  const [tab, setTab]               = useState<Tab>('match')
  const [jobDesc, setJobDesc]       = useState('')
  const [resume, setResume]         = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [generated, setGenerated]   = useState('')
  const [copied, setCopied]         = useState(false)

  const handleMatch = async () => {
    if (!jobDesc.trim() || !resume.trim()) { setError('Please paste both the job description and your resume.'); return }
    setLoading(true); setError(''); setMatchResult(null)
    try {
      const data = await workerPost({ action: 'match', jobDescription: jobDesc, resume })
      if (data.error) throw new Error(data.error)
      setMatchResult(data)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const handleGenerate = async () => {
    if (!jobDesc.trim() || !resume.trim()) { setError('Please paste both the job description and your resume.'); return }
    setLoading(true); setError(''); setGenerated('')
    try {
      const data = await workerPost({ action: 'generate', jobDescription: jobDesc, resume })
      if (data.error) throw new Error(data.error)
      setGenerated(data.result)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>
        <h1 className="text-3xl font-black text-white mb-1">Resume Tools</h1>
        <p className="text-gray-500 text-sm mb-6">AI-powered resume matching and tailored resume generation.</p>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-dark-800/80 border border-white/8 w-fit mb-6">
          {([['match', BarChart2, 'Match & Score'], ['generate', FileText, 'Generate Resume']] as const).map(([key, Icon, label]) => (
            <button key={key} onClick={() => { setTab(key); setError(''); setMatchResult(null); setGenerated('') }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === key ? 'bg-accent-blue text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]' : 'text-gray-400 hover:text-white'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Description</label>
              <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} rows={10}
                placeholder="Paste the full job description here..."
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 resize-none leading-relaxed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Resume</label>
              <textarea value={resume} onChange={e => setResume(e.target.value)} rows={10}
                placeholder="Paste your resume text here (plain text or markdown)..."
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 resize-none leading-relaxed" />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {error}
              </div>
            )}

            <button onClick={tab === 'match' ? handleMatch : handleGenerate} disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] inline-flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analysing...</> : tab === 'match' ? <><BarChart2 className="w-4 h-4" /> Analyse Match</> : <><FileText className="w-4 h-4" /> Generate Tailored Resume</>}
            </button>
          </div>

          {/* Results */}
          <div>
            {/* Match results */}
            {tab === 'match' && (
              matchResult ? (
                <div className="space-y-4">
                  <ScoreRing score={matchResult.score} />
                  <div className="p-4 rounded-xl bg-dark-800/60 border border-white/8">
                    <p className="text-sm text-gray-300 italic">{matchResult.verdict}</p>
                  </div>
                  {matchResult.matched?.length > 0 && (
                    <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Matched Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.matched.map(s => <span key={s} className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  )}
                  {matchResult.missing?.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Gaps to Address</p>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.missing.map(s => <span key={s} className="text-xs bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  )}
                  {matchResult.recommendations?.length > 0 && (
                    <div className="p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Recommendations</p>
                      <ul className="space-y-2">
                        {matchResult.recommendations.map((r, i) => <li key={i} className="text-xs text-gray-300 flex gap-2"><span className="text-blue-400 font-bold flex-shrink-0">{i + 1}.</span>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-white/6 rounded-2xl p-10 text-center min-h-64">
                  <BarChart2 className="w-10 h-10 mb-3 opacity-25" />
                  <p className="font-semibold text-sm">Results will appear here</p>
                  <p className="text-xs mt-1">Paste your job description and resume, then click Analyse Match</p>
                </div>
              )
            )}

            {/* Generate results */}
            {tab === 'generate' && (
              generated ? (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generated Resume</p>
                    <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors">
                      {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                    </button>
                  </div>
                  <pre className="w-full px-4 py-4 rounded-xl bg-dark-800/80 border border-white/8 text-gray-300 text-xs leading-relaxed overflow-auto whitespace-pre-wrap font-mono max-h-[600px]">{generated}</pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-white/6 rounded-2xl p-10 text-center min-h-64">
                  <FileText className="w-10 h-10 mb-3 opacity-25" />
                  <p className="font-semibold text-sm">Tailored resume will appear here</p>
                  <p className="text-xs mt-1">Paste your job description and resume, then click Generate</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
