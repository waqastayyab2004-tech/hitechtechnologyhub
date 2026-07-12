'use client'

import Link from 'next/link'
import { Briefcase, GraduationCap, FolderOpen, ArrowRight } from 'lucide-react'

export default function WelcomeBanner() {
  return (
    <section className="w-full border-b border-white/5 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Centre — tagline pill like "AI + HUMAN COLLABORATION" */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.25)' }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black tracking-widest uppercase text-cyan-400">
                IT Consulting · AI Automation · Free Courses · Real-World Insights
              </span>
            </div>
          </div>

          {/* Right — quick nav links */}
          <div className="flex flex-wrap items-center justify-center gap-2 flex-shrink-0">
            <Link href="/services"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-all">
              <Briefcase className="w-3 h-3" /> Services
            </Link>
            <Link href="/training"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
              <GraduationCap className="w-3 h-3" /> Free Courses
            </Link>
            <Link href="/projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-500/10 border border-purple-500/25 text-purple-400 hover:bg-purple-500/20 transition-all">
              <FolderOpen className="w-3 h-3" /> Projects
            </Link>
            <Link href="/about"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/12 text-gray-300 hover:bg-white/10 transition-all">
              Portfolio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
