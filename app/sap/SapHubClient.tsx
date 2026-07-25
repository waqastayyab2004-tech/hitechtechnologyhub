'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Award, Briefcase, BookOpen, Cpu, ArrowRight, MapPin, Star, Quote } from 'lucide-react'
import SapSidebar from './SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const stats = [
  { value: '11+', label: 'Years at SAP' },
  { value: '5',   label: 'SAP Certifications' },
  { value: '2',   label: 'SAP Roles' },
  { value: 'RUH', label: 'Riyadh, KSA' },
]

const cards = [
  {
    href: '/sap/certifications',
    icon: Award,
    label: 'Certifications',
    desc: '5 SAP certs — Gen AI Developer, HANA ML, S/4HANA, Analytics Cloud, SAP Build',
    color: 'from-blue-600 to-blue-800',
    badge: '5 Certs',
  },
  {
    href: '/sap/experience',
    icon: Briefcase,
    label: 'Experience',
    desc: '11 yrs at SAP Saudi Arabia — IT Admin → Senior IT System Engineer & SPOC',
    color: 'from-indigo-600 to-indigo-800',
    badge: '11 Years',
  },
  {
    href: '/sap/courses',
    icon: BookOpen,
    label: 'Courses I Teach',
    desc: 'SAP IT Asset Lifecycle, CLEA BTP App, SAP Gen AI, SAP Build No-Code',
    color: 'from-violet-600 to-violet-800',
    badge: '6 Courses',
  },
  {
    href: '/sap/skills',
    icon: Cpu,
    label: 'Skills & Tools',
    desc: 'SAP BTP · SAP HANA · SAP ISP · SAP Ariba · AI Launchpad · S/4HANA',
    color: 'from-sky-600 to-sky-800',
    badge: '12+ Skills',
  },
]

const recommendations = [
  {
    name: 'Dr. Reem Alattas',
    title: 'AI, Cloud & Public Sector Growth Executive · NASA Datanaut · PhD Computer Science',
    text: 'I had the pleasure of working with Waqas at SAP and was consistently impressed by his technical expertise and leadership. As the IT SPOC for SAP Saudi Arabia, he managed complex infrastructure across multiple cities with precision and professionalism. Waqas excels at turning technical challenges into smart, scalable solutions, all while ensuring business continuity and compliance.',
    date: 'May 2025',
  },
  {
    name: 'Emad Banat',
    title: 'Senior Account Executive @ SAP | Microsoft Technologies',
    text: 'Waqas is a highly educated professional who is passionate about his job and always works as an efficient team player. I recommend him for high and complex IT management for security and infrastructure network.',
    date: 'Apr 2025',
  },
]

export default function SapHubClient() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                SAP Specialist
              </span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Riyadh, Saudi Arabia
              </span>
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold mb-3">
              SAP Hub
            </motion.h1>
            <motion.p variants={fade} className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
              11 years as Senior IT System Engineer at SAP · 5 SAP Certifications · IT SPOC for SAP Saudi Arabia · Generative AI, HANA ML, S/4HANA & SAP BTP
            </motion.p>
            {/* Stats */}
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fade} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-blue-200 text-sm mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          {/* Quick-nav cards */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h2 variants={fade} className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Explore SAP Profile
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-5 mb-14">
              {cards.map(({ href, icon: Icon, label, desc, color, badge }) => (
                <motion.div key={href} variants={fade}>
                  <Link href={href} className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                    <div className={`bg-gradient-to-br ${color} p-5 text-white`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full">{badge}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{label}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-5 py-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">View {label}</span>
                      <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={fade}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                LinkedIn Recommendations
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {recommendations.map((r) => (
                  <div key={r.name} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <Quote className="w-8 h-8 text-blue-200 dark:text-blue-900 mb-3" />
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{r.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{r.title}</p>
                      <p className="text-slate-400 text-xs mt-1">{r.date} · SAP colleague</p>
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
