'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Mind Map Data ─────────────────────────────────────────────────
   Central node: Syed Waqas Tayyab
   8 branch domains, each with 4-6 leaf nodes
   ─────────────────────────────────────────────────────────────── */

const MAP = {
  center: { label: 'Syed Waqas\nTayyab', sub: '15+ yrs · Senior IT', color: '#3b82f6', glow: 'rgba(59,130,246,0.8)' },
  branches: [
    {
      id: 'itsm', label: 'ITSM &\nServiceNow', color: '#10b981', glow: 'rgba(16,185,129,0.7)', icon: '🎫', angle: -90,
      leaves: ['ServiceNow Admin', 'SLA Design (ITIL v3)', 'KB Management', 'Auto-Assignment Rules', '1,500+ Tickets/yr', 'IT Direct → SNOW Migration'],
    },
    {
      id: 'cyber', label: 'Cybersecurity\n& Azure', color: '#ef4444', glow: 'rgba(239,68,68,0.7)', icon: '🛡️', angle: -45,
      leaves: ['Azure Security Eng.', 'Zero Trust Architecture', 'Conditional Access', 'Intune / Autopilot', 'Defender for M365', 'Secure Score 41%→78%'],
    },
    {
      id: 'cloud', label: 'Cloud &\nMicrosoft 365', color: '#3b82f6', glow: 'rgba(59,130,246,0.7)', icon: '☁️', angle: 0,
      leaves: ['M365 Tenant Admin', 'Exchange Online', 'SharePoint / Teams', 'Azure AD / Entra ID', 'M365 Copilot', 'PowerShell Automation'],
    },
    {
      id: 'infra', label: 'IT\nInfrastructure', color: '#8b5cf6', glow: 'rgba(139,92,246,0.7)', icon: '🖥️', angle: 45,
      leaves: ['Cisco / Aruba Network', 'HP Servers & Racking', 'LAN / WAN / VPN', 'Office Build-Outs', 'Server Room Mgmt', 'NAC Controllers'],
    },
    {
      id: 'ai', label: 'AI &\nAutomation', color: '#f59e0b', glow: 'rgba(245,158,11,0.7)', icon: '⚡', angle: 90,
      leaves: ['Python Automation', 'Power Apps / Automate', 'SAP AI Hub (AIG02)', 'FastAPI Agents', 'WhatsApp Alert Bots', 'ML on SNOW Data'],
    },
    {
      id: 'asset', label: 'IT Asset\nManagement', color: '#f97316', glow: 'rgba(249,115,22,0.7)', icon: '📦', angle: 135,
      leaves: ['2,000+ Device Lifecycle', 'SAP Ariba Procurement', 'LPA Inventory Scans', 'Warranty Tracking', 'Disposal & Certs', 'DocuSign Workflows'],
    },
    {
      id: 'sap', label: 'SAP &\nEnterprise', color: '#ec4899', glow: 'rgba(236,72,153,0.7)', icon: '🟠', angle: 180,
      leaves: ['SAP S/4HANA Admin', 'SAP Analytics Cloud', 'SAP BTP / Ariba', 'SAP Work Zone', 'SAP Build Apps', 'SAP ISP ERP'],
    },
    {
      id: 'lead', label: 'Leadership\n& Strategy', color: '#06b6d4', glow: 'rgba(6,182,212,0.7)', icon: '🎯', angle: -135,
      leaves: ['MBA · UK', 'C-Suite IT Support', 'Vendor Management', 'PMP 35 PDUs', 'Change Management', 'MENA IT Strategy'],
    },
  ],
}

/* ── Layout constants ─────────────────────────────────────────── */
const W = 900, H = 700
const CX = W / 2, CY = H / 2
const BRANCH_R = 210   // distance from center to branch node
const LEAF_R = 130     // distance from branch to leaf

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function branchPos(angle: number) {
  return { x: CX + BRANCH_R * Math.cos(toRad(angle)), y: CY + BRANCH_R * Math.sin(toRad(angle)) }
}

function leafPos(bx: number, by: number, angle: number, idx: number, total: number) {
  const spread = Math.min(60, (total - 1) * 18)
  const startAngle = angle - spread / 2
  const stepAngle = total > 1 ? spread / (total - 1) : 0
  const a = startAngle + idx * stepAngle
  return { x: bx + LEAF_R * Math.cos(toRad(a)), y: by + LEAF_R * Math.sin(toRad(a)) }
}

