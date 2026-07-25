'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Star, ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import SapSidebar from '../SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const courses = [
  {
    id: 115,
    title: 'CLEA App: SAP IT Asset Lifecycle Management',
    category: 'SAP BTP & Development',
    level: 'Intermediate',
    duration: '2h',
    students: '180+',
    rating: 4.9,
    isFree: true,
    live: true,
    skills: ['SAP BTP', 'SAP ISP', 'Asset Lifecycle', 'Power BI Integration', 'CLEA Application'],
    desc: 'Build and operate the CLEA (Client Lifecycle Enterprise Application) — a real SAP BTP app that replaces Excel-based IT asset tracking with automated lifecycle workflows.',
  },
  {
    id: 101,
    title: 'IT Asset Lifecycle Management for Enterprise Support',
    category: 'SAP IT Operations',
    level: 'Beginner',
    duration: '1h',
    students: '320+',
    rating: 4.8,
    isFree: true,
    live: true,
    skills: ['SAP ISP', 'SAP Ariba', 'Asset Procurement', 'ERP Workflows', 'Power BI'],
    desc: 'End-to-end IT asset lifecycle workflows built from real SAP operations — procurement via SAP Ariba, device tracking in SAP ISP, and decommission processes.',
  },
  {
    id: 119,
    title: 'Zebra ZT411 RFID Printer — SAP IT Deployment',
    category: 'SAP IT Operations',
    level: 'Intermediate',
    duration: '1h 30m',
    students: '110+',
    rating: 4.7,
    isFree: true,
    live: true,
    skills: ['RFID Asset Tagging', 'SAP IT Deployment', 'ZPL Label Programming', 'Enterprise Asset Management'],
    desc: 'Deploy and configure the Zebra ZT411 RFID industrial printer for SAP IT asset tagging — from ZPL label design to SAP-format RFID tag encoding.',
  },
  {
    id: 120,
    title: 'Zebra GX430t QR Code Printer — SAP Asset Tagging',
    category: 'SAP IT Operations',
    level: 'Beginner',
    duration: '1h',
    students: '95+',
    rating: 4.8,
    isFree: true,
    live: true,
    skills: ['QR Code Label Printing', 'SAP Asset Tagging', 'ZPL Programming', 'IT Inventory Management'],
    desc: 'Set up the Zebra GX430t for SAP IT production asset tagging — QR code label design, printer calibration, and integration with SAP asset management workflows.',
  },
  {
    id: null,
    title: 'SAP Generative AI Developer — Full Course (C_AIG)',
    category: 'SAP AI & Machine Learning',
    level: 'Advanced',
    duration: '4h',
    students: null,
    rating: null,
    isFree: false,
    live: false,
    skills: ['SAP AI Launchpad', 'SAP AI Core', 'Large Language Models (LLMs)', 'Generative AI for Enterprise', 'Prompt Engineering'],
    desc: 'Deep-dive course covering the full SAP Generative AI Developer (C_AIG_2604) certification path — from SAP AI Core architecture to production GenAI deployments on SAP BTP.',
  },
  {
    id: null,
    title: 'SAP Build No-Code Automation',
    category: 'SAP Build & Low-Code',
    level: 'Beginner',
    duration: '2h',
    students: null,
    rating: null,
    isFree: true,
    live: false,
    skills: ['SAP Build', 'Business Process Automation', 'No-Code App Development', 'SAP Workflow', 'Process Modelling'],
    desc: 'Learn to build automated business processes and apps with SAP Build — no coding required. Based on the SAP "Compose and Automate with SAP Build the No-Code Way" certification.',
  },
]

export default function SapCoursesClient() {
  const live = courses.filter((c) => c.live)
  const coming = courses.filter((c) => !c.live)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 text-white pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sap" className="text-violet-200 hover:text-white text-sm transition-colors">SAP Hub</Link>
            <span className="text-violet-300 text-sm">/</span>
            <span className="text-white text-sm font-medium">Courses I Teach</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="w-9 h-9 text-violet-300" /> SAP Courses
          </h1>
          <p className="text-violet-100 text-lg">Practical SAP courses built from 11 years of real enterprise experience at SAP Saudi Arabia</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* Live courses */}
            <motion.div variants={fade} className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Available Now</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {live.map((course) => (
                  <motion.div key={course.id} variants={fade}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 px-5 py-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium bg-white/20 px-2.5 py-0.5 rounded-full">{course.category}</span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${course.isFree ? 'bg-green-400/90 text-green-900' : 'bg-yellow-400/90 text-yellow-900'}`}>
                            {course.isFree ? 'Free' : 'Paid'}
                          </span>
                        </div>
                        <h3 className="font-bold text-base leading-snug">{course.title}</h3>
                      </div>
                      <div className="px-5 py-4 flex flex-col flex-1">
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{course.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                          {course.students && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students}</span>}
                          {course.rating && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {course.rating}</span>}
                          <span className="capitalize">{course.level}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {course.skills.map((s) => (
                            <span key={s} className="text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto">
                          <Link
                            href={`/training/${course.id}`}
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                          >
                            View Course <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Coming soon */}
            <motion.div variants={fade} className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coming Soon</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">New SAP courses in development — based on certifications earned in 2026.</p>
              <div className="grid sm:grid-cols-2 gap-5">
                {coming.map((course, i) => (
                  <motion.div key={i} variants={fade}>
                    <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden opacity-80">
                      <div className="bg-gradient-to-br from-slate-500 to-slate-700 px-5 py-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium bg-white/20 px-2.5 py-0.5 rounded-full">{course.category}</span>
                          <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" /> Coming Soon
                          </span>
                        </div>
                        <h3 className="font-bold text-base leading-snug">{course.title}</h3>
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{course.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {course.skills.map((s) => (
                            <span key={s} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          Get Notified
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fade} className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Want to learn SAP directly from a Senior SAP Engineer?</h3>
              <p className="text-violet-100 text-sm mb-5">11 years of hands-on SAP experience condensed into practical courses. Enquire about private training, group sessions or one-on-one mentoring.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-violet-50 transition-colors text-sm">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  )
}
