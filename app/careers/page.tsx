import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Briefcase, FileText, MessageSquare, BarChart2, ArrowRight, CheckCircle, Zap, Download, Monitor, Wrench, Shield, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Career Opportunity — Free Job Search Platform | HiTecH AI HUB',
  description: 'Find jobs, track applications, generate tailored resumes, and prepare for interviews — all in one free platform built for young professionals and job seekers.',
}

const FEATURES = [
  {
    href: '/careers/jobs',
    icon: Search,
    color: '#3b82f6',
    badge: 'Live Jobs',
    title: 'Find Job Openings',
    desc: 'Browse remote and global job listings aggregated from multiple boards. Search by role, category, and location — all in one place.',
    cta: 'Search Jobs',
  },
  {
    href: '/careers/resume',
    icon: BarChart2,
    color: '#8b5cf6',
    badge: 'AI Powered',
    title: 'Match & Score Your Resume',
    desc: 'Paste a job description and your resume to get an instant match score, skill gaps, and tailored recommendations.',
    cta: 'Score My Resume',
  },
  {
    href: '/careers/tracker',
    icon: Briefcase,
    color: '#06b6d4',
    badge: 'Free',
    title: 'Track Your Applications',
    desc: 'Manage every application from Saved → Applied → Interview → Offer in one organised dashboard. Never lose track.',
    cta: 'Open Tracker',
  },
  {
    href: '/careers/resume',
    icon: FileText,
    color: '#10b981',
    badge: 'AI Powered',
    title: 'Generate a Tailored Resume',
    desc: 'Upload your resume and a job description — get an ATS-optimised, tailored CV written specifically for that role.',
    cta: 'Generate Resume',
  },
  {
    href: '/careers/interview',
    icon: MessageSquare,
    color: '#f59e0b',
    badge: 'AI Powered',
    title: 'Prepare for Interviews',
    desc: 'Get role-specific interview questions with answer guidance, generated from the actual job description.',
    cta: 'Prep for Interview',
  },
]

