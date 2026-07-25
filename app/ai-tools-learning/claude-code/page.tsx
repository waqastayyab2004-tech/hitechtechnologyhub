'use client'

import Link from 'next/link'
import { Brain, Clock, Star, Users, CheckCircle, ArrowRight, Play, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
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
                <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase bg-green-600/15 border border-green-500/30 px-2 py-0.5 rounded-full">Free</span>
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
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center mb-5">
                <Brain className="w-12 h-12 text-white/60" />
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-white">Free</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">No sign-up required</p>

              <Link
                href="/training/121"
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-5 rounded-xl transition-colors mb-3"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>

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
