import type { Metadata } from 'next'
import { Github, ExternalLink, CheckCircle, Star, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real-world apps, automation pipelines, and enterprise IT systems built by Syed Waqas Tayyab — AI dashboards, ServiceNow automation, PowerBI, SAP integrations, and more.',
}

const projects = [
  // ── LIVE PERSONAL APPS ───────────────────────────────────────────────
  {
    icon: '/app-wahub.png',
    iconAlt: 'Waqas AI Hub',
    title: 'Waqas AI Hub',
    subtitle: 'Personal AI-Powered Desktop Dashboard',
    description: 'A native macOS Swift app + FastAPI web dashboard that replaces terminal commands for all daily SAP IT work. Single click to view emails, calendar, ServiceNow tickets, OneDrive files, and WhatsApp SLA alerts — all in one Teams-style interface.',
    highlights: [
      'Native macOS Swift + WebKit wrapper — launches like any desktop app',
      'FastAPI backend: Gmail, SAP O365 (Outlook, Calendar, OneDrive, SharePoint)',
      'ServiceNow live ticket dashboard — auto-loads SNOW session from Safari',
      'WhatsApp SLA breach alerts via Twilio — fires 30 min before breach',
      'Teams-style layout: icon rail, section panel, browser-style tabs',
      'Auto-starts via LaunchAgent — always running on login',
      'Email summarisation agent — runs every morning, condenses SAP inbox to action list',
      '6 colour themes, collapsible sidebar, keyboard shortcuts (⌘1–9, ⌘R, ⌘K)',
    ],
    tags: ['FastAPI', 'Python', 'Swift', 'SAP O365', 'ServiceNow', 'Twilio', 'macOS'],
    status: 'Live',
    category: 'AI Dashboard · macOS App',
    color: 'border-accent-blue',
    glowColor: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: '/app-itasset.png',
    iconAlt: 'IT Asset Manager',
    title: 'IT Asset Manager',
    subtitle: 'Enterprise IT Asset Tracking Web App',
    description: 'A full-stack web application replacing Excel-based IT asset tracking at SAP IT, RUH02. Manages 1,500–2,000+ active assets (laptops, iPhones, iPads, monitors, printers, data centre) across the MENA region — modelled directly on SAP\'s ISP ERP system workflows.',
    highlights: [
      'KPI dashboard: Chart.js analytics, low-stock alerts, 6-month trend charts',
      'Asset list with search, filter, sort, pagination — full detail on row click',
      'Add/Edit with duplicate serial number detection, 5 mandatory fields',
      'Excel import (Add Only / Add+Update) with header garbage filtering',
      'Multi-sheet colour-coded Excel export by asset status',
      'Bulk actions — status change, bulk delete with confirmation',
      'Full audit log per asset — every change tracked with timestamp',
      'Floating AI chat widget — natural language queries return card-format results',
    ],
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js', 'HTML/CSS', 'JavaScript'],
    status: 'Live',
    category: 'Web Application · IT Tool',
    color: 'border-cyan-500',
    glowColor: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🔔',
    title: 'SNOW SLA Automation Pipeline',
    subtitle: 'ServiceNow Monitoring & WhatsApp Alerts',
    description: 'A Python automation pipeline monitoring ServiceNow tickets 24/7 and firing WhatsApp alerts before SLA breaches. Zero manual checking — runs as background daemons via cron every 5 minutes.',
    highlights: [
      'Polls ServiceNow REST API every 5 minutes for new & at-risk tickets',
      'Calculates SLA breach time — fires WhatsApp 30 minutes before breach via Twilio',
      'Daily 9 AM email summariser — SAP Outlook inbox → prioritised action list',
      'Dual trigger: SNOW API + SAP email scanning (survives expired cookies)',
      'JSON output mode for live dashboard integration into Waqas AI Hub',
      'Runs as background daemon — auto-restarts via macOS LaunchAgent',
      'Full timestamp audit log in /tmp/ for every alert fired',
      'Handles 50–60 tickets/month per engineer, 1,000–1,500/year total',
    ],
    tags: ['Python', 'ServiceNow', 'Twilio', 'REST API', 'Cron', 'SAP O365'],
    status: 'Live',
    category: 'Automation · Monitoring',
    color: 'border-green-500',
    glowColor: 'shadow-[0_0_30px_rgba(34,197,94,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🌐',
    title: 'HiTecH AI HUB Website',
    subtitle: 'Personal Brand & Technology Platform',
    description: 'This website — a production-ready personal technology brand built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Live IT news ticker, neural network skill map, animated hero, full blog, hire page, and Cloudflare Pages deployment.',
    highlights: [
      'Next.js 14 App Router — static export on Cloudflare Pages (global CDN)',
      'Live IT/AI news ticker: RSS feeds from TechCrunch, The Verge, Ars Technica, Wired',
      'Animated neural network expertise diagram with 6 skill domains',
      'Animated hero: dual avatar with data-sync beam, orbit rings, mobile-responsive',
      'Blog system with Markdown — add posts without touching code',
      'Full /portfolio page: 4 work roles, 13+ certs, 7 skill domains, 8 projects',
      'Neural Network skill explorer on About page (71 skills, 8 domains)',
      'Fully responsive (mobile + desktop), SEO optimised, Open Graph metadata',
    ],
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Pages'],
    status: 'Live',
    category: 'Web Application · Personal Brand',
    color: 'border-purple-500',
    glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.2)]',
    github: 'https://github.com/waqastayyab2004-tech/hitechtechnologyhub',
    demo: 'https://www.hitechtechnologyhub.com',
  },
  {
    icon: null,
    iconEmoji: '🤖',
    title: 'SAP O365 MCP Server',
    subtitle: 'Claude AI ↔ SAP Microsoft 365 Bridge',
    description: 'A Model Context Protocol (MCP) server giving Claude AI direct access to SAP Outlook, Calendar, OneDrive, and SharePoint — enabling natural language control of enterprise M365 services from any Claude session.',
    highlights: [
      'OAuth2 authentication with SAP Azure AD — bypasses Conditional Access on non-managed Mac',
      'localhost:8080 redirect URI workaround (device code flow blocked by SAP policy)',
      'Read/search SAP Outlook emails — full content + attachment support',
      'Query SAP Calendar — list, create, update meetings via Graph API',
      'Browse OneDrive (49.87 GB) — list, download, upload documents',
      'SharePoint site search across 10 internal SAP sites',
      'Token auto-refresh — stays connected without manual re-auth',
      'Used daily in Waqas AI Hub + Claude Code sessions',
    ],
    tags: ['Python', 'FastAPI', 'OAuth2', 'Microsoft Graph API', 'MCP', 'SAP Azure AD'],
    status: 'Live',
    category: 'AI Integration · MCP Server',
    color: 'border-orange-500',
    glowColor: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },

  // ── SAP ENTERPRISE PROJECTS ──────────────────────────────────────────
  {
    icon: null,
    iconEmoji: '📊',
    title: 'SAP PowerBI IT Operations Dashboard',
    subtitle: 'Enterprise KPI & Analytics Automation · SAP',
    description: 'PowerBI dashboards for real-time IT KPIs at SAP Saudi Arabia — asset lifecycle, ServiceNow SLA stats, ticket volume trends, onboarding completion rates, and procurement spend. Integrated with SharePoint and SAP Work Zone for live data feeds accessible by IT leadership.',
    highlights: [
      'Real-time IT KPI dashboards: asset count, SLA %, ticket volumes by category',
      'SAP Work Zone / SAP JAM integration — published to all KSA IT team members',
      'SharePoint data connectors — live feeds from SNOW and SAP ISP asset system',
      'Monthly procurement spend tracking (MENA device approvals ~200–300K SAR/mo)',
      'Onboarding/offboarding completion metrics for IT leadership reporting',
      'Used by SVP MEA-North, Country MDs, and IT managers for decision-making',
      'Self-service model — non-technical stakeholders read dashboards independently',
      'Replaced manual monthly Excel reports sent via email',
    ],
    tags: ['PowerBI', 'SharePoint', 'SAP Work Zone', 'SAP JAM', 'ServiceNow', 'Data Analytics'],
    status: 'Live',
    category: 'Enterprise Analytics · SAP IT',
    color: 'border-sky-500',
    glowColor: 'shadow-[0_0_30px_rgba(14,165,233,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '📱',
    title: 'MENA Device Approval & Procurement Workflow',
    subtitle: 'Power Apps + SAP Ariba Automation · SAP',
    description: 'A Power Apps-based IT device approval system for the SAP MENA region — replacing manual email chains for device procurement. Handles end-user device requests, management approvals, and SAP Ariba purchase order creation, processing 200–300K SAR/month in hardware approvals.',
    highlights: [
      'Power Apps front-end for employee device requests (laptops, mobiles, accessories)',
      'Multi-level approval workflow: user → IT manager → country MD → SAP Ariba PO',
      'SAP Ariba integration — approved requests auto-create PR/PO in procurement system',
      'Managed MENA device approvals: ~200–300K SAR/month, ~600K SAR/year',
      'Covers SAP offices: Riyadh (200+ users), Jeddah, Al-Khobar, and wider MENA',
      'Power Automate flows for notifications, escalations, and approval reminders',
      'Replaced 100% of manual email-based approval process',
      'Device catalogue synced with approved vendor list (Lenovo, Apple, Samsung)',
    ],
    tags: ['Power Apps', 'Power Automate', 'SAP Ariba', 'SharePoint', 'M365', 'PR/PO Workflow'],
    status: 'Live',
    category: 'Enterprise Automation · SAP IT',
    color: 'border-indigo-500',
    glowColor: 'shadow-[0_0_30px_rgba(99,102,241,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🏢',
    title: 'SAP Saudi Arabia IT Infrastructure Projects',
    subtitle: 'Office Moves, Renovations & AV Deployments · SAP',
    description: 'Led multiple large-scale IT infrastructure deployments across SAP Saudi Arabia offices — including the Riyadh head office renovation, Jeddah and Al-Khobar remote office setups, and Meeting Room Technology (MTR) upgrades with a combined project value exceeding 1.2M SAR.',
    highlights: [
      'Riyadh Head Office renovation: complete IT infrastructure rebuild — 1.2M SAR project',
      'Jeddah & Al-Khobar remote office IT setup and network rollout (WAN/LAN)',
      '15 meeting rooms: MS Teams MTR, Logitech Rally, Poly Pano, Evoko booking, Crestron',
      'Digital signage deployment: SVM system across all KSA offices',
      'Network: Cisco switches, Aruba Wireless, NAC controllers, ISP/WAN connectivity',
      'HP server room assets: setup, racking, cabling, SCCM deployment',
      'SAP Board & CEO-level meeting AV setups: LEAP, Crown Plaza, Germany IBS broadcasts',
      'Coordinated vendors: Destiny, Beetra — end-to-end from PR/PO to commissioning',
    ],
    tags: ['IT Infrastructure', 'Cisco', 'Aruba', 'MS Teams MTR', 'Crestron', 'SAP Ariba', 'Project Management'],
    status: 'Live',
    category: 'IT Infrastructure · Project Management',
    color: 'border-teal-500',
    glowColor: 'shadow-[0_0_30px_rgba(20,184,166,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🔐',
    title: 'Modern Workplace & Endpoint Security Rollout',
    subtitle: 'Intune / Autopilot / SCCM / Azure AD · SAP MENA',
    description: 'Designed and executed the Modern Workplace endpoint management transition for SAP MENA — migrating from legacy SCCM to Microsoft Intune/Autopilot, Azure AD (Entra ID), and zero-touch device provisioning. Covers Windows, macOS (JamF), iOS, and Android platforms across 3 Saudi offices.',
    highlights: [
      'Microsoft Intune + Autopilot: zero-touch Windows provisioning for new hires',
      'JamF: macOS MDM — SAP-certified app deployment, compliance, FileVault',
      'Azure AD (Entra ID): SSO, MFA, Conditional Access policies for MENA users',
      'Trellix/McAfee + HIPS + SCCM compliance checks — frontend compliancy checker',
      'Defender for M365: endpoint detection, threat response, Secure Score improvement',
      'iOS & Android MDM: SAP-certified apps on mobiles, remote wipe capability',
      'Company Portal + Software Centre: self-service app deployment for 200+ users',
      'TLM/Cloud/OneDrive/SharePoint data backup and recovery procedures',
    ],
    tags: ['Microsoft Intune', 'Autopilot', 'SCCM', 'Azure AD', 'JamF', 'Trellix', 'Defender', 'MDM'],
    status: 'Live',
    category: 'Cybersecurity · Modern Workplace',
    color: 'border-red-500',
    glowColor: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🏦',
    title: 'Bank ATM & Branch Security System',
    subtitle: 'Physical Security Infrastructure · Banque Saudi Fransi',
    description: 'Managed the complete ATM and branch physical security infrastructure for Banque Saudi Fransi across Riyadh head office and multiple branches — including access control, CCTV, IoT sensors, burglar/fire alarms, and 24/7 security command centre operations.',
    highlights: [
      'Managed G4S MultiMax access control — employee access cards for HQ and all branches',
      'Siecep ATM security management tool — health monitoring for ATM network',
      'CCTV, IoT sensors, burglar & fire alarm systems across all branches',
      'Security command centre operations — incident recording to management',
      'IT ticket management via BMC Remedy — monitoring and processing',
      'Vanguard security software — user privilege management and audit',
      '24/7 business continuity monitoring for banking security systems',
      'Testing & maintenance: access control, sensors, CCTV, alarm systems',
    ],
    tags: ['BMC Remedy', 'G4S MultiMax', 'Siecep', 'Vanguard', 'CCTV', 'Access Control', 'Banking IT'],
    status: 'Live',
    category: 'Physical Security · Banking IT',
    color: 'border-rose-500',
    glowColor: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
    github: '#',
    demo: '#',
  },

  // ── IN DEVELOPMENT ───────────────────────────────────────────────────
  {
    icon: null,
    iconEmoji: '📊',
    title: 'SNOW SLA Breach Predictor',
    subtitle: 'Python ML Model on Real ServiceNow Data',
    description: 'A machine learning model built on real SAP ServiceNow ticket data that predicts which tickets will breach SLA — combining 11 years of IT operations expertise with Python ML. Designed as a proof of capability for SAP ML Engineer role transition.',
    highlights: [
      'Training data: real SAP ServiceNow tickets — 1,000–1,500/year over multiple years',
      'scikit-learn pipeline — Random Forest + feature engineering',
      'Features: ticket age, priority, category, assignment group, time-of-day, SLA target',
      'Predicts breach probability per ticket with confidence score',
      'Integrates with existing SNOW WhatsApp alert pipeline for real-time scoring',
      'Dashboard visualisation of at-risk tickets by category and engineer',
      'SAP BTP deployment path — shows SAP + Python ML convergence',
      'Evidence piece for SAP ML Engineer role application (internal)',
    ],
    tags: ['Python', 'scikit-learn', 'Pandas', 'SAP BTP', 'ServiceNow', 'ML', 'Random Forest'],
    status: 'In Development',
    category: 'AI / ML · Predictive Analytics',
    color: 'border-yellow-500',
    glowColor: 'shadow-[0_0_30px_rgba(234,179,8,0.2)]',
    github: '#',
    demo: '#',
  },

  // ── ENTERPRISE IMPLEMENTATIONS ───────────────────────────────────────
  {
    icon: null,
    iconEmoji: '🖥️',
    title: 'Modern Workplace Migration: SCCM → Intune/Autopilot',
    subtitle: 'Enterprise Endpoint Transformation · 200+ Users',
    description: 'Led the full migration of a 200+ user enterprise from legacy SCCM on-premises management to Microsoft Intune, Autopilot zero-touch provisioning, and Azure AD (Entra ID). Completed in 90 days across Windows, macOS (JamF), iOS, and Android platforms — zero business disruption.',
    highlights: [
      'Phased rollout: IT pilot (10) → low-risk (50) → standard (100) → executives (50)',
      'Autopilot zero-touch: new device setup reduced from 3.5 hrs → 45 minutes',
      'JamF for macOS: FileVault, SAP app bundle, Defender, VPN — 15-min enrollment',
      'Azure AD Conditional Access: blocked legacy auth, enforced MFA and named locations',
      'Device compliance rate improved from 62% to 94% within 90 days',
      'Microsoft Secure Score improved from 41% to 71% post-deployment',
      'Change management: comms plan, FAQ docs, per-wave user briefings',
      'Zero helpdesk escalations from C-suite during rollout — white-glove exec delivery',
    ],
    tags: ['Intune', 'Autopilot', 'Azure AD', 'JamF', 'SCCM', 'Change Management', 'Zero Trust'],
    status: 'Live',
    category: 'Enterprise Implementation · Change Management',
    color: 'border-sky-500',
    glowColor: 'shadow-[0_0_30px_rgba(14,165,233,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🔐',
    title: 'Zero Trust Security Architecture Implementation',
    subtitle: 'Azure Security Engineer · Enterprise Cybersecurity',
    description: 'Designed and deployed a Zero Trust security architecture for a 200+ user multinational enterprise — including Conditional Access policies, MFA enforcement, Defender for M365, and endpoint compliance. Microsoft Secure Score raised from 41% to 78% over 12 months.',
    highlights: [
      'Conditional Access: 5 core policies — blocked legacy auth, enforced compliant devices',
      'MFA deployment: named locations (office IPs) trusted, all external access requires MFA',
      'Defender for M365: EDR enabled, threat policies tuned, Secure Score 41% → 78%',
      'Privileged Identity Management (PIM): no permanent Global Admin accounts',
      'Intune compliance policies: BitLocker, Defender, minimum OS version enforced',
      'Data Loss Prevention (DLP): sensitivity labels applied to SharePoint and email',
      'Security awareness training delivered to 200+ users — phishing simulation completed',
      'Azure Sentinel (SIEM) pilot: custom alert rules for anomalous sign-in patterns',
    ],
    tags: ['Azure Security', 'Zero Trust', 'Conditional Access', 'MFA', 'Defender', 'PIM', 'DLP'],
    status: 'Live',
    category: 'Cybersecurity · Enterprise Implementation',
    color: 'border-red-500',
    glowColor: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🏢',
    title: 'Riyadh Head Office IT Infrastructure Rebuild',
    subtitle: 'Office Renovation · 15 Meeting Rooms · 1.2M SAR Project',
    description: 'Led the complete IT infrastructure rebuild for a major head office renovation — 15 meeting rooms with full AV deployment, Cisco/Aruba network rebuild, HP server room rebuild, and digital signage rollout across all floors. Project value exceeded 1.2M SAR.',
    highlights: [
      '15 meeting rooms: MS Teams MTR, Logitech Rally, Poly Pano, Evoko booking systems',
      'Cisco switch/router full replacement: WAN, LAN, NAC controllers, Aruba Wireless',
      'HP server room: rack rebuild, cabling, SCCM deployment, UPS configuration',
      'Digital signage (SVM/ITPP): content management across all office floors',
      'Crestron presentation systems installed in 5 boardrooms',
      'Vendor management: Destiny and Beetra — full PR/PO via SAP Ariba',
      '200+ users migrated seamlessly — zero business disruption during renovation',
      'Post-completion: C-level sign-off on all meeting rooms within 1 week',
    ],
    tags: ['IT Infrastructure', 'Cisco', 'Aruba', 'MS Teams MTR', 'Crestron', 'SAP Ariba', 'Project Management'],
    status: 'Live',
    category: 'IT Infrastructure · Project Management',
    color: 'border-teal-500',
    glowColor: 'shadow-[0_0_30px_rgba(20,184,166,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '📊',
    title: 'ServiceNow ITSM Migration: IT Direct → SNOW',
    subtitle: 'Full ITSM Platform Migration · ITIL-Aligned Service Design',
    description: 'Managed the full migration from legacy IT Direct ticketing system to ServiceNow — including ticket data migration, SLA framework redesign, auto-assignment business rules, KB architecture, and user adoption training for 200+ users across 3 offices.',
    highlights: [
      'SLA framework redesigned: P1–P4 matrix with executive override rules',
      'Auto-assignment business rules: category + location → correct team routing',
      'KB article migration and quality audit: 80+ articles reviewed and updated',
      'ServiceNow dashboard built: SLA %, ticket volume, aging A/R, FCR metrics',
      'First Contact Resolution (FCR) improved to 75%+ post-migration',
      'Change management: 200+ user training across Riyadh, Jeddah, Al-Khobar',
      'Go-live completed with zero P1 tickets during cutover weekend',
      'Monthly SLA reporting automated: PowerBI connected to SNOW REST API',
    ],
    tags: ['ServiceNow', 'ITIL v3', 'IT Direct', 'Migration', 'Change Management', 'PowerBI', 'SLA Design'],
    status: 'Live',
    category: 'ITSM · Change Management',
    color: 'border-emerald-500',
    glowColor: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '📋',
    title: 'IT Onboarding/Offboarding Automation Programme',
    subtitle: '140+ Executives & Staff · DocuSign · SNOW · Azure AD',
    description: 'Designed and implemented a standardised IT onboarding/offboarding programme covering 140+ employees including C-level executives — reducing Day 1 IT setup from 4 hours to 30 minutes through process automation, pre-staging, and DocuSign digital workflows.',
    highlights: [
      'Day 1 readiness: device pre-staged, accounts active, apps deployed before arrival',
      'T-14 day trigger: IT request auto-raised in SNOW on HR confirmation',
      'Azure AD provisioning: accounts, licenses, group memberships automated',
      'DocuSign integration: asset assignment signed digitally — zero paper',
      'Offboarding: account disable, device wipe, data backup — all within 2 hours',
      '140+ onboardings completed including Country MD, CFO, COO-level executives',
      'MENA coverage: Riyadh, Jeddah, Al-Khobar, Kuwait, Bahrain remote support',
      'Reduced IT onboarding tickets by 60% through self-service pre-FAQ docs',
    ],
    tags: ['Azure AD', 'ServiceNow', 'DocuSign', 'Intune Autopilot', 'M365', 'Process Automation'],
    status: 'Live',
    category: 'Process Automation · Change Management',
    color: 'border-violet-500',
    glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🎙️',
    title: 'C-Suite & Board-Level Event AV Delivery',
    subtitle: 'LEAP · Crown Plaza · Germany IBS Broadcasts · SAP Board Events',
    description: 'Delivered AV and IT infrastructure for 50+ high-stakes executive events including SAP Board meetings, CEO-level sessions at LEAP, Crown Plaza conferences, and live broadcast to Germany IBS — supporting SVPs, MDs, CFOs, COOs, and visiting SAP AG board members.',
    highlights: [
      'LEAP 2023/2024: full AV setup, IT support for SAP booth and sessions',
      'Germany IBS live broadcast: dual-path network, MS Teams, synchronized delivery',
      'Crown Plaza executive offsite: 300+ attendee AV — zero incidents',
      'CEO and Board-level meetings: dedicated IT presence, hot spare kit always ready',
      'Pre-event protocol: 3-hour setup, full rehearsal, backup hotspot, spare device',
      '5-year track record: zero AV failures at any executive event',
      'Vendors coordinated: Destiny, Beetra — end-to-end from PR/PO to commissioning',
      'Supported SAP EMEA President, Country MDs, Directors across MENA cluster',
    ],
    tags: ['AV Setup', 'MS Teams', 'Cisco', 'Executive Support', 'Event Management', 'VIP IT'],
    status: 'Live',
    category: 'Event Management · VIP IT Support',
    color: 'border-orange-500',
    glowColor: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    github: '#',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🏦',
    title: 'Bank ATM & Branch Security System Rollout',
    subtitle: 'System Security Officer · Banque Saudi Fransi (2012–2015)',
    description: 'Managed the full ATM and branch physical security infrastructure for Banque Saudi Fransi — including access control, CCTV, IoT security sensors, and 24/7 monitoring across Riyadh HQ and multiple branches. First enterprise security role — foundational to 15-year IT career.',
    highlights: [
      'ATM security: Siecep management tool — health monitoring for entire ATM network',
      'G4S MultiMax access control: employee badges for HQ and all Saudi branches',
      'CCTV infrastructure: installation, configuration, and 24/7 monitoring',
      'IoT sensors: burglar alarms, fire alarm systems — regular testing and maintenance',
      'Security incident recordings provided to management within SLA',
      'BMC Remedy: ticket management, monitoring, and escalation processing',
      'Banking platforms: Sicep, Vanguard, MultiMax, BMS — 24/7 business continuity',
      'Coordinated with Head Office security command centre for all access management',
    ],
    tags: ['Physical Security', 'Access Control', 'CCTV', 'BMC Remedy', 'Siecep', 'G4S MultiMax', 'Banking IT'],
    status: 'Live',
    category: 'Physical Security · Banking IT',
    color: 'border-rose-500',
    glowColor: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
    github: '#',
    demo: '#',
  },
]

