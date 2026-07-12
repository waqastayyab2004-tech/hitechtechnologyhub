'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Domain data with full experience context ─────────────────────── */
const DOMAINS = [
  {
    id: 'itsm',
    label: 'IT Service\nDelivery',
    icon: '⚙️',
    color: '#3B82F6',
    angle: 270,
    stat: '10+ yrs · 100+ projects',
    link: undefined,
    summary: 'Enterprise IT field service, ServiceNow ITSM lifecycle, SLA/KPI ownership across SAP MENA.',
    did: [
      'Led full ServiceNow ticket lifecycle at SAP (2019–present)',
      'IT SPOC across 3 SAP offices — Riyadh, Jeddah, AlKhobar',
      'Managed onboarding/offboarding for Active Directory, Intune, M365',
      'Proactive monitoring across all network layers',
      'Vendor & hardware procurement via SAP Ariba (MENA)',
      'Meeting room tech: Poly, Crestron, Cisco, Logitech',
    ],
    can: [
      'End-to-end ITSM implementation & optimisation',
      'SLA/KPI ownership and executive reporting',
      'Incident, Problem & Change management (ITIL v3)',
      'IT asset lifecycle — procurement to decommission',
      'Field service coordination & escalation management',
    ],
    tools: ['ServiceNow', 'SAP Ariba', 'ITIL v3', 'Intune', 'Azure AD', 'M365'],
    certs: ['ITIL v3 Foundation', 'PMP — 35 PDUs'],
    subSkills: [
      { id: 's1', label: 'ServiceNow ITSM', icon: '🎫' },
      { id: 's2', label: 'ITIL v3',         icon: '📋' },
      { id: 's3', label: 'SLA & KPI',       icon: '📊' },
      { id: 's4', label: 'Incident Mgmt',   icon: '🚨' },
      { id: 's5', label: 'Problem Mgmt',    icon: '🔍' },
      { id: 's6', label: 'Change Mgmt',     icon: '🔄' },
      { id: 's7', label: 'Asset Lifecycle', icon: '📦' },
      { id: 's8', label: 'Field Service',   icon: '🛠️' },
      { id: 's9', label: 'Monitoring',      icon: '👁️' },
    ],
  },
  {
    id: 'cyber',
    label: 'Cybersecurity\n& Azure',
    icon: '🛡️',
    color: '#EF4444',
    angle: 315,
    stat: 'Azure Security Certified · CCNA Security',
    summary: 'Azure Security Engineer, Zero Trust architecture, Intune MDM/MAM, Defender for M365, physical & network security.',
    link: undefined,
    did: [
      'System Security Officer at Banque Saudi Fransi (2012–2015) — ATM/branch security, 24/7 monitoring',
      'Administered access control (G4S MultiMax), CCTV, alarm systems across all branches',
      'Deployed Intune MDM/MAM policies across SAP enterprise',
      'Configured MFA & Conditional Access for SAP Azure AD tenant',
      'Managed Microsoft Defender for M365 security posture',
      'Implemented endpoint security policies for Windows & macOS fleets',
    ],
    can: [
      'Azure Security Engineer architecture & implementation',
      'Zero Trust policy design (identity, device, network)',
      'Intune MDM/MAM policy deployment & compliance',
      'Microsoft Defender configuration & incident response',
      'MFA, Conditional Access & Entra ID management',
      'Network hardening — Cisco/Aruba security configs',
    ],
    tools: ['Azure Security Center', 'Intune', 'Defender for M365', 'Entra ID', 'Conditional Access', 'CCNA Security'],
    certs: ['Azure Security Engineer Associate (2024)', 'CCNA Security (2013)'],
    subSkills: [
      { id: 'c1', label: 'Azure Security',  icon: '☁️' },
      { id: 'c2', label: 'Zero Trust',      icon: '🔒' },
      { id: 'c3', label: 'Intune MDM',      icon: '📱' },
      { id: 'c4', label: 'Defender M365',   icon: '🛡️' },
      { id: 'c5', label: 'MFA & CA',        icon: '🔑' },
      { id: 'c6', label: 'CCNA Security',   icon: '🌐' },
      { id: 'c7', label: 'Endpoint Sec',    icon: '💻' },
      { id: 'c8', label: 'Net Hardening',   icon: '🔐' },
      { id: 'c9', label: 'Sec Audits',      icon: '📝' },
    ],
  },
  {
    id: 'sap',
    label: 'SAP\nEnterprise',
    icon: '🟠',
    color: '#F97316',
    angle: 0,
    stat: '11+ yrs SAP · 5 certifications',
    summary: 'Deep SAP operations: S/4HANA admin, BTP, Ariba procurement, Analytics Cloud, HANA ML, and SAP AI Hub.',
    link: undefined,
    did: [
      'SAP S/4HANA system admin and IT support across MENA (2015–present)',
      'Managed SAP Analytics Cloud, BTP, and Ariba procurement lifecycle for MENA',
      'Developed SAP HANA ML model (Python scikit-learn) predicting ServiceNow SLA breaches',
      'Built SAP O365 MCP Server — Claude AI integration with SAP M365 via Microsoft Graph API',
      'Delivered Compose and Automate with SAP Build (no-code) workflows',
      'Training teams on SAP Generative AI Hub and Copilot adoption',
    ],
    can: [
      'SAP S/4HANA administration, configuration & support',
      'SAP BTP integration, API management & app deployment',
      'SAP Ariba procurement workflow design',
      'SAP Analytics Cloud dashboard & report building',
      'SAP HANA Python ML model development',
      'SAP Build low-code/no-code app creation',
    ],
    tools: ['SAP S/4HANA', 'SAP BTP', 'SAP Ariba', 'SAP Analytics Cloud', 'SAP Build', 'SAP HANA ML', 'SAP Gen AI Hub'],
    certs: ['SAP S/4HANA System Admin (2022)', 'SAP Analytics Cloud (2023)', 'SAP Python ML for HANA (2026)', 'SAP Build No-Code (2023)', 'SAP Gen AI Hub AIG02 (2026)'],
    subSkills: [
      { id: 'p1', label: 'SAP S/4HANA',    icon: '🏗️' },
      { id: 'p2', label: 'SAP Analytics',  icon: '📈' },
      { id: 'p3', label: 'SAP BTP',        icon: '☁️' },
      { id: 'p4', label: 'SAP Ariba',      icon: '🛒' },
      { id: 'p5', label: 'SAP Build',      icon: '🔨' },
      { id: 'p6', label: 'SAP HANA ML',    icon: '🧪' },
      { id: 'p7', label: 'SAP IT Ops',     icon: '⚙️' },
      { id: 'p8', label: 'SAP Copilot AI', icon: '🤖' },
    ],
  },
  {
    id: 'm365',
    label: 'Microsoft\n365',
    icon: '💼',
    color: '#6366F1',
    angle: 45,
    stat: 'M365 Admin Certified · 11+ yrs',
    summary: 'Full Microsoft 365 tenant admin: Exchange, Teams, SharePoint, OneDrive, Intune, Copilot, and AV/Signage.',
    link: undefined,
    did: [
      'Full M365 tenant admin for SAP enterprise (Exchange Online, Teams, SharePoint, OneDrive)',
      'Deployed and managed M365 Copilot across SAP MENA',
      'Configured Intune MDM/MAM for Windows, macOS, iOS, Android fleets',
      'Delivered end-user adoption training programs across 3 office locations',
      'Managed digital signage platforms (SVM/ITPP) and meeting room AV (Poly, Crestron, Logitech, Evoko)',
      'Built Power Automate workflows to streamline approvals and IT processes',
    ],
    can: [
      'Microsoft 365 tenant setup, governance & security hardening',
      'Exchange Online admin — mail flow, DLP, anti-spam, archiving',
      'Teams admin — policies, live events, calling, governance',
      'SharePoint & OneDrive architecture and migration',
      'M365 Copilot enablement and adoption strategy',
      'Power Automate workflow development',
    ],
    tools: ['Exchange Online', 'Teams', 'SharePoint', 'OneDrive', 'M365 Copilot', 'Intune', 'Power Automate', 'Compliance Center'],
    certs: ['Microsoft 365 Admin (2020)', 'M365 Copilot First Look (2023)'],
    subSkills: [
      { id: 'm1', label: 'M365 Admin',      icon: '🖥️' },
      { id: 'm2', label: 'Exchange Online', icon: '📧' },
      { id: 'm3', label: 'SharePoint',      icon: '📂' },
      { id: 'm4', label: 'Teams Admin',     icon: '💬' },
      { id: 'm5', label: 'M365 Copilot',   icon: '🤖' },
      { id: 'm6', label: 'OneDrive',        icon: '☁️' },
      { id: 'm7', label: 'Intune Policies', icon: '📋' },
      { id: 'm8', label: 'Dig. Signage',    icon: '📺' },
      { id: 'm9', label: 'Meeting Room AV', icon: '🎤' },
    ],
  },
  {
    id: 'ai',
    label: 'AI &\nAutomation',
    icon: '🤖',
    color: '#A855F7',
    angle: 90,
    stat: '4 live AI apps · hours saved daily',
    summary: 'Built and deployed Agentic AI, LLM integrations, ML pipelines, and automation tools used live at SAP every day.',
    link: undefined,
    did: [
      'Built Waqas AI Hub — macOS native Swift + FastAPI dashboard integrating Gmail, SAP M365, ServiceNow & WhatsApp',
      'Developed SNOW SLA Breach Predictor — Python scikit-learn Random Forest on real SAP ServiceNow data',
      'Built SNOW SLA WhatsApp Alert Pipeline — polls ServiceNow every 5 min, fires Twilio alerts 30 min before breach',
      'Created SAP O365 MCP Server — Claude AI gets live access to SAP Outlook, Calendar, OneDrive via Graph API',
      'Daily email summariser agent using Claude AI (auto-runs 9 AM Sun–Thu)',
      'Trained SAP teams on AI adoption: Claude, Copilot, Gemini, ChatGPT in enterprise context',
    ],
    can: [
      'Agentic AI design — multi-step agents with tool use, memory & orchestration',
      'LLM prompt engineering (Claude, GPT-4, Gemini) for enterprise workflows',
      'Python ML pipelines — data prep, feature engineering, training, evaluation',
      'RAG pipeline construction (retrieval-augmented generation)',
      'REST API & MCP integration for AI ↔ enterprise systems',
      'FastAPI / Flask backend services powering AI applications',
    ],
    tools: ['Claude AI', 'GPT-4', 'Gemini', 'FastAPI', 'Flask', 'scikit-learn', 'Pandas', 'Next.js', 'n8n', 'Twilio', 'REST APIs'],
    certs: ['SAP Python ML for HANA (2026)', 'AI-Driven Project Manager (2025)', 'SAP Gen AI Hub AIG02 (2026)'],
    subSkills: [
      { id: 'a1',  label: 'Agentic AI',      icon: '🧠' },
      { id: 'a2',  label: 'Python ML',       icon: '🐍' },
      { id: 'a3',  label: 'LLMs & Prompts',  icon: '💬' },
      { id: 'a4',  label: 'RAG Pipelines',   icon: '🔗' },
      { id: 'a5',  label: 'FastAPI / Flask', icon: '⚡' },
      { id: 'a6',  label: 'Next.js / React', icon: '⚛️' },
      { id: 'a7',  label: 'n8n / Make',      icon: '🔄' },
      { id: 'a8',  label: 'REST APIs',       icon: '🌐' },
      { id: 'a9',  label: 'scikit / Pandas', icon: '📊' },
      { id: 'a10', label: 'Claude / GPT',    icon: '✨' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra &\nCloud',
    icon: '☁️',
    color: '#06B6D4',
    angle: 135,
    stat: '15+ yrs infrastructure · 3 offices',
    summary: 'Azure hybrid cloud, Cisco/Aruba networking, HP servers, Windows/Linux/macOS — managed enterprise infrastructure across MENA.',
    link: undefined,
    did: [
      'Managed LAN/WAN and NAC controllers across SAP Riyadh, Jeddah, AlKhobar offices',
      'Administered HP servers — setup, patching, monitoring, hardware replacement',
      'Managed Cisco & Aruba network switches, wireless controllers and VLANs',
      'Mass OS deployment: Windows, macOS, Linux across enterprise fleets',
      'Azure hybrid cloud integration: IaaS/PaaS provisioning and management',
      'Network Administrator at TSBS (2011–2013): servers, security, stats collection',
    ],
    can: [
      'Azure hybrid cloud architecture — IaaS, PaaS, VNets, VPNs',
      'Cisco/Aruba network design — VLANs, routing, wireless, NAC',
      'Windows Server admin — AD, Group Policy, WSUS, Hyper-V',
      'Linux server admin — Ubuntu/RHEL, shell scripting, hardening',
      'HP server lifecycle management — deployment to decommission',
      'Mass OS deployment with imaging tools',
    ],
    tools: ['Azure', 'Cisco', 'Aruba', 'HP Servers', 'Windows Server', 'Linux', 'Active Directory', 'Group Policy', 'WSUS', 'Hyper-V'],
    certs: ['CCNA Security (2013)', 'Azure Security Engineer (2024)'],
    subSkills: [
      { id: 'i1', label: 'Azure Cloud',      icon: '☁️' },
      { id: 'i2', label: 'IaaS / PaaS',      icon: '🏗️' },
      { id: 'i3', label: 'Cisco / Aruba',    icon: '🌐' },
      { id: 'i4', label: 'LAN / WAN',        icon: '🔌' },
      { id: 'i5', label: 'HP Servers',       icon: '🖥️' },
      { id: 'i6', label: 'Windows Server',   icon: '🪟' },
      { id: 'i7', label: 'Linux Admin',      icon: '🐧' },
      { id: 'i8', label: 'Active Directory', icon: '📁' },
      { id: 'i9', label: 'Group Policy',     icon: '📋' },
    ],
  },
  {
    id: 'dev',
    label: 'DevOps &\nProgramming',
    icon: '⌨️',
    color: '#10B981',
    angle: 180,
    stat: '4 live apps · full-stack Python & JS',
    summary: 'Full-stack developer: Python (FastAPI/Flask), TypeScript (Next.js), REST APIs, OAuth2, SQLite, PowerShell, Git, Docker.',
    link: undefined,
    did: [
      'Built IT Asset Manager — full-stack Flask + SQLite + Chart.js (replaced Excel at SAP)',
      'Built HiTecH AI HUB website — Next.js 14 + TypeScript + Tailwind + AI chatbot (deployed Cloudflare)',
      'Developed Waqas AI Hub native macOS app — Swift + WebKit + FastAPI backend',
      'Created REST API integrations: ServiceNow, Microsoft Graph, SAP BTP, Gmail, Twilio',
      'PowerShell & Bash scripting for mass deployment, automation, and system management',
      'Built OAuth2 auth flows for SAP Azure AD (device code + localhost redirect)',
    ],
    can: [
      'Python backend: FastAPI, Flask, async services, REST APIs',
      'JavaScript/TypeScript: Next.js 14, React, Tailwind CSS',
      'Database design and management (SQLite, SQL)',
      'OAuth2 / OpenID authentication implementation',
      'PowerShell & Bash scripting for IT automation',
      'Git/GitHub version control, CI/CD concepts, Docker basics',
    ],
    tools: ['Python', 'FastAPI', 'Flask', 'Next.js 14', 'TypeScript', 'SQLite', 'PowerShell', 'Bash', 'Git', 'Docker', 'Swift'],
    certs: ['BSc IT — University of Greenwich UK (2010)'],
    subSkills: [
      { id: 'd1', label: 'Python',           icon: '🐍' },
      { id: 'd2', label: 'TypeScript',       icon: '📘' },
      { id: 'd3', label: 'Bash / Shell',     icon: '💻' },
      { id: 'd4', label: 'PowerShell',       icon: '🪟' },
      { id: 'd5', label: 'Git & GitHub',     icon: '🐙' },
      { id: 'd6', label: 'Docker',           icon: '🐳' },
      { id: 'd7', label: 'CI/CD',            icon: '🔄' },
      { id: 'd8', label: 'Swift macOS',      icon: '🍎' },
      { id: 'd9', label: 'SQL / SQLite',     icon: '🗄️' },
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership\n& Strategy',
    icon: '🎯',
    color: '#F59E0B',
    angle: 225,
    stat: 'MBA · PMP · 1M+ community',
    summary: 'IT Service Delivery Lead at SAP, MBA graduate, PMP certified. Training teams on AI adoption. 1M+ tech community followers.',
    link: undefined,
    did: [
      'IT Service Delivery Lead at SAP — led IT operations strategy across MENA',
      'Trained SAP teams on AI adoption: Claude, Copilot, Gemini, ChatGPT in enterprise workflows',
      'Delivered end-user training programs across Riyadh, Jeddah, AlKhobar',
      'Managed vendor relationships, hardware procurement budgets via SAP Ariba',
      'Built 1M+ follower tech content community across social platforms',
      'MBA (iMBA) — Buckinghamshire New University, UK (2023)',
    ],
    can: [
      'IT strategy planning, roadmapping and executive stakeholder management',
      'AI adoption programme design and team enablement',
      'Change management and service improvement planning',
      'Vendor negotiation, contract management & procurement',
      'Technical training curriculum development and delivery',
      'IT consulting: business requirements → technology solutions',
    ],
    tools: ['ServiceNow', 'SAP Ariba', 'M365 Copilot', 'PowerPoint', 'Excel', 'Power BI'],
    certs: ['MBA iMBA — Buckinghamshire New Univ UK (2023)', 'PMP — 35 PDUs (2017)', 'ITIL v3 Foundation (2017)', 'AI-Driven Project Manager (2025)'],
    subSkills: [
      { id: 'l1', label: 'MBA (iMBA)',       icon: '🎓' },
      { id: 'l2', label: 'PMP 35 PDUs',      icon: '📋' },
      { id: 'l3', label: 'Team Training',    icon: '👥' },
      { id: 'l4', label: 'AI Strategy',      icon: '🚀' },
      { id: 'l5', label: 'Vendor Mgmt',      icon: '🤝' },
      { id: 'l6', label: 'Procurement',      icon: '💰' },
      { id: 'l7', label: '1M+ Community',    icon: '📱' },
      { id: 'l8', label: 'Tech Writing',     icon: '✍️' },
    ],
  },
  {
    id: 'dailyops',
    label: 'Daily IT\nOperations',
    icon: '⚙️',
    color: '#22D3EE',
    angle: 247,
    stat: '10 areas · 200+ users · daily',
    summary: 'Day-to-day enterprise IT operations across 10 technical domains — MDM, endpoint security, email admin, provisioning, network, AV and more.',
    link: '/projects#daily-operations',
    did: [
      'Managed 1,500–2,000+ assets across full hardware lifecycle daily',
      'Administered Exchange Online mailboxes, MFA, and shared mailbox governance',
      'Monitored and remediated endpoint compliance via Intune and Defender daily',
      'Managed macOS fleet (Jamf) — FileVault, SSO certs, Self Service apps',
      'Enrolled and managed corporate iOS/Android devices via Jamf and Intune',
      'Provisioned Windows devices via Autopilot — Day 1 ready in 45 min',
      'Administered M365 Teams, SharePoint, OneDrive for 200+ users',
      'Maintained HP MFP print fleet and 15 Teams Rooms AV systems',
      'Completed user onboarding/offboarding within SLA — 140+ employees',
      'Managed VPN, 802.1X Wi-Fi, NAC, and Cisco/Aruba network infrastructure',
    ],
    can: [
      'Full enterprise MDM: Jamf (macOS/iOS) + Intune (Windows/Android)',
      'Endpoint security compliance monitoring and remediation',
      'Exchange Online, SharePoint, Teams, and OneDrive administration',
      'User lifecycle: provisioning, MFA setup, access control, offboarding',
      'Network and VPN support: Cisco, Aruba, GlobalProtect, 802.1X',
      'Meeting room AV operations: Teams Rooms, Surface Hub, Crestron',
    ],
    tools: ['Jamf Pro', 'Microsoft Intune', 'Exchange Online', 'Azure AD', 'Cisco/Aruba', 'BitLocker', 'Defender', 'Teams Rooms', 'ServiceNow', 'GlobalProtect VPN'],
    certs: ['Microsoft Intune / Autopilot (Modern Mgmt) — 2021', 'Azure Security Engineer Associate — 2024', 'ITIL v3 Foundation — 2017', 'Microsoft 365 Admin — 2020'],
    subSkills: [
      { id: 'do1', label: 'Asset Lifecycle',   icon: '📦' },
      { id: 'do2', label: 'Email & Identity',  icon: '📧' },
      { id: 'do3', label: 'Endpoint Security', icon: '🛡️' },
      { id: 'do4', label: 'macOS MDM (Jamf)',  icon: '🍎' },
      { id: 'do5', label: 'Mobile MDM',        icon: '📱' },
      { id: 'do6', label: 'Win Autopilot',     icon: '💻' },
      { id: 'do7', label: 'M365 Cloud',        icon: '☁️' },
      { id: 'do8', label: 'Print & AV',        icon: '🖨️' },
      { id: 'do9', label: 'User Provisioning', icon: '🔐' },
      { id: 'do10', label: 'Network & VPN',    icon: '🌐' },
    ],
  },
]

/* ── SVG layout ── */
const CX = 420
const CY = 380
const DOMAIN_R = 240
const NODE_R = 32

function polar(deg: number, r: number, cx = CX, cy = CY) {
  const rad = (deg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/* ── Component ── */
export default function NeuralNetwork() {
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const raf = useRef<number>(0)
  const [t, setT] = useState(0)
  const t0 = useRef(Date.now())

  useEffect(() => {
    const loop = () => { setT((Date.now() - t0.current) / 1000); raf.current = requestAnimationFrame(loop) }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const activeDomain = DOMAINS.find(d => d.id === active) ?? null

  return (
    <div className="glass-card overflow-hidden"
      style={{ background: 'rgba(4,8,18,0.97)', border: '1px solid rgba(59,130,246,0.15)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>🧠</div>
        <div>
          <h3 className="text-white font-black text-base tracking-widest font-mono">NEURAL SKILL NETWORK</h3>
          <p className="text-gray-500 text-xs font-mono tracking-wider">CLICK A NODE TO EXPAND FULL EXPERIENCE</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-mono tracking-widest">ACTIVE</span>
        </div>
      </div>

      {/* SVG + sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <svg viewBox="-60 -60 980 920" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <filter id="g4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="g8"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <radialGradient id="rg-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3a5f"/><stop offset="65%" stopColor="#0a1628"/><stop offset="100%" stopColor="#040812"/>
              </radialGradient>
              {DOMAINS.map(d => (
                <radialGradient key={d.id} id={`rg-${d.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={d.color} stopOpacity="0.9"/>
                  <stop offset="100%" stopColor={d.color} stopOpacity="0.15"/>
                </radialGradient>
              ))}
            </defs>

            {[80,160,240,310].map(r => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none"
                stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="5 8"/>
            ))}
            {DOMAINS.map((d,i) => {
              const next = DOMAINS[(i+1)%DOMAINS.length]
              const p1=polar(d.angle,DOMAIN_R), p2=polar(next.angle,DOMAIN_R)
              return <line key={`cx-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={d.color} strokeWidth="0.8" opacity="0.1" strokeDasharray="3 9"/>
            })}
            {DOMAINS.map(d => {
              const p=polar(d.angle,DOMAIN_R), isAct=active===d.id, isHov=hovered===d.id
              return <line key={`sp-${d.id}`} x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={d.color} strokeWidth={isAct?3:isHov?2:1.2}
                opacity={isAct?0.9:isHov?0.6:0.2} strokeDasharray={isAct?'none':'8 6'}/>
            })}
            {DOMAINS.map((d,i) => {
              const p=polar(d.angle,DOMAIN_R), prog=((t*0.45+i*0.125)%1)
              return <circle key={`pu-${d.id}`} cx={CX+(p.x-CX)*prog} cy={CY+(p.y-CY)*prog}
                r="4.5" fill={d.color} opacity={active===d.id?1:0.55} filter="url(#g4)"/>
            })}
            {DOMAINS.map((d,i) => {
              const p=polar(d.angle,DOMAIN_R), prog=((t*0.32+i*0.18+0.5)%1)
              return <circle key={`rpu-${d.id}`} cx={p.x+(CX-p.x)*prog} cy={p.y+(CY-p.y)*prog}
                r="3" fill={d.color} opacity="0.38" filter="url(#g4)"/>
            })}

            {DOMAINS.map(d => {
              const p=polar(d.angle,DOMAIN_R), isAct=active===d.id, isHov=hovered===d.id
              const nr=isAct?NODE_R+14:isHov?NODE_R+6:NODE_R
              const breathe=1+0.06*Math.sin(t*1.8+d.angle*0.04)
              const dx=p.x-CX, dy=p.y-CY, dist=Math.sqrt(dx*dx+dy*dy)
              const ux=dx/dist, uy=dy/dist
              const lx=p.x+ux*(nr+16), ly=p.y+uy*(nr+16)
              const anchor: 'end' | 'start' | 'middle' = ux<-0.3?'end':ux>0.3?'start':'middle'
              return (
                <g key={d.id} style={{cursor:'pointer'}}
                  onClick={() => setActive(prev => prev===d.id?null:d.id)}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}>
                  <circle cx={p.x} cy={p.y} r={nr*breathe*1.55} fill={d.color} opacity={isAct?0.2:0.06}/>
                  <circle cx={p.x} cy={p.y} r={nr*1.28} fill="none" stroke={d.color}
                    strokeWidth={isAct?2.5:1.2} strokeDasharray={isAct?'none':'5 4'} opacity={isAct?1:0.4}/>
                  <circle cx={p.x} cy={p.y} r={nr} fill={isAct?`url(#rg-${d.id})`:'#060e1c'}
                    stroke={d.color} strokeWidth={isAct?3:2} filter="url(#g4)"/>
                  <text x={p.x} y={p.y+11} textAnchor="middle" fontSize={isAct?36:30}>{d.icon}</text>
                  <circle cx={p.x+nr*0.72} cy={p.y-nr*0.72} r="12"
                    fill="#040812" stroke={d.color} strokeWidth="1.8"/>
                  <text x={p.x+nr*0.72} y={p.y-nr*0.72+5} textAnchor="middle" fontSize="11"
                    fontWeight="900" fontFamily="'Courier New',monospace" fill={d.color}>
                    {d.subSkills.length}
                  </text>
                  {d.label.split('\n').map((line, li, arr) => (
                    <text key={li} x={lx} y={ly+(li-(arr.length-1)/2)*17}
                      textAnchor={anchor} fontFamily="'Courier New',monospace"
                      fontSize={isAct?14:13} fontWeight="800" fill={d.color} opacity={isAct?1:0.9}>
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}

            <circle cx={CX} cy={CY} r={62+5*Math.sin(t*1.3)} fill="url(#rg-core)" opacity="0.9"/>
            <circle cx={CX} cy={CY} r="56" fill="none" stroke="#3B82F6" strokeWidth="1.8"
              opacity="0.3" strokeDasharray="7 5" transform={`rotate(${t*12} ${CX} ${CY})`}/>
            <circle cx={CX} cy={CY} r="44" fill="none" stroke="#8B5CF6" strokeWidth="1.2"
              opacity="0.2" strokeDasharray="4 7" transform={`rotate(${-t*18} ${CX} ${CY})`}/>
            <circle cx={CX} cy={CY} r="34" fill="#060f22" stroke="#3B82F6" strokeWidth="2.5" filter="url(#g8)"/>
            <text x={CX} y={CY+8} textAnchor="middle" fontSize="32" filter="url(#g4)">🧠</text>
            <text x={CX} y={CY+28} textAnchor="middle" fontFamily="'Courier New',monospace"
              fontSize="9" fontWeight="900" fill="#60A5FA" opacity="0.9" letterSpacing="3">WAQAS</text>
          </svg>
        </div>

        {/* Sidebar */}
        <div className="xl:border-l border-white/5 px-4 py-4 flex flex-col gap-2 overflow-y-auto" style={{maxHeight:760, minWidth:280}}>
          {!activeDomain ? (
            <>
              <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1 font-bold px-1">All Domains</p>
              {DOMAINS.map(d => (
                <button key={d.id} onClick={() => setActive(d.id)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 hover:scale-[1.01] w-full"
                  style={{background:`${d.color}10`,border:`1px solid ${d.color}28`}}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl"
                    style={{background:`${d.color}20`,border:`1px solid ${d.color}40`}}>
                    {d.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm font-mono leading-snug" style={{color:d.color}}>
                      {d.label.replace('\n',' ')}
                    </div>
                    <div className="text-gray-400 text-xs font-mono mt-0.5 leading-snug">{d.stat}</div>
                  </div>
                  <span className="text-gray-500 text-base flex-shrink-0">›</span>
                </button>
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <button onClick={() => setActive(null)}
                className="text-xs font-mono text-gray-400 hover:text-gray-200 transition-colors text-left tracking-wider font-bold px-1">
                ← ALL DOMAINS
              </button>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
                style={{background:`${activeDomain.color}12`,border:`1px solid ${activeDomain.color}35`}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-4xl"
                  style={{background:`${activeDomain.color}20`,border:`1px solid ${activeDomain.color}40`}}>
                  {activeDomain.icon}
                </div>
                <div>
                  <h4 className="font-black text-white text-sm font-mono leading-tight">
                    {activeDomain.label.replace('\n',' ')}
                  </h4>
                  <p className="text-xs font-mono mt-0.5" style={{color:activeDomain.color}}>{activeDomain.stat}</p>
                </div>
              </div>
              {activeDomain.subSkills.map(sk => (
                <div key={sk.id} className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{background:`${activeDomain.color}08`,border:`1px solid ${activeDomain.color}20`}}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
                    style={{background:`${activeDomain.color}15`}}>
                    {sk.icon}
                  </div>
                  <span className="text-sm font-mono font-semibold" style={{color:activeDomain.color}}>{sk.label}</span>
                </div>
              ))}
              {activeDomain.link && (
                <Link href={activeDomain.link}
                  className="mt-1 flex items-center justify-center gap-2 w-full px-3 py-3 rounded-xl text-sm font-black font-mono tracking-wider transition-all hover:scale-[1.02]"
                  style={{background:`${activeDomain.color}20`,border:`1px solid ${activeDomain.color}50`,color:activeDomain.color}}>
                  ⚙️ VIEW PROJECT CARDS →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Full expansion panel ── */}
      {activeDomain && (
        <div className="border-t border-white/8" style={{background:`${activeDomain.color}05`}}>

          {/* Panel header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
            <span className="text-4xl">{activeDomain.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-black font-mono text-xl tracking-wider">
                {activeDomain.label.replace('\n',' ')}
              </h4>
              <p className="text-sm mt-0.5" style={{color:activeDomain.color}}>{activeDomain.stat}</p>
            </div>
            <button onClick={() => setActive(null)}
              className="text-gray-500 hover:text-white transition-colors text-xs font-mono tracking-wider px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20">
              ✕ CLOSE
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* What I Did */}
            <div className="rounded-xl p-5" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏆</span>
                <h5 className="text-white font-black font-mono text-sm tracking-wider">WHAT I DID</h5>
              </div>
              <ul className="space-y-2.5">
                {activeDomain.did.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:activeDomain.color}}/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What I Can Do */}
            <div className="rounded-xl p-5" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">⚡</span>
                <h5 className="text-white font-black font-mono text-sm tracking-wider">WHAT I CAN DO</h5>
              </div>
              <ul className="space-y-2.5">
                {activeDomain.can.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:activeDomain.color}}/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools + Certs + Skills */}
            <div className="flex flex-col gap-4">
              {/* Tools */}
              <div className="rounded-xl p-5 flex-1" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🛠️</span>
                  <h5 className="text-white font-black font-mono text-sm tracking-wider">TOOLS & TECH</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeDomain.tools.map(tool => (
                    <span key={tool} className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
                      style={{background:`${activeDomain.color}15`,color:activeDomain.color,border:`1px solid ${activeDomain.color}30`}}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {/* Certs */}
              <div className="rounded-xl p-5" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎓</span>
                  <h5 className="text-white font-black font-mono text-sm tracking-wider">CERTIFICATIONS</h5>
                </div>
                <ul className="space-y-1.5">
                  {activeDomain.certs.map(cert => (
                    <li key={cert} className="text-xs font-mono text-gray-400 flex items-start gap-2">
                      <span style={{color:activeDomain.color}} className="flex-shrink-0">✓</span>{cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-skill icon grid at bottom */}
          <div className="px-6 pb-6">
            <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3">Key Skills</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2">
              {activeDomain.subSkills.map(sk => (
                <div key={sk.id} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{background:`${activeDomain.color}0c`,border:`1px solid ${activeDomain.color}25`}}>
                  <span className="text-2xl">{sk.icon}</span>
                  <span className="text-xs font-mono font-bold leading-tight" style={{color:activeDomain.color}}>
                    {sk.label}
                  </span>
                </div>
              ))}
            </div>
            {activeDomain.link && (
              <div className="mt-5 flex justify-center">
                <Link href={activeDomain.link}
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-xl font-black text-sm font-mono tracking-wider transition-all hover:scale-105"
                  style={{background:`${activeDomain.color}20`,border:`2px solid ${activeDomain.color}60`,color:activeDomain.color}}>
                  ⚙️ VIEW 10 DAILY OPS PROJECT CARDS →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/5 px-6 py-3 flex flex-wrap items-center gap-4">
        <span className="text-gray-500 text-sm font-mono">{DOMAINS.reduce((s,d)=>s+d.subSkills.length,0)} SKILLS MAPPED</span>
        <span className="text-gray-700">·</span>
        <span className="text-gray-500 text-sm font-mono">{DOMAINS.length} DOMAINS</span>
        <span className="text-gray-700">·</span>
        <span className="text-gray-500 text-sm font-mono">CLICK ANY NODE TO SEE FULL EXPERIENCE</span>
      </div>
    </div>
  )
}
