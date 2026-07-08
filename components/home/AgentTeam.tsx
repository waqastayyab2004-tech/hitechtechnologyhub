'use client'

import { useState, useEffect, useRef } from 'react'

const AGENTS = [
  {
    id: 'nexus',
    name: 'NEXUS-W1',
    role: 'AI Command Hub',
    specialty: 'Orchestration & Strategy',
    icon: '🤖',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.8)',
    tags: ['LLMs', 'Agentic AI', 'Orchestration'],
    cx: 400, cy: 220, // centre
    isHub: true,
  },
  {
    id: 'azure',
    name: 'AzureGuard',
    role: 'Cybersecurity Agent',
    specialty: 'Azure Security · Zero Trust · Intune',
    icon: '🛡️',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.7)',
    tags: ['Azure', 'Zero Trust', 'MDM'],
    cx: 400, cy: 60,
  },
  {
    id: 'cloud',
    name: 'CloudOps',
    role: 'Cloud & M365 Agent',
    specialty: 'Azure · M365 · SharePoint · Teams',
    icon: '☁️',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.7)',
    tags: ['M365', 'Azure', 'SharePoint'],
    cx: 610, cy: 120,
  },
  {
    id: 'snow',
    name: 'SNOWBot',
    role: 'ITSM & ServiceNow Agent',
    specialty: 'ServiceNow · SLA · ITIL · Ticketing',
    icon: '🎫',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.7)',
    tags: ['ServiceNow', 'ITIL', 'SLA'],
    cx: 680, cy: 280,
  },
  {
    id: 'infra',
    name: 'InfraBot',
    role: 'IT Infrastructure Agent',
    specialty: 'Cisco · Aruba · Servers · LAN/WAN',
    icon: '🖥️',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.7)',
    tags: ['Cisco', 'Servers', 'Network'],
    cx: 580, cy: 400,
  },
  {
    id: 'ai',
    name: 'MLOps',
    role: 'AI & Automation Agent',
    specialty: 'Python · ML · Power Apps · FastAPI',
    icon: '⚡',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.7)',
    tags: ['Python ML', 'Automation', 'AI'],
    cx: 220, cy: 400,
  },
  {
    id: 'asset',
    name: 'AssetTrack',
    role: 'IT Asset Management Agent',
    specialty: 'SAP Ariba · Lifecycle · PowerBI',
    icon: '📦',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.7)',
    tags: ['SAP Ariba', 'Assets', 'PowerBI'],
    cx: 120, cy: 280,
  },
  {
    id: 'sap',
    name: 'SAPxpert',
    role: 'SAP & Enterprise Agent',
    specialty: 'SAP S/4HANA · BTP · Analytics Cloud',
    icon: '🟠',
    color: '#FB923C',
    glow: 'rgba(251,146,60,0.7)',
    tags: ['SAP', 'S/4HANA', 'BTP'],
    cx: 190, cy: 120,
  },
]

const HUB = AGENTS.find(a => a.isHub)!
const NODES = AGENTS.filter(a => !a.isHub)

