import type { Metadata } from 'next'
import { Github, ExternalLink, CheckCircle, Star, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real-world apps built by Syed Waqas Tayyab — Waqas AI Hub, IT Asset Manager, SNOW Automation, and more. AI, automation, Python, and web development.',
}

const projects = [
  {
    icon: '/app-wahub.png',
    iconAlt: 'Waqas AI Hub',
    title: 'Waqas AI Hub',
    subtitle: 'Personal AI-Powered Desktop Dashboard',
    description: 'A native macOS app + FastAPI web dashboard replacing terminal commands for all daily SAP IT work. Single click to view emails, calendar, ServiceNow tickets, OneDrive files, and WhatsApp SLA alerts.',
    highlights: [
      'Native macOS Swift + WebKit wrapper — launches like any desktop app',
      'FastAPI backend integrating Gmail, SAP O365 (Outlook, Calendar, OneDrive, SharePoint)',
      'ServiceNow live ticket dashboard — SNOW cookies auto-pasted from Safari',
      'WhatsApp SLA breach alerts via Twilio — fires before tickets breach',
      'Teams-style layout: icon rail, section panel, browser-style tabs',
      'Auto-starts via LaunchAgent — always running on login',
      'Email summarization agent — runs every morning, summarizes SAP inbox',
      'Dark theme with 6 colour schemes, sidebar collapse, keyboard shortcuts',
    ],
    tags: ['FastAPI', 'Python', 'Swift', 'SAP O365', 'ServiceNow', 'Twilio', 'macOS'],
    status: 'Live',
    category: 'AI Dashboard · macOS App',
    color: 'border-accent-blue',
    glowColor: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: '/app-itasset.png',
    iconAlt: 'IT Asset Manager',
    title: 'IT Asset Manager',
    subtitle: 'Enterprise IT Asset Tracking Web App',
    description: 'A full-stack web application replacing Excel-based IT asset tracking at SAP IT, RUH02. Manages laptops, iPhones, iPads, monitors, printers, and data centre equipment across the MENA region.',
    highlights: [
      'Dashboard with KPI stats, Chart.js analytics, low-stock alerts, 6-month trend charts',
      'Asset list with search, filter, sort, pagination — click any row to see full detail',
      'Add/Edit with 5 mandatory fields, duplicate serial number detection',
      'Excel import (Add Only / Add+Update modes) with header garbage filtering',
      'Multi-sheet colour-coded Excel export by asset status',
      'Bulk actions — status change and bulk delete with confirmation',
      'Full audit log per asset — every change tracked with timestamp',
      'Floating AI chat widget — natural language queries return card-format results',
    ],
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js', 'HTML/CSS', 'JavaScript'],
    status: 'Live',
    category: 'Web Application · IT Tool',
    color: 'border-cyan-500',
    glowColor: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🔔',
    title: 'SNOW SLA Automation Pipeline',
    subtitle: 'ServiceNow Monitoring & WhatsApp Alerts',
    description: 'A Python automation pipeline that monitors ServiceNow tickets 24/7 and fires WhatsApp messages before SLA breaches. Zero manual checking — runs as background daemons via cron.',
    highlights: [
      'Polls ServiceNow REST API every 5 minutes for new ticket assignments',
      'Calculates SLA breach time — alerts 30 minutes before breach',
      'Sends WhatsApp messages via Twilio to +966 505803073',
      'Email summarizer runs daily at 9 AM — SAP Outlook inbox → action list',
      'Dual trigger: SNOW API + SAP email scanning (survives expired cookies)',
      'Runs as background daemon — auto-restarts via LaunchAgent',
      'JSON output mode for live dashboard integration',
      'Logs all alerts to /tmp/ with timestamps for audit trail',
    ],
    tags: ['Python', 'ServiceNow', 'Twilio', 'REST API', 'Cron', 'SAP O365'],
    status: 'Live',
    category: 'Automation · Monitoring',
    color: 'border-green-500',
    glowColor: 'shadow-[0_0_30px_rgba(34,197,94,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '🌐',
    title: 'HiTecH AI HUB Website',
    subtitle: 'Personal Brand & Technology Blog',
    description: 'This website — a production-ready personal technology brand site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Full blog system, hire page, AI chatbot, and SEO optimisation.',
    highlights: [
      'Next.js 14 App Router with static export — deploys to Vercel/Cloudflare/Netlify free',
      'Blog system powered by Markdown files — add posts without touching code',
      'AI chatbot (Waqas AI ChatBot) — connected to Claude claude-haiku-4-5 via local API',
      'Full /hire page with CV, 13 certifications, experience timeline, freelance services',
      'Walking robots + cloud tech icons animated in hero background',
      'Neural network dashboard on About page with skill progress bars',
      '1M+ social proof section with live follower counts',
      'Fully responsive, SEO optimised, Open Graph + Twitter Card metadata',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Claude AI'],
    status: 'Live',
    category: 'Web Application · Personal Brand',
    color: 'border-purple-500',
    glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: 'https://www.hitechtechnologyhub.com',
  },
  {
    icon: null,
    iconEmoji: '🤖',
    title: 'SAP O365 MCP Server',
    subtitle: 'Claude AI ↔ SAP Microsoft 365 Bridge',
    description: 'A Model Context Protocol server that gives Claude AI direct access to SAP Outlook, Calendar, OneDrive, and SharePoint — enabling natural language control of enterprise M365 services.',
    highlights: [
      'OAuth2 authentication with SAP Azure AD (bypasses Conditional Access)',
      'localhost:8080 redirect URI workaround for non-managed Mac',
      'Read/search SAP Outlook emails with full attachment support',
      'Query SAP Calendar — list, create, update meetings',
      'Browse OneDrive files — list, download, upload documents',
      'SharePoint site search and document access',
      'Token auto-refresh — stays connected without manual re-auth',
      'Used by Waqas AI Hub and Claude Code sessions daily',
    ],
    tags: ['Python', 'FastAPI', 'OAuth2', 'Microsoft Graph API', 'MCP', 'SAP Azure AD'],
    status: 'Live',
    category: 'AI Integration · MCP Server',
    color: 'border-orange-500',
    glowColor: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    github: 'https://github.com/waqas-syed',
    demo: '#',
  },
  {
    icon: null,
    iconEmoji: '📊',
    title: 'SNOW SLA Breach Predictor',
    subtitle: 'Python ML Model on Real ServiceNow Data',
    description: 'A machine learning model built on real SAP ServiceNow ticket data that predicts which tickets will breach SLA before they do — combining 11 years of IT operations knowledge with Python ML.',
    highlights: [
      'Uses real SAP ServiceNow historical ticket data for training',
      'Python scikit-learn pipeline — Random Forest + feature engineering',
      'Features: ticket age, priority, category, assignment group, time of day',
      'Predicts breach probability per ticket with confidence score',
      'Integrates with existing SNOW WhatsApp alert pipeline',
      'Dashboard visualisation of at-risk tickets',
      'Demonstrates SAP BTP + AI/ML integration',
      'Evidence pack for SAP ML Engineer role application',
    ],
    tags: ['Python', 'scikit-learn', 'Pandas', 'SAP BTP', 'ServiceNow', 'ML'],
    status: 'In Development',
    category: 'AI / ML · Predictive Analytics',
    color: 'border-yellow-500',
    glowColor: 'shadow-[0_0_30px_rgba(234,179,8,0.2)]',
    github: '#',
    demo: '#',
  },
]

const statusColors: Record<string, string> = {
  Live: 'bg-green-500/10 text-green-400 border-green-500/20',
  'In Development': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Coming Soon': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          <span className="gradient-text">Projects</span> I&apos;ve Built
        </h1>
        <p className="section-subheading">
          Real-world apps, automation pipelines, and AI integrations — deployed and running daily.
        </p>
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mt-8">
          {[
            { value: '100+', label: 'Projects Delivered' },
            { value: '4', label: 'Live Apps Running' },
            { value: '15+', label: 'Years Building' },
            { value: '0', label: 'Excel Files Needed' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Projects */}
      <div className="space-y-8">
        {projects.map((project, i) => (
          <ScrollReveal key={project.title} delay={i * 0.07}>
            <div className={`glass-card border-l-4 ${project.color} p-7 md:p-9 ${project.glowColor} transition-all duration-300 hover:-translate-y-0.5`}>
              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left — icon + meta */}
                <div className="flex flex-col items-center lg:items-start gap-4 lg:w-56 flex-shrink-0">
                  {/* App icon */}
                  <div className="relative">
                    {project.icon ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.icon} alt={project.iconAlt} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-dark-700 border border-white/10 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        {project.iconEmoji}
                      </div>
                    )}
                    {/* Status badge overlaid */}
                    <span className={`absolute -bottom-2 -right-2 badge border text-xs ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="text-center lg:text-left">
                    <p className="text-xs text-gray-500 leading-snug">{project.category}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {project.tags.map(t => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full mt-auto">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="btn-outline text-xs py-2 px-3 flex-1 justify-center">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="btn-primary text-xs py-2 px-3 flex-1 justify-center">
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                  </div>
                </div>

                {/* Right — details */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-black text-white mb-0.5">{project.title}</h2>
                  <p className="text-accent-blue font-semibold text-sm mb-3">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">{project.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.2} className="mt-14 text-center">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-accent-yellow" />
            <h3 className="text-xl font-bold text-white">Want Something Built?</h3>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            15+ years of IT experience + AI/ML skills. I build automation tools, web apps, and AI integrations that actually solve real problems.
          </p>
          <a href="/contact" className="btn-primary inline-flex px-8 py-3">
            Discuss a Project
          </a>
        </div>
      </ScrollReveal>
    </div>
  )
}
