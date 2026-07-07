import { NextResponse } from 'next/server'

// Revalidate every 30 minutes
export const revalidate = 1800

const FEEDS = [
  'https://feeds.feedburner.com/TechCrunch',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab',
  'https://www.wired.com/feed/tag/ai/latest/rss',
]

function parseItems(xml: string, limit: number): string[] {
  const items: string[] = []
  const titleRe = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/gi
  let m: RegExpExecArray | null
  let count = 0
  // skip the first <title> which is the feed title
  titleRe.exec(xml)
  while ((m = titleRe.exec(xml)) && count < limit) {
    const title = (m[1] || m[2] || '').trim()
    if (title) { items.push(title); count++ }
  }
  return items
}

export async function GET() {
  const headlines: string[] = []

  await Promise.allSettled(
    FEEDS.map(async (url) => {
      try {
        const res = await fetch(url, {
          next: { revalidate: 1800 },
          headers: { 'User-Agent': 'HiTecH-Hub-NewsBot/1.0' },
          signal: AbortSignal.timeout(4000),
        })
        if (!res.ok) return
        const xml = await res.text()
        const items = parseItems(xml, 4)
        headlines.push(...items)
      } catch {
        // silently skip failed feeds
      }
    })
  )

  // Fallback headlines if all feeds fail
  if (headlines.length === 0) {
    headlines.push(
      'GPT-5 expected to launch with advanced reasoning capabilities',
      'Microsoft integrates Copilot AI across all enterprise Office 365 products',
      'ServiceNow announces AI-powered ITSM automation suite for 2026',
      'Azure Security Center adds AI-driven threat detection for hybrid clouds',
      'SAP Business AI reaches 300M users across enterprise cloud platform',
      'Meta open-sources Llama 4 with 400B parameter multimodal model',
      'Cybersecurity spending to hit $300B globally driven by AI threats',
      'Google DeepMind achieves breakthrough in protein folding with AlphaFold 3',
    )
  }

  return NextResponse.json({ headlines }, {
    headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' }
  })
}
