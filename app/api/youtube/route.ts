import { NextResponse } from 'next/server'

export const revalidate = 1800

export interface YTVideo {
  id: string
  title: string
  channelName: string
  channelId: string
  publishedAt: string
  thumbnail: string
  watchUrl: string
}

const CHANNELS = [
  { id: 'UC8butISFwT-Wl7EV0hUK0BQ', name: 'freeCodeCamp',       category: 'IT & Dev' },
  { id: 'UCsBjURrPoezykLs9EqgamOA', name: 'Fireship',            category: 'AI & Dev' },
  { id: 'UCdngmbVKX1Tgre699-XLlUA', name: 'TechWorld with Nana', category: 'DevOps & Cloud' },
  { id: 'UC29ju8bIPH5as8OGnQzwJyA', name: 'Traversy Media',      category: 'Web Dev' },
  { id: 'UCJS9pqu9BzkAMNTmzNMNhvg', name: 'Google Cloud Tech',   category: 'Cloud' },
  { id: 'UCP7WmQ_U4GB3K51Od9QvM0w', name: 'David Bombal',        category: 'Networking & Security' },
  { id: 'UCW5YeuERMmlnqo4oq8vwUpg', name: 'Net Ninja',           category: 'Web Dev' },
]

function isKeyConfigured() {
  const k = process.env.YOUTUBE_API_KEY ?? ''
  return k.length > 10 && !k.startsWith('your_')
}

/* ── YouTube Data API v3 search ─────────────────────────────── */
async function searchYouTube(query: string): Promise<YTVideo[]> {
  const key = process.env.YOUTUBE_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=20&key=${key}&relevanceLanguage=en&safeSearch=moderate`
  try {
    const res  = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.items ?? []).map((item: any): YTVideo => {
      const s = item.snippet
      const videoId = item.id.videoId
      return {
        id:          videoId,
        title:       s.title,
        channelName: s.channelTitle,
        channelId:   s.channelId,
        publishedAt: s.publishedAt,
        thumbnail:   s.thumbnails?.medium?.url ?? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        watchUrl:    `https://www.youtube.com/watch?v=${videoId}`,
      }
    })
  } catch { return [] }
}

/* ── YouTube RSS feed for a channel ─────────────────────────── */
async function fetchChannelVideos(channelId: string, channelName: string, limit = 8): Promise<YTVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HitechHub/1.0)' } }
    )
    if (!res.ok) return []
    const xml = await res.text()
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? []
    return entries.slice(0, limit).map((entry): YTVideo => {
      const get = (tag: string) => entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim() ?? ''
      const videoId = get('yt:videoId')
      const title   = get('title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      return {
        id:          videoId,
        title,
        channelName,
        channelId,
        publishedAt: get('published'),
        thumbnail:   `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        watchUrl:    `https://www.youtube.com/watch?v=${videoId}`,
      }
    })
  } catch { return [] }
}

export async function GET() {
  const hasKey = isKeyConfigured()
  const results = await Promise.all(CHANNELS.map(ch => fetchChannelVideos(ch.id, ch.name, 5)))
  const videos  = results.flat().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return NextResponse.json({ videos, channels: CHANNELS, keyConfigured: hasKey })
}