const STEPS = [
  { n: '1', t: 'Find & Save Jobs', d: 'Browse aggregated listings and save the ones that match your goals.' },
  { n: '2', t: 'Score Your Fit',   d: 'Paste the job description with your resume and see exactly how well you match.' },
  { n: '3', t: 'Tailor Your CV',   d: 'Generate an ATS-ready resume customised to the specific role in seconds.' },
  { n: '4', t: 'Track & Prepare',  d: 'Log your applications and get ready for interviews — all in one place.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          100% Free · No Sign-up Required to Browse · No Credit Card
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Career{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">
            Opportunity
          </span>{' '}
          Hub
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-3 leading-relaxed">
          For young professionals, fresh graduates, and experienced job seekers.
        </p>
        <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop juggling multiple job boards, spreadsheets, and rewriting your resume from scratch. Find jobs, match your skills, generate tailored CVs, and prepare for interviews — all here, all free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/careers/jobs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            <Search className="w-4 h-4" /> Browse Jobs Now
          </Link>
          <Link href="/careers/tracker"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-all">
            Open My Tracker <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/6 bg-dark-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { v: '5',    l: 'Powerful Tools',      c: 'text-accent-blue' },
              { v: 'AI',   l: 'Resume & Interview',   c: 'text-violet-400' },
              { v: 'Free', l: 'Always, No Paywall',   c: 'text-emerald-400' },
              { v: '1',    l: 'Hub for Everything',   c: 'text-cyan-400' },
            ].map(s => (
              <div key={s.l}>
                <div className={`text-3xl font-black ${s.c}`}>{s.v}</div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#3b82f6' }}>Platform Features</p>
          <h2 className="text-2xl font-black text-white">Everything You Need in One Place</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Link key={f.title} href={f.href}
              className="group p-5 rounded-2xl border border-white/8 bg-dark-800/60 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
              style={{ borderTopWidth: 2, borderTopColor: `${f.color}50` }}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ color: f.color, background: `${f.color}12`, borderColor: `${f.color}30` }}>
                  {f.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1 group-hover:text-accent-blue transition-colors">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: f.color }}>
                {f.cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}

          {/* Who is it for card */}
          <div className="p-5 rounded-2xl border border-white/8 bg-dark-800/60 flex flex-col gap-3"
            style={{ borderTopWidth: 2, borderTopColor: '#10b98150' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#10b98115', border: '1px solid #10b98130' }}>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-2">Who Is This For?</h3>
              <ul className="space-y-1.5">
                {['Fresh graduates & young professionals', 'Experienced professionals switching roles', 'Anyone managing multiple applications', 'Job seekers wanting AI-powered tools'].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-400">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/6 bg-dark-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-black text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="p-5 rounded-2xl bg-dark-800/60 border border-white/6">
                <div className="text-3xl font-black text-accent-blue/30 font-mono mb-3">{s.n}</div>
                <h3 className="font-bold text-white text-sm mb-1">{s.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV Templates */}
      <section className="border-t border-white/6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-1">Free Downloads</p>
              <h2 className="text-2xl font-black text-white">Professional CV Templates</h2>
              <p className="text-sm text-gray-500 mt-1">Industry-specific Word templates built by a senior IT practitioner.</p>
            </div>
            <span className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black bg-green-500/15 border border-green-500/30 text-green-400 uppercase tracking-widest">100% Free · No Sign-up</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {([
              { file: 'CV-IT-Support-Engineer-L1-L2.docx', title: 'IT Support Engineer',   level: 'L1 / L2',           Icon: Monitor,  color: 'text-sky-400',    border: 'border-sky-500/25',    bg: 'bg-sky-500/8',    desc: 'First IT role or L1→L2 move. Covers ServiceNow, M365, AD.', exp: 'Entry Level · 0–3 yrs' },
              { file: 'CV-Senior-IT-Engineer.docx',        title: 'Senior IT Engineer',     level: 'Senior / Lead',      Icon: Wrench,   color: 'text-blue-400',   border: 'border-blue-500/25',   bg: 'bg-blue-500/8',   desc: 'Targets IT manager or specialist roles at multinationals.',  exp: 'Senior · 8+ yrs' },
              { file: 'CV-Azure-Security-Engineer.docx',   title: 'Azure Security Engineer',level: 'Security / Cloud',   Icon: Shield,   color: 'text-red-400',    border: 'border-red-500/25',    bg: 'bg-red-500/8',    desc: 'Zero Trust, Defender, Conditional Access highlights.',      exp: 'Mid–Senior · 5+ yrs' },
              { file: 'CV-IT-Consultant.docx',             title: 'IT Consultant',           level: 'Consulting / ITSM', Icon: Briefcase,color: 'text-purple-400',  border: 'border-purple-500/25', bg: 'bg-purple-500/8', desc: 'Freelance & contract roles. ITSM, ServiceNow, clients.',    exp: 'All Levels' },
              { file: 'CV-Career-Change-Into-IT.docx',     title: 'Career Change into IT',   level: 'Beginner / Switcher',Icon: Rocket,  color: 'text-emerald-400',border: 'border-emerald-500/25',bg: 'bg-emerald-500/8',desc: 'Highlights transferable skills and IT certifications.',      exp: 'Career Switcher' },
            ] as const).map(t => (
              <a key={t.file} href={`/cv-templates/${t.file}`} download
                className={`flex flex-col gap-3 p-4 rounded-xl border ${t.border} ${t.bg} hover:-translate-y-0.5 transition-all duration-200 group`}>
                <div className="flex items-center justify-between">
                  <t.Icon className={`w-6 h-6 ${t.color}`} />
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${t.border} ${t.color}`}>{t.level}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs mb-1 group-hover:underline">{t.title}</p>
                  <p className="text-gray-500 text-[10px] leading-snug mb-2">{t.desc}</p>
                  <p className="text-[9px] text-gray-600">{t.exp}</p>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold mt-auto ${t.color}`}>
                  <Download className="w-3 h-3" /> Download .docx
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-accent-blue/10 to-cyan-400/5 border border-accent-blue/20 p-8 text-center">
          <h3 className="text-xl font-black text-white mb-2">Start Your Smarter Job Search</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">Completely free. No account required to browse jobs. Use the AI tools whenever you need them.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/careers/jobs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)]">
              <Search className="w-4 h-4" /> Browse Jobs
            </Link>
            <Link href="/careers/resume"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-all">
              <BarChart2 className="w-4 h-4" /> Score My Resume
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