/* ── Component ────────────────────────────────────────────────── */
export default function MindMap() {
  const [active, setActive] = useState<string | null>(null)
  const [pulse, setPulse] = useState(0)
  const rafRef = useRef<number>()
  const startRef = useRef(0)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      setPulse((ts - startRef.current) / 1000)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const activeBranch = MAP.branches.find(b => b.id === active)

  return (
    <div className="w-full rounded-2xl border border-white/8 bg-dark-800/40 backdrop-blur-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-lg">🧠</div>
          <div>
            <p className="text-sm font-black text-white tracking-wide">IT Expertise Mind Map</p>
            <p className="text-[10px] text-gray-500">Click any branch to explore — 8 domains · 48 skills</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && (
            <button onClick={() => setActive(null)}
              className="text-[10px] font-semibold text-gray-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
              ← All domains
            </button>
          )}
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Interactive
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">

        {/* SVG Mind Map */}
        <div className="flex-1 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="select-none" style={{ maxHeight: '480px' }}>
            <defs>
              {MAP.branches.map(b => (
                <radialGradient key={b.id} id={`bg-${b.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={b.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={b.color} stopOpacity="0.4" />
                </radialGradient>
              ))}
              <radialGradient id="bg-center" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
              </radialGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="glow-sm"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {/* Background subtle grid */}
            <g opacity="0.04" stroke="#3b82f6" strokeWidth="0.5">
              {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2={W} y2={i * 100} />)}
              {Array.from({ length: 10 }).map((_, i) => <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2={H} />)}
            </g>

            {/* Branch connections + leaves */}
            {MAP.branches.map((branch, bi) => {
              const bp = branchPos(branch.angle)
              const isActive = active === branch.id
              const isDim = active !== null && !isActive
              const branchOpacity = isDim ? 0.15 : 1

              return (
                <g key={branch.id} opacity={branchOpacity} style={{ transition: 'opacity 0.3s' }}>
                  {/* Animated connection: center → branch */}
                  <line x1={CX} y1={CY} x2={bp.x} y2={bp.y}
                    stroke={branch.color} strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={isActive ? 0.8 : 0.35} strokeDasharray="6 4">
                    <animate attributeName="stroke-dashoffset" from="20" to="-20" dur="2s" repeatCount="indefinite" />
                  </line>

                  {/* Leaf nodes — only shown when active or all-visible */}
                  {(isActive || active === null) && branch.leaves.map((leaf, li) => {
                    const lp = leafPos(bp.x, bp.y, branch.angle, li, branch.leaves.length)
                    return (
                      <g key={leaf}>
                        <line x1={bp.x} y1={bp.y} x2={lp.x} y2={lp.y}
                          stroke={branch.color} strokeWidth="1" opacity={isActive ? 0.5 : 0.2} />
                        <circle cx={lp.x} cy={lp.y} r={isActive ? 5 : 3.5} fill={branch.color} opacity={isActive ? 0.9 : 0.5}>
                          <animate attributeName="opacity" values={`${isActive ? 0.6 : 0.3};${isActive ? 1 : 0.6};${isActive ? 0.6 : 0.3}`}
                            dur={`${1.5 + li * 0.2}s`} repeatCount="indefinite" />
                        </circle>
                        {isActive && (
                          <text x={lp.x} y={lp.y + 16} textAnchor="middle" fontSize="8.5"
                            fontWeight="600" fill={branch.color} fontFamily="'Inter',sans-serif" opacity="0.95"
                            style={{ userSelect: 'none' }}>
                            {leaf}
                          </text>
                        )}
                      </g>
                    )
                  })}

                  {/* Branch node */}
                  <g style={{ cursor: 'pointer' }}
                    onClick={() => setActive(active === branch.id ? null : branch.id)}>
                    {/* Pulse ring when active */}
                    {isActive && (
                      <circle cx={bp.x} cy={bp.y}
                        r={28 + Math.sin(pulse * 2) * 4}
                        fill="none" stroke={branch.color} strokeWidth="1" opacity="0.3" />
                    )}
                    <circle cx={bp.x} cy={bp.y} r={isActive ? 26 : 22}
                      fill={`url(#bg-${branch.id})`}
                      filter="url(#glow)"
                      stroke={branch.color} strokeWidth={isActive ? 2 : 1.5} />
                    {/* Icon */}
                    <text x={bp.x} y={bp.y - 4} textAnchor="middle" fontSize={isActive ? 16 : 14}
                      style={{ userSelect: 'none' }}>{branch.icon}</text>
                    {/* Label */}
                    {branch.label.split('\n').map((line, li) => (
                      <text key={li} x={bp.x} y={bp.y + 10 + li * 9} textAnchor="middle"
                        fontSize="7" fontWeight="700" fill="white" fontFamily="monospace"
                        opacity="0.9" style={{ userSelect: 'none' }}>
                        {line}
                      </text>
                    ))}
                  </g>
                </g>
              )
            })}

            {/* Centre node — Waqas */}
            <g style={{ cursor: 'pointer' }} onClick={() => setActive(null)}>
              {/* Breathing rings */}
              {[1, 2, 3].map(n => (
                <circle key={n} cx={CX} cy={CY}
                  r={42 + n * 12 + Math.sin(pulse * 1.2 + n) * 5}
                  fill="none" stroke="#3b82f6" strokeWidth="0.8"
                  opacity={0.04 + (3 - n) * 0.03} />
              ))}
              {/* Rotating dashed ring */}
              <circle cx={CX} cy={CY} r={52} fill="none" stroke="#3b82f6" strokeWidth="1"
                opacity="0.25" strokeDasharray="8 5"
                style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${pulse * 20}deg)` }} />
              {/* Main circle */}
              <circle cx={CX} cy={CY} r={42} fill="url(#bg-center)" filter="url(#glow)" stroke="#3b82f6" strokeWidth="2" />
              {/* Photo clip */}
              <defs><clipPath id="centerClip"><circle cx={CX} cy={CY} r={40} /></clipPath></defs>
              <image href="/waqas-avatar.jpg" x={CX - 40} y={CY - 40} width={80} height={80}
                clipPath="url(#centerClip)" preserveAspectRatio="xMidYMin slice" />
              <circle cx={CX} cy={CY} r={40} fill="url(#bg-center)" opacity="0.2" />
              {/* Labels below */}
              <rect x={CX - 44} y={CY + 44} width={88} height={28} rx="7" fill="#0a1628" opacity="0.95" />
              <text x={CX} y={CY + 56} textAnchor="middle" fontSize="8" fontWeight="800"
                fill="white" fontFamily="'Inter',sans-serif" style={{ userSelect: 'none' }}>
                Waqas Tayyab
              </text>
              <text x={CX} y={CY + 66} textAnchor="middle" fontSize="7" fill="#60a5fa"
                fontFamily="monospace" style={{ userSelect: 'none' }}>
                IT Expert · 15yr+
              </text>
            </g>

          </svg>
        </div>

        {/* Right panel — active branch detail */}
        <div className="lg:w-60 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-white/8 p-5">
          {activeBranch ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{activeBranch.icon}</span>
                <div>
                  <p className="text-sm font-black text-white leading-tight">{activeBranch.label.replace('\n', ' ')}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mt-0.5" style={{ color: activeBranch.color }}>
                    {activeBranch.leaves.length} skills
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {activeBranch.leaves.map((leaf, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: activeBranch.color }} />
                    {leaf}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-black text-white mb-1">All Expertise Domains</p>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-4">Click any node to explore skills in that domain.</p>
              <div className="space-y-1.5">
                {MAP.branches.map(b => (
                  <button key={b.id} onClick={() => setActive(b.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left">
                    <span className="text-sm flex-shrink-0">{b.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">{b.label.replace('\n', ' ')}</p>
                      <p className="text-[9px]" style={{ color: b.color }}>{b.leaves.length} skills</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/6 flex items-center justify-between">
        <p className="text-[10px] text-gray-600">8 domains · 48 skills mapped · Click any node to expand</p>
        <div className="flex gap-2">
          {MAP.branches.map(b => (
            <button key={b.id} onClick={() => setActive(b.id)}
              className="w-3 h-3 rounded-full transition-all hover:scale-125"
              style={{ background: active === b.id ? b.color : `${b.color}40` }} />
          ))}
        </div>
      </div>

    </div>
  )
}
