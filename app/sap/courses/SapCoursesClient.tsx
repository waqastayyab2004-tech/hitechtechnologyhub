'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SapSidebar from '../SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const courses = [
  {
    id: 115,
    title: 'CLEA App: Enterprise IT Asset Lifecycle Management',
    category: 'SAP BTP & Development',
    level: 'Intermediate',
    duration: '2h',
    students: '180+',
    rating: 4.9,
    isFree: true,
    live: true,
    skills: ['SAP BTP', 'Asset Lifecycle', 'ERP Integration', 'Power BI Integration', 'CLEA Application'],
    desc: 'Build and operate the CLEA (Client Lifecycle Enterprise Application) — a SAP BTP app that replaces Excel-based IT asset tracking with automated lifecycle workflows.',
  },
  {
    id: 101,
    title: 'IT Asset Lifecycle Management for Enterprise Support',
    category: 'Enterprise IT Operations',
    level: 'Beginner',
    duration: '1h',
    students: '320+',
    rating: 4.8,
    isFree: true,
    live: true,
    skills: ['Asset Procurement', 'ERP Workflows', 'IT Asset Tracking', 'Power BI', 'Decommission Process'],
    desc: 'End-to-end IT asset lifecycle workflows — procurement, device tracking via ERP, and decommission processes. Based on real enterprise IT operations.',
  },
  {
    id: 119,
    title: 'Zebra ZT411 RFID Printer — Enterprise IT Deployment',
    category: 'Enterprise IT Operations',
    level: 'Intermediate',
    duration: '1h 30m',
    students: '110+',
    rating: 4.7,
    isFree: true,
    live: true,
    skills: ['RFID Asset Tagging', 'ZPL Label Programming', 'Enterprise Asset Management', 'Network Printing'],
    desc: 'Deploy and configure the Zebra ZT411 RFID industrial printer for enterprise IT asset tagging — from ZPL label design to RFID tag encoding and network integration.',
  },
  {
    id: 120,
    title: 'Zebra GX430t QR Code Printer — Enterprise Asset Tagging',
    category: 'Enterprise IT Operations',
    level: 'Beginner',
    duration: '1h',
    students: '95+',
    rating: 4.8,
    isFree: true,
    live: true,
    skills: ['QR Code Label Printing', 'Enterprise Asset Tagging', 'ZPL Programming', 'IT Inventory Management'],
    desc: 'Set up the Zebra GX430t for enterprise IT asset tagging — QR code label design, printer calibration, and integration with asset management workflows.',
  },
]

const teachCourses = [
  {
    cert: 'C_AIG_2604',
    certLabel: 'SAP Certified — Generative AI Developer',
    title: 'SAP Generative AI Developer (C_AIG_2604) — 1-on-1 Coaching',
    category: 'SAP AI & Machine Learning',
    level: 'Advanced',
    duration: 'Flexible',
    skills: ['SAP AI Core', 'SAP AI Launchpad', 'Large Language Models', 'Generative AI for Enterprise', 'Prompt Engineering', 'SAP BTP'],
    desc: 'Personalised coaching to prepare you for the C_AIG_2604 certification — covering SAP AI Core architecture, AI Launchpad, LLM integration, and production GenAI deployments on SAP BTP. Taught by a certified holder.',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
  },
  {
    cert: null,
    certLabel: 'SAP — Python ML Client for SAP HANA (Verified Badge)',
    title: 'AI Models with Python & SAP HANA — Practical Course',
    category: 'SAP AI & Machine Learning',
    level: 'Intermediate',
    duration: 'Flexible',
    skills: ['Python for SAP HANA', 'Machine Learning', 'SAP HANA Cloud', 'ML Algorithms', 'Data Science'],
    desc: 'Hands-on coaching on building and deploying machine learning models using the Python ML Client for SAP HANA. Covers ML algorithms, model training, and integration with SAP HANA Cloud.',
    color: 'bg-gradient-to-br from-violet-600 to-purple-700',
  },
  {
    cert: null,
    certLabel: 'SAP — Compose and Automate with SAP Build (Verified Badge)',
    title: 'SAP Build No-Code Automation — Beginner to Ready',
    category: 'SAP Build & Low-Code',
    level: 'Beginner',
    duration: 'Flexible',
    skills: ['SAP Build', 'Business Process Automation', 'No-Code App Development', 'SAP Workflow', 'Process Modelling'],
    desc: 'Learn to automate business processes and build apps without writing code using SAP Build. Ideal for business users and IT professionals looking to accelerate workflows on SAP.',
    color: 'bg-gradient-to-br from-sky-600 to-blue-700',
  },
  {
    cert: null,
    certLabel: 'SAP Certified Application Associate — SAP Analytics Cloud: Planning',
    title: 'SAP Analytics Cloud Planning — Associate Prep & Practical',
    category: 'SAP Analytics',
    level: 'Intermediate',
    duration: 'Flexible',
    skills: ['SAP Analytics Cloud', 'Planning & Forecasting', 'Data Visualization', 'Business Intelligence', 'Dashboard Design'],
    desc: 'Coaching for the SAP Analytics Cloud Planning associate certification — planning models, data connections, forecasting, and dashboard design. Taught by a certified associate.',
    color: 'bg-gradient-to-br from-emerald-600 to-teal-700',
  },
  {
    cert: null,
    certLabel: 'SAP Certified Technology Associate — SAP S/4HANA System Administration',
    title: 'SAP S/4HANA System Administration — Associate Prep',
    category: 'SAP S/4HANA',
    level: 'Intermediate',
    duration: 'Flexible',
    skills: ['SAP S/4HANA', 'System Administration', 'SAP Basis', 'HANA Database', 'Transport Management'],
    desc: 'Structured coaching to prepare for the SAP S/4HANA System Administration associate certification — covering Basis administration, HANA database management, and transport processes.',
    color: 'bg-gradient-to-br from-orange-600 to-red-700',
  },
]

