import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Briefcase, MapPin, CheckCircle, Star, Zap, Shield, Cloud,
  Brain, Server, Mail, Linkedin, ArrowRight, Phone, MessageCircle,
  Code, Network, Monitor, Database, Globe, Users, Award,
  GraduationCap, Calendar, Building2, Cpu,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Hire Me — Syed Waqas Tayyab | IT Consultant & AI Engineer',
  description:
    'IT Consultant and Corporate IT Expert with 15+ years and 100+ projects. Azure Security Certified. MBA. Expert in IT Infrastructure, Operations, Service Delivery, Office Technology, AI Engineering, SAP, ServiceNow & M365. Open to roles across MENA and globally.',
  keywords: [
    'IT Consultant Saudi Arabia', 'Corporate IT Expert MENA', 'IT Infrastructure Consultant Riyadh',
    'IT Service Delivery Lead', 'Office Technology Expert', 'AI Engineer SAP',
    'Senior IT System Engineer Saudi Arabia', 'Azure Security Engineer MENA',
    'ServiceNow Expert KSA', 'IT Manager Saudi Arabia', 'Hire IT Expert Riyadh',
    'SAP S4HANA Admin', 'Cybersecurity Engineer KSA', 'MLOps SAP HANA',
    'M365 Admin MENA', 'Syed Waqas Tayyab',
  ],
}

/* ─────────── DATA ─────────── */

const experiences = [
  {
    role: 'Senior IT System Engineer',
    company: 'SAP',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jul 2019 – Present',
    duration: '5 yrs 1 mo',
    type: 'Full-time · On-site',
    color: 'border-accent-blue',
    badge: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    points: [
      'Proactive monitoring and intervention across all network layers for enterprise IT field service availability',
      'Secure lifecycle management of IT assets — storage, movement, disposal, and procurement via SAP Ariba (MENA region)',
      'Full ServiceNow (SNOW) ticket lifecycle — prioritization, escalation, resolution, closure aligned to SLAs & KPIs',
      'End-to-end onboarding/offboarding — access provisioning and deprovisioning per corporate policy',
      'Managed IT arrangements for C-level meetings, global training sessions and SAP events',
      'Recommended and implemented new technologies, verifying stability and functionality during upgrades',
      'Supported Modern Workplace: SVM, ITPP, Digital Signage, and internal content management platforms',
      'L2/L3 technical support with advanced troubleshooting for internal and external users',
      'Built AI-powered tools: IT Asset Manager, SNOW automation pipelines, WhatsApp SLA alert system',
      'Developed FastAPI + Next.js dashboards replacing manual Excel-based IT workflows',
    ],
  },
  {
    role: 'IT Support Specialist',
    company: 'SAP',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jul 2015 – Jul 2019',
    duration: '4 yrs 1 mo',
    type: 'Full-time · On-site',
    color: 'border-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    points: [
      'IT SPOC for SAP Saudi Arabia — Riyadh, Jeddah, and AlKhobar — part of the Global IT EMEA team',
      'Supported and maintained IT infrastructure: HP servers, Cisco switches/routers, LAN/WAN, NAC controllers',
      'ISP/intranet/internet connectivity and MS Teams/Skype/Lync gateway management',
      'Delivered end-user training and awareness sessions for SAP cloud-based technologies',
      'Managed Cisco and Aruba wireless systems, SVRS, Office 365, Logitech and Evoko meeting room devices',
      'Mass deployment of Windows, macOS, and Linux operating systems across the organization',
    ],
  },
  {
    role: 'System Security Officer',
    company: 'Banque Saudi Fransi',
    location: 'Riyadh, Saudi Arabia',
    period: 'Nov 2012 – Jan 2015',
    duration: '2 yrs 3 mos',
    type: 'Full-time · On-site',
    color: 'border-red-500',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    points: [
      'Managed ATM and branch physical security systems for continuous protection of critical banking infrastructure',
      'Administered access control systems (G4S MultiMax) — user privileges, access rights, card issuance/deactivation',
      'Monitored site health, alarms, and security alerts using Siecep ATM security management tools',
      'Investigated security incidents and retrieved CCTV recordings for management reviews',
      'Regular testing and validation of CCTV, IoT sensors, burglar alarms, and fire alarm systems',
      '24/7 security operations support — BMC Remedy for incident tracking, escalation, and resolution',
      'Worked with Siecep, Vanguard, MultiMax, BMS banking security platforms',
    ],
  },
  {
    role: 'Network Administrator',
    company: 'TSBS (Tariq Saleem Business & IT Solutions)',
    location: 'Riyadh, Saudi Arabia',
    period: 'Feb 2011 – Aug 2013',
    duration: '2 yrs 7 mos',
    type: 'Full-time · On-site',
    color: 'border-green-500',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    points: [
      'Maintained company IT network, servers, and security systems',
      'Investigated and diagnosed network problems, collected IT usage statistics',
      'Physical security controls for server rooms, network closets, and storage areas',
      'Monitored CCTV coverage and access logs for data center and IT storage areas',
      'Coordinated with facilities and security teams on locking, surveillance, and alarm systems',
    ],
  },
]