export default function AgentTeam() {
  const [active, setActive] = useState<string | null>(null)
  const [pulse, setPulse] = useState(0)
  const rafRef = useRef<number>()
  const startRef = useRef<number>(0)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      setPulse((ts - startRef.current) / 1000)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const activeAgent = active ? AGENTS.find(a => a.id === active) : null

  return (
    <div className="w-full rounded-2xl border border-white/8 bg-dark-800/40 backdrop-blur-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-sm">🤖</div>
          <div>
            <p className="text-xs font-black text-white tracking-widest uppercase">HiTecH AI Agent Team</p>
            <p className="text-[10px] text-gray-500">Click any agent node to explore</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400 font-semibold">ACTIVE</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">

        {/* SVG Network Topology */}
        <div className="flex-1 min-w-0">
          <svg
            viewBox="0 0 800 480"
            className="w-full h-auto"
            style={{ maxHeight: '420px' }}
          >
            <defs>
              {AGENTS.map(a => (
                <radialGradient key={a.id} id={`grad-${a.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={a.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={a.color} stopOpacity="0.3" />
                </radialGradient>
              ))}
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="line-glow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            <g opacity="0.06" stroke="#3B82F6" strokeWidth="0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="480" />
              ))}
            </g>

            {/* Connection lines with animated data packets */}
            {NODES.map((node, i) => {
              const isActive = active === node.id
              const lineOpacity = active ? (isActive ? 0.9 : 0.12) : 0.35
              const dx = node.cx - HUB.cx
              const dy = node.cy - HUB.cy
              const len = Math.sqrt(dx * dx + dy * dy)
              const t = ((pulse * 0.6 + i * 0.15) % 1)
              const px = HUB.cx + dx * t
              const py = HUB.cy + dy * t
              const t2 = ((pulse * 0.6 + i * 0.15 + 0.5) % 1)
              const px2 = node.cx - dx * t2
              const py2 = node.cy - dy * t2

              return (
                <g key={node.id}>
                  {/* Base line */}
                  <line
                    x1={HUB.cx} y1={HUB.cy}
                    x2={node.cx} y2={node.cy}
                    stroke={node.color}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={lineOpacity}
                    strokeDasharray="5 4"
                    filter="url(#line-glow)"
                  />
                  {/* Animated packet — hub to node */}
                  <circle cx={px} cy={py} r={isActive ? 4 : 2.5} fill={node.color}
                    opacity={lineOpacity + 0.3}
                    style={{ filter: `drop-shadow(0 0 4px ${node.glow})` }} />
                  {/* Return packet — node to hub */}
                  <circle cx={px2} cy={py2} r={isActive ? 3 : 2} fill={HUB.color}
                    opacity={(lineOpacity + 0.2) * 0.7}
                    style={{ filter: `drop-shadow(0 0 3px ${HUB.glow})` }} />
                </g>
              )
            })}

            {/* Agent nodes */}
            {NODES.map((node) => {
              const isActive = active === node.id
              const scale = isActive ? 1.15 : 1
              const r = isActive ? 38 : 32

              return (
                <g key={node.id}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s', transformOrigin: `${node.cx}px ${node.cy}px`, transform: `scale(${scale})` }}
                  onClick={() => setActive(active === node.id ? null : node.id)}>
                  {/* Outer ring */}
                  <circle cx={node.cx} cy={node.cy} r={r + 10}
                    fill="none" stroke={node.color} strokeWidth="1"
                    opacity={isActive ? 0.6 : 0.25}
                    strokeDasharray={isActive ? '3 3' : '4 6'} />
                  {/* Node circle */}
                  <circle cx={node.cx} cy={node.cy} r={r}
                    fill={`url(#grad-${node.id})`}
                    filter="url(#node-glow)"
                    stroke={node.color} strokeWidth={isActive ? 2 : 1.5}
                    opacity={active && !isActive ? 0.4 : 1} />
                  {/* Icon — bigger */}
                  <text x={node.cx} y={node.cy - 4} textAnchor="middle"
                    fontSize={isActive ? 24 : 20}
                    style={{ userSelect: 'none' }}>
                    {node.icon}
                  </text>
                  {/* Name */}
                  <text x={node.cx} y={node.cy + 14} textAnchor="middle"
                    fontSize="8" fontWeight="bold" fill="white"
                    fontFamily="monospace" opacity={0.95}
                    style={{ userSelect: 'none' }}>
                    {node.name}
                  </text>
                  {/* Label below node */}
                  <text x={node.cx} y={node.cy + r + 18} textAnchor="middle"
                    fontSize="8.5" fontWeight="600" fill={node.color}
                    fontFamily="'Inter',sans-serif" opacity={active && !isActive ? 0.3 : 0.95}
                    style={{ userSelect: 'none' }}>
                    {node.role}
                  </text>
                </g>
              )
            })}

            {/* Hub — Waqas photo, bigger, IT Expert */}
            <g style={{ cursor: 'pointer' }} onClick={() => setActive(active === 'nexus' ? null : 'nexus')}>
              {/* Pulse rings */}
              {[1, 2, 3].map(n => (
                <circle key={n} cx={HUB.cx} cy={HUB.cy}
                  r={60 + n * 16 + Math.sin(pulse * 1.5 + n) * 4}
                  fill="none" stroke={HUB.color}
                  strokeWidth="0.8"
                  opacity={0.07 + (3 - n) * 0.04} />
              ))}
              {/* Rotating dashed ring */}
              <circle cx={HUB.cx} cy={HUB.cy} r={68}
                fill="none" stroke={HUB.color} strokeWidth="1.5"
                opacity="0.35" strokeDasharray="8 5"
                style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px`, transform: `rotate(${pulse * 25}deg)` }} />
              {/* Counter-rotate ring */}
              <circle cx={HUB.cx} cy={HUB.cy} r={76}
                fill="none" stroke="#3B82F6" strokeWidth="0.8"
                opacity="0.2" strokeDasharray="4 8"
                style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px`, transform: `rotate(${-pulse * 18}deg)` }} />
              {/* Hub background circle — glow */}
              <circle cx={HUB.cx} cy={HUB.cy} r={55}
                fill={`url(#grad-nexus)`}
                filter="url(#node-glow)"
                stroke={HUB.color} strokeWidth="2.5" />
              {/* Clip path for photo */}
              <defs>
                <clipPath id="hubClip">
                  <circle cx={HUB.cx} cy={HUB.cy} r={53} />
                </clipPath>
              </defs>
              {/* Real photo */}
              <image
                href="/waqas-avatar.jpg"
                x={HUB.cx - 53} y={HUB.cy - 53}
                width={106} height={106}
                clipPath="url(#hubClip)"
                preserveAspectRatio="xMidYMin slice"
              />
              {/* Overlay tint */}
              <circle cx={HUB.cx} cy={HUB.cy} r={53}
                fill="url(#grad-nexus)" opacity="0.25"
                clipPath="url(#hubClip)" />
              {/* Name badge — sits below the circle */}
              <rect x={HUB.cx - 46} y={HUB.cy + 57} width={92} height={32} rx="8"
                fill="#0a1628" opacity="0.92" />
              <text x={HUB.cx} y={HUB.cy + 70} textAnchor="middle"
                fontSize="9" fontWeight="800" fill="white" fontFamily="'Inter',sans-serif"
                style={{ userSelect: 'none' }}>
                Syed Waqas Tayyab
              </text>
              <text x={HUB.cx} y={HUB.cy + 82} textAnchor="middle"
                fontSize="7.5" fontWeight="600" fill={HUB.color} fontFamily="monospace"
                style={{ userSelect: 'none' }}>
                IT Expert · AI Specialist
              </text>
            </g>
          </svg>
        </div>

        {/* Right panel — agent detail */}
        <div className="lg:w-64 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-white/8 p-5">
          {activeAgent ? (
            <div className="h-full flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{activeAgent.icon}</span>
                  <div>
                    <p className="font-black text-white text-sm">{activeAgent.name}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: activeAgent.color }}>{activeAgent.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{activeAgent.specialty}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeAgent.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ color: activeAgent.color, borderColor: `${activeAgent.color}40`, backgroundColor: `${activeAgent.color}10` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-white/8">
                <p className="text-[10px] text-gray-600 mb-2 uppercase tracking-widest">Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-semibold">Online · Ready</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-white mb-1">HiTecH AI Agent Team</p>
                <p className="text-[10px] text-gray-500 leading-relaxed mb-4">
                  8 specialised AI agents working together — each expert in a different IT domain.
                </p>
                <div className="space-y-2">
                  {NODES.map(n => (
                    <button key={n.id} onClick={() => setActive(n.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left">
                      <span className="text-sm flex-shrink-0">{n.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">{n.name}</p>
                        <p className="text-[10px] truncate" style={{ color: n.color }}>{n.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-600 mt-4">Click any node to explore</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
