import Link from 'next/link'
import { Search, Briefcase, FileText, MessageSquare, BarChart2, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const FEATURES = [
  { href: '/careers/jobs',      icon: Search,        color: '#3b82f6', label: 'Find Jobs',        desc: 'Remote listings from multiple boards' },
  { href: '/careers/resume',    icon: BarChart2,     color: '#8b5cf6', label: 'Match Resume',     desc: 'AI scores your CV against the role' },
  { href: '/careers/tracker',   icon: Briefcase,     color: '#06b6d4', label: 'Track Apps',       desc: 'Saved → Applied → Offer pipeline' },
  { href: '/careers/resume',    icon: FileText,      color: '#10b981', label: 'Generate CV',      desc: 'ATS-optimised tailored resume' },
  { href: '/careers/interview', icon: MessageSquare, color: '#f59e0b', label: 'Interview Prep',   desc: 'Role-specific questions + answers' },
]

export default function CareerCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.03), transparent)' }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Career Opportunity</p>
            <h2 className="text-3xl font-black text-white">Free Job Search Platform</h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              For young professionals and job seekers — find jobs, match your resume, track applications, generate tailored CVs, and prepare for interviews. All free, all here.
            </p>
          </div>
          <Link href="/careers"
            className="btn-outline text-sm inline-flex items-center gap-2 flex-shrink-0 border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
            Open Career Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.label} delay={i * 0.07}>
              <Link href={f.href}
                className="glass-card p-4 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-200 group h-full border border-white/6 hover:border-white/16"
                style={{ borderTopWidth: 2, borderTopColor: `${f.color}50` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon className="w-4 h-4" style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-white text-xs font-bold mb-0.5 group-hover:text-blue-400 transition-colors">{f.label}</h3>
                  <p className="text-gray-500 text-xs leading-snug">{f.desc}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Free badge row */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Free — No Account Required
            </span>
            <span className="text-xs text-gray-600">AI-powered resume tools · Application tracker · Interview prep</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
