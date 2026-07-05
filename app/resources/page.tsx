import type { Metadata } from 'next'
import { ExternalLink, Bot, Code, Search, Workflow, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Recommended AI tools and resources for IT professionals — ChatGPT, Claude, GitHub Copilot, n8n, and more.',
}

const tools = [
  {
    icon: Bot,
    name: 'Claude',
    by: 'Anthropic',
    description: 'The most capable AI assistant for complex reasoning, coding, and long-form analysis. Claude Code integrates directly into your terminal.',
    category: 'AI Assistant',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    url: 'https://claude.ai',
    highlight: true,
  },
  {
    icon: Bot,
    name: 'ChatGPT',
    by: 'OpenAI',
    description: 'The world\'s most-used AI assistant. Excellent for quick answers, image generation with DALL-E, and voice mode.',
    category: 'AI Assistant',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    url: 'https://chatgpt.com',
    highlight: false,
  },
  {
    icon: Bot,
    name: 'Gemini',
    by: 'Google',
    description: 'Google\'s AI assistant deeply integrated with Google Workspace, Gmail, and Docs. Best for large document analysis and Google productivity.',
    category: 'AI Assistant',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    url: 'https://gemini.google.com',
    highlight: false,
  },
  {
    icon: Code,
    name: 'GitHub Copilot',
    by: 'GitHub / Microsoft',
    description: 'In-editor AI code completion for VS Code, JetBrains and more. Understands your codebase and suggests contextually relevant code as you type.',
    category: 'Code AI',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    url: 'https://github.com/features/copilot',
    highlight: false,
  },
  {
    icon: Code,
    name: 'Cursor',
    by: 'Cursor AI',
    description: 'VS Code rebuilt around AI. Select any code block, ask Claude or GPT to rewrite it in place. The fastest AI-native code editor available.',
    category: 'Code AI',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    url: 'https://cursor.com',
    highlight: false,
  },
  {
    icon: Search,
    name: 'Perplexity AI',
    by: 'Perplexity',
    description: 'AI-powered search engine that provides answers with real citations. Perfect for technical research — always shows source URLs so you can verify.',
    category: 'AI Search',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    url: 'https://perplexity.ai',
    highlight: false,
  },
  {
    icon: Workflow,
    name: 'n8n',
    by: 'n8n GmbH',
    description: 'Open-source self-hosted workflow automation with 400+ integrations and AI nodes. Use it to build complex pipelines without exposing data to third parties.',
    category: 'Automation',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    url: 'https://n8n.io',
    highlight: false,
  },
  {
    icon: Zap,
    name: 'Make.com',
    by: 'Celonis',
    description: 'Visual no-code workflow automation for connecting 1000+ cloud apps. The easiest way to automate SaaS integrations without writing code.',
    category: 'Automation',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    url: 'https://make.com',
    highlight: false,
  },
]

const categories = ['All', 'AI Assistant', 'Code AI', 'AI Search', 'Automation']

export default function ResourcesPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          <span className="gradient-text">Resources</span>
        </h1>
        <p className="section-subheading">
          The AI tools and platforms I recommend for IT professionals and developers.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tools.map((tool, i) => (
          <ScrollReveal key={tool.name} delay={i * 0.07}>
            <div className={`glass-card p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              tool.highlight
                ? 'border border-accent-blue/30 shadow-glow'
                : 'border border-white/5 hover:border-white/10'
            }`}>
              {tool.highlight && (
                <span className="badge bg-accent-blue/10 text-accent-blue border border-accent-blue/20 text-xs mb-3 self-start">
                  ⭐ Recommended
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center`}>
                  <tool.icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <div>
                  <div className="font-bold text-white">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.by}</div>
                </div>
              </div>
              <span className={`text-xs font-medium ${tool.color} mb-3`}>{tool.category}</span>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{tool.description}</p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-2.5 justify-center"
              >
                Visit Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
