'use client'

import Link from 'next/link'
import { Clock, Star, Users, CheckCircle, Play, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const modules = [
  {
    title: 'What is Claude Code?',
    lessons: [
      { title: 'What is Claude Code?', desc: 'Agentic coding tool overview — how it differs from Claude.ai' },
      { title: 'How Claude Code works', desc: 'Files, terminal commands, the agentic loop, and self-correction' },
    ],
  },
  {
    title: 'Your first prompt',
    lessons: [
      { title: 'Installing Claude Code', desc: 'npm install, API key, PATH setup — running in under 10 minutes' },
      { title: 'Your first prompt', desc: 'Launch in a project, approve a plan, and get real output' },
    ],
  },
  {
    title: 'Daily workflows',
    lessons: [
      { title: 'The explore → plan → code → commit workflow', desc: 'The four-step cycle used by professional developers daily' },
      { title: 'Context management', desc: 'Keeping Claude focused and accurate in large codebases' },
      { title: 'Code review', desc: 'Using Claude to review, critique, and improve its own output' },
    ],
  },
  {
    title: 'Customizing Claude Code',
    lessons: [
      { title: 'The CLAUDE.md file', desc: 'Teaching Claude your stack, rules, and conventions permanently' },
      { title: 'Subagents', desc: 'Spawning parallel Claude instances for independent tasks' },
      { title: 'Skills', desc: 'Saving reusable slash commands for repeated workflows' },
      { title: 'MCP', desc: 'Connecting Claude to email, calendars, APIs, and databases' },
      { title: 'Hooks', desc: 'Running shell commands automatically before or after Claude acts' },
    ],
  },
  {
    title: 'Quiz',
    lessons: [
      { title: 'Course quiz', desc: 'Test your knowledge across all four modules' },
    ],
  },
]

export default function ClaudeCodeCoursePage() {
  const [openModule, setOpenModule] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/ai-tools-learning" className="hover:text-white transition-colors">AI Tools Learning</Link>
          <span>/</span>
          <span className="text-white">Claude Code 101</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase bg-violet-600/15 border border-violet-500/30 px-2 py-0.5 rounded-full">AI & Automation</span>
                <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase bg-orange-600/15 border border-orange-500/30 px-2 py-0.5 rounded-full">$ Paid</span>
                <span className="text-[10px] font-bold tracking-widest text-yellow-400 uppercase bg-yellow-600/15 border border-yellow-500/30 px-2 py-0.5 rounded-full">New</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Claude Code 101</h1>
              <p className="text-violet-400 font-medium mb-4">AI-Powered Developer Workflow</p>
              <p className="text-gray-400 leading-relaxed">
                The complete beginner course for Claude Code — Anthropic&apos;s agentic coding tool that understands your codebase, edits files, runs commands, and integrates with your developer tools. Mirrors the official Anthropic Skilljar curriculum.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-5 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-400" /> 2 hours</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-violet-400" /> 5 modules · 13 lessons</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 5.0</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-violet-400" /> Beginner</span>
            </div>

            {/* What you'll learn */}
            <div className="bg-white/4 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-base font-bold text-white mb-4">What you&apos;ll learn</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  'What Claude Code is and how it differs from Claude.ai',
                  'Install Claude Code and run your first prompt in minutes',
                  'Apply the explore → plan → code → commit daily workflow',
                  'Manage context in large codebases without losing focus',
                  'Customise with CLAUDE.md, Subagents, Skills, MCP, and Hooks',
                  'Pass the official course quiz with confidence',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-white mb-4">Course curriculum</h2>
              <div className="space-y-2">
                {modules.map((mod, i) => (
                  <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 bg-white/4 hover:bg-white/6 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/30 text-[10px] font-bold text-violet-400 flex items-center justify-center">{i + 1}</span>
                        <span className="text-sm font-semibold text-white">{mod.title}</span>
                        <span className="text-xs text-gray-500">{mod.lessons.length} {mod.lessons.length === 1 ? 'lesson' : 'lessons'}</span>
                      </div>
                      {openModule === i ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>
                    {openModule === i && (
                      <div className="divide-y divide-white/5">
                        {mod.lessons.map((lesson, j) => (
                          <div key={j} className="flex items-start gap-3 px-5 py-3.5 bg-white/2">
                            <Play className="w-3.5 h-3.5 text-violet-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm text-gray-200">{lesson.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{lesson.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-4">Instructor</h2>
              <div className="flex items-center gap-4">
                <img src="/waqas-trainer.jpg" alt="Syed Waqas Tayyab" className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/30" />
                <div>
                  <p className="text-sm font-bold text-white">Syed Waqas Tayyab</p>
                  <p className="text-xs text-violet-400 mt-0.5">IT Engineer · AI Tools Educator · Riyadh, KSA</p>
                  <p className="text-xs text-gray-500 mt-1">15+ years enterprise IT · SAP · daily Claude Code user</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white/5 border border-violet-500/20 rounded-2xl p-6">
              {/* Real Claude Code terminal photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/claude-code-terminal.jpg" alt="Claude Code terminal" className="w-full aspect-video object-cover rounded-xl mb-5 border border-white/10" />

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-white">$</span>
                <span className="text-sm text-gray-400">Contact for pricing</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">WhatsApp or email to enrol · Limited seats</p>

              <a
                href="https://wa.me/966505803073?text=Hi%20Waqas%2C%20I'm%20interested%20in%20the%20Claude%20Code%20101%20course.%20Can%20you%20send%20me%20the%20details%20and%20price%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-5 rounded-xl transition-colors mb-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>

              <a
                href="mailto:waqastayyab2004@gmail.com?subject=Claude%20Code%20101%20Course%20Enquiry&body=Hi%20Waqas%2C%20I'm%20interested%20in%20the%20Claude%20Code%20101%20course.%20Please%20send%20me%20the%20pricing%20and%20schedule."
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-5 rounded-xl transition-colors mb-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Email Us
              </a>

              <Link
                href="/ai-tools-learning"
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 text-sm py-2.5 px-5 rounded-xl transition-colors border border-white/10"
              >
                ← Back to AI Tools Learning
              </Link>

              <div className="mt-6 space-y-2.5 text-xs text-gray-400">
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-violet-400" /> 2 hours total</div>
                <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-violet-400" /> 5 modules · 13 lessons</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-violet-400" /> Official Anthropic Skilljar curriculum</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-violet-400" /> Beginner friendly</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-violet-400" /> Course quiz included</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
