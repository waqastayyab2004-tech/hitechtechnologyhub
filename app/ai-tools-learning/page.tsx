'use client'

import Link from 'next/link'
import { Brain, ArrowRight, Clock, Star, Users, CheckCircle, BookOpen, Cpu, Zap } from 'lucide-react'

const courses = [
  {
    slug: 'claude-code',
    title: 'Claude Code 101',
    subtitle: 'AI-Powered Developer Workflow',
    description: "Anthropic's official agentic coding tool — understands your codebase, edits files, runs commands, and integrates with your developer tools. Mirrors the official Skilljar curriculum.",
    duration: '2h',
    level: 'Beginner',
    lessons: 13,
    rating: 5.0,
    students: '0+',
    isFree: true,
    isNew: true,
    icon: Brain,
    color: 'from-violet-600 to-purple-700',
    modules: [
      'What is Claude Code?',
      'Your first prompt',
      'Daily workflows',
      'Customizing Claude Code',
      'Quiz',
    ],
  },
]

const comingSoon = [
  { title: 'Cursor AI: Code Faster with AI Pair Programming', icon: Cpu, color: 'text-blue-400' },
  { title: 'GitHub Copilot: Enterprise AI Coding at Scale', icon: Zap, color: 'text-green-400' },
  { title: 'ChatGPT for Developers: Prompts That Ship Code', icon: BookOpen, color: 'text-orange-400' },
]

export default function AIToolsLearningPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">AI Tools Learning</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">AI Tools Learning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Learn the AI Tools That{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Professionals Use
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Practical, free courses on the AI coding and productivity tools reshaping how IT professionals and developers work. Each course is built from real daily use — not toy examples.
          </p>
        </div>

        {/* Available Courses */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-6">Available Now</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <Link
                  key={course.slug}
                  href={`/ai-tools-learning/${course.slug}`}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 hover:bg-white/8 transition-all duration-300"
                >
                  {course.isNew && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full uppercase">New</span>
                  )}
                  {course.isFree && (
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest bg-green-600/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full uppercase">Free</span>
                  )}

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 mt-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{course.title}</h3>
                  <p className="text-xs text-violet-400 font-medium mb-3">{course.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-5 leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
                  </div>

                  <ul className="space-y-1.5 mb-6">
                    {course.modules.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-violet-500 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                    Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-6">Coming Soon</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {comingSoon.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.title} className="bg-white/3 border border-white/8 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium leading-snug">{c.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">In development</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </main>
  )
}
