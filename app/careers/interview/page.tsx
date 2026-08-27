'use client'

import Link from 'next/link'
import { ChevronLeft, ExternalLink, MessageSquare, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { useState } from 'react'

const SECTIONS = [
  {
    category: 'Technical',
    color: '#3b82f6',
    questions: [
      { q: 'Walk me through your experience with [technology on the JD].', hint: 'Be specific — name the version, scale of deployment, and a measurable outcome. Gulf employers value hands-on depth over theoretical knowledge.' },
      { q: 'How have you handled a major system outage or critical incident?', hint: 'Use the STAR format. Emphasise your communication with stakeholders, speed of response, and the post-incident review. In KSA, enterprise SLA adherence is a top concern.' },
      { q: 'Describe your experience with cloud platforms (AWS / Azure / GCP).', hint: 'Name specific services you have used in production, not just studied. Certifications are a strong signal — mention them. Vision 2030 projects heavily favour cloud-first candidates.' },
      { q: 'What is your approach to IT security and compliance?', hint: 'Reference frameworks like ISO 27001, NESA, or NCA (Saudi National Cybersecurity Authority). Showing local regulatory awareness is a strong differentiator in KSA.' },
    ],
  },
  {
    category: 'Behavioural',
    color: '#8b5cf6',
    questions: [
      { q: 'Tell me about a time you led a cross-functional team through a complex IT project.', hint: 'Highlight stakeholder management, timeline delivery, and how you handled cultural and language differences. In Gulf organisations, relationship-building (wasta culture) is often as important as technical skill.' },
      { q: 'Describe a situation where you had to manage a difficult stakeholder or client.', hint: 'Show patience and diplomacy. In the Middle East, direct confrontation is avoided — demonstrate that you de-escalated gracefully and reached a collaborative outcome.' },
      { q: 'Give an example of adapting quickly to a new technology or process.', hint: 'Gulf IT environments change rapidly with Vision 2030 digital transformation. Show learning agility — mention self-study, certifications, or on-the-job upskilling.' },
      { q: 'How have you handled working in a multicultural team?', hint: 'Almost universal in GCC organisations. Demonstrate cultural sensitivity, inclusive communication, and experience managing or collaborating with diverse nationalities.' },
    ],
  },
  {
    category: 'HR & General',
    color: '#10b981',
    questions: [
      { q: 'Why do you want to work in Saudi Arabia / the Gulf region?', hint: 'Be genuine but also practical. Mention career growth, the scale of Vision 2030 projects, or specific sector interest (NEOM, ARAMCO, banking, telecom). Avoid only mentioning salary.' },
      { q: 'What are your salary expectations?', hint: 'Research market rates on Bayt.com or GulfTalent first. Quote a range, not a fixed number. Remember: Gulf packages often include housing, transport, and medical allowances — factor these in.' },
      { q: 'Where do you see yourself in 3–5 years?', hint: 'Align with the employer\'s growth trajectory. If interviewing at a Vision 2030-aligned org, mention contributing to national digital transformation goals.' },
      { q: 'Do you have a valid Iqama / work permit, or will you require visa sponsorship?', hint: 'Be clear and factual. If you need sponsorship, confirm you understand the process and timeline. Many Gulf employers prefer candidates already on a transferable Iqama.' },
    ],
  },
]

const CULTURE_TIPS = [
  { title: 'Dress Code', body: 'Formal business attire for all interviews — even virtual ones. Conservative is always safer in KSA.' },
  { title: 'Greetings', body: 'A firm handshake is standard with male interviewers. Wait for female interviewers to initiate. Use "Mr/Dr + surname" until invited to use first names.' },
  { title: 'Timing', body: 'Arrive 10–15 minutes early. Punctuality signals professionalism. Prayer times may affect interview scheduling — be flexible.' },
  { title: 'Humility + Confidence', body: 'Balance confidence with humility. Boasting is poorly received. Let your achievements speak through specific examples, not self-praise.' },
  { title: 'Wasta & Referrals', body: 'Referrals carry weight in Gulf hiring. If you have a mutual contact at the company, mention it respectfully at the start.' },
]

const RESOURCES = [
  { name: 'Bayt.com Interview Tips', desc: 'Gulf-specific interview preparation guides', url: 'https://www.bayt.com/en/career-article/' },
  { name: 'GulfTalent Advice', desc: 'Salary benchmarks and career guides for GCC IT roles', url: 'https://www.gulftalent.com/resources/advice' },
  { name: 'LinkedIn Interview Prep', desc: 'Free AI interview practice with feedback', url: 'https://www.linkedin.com/interview-prep/' },
  { name: 'Glassdoor — Saudi Arabia', desc: 'Real interview questions from candidates at Gulf companies', url: 'https://www.glassdoor.com/Interview/saudi-arabia-interview-questions-SRCH_IL.0,12_IN195.htm' },
  { name: 'ITIL & ITSM Foundation', desc: 'Widely demanded certification across KSA enterprise IT', url: 'https://www.axelos.com/certifications/itil-service-management' },
  { name: 'AWS Training & Certification', desc: 'Cloud skills in high demand across Vision 2030 projects', url: 'https://aws.amazon.com/training/' },
]

export default function InterviewPage() {
  const [openIdx, setOpenIdx] = useState<string | null>(null)

  const toggle = (key: string) => setOpenIdx(openIdx === key ? null : key)

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Career Hub
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Interview Preparation</h1>
              <p className="text-gray-500 text-sm">Middle East IT sector — common questions, cultural tips, and key resources</p>
            </div>
          </div>
        </div>

        {/* Question sections */}
        <div className="space-y-6 mb-10">
          {SECTIONS.map(section => (
            <div key={section.category}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: section.color }}>{section.category} Questions</p>
              <div className="space-y-2">
                {section.questions.map((item, i) => {
                  const key = `${section.category}-${i}`
                  return (
                    <div key={key} className="rounded-xl border border-white/8 bg-dark-800/60 overflow-hidden">
                      <button onClick={() => toggle(key)}
                        className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/3 transition-colors">
                        <span className="text-xs font-black font-mono flex-shrink-0 mt-0.5" style={{ color: section.color }}>Q{i + 1}</span>
                        <p className="flex-1 text-sm text-white font-semibold leading-snug">{item.q}</p>
                        {openIdx === key
                          ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />}
                      </button>
                      {openIdx === key && (
                        <div className="px-4 pb-4">
                          <div className="p-3 rounded-lg border-l-2 bg-dark-900/60" style={{ borderColor: section.color }}>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: section.color }}>Answer Guidance</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.hint}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Culture tips */}
        <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-white">Gulf Interview Culture Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CULTURE_TIPS.map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-dark-800/60 border border-white/6">
                <p className="text-xs font-bold text-amber-300 mb-1">{t.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
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
