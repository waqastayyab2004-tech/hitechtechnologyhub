import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const highlights = [
  '15+ Years IT Experience',
  '100+ Projects & Implementations',
  'IT Consultant & Corporate IT Expert',
  'IT Infrastructure · Operations · Service Delivery',
  'Office Technology Expert',
  'AI Engineer · MLOps',
  'Azure Security Certified',
  '13 Certifications',
  'English + Arabic Fluent',
]

export default function HireCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto glass-card p-10 md:p-14 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-accent-purple/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-blue/40 animate-spin-slow scale-110" />
                <div className="absolute inset-0 rounded-full bg-accent-blue/15 blur-lg scale-110" />
                <div className="relative w-28 h-28 rounded-full border-2 border-accent-blue/60 overflow-hidden shadow-glow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/waqas-avatar.jpg" alt="Syed Waqas Tayyab" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/20 to-transparent" />
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to Work · MENA + Remote
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-blue bg-accent-blue/10 border border-accent-blue/30 px-3 py-1 rounded-full">
                  100+ Projects · 15+ Years IT
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                IT Consultant · Corporate IT Expert ·{' '}
                <span className="gradient-text">AI Engineer</span>
              </h2>
              <p className="text-gray-400 mb-2 text-sm leading-relaxed max-w-xl">
                Syed Waqas Tayyab — 15+ years across IT Infrastructure, Operations, Service Delivery,
                Office Technology, Azure Security, SAP and AI/ML. 13 certifications. MBA. Fluent in English &amp; Arabic.
              </p>
              <p className="text-gray-500 mb-1 text-xs leading-relaxed max-w-xl italic border-l-2 border-accent-blue/30 pl-3">
                &ldquo;Your hub for enterprise IT consulting, free IT courses, AI automation, and real-world tech insights — all in one place.&rdquo;
              </p>
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-start">
                {highlights.map(h => (
                  <span key={h} className="flex items-center gap-1 text-xs text-gray-300 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 text-accent-blue flex-shrink-0" />{h}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link href="/about" className="btn-primary text-sm px-6 py-2.5">
                  View Full Profile <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-outline text-sm px-6 py-2.5">
                  Contact Waqas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
