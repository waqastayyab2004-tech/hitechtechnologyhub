'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink, CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SapSidebar from '../SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const certs = [
  {
    title: 'SAP Certified — SAP Generative AI Developer',
    id: 'C_AIG_2604',
    issued: 'Jul 2026',
    expires: 'Jul 2027',
    verifyUrl: null,
    skills: ['Large Language Models (LLMs)', 'SAP AI Core', 'SAP AI Launchpad', 'Generative AI for Enterprise', 'Prompt Engineering'],
    level: 'Professional',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    current: true,
  },
  {
    title: 'Developing AI Models with Python ML Client for SAP HANA',
    id: null,
    issued: 'May 2026',
    expires: null,
    verifyUrl: 'https://badger.learning.sap.com/verify/xesut-sekuh-guket-lataf-pohys',
    skills: ['Machine Learning', 'Machine Learning Algorithms', 'Python for SAP HANA', 'SAP HANA Cloud'],
    level: 'Course Completion',
    color: 'bg-gradient-to-br from-violet-600 to-purple-700',
    current: false,
  },
  {
    title: 'Compose and Automate with SAP Build the No-Code Way',
    id: null,
    issued: 'Mar 2023',
    expires: null,
    verifyUrl: null,
    skills: ['Business Process Automation', 'SAP Build', 'No-Code Development', 'SAP Workflow'],
    level: 'Course Completion',
    color: 'bg-gradient-to-br from-sky-600 to-blue-700',
    current: false,
  },
  {
    title: 'SAP Certified Application Associate — SAP Analytics Cloud: Planning',
    id: null,
    issued: 'Jan 2023',
    expires: 'Jan 2028',
    verifyUrl: null,
    skills: ['SAP Analytics Cloud', 'Planning & Forecasting', 'Data Visualization', 'Business Intelligence'],
    level: 'Associate',
    color: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    current: false,
  },
  {
    title: 'SAP Certified Technology Associate — SAP S/4HANA System Administration',
    id: null,
    issued: 'Mar 2022',
    expires: null,
    verifyUrl: null,
    skills: ['SAP S/4HANA', 'System Administration', 'SAP Basis', 'HANA Database', 'Transport Management'],
    level: 'Associate',
    color: 'bg-gradient-to-br from-orange-600 to-red-700',
    current: false,
  },
]

const roadmap = [
  { label: 'SAP S/4HANA System Admin', date: '2022', done: true },
  { label: 'SAP Analytics Cloud: Planning', date: '2023', done: true },
  { label: 'SAP Build No-Code', date: '2023', done: true },
  { label: 'SAP HANA Python ML', date: '2026', done: true },
  { label: 'SAP Generative AI Developer', date: '2026', done: true },
  { label: 'SAP Certified AI Professional (C_BCBAI)', date: 'Next', done: false },
]

export default function SapCertsClient() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 pt-24 pb-12" style={{background:'linear-gradient(135deg,#0B1220 0%,#0d1a3a 60%,#0B1220 100%)'}}><div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-600/8 rounded-full blur-[70px] pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sap" className="text-gray-400 hover:text-white text-sm transition-colors">SAP Hub</Link>
            <span className="text-blue-300 text-sm">/</span>
            <span className="text-white text-sm font-medium">Certifications</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Award className="w-9 h-9 text-yellow-400" /> SAP Certifications
          </h1>
          <p className="text-gray-400 text-lg">5 SAP certifications earned across AI, HANA, S/4HANA, Analytics Cloud and Build</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* Cert timeline */}
            <motion.div variants={fade} className="mb-14">
              <h2 className="text-xl font-bold text-white mb-6">All Certifications</h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/8 hidden sm:block" />

                <div className="space-y-6">
                  {certs.map((cert, i) => (
                    <motion.div key={i} variants={fade} className="sm:pl-14 relative">
                      {/* Timeline dot */}
                      <div className={`hidden sm:flex absolute left-3 top-5 w-5 h-5 rounded-full items-center justify-center ${cert.current ? 'bg-blue-600 ring-4 ring-blue-900/40' : 'bg-gray-600'}`}>
                        {cert.current && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`${cert.color} px-5 py-4 text-white`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full mb-2 inline-block">{cert.level}</span>
                              {cert.current && (
                                <span className="text-xs font-semibold bg-yellow-400/90 text-yellow-900 px-2 py-0.5 rounded-full mb-2 inline-block ml-2">Active</span>
                              )}
                              <h3 className="font-bold text-base leading-snug">{cert.title}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="px-5 py-4">
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" /> Issued {cert.issued}
                            </span>
                            {cert.expires && (
                              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle className="w-4 h-4" /> Expires {cert.expires}
                              </span>
                            )}
                            {cert.id && (
                              <span className="font-mono text-xs bg-white/5 px-2 py-1 rounded">
                                ID: {cert.id}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cert.skills.map((s) => (
                              <span key={s} className="text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full">
                                {s}
                              </span>
                            ))}
                          </div>
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" /> Verify Credential
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Roadmap */}
            <motion.div variants={fade} className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">SAP Certification Roadmap</h2>
              <div className="flex flex-wrap items-center gap-2">
                {roadmap.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border
                      ${step.done
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                        : 'bg-white/4 border-dashed border-white/10 text-gray-500'
                      }`}>
                      {step.done
                        ? <CheckCircle className="w-4 h-4 text-blue-400" />
                        : <span className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-slate-500 flex items-center justify-center text-xs">?</span>
                      }
                      <span>{step.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${step.done ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400'}`}>
                        {step.date}
                      </span>
                    </div>
                    {i < roadmap.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-gray-400 shrink-0" />
                    )}
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
