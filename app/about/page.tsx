'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Cpu, Zap, Shield, Cloud, Brain, Network, Briefcase, Star, Phone,
  MessageCircle, Globe, Users, TrendingUp, Award, Mail, Linkedin,
  Facebook, CheckCircle, Calendar, MapPin, GraduationCap, ExternalLink,
  Download, Code, Server, Database, ChevronDown, ChevronUp,
} from 'lucide-react'
import NeuralNetwork from '@/components/ui/NeuralNetwork'
import MindMap from '@/components/ui/MindMap'

/* ─── DATA ─────────────────────────────────────────────────────────── */

const certifications = [
  { name: 'Azure Security Engineer Associate', issuer: 'Microsoft', year: '2024', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
  { name: 'SAP Certified: Generative AI Hub (AIG02)', issuer: 'SAP', year: '2026', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'SAP Python ML for SAP HANA', issuer: 'SAP', year: '2026', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'SAP S/4HANA System Admin & SAP Analytics Cloud', issuer: 'SAP', year: '2022', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'AI-Driven Project Manager', issuer: 'QAS', year: '2025', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25' },
  { name: 'CCNA R&S (Security)', issuer: 'Cisco', year: '2013', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25' },
  { name: 'ITIL v3 Foundation (ITSM)', issuer: 'Axelos', year: '2017', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' },
  { name: 'PMP Training — 35 PDUs', issuer: 'PMI', year: '2018', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/25' },
  { name: 'Microsoft 365 Admin', issuer: 'Microsoft', year: '2020', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
  { name: 'MBA (iMBA)', issuer: 'Buckinghamshire New Univ, UK', year: '2023', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/25' },
  { name: 'BSc Information Technology', issuer: 'University of Greenwich, UK', year: '2010', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25' },
  { name: 'SAP S/4HANA Supply Chain Exposure', issuer: 'SAP', year: '2022', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  { name: 'Microsoft Intune / Autopilot (Modern Mgmt)', issuer: 'Microsoft', year: '2021', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
]

const experience = [
  {
    role: 'Senior IT System Engineer / IT Service Delivery Lead',
    company: 'SAP',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jul 2019 – Present',
    color: 'border-accent-blue',
    badge: 'text-accent-blue',
    highlights: [
      'Location responsible for SAP Saudi Arabia — 3 offices (Riyadh 200+ users, Jeddah, Al-Khobar)',
      'IT SPOC for C-level executives including SVP MEA-North, MDs, COO, CFO — CEO & Board level events',
      'Manage 1,500–2,000+ active IT assets via SAP ISP ERP — procurement via SAP Ariba (MENA, ~200–300K/mo)',
      'Full ServiceNow ticket lifecycle: 50–60/month per user, 1,000–1,500/year total; KB creation & quality checks',
      'Led 140+ employee onboardings/offboardings including Executives — DocuSign, CLEA, SNOW',
      'Modern Workplace: Intune/Autopilot, SCCM, Azure AD (Entra ID), JamF, iOS/Android MDM',
      'AV & meeting room tech: MS Teams MTR, Logitech Rally, Poly Pano, Crestron, Evoko booking systems',
      'Managed SAP events: LEAP, Crown Plaza, Kick-Off KSA/MEA, Board & CEO level meetings Germany IBS',
      'Built AI automation tools (Power Apps, SAP Build, Python) replacing manual workflows — saving hours daily',
      'SAP system analysis: PowerBI dashboards, SharePoint sites, SAP Work Zone, SAP JAM automation',
      'Vendor coordination: Destiny, Beetra — OBO/renovations up to 1.2M SAR; Jeddah, Riyadh, Al-Khobar',
    ],
    skills: ['ServiceNow', 'SAP Ariba', 'Azure AD / Entra ID', 'Intune / Autopilot', 'M365', 'Python AI', 'SAP ISP', 'SNOW', 'DocuSign', 'Power Apps', 'PowerBI', 'SAP Build', 'CLEA App', 'ITIL v3'],
  },
  {
    role: 'IT Support Specialist (IT SPOC)',
    company: 'SAP Saudi Arabia',
    location: 'Riyadh · Jeddah · AlKhobar',
    period: 'Jan 2015 – Jun 2019',
    color: 'border-cyan-500',
    badge: 'text-cyan-400',
    highlights: [
      'Single point of contact for IT across 3 Saudi Arabia SAP office locations (EMEA Global IT team)',
      'Network: HP Servers, Cisco Switches, Routers, WAN, NAC Controllers, Aruba Wireless',
      'SCCM, MDM, MS Azure Cloud, Azure AAD — Windows/macOS/Linux OS deployment & mass deployment',
      'Configuring SAP-certified software on iOS, Android, Windows, and Mac platforms',
      'Endpoint security: Trellix/McAfee, HIPS, SCCM compliance, TLM/Cloud/OneDrive/SharePoint backup',
      'Microsoft Intune, Configuration Manager, Autopilot, Company Portal, Software Centre',
      'Core M365: SharePoint, Teams, OneDrive, Exchange Online, Outlook, MS Lync, Skype4Business',
      'Video conferencing: Cisco, Aruba Wireless, Logitech Rally, Evoko, Poly Pano, DiBo, Skype4Business',
      'Maintained and updated SAP S/4HANA, SAP Analytics Cloud, and SAP BTP operations',
    ],
    skills: ['SAP S/4HANA', 'HP Servers', 'Cisco / Aruba', 'Windows / macOS / Linux', 'SCCM', 'Intune', 'Azure AAD', 'MDM', 'Trellix / McAfee', 'Teams AV', 'OTX App', 'IT Direct'],
  },
  {
    role: 'System Security Officer',
    company: 'Banque Saudi Fransi',
    location: 'Riyadh, Saudi Arabia',
    period: '2012 – 2015',
    color: 'border-red-500',
    badge: 'text-red-400',
    highlights: [
      'Managed ATM & branch security systems — Siecep ATM security management tool',
      'G4S MultiMax access control — Head office & branches; employee access cards from Security command center',
      'CCTV, IoT sensors, Burglar & Fire alarm systems — testing & maintenance',
      'IT ticket management via BMC Remedy system — monitoring & processing',
      'Security tools: Access Control, Sicep, Vanguard, MultiMax, BMS Remedy — 24/7 business continuity',
    ],
    skills: ['BMC Remedy', 'Access Control', 'CCTV', 'ATM Security', 'Sicep', 'Vanguard', 'MultiMax', 'Incident Response'],
  },
  {
    role: 'Network Administrator',
    company: 'TSBS',
    location: 'Riyadh, Saudi Arabia',
    period: '2011 – 2012',
    color: 'border-emerald-500',
    badge: 'text-emerald-400',
    highlights: [
      'Setup and configuration of LAN, WAN, VPN — DHCP, TCP/IP, routing protocols',
      'Anti-virus installation and configuration: McAfee, OfficeScan',
      'End user IT support and device troubleshooting',
    ],
    skills: ['LAN / WAN', 'VPN', 'TCP/IP', 'DHCP', 'McAfee', 'End-User Support'],
  },
]

const projects = [
  {
    emoji: '🤖',
    title: 'Waqas AI Hub',
    subtitle: 'macOS AI Dashboard',
    desc: 'Native macOS Swift app + FastAPI backend integrating Gmail, SAP Outlook, Calendar, ServiceNow tickets, and WhatsApp SLA alerts in one dashboard.',
    tags: ['FastAPI', 'Python', 'Swift', 'ServiceNow', 'Twilio'],
    status: 'Live',
    color: 'border-accent-blue',
  },
  {
    emoji: '📦',
    title: 'IT Asset Manager',
    subtitle: 'Enterprise Web App',
    desc: 'Full-stack Flask app replacing Excel-based asset tracking at SAP. KPI dashboard, Excel import/export, AI chat widget, full audit log. Modelled on real SAP ISP ERP workflows.',
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js', 'SAP ISP'],
    status: 'Live',
    color: 'border-cyan-500',
  },
  {
    emoji: '🔔',
    title: 'SNOW SLA Pipeline',
    subtitle: 'WhatsApp Automation',
    desc: 'Python daemons polling ServiceNow every 5 min — fires WhatsApp via Twilio 30 min before SLA breach. Zero manual checking.',
    tags: ['Python', 'ServiceNow', 'Twilio', 'REST API'],
    status: 'Live',
    color: 'border-green-500',
  },
  {
    emoji: '🌐',
    title: 'HiTecH AI HUB',
    subtitle: 'Personal Brand Website',
    desc: 'This site — Next.js 14, TypeScript, Tailwind CSS, live IT news ticker, AI neural network, blog, hire page. Deployed on Cloudflare Pages.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Cloudflare'],
    status: 'Live',
    color: 'border-purple-500',
  },
  {
    emoji: '🔗',
    title: 'SAP O365 MCP Server',
    subtitle: 'Claude AI ↔ M365 Bridge',
    desc: 'MCP server giving Claude AI direct access to SAP Outlook, Calendar, OneDrive, SharePoint via OAuth2 + Microsoft Graph API.',
    tags: ['Python', 'OAuth2', 'Graph API', 'MCP'],
    status: 'Live',
    color: 'border-orange-500',
  },
  {
    emoji: '📊',
    title: 'SNOW SLA Predictor',
    subtitle: 'Python ML Model',
    desc: 'ML model on real SAP ServiceNow ticket data predicting SLA breaches before they happen — scikit-learn Random Forest pipeline on 1,500+ tickets/year data.',
    tags: ['Python', 'scikit-learn', 'Pandas', 'ServiceNow API'],
    status: 'In Dev',
    color: 'border-yellow-500',
  },
  {
    emoji: '📊',
    title: 'SAP PowerBI IT Dashboard',
    subtitle: 'KPI & Analytics Automation',
    desc: 'PowerBI dashboards for IT KPIs, asset lifecycle, ticket SLAs, and onboarding stats. Integrated with SharePoint and SAP Work Zone for live data feeds.',
    tags: ['PowerBI', 'SharePoint', 'SAP Work Zone', 'SAP JAM'],
    status: 'Live',
    color: 'border-sky-500',
  },
  {
    emoji: '📱',
    title: 'SAP MENA Device Approval System',
    subtitle: 'Power Apps Automation',
    desc: 'Power Apps-based device approval workflow for MENA region — replacing manual email chains. Handled 200–300K SAR/month in device procurement approvals via SAP Ariba integration.',
    tags: ['Power Apps', 'SAP Ariba', 'SharePoint', 'Power Automate'],
    status: 'Live',
    color: 'border-indigo-500',
  },
]

const skillDomains = [
  {
    icon: Server,
    title: 'IT Service Delivery & ITSM',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    link: undefined,
    items: ['ServiceNow ITSM', 'ServiceNow CSM/FSM Workspace', 'IT Direct (BMC)', 'SLA & KPI Management (IRT/MPT)', 'ITIL v3', 'Incident Management', 'Problem Management (Preventive Measures)', 'Change Management', 'Asset Lifecycle (SAP ISP)', 'KB Creation & Templates', 'ServiceNow Walk-up Module', 'Walk-up Queue & Channel Management', 'HCSM AI Copilot (Daily Use)', 'Catalog Task Management', 'Interaction Management (Phone/Chat/Walk-up)'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Azure',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    link: undefined,
    items: ['Azure Security Engineer', 'Zero Trust Architecture', 'Intune MDM / Autopilot', 'MFA & Conditional Access', 'Microsoft Defender for M365', 'Trellix / McAfee / HIPS', 'Azure AD (Entra ID)', 'CCNA Security', 'Endpoint Compliance (SCCM)', 'Password Policy Enforcement', 'Password Generator (Python App)', 'Entropy-based Password Design', 'Passphrase Security Techniques'],
  },
  {
    icon: Globe,
    title: 'SAP & Enterprise Systems',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    link: undefined,
    items: ['SAP S/4HANA Admin', 'SAP Analytics Cloud', 'SAP BTP', 'SAP Ariba (Procurement)', 'SAP Build Apps', 'SAP Work Zone / JAM', 'SAP ISP (Asset ERP)', 'CLEA Lifecycle App', 'OTX Ordering App', 'SAP HANA ML'],
  },
  {
    icon: Cpu,
    title: 'M365 & Modern Workplace',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    link: undefined,
    items: ['Microsoft 365 Admin', 'Exchange Online', 'SharePoint / OneDrive', 'Teams Admin & MTR', 'M365 Copilot', 'SCCM / Configuration Mgr', 'JamF (macOS MDM)', 'Digital Signage (SVM / ITLC)', 'Evoko / Crestron / Poly Pano', 'PassVault / Secret Management'],
  },
  {
    icon: Brain,
    title: 'AI, Automation & Development',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    link: undefined,
    items: ['Agentic AI (Claude / ChatGPT / Copilot)', 'Python ML / MLOps', 'LLMs & Prompt Engineering', 'Power Apps / Power Automate', 'PowerBI & Data Dashboards', 'FastAPI / Flask / Next.js', 'REST APIs & MCP Servers', 'PowerShell & Scripting', 'SAP Build Low-Code', 'Tkinter GUI Development', 'PyInstaller App Packaging'],
  },
  {
    icon: Network,
    title: 'Infrastructure, Cloud & Networking',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    link: undefined,
    items: ['Azure / Hybrid Cloud (IaaS/PaaS)', 'Cisco Switches / Routers', 'Aruba Wireless / NAC Controllers', 'LAN / WAN / VPN', 'HP Servers', 'Windows / macOS / Linux', 'TCP/IP / DHCP / DNS', 'NAC Controllers', 'ISP / Intranet / Internet mgmt'],
  },
  {
    icon: Database,
    title: 'Procurement & Vendor Mgmt',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    items: ['SAP Ariba PR & PO System', 'IT Asset Procurement (MENA)', 'Vendor Coordination (Destiny, Beetra)', 'DocuSign (HR/IT Workflows)', 'IT Budget Management (~600K SAR/yr)', 'Office Renovation Projects (1.2M SAR)', 'Supply Chain IT Integration'],
    link: undefined,
  },
  {
    icon: Zap,
    title: 'Daily IT Operations',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    link: '/projects#daily-operations',
    items: ['IT Asset Lifecycle (1,500–2,000+ devices)', 'Email & Mailbox Administration', 'Endpoint Security & Compliance', 'macOS Fleet Management (Jamf)', 'Mobile MDM — iOS & Android', 'Windows Provisioning & Autopilot', 'M365 Cloud Collaboration Admin', 'Print Fleet & Meeting Room AV', 'User Provisioning & Offboarding', 'Network, VPN & 802.1X Support', 'ITLC Kiosk & Queue Monitor Setup'],
  },
]

const stats = [
  { value: '15+', label: 'Years in IT', color: 'text-accent-blue' },
  { value: '100+', label: 'Projects Delivered', color: 'text-cyan-400' },
  { value: '13+', label: 'Certifications', color: 'text-purple-400' },
  { value: '1M+', label: 'Community Followers', color: 'text-yellow-400' },
]

const contacts = [
  { icon: Phone,         label: '+966 505803073',        href: 'tel:+966505803073',                                          color: 'text-green-400',  bg: 'bg-green-500/10',  emoji: '📞' },
  { icon: MessageCircle, label: 'WhatsApp',               href: 'https://wa.me/966505803073',                                 color: 'text-emerald-400', bg: 'bg-emerald-500/10', emoji: '💬' },
  { icon: Mail,          label: 'waqastayyab2004@gmail.com', href: 'mailto:waqastayyab2004@gmail.com',                       color: 'text-red-400',    bg: 'bg-red-500/10',    emoji: '✉️' },
  { icon: Linkedin,      label: 'syedwaqastayyab',        href: 'https://www.linkedin.com/in/syedwaqastayyab/',              color: 'text-blue-400',   bg: 'bg-blue-500/10',   emoji: '🔗' },
  { icon: Facebook,      label: 'HiTech Technology HUB',  href: 'https://www.facebook.com/profile.php?id=61551726961739',    color: 'text-indigo-400', bg: 'bg-indigo-500/10', emoji: '👍' },
]

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(0)
  const [showAllCerts, setShowAllCerts] = useState(false)

  const displayedCerts = showAllCerts ? certifications : certifications.slice(0, 6)

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* ── HERO — full-bleed photo with dark overlay ─────────────── */}
      <section className="relative overflow-hidden pt-16">

        {/* Subtle dark background with glow — no photo here, photo is on the right */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-900" />
          <div className="absolute right-0 top-0 w-[700px] h-full"
            style={{ background: 'linear-gradient(to left, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
          <div className="absolute right-1/4 top-1/3 w-96 h-96 rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* Content — sits above background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-12">

            {/* MOBILE ONLY — photo centred above text */}
            <div className="flex lg:hidden justify-center mb-2">
              <div className="relative w-44 h-44">
                <div className="absolute inset-0 rounded-full p-[3px] animate-spin"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)', animationDuration: '8s' }}>
                  <div className="w-full h-full rounded-full bg-dark-900" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/waqas-pro.jpg" alt="Syed Waqas Tayyab"
                  className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top"
                  style={{ boxShadow: '0 0 30px rgba(59,130,246,0.4)' }} />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap z-20"
                  style={{ background: 'rgba(8,14,24,0.95)', border: '1px solid rgba(59,130,246,0.5)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span className="text-white text-[10px] font-semibold">Available for Projects</span>
                </div>
              </div>
            </div>

            {/* LEFT — text */}
            <div className="flex flex-col justify-center">
              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit mb-6"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.30)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-accent-blue text-xs font-semibold">Open to Work · MENA + Remote</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 whitespace-nowrap">
                Syed <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-400 to-purple-400">Waqas Tayyab</span>
              </h1>

              <p className="text-xl text-accent-blue font-bold mb-2">
                Senior IT System Engineer · IT Service Delivery Lead
              </p>
              <p className="text-sm text-cyan-400 font-medium mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Riyadh, Saudi Arabia · SAP · 15+ Years IT
              </p>

              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
                AI, ML, Agentic AI, Cyber &amp; Cloud expert with 15+ years and 100+ projects at SAP.
                Azure Security Certified. MBA graduate. Building automation systems that save hours daily.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-8 max-w-lg">
                {stats.map((s) => (
                  <div key={s.label} className="p-3 text-center rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-gray-400 text-[10px] leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Available for Senior Roles
                </Link>
                <a href="/Waqas-Syed-CV.pdf" download="Waqas-Syed-CV.pdf"
                  className="btn-outline px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 border-green-500/40 text-green-400 hover:bg-green-500/10">
                  <Download className="w-4 h-4" /> Download CV
                </a>
                <Link href="/contact" className="btn-outline px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
                <a href="https://www.linkedin.com/in/syedwaqastayyab/"
                  target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', color: '#d1d5db' }}>
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            {/* RIGHT — your photo, clearly visible */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Glow ring behind photo */}
              <div className="absolute w-[380px] h-[380px] rounded-full blur-[60px]"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)' }} />

              {/* Photo card */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Rotating border ring */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                  {/* Animated gradient ring */}
                  <div className="absolute inset-0 rounded-full p-[3px] animate-spin"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)', animationDuration: '8s' }}>
                    <div className="w-full h-full rounded-full bg-dark-900" />
                  </div>
                  {/* Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/waqas-pro.jpg"
                    alt="Syed Waqas Tayyab"
                    className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top"
                    style={{ boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
                  />
                  {/* Available badge on photo */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap z-20"
                    style={{ background: 'rgba(8,14,24,0.95)', border: '1px solid rgba(59,130,246,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-white text-xs font-semibold">Available for Projects</span>
                  </div>
                </div>

                {/* Floating tech tags around the photo */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xs">
                  {[
                    { label: '☁️ Azure Security', text: '#93c5fd', border: 'rgba(59,130,246,0.4)', bg: 'rgba(59,130,246,0.12)' },
                    { label: '🟠 SAP S/4HANA',   text: '#fdba74', border: 'rgba(249,115,22,0.4)',  bg: 'rgba(249,115,22,0.12)' },
                    { label: '🤖 AI / ML',        text: '#c4b5fd', border: 'rgba(139,92,246,0.4)', bg: 'rgba(139,92,246,0.12)' },
                    { label: '🎫 ServiceNow',     text: '#86efac', border: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.12)'  },
                    { label: '💼 M365 Admin',     text: '#a5b4fc', border: 'rgba(99,102,241,0.4)', bg: 'rgba(99,102,241,0.12)' },
                    { label: '🐍 Python',         text: '#fde68a', border: 'rgba(234,179,8,0.4)',  bg: 'rgba(234,179,8,0.12)'  },
                  ].map((t) => (
                    <div key={t.label}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm"
                      style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text }}>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #080e18)' }} />
        {/* Thin accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)' }} />
      </section>

      {/* ── QUICK CONTACT BAR ──────────────────────────────────────── */}
      <section className="bg-dark-800/50 border-b border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">

            {/* Phone */}
            <a href="tel:+966505803073"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-500/10 border border-green-500/25 text-green-400 hover:bg-green-500/20 transition-all">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              <span>+966 505 803 073</span>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>WhatsApp</span>
            </a>

            {/* Email */}
            <a href="mailto:waqastayyab2004@gmail.com"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 transition-all">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <span className="hidden sm:inline">waqastayyab2004@gmail.com</span>
              <span className="sm:hidden">Gmail</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-all">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span>LinkedIn</span>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61551726961739" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 hover:bg-indigo-500/20 transition-all">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </a>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── ABOUT ME ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Users className="w-5 h-5 text-accent-blue" />} title="About Me" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-7">
              <p className="text-gray-300 leading-relaxed mb-4">
                I&apos;m <span className="text-white font-semibold">Syed Waqas Tayyab</span>, a Senior IT System Engineer and IT Service Delivery Lead at <span className="text-accent-blue font-semibold">SAP Saudi Arabia</span> with over 15 years in corporate IT. I specialise in enterprise IT operations, AI automation, Azure security, SAP systems, and Microsoft 365.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                I hold an <span className="text-white font-semibold">MBA from Buckinghamshire New University, UK</span> and a <span className="text-white font-semibold">BSc IT from University of Greenwich, UK</span>, plus 13 professional certifications including Azure Security Engineer and SAP Python ML.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My mission: bridge the gap between corporate IT and modern AI — training teams to adopt tools like Copilot, Claude, and Gemini, and building automation systems that save hours of manual work every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['English (Fluent)', 'Arabic (Fluent)', 'Riyadh, KSA', 'MENA + Remote', 'Open to Work', 'Iqama: Transferable'].map((t) => (
                  <span key={t} className="tag text-xs py-1 px-3">{t}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col gap-5">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-pink-500/8 border border-pink-500/20">
                    <div className="text-white text-sm font-semibold">MBA (iMBA)</div>
                    <div className="text-pink-400 text-xs">Buckinghamshire New Univ · UK · 2023</div>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-500/8 border border-indigo-500/20">
                    <div className="text-white text-sm font-semibold">BSc Information Technology</div>
                    <div className="text-indigo-400 text-xs">University of Greenwich · UK · 2010</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Social Reach
                </div>
                <div className="space-y-2">
                  {[
                    { label: '1M+ Followers', sub: 'Across all platforms', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { label: '500+ LinkedIn', sub: 'syedwaqastayyab', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: '100K+ Monthly', sub: 'Tech content views', color: 'text-green-400', bg: 'bg-green-500/10' },
                  ].map((s) => (
                    <div key={s.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${s.bg}`}>
                      <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
                      <span className="text-gray-500 text-xs">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DAILY IT OPERATIONS SHOWCASE ─────────────────────────── */}
        <section>
          <SectionHeader icon={<Zap className="w-5 h-5 text-cyan-400" />} title="Daily IT Operations" />

          {/* Hero banner */}
          <div className="relative rounded-2xl overflow-hidden mb-6 border border-cyan-500/25"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(8,14,24,0.95) 50%, rgba(37,99,235,0.06) 100%)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[80px]" style={{ background: 'rgba(6,182,212,0.12)' }} />
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-[60px]" style={{ background: 'rgba(37,99,235,0.10)' }} />
            </div>
            <div className="relative z-10 p-7 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-cyan-500/30"
                  style={{ background: 'rgba(6,182,212,0.15)' }}>⚙️</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full">Live Daily · Enterprise IT</span>
                    <span className="text-xs text-gray-500 font-mono">200+ users · 3 offices · Riyadh KSA</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">What I Do Every Day at Work</h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                    Across 10 technical domains — from MDM and endpoint security to M365 administration,
                    network ops, and meeting room AV — I keep enterprise IT running for 200+ users
                    across 3 offices. Click any card below to read the full scope, SLAs, tools, and outcomes.
                  </p>
                </div>
                <Link href="/projects"
                  className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm border-2 transition-all hover:scale-105"
                  style={{ background: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.5)', color: '#67e8f9' }}>
                  My Projects →
                </Link>
              </div>

              {/* 10 task area cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { icon: '📦', title: 'IT Asset Lifecycle',     desc: '1,500–2,000+ devices · procurement to disposal',  color: '#f97316' },
                  { icon: '📧', title: 'Email & Identity',       desc: 'Exchange Online · MFA · mailbox governance',       color: '#3b82f6' },
                  { icon: '🛡️', title: 'Endpoint Security',      desc: 'Intune · Defender · BitLocker · CyberArk',         color: '#ef4444' },
                  { icon: '🍎', title: 'macOS Fleet (Jamf)',      desc: 'FileVault · SSO certs · Self Service apps',        color: '#a3a3a3' },
                  { icon: '📱', title: 'Mobile MDM',             desc: 'iOS/Android · ADE · Intune · compliance',          color: '#8b5cf6' },
                  { icon: '💻', title: 'Windows Provisioning',   desc: 'Autopilot · SCCM · Day 1 ready in 45 min',        color: '#06b6d4' },
                  { icon: '☁️', title: 'M365 Cloud Admin',       desc: 'Teams · SharePoint · OneDrive · 200+ users',      color: '#0ea5e9' },
                  { icon: '🖨️', title: 'Print & Meeting AV',     desc: 'HP MFP fleet · Teams Rooms · Crestron · AV',      color: '#f59e0b' },
                  { icon: '🔐', title: 'User Provisioning',      desc: 'Azure AD · onboarding · Day 1 in 30 min',         color: '#10b981' },
                  { icon: '🌐', title: 'Network & VPN',          desc: 'Cisco · Aruba · 802.1X · GlobalProtect',          color: '#6366f1' },
                ].map((task) => (
                  <Link key={task.title} href="/projects"
                    className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: `${task.color}08`, borderColor: `${task.color}25` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${task.color}55` }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${task.color}25` }}>
                    <span className="text-2xl">{task.icon}</span>
                    <div>
                      <p className="text-white font-bold text-xs leading-snug mb-1">{task.title}</p>
                      <p className="text-gray-500 text-[10px] leading-snug">{task.desc}</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: task.color }}>
                      My Projects →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS — Neural Brain Network ────────────────────────── */}
        <section>
          <SectionHeader icon={<Brain className="w-5 h-5 text-purple-400" />} title="Skills Neural Network" />
          <NeuralNetwork />
        </section>

        {/* ── SKILL DOMAINS GRID ───────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Cpu className="w-5 h-5 text-cyan-400" />} title="Skill Domains" />

          {/* Daily IT Operations highlight banner */}
          <Link href="/projects#daily-operations"
            className="block mb-6 p-5 rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent hover:border-cyan-400/60 hover:from-cyan-500/15 transition-all group">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-3xl flex-shrink-0">⚙️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded-full">Daily IT Operations</span>
                    <span className="text-xs text-gray-500">10 Technical Areas · 200+ Users</span>
                  </div>
                  <h3 className="text-white font-black text-lg">See My Daily Skillset in Action</h3>
                  <p className="text-gray-400 text-sm mt-0.5">Asset lifecycle · MDM · Endpoint security · M365 admin · Network · AV · Provisioning</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-sm group-hover:bg-cyan-500/30 transition-all flex-shrink-0">
                View 10 Project Cards <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillDomains.map((domain) => {
              const Icon = domain.icon
              const card = (
                <div className={`glass-card p-6 flex flex-col gap-4 h-full transition-all duration-200 hover:-translate-y-1 ${domain.link ? 'cursor-pointer hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${domain.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${domain.color}`} />
                      </div>
                      <h3 className="text-white text-base font-bold">{domain.title}</h3>
                    </div>
                    {domain.link && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${domain.bg} ${domain.color} border-current/30 flex-shrink-0`}>
                        View →
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {domain.items.map((item) => (
                      <span key={item} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
              )
              return domain.link
                ? <Link key={domain.title} href={domain.link}>{card}</Link>
                : <div key={domain.title}>{card}</div>
            })}
          </div>
        </section>

        {/* ── TOP SKILLS PROGRESS BARS ─────────────────────────────── */}
        <section>
          <SectionHeader icon={<Star className="w-5 h-5 text-yellow-400" />} title="Top Skills" />
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
              {[
                { skill: 'IT Service Delivery',       pct: 99, color: '#06b6d4' },
                { skill: 'IT Infrastructure',          pct: 98, color: '#06b6d4' },
                { skill: 'ServiceNow ITSM',            pct: 97, color: '#3b82f6' },
                { skill: 'IT Consulting & Advisory',   pct: 96, color: '#8b5cf6' },
                { skill: 'SAP Operations',             pct: 96, color: '#f97316' },
                { skill: 'Office Technology (AV/MTR)', pct: 95, color: '#10b981' },
                { skill: 'M365 Administration',        pct: 94, color: '#3b82f6' },
                { skill: 'Cybersecurity',              pct: 91, color: '#ef4444' },
                { skill: 'Cloud Computing',            pct: 89, color: '#0ea5e9' },
                { skill: 'AI & Automation',            pct: 88, color: '#f59e0b' },
                { skill: 'Python & FastAPI',           pct: 82, color: '#10b981' },
                { skill: 'IT Asset Management',        pct: 99, color: '#06b6d4' },
              ].map(({ skill, pct, color }) => (
                <div key={skill} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-200">{skill}</span>
                    <span className="text-sm font-black" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOB & FREELANCER TARGETS ─────────────────────────────── */}
        <section>
          <SectionHeader icon={<TrendingUp className="w-5 h-5 text-green-400" />} title="Career & Freelance Targets" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Full-Time Roles */}
            <div className="glass-card p-6 border-t-2 border-blue-500/50">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm">Full-Time Roles</h3>
                  <p className="text-gray-500 text-[10px]">Senior enterprise positions — MENA + Remote</p>
                </div>
                <span className="ml-auto text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 flex-shrink-0">Open to Work</span>
              </div>
              <div className="space-y-3">
                {[
                  { role: 'Senior IT Service Delivery Manager', focus: 'IT Operations Lead · Large multinationals KSA/UAE', priority: '★ Top Target', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25' },
                  { role: 'IT Infrastructure & Workplace Tech Consultant', focus: 'AV · Smart Office · Vision 2030 build-outs', priority: 'High Value', color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
                  { role: 'ServiceNow Platform Administrator', focus: 'ITSM Specialist · CSM/FSM · HCSM AI Copilot', priority: 'Premium Pay', color: 'text-purple-400 bg-purple-500/10 border-purple-500/25' },
                  { role: 'Enterprise AI Automation Engineer', focus: 'Python + LLMs + Enterprise APIs · 12 months target', priority: 'Future Focus', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' },
                ].map(t => (
                  <div key={t.role} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold leading-snug mb-0.5">{t.role}</p>
                      <p className="text-gray-500 text-xs">{t.focus}</p>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border flex-shrink-0 ${t.color}`}>{t.priority}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Freelance Projects */}
            <div className="glass-card p-6 border-t-2 border-purple-500/50">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm">Freelance / Consulting</h3>
                  <p className="text-gray-500 text-[10px]">Project-based · Remote + Onsite MENA</p>
                </div>
                <span className="ml-auto text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 flex-shrink-0">Available</span>
              </div>
              <div className="space-y-3">
                {[
                  { service: 'Office Build-Out IT & AV Consulting', detail: 'Design → Procure → Install → Handover · 4–12 weeks', rate: '500–1,500 SAR/day', color: 'text-green-400 bg-green-500/10 border-green-500/25' },
                  { service: 'ServiceNow Implementation & Config', detail: 'SLA design · Auto-routing · KB architecture', rate: '800–2,000 SAR/day', color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
                  { service: 'Azure Security & M365 Deployment', detail: 'Zero Trust · Conditional Access · Intune/Autopilot', rate: '600–1,500 SAR/day', color: 'text-red-400 bg-red-500/10 border-red-500/25' },
                  { service: 'IT Asset Management Setup (ITAM)', detail: 'Excel → Proper ITAM · Procurement workflow · Audit trail', rate: '400–800 SAR/day', color: 'text-orange-400 bg-orange-500/10 border-orange-500/25' },
                  { service: 'Smart Locker / IT Pickup Point Consulting', detail: 'Signifi deployment · MENA niche expertise · Premium', rate: 'Custom rate', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' },
                ].map(t => (
                  <div key={t.service} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold leading-snug mb-0.5">{t.service}</p>
                      <p className="text-gray-500 text-xs">{t.detail}</p>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border flex-shrink-0 ${t.color} whitespace-nowrap`}>{t.rate}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/6">
                <Link href="/contact" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-sm font-bold hover:bg-purple-500/25 transition-all">
                  Discuss a Project →
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Briefcase className="w-5 h-5 text-cyan-400" />} title="Work Experience" />
          <div className="space-y-4">
            {experience.map((job, i) => (
              <div key={job.role} className={`glass-card border-l-4 ${job.color} overflow-hidden`}>
                <button
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-white/2 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-base">{job.role}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`font-semibold ${job.badge}`}>{job.company}</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{job.location}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{job.period}
                      </span>
                    </div>
                  </div>
                  {expandedJob === i
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
                </button>
                {expandedJob === i && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-2 mb-4">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="tag text-xs py-1 px-2">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Code className="w-5 h-5 text-green-400" />} title="Projects I've Built" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.title} className={`glass-card border-l-4 ${p.color} p-5 hover:-translate-y-0.5 transition-all duration-200`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{p.emoji}</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${p.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-0.5">{p.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{p.subtitle}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="tag text-[10px] py-0.5 px-2">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/projects" className="btn-outline px-6 py-2.5 text-sm inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Full Project Details
            </Link>
          </div>
        </section>

        {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
        <section>
          <SectionHeader icon={<Award className="w-5 h-5 text-yellow-400" />} title="Certifications & Education" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedCerts.map((c) => (
              <div key={c.name} className={`glass-card p-4 border ${c.border} flex items-start gap-3`}>
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <Award className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold leading-snug">{c.name}</div>
                  <div className={`text-xs font-medium mt-0.5 ${c.color}`}>{c.issuer} · {c.year}</div>
                </div>
              </div>
            ))}
          </div>
          {certifications.length > 6 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="btn-outline px-5 py-2 text-sm inline-flex items-center gap-2"
              >
                {showAllCerts ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {certifications.length} Certs</>}
              </button>
            </div>
          )}
        </section>

        {/* ── DAILY OPERATIONS CTA ──────────────────────────────────── */}
        <section>
          <div className="glass-card p-8 md:p-10 relative overflow-hidden border border-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/6 via-transparent to-accent-blue/6 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <Server className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  ⚙️ Daily Operations · 10 Technical Areas
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  See My Daily IT Skillset in Action
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                  10 detailed project cards covering every technical area I manage daily — asset lifecycle, MDM, endpoint security, M365, network ops, meeting room AV and more. Each card includes SLAs, outcomes, and full tech stack.
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {['Jamf MDM', 'Intune/Autopilot', 'Azure AD', 'Exchange Online', 'Defender', 'Cisco/Aruba', 'Teams Rooms', 'BitLocker', 'ServiceNow', 'Power BI'].map(tag => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2">
                <Link
                  href="/projects#daily-operations"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-all whitespace-nowrap"
                >
                  ⚙️ View 10 Daily Ops Cards
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-semibold text-xs bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  <ExternalLink className="w-3 h-3" /> All 34 Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── HIRE CTA ─────────────────────────────────────────────── */}
        <section>
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-purple-500/8 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-accent-blue" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Let&apos;s Work Together
              </h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto mb-7">
                15+ years of IT expertise + AI/ML skills. Available for IT Service Delivery, AI Automation, Azure Security, SAP, M365, and Web App projects — MENA and remote.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/hire" className="btn-primary px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> View Services & Pricing
                </Link>
                <a href="mailto:waqastayyab2004@gmail.com" className="btn-outline px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-lg text-sm font-semibold bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

/* ─── Section Header helper ────────────────────────────────────────── */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-dark-700 border border-white/8 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  )
}
