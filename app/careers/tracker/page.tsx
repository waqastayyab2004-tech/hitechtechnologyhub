'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, ChevronLeft, Briefcase, ExternalLink, Edit2, Check, X } from 'lucide-react'

type Status = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected'

interface Application {
  id: number
  title: string
  company: string
  url: string
  status: Status
  location: string
  salary: string
  notes: string
  dateAdded: string
}

const COLUMNS: { key: Status; label: string; color: string; bg: string }[] = [
  { key: 'saved',     label: 'Saved',     color: 'text-gray-400',    bg: 'border-gray-500/30 bg-gray-500/8' },
  { key: 'applied',   label: 'Applied',   color: 'text-blue-400',    bg: 'border-blue-500/30 bg-blue-500/8' },
  { key: 'interview', label: 'Interview', color: 'text-yellow-400',  bg: 'border-yellow-500/30 bg-yellow-500/8' },
  { key: 'offer',     label: 'Offer 🎉',  color: 'text-emerald-400', bg: 'border-emerald-500/30 bg-emerald-500/8' },
  { key: 'rejected',  label: 'Rejected',  color: 'text-red-400',     bg: 'border-red-500/30 bg-red-500/8' },
]

const BLANK: Omit<Application, 'id' | 'dateAdded'> = {
  title: '', company: '', url: '', status: 'saved', location: '', salary: '', notes: '',
}

function useTracker() {
  const [apps, setApps] = useState<Application[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('career_tracker')
    if (stored) setApps(JSON.parse(stored))
  }, [])

  const persist = (next: Application[]) => {
    setApps(next)
    localStorage.setItem('career_tracker', JSON.stringify(next))
  }

  const add = (data: Omit<Application, 'id' | 'dateAdded'>) => {
    const entry: Application = { ...data, id: Date.now(), dateAdded: new Date().toISOString() }
    persist([entry, ...apps])
  }

  const update = (id: number, patch: Partial<Application>) => {
    persist(apps.map(a => a.id === id ? { ...a, ...patch } : a))
  }

  const remove = (id: number) => {
    persist(apps.filter(a => a.id !== id))
  }

  return { apps, add, update, remove }
}

export default function TrackerPage() {
  const { apps, add, update, remove } = useTracker()
  const [showForm, setShowForm]     = useState(false)
  const [form, setForm]             = useState<typeof BLANK>({ ...BLANK })
  const [editId, setEditId]         = useState<number | null>(null)
  const [editNotes, setEditNotes]   = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.company) return
    add(form)
    setForm({ ...BLANK })
    setShowForm(false)
  }

  const stats = COLUMNS.map(c => ({ ...c, count: apps.filter(a => a.status === c.key).length }))

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Header */}
        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Application Tracker</h1>
            <p className="text-gray-500 text-sm">Track every application from saved to offer. Stored locally in your browser.</p>
          </div>
          <button onClick={() => setShowForm(v => !v)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_16px_rgba(59,130,246,0.25)]">
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {stats.map(s => (
            <div key={s.key} className={`p-3 rounded-xl border text-center ${s.bg}`}>
              <div className={`text-xl font-black ${s.color}`}>{s.count}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add Form */}
        {showForm && (
          <form onSubmit={handleAdd} className="mb-6 p-5 rounded-2xl border border-accent-blue/25 bg-accent-blue/5">
            <h3 className="font-bold text-white text-sm mb-4">New Application</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Job Title *" className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50" />
              <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                placeholder="Company Name *" className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50" />
              <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="Job URL" className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50" />
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="Location" className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50" />
              <input value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))}
                placeholder="Salary / Compensation" className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50" />
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                className="px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-blue/50">
                {COLUMNS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Notes (optional)" rows={2}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-blue/50 mb-3 resize-none" />
            <div className="flex gap-2">
              <button type="submit" className="px-5 py-2 rounded-lg bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm transition-all">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </form>
        )}

        {/* Applications */}
        {apps.length === 0 ? (
          <div className="text-center py-20 text-gray-500 border border-white/6 rounded-2xl">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No applications yet</p>
            <p className="text-xs mt-1 mb-4">Add one above or save a job from the <Link href="/careers/jobs" className="text-accent-blue hover:underline">Jobs page</Link></p>
          </div>
        ) : (
          <div className="space-y-3">
            {apps.map(app => {
              const col = COLUMNS.find(c => c.key === app.status)!
              return (
                <div key={app.id} className="p-5 rounded-2xl border border-white/8 bg-dark-800/60">
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-sm">{app.title}</h3>
                        <span className="text-xs text-gray-500">·</span>
                        <span className="text-sm text-gray-400">{app.company}</span>
                        {app.salary && <span className="text-xs text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2 py-0.5 rounded-full">{app.salary}</span>}
                      </div>
                      {app.location && <p className="text-xs text-gray-500 mb-1">{app.location}</p>}
                      <p className="text-xs text-gray-600">{new Date(app.dateAdded).toLocaleDateString()}</p>
                    </div>

                    {/* Status selector */}
                    <select value={app.status}
                      onChange={e => update(app.id, { status: e.target.value as Status })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold bg-transparent focus:outline-none ${col.bg} ${col.color}`}>
                      {COLUMNS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                    </select>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {app.url && (
                        <a href={app.url} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button onClick={() => { setEditId(app.id === editId ? null : app.id); setEditNotes(app.notes) }}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => remove(app.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Inline notes edit */}
                  {editId === app.id && (
                    <div className="mt-3 flex gap-2">
                      <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={2}
                        placeholder="Add notes..."
                        className="flex-1 px-3 py-2 rounded-lg bg-dark-900 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-accent-blue/50 resize-none" />
                      <div className="flex flex-col gap-1">
                        <button onClick={() => { update(app.id, { notes: editNotes }); setEditId(null) }}
                          className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/25 transition-all">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setEditId(null)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                  {app.notes && editId !== app.id && (
                    <p className="mt-2 text-xs text-gray-500 italic border-l-2 border-white/10 pl-3">{app.notes}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
