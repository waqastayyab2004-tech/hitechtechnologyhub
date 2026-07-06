'use client'

import { useState } from 'react'
import { ExternalLink, Bot, Code, Search, Workflow, Zap, Shield, Brain, Database, Monitor, Globe, Cpu } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const tools = [
  {
    icon: Brain,
    name: 'Claude',
    by: 'Anthropic',
    category: 'AI Assistant',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    url: 'https://claude.ai',
    highlight: true,
    rank: 1,
    description: 'Most capable AI for complex reasoning, coding, and long-form analysis. Claude Code integrates directly into your terminal for agentic workflows.',
    usedFor: ['Code review', 'IT documentation', 'Agentic automation', 'Analysis'],
  },
  {
    icon: Bot,
    name: 'ChatGPT',
    by: 'OpenAI',
    category: 'AI Assistant',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    url: 'https://chatgpt.com',
    highlight: false,
    rank: 2,
    description: "World's most-used AI assistant with GPT-4o, image generation (DALL-E), voice mode, and deep integration with Microsoft 365 Copilot.",
    usedFor: ['Quick answers', 'Image generation', 'Voice assistant', 'Copilot'],
  },
  {
    icon: Bot,
    name: 'Microsoft Copilot',
    by: 'Microsoft',
    category: 'AI Assistant',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    url: 'https://copilot.microsoft.com',
    highlight: false,
    rank: 3,
    description: 'AI embedded across Microsoft 365 — Word, Excel, Teams, Outlook. Summarises meetings, drafts emails, and automates repetitive Office tasks.',
    usedFor: ['M365 automation', 'Meeting summaries', 'Email drafting', 'Excel analysis'],
  },
  {
    icon: Bot,
    name: 'Gemini',
    by: 'Google',
    category: 'AI Assistant',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    url: 'https://gemini.google.com',
    highlight: false,
    rank: 4,
    description: "Google's multimodal AI deeply integrated with Workspace, Gmail, and Docs. Best for large document analysis and Google productivity workflows.",
    usedFor: ['Google Workspace', 'Document analysis', 'Research', 'Coding'],
  },
  {
    icon: Code,
    name: 'GitHub Copilot',
    by: 'GitHub / Microsoft',
    category: 'Code AI',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    url: 'https://github.com/features/copilot',
    highlight: false,
    rank: 5,
    description: 'In-editor AI code completion for VS Code, JetBrains and more. Understands your codebase and suggests contextually relevant code as you type.',
    usedFor: ['Code completion', 'PR review', 'Test generation', 'Refactoring'],
  },
  {
    icon: Code,
    name: 'Cursor',
    by: 'Cursor AI',
    category: 'Code AI',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    url: 'https://cursor.com',
    highlight: false,
    rank: 6,
    description: 'VS Code rebuilt around AI. Select any code block and ask Claude or GPT to rewrite it in place. The fastest AI-native code editor available.',
    usedFor: ['AI-first coding', 'Codebase chat', 'Refactoring', 'Bug fixing'],
  },
  {
    icon: Search,
    name: 'Perplexity AI',
    by: 'Perplexity',
    category: 'AI Search',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    url: 'https://perplexity.ai',
    highlight: false,
    rank: 7,
    description: 'AI-powered search with real citations. Perfect for technical research — always shows source URLs. Replaces Google for deep IT knowledge searches.',
    usedFor: ['Technical research', 'Cited answers', 'Competitor analysis', 'News'],
  },
  {
    icon: Workflow,
    name: 'n8n',
    by: 'n8n GmbH',
    category: 'Automation',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    url: 'https://n8n.io',
    highlight: false,
    rank: 8,
    description: 'Open-source self-hosted workflow automation with 400+ integrations and AI nodes. Build complex pipelines without exposing data to third parties.',
    usedFor: ['IT workflows', 'AI pipelines', 'Self-hosted', 'API automation'],
  },
  {
    icon: Zap,
    name: 'Make.com',
    by: 'Celonis',
    category: 'Automation',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    url: 'https://make.com',
    highlight: false,
    rank: 9,
    description: 'Visual no-code workflow automation connecting 1000+ cloud apps. Easiest way to automate SaaS integrations, notifications, and data sync.',
    usedFor: ['SaaS integration', 'No-code automation', 'Notifications', 'Data sync'],
  },
  {
    icon: Zap,
    name: 'Zapier',
    by: 'Zapier Inc.',
    category: 'Automation',
    color: 'text-orange-300',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    url: 'https://zapier.com',
    highlight: false,
    rank: 10,
    description: '7000+ app integrations with AI-powered Zaps. The go-to platform for non-technical users to automate repetitive business tasks without coding.',
    usedFor: ['Business automation', '7000+ apps', 'Non-technical', 'Triggers'],
  },
  {
    icon: Shield,
    name: 'Microsoft Sentinel',
    by: 'Microsoft',
    category: 'AI Security',
    color: 'text-blue-300',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    url: 'https://azure.microsoft.com/en-us/products/microsoft-sentinel',
    highlight: false,
    rank: 11,
    description: 'Cloud-native SIEM with AI-powered threat detection. Collects security data across your enterprise and uses ML to detect anomalies automatically.',
    usedFor: ['SIEM', 'Threat detection', 'Azure security', 'Incident response'],
  },
  {
    icon: Shield,
    name: 'Darktrace',
    by: 'Darktrace',
    category: 'AI Security',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    url: 'https://darktrace.com',
    highlight: false,
    rank: 12,
    description: 'Self-learning AI cybersecurity that detects and responds to threats in real time. Covers network, email, cloud, and endpoint — without rules or signatures.',
    usedFor: ['Autonomous response', 'Zero-day threats', 'Network AI', 'Email security'],
  },
  {
    icon: Monitor,
    name: 'ServiceNow AI',
    by: 'ServiceNow',
    category: 'IT Operations',
    color: 'text-green-300',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    url: 'https://www.servicenow.com/now-platform/artificial-intelligence.html',
    highlight: false,
    rank: 13,
    description: 'Now Assist AI embedded in ServiceNow ITSM. Auto-classifies tickets, suggests resolutions, summarises incidents, and drafts knowledge articles.',
    usedFor: ['ITSM automation', 'Ticket classification', 'Resolution AI', 'SNOW Copilot'],
  },
  {
    icon: Database,
    name: 'Datadog AI',
    by: 'Datadog',
    category: 'IT Operations',
    color: 'text-purple-300',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    url: 'https://www.datadoghq.com',
    highlight: false,
    rank: 14,
    description: 'AI-powered monitoring and observability platform. Detects anomalies, predicts outages, and correlates logs, metrics, and traces across your infrastructure.',
    usedFor: ['Infrastructure monitoring', 'AIOps', 'Log analysis', 'Alert correlation'],
  },
  {
    icon: Brain,
    name: 'Notion AI',
    by: 'Notion Labs',
    category: 'Productivity AI',
    color: 'text-gray-300',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    url: 'https://notion.so/product/ai',
    highlight: false,
    rank: 15,
    description: 'AI built into Notion for writing, summarising, and organising documentation. Great for IT teams managing runbooks, SOPs, and knowledge bases.',
    usedFor: ['Documentation', 'Runbooks', 'SOPs', 'Team knowledge base'],
  },
  {
    icon: Cpu,
    name: 'SAP Joule',
    by: 'SAP',
    category: 'Enterprise AI',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    url: 'https://www.sap.com/products/artificial-intelligence/ai-assistant.html',
    highlight: false,
    rank: 16,
    description: "SAP's generative AI copilot embedded across S/4HANA, BTP, SuccessFactors and Ariba. Automates SAP tasks using natural language — no transaction codes needed.",
    usedFor: ['SAP automation', 'S/4HANA AI', 'BTP workflows', 'HR & Finance AI'],
  },
  {
    icon: Globe,
    name: 'Azure OpenAI',
    by: 'Microsoft Azure',
    category: 'AI Platform',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    url: 'https://azure.microsoft.com/en-us/products/ai-services/openai-service',
    highlight: false,
    rank: 17,
    description: 'Enterprise-grade GPT-4o and o3 models on Azure with private deployment, data security, and compliance. Build custom AI apps on your own infrastructure.',
    usedFor: ['Custom AI apps', 'Enterprise GPT', 'Private LLMs', 'Azure integration'],
  },
  {
    icon: Code,
    name: 'Tabnine',
    by: 'Tabnine',
    category: 'Code AI',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    url: 'https://tabnine.com',
    highlight: false,
    rank: 18,
    description: 'AI code completion that runs locally or in the cloud. Learns your codebase and team patterns. Privacy-focused — your code never leaves your environment.',
    usedFor: ['Local AI coding', 'Privacy-first', 'Team patterns', 'All IDEs'],
  },
  {
    icon: Brain,
    name: 'Midjourney',
    by: 'Midjourney Inc.',
    category: 'AI Image',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    url: 'https://midjourney.com',
    highlight: false,
    rank: 19,
    description: 'Best AI image generation for professional visuals. Used by IT teams for presentations, diagrams, marketing assets, and technical documentation illustrations.',
    usedFor: ['Presentations', 'Tech diagrams', 'Marketing assets', 'Documentation'],
  },
  {
    icon: Workflow,
    name: 'Power Automate AI',
    by: 'Microsoft',
    category: 'Automation',
    color: 'text-indigo-300',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    url: 'https://powerautomate.microsoft.com',
    highlight: false,
    rank: 20,
    description: 'Microsoft Power Automate with AI Builder — automate M365, SharePoint, Teams, and Dynamics workflows using AI models and natural language triggers.',
    usedFor: ['M365 workflows', 'SharePoint automation', 'AI Builder', 'Teams bots'],
  },
]

