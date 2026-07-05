import Link from 'next/link'
import { Github, ExternalLink, ArrowRight, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const projects = [
  {
    icon: '/app-wahub.png',
    iconAlt: 'Waqas AI Hub',
    title: 'Waqas AI Hub',
    subtitle: 'AI-Powered macOS Desktop Dashboard',
    description: 'Native macOS app + FastAPI web dashboard for all daily SAP IT work. Gmail, SAP O365, ServiceNow tickets, and WhatsApp SLA alerts — all in one click.',
    tags: ['FastAPI', 'Python', 'Swift', 'SAP O365', 'Twilio'],
    status: 'Live',
    github: 'https://github.com/waqas-syed',
    demo: '#',
    color: 'border-accent-blue',
  },
  {
    icon: '/app-itasset.png',
    iconAlt: 'IT Asset Manager',
    title: 'IT Asset Manager',
    subtitle: 'Enterprise Asset Tracking Web App',
    description: 'Full-stack web app replacing Excel for IT asset tracking at SAP IT RUH02. Dashboard analytics, Excel import/export, bulk actions, and an AI chat widget.',
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js'],
    status: 'Live',
    github: 'https://github.com/waqas-syed',
    demo: '#',
    color: 'border-cyan-500',
  },
  {
    icon: null,
    iconEmoji: '🔔',
    title: 'SNOW SLA Automation',
    subtitle: 'ServiceNow Monitoring + WhatsApp Alerts',
    description: 'Python daemon that monitors ServiceNow 24/7 and sends WhatsApp messages 30 minutes before SLA breaches. Zero manual checking required.',
    tags: ['Python', 'ServiceNow', 'Twilio', 'Cron'],
    status: 'Live',
    github: 'https://github.com/waqas-syed',
    demo: '#',
    color: 'border-green-500',
  },
  {
    icon: null,
    iconEmoji: '📊',
    title: 'SNOW SLA Predictor',
    subtitle: 'Python ML on Real ServiceNow Data',
    description: 'ML model using real SAP ServiceNow ticket data to predict SLA breaches before they happen. Demonstrates AI + SAP BTP integration for management.',
    tags: ['Python', 'scikit-learn', 'SAP BTP', 'ServiceNow'],
    status: 'In Development',
    github: '#',
    demo: '#',
    color: 'border-yellow-500',
  },
]

const statusColors: Record<string, string> = {
  Live: 'bg-green-500/10 text-green-400 border-green-500/20',
  'In Development': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

export default function ProjectsPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-12">
        <h2 className="section-heading">Apps I&apos;ve <span className="gradient-text">Built</span></h2>
        <p className="section-subheading">
          Real-world automation and AI solutions — deployed and running daily at SAP IT and beyond.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.title} delay={i * 0.1}>
            <div className={`glass-card-hover p-6 h-full flex flex-col border-l-4 ${project.color}`}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  {project.icon ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.icon} alt={project.iconAlt} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center text-2xl">
                      {project.iconEmoji}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">{project.title}</h3>
                      <p className="text-accent-blue text-xs font-medium mt-0.5">{project.subtitle}</p>
                    </div>
                    <span className={`badge border text-xs flex-shrink-0 ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-xs py-2 px-4 flex-1 justify-center">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-4 flex-1 justify-center">
                  <ExternalLink className="w-3.5 h-3.5" /> Demo
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4} className="text-center mt-10">
        <Link href="/projects" className="btn-outline inline-flex">
          See All Projects with Full Details <ArrowRight className="w-4 h-4" />
        </Link>
      </ScrollReveal>
    </section>
  )
}
