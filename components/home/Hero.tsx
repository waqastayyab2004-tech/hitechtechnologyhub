'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Briefcase, MapPin, Sparkles, Globe, Award, Users, Linkedin, Github, Mail } from 'lucide-react'
import NewsTicker from '@/components/home/NewsTicker'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      <HeroBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />

      {/* ── Small floating AI decorations ── */}
      <FloatingAIElements />

      {/* Content — centered, full width */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-10"
        >

          {/* ── Hook Headline ── */}
          <motion.div variants={item} className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
              Learn AI.{' '}
              <span className="gradient-text">Build Smarter.</span>
              <br />
              Automate Everything.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto italic border-l-2 border-accent-blue/40 pl-4 text-left">
              &ldquo;15+ years in enterprise IT — bridging real-world corporate knowledge with AI, Automation &amp; MLOps.&rdquo;
            </p>
          </motion.div>

          {/* ── Dual Avatar Row ── */}
          <motion.div variants={item} className="w-full max-w-4xl mx-auto">
            <div className="flex items-start justify-center gap-8 sm:gap-16 lg:gap-24">

              {/* ── Human avatar ── */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <style>{`
                    @keyframes orbit1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                    @keyframes orbit2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                    @keyframes orbit3{from{transform:rotate(45deg)}to{transform:rotate(405deg)}}
                    @keyframes photoPulse{0%,100%{box-shadow:0 0 30px rgba(59,130,246,0.5),0 0 60px rgba(59,130,246,0.2)}50%{box-shadow:0 0 50px rgba(59,130,246,0.8),0 0 100px rgba(6,182,212,0.3)}}
                    @keyframes scanLine{0%{top:0%;opacity:0.6}100%{top:100%;opacity:0}}
                    @keyframes dotOrbit{from{transform:rotate(0deg) translateX(76px) rotate(0deg)}to{transform:rotate(360deg) translateX(76px) rotate(-360deg)}}
                    @keyframes dotOrbit2{from{transform:rotate(180deg) translateX(92px) rotate(-180deg)}to{transform:rotate(540deg) translateX(92px) rotate(-540deg)}}
                    @keyframes dotOrbit3{from{transform:rotate(90deg) translateX(108px) rotate(-90deg)}to{transform:rotate(450deg) translateX(108px) rotate(-450deg)}}
                    @keyframes dataSync{0%,100%{opacity:0;transform:translateX(0) scale(0.5)}20%{opacity:1;transform:translateX(4px) scale(1)}80%{opacity:1;transform:translateX(52px) scale(1)}99%{opacity:0;transform:translateX(60px) scale(0.5)}}
                    @keyframes dataSyncBack{0%,100%{opacity:0;transform:translateX(0) scale(0.5)}20%{opacity:1;transform:translateX(-4px) scale(1)}80%{opacity:1;transform:translateX(-52px) scale(1)}99%{opacity:0;transform:translateX(-60px) scale(0.5)}}
                    .orbit-ring-1{animation:orbit1 8s linear infinite}
                    .orbit-ring-2{animation:orbit2 12s linear infinite}
                    .orbit-ring-3{animation:orbit3 6s linear infinite}
                    .photo-pulse{animation:photoPulse 3s ease-in-out infinite}
                    .scan-line{animation:scanLine 2.5s linear infinite}
                    .dot-orbit-1{animation:dotOrbit 4s linear infinite}
                    .dot-orbit-2{animation:dotOrbit2 6s linear infinite}
                    .dot-orbit-3{animation:dotOrbit3 9s linear infinite}
                    .data-pkt-fwd{animation:dataSync 2.4s ease-in-out infinite}
                    .data-pkt-fwd2{animation:dataSync 2.4s ease-in-out infinite 0.8s}
                    .data-pkt-fwd3{animation:dataSync 2.4s ease-in-out infinite 1.6s}
                    .data-pkt-bwd{animation:dataSyncBack 2.4s ease-in-out infinite 0.4s}
                    .data-pkt-bwd2{animation:dataSyncBack 2.4s ease-in-out infinite 1.2s}
                    @keyframes botBob{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
                    @keyframes botGlow{0%,100%{box-shadow:0 0 30px rgba(6,182,212,0.5),0 0 60px rgba(6,182,212,0.15)}50%{box-shadow:0 0 60px rgba(6,182,212,0.9),0 0 120px rgba(59,130,246,0.3)}}
                    @keyframes ringBot1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                    @keyframes ringBot2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
                    @keyframes orbitBot1{from{transform:rotate(0deg) translateX(76px) rotate(0deg)}to{transform:rotate(360deg) translateX(76px) rotate(-360deg)}}
                    @keyframes orbitBot2{from{transform:rotate(120deg) translateX(90px) rotate(-120deg)}to{transform:rotate(480deg) translateX(90px) rotate(-480deg)}}
                    @keyframes orbitBot3{from{transform:rotate(240deg) translateX(68px) rotate(-240deg)}to{transform:rotate(600deg) translateX(68px) rotate(-600deg)}}
                    .bot-bob{animation:botBob 3s ease-in-out infinite}
                    .bot-glow{animation:botGlow 3s ease-in-out infinite}
                    .ring-b1{animation:ringBot1 9s linear infinite}
                    .ring-b2{animation:ringBot2 6s linear infinite}
                    .orbit-b1{animation:orbitBot1 3.5s linear infinite}
                    .orbit-b2{animation:orbitBot2 5s linear infinite}
                    .orbit-b3{animation:orbitBot3 7s linear infinite}
                  `}</style>
                  <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-accent-blue/20 to-cyan-400/10 blur-2xl" />
                  <div className="orbit-ring-1 absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-accent-blue/40" />
                  <div className="orbit-ring-2 absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-cyan-400/15" />
                  <div className="orbit-ring-3 absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-purple-400/25" />
                  <div className="absolute w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.9)] dot-orbit-1" />
                  <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)] dot-orbit-2" />
                  <div className="absolute w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.9)] dot-orbit-3" />
                  <svg className="absolute z-10 w-48 h-48 sm:w-60 sm:h-60 pointer-events-none" viewBox="0 0 200 200">
                    <defs><path id="nameCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"/></defs>
                    <text fontSize="10" fontFamily="'Inter',sans-serif" fontWeight="700" letterSpacing="3.5" fill="#93C5FD" opacity="0.9">
                      <textPath href="#nameCircle" startOffset="0%">SYED WAQAS TAYYAB · IT EXPERT · </textPath>
                    </text>
                  </svg>
                  <div className="photo-pulse relative w-32 h-32 sm:w-44 sm:h-44 rounded-full border-2 border-accent-blue/70 overflow-hidden bg-dark-800 z-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/waqas-avatar.jpg" alt="Syed Waqas Tayyab" className="w-full h-full object-cover" style={{objectPosition:'center 5%'}}/>
                    <div className="scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/20 via-transparent to-transparent" />
                  </div>
                  <svg className="absolute -top-1 -left-1 w-8 h-8 z-30" viewBox="0 0 36 36" fill="none"><path d="M18 3 L4 3 Q2 3 2 5 L2 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><circle cx="2" cy="3" r="2" fill="#3B82F6"/></svg>
                  <svg className="absolute -top-1 -right-1 w-8 h-8 z-30" viewBox="0 0 36 36" fill="none"><path d="M18 3 L32 3 Q34 3 34 5 L34 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><circle cx="34" cy="3" r="2" fill="#3B82F6"/></svg>
                  <svg className="absolute -bottom-1 -left-1 w-8 h-8 z-30" viewBox="0 0 36 36" fill="none"><path d="M2 18 L2 31 Q2 33 4 33 L18 33" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/><circle cx="2" cy="33" r="2" fill="#06B6D4"/></svg>
                  <svg className="absolute -bottom-1 -right-1 w-8 h-8 z-30" viewBox="0 0 36 36" fill="none"><path d="M34 18 L34 31 Q34 33 32 33 L18 33" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/><circle cx="34" cy="33" r="2" fill="#06B6D4"/></svg>
                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(74,222,128,0.8)] z-30" />
                </div>
                {/* Open to Work — below human avatar only */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/30 text-green-400 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to Work · MENA + Remote
                </span>
              </div>

              {/* ── Data sync beam ── */}
              <div className="flex flex-col items-center justify-center gap-2 self-center pb-4">
                <div className="relative w-16 sm:w-20 h-6 flex items-center overflow-visible">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-gradient-to-r from-accent-blue/30 via-cyan-400/50 to-accent-blue/30" />
                  </div>
                  <div className="data-pkt-fwd absolute left-0 w-2.5 h-2.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,1)]" />
                  <div className="data-pkt-fwd2 absolute left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,1)]" />
                  <div className="data-pkt-fwd3 absolute left-0 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)]" />
                  <div className="data-pkt-bwd absolute right-0 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(167,139,250,1)]" />
                  <div className="data-pkt-bwd2 absolute right-0 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_5px_rgba(103,232,249,1)]" />
                </div>
                <span className="text-[9px] text-gray-600 font-mono whitespace-nowrap">AI + Human</span>
              </div>

              {/* ── Bot avatar ── */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-cyan-400/10 blur-3xl" />
                  <div className="ring-b1 absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-cyan-400/30" />
                  <div className="ring-b2 absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-accent-blue/15" />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)] orbit-b1" />
                  <div className="absolute w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_6px_rgba(59,130,246,1)] orbit-b2" />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)] orbit-b3" />
                  <div className="bot-bob relative z-10">
                    <div className="bot-glow relative w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-cyan-400/70 bg-[#060e1a] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/ai-robot-icon.png" alt="Waqas AI BOT" className="w-4/5 h-4/5 object-contain"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/15 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  <svg className="absolute -top-1 -left-1 w-8 h-8 z-20" viewBox="0 0 36 36" fill="none"><path d="M18 3 L4 3 Q2 3 2 5 L2 18" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/><circle cx="2" cy="3" r="2" fill="#06B6D4"/></svg>
                  <svg className="absolute -top-1 -right-1 w-8 h-8 z-20" viewBox="0 0 36 36" fill="none"><path d="M18 3 L32 3 Q34 3 34 5 L34 18" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/><circle cx="34" cy="3" r="2" fill="#06B6D4"/></svg>
                  <svg className="absolute -bottom-1 -left-1 w-8 h-8 z-20" viewBox="0 0 36 36" fill="none"><path d="M2 18 L2 31 Q2 33 4 33 L18 33" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><circle cx="2" cy="33" r="2" fill="#3B82F6"/></svg>
                  <svg className="absolute -bottom-1 -right-1 w-8 h-8 z-20" viewBox="0 0 36 36" fill="none"><path d="M34 18 L34 31 Q34 33 32 33 L18 33" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><circle cx="34" cy="33" r="2" fill="#3B82F6"/></svg>
                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse z-20" />
                </div>
                {/* Available for Freelance — below bot only */}
                <div className="text-center">
                  <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-2">Waqas AI BOT</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue whitespace-nowrap">
                    Available for Freelance Projects
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── Name + Title ── */}
          <motion.div variants={item} className="text-center w-full max-w-3xl mx-auto">

            {/* Role + Location + Specialty — single clean row */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-gray-400 mb-5">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
                Senior IT System Engineer
              </span>
              <span className="text-gray-700 hidden sm:block">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
                Riyadh, Saudi Arabia
              </span>
              <span className="text-gray-700 hidden sm:block">·</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-yellow flex-shrink-0" />
                AI, Automation &amp; MLOps Enthusiast
              </span>
            </div>

            {/* Skills pills — balanced 2 rows */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2 max-w-2xl mx-auto">
              {['Azure Security Certified', 'M365', 'L2/L3 IT Infrastructure Expert', 'Cybersecurity', 'ServiceNow', 'SAP Specialist', 'AI Engineer', 'IT Infrastructure'].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-dark-700 border border-white/10 text-gray-300 whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider label */}
            <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest my-3">Expert In</p>

            {/* Skills pills — Row 2: Domain expertise */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'Multinational Corporations', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5' },
                { label: 'Corporate IT Setup', color: 'text-accent-blue border-accent-blue/30 bg-accent-blue/5' },
                { label: 'Enterprise IT Firms', color: 'text-purple-400 border-purple-400/30 bg-purple-400/5' },
                { label: 'Global IT Operations', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' },
                { label: 'IT Service Management', color: 'text-orange-400 border-orange-400/30 bg-orange-400/5' },
              ].map(({ label, color }) => (
                <span key={label} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Contact & Profile Bar ── */}
          <motion.div variants={item} className="w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest">Connect</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a href="https://www.linkedin.com/in/syedwaqastayyab/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors whitespace-nowrap">
                <Linkedin className="w-3 h-3 flex-shrink-0" /> LinkedIn
              </a>
              <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors whitespace-nowrap">
                <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="https://github.com/waqas-syed" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10 transition-colors whitespace-nowrap">
                <Github className="w-3 h-3 flex-shrink-0" /> GitHub
              </a>
              <a href="mailto:waqastayyab2004@gmail.com"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-colors whitespace-nowrap">
                <Mail className="w-3 h-3 flex-shrink-0" /> Email Me
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
                <Globe className="w-3 h-3 flex-shrink-0" /> MENA · KSA
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 whitespace-nowrap">
                <Award className="w-3 h-3 flex-shrink-0" /> 13 Certs
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400 whitespace-nowrap">
                <Users className="w-3 h-3 flex-shrink-0" /> Open to Hire
              </span>
            </div>
          </motion.div>

          {/* ── Live News Ticker ── */}
          <motion.div variants={item} className="w-full max-w-3xl mx-auto">
            <NewsTicker />
          </motion.div>

          {/* ── Neural Network Expertise Diagram ── */}
          <motion.div variants={item} className="w-full max-w-3xl mx-auto">
            <p className="text-center text-[10px] text-gray-500 font-semibold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse inline-block mr-2" />
              Expertise Network
            </p>
            <NeuralExpertise />
          </motion.div>

          {/* ── Buttons ── */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/blog" className="btn-primary text-base px-8 py-3.5">
              Explore Articles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-outline text-base px-8 py-3.5">
              View Projects
            </Link>
            <Link href="/hire" className="btn-outline text-base px-8 py-3.5 border-green-500/40 text-green-400 hover:bg-green-500/10 hover:border-green-500/60">
              Hire Me
            </Link>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-2"
          >
            {[
              { value: '15+', label: 'Years IT Experience' },
              { value: '100+', label: 'Projects & Implementations' },
              { value: '13', label: 'Certifications' },
              { value: 'IT Consultant', label: 'Corporate IT Expert' },
              { value: '100%', label: 'Free Content' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black gradient-text">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── AI + Human Collaboration Section ── */}
          <motion.div variants={item} className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-dark-800/80 via-dark-800/60 to-accent-blue/5 backdrop-blur-sm overflow-hidden p-6 sm:p-8">
              {/* Background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/8 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-400/30" />
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-bold text-cyan-400 uppercase tracking-widest whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  AI + Human Collaboration
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-blue/30" />
              </div>

              {/* Two column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

                {/* Left — old bot (Waqas AI BOT video) now here */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    {/* Glow */}
                    <div className="absolute w-36 h-36 rounded-full bg-cyan-400/10 blur-2xl" />
                    {/* Orbit ring */}
                    <div className="absolute w-32 h-32 rounded-full border border-dashed border-cyan-400/25 ring-b1" />
                    {/* Video in circle */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400/60 bg-[#0d2433] shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                      <video
                        src="/waqas-ai-bot.mp4"
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/15 via-transparent to-transparent" />
                    </div>
                    {/* Pulse badge */}
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-dark-900 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase">NEXUS-W1</p>
                    <p className="text-[10px] text-gray-600 font-mono mt-0.5">Waqas AI BOT · HiTecH HUB</p>
                  </div>
                </div>

                {/* Right — collaboration text */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    Where Human Expertise<br />
                    <span className="gradient-text">Meets Artificial Intelligence</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: '🧠', text: 'AI accelerates decision-making — humans provide context, ethics, and judgement that machines can\'t replicate.' },
                      { icon: '⚡', text: 'Automation handles repetitive IT tasks — freeing engineers to focus on architecture, strategy, and innovation.' },
                      { icon: '🌐', text: '15+ years of enterprise IT knowledge, combined with AI tools, creates solutions no algorithm could design alone.' },
                    ].map(({ icon, text }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                        <p className="text-xs text-gray-400 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-600 italic border-l-2 border-cyan-400/30 pl-3 leading-relaxed">
                    &ldquo;The future of IT is not AI replacing engineers — it&apos;s engineers who understand AI replacing those who don&apos;t.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   NEURAL EXPERTISE DIAGRAM
   ──────────────────────────────────────────────── */
function NeuralExpertise() {
  // Centre node + 6 domain nodes arranged in a hex
  const cx = 300, cy = 130, r = 95
  const domains = [
    { label: 'AI & MLOps',       color: '#8B5CF6', sub: ['AIOps','Automation','Python','SAP AI'] },
    { label: 'Cybersecurity',    color: '#EF4444', sub: ['Azure Sec','Zero Trust','IAM','SIEM'] },
    { label: 'Cloud & Infra',    color: '#3B82F6', sub: ['Azure','M365','Hybrid','IaaS'] },
    { label: 'ServiceNow',       color: '#10B981', sub: ['ITSM','SLA Mgmt','SNOW Dev','Tickets'] },
    { label: 'IT Operations',    color: '#F59E0B', sub: ['L2/L3','ITIL','SLAs','VIP Support'] },
    { label: 'Corporate IT',     color: '#06B6D4', sub: ['Global MNCs','SAP','Endpoint','M365'] },
  ]
  const nodes = domains.map((d, i) => {
    const angle = (i * 60 - 90) * Math.PI / 180
    return { ...d, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-dark-800/40 backdrop-blur-sm p-2">
      <style>{`
        @keyframes pulse-node { 0%,100%{r:14;opacity:0.9} 50%{r:16;opacity:1} }
        @keyframes pulse-centre { 0%,100%{r:20;opacity:1} 50%{r:23;opacity:0.8} }
        @keyframes dash-flow { to { stroke-dashoffset: -40 } }
        @keyframes node-glow { 0%,100%{filter:drop-shadow(0 0 4px currentColor)} 50%{filter:drop-shadow(0 0 12px currentColor)} }
        .nn-edge { animation: dash-flow 2s linear infinite; stroke-dasharray: 6 4; }
        .nn-node { animation: pulse-node 2.5s ease-in-out infinite; }
        .nn-centre { animation: pulse-centre 3s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 600 260" width="100%" className="overflow-visible">
        <defs>
          <radialGradient id="centrGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA"/>
            <stop offset="100%" stopColor="#1D4ED8"/>
          </radialGradient>
          {domains.map((d,i) => (
            <radialGradient key={i} id={`ng${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={d.color} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={d.color} stopOpacity="0.4"/>
            </radialGradient>
          ))}
          <filter id="nnGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Edges from centre to domain nodes */}
        {nodes.map((n,i) => (
          <line key={i}
            x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth="1.2" opacity="0.4"
            className="nn-edge"
            style={{animationDelay:`${i*0.33}s`}}
          />
        ))}

        {/* Sub-skill nodes (small dots around each domain) */}
        {nodes.map((n,i) =>
          n.sub.map((s, j) => {
            const a2 = ((i * 60 - 90) + (j - 1.5) * 18) * Math.PI / 180
            const sr = 36, sx = n.x + sr * Math.cos(a2), sy = n.y + sr * Math.sin(a2)
            return (
              <g key={`${i}-${j}`}>
                <line x1={n.x} y1={n.y} x2={sx} y2={sy} stroke={n.color} strokeWidth="0.7" opacity="0.25"/>
                <circle cx={sx} cy={sy} r="3.5" fill={n.color} opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1.5+j*0.3}s`} repeatCount="indefinite"/>
                </circle>
                <text x={sx} y={sy - 7} textAnchor="middle" fontSize="6" fill={n.color} opacity="0.7" fontFamily="monospace">{s}</text>
              </g>
            )
          })
        )}

        {/* Domain node circles */}
        {nodes.map((n,i) => (
          <g key={i} filter="url(#nnGlow)">
            <circle cx={n.x} cy={n.y} r="14" fill={`url(#ng${i})`} className="nn-node"
              style={{animationDelay:`${i*0.4}s`, color: n.color}}/>
            <circle cx={n.x} cy={n.y} r="14" fill="none" stroke={n.color} strokeWidth="1" opacity="0.6"/>
            <text x={n.x} y={n.y + 26} textAnchor="middle" fontSize="7.5" fontWeight="bold"
              fill={n.color} fontFamily="'Inter',sans-serif" opacity="0.9">{n.label}</text>
          </g>
        ))}

        {/* Centre node */}
        <g filter="url(#nnGlow)">
          <circle cx={cx} cy={cy} r="20" fill="url(#centrGrad)" className="nn-centre"/>
          <circle cx={cx} cy={cy} r="20" fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.7"/>
          <circle cx={cx} cy={cy} r="26" fill="none" stroke="#3B82F6" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="8s" repeatCount="indefinite"/>
          </circle>
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">WAQAS</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="5.5" fill="#93C5FD" fontFamily="monospace">15yr+</text>
        </g>
      </svg>
    </div>
  )
}

/* ────────────────────────────────────────────────
   FLOATING AI ELEMENTS — small tech decorations
   scattered tastefully around the background
   ──────────────────────────────────────────────── */
function FloatingAIElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{zIndex:5}}>
      <style>{`
        @keyframes walkLeft {
          0%   { transform: translateX(110vw) scaleX(-1); }
          100% { transform: translateX(-160px) scaleX(-1); }
        }
        @keyframes walkRight {
          0%   { transform: translateX(-160px) scaleX(1); }
          100% { transform: translateX(110vw) scaleX(1); }
        }
        @keyframes walkLeftSlow {
          0%   { transform: translateX(110vw) scaleX(-1); }
          100% { transform: translateX(-160px) scaleX(-1); }
        }
        @keyframes legSwingA {
          0%,100% { transform-origin:top center; transform:rotate(-18deg); }
          50%      { transform-origin:top center; transform:rotate(18deg); }
        }
        @keyframes legSwingB {
          0%,100% { transform-origin:top center; transform:rotate(18deg); }
          50%      { transform-origin:top center; transform:rotate(-18deg); }
        }
        @keyframes armSwingA {
          0%,100% { transform-origin:top center; transform:rotate(-14deg); }
          50%      { transform-origin:top center; transform:rotate(14deg); }
        }
        @keyframes armSwingB {
          0%,100% { transform-origin:top center; transform:rotate(14deg); }
          50%      { transform-origin:top center; transform:rotate(-14deg); }
        }
        @keyframes headBob {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-2px); }
        }
        @keyframes eyePulse {
          0%,100% { opacity:0.7; }
          50%      { opacity:1; }
        }
        @keyframes floatUp {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes floatUpSlow {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-18px); }
        }
        @keyframes spinSlow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform:rotate(360deg); }
          to   { transform:rotate(0deg); }
        }
        @keyframes orbitPulse {
          0%,100% { opacity:0.3; transform:scale(1); }
          50%      { opacity:0.7; transform:scale(1.1); }
        }
        .walk-bot-1 {
          position:absolute; bottom:12%;
          animation: walkRight 18s linear infinite;
        }
        .walk-bot-2 {
          position:absolute; bottom:8%;
          animation: walkLeft 22s linear infinite;
          animation-delay: -8s;
        }
        .walk-bot-3 {
          position:absolute; bottom:18%;
          animation: walkRight 28s linear infinite;
          animation-delay: -14s;
        }
        .leg-a { animation: legSwingA 0.5s ease-in-out infinite; }
        .leg-b { animation: legSwingB 0.5s ease-in-out infinite; }
        .arm-a { animation: armSwingA 0.5s ease-in-out infinite; }
        .arm-b { animation: armSwingB 0.5s ease-in-out infinite; }
        .head-bob { animation: headBob 0.5s ease-in-out infinite; }
        .eye-pulse { animation: eyePulse 1.2s ease-in-out infinite; }
        .float-icon { animation: floatUp 4s ease-in-out infinite; }
        .float-icon-slow { animation: floatUpSlow 6s ease-in-out infinite; }
        .spin-icon { animation: spinSlow 12s linear infinite; }
        .spin-icon-rev { animation: spinReverse 16s linear infinite; }
        .orbit-pulse { animation: orbitPulse 3s ease-in-out infinite; }
      `}</style>

      {/* ══════════════════════════════
          WALKING ROBOTS
      ══════════════════════════════ */}

      {/* Robot 1 — walks right, bottom area, blue */}
      <div className="walk-bot-1 opacity-25 hidden sm:block">
        <WalkingRobot color="#3B82F6" accent="#06B6D4" size={56} eyeColor="#60d0ff" />
      </div>

      {/* Robot 2 — walks left, slightly higher, yellow/green */}
      <div className="walk-bot-2 opacity-20 hidden sm:block">
        <WalkingRobot color="#4a8888" accent="#FACC15" size={44} eyeColor="#FACC15" />
      </div>

      {/* Robot 3 — walks right, different level, purple */}
      <div className="walk-bot-3 opacity-15 hidden sm:block">
        <WalkingRobot color="#5a4a88" accent="#8B5CF6" size={38} eyeColor="#a78bfa" />
      </div>

      {/* ══════════════════════════════
          CLOUD TECH ICONS — corners & edges
      ══════════════════════════════ */}

      {/* Azure cloud — top left */}
      <div className="absolute top-24 left-4 sm:left-8 float-icon opacity-20" style={{animationDelay:'0s'}}>
        <TechIcon type="azure" size={40} />
      </div>

      {/* AWS/Cloud — top right */}
      <div className="absolute top-20 right-4 sm:right-10 float-icon opacity-18" style={{animationDelay:'1s'}}>
        <TechIcon type="cloud" size={36} />
      </div>

      {/* AI Brain — mid left */}
      <div className="absolute top-1/3 left-2 sm:left-6 float-icon-slow opacity-18" style={{animationDelay:'2s'}}>
        <TechIcon type="brain" size={34} />
      </div>

      {/* Gear — mid right */}
      <div className="absolute top-2/5 right-3 sm:right-8 spin-icon opacity-15">
        <TechIcon type="gear" size={32} />
      </div>

      {/* Docker/Container — bottom left */}
      <div className="absolute bottom-40 left-3 sm:left-8 float-icon opacity-18" style={{animationDelay:'1.5s'}}>
        <TechIcon type="container" size={34} />
      </div>

      {/* Circuit chip — bottom right */}
      <div className="absolute bottom-44 right-3 sm:right-10 float-icon opacity-20" style={{animationDelay:'0.5s'}}>
        <TechIcon type="chip" size={36} />
      </div>

      {/* WiFi/Network — top center-left (hidden mobile) */}
      <div className="absolute top-32 left-1/4 float-icon opacity-15 hidden sm:block" style={{animationDelay:'2.5s'}}>
        <TechIcon type="wifi" size={28} />
      </div>

      {/* Code brackets — top center-right (hidden mobile) */}
      <div className="absolute top-36 right-1/4 float-icon-slow opacity-15 hidden sm:block" style={{animationDelay:'3s'}}>
        <TechIcon type="code" size={30} />
      </div>

      {/* Lock/Security — mid-lower left */}
      <div className="absolute top-3/5 left-3 sm:left-7 float-icon opacity-15" style={{animationDelay:'1.8s'}}>
        <TechIcon type="lock" size={26} />
      </div>

      {/* Database — mid-lower right */}
      <div className="absolute top-3/5 right-4 sm:right-9 float-icon-slow opacity-15" style={{animationDelay:'0.8s'}}>
        <TechIcon type="database" size={28} />
      </div>

      {/* Satellite/SAP — far left center (lg only) */}
      <div className="absolute top-1/2 left-0 sm:left-2 -translate-y-1/2 float-icon opacity-12 hidden lg:block" style={{animationDelay:'4s'}}>
        <TechIcon type="satellite" size={30} />
      </div>

      {/* Orbit rings — scattered background accents */}
      <div className="absolute top-16 right-1/3 orbit-pulse opacity-10 hidden md:block" style={{animationDelay:'0s'}}>
        <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#3B82F6" strokeWidth="1"/><circle cx="25" cy="25" r="12" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6"/><circle cx="25" cy="25" r="4" fill="#3B82F6" opacity="0.5"/></svg>
      </div>
      <div className="absolute bottom-1/3 left-1/3 orbit-pulse opacity-8 hidden md:block" style={{animationDelay:'1.5s'}}>
        <svg width="38" height="38" viewBox="0 0 38 38"><circle cx="19" cy="19" r="15" fill="none" stroke="#8B5CF6" strokeWidth="0.8"/><circle cx="19" cy="19" r="8" fill="none" stroke="#8B5CF6" strokeWidth="0.6" opacity="0.6"/><circle cx="19" cy="19" r="3" fill="#8B5CF6" opacity="0.5"/></svg>
      </div>

      {/* Hex grid — bottom corners */}
      <div className="absolute bottom-24 left-0 opacity-10 hidden sm:block">
        <svg width="80" height="60" viewBox="0 0 80 60">
          {([[10,14],[30,14],[50,14],[70,14],[20,30],[40,30],[60,30],[10,46],[30,46],[50,46],[70,46]] as [number,number][]).map(([x,y],i)=>(
            <polygon key={i} points={`${x},${y-7} ${x+6},${y-3.5} ${x+6},${y+3.5} ${x},${y+7} ${x-6},${y+3.5} ${x-6},${y-3.5}`} fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.5"/>
          ))}
        </svg>
      </div>
      <div className="absolute bottom-24 right-0 opacity-10 hidden sm:block">
        <svg width="80" height="60" viewBox="0 0 80 60">
          {([[10,14],[30,14],[50,14],[70,14],[20,30],[40,30],[60,30],[10,46],[30,46],[50,46],[70,46]] as [number,number][]).map(([x,y],i)=>(
            <polygon key={i} points={`${x},${y-7} ${x+6},${y-3.5} ${x+6},${y+3.5} ${x},${y+7} ${x-6},${y+3.5} ${x-6},${y-3.5}`} fill="none" stroke="#8B5CF6" strokeWidth="0.6" opacity="0.5"/>
          ))}
        </svg>
      </div>
    </div>
  )
}

/* ── Walking Robot SVG component ── */
function WalkingRobot({ color, accent, size, eyeColor }: { color: string; accent: string; size: number; eyeColor: string }) {
  const s = size / 56
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 56 73" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`rb-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      {/* Head — bobs */}
      <g className="head-bob">
        <rect x="14" y="2" width="28" height="20" rx="7" fill={`url(#rb-${color})`}/>
        {/* Eyes */}
        <circle cx="21" cy="12" r="4.5" fill="#0a1828"/>
        <circle cx="21" cy="12" r="3.5" fill={eyeColor} className="eye-pulse"/>
        <circle cx="35" cy="12" r="4.5" fill="#0a1828"/>
        <circle cx="35" cy="12" r="3.5" fill={eyeColor} className="eye-pulse" style={{animationDelay:'0.3s'}}/>
        {/* Antenna */}
        <line x1="28" y1="2" x2="28" y2="-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="28" cy="-4" r="2" fill={accent} className="eye-pulse"/>
        {/* Mouth */}
        <rect x="20" y="18" width="16" height="3" rx="1.5" fill="#0a1828"/>
        <rect x="22" y="19" width="5" height="1.5" rx="0.75" fill={accent} opacity="0.8"/>
        <rect x="29" y="19" width="5" height="1.5" rx="0.75" fill={accent} opacity="0.6"/>
      </g>
      {/* Torso */}
      <rect x="12" y="24" width="32" height="26" rx="7" fill={`url(#rb-${color})`}/>
      {/* Chest panel */}
      <rect x="16" y="28" width="24" height="14" rx="4" fill="#0a1828"/>
      <circle cx="22" cy="35" r="3" fill={accent} className="eye-pulse"/>
      <circle cx="34" cy="35" r="3" fill={eyeColor} className="eye-pulse" style={{animationDelay:'0.6s'}}/>
      <rect x="16" y="44" width="24" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      {/* Left arm */}
      <g className="arm-a" style={{transformOrigin:'14px 28px'}}>
        <rect x="3" y="24" width="9" height="20" rx="4.5" fill={`url(#rb-${color})`}/>
        <rect x="5" y="42" width="7" height="5" rx="2.5" fill={color} opacity="0.7"/>
      </g>
      {/* Right arm */}
      <g className="arm-b" style={{transformOrigin:'42px 28px'}}>
        <rect x="44" y="24" width="9" height="20" rx="4.5" fill={`url(#rb-${color})`}/>
        <rect x="44" y="42" width="7" height="5" rx="2.5" fill={color} opacity="0.7"/>
      </g>
      {/* Left leg */}
      <g className="leg-a" style={{transformOrigin:'19px 50px'}}>
        <rect x="14" y="50" width="10" height="18" rx="5" fill={`url(#rb-${color})`}/>
        <rect x="12" y="66" width="14" height="5" rx="2.5" fill={color} opacity="0.7"/>
      </g>
      {/* Right leg */}
      <g className="leg-b" style={{transformOrigin:'37px 50px'}}>
        <rect x="32" y="50" width="10" height="18" rx="5" fill={`url(#rb-${color})`}/>
        <rect x="30" y="66" width="14" height="5" rx="2.5" fill={color} opacity="0.7"/>
      </g>
    </svg>
  )
}

/* ── Cloud Tech Icon SVG components ── */
function TechIcon({ type, size }: { type: string; size: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    azure: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#0a1828" stroke="#3B82F6" strokeWidth="1"/>
        {/* Azure triangle */}
        <polygon points="10,28 20,10 30,28" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8"/>
        <polygon points="14,28 20,16 26,28 22,28 20,22 18,28" fill="#3B82F6" opacity="0.6"/>
        <text x="20" y="34" fontFamily="monospace" fontSize="5" fill="#3B82F6" textAnchor="middle" opacity="0.7">AZ</text>
      </svg>
    ),
    cloud: (
      <svg width={s} height={s} viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 26 Q4 26 4 22 Q4 18 8 17 Q8 10 14 10 Q17 6 22 8 Q26 4 31 8 Q36 8 36 14 Q40 15 40 20 Q40 26 35 26 Z"
          fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7"/>
        <path d="M10 26 Q7 26 7 23 Q7 20 10 19 Q10 13 15 13 Q17 9 22 11 Q25 8 29 11 Q33 11 33 16 Q36 17 36 21 Q36 26 32 26 Z"
          fill="#06B6D4" opacity="0.15"/>
        {/* Rain drops */}
        {[14,20,26].map(x=>(
          <line key={x} x1={x} y1="28" x2={x-2} y2="34" stroke="#06B6D4" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
        ))}
      </svg>
    ),
    brain: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#0a1828" stroke="#8B5CF6" strokeWidth="1"/>
        {/* Brain outline simplified */}
        <path d="M12 20 Q10 14 14 12 Q16 8 20 10 Q24 8 26 12 Q30 14 28 20 Q30 26 26 28 Q24 32 20 30 Q16 32 14 28 Q10 26 12 20 Z"
          fill="none" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.7"/>
        {/* Neural nodes */}
        {([[20,14],[14,20],[26,20],[20,26]] as [number,number][]).map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#8B5CF6" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${1.2+i*0.3}s`} repeatCount="indefinite"/>
          </circle>
        ))}
        {/* Connections */}
        <line x1="20" y1="14" x2="14" y2="20" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.4"/>
        <line x1="20" y1="14" x2="26" y2="20" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.4"/>
        <line x1="14" y1="20" x2="20" y2="26" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.4"/>
        <line x1="26" y1="20" x2="20" y2="26" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.4"/>
      </svg>
    ),
    gear: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="6" fill="none" stroke="#06B6D4" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="3" fill="#06B6D4" opacity="0.5"/>
        {[0,1,2,3,4,5,6,7].map(i=>{
          const a=i*45*Math.PI/180
          return <rect key={i} x={20+Math.cos(a)*9-2} y={20+Math.sin(a)*9-3.5} width="4" height="7" rx="1.5"
            fill="#06B6D4" opacity="0.55" transform={`rotate(${i*45} ${20+Math.cos(a)*9} ${20+Math.sin(a)*9})`}/>
        })}
      </svg>
    ),
    container: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#0a1828" stroke="#FACC15" strokeWidth="1"/>
        {/* Container/whale simplified */}
        <rect x="8" y="14" width="24" height="14" rx="4" fill="none" stroke="#FACC15" strokeWidth="1.2" opacity="0.7"/>
        {/* Stacked containers */}
        {[0,1,2].map(i=>(
          <rect key={i} x={10+i*7} y="16" width="5" height="10" rx="1.5" fill="#FACC15" opacity={0.3+i*0.1}/>
        ))}
        <text x="20" y="35" fontFamily="monospace" fontSize="5" fill="#FACC15" textAnchor="middle" opacity="0.6">DOCKER</text>
      </svg>
    ),
    chip: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="20" rx="3" fill="#0a1828" stroke="#10B981" strokeWidth="1.2"/>
        <rect x="13" y="13" width="14" height="14" rx="2" fill="#10B981" opacity="0.25"/>
        <text x="20" y="22" fontFamily="monospace" fontSize="5.5" fill="#10B981" textAnchor="middle" fontWeight="bold">ML</text>
        <text x="20" y="28" fontFamily="monospace" fontSize="4" fill="#10B981" textAnchor="middle" opacity="0.7">MODEL</text>
        {[13,18,23].map(x=>(
          <g key={x}>
            <line x1={x} y1="10" x2={x} y2="6" stroke="#10B981" strokeWidth="1" opacity="0.6"/>
            <line x1={x} y1="30" x2={x} y2="34" stroke="#10B981" strokeWidth="1" opacity="0.6"/>
          </g>
        ))}
        {[13,18,23].map(y=>(
          <g key={y}>
            <line x1="10" y1={y} x2="6" y2={y} stroke="#10B981" strokeWidth="1" opacity="0.6"/>
            <line x1="30" y1={y} x2="34" y2={y} stroke="#10B981" strokeWidth="1" opacity="0.6"/>
          </g>
        ))}
      </svg>
    ),
    wifi: (
      <svg width={s} height={s} viewBox="0 0 36 30" xmlns="http://www.w3.org/2000/svg">
        {[24,16,8].map((r,i)=>(
          <path key={i} d={`M${18-r},${18+2} Q18,${18-r} ${18+r},${18+2}`}
            fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity={0.4+i*0.2} strokeLinecap="round"/>
        ))}
        <circle cx="18" cy="26" r="3" fill="#3B82F6" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    ),
    code: (
      <svg width={s} height={s} viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="22" fontFamily="monospace" fontSize="16" fill="#FACC15" opacity="0.6" fontWeight="bold">{'<'}</text>
        <text x="28" y="22" fontFamily="monospace" fontSize="16" fill="#FACC15" opacity="0.6" fontWeight="bold">{'>'}</text>
        <rect x="14" y="10" width="12" height="2.5" rx="1.25" fill="#FACC15" opacity="0.4"/>
        <rect x="16" y="16" width="8" height="2.5" rx="1.25" fill="#FACC15" opacity="0.3"/>
      </svg>
    ),
    lock: (
      <svg width={s} height={s} viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="16" width="24" height="20" rx="4" fill="#0a1828" stroke="#EF4444" strokeWidth="1.2" opacity="0.8"/>
        <path d="M9 16 Q9 6 16 6 Q23 6 23 16" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.7" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="4" fill="#EF4444" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <rect x="15" y="26" width="2" height="5" rx="1" fill="#EF4444" opacity="0.6"/>
      </svg>
    ),
    database: (
      <svg width={s} height={s} viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="8" rx="12" ry="5" fill="#0a1828" stroke="#06B6D4" strokeWidth="1.2"/>
        <rect x="4" y="8" width="24" height="10" fill="#0a1828"/>
        <ellipse cx="16" cy="18" rx="12" ry="5" fill="#0a1828" stroke="#06B6D4" strokeWidth="1.2"/>
        <rect x="4" y="18" width="24" height="10" fill="#0a1828"/>
        <ellipse cx="16" cy="28" rx="12" ry="5" fill="#0a1828" stroke="#06B6D4" strokeWidth="1.2"/>
        <rect x="4" y="8" width="1.5" height="20" fill="#06B6D4" opacity="0.3"/>
        <rect x="26.5" y="8" width="1.5" height="20" fill="#06B6D4" opacity="0.3"/>
      </svg>
    ),
    satellite: (
      <svg width={s} height={s} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="6" fill="#0a1828" stroke="#FACC15" strokeWidth="1.2"/>
        <circle cx="20" cy="20" r="3" fill="#FACC15" opacity="0.4"/>
        {/* Panels */}
        <rect x="2" y="17" width="10" height="6" rx="2" fill="#FACC15" opacity="0.25" stroke="#FACC15" strokeWidth="0.8"/>
        <rect x="28" y="17" width="10" height="6" rx="2" fill="#FACC15" opacity="0.25" stroke="#FACC15" strokeWidth="0.8"/>
        {/* Lines */}
        <line x1="12" y1="20" x2="14" y2="20" stroke="#FACC15" strokeWidth="1.2" opacity="0.6"/>
        <line x1="26" y1="20" x2="28" y2="20" stroke="#FACC15" strokeWidth="1.2" opacity="0.6"/>
        {/* Signal waves */}
        {[8,12,16].map(r=>(
          <circle key={r} cx="20" cy="20" r={r} fill="none" stroke="#FACC15" strokeWidth="0.5" opacity="0.15"/>
        ))}
      </svg>
    ),
  }
  return icons[type] ?? <></>
}


/* ── Waqas Portrait SVG — accurate to photo ── */
function WaqasAvatarSVG() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a2f4a" />
          <stop offset="100%" stopColor="#0B1220" />
        </radialGradient>
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C69B78" />
          <stop offset="50%" stopColor="#B8875F" />
          <stop offset="100%" stopColor="#A07248" />
        </linearGradient>
        <linearGradient id="skinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A6840" />
          <stop offset="100%" stopColor="#7A5030" />
        </linearGradient>
        <linearGradient id="shirtBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90C8" />
          <stop offset="40%" stopColor="#3A7AB8" />
          <stop offset="100%" stopColor="#2860A0" />
        </linearGradient>
        <linearGradient id="hairDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d0800" />
          <stop offset="60%" stopColor="#180e00" />
          <stop offset="100%" stopColor="#221500" />
        </linearGradient>
        <linearGradient id="aiOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.06" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <filter id="glowBlue">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />

      {/* Subtle grid lines — AI tech feel */}
      <g opacity="0.06" stroke="#3B82F6" strokeWidth="0.5" clipPath="url(#circleClip)">
        {[20,40,60,80,100,120,140,160,180].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} />
        ))}
        {[20,40,60,80,100,120,140,160,180].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" />
        ))}
      </g>

      {/* Shoulder / shirt body — wide, fills bottom */}
      <path d="M0 200 L0 148 Q20 138 45 134 Q60 130 75 128 L85 125 L100 122 L115 125 L125 128 Q140 130 155 134 Q180 138 200 148 L200 200 Z"
        fill="url(#shirtBlue)" />
      {/* Shirt collar shadow */}
      <path d="M80 128 Q100 138 120 128 L118 122 Q100 130 82 122 Z" fill="#1a4080" opacity="0.6" />
      {/* Collar left */}
      <path d="M82 122 Q88 118 92 112 Q96 120 100 122 Q92 126 82 122 Z" fill="#5aa0d8" />
      {/* Collar right */}
      <path d="M118 122 Q112 118 108 112 Q104 120 100 122 Q108 126 118 122 Z" fill="#5aa0d8" />

      {/* Neck */}
      <path d="M86 118 Q86 108 88 105 L100 102 L112 105 Q114 108 114 118 Q107 122 100 122 Q93 122 86 118 Z"
        fill="url(#skinTone)" />
      {/* Neck shadow sides */}
      <path d="M86 118 Q84 112 86 106 Q87 110 88 114 Z" fill="url(#skinShadow)" opacity="0.5" />
      <path d="M114 118 Q116 112 114 106 Q113 110 112 114 Z" fill="url(#skinShadow)" opacity="0.5" />

      {/* Head shape — slightly wide, square jaw like photo */}
      <ellipse cx="100" cy="72" rx="38" ry="42" fill="url(#skinTone)" filter="url(#softShadow)" />
      {/* Jaw / chin square shape */}
      <path d="M64 80 Q62 90 63 98 Q68 112 80 118 Q90 122 100 122 Q110 122 120 118 Q132 112 137 98 Q138 90 136 80 Q128 88 100 90 Q72 88 64 80 Z"
        fill="url(#skinTone)" />

      {/* ── HAIR — dark, side-parted, natural ── */}
      {/* Main hair top */}
      <path d="M62 50 Q65 28 100 26 Q135 28 138 50 Q130 38 100 36 Q70 38 62 50 Z"
        fill="url(#hairDark)" />
      {/* Left side hair */}
      <path d="M62 50 Q58 60 60 72 Q62 64 64 56 Z" fill="url(#hairDark)" />
      {/* Right side hair */}
      <path d="M138 50 Q142 60 140 72 Q138 64 136 56 Z" fill="url(#hairDark)" />
      {/* Hair sweep — parted slightly left of center */}
      <path d="M62 50 Q70 34 94 32 Q104 31 100 34 Q86 36 76 44 Q68 50 62 50 Z"
        fill="#0a0500" />
      {/* Right side fuller */}
      <path d="M100 34 Q120 32 138 50 Q132 40 118 36 Q108 33 100 34 Z"
        fill="#100900" />

      {/* Temple hair lines — natural texture */}
      <path d="M64 68 Q63 74 64 80" stroke="#0d0800" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M136 68 Q137 74 136 80" stroke="#0d0800" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>

      {/* ── EYEBROWS — thick, dark, slightly arched ── */}
      <path d="M70 60 Q78 56 87 58 Q82 57 78 59 Q74 61 70 60 Z" fill="#0d0800" />
      <path d="M113 60 Q122 56 130 60 Q126 61 122 59 Q118 57 113 60 Z" fill="#0d0800" />

      {/* ── EYES — dark brown, direct gaze ── */}
      {/* Eye sockets */}
      <ellipse cx="80" cy="68" rx="11" ry="8" fill="#8a6040" opacity="0.2" />
      <ellipse cx="120" cy="68" rx="11" ry="8" fill="#8a6040" opacity="0.2" />
      {/* Whites */}
      <ellipse cx="80" cy="68" rx="9" ry="6.5" fill="#f5f0eb" />
      <ellipse cx="120" cy="68" rx="9" ry="6.5" fill="#f5f0eb" />
      {/* Iris — dark brown */}
      <circle cx="80" cy="68" r="5" fill="#3d1f00" />
      <circle cx="120" cy="68" r="5" fill="#3d1f00" />
      {/* Pupil */}
      <circle cx="80" cy="68" r="2.8" fill="#0a0500" />
      <circle cx="120" cy="68" r="2.8" fill="#0a0500" />
      {/* Eye shine */}
      <circle cx="82" cy="66" r="1.4" fill="white" opacity="0.85" />
      <circle cx="122" cy="66" r="1.4" fill="white" opacity="0.85" />
      {/* Lower eye rim */}
      <path d="M71 72 Q80 75 89 72" stroke="#9a7050" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M111 72 Q120 75 129 72" stroke="#9a7050" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Upper lash line */}
      <path d="M71 64 Q80 62 89 64" stroke="#0d0800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M111 64 Q120 62 129 64" stroke="#0d0800" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── NOSE — broad, prominent ── */}
      <path d="M97 74 Q94 80 93 86 Q94 90 100 91 Q106 90 107 86 Q106 80 103 74"
        stroke="#9a6840" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Nostrils */}
      <ellipse cx="94" cy="89" rx="4" ry="2.5" fill="#8a5828" opacity="0.45" />
      <ellipse cx="106" cy="89" rx="4" ry="2.5" fill="#8a5828" opacity="0.45" />
      {/* Nose bridge highlight */}
      <path d="M99 74 Q100 80 100 86" stroke="#d4a878" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* ── STUBBLE / BEARD — dense, natural ── */}
      {/* Chin beard */}
      <ellipse cx="100" cy="106" rx="22" ry="10" fill="#3d2010" opacity="0.55" />
      {/* Jawline stubble */}
      <path d="M74 92 Q72 100 74 108 Q80 116 90 119 Q100 122 110 119 Q120 116 126 108 Q128 100 126 92"
        fill="#2d1508" opacity="0.35" />
      {/* Moustache */}
      <path d="M88 95 Q94 92 100 93 Q106 92 112 95 Q106 97 100 96 Q94 97 88 95 Z"
        fill="#2d1508" opacity="0.7" />
      {/* Subtle stubble texture dots */}
      {[[76,94],[79,98],[74,102],[78,106],[85,112],[93,116],[107,116],[115,112],[122,106],[126,102],[121,98],[124,94]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#2a1206" opacity="0.5" />
      ))}

      {/* ── AI TECH OVERLAY — subtle branding ── */}
      {/* Scanning line effect */}
      <rect x="0" y="0" width="200" height="200" fill="url(#aiOverlay)" clipPath="url(#circleClip)" />
      {/* Blue circuit accent on side */}
      <path d="M8 80 L18 80 L18 90 L28 90" stroke="#3B82F6" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="8" cy="80" r="2" fill="#3B82F6" opacity="0.5" filter="url(#glowBlue)" />
      <path d="M192 80 L182 80 L182 90 L172 90" stroke="#3B82F6" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="192" cy="80" r="2" fill="#3B82F6" opacity="0.5" filter="url(#glowBlue)" />

      {/* HiTecH HUB badge bottom */}
      <rect x="55" y="178" width="90" height="16" rx="8" fill="#3B82F6" opacity="0.9" />
      <text x="100" y="190" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="0.5">HiTecH HUB</text>
    </svg>
  )
}

