'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, Quote, CheckCircle, Layers, Database, Bot, BarChart2, ShoppingCart, Cpu } from 'lucide-react'
import Link from 'next/link'
import SapSidebar from '../SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const sapTools = [
  {
    icon: Cpu,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    category: 'SAP BTP — Business Technology Platform',
    tools: ['SAP BTP Cloud Foundry', 'SAP Build', 'SAP Work Zone', 'SAP Integration Suite'],
    highlights: [
      'Built and deployed CLEA — a custom SAP BTP Cloud Foundry app replacing Excel-based IT asset tracking',
      'Published CLEA to SAP Work Zone — accessible by all IT team members across the region',
      'Used SAP Build for no-code automation of IT request and approval workflows',
      'Managed BTP subaccounts, service bindings, and Cloud Foundry spaces (European data centre region)',
    ],
  },
  {
    icon: Database,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    category: 'Enterprise Asset Management — IT Service Platform',
    tools: ['enterprise asset management system', 'Asset Lifecycle Management', 'Device Assignment', 'Stock Management'],
    highlights: [
      'Daily operational use of enterprise asset management system for end-to-end IT hardware lifecycle — procurement to decommission',
      'On-boarding: assigned devices to new joiners, linked to enterprise asset ERP records and ServiceNow tickets',
      'Off-boarding: recovered and deregistered devices, updated records on leaver processing',
      'Pool stock management: monthly QR scan of all IT storage room inventory against records',
      'Goods Receipt: registered all new hardware from procurement into the system before any assignment',
    ],
  },
  {
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    category: 'SAP Ariba — Procurement',
    tools: ['SAP Ariba', 'Purchase Requisitions', 'Purchase Orders', 'Goods Receipt'],
    highlights: [
      'Raised and tracked Purchase Requisitions (PR) and Purchase Orders (PO) for all IT hardware procurement',
      'Goods Receipt process: matched incoming hardware deliveries against Ariba POs before registration into the enterprise asset management system',
      'Managed 200–300K SAR/month in IT hardware approvals via Ariba-integrated approval workflow',
      'Coordinated with finance and procurement teams on IT BOM approvals before project delivery',
    ],
  },
  {
    icon: BarChart2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    category: 'SAP Analytics Cloud & Power BI',
    tools: ['SAP Analytics Cloud', 'Planning & Forecasting', 'Power BI', 'SharePoint Online'],
    highlights: [
      'Certified SAP Analytics Cloud: Planning Associate — planning models, data connections, forecasting',
      'Built Power BI dashboards fed from ServiceNow REST API and enterprise asset management system data for IT KPI reporting',
      'Published IT operations dashboards to SAP Work Zone — used weekly by IT leadership and Country MD',
      'Automated daily IT reporting: SLA stats, ticket volume, asset health, procurement spend',
    ],
  },
  {
    icon: Bot,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    category: 'SAP AI — Generative AI & Machine Learning',
    tools: ['SAP AI Core', 'SAP AI Launchpad', 'Python ML Client for SAP HANA', 'SAP HANA Cloud'],
    highlights: [
      'Certified SAP Generative AI Developer (C_AIG_2604) — SAP AI Core, AI Launchpad, LLM integration',
      'Certified in Python ML Client for SAP HANA — building and deploying ML models on SAP HANA Cloud',
      'Completed SAP HANA Cloud ML course: supervised/unsupervised learning, model deployment',
      'Applied AI automation to IT operations: email triage, SLA monitoring, ticket classification',
    ],
  },
  {
    icon: Layers,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    category: 'SAP Work Zone & Corporate Systems',
    tools: ['SAP Work Zone', 'SAP S/4HANA', 'SAP SuccessFactors', 'SAP Concur'],
    highlights: [
      'Certified SAP S/4HANA System Administration Associate — Basis, HANA DB, transport management',
      'Managed SAP Work Zone portal — published IT dashboards, tools, and resources for 500+ users',
      'Supported user access and provisioning for SAP SuccessFactors and SAP Concur integrations',
      'Coordinated with SAP global IT teams on S/4HANA system access and transport requests',
    ],
  },
]

const roles = [
  {
    title: 'Senior Information Technology System Engineer',
    period: 'Jul 2019 – Present',
    duration: '7 yrs 1 mo',
    location: 'Riyadh, Saudi Arabia · On-site',
    current: true,
    highlights: [
      'IT Single Point of Contact (SPOC) for SAP Saudi Arabia — managing infrastructure across multiple cities',
      'Comprehensive IT field service availability through proactive monitoring across all network layers',
      'Delivered L2/L3 support for 500+ SAP employees across Riyadh HQ and regional offices',
      'Managed end-to-end device lifecycle: procurement → deployment → decommission (1,500+ assets)',
      'Implemented Zero Trust security controls, raising SAP KSA Secure Score from 41% to 78%',
      'Led IT onboarding/offboarding for all SAP Saudi Arabia hires — M365, Azure AD, SAP systems, SNOW',
      'Built CLEA — a custom SAP BTP app for IT asset lifecycle management (replacing manual Excel tracking)',
      'Integrated enterprise asset management system, SAP Ariba, ServiceNow and Power BI for end-to-end IT operations visibility',
      'Set up and managed ITLC walk-up kiosk and Signifi smart locker for self-service IT pickup',
    ],
    skills: ['IT Infrastructure Operations', 'Cloud Applications', 'SAP BTP', 'Azure AD', 'ServiceNow', 'enterprise asset management system', 'SAP Ariba', 'Endpoint Security', 'M365 Administration'],
  },
  {
    title: 'IT Administrator',
    period: 'Jul 2015 – Jul 2019',
    duration: '4 yrs 1 mo',
    location: 'Riyadh, KSA · On-site',
    current: false,
    highlights: [
      'Experienced IT Support Specialist managing and maintaining SAP KSA IT infrastructure',
      'Single Point of Contact (SPOC) for IT operations — coordinating across multiple offices and global teams',
      'Handled complex issues related to network connectivity, server management and modern management systems',
      'Managed Microsoft 365, Cisco and Aruba wireless systems, and endpoint security tools',
      'Deployed and configured SAP corporate systems for new-hire onboarding at scale',
      'Optimised IT environments through effective deployment, configuration, and ongoing support',
    ],
    skills: ['IT Infrastructure Operations', 'Systems Analysis', 'Network Administration', 'Microsoft 365', 'Cisco Networking', 'Aruba Wireless', 'Endpoint Management'],
  },
]