const statusColors: Record<string, string> = {
  Live: 'bg-green-500/10 text-green-400 border-green-500/20',
  'In Development': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Coming Soon': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          <span className="gradient-text">Projects</span> &amp; Implementations
        </h1>
        <p className="section-subheading">
          Real-world apps, enterprise implementations, change management, and AI integrations — delivered across global multinationals and beyond.
        </p>
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mt-8">
          {[
            { value: '100+', label: 'Projects Delivered' },
            { value: '18', label: 'Showcased Here' },
            { value: '15+', label: 'Years Building' },
            { value: '1.2M+', label: 'SAR Projects Managed' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { label: 'Personal Apps', color: 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue' },
            { label: 'SAP Enterprise', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
            { label: 'Cybersecurity', color: 'bg-red-500/10 border-red-500/30 text-red-400' },
            { label: 'Change Management', color: 'bg-violet-500/10 border-violet-500/30 text-violet-400' },
            { label: 'Infrastructure', color: 'bg-teal-500/10 border-teal-500/30 text-teal-400' },
            { label: 'In Development', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
          ].map(c => (
            <span key={c.label} className={`px-3 py-1 rounded-full text-xs font-semibold border ${c.color}`}>{c.label}</span>
          ))}
        </div>
      </ScrollReveal>

      {/* Projects */}
      <div className="space-y-8">
        {projects.map((project, i) => (
          <ScrollReveal key={project.title} delay={i * 0.05}>
            <div className={`glass-card border-l-4 ${project.color} p-7 md:p-9 ${project.glowColor} transition-all duration-300 hover:-translate-y-0.5`}>
              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left — icon + meta */}
                <div className="flex flex-col items-center lg:items-start gap-4 lg:w-56 flex-shrink-0">
                  <div className="relative">
                    {project.icon ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.icon} alt={project.iconAlt} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-dark-700 border border-white/10 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        {project.iconEmoji}
                      </div>
                    )}
                    <span className={`absolute -bottom-2 -right-2 badge border text-xs ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="text-center lg:text-left">
                    <p className="text-xs text-gray-500 leading-snug">{project.category}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {project.tags.map(t => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-2 w-full mt-auto">
                    {project.github !== '#' ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-outline text-xs py-2 px-3 flex-1 justify-center">
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    ) : (
                      <span className="btn-outline text-xs py-2 px-3 flex-1 justify-center opacity-40 cursor-not-allowed">
                        <Github className="w-3.5 h-3.5" /> Private
                      </span>
                    )}
                    {project.demo !== '#' ? (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="btn-primary text-xs py-2 px-3 flex-1 justify-center">
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                      </a>
                    ) : (
                      <span className="btn-primary text-xs py-2 px-3 flex-1 justify-center opacity-40 cursor-not-allowed">
                        <ExternalLink className="w-3.5 h-3.5" /> Internal
                      </span>
                    )}
                  </div>
                </div>

                {/* Right — details */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-black text-white mb-0.5">{project.title}</h2>
                  <p className="text-accent-blue font-semibold text-sm mb-3">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">{project.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.2} className="mt-14 text-center">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-accent-yellow" />
            <h3 className="text-xl font-bold text-white">Want Something Built?</h3>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            15+ years of enterprise IT + AI/ML skills. I build automation tools, web apps, and AI integrations that solve real problems — from MENA-scale SAP deployments to personal AI dashboards.
          </p>
          <a href="/contact" className="btn-primary inline-flex px-8 py-3">
            Discuss a Project
          </a>
        </div>
      </ScrollReveal>
    </div>
  )
}
