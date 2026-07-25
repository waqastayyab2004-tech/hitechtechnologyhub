'use client'

import { motion } from 'framer-motion'
import { Cpu, Star } from 'lucide-react'
import Link from 'next/link'
import SapSidebar from '../SapSidebar'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate'

interface Skill {
  name: string
  proficiency: Proficiency
}

interface SkillGroup {
  group: string
  color: string
  dot: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    group: 'SAP Platform',
    color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-600',
    skills: [
      { name: 'SAP S/4HANA',       proficiency: 'Expert'       },
      { name: 'SAP BTP',            proficiency: 'Advanced'     },
      { name: 'SAP ISP',            proficiency: 'Expert'       },
      { name: 'SAP Ariba',          proficiency: 'Advanced'     },
      { name: 'SAP Build',          proficiency: 'Advanced'     },
      { name: 'SAP Basis',          proficiency: 'Intermediate' },
    ],
  },
  {
    group: 'SAP AI & Data',
    color: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800',
    dot: 'bg-violet-600',
    skills: [
      { name: 'SAP AI Launchpad',          proficiency: 'Advanced'     },
      { name: 'SAP AI Core',               proficiency: 'Advanced'     },
      { name: 'SAP Generative AI Hub',     proficiency: 'Advanced'     },
      { name: 'SAP HANA Cloud',            proficiency: 'Advanced'     },
      { name: 'Python ML for SAP HANA',    proficiency: 'Advanced'     },
      { name: 'SAP Analytics Cloud',       proficiency: 'Advanced'     },
    ],
  },
  {
    group: 'SAP Integrations',
    color: 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800',
    dot: 'bg-sky-600',
    skills: [
      { name: 'SAP–ServiceNow',   proficiency: 'Expert'       },
      { name: 'SAP–Microsoft 365', proficiency: 'Expert'       },
      { name: 'SAP–Power BI',     proficiency: 'Advanced'     },
      { name: 'SAP–Azure AD',     proficiency: 'Expert'       },
    ],
  },
]

const proficiencyConfig: Record<Proficiency, { label: string; bar: string; pct: string }> = {
  Expert:       { label: 'Expert',       bar: 'bg-blue-600',   pct: '100%' },
  Advanced:     { label: 'Advanced',     bar: 'bg-violet-500', pct: '80%'  },
  Intermediate: { label: 'Intermediate', bar: 'bg-sky-400',    pct: '60%'  },
}

export default function SapSkillsClient() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-blue-900 text-white pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sap" className="text-sky-200 hover:text-white text-sm transition-colors">SAP Hub</Link>
            <span className="text-sky-300 text-sm">/</span>
            <span className="text-white text-sm font-medium">Skills & Tools</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Cpu className="w-9 h-9 text-sky-300" /> SAP Skills & Tools
          </h1>
          <p className="text-sky-100 text-lg">16 SAP-specific skills across Platform, AI & Data, and Integrations — built across 11 years at SAP Saudi Arabia</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-10">
        <SapSidebar />

        <main className="flex-1 min-w-0">
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* Legend */}
            <motion.div variants={fade} className="flex items-center gap-5 mb-8 flex-wrap">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Proficiency:</p>
              {(Object.entries(proficiencyConfig) as [Proficiency, typeof proficiencyConfig[Proficiency]][]).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cfg.bar}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{cfg.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Skill groups */}
            <div className="space-y-8 mb-12">
              {skillGroups.map((group) => (
                <motion.div key={group.group} variants={fade} className={`border rounded-2xl p-6 ${group.color}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-3 h-3 rounded-full ${group.dot}`} />
                    <h2 className="font-bold text-slate-900 dark:text-white text-lg">{group.group}</h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">{group.skills.length} skills</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {group.skills.map((skill) => {
                      const cfg = proficiencyConfig[skill.proficiency]
                      return (
                        <div key={skill.name} className="bg-white dark:bg-slate-900 rounded-xl px-4 py-3 border border-white/80 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-800 dark:text-white">{skill.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{cfg.label}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: cfg.pct }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Context note */}
            <motion.div variants={fade} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-950/40 p-2.5 rounded-xl shrink-0">
                <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Built from Real SAP Work</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  These skills were developed through 11+ years working inside SAP as the IT SPOC for Saudi Arabia — not classroom theory. Every tool here was deployed, configured, and troubleshot in a live SAP enterprise environment serving 500+ users across multiple cities.
                </p>
                <Link href="/sap/experience" className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 inline-block hover:underline">
                  View full experience →
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  )
}
