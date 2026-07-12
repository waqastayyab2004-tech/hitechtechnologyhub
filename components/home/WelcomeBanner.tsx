'use client'

import Link from 'next/link'
import { Briefcase, GraduationCap, FolderOpen, ArrowRight, Zap } from 'lucide-react'

export default function WelcomeBanner() {
  return (
    <section className="w-full border-b border-white/5"
      style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(8,14,24,0.95) 50%, rgba(139,92,246,0.06) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left — site purpose */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-accent-blue" />
            </div>
            <div>
              <p className="text-white font-black text-sm">HiTecH Technology HUB</p>
              <p className="text-gray-400 text-xs">IT Consulting · Free IT Courses · AI Automation · Real-World Tech Insights</p>
            </div>
          </div>

          {/* Right — quick links */}
          <div className="flex flex-wrap items-center justify-center gap-2 flex-shrink-0">
            <Link href="/services"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-all">
              <Briefcase className="w-3.5 h-3.5" /> IT Services
            </Link>
            <Link href="/training"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
              <GraduationCap className="w-3.5 h-3.5" /> Free Courses
            </Link>
            <Link href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-purple-500/10 border border-purple-500/25 text-purple-400 hover:bg-purple-500/20 transition-all">
              <FolderOpen className="w-3.5 h-3.5" /> Projects
            </Link>
            <Link href="/about"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10 transition-all">
              Portfolio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
