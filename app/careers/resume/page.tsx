'use client'

import Link from 'next/link'
import { ChevronLeft, ExternalLink, CheckCircle, AlertCircle, FileText, Star } from 'lucide-react'

const TIPS = [
  {
    title: 'CV vs Resume — Use a CV in the Gulf',
    body: 'In Saudi Arabia and the wider GCC, employers expect a full CV (2–3 pages) rather than a one-page resume. Include a professional photo, nationality, date of birth, marital status, and visa/Iqama status — these are standard here.',
    type: 'do',
  },
  {
    title: 'Lead with a Strong Professional Summary',
    body: 'Write 3–4 lines at the top summarising your role, years of experience, and key technologies. Gulf recruiters shortlist CVs in seconds — a clear summary is your hook.',
    type: 'do',
  },
  {
    title: 'List Your Certifications Prominently',
    body: 'In the Middle East IT market, certifications carry significant weight. Place AWS, Azure, CISSP, ITIL, PMP, Cisco (CCNA/CCNP), or SAP certifications near the top of your CV.',
    type: 'do',
  },
  {
    title: 'Quantify Everything',
    body: 'Use numbers: "Reduced system downtime by 40%", "Managed a 12-person team", "Deployed infrastructure for 5,000 users". Gulf employers respond to measurable achievements.',
    type: 'do',
  },
  {
    title: 'Mention Saudi Vision 2030 Alignment',
    body: 'If your skills align with Vision 2030 sectors — digital transformation, cloud, cybersecurity, AI, smart cities — call that out explicitly. NEOM, ROSHN, and government IT projects actively seek these profiles.',
    type: 'do',
  },
  {
    title: 'Avoid Generic Phrases',
    body: '"Hardworking team player" and "excellent communication skills" waste space. Replace with specific tools, platforms, and outcomes: "Led SAP S/4HANA migration for 800-user enterprise".',
    type: 'avoid',
  },
]

const ATS_TIPS = [
  'Use standard section headings: Experience, Education, Certifications, Skills',
  'Avoid tables, columns, headers/footers — ATS systems often miss them',
  'Save as .docx or PDF — check the job posting for preference',
  'Mirror keywords from the job description naturally in your CV',
  'Use full names for acronyms first use: "ServiceNow (SNOW)"',
]

const RESOURCES = [
  { name: 'Bayt.com Career Advice', desc: 'Gulf-specific CV guides, salary benchmarks, and career articles', url: 'https://www.bayt.com/en/career-article/' },
  { name: 'GulfTalent Career Resources', desc: 'Salary reports, CV tips, and hiring trends across GCC', url: 'https://www.gulftalent.com/resources/advice' },
  { name: 'LinkedIn Resume Builder', desc: 'Build and optimise your profile for Gulf recruiters', url: 'https://www.linkedin.com/help/linkedin/answer/a567201' },
  { name: 'Naukrigulf Career Hub', desc: 'IT-specific job market insights for Saudi Arabia & UAE', url: 'https://www.naukrigulf.com/advice' },
  { name: 'CV-Library Middle East Guide', desc: 'Practical CV formatting guide for Middle East applications', url: 'https://www.cv-library.co.uk/career-advice/cv/' },
  { name: 'Saudi CITC — IT Sector Overview', desc: 'Official Saudi IT regulator — understand the local tech landscape', url: 'https://www.citc.gov.sa/en/Pages/default.aspx' },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">CV & Resume Guide</h1>
              <p className="text-gray-500 text-sm">Middle East IT sector — practical advice for Gulf job applications</p>
            </div>
          </div>
        </div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {TIPS.map((tip, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${tip.type === 'do' ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
              <div className="flex items-start gap-3">
                {tip.type === 'do'
                  ? <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  : <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                }
                <div>
                  <p className={`font-bold text-sm mb-1 ${tip.type === 'do' ? 'text-emerald-300' : 'text-red-300'}`}>{tip.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{tip.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ATS section */}
        <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-white">ATS Optimisation Tips</h2>
            <span className="text-xs text-blue-400 bg-blue-500/15 border border-blue-500/25 px-2 py-0.5 rounded-full">Beat the Bots</span>
          </div>
          <ul className="space-y-2">
            {ATS_TIPS.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-400 font-bold flex-shrink-0 text-xs mt-0.5">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Further Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RESOURCES.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-dark-800/60 hover:border-white/20 hover:bg-dark-800 transition-all">
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-accent-blue flex-shrink-0 mt-0.5 transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-accent-blue transition-colors">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
