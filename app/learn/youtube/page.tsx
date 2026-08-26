'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, Play, X, ExternalLink, RefreshCw, Youtube, Clock, Search, Info } from 'lucide-react'

const YT_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyA_rxNMa082oD0SlqqrmaH27Dk_MyJpXkU'

const CHANNELS: Channel[] = [
  { id: 'UC8butISFwT-Wl7EV0hUK0BQ', name: 'freeCodeCamp',       category: 'IT & Dev' },
  { id: 'UCsBjURrPoezykLs9EqgamOA', name: 'Fireship',            category: 'AI & Dev' },
  { id: 'UCdngmbVKX1Tgre699-XLlUA', name: 'TechWorld with Nana', category: 'DevOps & Cloud' },
  { id: 'UC29ju8bIPH5as8OGnQzwJyA', name: 'Traversy Media',      category: 'Web Dev' },
  { id: 'UCJS9pqu9BzkAMNTmzNMNhvg', name: 'Google Cloud Tech',   category: 'Cloud' },
  { id: 'UCP7WmQ_U4GB3K51Od9QvM0w', name: 'David Bombal',        category: 'Networking & Security' },
  { id: 'UCW5YeuERMmlnqo4oq8vwUpg', name: 'Net Ninja',           category: 'Web Dev' },
]

function normalizeYT(item: any, channelName: string): Video {
  const vid = item.id?.videoId ?? item.id
  const sn  = item.snippet
  return {
    id:          vid,
    title:       sn.title,
    channelName: sn.channelTitle ?? channelName,
    channelId:   sn.channelId,
    publishedAt: sn.publishedAt,
    thumbnail:   sn.thumbnails?.medium?.url ?? sn.thumbnails?.default?.url ?? '',
    watchUrl:    `https://www.youtube.com/watch?v=${vid}`,
  }
}

async function ytSearch(q: string): Promise<Video[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=20&key=${YT_KEY}&relevanceLanguage=en`
  const res  = await fetch(url)
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return (data.items ?? []).map((i: any) => normalizeYT(i, ''))
}

async function ytChannelVideos(channelId: string, maxResults = 8): Promise<Video[]> {
  const ch   = CHANNELS.find(c => c.id === channelId)
  const url  = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=${maxResults}&order=date&key=${YT_KEY}`
  const res  = await fetch(url)
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return (data.items ?? []).map((i: any) => normalizeYT(i, ch?.name ?? ''))
}

interface Channel { id: string; name: string; category: string }
interface Video   { id: string; title: string; channelName: string; channelId: string; publishedAt: string; thumbnail: string; watchUrl: string }

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d < 1)  return 'Today'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}