/* ── NEXUS-W1 AI Bot — unique HiTecH HUB mascot ── */
function AIBotAvatarSVG() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="botBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0d1f3c" />
          <stop offset="100%" stopColor="#060e1a" />
        </radialGradient>
        <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8ab0d0" />
          <stop offset="30%" stopColor="#6090b8" />
          <stop offset="70%" stopColor="#3d6888" />
          <stop offset="100%" stopColor="#1e3a55" />
        </linearGradient>
        <linearGradient id="metalHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a0c0dc" />
          <stop offset="40%" stopColor="#78a8c8" />
          <stop offset="100%" stopColor="#2a5070" />
        </linearGradient>
        <linearGradient id="carbonFiber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <radialGradient id="eyeCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#60d0ff" />
          <stop offset="70%" stopColor="#1890e8" />
          <stop offset="100%" stopColor="#0040a0" />
        </radialGradient>
        <radialGradient id="eyeOuter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0040a0" stopOpacity="0.3"/>
        </radialGradient>
        <linearGradient id="hexGrid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
        </linearGradient>
        <filter id="eyeGlowF">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="bodyShad">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.6"/>
        </filter>
        <pattern id="hexPat" x="0" y="0" width="12" height="10.4" patternUnits="userSpaceOnUse">
          <polygon points="6,0 12,3 12,7.4 6,10.4 0,7.4 0,3" fill="none" stroke="#3B82F6" strokeWidth="0.4" opacity="0.4"/>
        </pattern>
        <clipPath id="botCircle">
          <circle cx="100" cy="100" r="100"/>
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="100" fill="url(#botBg)"/>

      {/* Background hex grid */}
      <rect x="0" y="0" width="200" height="200" fill="url(#hexPat)" clipPath="url(#botCircle)" opacity="0.5"/>

      {/* Background circuit lines */}
      <g stroke="#3B82F6" strokeWidth="0.6" opacity="0.2" clipPath="url(#botCircle)">
        <path d="M10 50 L30 50 L30 30 L50 30"/>
        <circle cx="10" cy="50" r="2" fill="#3B82F6"/>
        <path d="M190 50 L170 50 L170 30 L150 30"/>
        <circle cx="190" cy="50" r="2" fill="#3B82F6"/>
        <path d="M10 150 L30 150 L30 170 L50 170"/>
        <path d="M190 150 L170 150 L170 170 L150 170"/>
        <circle cx="50" cy="30" r="1.5" fill="#FACC15"/>
        <circle cx="150" cy="30" r="1.5" fill="#FACC15"/>
      </g>

      {/* ── LEGS ── */}
      {/* Left leg */}
      <rect x="72" y="152" width="22" height="32" rx="8" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <rect x="74" y="162" width="18" height="4" rx="2" fill="url(#carbonFiber)" opacity="0.8"/>
      <rect x="74" y="168" width="18" height="4" rx="2" fill="url(#carbonFiber)" opacity="0.6"/>
      {/* Left foot */}
      <rect x="68" y="180" width="30" height="10" rx="5" fill="url(#metalBody)"/>
      {/* Right leg */}
      <rect x="106" y="152" width="22" height="32" rx="8" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <rect x="108" y="162" width="18" height="4" rx="2" fill="url(#carbonFiber)" opacity="0.8"/>
      <rect x="108" y="168" width="18" height="4" rx="2" fill="url(#carbonFiber)" opacity="0.6"/>
      {/* Right foot */}
      <rect x="102" y="180" width="30" height="10" rx="5" fill="url(#metalBody)"/>

      {/* ── ARMS ── */}
      {/* Left arm */}
      <rect x="42" y="96" width="20" height="44" rx="10" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <rect x="44" y="106" width="16" height="3" rx="1.5" fill="url(#carbonFiber)" opacity="0.7"/>
      <rect x="44" y="112" width="16" height="3" rx="1.5" fill="url(#carbonFiber)" opacity="0.5"/>
      {/* Left hand */}
      <ellipse cx="52" cy="144" rx="10" ry="8" fill="url(#metalBody)"/>
      <rect x="46" y="140" width="5" height="10" rx="2.5" fill="url(#metalBody)"/>
      <rect x="53" y="138" width="5" height="11" rx="2.5" fill="url(#metalBody)"/>
      <rect x="59" y="140" width="4" height="9" rx="2" fill="url(#metalBody)"/>
      {/* Right arm */}
      <rect x="138" y="96" width="20" height="44" rx="10" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <rect x="140" y="106" width="16" height="3" rx="1.5" fill="url(#carbonFiber)" opacity="0.7"/>
      <rect x="140" y="112" width="16" height="3" rx="1.5" fill="url(#carbonFiber)" opacity="0.5"/>
      {/* Right hand */}
      <ellipse cx="148" cy="144" rx="10" ry="8" fill="url(#metalBody)"/>
      <rect x="135" y="140" width="4" height="9" rx="2" fill="url(#metalBody)"/>
      <rect x="141" y="138" width="5" height="11" rx="2.5" fill="url(#metalBody)"/>
      <rect x="148" y="140" width="5" height="10" rx="2.5" fill="url(#metalBody)"/>

      {/* ── TORSO ── */}
      <rect x="58" y="92" width="84" height="64" rx="16" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      {/* Torso hex overlay */}
      <rect x="58" y="92" width="84" height="64" rx="16" fill="url(#hexGrid)"/>
      {/* Torso border */}
      <rect x="58" y="92" width="84" height="64" rx="16" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>

      {/* Carbon fiber belt bands */}
      <rect x="58" y="124" width="84" height="10" rx="3" fill="url(#carbonFiber)"/>
      <rect x="58" y="136" width="84" height="8" rx="3" fill="url(#carbonFiber)" opacity="0.8"/>

      {/* Chest panel */}
      <rect x="68" y="98" width="64" height="22" rx="6" fill="#040e1c"/>
      <rect x="68" y="98" width="64" height="22" rx="6" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6"/>
      {/* Chest LED strip */}
      <rect x="71" y="108" width="8" height="4" rx="2" fill="#3B82F6" filter="url(#softGlow)"/>
      <rect x="81" y="108" width="5" height="4" rx="2" fill="#FACC15" filter="url(#softGlow)" opacity="0.9"/>
      <rect x="88" y="108" width="8" height="4" rx="2" fill="#10B981" filter="url(#softGlow)"/>
      <rect x="98" y="108" width="5" height="4" rx="2" fill="#3B82F6" filter="url(#softGlow)" opacity="0.7"/>
      <rect x="105" y="108" width="8" height="4" rx="2" fill="#FACC15" filter="url(#softGlow)" opacity="0.8"/>
      <rect x="115" y="108" width="8" height="4" rx="2" fill="#3B82F6" filter="url(#softGlow)"/>
      {/* Chest label */}
      <text x="100" y="105" fontFamily="monospace" fontSize="5" fill="#3B82F6" textAnchor="middle" opacity="0.8" letterSpacing="1">NEXUS-W1</text>

      {/* Shoulder joints */}
      <circle cx="58" cy="104" r="10" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <circle cx="58" cy="104" r="6" fill="#2a4a66"/>
      <circle cx="58" cy="104" r="3" fill="#3B82F6" opacity="0.6" filter="url(#softGlow)"/>
      <circle cx="142" cy="104" r="10" fill="url(#metalBody)" filter="url(#bodyShad)"/>
      <circle cx="142" cy="104" r="6" fill="#2a4a66"/>
      <circle cx="142" cy="104" r="3" fill="#3B82F6" opacity="0.6" filter="url(#softGlow)"/>

      {/* ── NECK ── */}
      <rect x="85" y="76" width="30" height="18" rx="6" fill="url(#metalBody)"/>
      <line x1="85" y1="81" x2="115" y2="81" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5"/>
      <line x1="85" y1="86" x2="115" y2="86" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5"/>
      <line x1="85" y1="91" x2="115" y2="91" stroke="#3B82F6" strokeWidth="0.8" opacity="0.4"/>

      {/* ── HEAD — round with flat top like reference ── */}
      {/* Head shadow */}
      <ellipse cx="102" cy="54" rx="44" ry="40" fill="#020810" opacity="0.4"/>
      {/* Main head */}
      <ellipse cx="100" cy="52" rx="44" ry="40" fill="url(#metalHead)" filter="url(#bodyShad)"/>
      {/* Hex pattern on head */}
      <ellipse cx="100" cy="52" rx="44" ry="40" fill="url(#hexGrid)"/>
      {/* Head border */}
      <ellipse cx="100" cy="52" rx="44" ry="40" fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.5"/>

      {/* Head highlight — top */}
      <ellipse cx="92" cy="24" rx="20" ry="8" fill="white" opacity="0.08"/>

      {/* Ear panels */}
      <rect x="50" y="40" width="10" height="22" rx="5" fill="url(#metalBody)"/>
      <rect x="52" y="44" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.7" filter="url(#softGlow)"/>
      <rect x="52" y="49" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.5"/>
      <rect x="52" y="54" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.3"/>
      <rect x="140" y="40" width="10" height="22" rx="5" fill="url(#metalBody)"/>
      <rect x="142" y="44" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.7" filter="url(#softGlow)"/>
      <rect x="142" y="49" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.5"/>
      <rect x="142" y="54" width="6" height="3" rx="1.5" fill="#3B82F6" opacity="0.3"/>

      {/* Antenna */}
      <line x1="100" y1="12" x2="100" y2="24" stroke="#4a90c8" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="100" cy="9" r="5" fill="url(#eyeCore)" filter="url(#eyeGlowF)"/>
      <circle cx="100" cy="9" r="3" fill="white" opacity="0.9"/>
      {/* Antenna pulse rings */}
      <circle cx="100" cy="9" r="8" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5">
        <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* ── EYES — large glowing circular like reference ── */}
      {/* Left eye housing */}
      <circle cx="78" cy="52" r="18" fill="#030c18"/>
      <circle cx="78" cy="52" r="18" fill="none" stroke="#1a4a7a" strokeWidth="2"/>
      {/* Left eye outer ring animated */}
      <circle cx="78" cy="52" r="15" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      {/* Left eye core */}
      <circle cx="78" cy="52" r="11" fill="url(#eyeOuter)"/>
      <circle cx="78" cy="52" r="11" fill="url(#eyeCore)" filter="url(#eyeGlowF)"/>
      <circle cx="78" cy="52" r="6" fill="white" opacity="0.15"/>
      <circle cx="78" cy="52" r="4" fill="white" opacity="0.8"/>
      {/* Left eye scan */}
      <line x1="64" y1="52" x2="92" y2="52" stroke="white" strokeWidth="0.8" opacity="0.3">
        <animate attributeName="y1" values="42;62;42" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="42;62;42" dur="2s" repeatCount="indefinite"/>
      </line>

      {/* Right eye housing */}
      <circle cx="122" cy="52" r="18" fill="#030c18"/>
      <circle cx="122" cy="52" r="18" fill="none" stroke="#1a4a7a" strokeWidth="2"/>
      {/* Right eye outer ring animated */}
      <circle cx="122" cy="52" r="15" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      {/* Right eye core */}
      <circle cx="122" cy="52" r="11" fill="url(#eyeOuter)"/>
      <circle cx="122" cy="52" r="11" fill="url(#eyeCore)" filter="url(#eyeGlowF)"/>
      <circle cx="122" cy="52" r="6" fill="white" opacity="0.15"/>
      <circle cx="122" cy="52" r="4" fill="white" opacity="0.8"/>
      {/* Right eye scan */}
      <line x1="108" y1="52" x2="136" y2="52" stroke="white" strokeWidth="0.8" opacity="0.3">
        <animate attributeName="y1" values="62;42;62" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="62;42;62" dur="2s" repeatCount="indefinite"/>
      </line>

      {/* Forehead panel */}
      <rect x="88" y="24" width="24" height="10" rx="4" fill="#030c18"/>
      <rect x="88" y="24" width="24" height="10" rx="4" fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.6"/>
      <text x="100" y="32" fontFamily="monospace" fontSize="5" fill="#3B82F6" textAnchor="middle" letterSpacing="1">AI</text>

      {/* Mouth — data bar display */}
      <rect x="76" y="70" width="48" height="10" rx="5" fill="#030c18"/>
      <rect x="76" y="70" width="48" height="10" rx="5" fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.5"/>
      {/* Animated mouth segments */}
      <rect x="79" y="72" width="6" height="6" rx="1.5" fill="#3B82F6" opacity="0.9" filter="url(#softGlow)">
        <animate attributeName="height" values="6;3;6" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="y" values="72;73.5;72" dur="0.8s" repeatCount="indefinite"/>
      </rect>
      <rect x="87" y="72" width="6" height="6" rx="1.5" fill="#06B6D4" opacity="0.8" filter="url(#softGlow)">
        <animate attributeName="height" values="3;6;3" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="y" values="73.5;72;73.5" dur="0.8s" repeatCount="indefinite"/>
      </rect>
      <rect x="95" y="72" width="6" height="6" rx="1.5" fill="#FACC15" opacity="0.7" filter="url(#softGlow)">
        <animate attributeName="height" values="6;2;6" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="y" values="72;74;72" dur="1.1s" repeatCount="indefinite"/>
      </rect>
      <rect x="103" y="72" width="6" height="6" rx="1.5" fill="#3B82F6" opacity="0.9" filter="url(#softGlow)">
        <animate attributeName="height" values="2;6;2" dur="0.9s" repeatCount="indefinite"/>
        <animate attributeName="y" values="74;72;74" dur="0.9s" repeatCount="indefinite"/>
      </rect>
      <rect x="111" y="72" width="6" height="6" rx="1.5" fill="#06B6D4" opacity="0.8" filter="url(#softGlow)">
        <animate attributeName="height" values="5;2;5" dur="0.7s" repeatCount="indefinite"/>
        <animate attributeName="y" values="72.5;74;72.5" dur="0.7s" repeatCount="indefinite"/>
      </rect>
    </svg>
  )
}