export default function SapCoursesClient() {
  const live = courses.filter((c) => c.live)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 pt-24 pb-12" style={{background:'linear-gradient(135deg,#0B1220 0%,#0d1a3a 60%,#0B1220 100%)'}}><div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-600/8 rounded-full blur-[70px] pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sap" className="text-gray-400 hover:text-white text-sm transition-colors">SAP Hub</Link>
            <span className="text-violet-300 text-sm">/</span>
            <span className="text-white text-sm font-medium">Courses I Teach</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="w-9 h-9 text-violet-300" /> SAP Courses
          </h1>
          <p className="text-gray-400 text-lg">Personalised SAP coaching from a certified SAP engineer — 1-on-1 sessions, group training, and practical courses</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* Certification-based coaching — TOP */}
            <motion.div variants={fade} className="mb-12">
              <h2 className="text-xl font-bold text-white mb-1">Learn from My SAP Certifications</h2>
              <p className="text-gray-500 text-sm mb-6">
                I hold 5 SAP certifications — and offer personalised 1-on-1 coaching and group sessions for each. Contact me to discuss your learning goals, schedule, and format.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {teachCourses.map((course, i) => (
                  <motion.div key={i} variants={fade}>
                    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/8 hover:border-white/15 transition-all">
                      <div className={`${course.color} px-5 py-4 text-white`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium bg-white/20 px-2.5 py-0.5 rounded-full">{course.category}</span>
                          <span className="text-xs font-semibold bg-yellow-400/90 text-yellow-900 px-2.5 py-0.5 rounded-full">1-on-1 Available</span>
                        </div>
                        <h3 className="font-bold text-base leading-snug mb-2">{course.title}</h3>
                        <p className="text-[10px] text-white/60 flex items-center gap-1">
                          🏅 {course.certLabel}
                        </p>
                      </div>
                      <div className="px-5 py-4 flex flex-col flex-1">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{course.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                          <span className="capitalize">{course.level}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {course.skills.map((s) => (
                            <span key={s} className="text-xs bg-blue-950/40 text-blue-300 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                        <div className="mt-auto">
                          <a
                            href="https://wa.me/966505803073?text=Hi%20Waqas%2C%20I%20am%20interested%20in%20learning%20from%20your%20SAP%20certification%20course"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                          >
                            Contact to Learn <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* More courses — available on training page */}
            <motion.div variants={fade} className="mb-12">
              <h2 className="text-xl font-bold text-white mb-1">More Courses</h2>
              <p className="text-gray-500 text-sm mb-6">Practical IT courses available in the Learning section — enterprise IT operations, printer management, asset lifecycle, and more.</p>
              <div className="grid sm:grid-cols-2 gap-5">
                {live.map((course) => (
                  <motion.div key={course.id} variants={fade}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
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
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{course.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
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

            {/* CTA */}
            <motion.div variants={fade} className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Want to learn SAP directly from a Senior SAP Engineer?</h3>
              <p className="text-gray-400 text-sm mb-5">11 years of hands-on SAP experience condensed into practical courses. Enquire about private training, group sessions or one-on-one mentoring.</p>
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
