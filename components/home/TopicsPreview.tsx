import Link from 'next/link'
import { ArrowRight, Brain, Zap, Shield, Cloud, Code, Network, Terminal, Server, Mail, Globe, Container, GitBranch, Lightbulb } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const topics = [
  { icon: Brain, label: 'Artificial Intelligence', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Zap, label: 'Automation', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Shield, label: 'Cybersecurity', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Cloud, label: 'Cloud Computing', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Code, label: 'Programming', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Network, label: 'Networking', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
]

export default function TopicsPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-12">
        <h2 className="section-heading">Explore Topics</h2>
        <p className="section-subheading">
          Deep-dive content across the technologies shaping modern IT.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <ScrollReveal key={topic.label} delay={i * 0.07}>
            <Link
              href="/topics"
              className="glass-card-hover p-5 flex items-center gap-4 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${topic.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <topic.icon className={`w-5 h-5 ${topic.color}`} />
              </div>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                {topic.label}
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4} className="text-center mt-8">
        <Link href="/topics" className="btn-outline inline-flex">
          See All 12 Topics <ArrowRight className="w-4 h-4" />
        </Link>
      </ScrollReveal>
    </section>
  )
}
