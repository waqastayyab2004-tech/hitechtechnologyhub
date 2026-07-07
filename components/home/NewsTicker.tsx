'use client'

import { useEffect, useState } from 'react'
import { Rss, Zap } from 'lucide-react'

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState<string[]>(['Loading latest AI & IT news…'])

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => { if (d.headlines?.length) setHeadlines(d.headlines) })
      .catch(() => {})
  }, [])

  const items = [...headlines, ...headlines]

  return (
    <div className="w-full overflow-hidden rounded-xl border border-accent-blue/20 bg-dark-800/60 backdrop-blur-sm flex items-stretch h-9">
      {/* Label badge */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 bg-accent-blue/15 border-r border-accent-blue/20">
        <Zap className="w-3 h-3 text-accent-blue flex-shrink-0" />
        <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest whitespace-nowrap">Live IT News</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
      </div>

      {/* Scrolling track — strict overflow hidden */}
      <div className="flex-1 min-w-0 overflow-hidden flex items-center">
        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 80s linear infinite;
            will-change: transform;
          }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-track">
          {items.map((h, i) => (
            <span key={i} className="flex items-center gap-2 px-5 text-[11px] text-gray-300 whitespace-nowrap">
              <Rss className="w-2.5 h-2.5 text-accent-blue flex-shrink-0" />
              {h}
              <span className="text-gray-700 mx-1">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
