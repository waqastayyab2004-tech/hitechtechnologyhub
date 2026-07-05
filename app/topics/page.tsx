import type { Metadata } from 'next'
import { Brain, Zap, Shield, Cloud, Code, Network, Terminal, Server, Mail, Globe, Container, Lightbulb } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Explore all technology topics — AI, Automation, Cybersecurity, Cloud Computing, Programming, Networking and more.',
}

const topics = [
  {
    icon: Brain,
    label: 'Artificial Intelligence',
    description: 'Machine learning, LLMs, AI APIs, prompt engineering, and practical AI applications for IT professionals.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    count: '12 articles',
  },
  {
    icon: Zap,
    label: 'Automation',
    description: 'Workflow automation, Python scripts, n8n, Make.com, cron jobs, and building automated pipelines.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    count: '8 articles',
  },
  {
    icon: Shield,
    label: 'Cybersecurity',
    description: 'Security fundamentals, threat detection, network security, zero trust, and best practices for IT teams.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    count: '6 articles',
  },
  {
    icon: Cloud,
    label: 'Cloud Computing',
    description: 'Azure, AWS, hybrid cloud architectures, cloud migration strategies, and cost optimization.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    count: '10 articles',
  },
  {
    icon: Code,
    label: 'Programming',
    description: 'Python, TypeScript, bash scripting, REST APIs, and code patterns for modern IT workflows.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]',
    count: '15 articles',
  },
  {
    icon: Network,
    label: 'Networking',
    description: 'TCP/IP, DNS, VLANs, firewalls, VPNs, and enterprise network design and troubleshooting.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
    count: '7 articles',
  },
  {
    icon: Terminal,
    label: 'Linux',
    description: 'Linux administration, shell scripting, system hardening, process management, and DevOps tooling.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    count: '9 articles',
  },
  {
    icon: Server,
    label: 'Windows Server',
    description: 'Active Directory, Group Policy, WSUS, Hyper-V, and enterprise Windows Server administration.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]',
    count: '8 articles',
  },
  {
    icon: Mail,
    label: 'Microsoft 365',
    description: 'Exchange Online, SharePoint, Teams, OneDrive, Intune, and Microsoft 365 admin best practices.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]',
    count: '11 articles',
  },
  {
    icon: Globe,
    label: 'Azure',
    description: 'Azure services, IaaS/PaaS, Azure AD, Entra ID, Azure DevOps, BTP, and cloud-native development.',
    color: 'text-blue-300',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    glow: 'hover:shadow-[0_0_20px_rgba(147,197,253,0.2)]',
    count: '14 articles',
  },
  {
    icon: Container,
    label: 'DevOps',
    description: 'CI/CD pipelines, Docker, Kubernetes, GitHub Actions, infrastructure as code, and SRE practices.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]',
    count: '10 articles',
  },
  {
    icon: Lightbulb,
    label: 'IT Tips',
    description: 'Productivity hacks, troubleshooting guides, tool recommendations, and real-world IT advice.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    count: '20 articles',
  },
]

export default function TopicsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          All <span className="gradient-text">Topics</span>
        </h1>
        <p className="section-subheading">
          Practical content across 12 technology domains — from AI to Windows Server.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {topics.map((topic, i) => (
          <ScrollReveal key={topic.label} delay={i * 0.05}>
            <div className={`glass-card p-6 transition-all duration-300 border ${topic.border} hover:-translate-y-1 ${topic.glow} cursor-pointer group h-full flex flex-col`}>
              <div className={`w-11 h-11 rounded-xl ${topic.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <topic.icon className={`w-5 h-5 ${topic.color}`} />
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                {topic.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{topic.description}</p>
              <span className={`text-xs font-mono ${topic.color} opacity-70`}>{topic.count}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
