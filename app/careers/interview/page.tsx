'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, MessageSquare, Loader2, AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react'

type InterviewType = 'technical' | 'behavioural' | 'hr'

interface Question { question: string; hint: string }

const TYPES: { key: InterviewType; label: string; desc: string; color: string }[] = [
  { key: 'technical',   label: 'Technical',   desc: 'Role-specific skills, coding, architecture, tools', color: '#3b82f6' },
  { key: 'behavioural', label: 'Behavioural', desc: 'STAR-method situational questions from past experience', color: '#8b5cf6' },
  { key: 'hr',          label: 'HR & General', desc: 'Culture fit, motivation, salary, career goals', color: '#10b981' },
]

export default function InterviewPage() {
  const [jobDesc, setJobDesc]           = useState('')
  const [type, setType]                 = useState<InterviewType>('technical')
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [setupRequired, setSetupRequired] = useState(false)
  const [questions, setQuestions]       = useState<Question[]>([])
  const [openIdx, setOpenIdx]           = useState<number | null>(null)

  const generate = async () => {
    if (!jobDesc.trim()) { setError('Please paste a job description first.'); return }
    setLoading(true); setError(''); setQuestions([]); setSetupRequired(false)
    try {
      const res  = await fetch('/api/careers/ai/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'interview', jobDescription: jobDesc, interviewType: type }) })
      const data = await res.json()
      if (data.setupRequired) { setSetupRequired(true); return }
      if (data.error) throw new Error(data.error)
      setQuestions(data.questions ?? [])
      setOpenIdx(0)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const selected = TYPES.find(t => t.key === type)!

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>
        <h1 className="text-3xl font-black text-white mb-1">Interview Preparation</h1>
        <p className="text-gray-500 text-sm mb-6">AI-generated questions and answer guidance based on the actual job description.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Description</label>
              <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} rows={12}
                placeholder="Paste the full job description here — the more detail, the better the questions..."
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 resize-none leading-relaxed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Interview Type</label>
              <div className="grid grid-cols-1 gap-2">
                {TYPES.map(t => (
                  <button key={t.key} onClick={() => setType(t.key)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${type === t.key ? 'border-opacity-60 bg-opacity-10' : 'border-white/8 bg-dark-800/60 hover:border-white/16'}`}
                    style={type === t.key ? { borderColor: `${t.color}60`, background: `${t.color}10` } : {}}>
                    <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0 border-2 transition-all"
                      style={{ borderColor: t.color, background: type === t.key ? t.color : 'transparent' }} />
                    <div>
                      <p className="text-sm font-bold text-white">{t.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {setupRequired && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-0.5">Anthropic API key required</p>
                  <p className="text-xs text-amber-500">Add your real key to <code className="bg-white/10 px-1 rounded">.env.local</code> → <code className="bg-white/10 px-1 rounded">ANTHROPIC_API_KEY=sk-ant-...</code> then restart. Get a free key at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a>.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {error}
              </div>
            )}

            <button onClick={generate} disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] inline-flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Questions...</> : <><MessageSquare className="w-4 h-4" /> Generate {selected.label} Questions</>}
            </button>
          </div>

          {/* Right: Questions */}
          <div>
            {questions.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: selected.color }}>
                    {selected.label} Questions · {questions.length} total
                  </p>
                  <span className="text-xs text-gray-600">Click to expand answers</span>
                </div>
                {questions.map((q, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-dark-800/60 overflow-hidden">
                    <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/3 transition-colors">
                      <span className="text-sm font-black flex-shrink-0 font-mono" style={{ color: selected.color }}>Q{i + 1}</span>
                      <p className="flex-1 text-sm text-white font-semibold leading-snug">{q.question}</p>
                      {openIdx === i ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />}
                    </button>
                    {openIdx === i && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="p-3 rounded-lg border-l-2 bg-dark-900/60" style={{ borderColor: selected.color }}>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: selected.color }}>Answer Guidance</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{q.hint}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-white/6 rounded-2xl p-10 text-center min-h-64">
                <MessageSquare className="w-10 h-10 mb-3 opacity-25" />
                <p className="font-semibold text-sm">Questions will appear here</p>
                <p className="text-xs mt-1">Paste a job description, choose interview type, and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