/* ── Animated connection beam between avatars ── */
function ConnectionBeam() {
  return (
    <svg width="56" height="24" viewBox="0 0 56 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FACC15" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Base line */}
      <line x1="0" y1="12" x2="56" y2="12" stroke="#3B82F6" strokeWidth="1" opacity="0.2" strokeDasharray="4 3" />
      {/* Animated beam */}
      <line x1="0" y1="12" x2="56" y2="12" stroke="url(#beamGrad)" strokeWidth="2" opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="20" to="-20" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.4s" repeatCount="indefinite" />
      </line>
      {/* Data packet dots */}
      <circle cx="0" cy="12" r="3.5" fill="#3B82F6">
        <animateMotion dur="1.4s" repeatCount="indefinite" path="M0,0 L56,0" />
      </circle>
      <circle cx="0" cy="12" r="2.5" fill="#FACC15">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.7s" path="M0,0 L56,0" />
      </circle>
    </svg>
  )
}

/* ── Hero animated background ── */
function HeroBackground() {
  const nodes = [
    { cx: 15, cy: 20 }, { cx: 85, cy: 15 }, { cx: 70, cy: 75 },
    { cx: 25, cy: 80 }, { cx: 50, cy: 10 }, { cx: 90, cy: 50 },
    { cx: 10, cy: 55 }, { cx: 60, cy: 90 }, { cx: 40, cy: 35 },
    { cx: 75, cy: 40 },
  ]
  const lines = [
    [15, 20, 50, 10], [50, 10, 85, 15], [85, 15, 90, 50],
    [90, 50, 70, 75], [70, 75, 60, 90], [60, 90, 25, 80],
    [25, 80, 10, 55], [10, 55, 15, 20], [40, 35, 75, 40],
    [15, 20, 40, 35], [85, 15, 75, 40],
  ]

  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
            stroke="#3B82F6" strokeWidth="0.12" strokeDasharray="1 2" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={`${n.cx}%`} cy={`${n.cy}%`} r="0.5%" fill="#3B82F6" />
        ))}
      </svg>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
    </div>
  )
}
