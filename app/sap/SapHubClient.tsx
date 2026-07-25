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
  { href: '/sap/certifications', icon: Award,    label: 'Certifications',  desc: '5 SAP certs — Gen AI Developer, HANA ML, S/4HANA, Analytics Cloud, SAP Build', accent: '#3b82f6', badge: '5 Certs'   },
  { href: '/sap/experience',     icon: Briefcase, label: 'Experience',      desc: '11 yrs at SAP Saudi Arabia — IT Admin → Senior IT System Engineer & SPOC',         accent: '#6366f1', badge: '11 Years'  },
  { href: '/sap/courses',        icon: BookOpen,  label: 'Courses I Teach', desc: 'SAP IT Asset Lifecycle, CLEA BTP App, SAP Gen AI, SAP Build No-Code',               accent: '#8b5cf6', badge: '6 Courses' },
  { href: '/sap/skills',         icon: Cpu,       label: 'Skills & Tools',  desc: 'SAP BTP · SAP HANA · SAP ISP · SAP Ariba · AI Launchpad · S/4HANA',                 accent: '#06b6d4', badge: '12+ Skills' },
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
    <div className="min-h-screen bg-dark-900">

      {/* Hero — dark with subtle blue glow, matches site tone */}
      <div className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B1220 0%, #0d1a3a 60%, #0B1220 100%)' }}>
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/3 w-96 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-48 bg-indigo-600/8 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fade} className="flex items-center gap-2 mb-5">
              <span className="bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                SAP Specialist
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Riyadh, Saudi Arabia
              </span>
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold text-white mb-3">
              SAP Hub
            </motion.h1>
            <motion.p variants={fade} className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
              11 years as Senior IT System Engineer at SAP · 5 SAP Certifications · IT SPOC for SAP Saudi Arabia · Generative AI, HANA ML, S/4HANA &amp; SAP BTP
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fade}
                  className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.label}</p>
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
          <motion.div initial="hidden" animate="show" variants={stagger}>

            <motion.h2 variants={fade} className="text-2xl font-bold text-white mb-6">
              Explore SAP Profile
            </motion.h2>

            {/* Nav cards */}
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-5 mb-14">
              {cards.map(({ href, icon: Icon, label, desc, accent, badge }) => (
                <motion.div key={href} variants={fade}>
                  <Link href={href}
                    className="group block rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                    <div className="p-5" style={{ background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`, borderBottom: `1px solid ${accent}20` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg" style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
                          <Icon className="w-5 h-5" style={{ color: accent }} />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>{badge}</span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1">{label}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                    <div className="bg-dark-800 px-5 py-3 flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: accent }}>View {label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: accent }} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={fade}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                LinkedIn Recommendations
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {recommendations.map((r) => (
                  <div key={r.name} className="glass-card p-6">
                    <Quote className="w-8 h-8 text-blue-900 mb-3" />
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                    <div className="border-t border-white/8 pt-4">
                      <p className="font-semibold text-white text-sm">{r.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{r.title}</p>
                      <p className="text-gray-600 text-xs mt-1">{r.date} · SAP colleague</p>
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
