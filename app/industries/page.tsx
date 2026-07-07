import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Industries — IT Expertise Across Sectors',
  description: 'IT consulting and managed services across Banking, Government, Healthcare, Energy, Retail, and Telecom. 15+ years delivering enterprise IT in regulated and complex environments.',
}

const industries = [
  {
    title: 'Banking & Financial Services',
    img: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=700&q=80&auto=format&fit=crop',
    color: 'border-accent-blue',
    tagColor: 'bg-accent-blue/10 text-accent-blue border-accent-blue/25',
    desc: 'IT security, infrastructure, and compliance for financial institutions — ATM systems, access control, branch networking, and 24/7 monitoring aligned to banking regulations.',
    points: [
      'ATM security management and monitoring',
      'Branch IT infrastructure and access control',
      'BMC Remedy ITSM and incident management',
      'Physical security integration (CCTV, IoT, alarms)',
      'Compliance-aligned IT policies and audit trails',
    ],
    stats: [{ v: '3yr', l: 'Banking IT experience' }, { v: '24/7', l: 'Security monitoring' }, { v: '100%', l: 'Audit compliance' }],
  },
  {
    title: 'Technology & Software',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80&auto=format&fit=crop',
    color: 'border-cyan-500',
    tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    desc: 'Full-stack IT operations for technology firms — cloud infrastructure, developer tooling, endpoint management, and AI automation for high-growth environments.',
    points: [
      'Azure cloud architecture and DevOps tooling',
      'Microsoft 365 and collaboration platform admin',
      'Zero Trust security for distributed engineering teams',
      'AI automation tools and workflow integration',
      'Scalable endpoint management via Intune / JamF',
    ],
    stats: [{ v: '8yr+', l: 'Enterprise tech IT' }, { v: '200+', l: 'Endpoints managed' }, { v: 'Azure', l: 'Certified Security' }],
  },
  {
    title: 'Oil, Gas & Energy',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80&auto=format&fit=crop',
    color: 'border-yellow-500',
    tagColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25',
    desc: 'Enterprise IT for energy sector organisations in MENA — robust infrastructure, field-ready device management, and compliance-ready security for critical operations.',
    points: [
      'Ruggedised device management and deployment',
      'Remote site connectivity (WAN/VPN setup)',
      'ITSM and incident response for critical operations',
      'Asset lifecycle for field and office equipment',
      'Cybersecurity for OT/IT convergence environments',
    ],
    stats: [{ v: 'MENA', l: 'Region expertise' }, { v: 'L2/L3', l: 'Field IT support' }, { v: '99.9%', l: 'Uptime target' }],
  },
  {
    title: 'Government & Public Sector',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80&auto=format&fit=crop',
    color: 'border-emerald-500',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    desc: 'IT governance, compliance, and secure infrastructure for government and public-sector entities — aligned with Vision 2030 digital transformation objectives in Saudi Arabia.',
    points: [
      'IT governance frameworks and policy documentation',
      'Secure endpoint management and data classification',
      'Identity and Access Management (IAM) for large user bases',
      'ITSM and service desk implementation (ITIL-aligned)',
      'National cloud and hybrid infrastructure setup',
    ],
    stats: [{ v: 'Vision 2030', l: 'Digital alignment' }, { v: 'ITIL v3', l: 'Certified' }, { v: 'Zero Trust', l: 'Architecture' }],
  },
  {
    title: 'Retail & Consumer Goods',
    img: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=700&q=80&auto=format&fit=crop',
    color: 'border-purple-500',
    tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
    desc: 'IT infrastructure and automation for retail environments — POS systems, multi-site networking, inventory tech, and M365 deployments for head office and retail operations.',
    points: [
      'Multi-site network setup and WAN connectivity',
      'POS and in-store IT hardware management',
      'Microsoft 365 deployment for head office teams',
      'Asset management across multiple locations',
      'IT automation for stock, reporting, and operations',
    ],
    stats: [{ v: 'Multi-site', l: 'Network expertise' }, { v: 'M365', l: 'Full suite admin' }, { v: 'PowerBI', l: 'Retail analytics' }],
  },
  {
    title: 'Healthcare & Life Sciences',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80&auto=format&fit=crop',
    color: 'border-red-500',
    tagColor: 'bg-red-500/10 text-red-400 border-red-500/25',
    desc: 'Secure, compliant IT for healthcare organisations — endpoint management, data protection, ITSM, and reliable infrastructure for clinical and administrative environments.',
    points: [
      'HIPAA/GDPR-aligned data handling and IT policies',
      'Medical device and endpoint management',
      'Secure email and communication platforms',
      'ITSM with SLA targets for clinical support requests',
      'Identity and access management for sensitive systems',
    ],
    stats: [{ v: 'GDPR', l: 'Compliance aligned' }, { v: 'Secure', l: 'Endpoint management' }, { v: 'ITIL', l: 'Service design' }],
  },
  {
    title: 'Telecom & Connectivity',
    img: 'https://images.unsplash.com/photo-1478358161113-b0e11994a36b?w=700&q=80&auto=format&fit=crop',
    color: 'border-sky-500',
    tagColor: 'bg-sky-500/10 text-sky-400 border-sky-500/25',
    desc: 'Network infrastructure, ITSM, and automation for telecom environments — from core network management to AI-driven service desk automation and SLA monitoring.',
    points: [
      'Core and edge network infrastructure support',
      'ServiceNow ITSM for high-volume service desks',
      'SLA automation and WhatsApp alert pipelines',
      'Cisco / Aruba network configuration and management',
      'AI tools for ticket routing and predictive maintenance',
    ],
    stats: [{ v: 'CCNA', l: 'Network certified' }, { v: 'SNOW', l: 'ITSM automation' }, { v: 'AI-driven', l: 'Operations' }],
  },
  {
    title: 'Professional Services & Consulting',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80&auto=format&fit=crop',
    color: 'border-orange-500',
    tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
    desc: 'IT operations and automation for professional services firms — M365 governance, document management, client communication security, and executive IT support.',
    points: [
      'Microsoft 365 and Teams governance for consulting firms',
      'Document management with SharePoint and OneDrive',
      'Executive and VIP IT support programmes',
      'PowerBI for operational and client reporting',
      'AI automation for proposals, reporting, and admin tasks',
    ],
    stats: [{ v: 'C-Suite', l: 'Support track record' }, { v: 'M365', l: 'Full governance' }, { v: 'AI', l: 'Automation tools' }],
  },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-dark-900">

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format&fit=crop"
            alt="Industries" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/85 to-dark-900/50"/>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent-blue">Industries</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5">
              Expertise Across<br/>
              <span className="gradient-text">Industries</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              15+ years delivering enterprise IT across Banking, Technology, Energy, Government, Healthcare, Retail, and Telecom — in MENA and globally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary px-8 py-3.5">
                View IT Services <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link href="/contact" className="btn-outline px-8 py-3.5">
                Discuss Your Industry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 px-4 border-y border-white/8 bg-dark-800/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: '8', l: 'Industries Served' },
            { v: '15+', l: 'Years Experience' },
            { v: 'MENA', l: 'Primary Region' },
            { v: 'Remote', l: 'Global Coverage' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-3xl font-black gradient-text mb-1">{s.v}</div>
              <div className="text-gray-500 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="mb-12">
          <h2 className="section-heading mb-3">Areas of Expertise</h2>
          <p className="section-subheading max-w-2xl">Each industry has its own IT challenges, compliance requirements, and operational priorities. Here&apos;s how I address them.</p>
        </ScrollReveal>

        <div className="space-y-8">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.title} delay={i * 0.05}>
              <div className={`glass-card overflow-hidden border-l-4 ${ind.color} hover:-translate-y-0.5 transition-transform duration-300`}>
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-72 flex-shrink-0 h-52 md:h-auto relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ind.img} alt={ind.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-900/40"/>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-xl font-black text-white">{ind.title}</h3>
                      <div className="flex gap-3">
                        {ind.stats.map(s => (
                          <div key={s.l} className="text-center">
                            <div className="text-sm font-black gradient-text">{s.v}</div>
                            <div className="text-[10px] text-gray-600">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{ind.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {ind.points.map(p => (
                        <div key={p} className="flex items-start gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5"/>
                          {p}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-cyan-400 transition-colors">
                        Discuss this industry <ArrowRight className="w-3 h-3"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">Don&apos;t See Your Industry?</h2>
          <p className="text-gray-400 mb-8">My IT expertise translates across sectors. If your industry isn&apos;t listed, reach out — the fundamentals of enterprise IT apply everywhere.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary px-8 py-3.5">
              Get in Touch <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link href="/services" className="btn-outline px-8 py-3.5">
              View All Services
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  )
}
