'use client'

import Link from 'next/link'
import { Brain, ArrowRight, Clock, Star, Users, CheckCircle, BookOpen, Cpu, Zap, TrendingUp, Building2, Target, DollarSign } from 'lucide-react'

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

const impacts = [
  { icon: TrendingUp, color: 'text-green-400 bg-green-400/10', title: 'Real Business Growth', desc: 'AI that drives measurable outcomes — reduced costs, faster decisions, higher output. Not chatbot demos.' },
  { icon: DollarSign, color: 'text-yellow-400 bg-yellow-400/10', title: 'Reduce AI Token Costs', desc: 'Most companies overspend on AI by 60–80%. Learn to architect prompts, cache responses and right-size models for your workload.' },
  { icon: Building2, color: 'text-blue-400 bg-blue-400/10', title: 'Corporate AI Sessions', desc: 'Live training for your team — from zero to deployed AI workflows. Tailored to your industry, tools and existing processes.' },
  { icon: Target, color: 'text-violet-400 bg-violet-400/10', title: 'AI for Your Use Case', desc: 'Every business is different. Get a roadmap built around your specific workflows — not generic AI advice.' },
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

          {/* Enterprise value message */}
          <p className="text-xl text-gray-200 font-medium mb-3 max-w-3xl">
            Forget the hype — every course here is built from real enterprise deployments, practical AI implementation that solves actual business problems, not chatbot demos or toy examples.
          </p>
          <p className="text-base text-violet-300 italic max-w-3xl mb-5 leading-relaxed">
            &ldquo;Most companies are using AI like a search engine. The ones winning are using it as an operational layer — automating the repeated, accelerating the complex, and freeing humans to focus on what actually builds the business.&rdquo;
          </p>
          <p className="text-base text-gray-300 max-w-3xl leading-relaxed mb-6">
            These courses teach you how to implement AI tools around <span className="text-white font-semibold">your specific use case</span>, not generic prompts that work in a demo and fail in production. Whether you are an IT professional, a team lead, or an enterprise decision-maker, you will learn how to deploy AI that measurably reduces operational cost, eliminates repetitive workload, and delivers real business impact. Let humans focus on strategy, growth and the decisions that matter — and let AI handle everything else.
          </p>

          <p className="text-sm text-gray-400 max-w-2xl">
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
                  <p className="text-sm text-gray-300 mb-5 leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
                  </div>

                  <ul className="space-y-1.5 mb-6">
                    {course.modules.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-xs text-gray-300">
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
        <section className="mb-20">
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
                    <p className="text-xs text-gray-500 mt-0.5">In development</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Enterprise AI Consulting Section */}
        <section className="border-t border-white/8 pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Enterprise AI Consulting</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Beyond the Chatbot.<br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Real AI Impact for Your Business.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Most businesses are paying for AI tools they barely use — or using them wrong. I help enterprises identify where AI creates genuine operational value, implement it correctly, and measure the results.
            </p>
          </div>

          {/* Impact grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {impacts.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white/4 border border-white/8 rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Consulting CTA */}
          <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/30 border border-violet-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-2">Corporate AI Sessions Available</p>
              <h3 className="text-2xl font-bold text-white mb-3">Let AI work. Let humans build.</h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &ldquo;Stop investing time in tasks AI can do in seconds. Invest that time back into the processes, decisions and relationships that only humans can drive. That&apos;s where real business growth happens.&rdquo;
              </p>
              <p className="text-gray-400 text-sm mt-3">
                Engagements available across corporate AI training, tool audits, implementation consulting and enterprise AI strategy roadmaps.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap text-center justify-center">
                View AI Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