const recommendations = [
  {
    name: 'Dr. Reem Alattas',
    title: 'AI, Cloud & Public Sector Growth Executive · NASA Datanaut · PhD Computer Science · 4 Patents',
    relationship: 'Worked with Waqas at SAP on different teams',
    date: 'May 2025',
    text: 'I had the pleasure of working with Waqas at SAP and was consistently impressed by his technical expertise and leadership. As the IT SPOC for SAP Saudi Arabia, he managed complex infrastructure across multiple cities with precision and professionalism. Waqas excels at turning technical challenges into smart, scalable solutions, all while ensuring business continuity and compliance. A reliable, results-driven professional — any team would be lucky to have him.',
  },
  {
    name: 'Emad Banat',
    title: 'Senior Account Executive @ SAP | Microsoft Technologies',
    relationship: 'Was senior to Waqas at SAP (different teams)',
    date: 'Apr 2025',
    text: 'Waqas is a highly educated professional who is passionate about his job and always works as an efficient team player. I recommend him for high and complex IT management for security and infrastructure network.',
  },
]

export default function SapExpClient() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 pt-24 pb-12" style={{background:'linear-gradient(135deg,#0B1220 0%,#0d1a3a 60%,#0B1220 100%)'}}><div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-600/8 rounded-full blur-[70px] pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sap" className="text-gray-400 hover:text-white text-sm transition-colors">SAP Hub</Link>
            <span className="text-indigo-300 text-sm">/</span>
            <span className="text-white text-sm font-medium">Experience</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Briefcase className="w-9 h-9 text-indigo-300" /> SAP Experience
          </h1>
          <p className="text-gray-400 text-lg">11+ years at SAP Saudi Arabia across two progressive roles — IT Administrator to Senior IT System Engineer & SPOC</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* SPOC highlight */}
            <motion.div variants={fade} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-10 flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Key Responsibility</p>
                <h2 className="text-xl font-bold mb-1">IT Single Point of Contact (SPOC) — SAP Saudi Arabia</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The sole IT liaison for all of SAP&apos;s Saudi Arabia operations — responsible for every device, every network, every system, across multiple cities. Ensuring 500+ employees stay productive and secure.
                </p>
              </div>
            </motion.div>

            {/* Career timeline */}
            <motion.div variants={fade} className="mb-14">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Career Timeline at SAP
              </h2>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/8 hidden sm:block" />

                <div className="space-y-8">
                  {roles.map((role, i) => (
                    <motion.div key={i} variants={fade} className="sm:pl-14 relative">
                      <div className={`hidden sm:flex absolute left-3 top-6 w-5 h-5 rounded-full items-center justify-center
                        ${role.current ? 'bg-blue-600 ring-4 ring-blue-900/40' : 'bg-gray-600'}`}>
                        {role.current && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="glass-card rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {role.current && (
                                <span className="bg-green-500/15 text-green-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-white">{role.title}</h3>
                            <p className="text-blue-400 font-semibold text-sm mt-0.5">SAP</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-medium text-gray-300">{role.period}</p>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center justify-end gap-1">
                              <Clock className="w-3 h-3" /> {role.duration}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center justify-end gap-1">
                              <MapPin className="w-3 h-3" /> {role.location}
                            </p>
                          </div>
                        </div>

                        <ul className="space-y-2 mb-5">
                          {role.highlights.map((h, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              {h}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((s) => (
                            <span key={s} className="text-xs bg-white/5 text-gray-400 dark:text-slate-300 px-2.5 py-1 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SAP Applications & Tools */}
            <motion.div variants={fade} className="mb-14">
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" /> SAP Applications &amp; Tools — Hands-On Experience
              </h2>
              <p className="text-gray-500 text-sm mb-8">SAP-specific platforms and tools used daily across 11+ years — not just exposure, but real operational delivery.</p>

              <div className="space-y-5">
                {sapTools.map((group, i) => {
                  const Icon = group.icon
                  return (
                    <motion.div key={i} variants={fade} className={`glass-card rounded-2xl p-6 border ${group.border}`}>
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-11 h-11 rounded-xl ${group.bg} border ${group.border} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${group.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-base text-white mb-2`}>{group.category}</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {group.tools.map(t => (
                              <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${group.bg} border ${group.border} ${group.color}`}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Highlights */}
                      <ul className="space-y-1.5 pl-1">
                        {group.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle className={`w-3.5 h-3.5 ${group.color} shrink-0 mt-0.5`} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={fade}>
              <h2 className="text-xl font-bold text-white mb-6">LinkedIn Recommendations</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {recommendations.map((r) => (
                  <div key={r.name} className="glass-card rounded-2xl p-6">
                    <Quote className="w-8 h-8 text-gray-400 dark:text-blue-900 mb-3" />
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
                    <div className="border-t border-white/8 pt-4">
                      <p className="font-bold text-white text-sm">{r.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{r.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{r.date} · {r.relationship}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  )
}
