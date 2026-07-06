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
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
    highlights: ['GPT-4 & Claude APIs', 'Prompt Engineering', 'AI Agents & Tools', 'Local LLMs (Ollama)', 'RAG Pipelines'],
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
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&q=80',
    highlights: ['n8n & Make.com', 'Python Automation', 'Cron Jobs & Daemons', 'Email & Calendar Bots', 'API Integrations'],
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
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80',
    highlights: ['Zero Trust Architecture', 'Threat Detection', 'Endpoint Security', 'Network Hardening', 'IAM & MFA'],
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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    highlights: ['Azure & AWS Basics', 'Cloud Migration', 'IaaS / PaaS / SaaS', 'Cost Optimisation', 'Hybrid Cloud'],
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
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80',
    highlights: ['Python Scripting', 'TypeScript & Node', 'REST APIs', 'Bash & Shell', 'Git & Version Control'],
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
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    highlights: ['TCP/IP & Subnetting', 'DNS & DHCP', 'VLANs & Trunking', 'Firewall Rules', 'VPN & SD-WAN'],
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
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80',
    highlights: ['Shell Scripting', 'System Hardening', 'Process Management', 'File Permissions', 'SSH & Remote Access'],
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
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&q=80',
    highlights: ['Active Directory', 'Group Policy (GPO)', 'WSUS & Patching', 'Hyper-V', 'PowerShell Admin'],
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
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&q=80',
    highlights: ['Exchange Online', 'SharePoint & Teams', 'Intune MDM/MAM', 'OneDrive Admin', 'Conditional Access'],
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
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&q=80',
    highlights: ['Entra ID / Azure AD', 'Azure DevOps', 'App Services & VMs', 'Azure Monitor', 'ARM & Bicep'],
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
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=80',
    highlights: ['Docker & Compose', 'Kubernetes (K8s)', 'GitHub Actions CI/CD', 'Terraform / IaC', 'Monitoring & SRE'],
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
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&q=80',
    highlights: ['Productivity Tools', 'Troubleshooting Guides', 'Tool Recommendations', 'Career Advice', 'Real-World Scenarios'],
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, i) => (
          <ScrollReveal key={topic.label} delay={i * 0.05}>
            <div className={`glass-card overflow-hidden transition-all duration-300 border ${topic.border} hover:-translate-y-1 ${topic.glow} cursor-pointer group h-full flex flex-col`}>
              {/* Cover image */}
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1117]" />
                {/* Icon badge over image */}
                <div className={`absolute bottom-3 left-4 w-10 h-10 rounded-xl ${topic.bg} flex items-center justify-center border ${topic.border} backdrop-blur-sm`}>
                  <topic.icon className={`w-5 h-5 ${topic.color}`} />
                </div>
                <span className={`absolute bottom-3 right-4 text-xs font-mono ${topic.color} opacity-80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm`}>
                  {topic.count}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className={`font-bold text-white text-lg mb-1 group-hover:${topic.color} transition-colors`}>
                  {topic.label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{topic.description}</p>

                {/* Highlights */}
                <ul className="mt-auto space-y-1.5">
                  {topic.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${topic.bg} border ${topic.border}`}
                        style={{ backgroundColor: 'currentColor' }}
                      />
                      <span className={`${topic.color} opacity-90`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