const categories = ['All', 'AI Assistant', 'Code AI', 'AI Search', 'Automation', 'AI Security', 'IT Operations', 'Productivity AI', 'Enterprise AI', 'AI Platform', 'AI Image']

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? tools : tools.filter(t => t.category === activeCategory)

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          Updated July 2026
        </div>
        <h1 className="section-heading mb-4">
          Top 20 <span className="gradient-text">AI Tools</span>
        </h1>
        <p className="section-subheading">
          The best AI tools for IT professionals in 2026 — from AI assistants to security, automation, and enterprise platforms.
        </p>
      </ScrollReveal>

      {/* Category filter */}
      <ScrollReveal className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent-blue text-white shadow-glow'
                  : 'bg-dark-800 border border-white/10 text-gray-400 hover:border-accent-blue/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((tool, i) => (
          <ScrollReveal key={tool.name} delay={i * 0.05}>
            <div className={`glass-card p-5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 border ${
              tool.highlight
                ? 'border-accent-blue/40 shadow-glow'
                : `${tool.border} hover:border-white/15`
            }`}>
              {/* Rank + highlight badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${tool.bg} ${tool.color} border ${tool.border}`}>
                  #{tool.rank}
                </span>
                {tool.highlight && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue border border-accent-blue/30">
                    ⭐ Top Pick
                  </span>
                )}
              </div>

              {/* Name + icon */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center flex-shrink-0 border ${tool.border}`}>
                  <tool.icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm leading-tight">{tool.name}</div>
                  <div className="text-[11px] text-gray-500">{tool.by}</div>
                </div>
              </div>

              {/* Category */}
              <span className={`text-[11px] font-semibold ${tool.color} mb-2`}>{tool.category}</span>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-3">{tool.description}</p>

              {/* Use cases */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.usedFor.map(tag => (
                  <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded-md ${tool.bg} ${tool.color} border ${tool.border} opacity-80`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-xs py-2 justify-center mt-auto">
                Visit Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Footer note */}
      <ScrollReveal className="text-center mt-14">
        <p className="text-gray-600 text-sm">
          🛠️ All tools personally evaluated by Waqas · Updated July 2026 · {tools.length} tools listed
        </p>
      </ScrollReveal>
    </div>
  )
}