const certifications = [
  { name: 'Developing AI Models with Python ML Client for SAP HANA', issuer: 'SAP', year: 'May 2026', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hot: true },
  { name: 'AI-Driven Project Manager: 10X Productivity with Generative AI', issuer: 'QAS', year: 'Dec 2025', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', hot: true },
  { name: 'Microsoft Certified: Azure Security Engineer Associate', issuer: 'Microsoft', year: 'Jul 2024', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hot: false },
  { name: 'Artificial Intelligence and Application Security', issuer: 'LinkedIn', year: 'Oct 2024', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', hot: false },
  { name: 'Prepare for Azure Fundamentals (AZ-900)', issuer: 'LinkedIn / Microsoft Press', year: 'Jan 2024', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', hot: false },
  { name: 'Microsoft 365 Copilot First Look', issuer: 'LinkedIn', year: 'Oct 2023', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', hot: false },
  { name: 'SAP Certified Application Associate — SAP Analytics Cloud', issuer: 'SAP', year: 'Jan 2023', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hot: false },
  { name: 'Compose and Automate with SAP Build (No-Code)', issuer: 'SAP', year: 'Mar 2023', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hot: false },
  { name: 'SAP Certified Technology Consultant — SAP S/4HANA Admin', issuer: 'SAP', year: 'Mar 2022', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hot: false },
  { name: 'Discovering SAP Generative AI Hub (AIG02)', issuer: 'SAP', year: 'Jul 2026', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', hot: true },
  { name: 'PMP Training — 35 PDUs', issuer: 'Project Management Institute', year: 'Feb 2017', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', hot: false },
  { name: 'ITIL v3 Foundation', issuer: 'AXELOS', year: 'Jan 2017', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', hot: false },
  { name: 'CCNA Security', issuer: 'Cisco', year: 'Sep 2013', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', hot: false },
]

const skillGroups = [
  {
    category: 'Service Delivery & Consulting',
    icon: Briefcase, color: 'text-accent-blue', bg: 'bg-accent-blue/10',
    items: ['IT Service Delivery Management', 'SLA & KPI Ownership', 'ITIL v3 Foundation', 'PMP (35 PDUs)', 'ServiceNow ITSM', 'Incident & Problem Management', 'Vendor & 3rd-Party Management', 'Service Improvement Plans', 'IT Consulting & Advisory', 'Business Requirement Analysis', 'Executive Communication', 'IT Policy & Procedure Development'],
  },
  {
    category: 'AI, ML & Automation',
    icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10',
    items: ['Python ML / SAP HANA AI', 'Agentic AI', 'LLMs & Prompt Engineering', 'Claude AI', 'MLOps', 'AI-Driven Project Management', 'n8n / Make.com', 'FastAPI Agents'],
  },
  {
    category: 'Cloud & Azure',
    icon: Cloud, color: 'text-blue-400', bg: 'bg-blue-500/10',
    items: ['Azure Security Engineer', 'Azure AD / Entra ID', 'Azure Fundamentals (AZ-900)', 'SAP BTP', 'Hybrid Cloud', 'IaaS / PaaS', 'Azure DevOps'],
  },
  {
    category: 'Cybersecurity',
    icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10',
    items: ['Azure Security', 'Zero Trust Architecture', 'Endpoint & Identity Mgmt', 'MFA / Conditional Access', 'Intune MDM', 'Defender for M365', 'CCTV & Physical Security', 'Access Control (G4S MultiMax)'],
  },
  {
    category: 'SAP & ServiceNow',
    icon: Server, color: 'text-orange-400', bg: 'bg-orange-500/10',
    items: ['SAP S/4HANA Admin', 'SAP Analytics Cloud', 'SAP Build (No-Code)', 'SAP Ariba', 'SAP BTP APIs', 'ServiceNow ITSM', 'SNOW KB Management', 'SLA & KPI Management'],
  },
  {
    category: 'Microsoft 365',
    icon: Monitor, color: 'text-indigo-400', bg: 'bg-indigo-500/10',
    items: ['Exchange Online', 'SharePoint Admin', 'Teams Administration', 'OneDrive', 'M365 Copilot', 'Intune', 'Compliance Center', 'Power Automate'],
  },
  {
    category: 'Infrastructure & Networking',
    icon: Network, color: 'text-cyan-400', bg: 'bg-cyan-500/10',
    items: ['CCNA Security', 'Cisco / Aruba Wireless', 'HP Servers', 'LAN / WAN', 'NAC Controllers', 'Windows / macOS / Linux', 'OS Mass Deployment', 'Server Room Management'],
  },
  {
    category: 'Development',
    icon: Code, color: 'text-green-400', bg: 'bg-green-500/10',
    items: ['Python', 'FastAPI', 'Flask', 'Next.js', 'TypeScript', 'REST APIs', 'PowerShell', 'SQLite'],
  },
  {
    category: 'Leadership & Management',
    icon: Users, color: 'text-yellow-400', bg: 'bg-yellow-500/10',
    items: ['IT Operations Management', 'Team Leadership', 'MBA — International Business', 'Change Management', 'Stakeholder Management', 'Technical Presentations & Reports', 'Training & Mentoring', 'Knowledge Base Development'],
  },
]

const services = [
  {
    icon: Brain,
    title: 'AI Engineer & ML Solutions',
    desc: 'End-to-end AI engineering using Python, Claude AI, SAP HANA ML, and Agentic AI frameworks. Build ML models, LLM pipelines, AI-driven automation, ticket monitors, SLA breach predictors, email agents, and WhatsApp alert systems. Currently building SAP HANA Python ML models.',
    tags: ['Python ML', 'Claude AI', 'SAP HANA AI', 'Agentic AI', 'FastAPI'],
    price: 'From $500',
    color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
    hot: true,
  },
  {
    icon: Network,
    title: 'IT Infrastructure Consultant',
    desc: '11+ years designing, supporting and optimising enterprise IT infrastructure at SAP — HP servers, Cisco/Aruba networking, LAN/WAN, NAC controllers, OS mass deployments (Windows/macOS/Linux), and server room management. Trusted infrastructure advisor for MENA enterprises.',
    tags: ['Cisco / Aruba', 'HP Servers', 'LAN / WAN', 'NAC', 'Windows / Linux'],
    price: 'From $600',
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
    hot: true,
  },
  {
    icon: Monitor,
    title: 'Office Technology Expert',
    desc: 'Full lifecycle Microsoft 365 and Modern Workplace setup — Exchange Online, Teams, SharePoint, OneDrive, M365 Copilot, Digital Signage (SVM/ITPP), Logitech & Evoko meeting room devices, Skype/Lync gateways, and end-user adoption programmes. 11 years at SAP delivering this daily.',
    tags: ['Microsoft 365', 'Teams', 'SharePoint', 'Digital Signage', 'M365 Copilot'],
    price: 'From $400',
    color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20',
    hot: true,
  },
  {
    icon: Globe,
    title: 'Web App & Dashboard Development',
    desc: 'Custom IT dashboards, asset management systems, and ITSM tools built with FastAPI + Next.js. Replace Excel spreadsheets with real web applications — proven with IT Asset Manager built at SAP.',
    tags: ['Next.js', 'FastAPI', 'TypeScript', 'SQLite', 'Python'],
    price: 'From $800',
    color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20',
    hot: false,
  },
  {
    icon: Server,
    title: 'SAP & ServiceNow Integration',
    desc: 'Connect SAP BTP, ServiceNow, and M365 via API-first architecture. Custom ITSM workflows, OData queries, SAP Ariba procurement automation, SNOW ticket lifecycle management, and SLA/KPI dashboards.',
    tags: ['SAP BTP', 'ServiceNow', 'SAP Ariba', 'OData', 'OAuth2'],
    price: 'From $1,000',
    color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20',
    hot: false,
  },
  {
    icon: Shield,
    title: 'Azure Security & Zero Trust',
    desc: 'Azure Security Engineer Associate certified. Zero Trust architecture, Intune MDM, MFA rollout, Conditional Access policies, Defender for M365, endpoint security, and identity governance for enterprise environments.',
    tags: ['Azure Security', 'Intune', 'Zero Trust', 'MFA', 'Defender'],
    price: 'From $600',
    color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
    hot: false,
  },
  {
    icon: Briefcase,
    title: 'IT Service Delivery Management',
    desc: 'Design and implement ITIL-aligned service delivery frameworks — SLA/KPI ownership, incident & problem management, escalation procedures, vendor management, service improvement plans, and SNOW knowledge base development.',
    tags: ['ITIL v3', 'ServiceNow', 'SLA / KPI', 'Incident Mgmt', 'Vendor Mgmt'],
    price: 'From $500',
    color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20',
    hot: false,
  },
  {
    icon: Cloud,
    title: 'Cloud & M365 Advisory',
    desc: 'Azure architecture review, M365 tenant setup and optimisation, hybrid cloud migration planning, SAP BTP integration strategy. SMB and enterprise advisory with hands-on implementation support.',
    tags: ['Azure', 'M365', 'Hybrid Cloud', 'SAP BTP', 'Architecture'],
    price: 'From $400',
    color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
    hot: false,
  },
  {
    icon: Users,
    title: 'IT Leadership & AI Training',
    desc: 'Workshops and coaching on AI adoption, automation tooling, Azure Security, and M365 Modern Workplace. Delivered end-user training at SAP Saudi Arabia across Riyadh, Jeddah, and AlKhobar locations.',
    tags: ['Training', 'AI Adoption', 'Workshops', 'M365', 'Azure'],
    price: 'On Request',
    color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20',
    hot: false,
  },
]

const openTo = [
  {
    role: 'IT Service Delivery Lead',
    desc: '11+ years owning SLA/KPI delivery at SAP enterprise. Expert in ITIL v3, ServiceNow ITSM, vendor management, escalation frameworks and service improvement plans across MENA.',
    icon: Briefcase, color: 'text-accent-blue', bg: 'bg-accent-blue/10', urgent: true,
  },
  {
    role: 'IT Consultant',
    desc: 'Advisory-level consulting on IT infrastructure, Azure security, SAP operations, M365 transformation, and AI automation strategy for enterprises and SMBs.',
    icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10', urgent: true,
  },
  {
    role: 'SAP ML Engineer',
    desc: 'Combining 11+ years SAP enterprise experience with fresh ML/AI certifications (SAP HANA Python ML, AIG02). Ready to deliver from day one.',
    icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', urgent: false,
  },
  {
    role: 'IT Manager / Team Lead',
    desc: 'Senior leadership managing IT teams across infrastructure, cloud, security and AI. MBA + 11 years SAP + ITIL + PMP background.',
    icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', urgent: false,
  },
  {
    role: 'AI & Automation Consultant',
    desc: 'Advisory and project delivery helping enterprises implement AI automation. Proven with real tools already deployed at SAP.',
    icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', urgent: false,
  },
  {
    role: 'Freelance Projects',
    desc: 'Short or long-term projects: AI automation scripts, web apps, SAP/ServiceNow integrations, Azure security assessments.',
    icon: Code, color: 'text-green-400', bg: 'bg-green-500/10', urgent: false,
  },
]

const stats = [
  { value: '15+', label: 'Years IT Experience' },
  { value: '100+', label: 'Projects & Implementations' },
  { value: '13', label: 'Certifications' },
  { value: 'MBA', label: 'Buckinghamshire Uni UK' },
  { value: 'Azure', label: 'Security Certified' },
  { value: 'EN+AR', label: 'Fluent Languages' },
]

/* ─────────── PAGE ─────────── */
export default function HirePage() {
  return (
    <div className="pt-24 pb-20">

      {/* ── HERO ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/8 via-transparent to-transparent pointer-events-none" />
        <ScrollReveal className="text-center">

          {/* Status badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-green-500/10 border border-green-500/40 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              OPEN TO WORK — MENA · Remote · Hybrid
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue">
              <Briefcase className="w-3 h-3" /> Available for Freelance Projects
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Brain className="w-3 h-3" /> Iqama: Transferable
            </span>
          </div>

          {/* Profile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            {/* Professional photo with premium frame */}
            <div className="relative flex-shrink-0">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-blue/40 animate-spin-slow scale-110" />
              {/* Glow — subtle, doesn't wash out photo */}
              <div className="absolute inset-0 rounded-full bg-accent-blue/10 blur-xl scale-110" />
              {/* Photo — no overlay, full brightness */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-[3px] border-accent-blue/60 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.4)] bg-dark-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/waqas-pro.jpg"
                  alt="Syed Waqas Tayyab — Senior IT Engineer"
                  className="w-full h-full object-cover"
                  style={{objectPosition:'center 8%'}}
                />
              </div>
              {/* HUD corner brackets */}
              <svg className="absolute -top-2 -left-2 w-9 h-9" viewBox="0 0 36 36" fill="none">
                <path d="M18 3 L4 3 Q2 3 2 5 L2 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
                <circle cx="2" cy="3" r="2" fill="#3B82F6"/>
              </svg>
              <svg className="absolute -top-2 -right-2 w-9 h-9" viewBox="0 0 36 36" fill="none">
                <path d="M18 3 L32 3 Q34 3 34 5 L34 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
                <circle cx="34" cy="3" r="2" fill="#3B82F6"/>
              </svg>
              <svg className="absolute -bottom-2 -left-2 w-9 h-9" viewBox="0 0 36 36" fill="none">
                <path d="M2 18 L2 31 Q2 33 4 33 L18 33" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
                <circle cx="2" cy="33" r="2" fill="#06B6D4"/>
              </svg>
              <svg className="absolute -bottom-2 -right-2 w-9 h-9" viewBox="0 0 36 36" fill="none">
                <path d="M34 18 L34 31 Q34 33 32 33 L18 33" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
                <circle cx="34" cy="33" r="2" fill="#06B6D4"/>
              </svg>
              {/* Live green dot */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            </div>

            {/* Name + title */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-black text-white">Syed Waqas Tayyab</h1>
              <p className="text-accent-blue font-semibold mt-1 text-lg">Senior IT System Engineer · SAP · 11 Years</p>
              <div className="flex flex-wrap gap-3 mt-2 justify-center sm:justify-start">
                <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin className="w-3 h-3 text-accent-blue" />Riyadh, Saudi Arabia</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><Phone className="w-3 h-3 text-accent-blue" />+966 505803073</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><GraduationCap className="w-3 h-3 text-accent-blue" />MBA · BSc IT</span>
              </div>
            </div>
          </div>

          {/* Personal profile */}
          <div className="glass-card p-6 mb-6 max-w-3xl mx-auto text-left border-l-4 border-accent-blue">
            <p className="text-gray-300 leading-relaxed">
              Experienced <strong className="text-white">IT Consultant and Corporate IT Expert</strong> with <strong className="text-white">15+ years</strong> across
              IT Infrastructure, Operations, Service Delivery, and Office Technology at SAP and leading organisations in Saudi Arabia.
              <strong className="text-accent-blue"> 100+ projects and implementations</strong> delivered across MENA —
              from enterprise IT deployments and Azure security rollouts to AI automation pipelines and SAP integrations.
              Azure Security Certified engineer with an MBA, 13 certifications, and rapidly growing expertise in
              <strong className="text-accent-blue"> AI Engineering, MLOps, and Agentic AI</strong>.
            </p>
            <p className="text-gray-500 text-sm mt-3 italic border-l-2 border-accent-blue/30 pl-3">
              &ldquo;Training and building AI expert teams — helping young IT professionals adopt AI faster,
              bridging the gap between missing experience and real-world corporate industry knowledge.&rdquo;
            </p>
          </div>

          {/* Keyword tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['IT Consultant', 'Corporate IT Expert', 'IT Infrastructure', 'IT Operations', 'IT Service Delivery',
              'Office Technology Expert', 'AI Engineer', 'MLOps', 'Senior IT System Engineer',
              'Azure Security Certified', 'L2/L3 Support', 'M365 Admin', 'ServiceNow ITSM',
              'SAP S/4HANA', 'SAP Analytics Cloud', 'CCNA Security', 'ITIL v3', 'PMP',
              'Cybersecurity', 'Endpoint & Identity Mgmt', 'English + Arabic'].map(k => (
              <span key={k} className="tag text-xs">{k}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary px-8 py-3.5 text-base">
              <Mail className="w-4 h-4" /> Hire Me Now
            </Link>
            <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer" className="btn-outline px-8 py-3.5 text-base">
              <Linkedin className="w-4 h-4" /> LinkedIn Profile
            </a>
            <Link href="/projects" className="btn-outline px-8 py-3.5 text-base">
              <Code className="w-4 h-4" /> See My Work
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <ScrollReveal>
          <div className="glass-card p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black gradient-text">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── OPEN TO ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="section-heading mb-3">Open To <span className="gradient-text">These Opportunities</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Whether you&apos;re hiring, need a consultant, or want to discuss a project — here&apos;s exactly what I&apos;m targeting.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {openTo.map((o, i) => (
            <ScrollReveal key={o.role} delay={i * 0.08}>
              <div className={`glass-card p-6 border h-full hover:-translate-y-1 transition-all duration-300 ${o.urgent ? 'border-accent-blue/40 hover:shadow-glow' : 'border-white/5 hover:border-white/10'}`}>
                {o.urgent && <span className="badge bg-accent-blue/10 text-accent-blue border border-accent-blue/30 text-xs mb-3">🎯 Top Priority</span>}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${o.bg} flex items-center justify-center`}>
                    <o.icon className={`w-5 h-5 ${o.color}`} />
                  </div>
                  <h3 className="font-bold text-white">{o.role}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FREELANCE SERVICES ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="section-heading mb-3">Freelance <span className="gradient-text">Services</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Project-based work — fast, professional, and enterprise-grade quality.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.06}>
              <div className={`glass-card p-6 h-full flex flex-col border ${s.border} hover:-translate-y-1 hover:shadow-glow transition-all duration-300 ${(s as any).hot ? 'shadow-[0_0_14px_rgba(59,130,246,0.12)]' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {(s as any).hot && (
                      <span className="text-xs font-bold bg-accent-blue/15 text-accent-blue border border-accent-blue/30 px-2 py-0.5 rounded-full">NEW</span>
                    )}
                    <span className={`text-xs font-bold ${s.color} font-mono`}>{s.price}</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => <span key={t} className="tag text-xs">{t}</span>)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3} className="text-center mt-8">
          <Link href="/contact" className="btn-primary inline-flex px-8 py-3.5">
            <Mail className="w-4 h-4" /> Discuss a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="section-heading mb-3">Work <span className="gradient-text">Experience</span></h2>
          <p className="text-gray-400">11+ years across SAP, Banking, and IT Solutions in Saudi Arabia</p>
        </ScrollReveal>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.role + exp.company} delay={i * 0.08}>
              <div className={`glass-card p-7 border-l-4 ${exp.color}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-accent-blue flex-shrink-0" />
                      <span className="text-accent-blue font-semibold">{exp.company}</span>
                    </div>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />{exp.location}
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <span className={`badge border ${exp.badge} text-xs`}>{exp.type}</span>
                    <p className="text-gray-500 text-xs mt-1 font-mono">{exp.period}</p>
                    <p className="text-gray-600 text-xs font-mono">{exp.duration}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="section-heading mb-3"><span className="gradient-text">13 Certifications</span></h2>
          <p className="text-gray-400">Spanning AI/ML, Azure Security, SAP, Cisco, ITIL and Project Management</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 0.05}>
              <div className={`glass-card p-4 flex items-start gap-3 border ${c.border} h-full ${c.hot ? 'shadow-[0_0_15px_rgba(59,130,246,0.15)]' : ''}`}>
                <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Award className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-semibold text-white text-xs leading-snug">{c.name}</h4>
                    {c.hot && <span className="text-xs bg-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded font-bold flex-shrink-0">NEW</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{c.issuer}</p>
                  <p className={`text-xs font-mono mt-0.5 ${c.color}`}>{c.year}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="section-heading mb-3">Technical <span className="gradient-text">Skills</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((s, i) => (
            <ScrollReveal key={s.category} delay={i * 0.05}>
              <div className="glass-card p-5 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <h3 className={`font-bold text-xs ${s.color}`}>{s.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map(item => (
                    <span key={item} className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-300 border border-white/8">{item}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <ScrollReveal className="mb-8 text-center">
          <h2 className="section-heading mb-3"><span className="gradient-text">Education</span></h2>
        </ScrollReveal>
        <div className="space-y-4">
          {[
            {
              degree: 'Master of Business Administration (iMBA) — International Business',
              school: 'Buckinghamshire New University, UK',
              period: '2020 – 2023',
              skills: 'IT Management, Business Analysis, International Business',
              color: 'border-accent-blue', icon: GraduationCap, iconColor: 'text-accent-blue', bg: 'bg-accent-blue/10',
            },
            {
              degree: "Bachelor's in Business Information Technology (BCS-HONS)",
              school: 'University of Greenwich, UK',
              period: '2006 – 2010',
              skills: 'Computer and Information Sciences, Support Services Management',
              color: 'border-cyan-500', icon: GraduationCap, iconColor: 'text-cyan-400', bg: 'bg-cyan-500/10',
            },
          ].map((e, i) => (
            <ScrollReveal key={e.school} delay={i * 0.1}>
              <div className={`glass-card p-6 flex flex-col sm:flex-row items-start gap-5 border-l-4 ${e.color}`}>
                <div className={`w-12 h-12 rounded-xl ${e.bg} flex items-center justify-center flex-shrink-0`}>
                  <e.icon className={`w-6 h-6 ${e.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{e.degree}</h3>
                  <p className={`font-semibold text-sm mt-0.5 ${e.iconColor}`}>{e.school}</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">{e.period}</p>
                  <p className="text-gray-500 text-xs mt-1">{e.skills}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-center gap-8">
            {[
              { lang: 'English', level: 'Fluent', flag: '🇬🇧', color: 'text-blue-400' },
              { lang: 'Arabic', level: 'Fluent', flag: '🇸🇦', color: 'text-green-400' },
            ].map(l => (
              <div key={l.lang} className="flex items-center gap-3">
                <span className="text-3xl">{l.flag}</span>
                <div>
                  <p className={`font-bold text-white`}>{l.lang}</p>
                  <p className={`text-sm ${l.color}`}>{l.level}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="glass-card p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-accent-purple/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-5">
                <Zap className="w-7 h-7 text-accent-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Let&apos;s Build Something <span className="gradient-text">Together</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                11 years of enterprise IT at SAP + Azure Security Certified + AI/ML expertise + MBA.
                Whether you need a <strong className="text-white">Senior IT Engineer</strong>,
                an <strong className="text-white">AI Automation consultant</strong>, or a
                <strong className="text-white"> freelance project partner</strong> — I respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary px-10 py-4 text-base">
                  <Mail className="w-5 h-5" /> Contact Me Now
                </Link>
                <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer" className="btn-outline px-10 py-4 text-base">
                  <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent-blue" />Riyadh, Saudi Arabia</span>
                <a href="tel:+966505803073" className="flex items-center gap-1.5 hover:text-green-400 transition-colors"><Phone className="w-3.5 h-3.5 text-green-400" />+966 505803073</a>
                <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"><MessageCircle className="w-3.5 h-3.5 text-emerald-400" />WhatsApp Direct</a>
                <a href="mailto:waqastayyab2004@gmail.com" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Mail className="w-3.5 h-3.5 text-red-400" />waqastayyab2004@gmail.com</a>
              </div>
              <p className="text-gray-600 text-xs mt-3">Open to MENA · Remote · Hybrid · Iqama Transferable</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  )
}