export default function YouTubeLearningPage() {
  const [videos, setVideos]               = useState<Video[]>([])
  const [channels, setChannels]           = useState<Channel[]>([])
  const [loading, setLoading]             = useState(true)
  const [activeChannel, setActiveChannel] = useState<string>('all')
  const [playing, setPlaying]             = useState<Video | null>(null)
  const [query, setQuery]                 = useState('')
  const [searchMode, setSearchMode]       = useState(false)
  const [keyRequired, setKeyRequired]     = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async (channelId: string, q = '') => {
    setLoading(true)
    try {
      if (q) {
        const vids = await ytSearch(q)
        setVideos(vids)
        setChannels(CHANNELS)
        setSearchMode(true)
        setKeyRequired(false)
      } else if (channelId !== 'all') {
        const vids = await ytChannelVideos(channelId, 20)
        setVideos(vids)
        setChannels(CHANNELS)
        setSearchMode(false)
        setKeyRequired(false)
      } else {
        const results = await Promise.all(CHANNELS.map(ch => ytChannelVideos(ch.id, 5)))
        const all = results.flat().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        setVideos(all)
        setChannels(CHANNELS)
        setSearchMode(false)
        setKeyRequired(false)
      }
    } catch {
      setKeyRequired(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load('all') }, [load])

  const switchChannel = (id: string) => {
    setActiveChannel(id)
    setQuery('')
    setSearchMode(false)
    setPlaying(null)
    load(id)
  }

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) { switchChannel('all'); return }
    setActiveChannel('all')
    setPlaying(null)
    load('all', query.trim())
  }

  const categories = Array.from(new Set(channels.map(c => c.category)))

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      {/* Player modal */}
      {playing && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3 gap-3">
              <div>
                <p className="text-white font-bold text-sm leading-snug">{playing.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{playing.channelName} · {timeAgo(playing.publishedAt)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={playing.watchUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-gray-300 transition-colors">
                  <ExternalLink className="w-3 h-3" /> YouTube
                </a>
                <button onClick={() => setPlaying(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={playing.title}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Link href="/training" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Learning
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <h1 className="text-3xl font-black text-white">YouTube Learning Hub</h1>
            </div>
            <p className="text-gray-500 text-sm">Watch IT, AI, Cloud and DevOps tutorials from top channels without leaving the site.</p>
          </div>
          <button onClick={() => load(activeChannel, searchMode ? query : '')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 hover:text-white transition-colors flex-shrink-0">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        {/* Search bar */}
        <form onSubmit={doSearch} className="mb-6 flex gap-2">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search YouTube videos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(''); switchChannel('all') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button type="submit"
            className="px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white text-sm font-bold transition-all">
            Search
          </button>
        </form>

        {/* No key banner */}
        {keyRequired && (
          <div className="mb-5 flex items-start gap-2.5 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20 text-amber-300 text-sm">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">YouTube search requires a free API key</p>
              <p className="text-xs text-amber-500 mt-0.5">
                Get a free key at <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">console.cloud.google.com</a> → Enable &quot;YouTube Data API v3&quot; → Create API Key.
                Then add <code className="bg-white/10 px-1 rounded">YOUTUBE_API_KEY=your_key</code> to <code className="bg-white/10 px-1 rounded">.env.local</code> and restart the server.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <button onClick={() => switchChannel('all')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${activeChannel === 'all' && !searchMode ? 'bg-red-600/15 border border-red-600/30 text-white' : 'border border-white/8 text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Youtube className="w-4 h-4 text-red-500 flex-shrink-0" />
                All Channels
              </button>
              {categories.map(cat => (
                <div key={cat}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-1 mb-1.5">{cat}</p>
                  {channels.filter(c => c.category === cat).map(ch => (
                    <button key={ch.id} onClick={() => switchChannel(ch.id)}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm transition-all text-left mb-1 ${activeChannel === ch.id && !searchMode ? 'bg-accent-blue/15 border border-accent-blue/30 text-white font-semibold' : 'border border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activeChannel === ch.id && !searchMode ? 'bg-accent-blue' : 'bg-gray-700'}`} />
                      {ch.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Video grid */}
          <div className="flex-1 min-w-0">
            {searchMode && !loading && (
              <p className="text-xs text-gray-500 mb-4">
                {videos.length > 0 ? `${videos.length} results for "${query}"` : `No results for "${query}"`}
              </p>
            )}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white/4 border border-white/6 overflow-hidden animate-pulse">
                    <div className="aspect-video bg-white/8" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-white/8 rounded w-3/4" />
                      <div className="h-3 bg-white/8 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {videos.map(v => (
                  <button key={v.id} onClick={() => setPlaying(v)}
                    className="group text-left rounded-2xl bg-dark-800/60 border border-white/8 overflow-hidden hover:border-white/20 hover:bg-dark-800 transition-all duration-200 hover:-translate-y-0.5">
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200 shadow-lg">
                          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm">{v.channelName}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-accent-blue transition-colors">{v.title}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        {timeAgo(v.publishedAt)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {!loading && videos.length === 0 && !keyRequired && (
              <div className="flex flex-col items-center justify-center py-24 text-gray-600">
                <Youtube className="w-12 h-12 mb-3 opacity-30" />
                <p className="font-semibold">No videos found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
