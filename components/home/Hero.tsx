'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.1 },
  }),
}

/* ── Walking Robot ── */
function WalkingRobot({ color = '#3B82F6', accent = '#06B6D4', size = 52 }: { color?: string; accent?: string; size?: number }) {
  const id = color.replace('#', '')
  return (
    <svg width={size} height={Math.round(size * 1.35)} viewBox="0 0 56 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes legA_${id}{0%,100%{transform:rotate(-18deg);transform-origin:50% 0%}50%{transform:rotate(18deg);transform-origin:50% 0%}}
          @keyframes legB_${id}{0%,100%{transform:rotate(18deg);transform-origin:50% 0%}50%{transform:rotate(-18deg);transform-origin:50% 0%}}
          @keyframes armA_${id}{0%,100%{transform:rotate(-12deg);transform-origin:50% 0%}50%{transform:rotate(12deg);transform-origin:50% 0%}}
          @keyframes armB_${id}{0%,100%{transform:rotate(12deg);transform-origin:50% 0%}50%{transform:rotate(-12deg);transform-origin:50% 0%}}
          @keyframes headB_${id}{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
          @keyframes eyeP_${id}{0%,100%{opacity:.7}50%{opacity:1}}
          .la_${id}{animation:legA_${id} .55s ease-in-out infinite}
          .lb_${id}{animation:legB_${id} .55s ease-in-out infinite}
          .aa_${id}{animation:armA_${id} .55s ease-in-out infinite}
          .ab_${id}{animation:armB_${id} .55s ease-in-out infinite}
          .hb_${id}{animation:headB_${id} .55s ease-in-out infinite}
          .ep_${id}{animation:eyeP_${id} 1.2s ease-in-out infinite}
        `}</style>
      </defs>
      <g className={`hb_${id}`}>
        <rect x="14" y="2" width="28" height="20" rx="7" fill={color} opacity=".9"/>
        <circle cx="21" cy="12" r="4" fill="#0a1828"/>
        <circle cx="21" cy="12" r="3" fill={accent} className={`ep_${id}`}/>
        <circle cx="35" cy="12" r="4" fill="#0a1828"/>
        <circle cx="35" cy="12" r="3" fill={accent} className={`ep_${id}`} style={{animationDelay:'.3s'}}/>
        <line x1="28" y1="2" x2="28" y2="-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="28" cy="-4" r="2" fill={accent} className={`ep_${id}`}/>
        <rect x="20" y="18" width="16" height="3" rx="1.5" fill="#0a1828"/>
      </g>
      <rect x="12" y="24" width="32" height="26" rx="7" fill={color} opacity=".85"/>
      <rect x="16" y="28" width="24" height="14" rx="4" fill="#0a1828"/>
      <circle cx="22" cy="35" r="3" fill={accent} className={`ep_${id}`} style={{animationDelay:'.2s'}}/>
      <circle cx="34" cy="35" r="3" fill={accent} className={`ep_${id}`} style={{animationDelay:'.6s'}}/>
      <g className={`aa_${id}`}><rect x="3" y="24" width="9" height="20" rx="4.5" fill={color} opacity=".8"/></g>
      <g className={`ab_${id}`}><rect x="44" y="24" width="9" height="20" rx="4.5" fill={color} opacity=".8"/></g>
      <g className={`la_${id}`}><rect x="14" y="50" width="10" height="18" rx="5" fill={color} opacity=".85"/><rect x="12" y="66" width="14" height="5" rx="2.5" fill={color} opacity=".7"/></g>
      <g className={`lb_${id}`}><rect x="32" y="50" width="10" height="18" rx="5" fill={color} opacity=".85"/><rect x="30" y="66" width="14" height="5" rx="2.5" fill={color} opacity=".7"/></g>
    </svg>
  )
}

/* ── Floating AI icon ── */
function AIIcon({ type, size = 36 }: { type: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    brain: (<svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#0a1828" stroke="#8B5CF6" strokeWidth="1.2"/><path d="M12 20Q10 14 14 12Q16 8 20 10Q24 8 26 12Q30 14 28 20Q30 26 26 28Q24 32 20 30Q16 32 14 28Q10 26 12 20Z" fill="none" stroke="#8B5CF6" strokeWidth="1.1" opacity=".7"/>{([[20,14],[14,20],[26,20],[20,26]] as [number,number][]).map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="2.5" fill="#8B5CF6" opacity=".7"><animate attributeName="opacity" values=".3;.9;.3" dur={`${1.2+i*.3}s`} repeatCount="indefinite"/></circle>))}<line x1="20" y1="14" x2="14" y2="20" stroke="#8B5CF6" strokeWidth=".8" opacity=".4"/><line x1="20" y1="14" x2="26" y2="20" stroke="#8B5CF6" strokeWidth=".8" opacity=".4"/><line x1="14" y1="20" x2="20" y2="26" stroke="#8B5CF6" strokeWidth=".8" opacity=".4"/><line x1="26" y1="20" x2="20" y2="26" stroke="#8B5CF6" strokeWidth=".8" opacity=".4"/></svg>),
    chip:  (<svg width={s} height={s} viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="20" rx="3" fill="#0a1828" stroke="#10B981" strokeWidth="1.2"/><rect x="13" y="13" width="14" height="14" rx="2" fill="#10B981" opacity=".2"/><text x="20" y="22" fontFamily="monospace" fontSize="5.5" fill="#10B981" textAnchor="middle" fontWeight="bold">ML</text><text x="20" y="28" fontFamily="monospace" fontSize="4" fill="#10B981" textAnchor="middle" opacity=".7">MODEL</text>{[13,18,23].map(x=>(<g key={x}><line x1={x} y1="10" x2={x} y2="6" stroke="#10B981" strokeWidth="1" opacity=".6"/><line x1={x} y1="30" x2={x} y2="34" stroke="#10B981" strokeWidth="1" opacity=".6"/></g>))}{[13,18,23].map(y=>(<g key={y}><line x1="10" y1={y} x2="6" y2={y} stroke="#10B981" strokeWidth="1" opacity=".6"/><line x1="30" y1={y} x2="34" y2={y} stroke="#10B981" strokeWidth="1" opacity=".6"/></g>))}</svg>),
    gear:  (<svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="6" fill="none" stroke="#06B6D4" strokeWidth="1.5"/><circle cx="20" cy="20" r="3" fill="#06B6D4" opacity=".5"/>{[0,1,2,3,4,5,6,7].map(i=>{const a=i*45*Math.PI/180;return<rect key={i} x={20+Math.cos(a)*9-2} y={20+Math.sin(a)*9-3.5} width="4" height="7" rx="1.5" fill="#06B6D4" opacity=".55" transform={`rotate(${i*45} ${20+Math.cos(a)*9} ${20+Math.sin(a)*9})`}/>})}</svg>),
    lock:  (<svg width={s} height={s} viewBox="0 0 32 38"><rect x="4" y="16" width="24" height="20" rx="4" fill="#0a1828" stroke="#EF4444" strokeWidth="1.2" opacity=".8"/><path d="M9 16Q9 6 16 6Q23 6 23 16" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity=".7" strokeLinecap="round"/><circle cx="16" cy="26" r="4" fill="#EF4444" opacity=".5"><animate attributeName="opacity" values=".3;.7;.3" dur="2.5s" repeatCount="indefinite"/></circle><rect x="15" y="26" width="2" height="5" rx="1" fill="#EF4444" opacity=".6"/></svg>),
    code:  (<svg width={s} height={s} viewBox="0 0 40 32"><text x="2" y="22" fontFamily="monospace" fontSize="16" fill="#FACC15" opacity=".6" fontWeight="bold">{'<'}</text><text x="28" y="22" fontFamily="monospace" fontSize="16" fill="#FACC15" opacity=".6" fontWeight="bold">{'>'}</text><rect x="14" y="10" width="12" height="2.5" rx="1.25" fill="#FACC15" opacity=".4"/><rect x="16" y="16" width="8" height="2.5" rx="1.25" fill="#FACC15" opacity=".3"/></svg>),
    cloud: (<svg width={s} height={s} viewBox="0 0 40 32"><path d="M8 24Q4 24 4 20Q4 16 8 15Q8 8 14 8Q17 4 22 6Q26 2 31 6Q36 6 36 12Q40 13 40 18Q40 24 35 24Z" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity=".7"/><path d="M10 24Q7 24 7 21Q7 18 10 17Q10 11 15 11Q17 7 22 9Q25 6 29 9Q33 9 33 14Q36 15 36 19Q36 24 32 24Z" fill="#06B6D4" opacity=".1"/></svg>),
  }
  return icons[type] ?? <></>
}

export default function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const ql = q.toLowerCase()
    if (/course|learn|train|tutorial/.test(ql))           router.push('/training')
    else if (/blog|article|read|post/.test(ql))           router.push('/blog')
    else if (/project|portfolio|work|built/.test(ql))     router.push('/projects')
    else if (/service|consult|hire|outsource/.test(ql))   router.push('/services')
    else if (/contact|email|whatsapp|reach/.test(ql))     router.push('/contact')
    else if (/about|cv|certif|skill|experience/.test(ql)) router.push('/about')
    else if (/ai|tool|resource/.test(ql))                 router.push('/resources')
    else router.push(`/blog?q=${encodeURIComponent(q)}`)
  }

  const CHIPS = [
    { label: 'IT Courses',  href: '/training'  },
    { label: 'AI Tools',    href: '/resources' },
    { label: 'Projects',    href: '/projects'  },
    { label: 'Articles',    href: '/blog'      },
    { label: 'Services',    href: '/services'  },
    { label: 'Hire Waqas',  href: '/hire'      },
  ]

  const STATS = [
    { value: '15+',  label: 'Years Experience'    },
    { value: '100+', label: 'Projects Delivered'  },
    { value: '13+',  label: 'Certifications'      },
    { value: '200+', label: 'Users Managed'       },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-900">

      {/* ── Animations ── */}
      <style>{`
        @keyframes walkR{0%{transform:translateX(-160px)}100%{transform:translateX(110vw)}}
        @keyframes walkL{0%{transform:translateX(110vw) scaleX(-1)}100%{transform:translateX(-160px) scaleX(-1)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes floatYS{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spinCW{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes orbP{0%,100%{opacity:.2}50%{opacity:.45}}
        .r-walk-r {position:absolute;bottom:9%; animation:walkR 22s linear infinite}
        .r-walk-l {position:absolute;bottom:5%; animation:walkL 30s linear infinite;animation-delay:-13s}
        .r-walk-r2{position:absolute;bottom:17%;animation:walkR 38s linear infinite;animation-delay:-22s}
        .r-walk-l2{position:absolute;bottom:13%;animation:walkL 26s linear infinite;animation-delay:-7s}
        .r-walk-r3{position:absolute;bottom:22%;animation:walkR 44s linear infinite;animation-delay:-30s}
        .r-walk-l3{position:absolute;bottom:25%;animation:walkL 52s linear infinite;animation-delay:-40s}
        .r-walk-r4{position:absolute;bottom:3%; animation:walkR 32s linear infinite;animation-delay:-18s}
        .fi{animation:floatY 4s ease-in-out infinite}
        .fis{animation:floatYS 6s ease-in-out infinite}
        .sp{animation:spinCW 14s linear infinite}
        .op{animation:orbP 3s ease-in-out infinite}
      `}</style>

      {/* ── Glow blobs + grid ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-500/5 rounded-full blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Walking robots (z-2, behind content) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{zIndex:2}}>
        {/* Bot 1 — blue, walks right, bottom 9%, size 52 */}
        <div className="r-walk-r opacity-[0.18] hidden sm:block">
          <WalkingRobot color="#3B82F6" accent="#06B6D4" size={52} />
        </div>
        {/* Bot 2 — purple, walks left, bottom 5%, size 40 */}
        <div className="r-walk-l opacity-[0.13] hidden sm:block">
          <WalkingRobot color="#5B3A8A" accent="#8B5CF6" size={40} />
        </div>
        {/* Bot 3 — green, walks right, bottom 17%, size 34 */}
        <div className="r-walk-r2 opacity-[0.10] hidden md:block">
          <WalkingRobot color="#1E6A5A" accent="#10B981" size={34} />
        </div>
        {/* Bot 4 — cyan, walks left, bottom 13%, size 44 */}
        <div className="r-walk-l2 opacity-[0.14] hidden sm:block">
          <WalkingRobot color="#0e4a5a" accent="#22D3EE" size={44} />
        </div>
        {/* Bot 5 — red/orange, walks right, bottom 22%, size 30 */}
        <div className="r-walk-r3 opacity-[0.09] hidden md:block">
          <WalkingRobot color="#7a2020" accent="#F97316" size={30} />
        </div>
        {/* Bot 6 — yellow, walks left, bottom 25%, size 28 (tiny patrol) */}
        <div className="r-walk-l3 opacity-[0.08] hidden lg:block">
          <WalkingRobot color="#5a4a00" accent="#FACC15" size={28} />
        </div>
        {/* Bot 7 — pink/magenta, walks right, bottom 3%, size 36 */}
        <div className="r-walk-r4 opacity-[0.11] hidden md:block">
          <WalkingRobot color="#6a1a4a" accent="#EC4899" size={36} />
        </div>
      </div>

      {/* ── Floating AI icons (z-2) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{zIndex:2}}>
        <div className="absolute top-28 left-4 sm:left-10 fi opacity-[0.22] hidden sm:block" style={{animationDelay:'0s'}}>
          <AIIcon type="brain" size={38} />
        </div>
        <div className="absolute top-24 right-4 sm:right-10 fis opacity-[0.20] hidden sm:block" style={{animationDelay:'1s'}}>
          <AIIcon type="chip" size={36} />
        </div>
        <div className="absolute top-1/2 left-3 sm:left-8 -translate-y-1/2 sp opacity-[0.16] hidden sm:block">
          <AIIcon type="gear" size={32} />
        </div>
        <div className="absolute top-[45%] right-3 sm:right-8 fi opacity-[0.18] hidden sm:block" style={{animationDelay:'2s'}}>
          <AIIcon type="lock" size={30} />
        </div>
        <div className="absolute bottom-52 left-4 sm:left-12 fis opacity-[0.16] hidden md:block" style={{animationDelay:'1.5s'}}>
          <AIIcon type="code" size={32} />
        </div>
        <div className="absolute bottom-48 right-4 sm:right-12 fi opacity-[0.18] hidden md:block" style={{animationDelay:'0.5s'}}>
          <AIIcon type="cloud" size={36} />
        </div>
        {/* Orbit rings */}
        <div className="absolute top-20 right-1/3 op opacity-[0.08] hidden lg:block">
          <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="#3B82F6" strokeWidth=".8"/><circle cx="24" cy="24" r="12" fill="none" stroke="#3B82F6" strokeWidth=".6" opacity=".6"/><circle cx="24" cy="24" r="4" fill="#3B82F6" opacity=".4"/></svg>
        </div>
        <div className="absolute bottom-1/3 left-1/3 op opacity-[0.07] hidden lg:block" style={{animationDelay:'1.5s'}}>
          <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" fill="none" stroke="#8B5CF6" strokeWidth=".7"/><circle cx="18" cy="18" r="7" fill="none" stroke="#8B5CF6" strokeWidth=".5" opacity=".5"/></svg>
        </div>
        {/* Hex corners */}
        <div className="absolute bottom-20 left-0 opacity-[0.07] hidden sm:block">
          <svg width="70" height="56" viewBox="0 0 70 56">{([[10,12],[28,12],[46,12],[64,12],[19,26],[37,26],[55,26],[10,40],[28,40],[46,40],[64,40]] as [number,number][]).map(([x,y],i)=>(<polygon key={i} points={`${x},${y-6} ${x+5},${y-3} ${x+5},${y+3} ${x},${y+6} ${x-5},${y+3} ${x-5},${y-3}`} fill="none" stroke="#3B82F6" strokeWidth=".5" opacity=".5"/>))}</svg>
        </div>
        <div className="absolute bottom-20 right-0 opacity-[0.07] hidden sm:block">
          <svg width="70" height="56" viewBox="0 0 70 56">{([[10,12],[28,12],[46,12],[64,12],[19,26],[37,26],[55,26],[10,40],[28,40],[46,40],[64,40]] as [number,number][]).map(([x,y],i)=>(<polygon key={i} points={`${x},${y-6} ${x+5},${y-3} ${x+5},${y+3} ${x},${y+6} ${x-5},${y+3} ${x-5},${y-3}`} fill="none" stroke="#8B5CF6" strokeWidth=".5" opacity=".5"/>))}</svg>
        </div>
      </div>

      {/* ── Main content (z-10) ── */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col items-center text-center gap-6" style={{zIndex:10}}>

        {/* Available badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/25 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects — MENA &amp; Remote
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl">
          Build, Protect &amp; Grow Your<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-400 to-accent-blue bg-[length:200%_auto] animate-gradient-x">
            Business with Enterprise IT
          </span>
        </motion.h1>

        {/* Power line */}
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-xl sm:text-2xl font-black text-white">
          Outsource IT.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">
            Accelerate Everything.
          </span>
        </motion.p>

        {/* Subline */}
        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
          Senior IT consulting &amp; managed services —{' '}
          <strong className="text-white">Onsite across MENA</strong> and{' '}
          <strong className="text-white">Remote globally</strong>.
          Enterprise-grade IT delivered with AI automation, Azure security,
          and 15+ years of real enterprise experience.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-blue hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all">
            View Portfolio
          </Link>
        </motion.div>

        {/* Search bar */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="w-full max-w-xl">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent-blue/40 to-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl group-focus-within:border-accent-blue/40 transition-colors overflow-hidden">
              <Search className="w-4 h-4 text-gray-500 ml-4 flex-shrink-0" />
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, projects, articles…"
                className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none" />
              <button type="submit" className="m-1.5 px-4 py-2 rounded-xl bg-accent-blue/20 hover:bg-accent-blue/40 text-accent-blue text-xs font-bold transition-colors flex-shrink-0">
                Search
              </button>
            </div>
          </form>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {CHIPS.map(c => (
              <Link key={c.label} href={c.href}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/4 border border-white/8 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all">
                {c.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-4 border-t border-white/6 w-full max-w-lg">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-[11px] text-gray-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cert badges */}
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-2">
          {[
            { label: 'Azure Security', color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
            { label: 'SAP AI Hub',     color: 'text-orange-400 border-orange-500/20 bg-orange-500/5' },
            { label: 'SAP S/4HANA',   color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
            { label: 'CCNA Security', color: 'text-green-400 border-green-500/20 bg-green-500/5' },
            { label: 'ITIL v3',       color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' },
            { label: 'MBA · UK',      color: 'text-pink-400 border-pink-500/20 bg-pink-500/5' },
          ].map(c => (
            <span key={c.label} className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${c.color}`}>{c.label}</span>
          ))}
        </motion.div>

      </div>

      {/* ── Human + AI Collaboration Scene ── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative w-full max-w-3xl mx-auto px-4 pb-24"
        style={{zIndex:10}}>

        <style>{`
          /* Slow loading bar animations */
          @keyframes barFwd{
            0%   {transform:translateX(-100%);opacity:0}
            10%  {opacity:1}
            80%  {opacity:1}
            100% {transform:translateX(250%);opacity:0}
          }
          @keyframes barBwd{
            0%   {transform:translateX(100%);opacity:0}
            10%  {opacity:1}
            80%  {opacity:1}
            100% {transform:translateX(-250%);opacity:0}
          }
          /* Orbit rings */
          @keyframes orbitRing1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes orbitRing2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
          /* Data packets left→right */
          @keyframes pktFwd{0%{left:0%;opacity:0;transform:scale(.4)}15%{opacity:1;transform:scale(1)}85%{opacity:1;transform:scale(1)}100%{left:100%;opacity:0;transform:scale(.4)}}
          /* Data packets right→left */
          @keyframes pktBwd{0%{right:0%;opacity:0;transform:scale(.4)}15%{opacity:1;transform:scale(1)}85%{opacity:1;transform:scale(1)}100%{right:100%;opacity:0;transform:scale(.4)}}
          /* Avatar pulse glow */
          @keyframes avatarGlow{0%,100%{box-shadow:0 0 20px rgba(59,130,246,.5),0 0 40px rgba(59,130,246,.15)}50%{box-shadow:0 0 40px rgba(59,130,246,.9),0 0 70px rgba(6,182,212,.3)}}
          @keyframes botGlow{0%,100%{box-shadow:0 0 20px rgba(6,182,212,.5),0 0 40px rgba(6,182,212,.15)}50%{box-shadow:0 0 40px rgba(6,182,212,.9),0 0 70px rgba(59,130,246,.3)}}
          /* Centre badge pulse */
          @keyframes badgePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.04);opacity:.9}}
          /* Dot orbit */
          @keyframes dotOrbitL{from{transform:rotate(0deg) translateX(72px) rotate(0deg)}to{transform:rotate(360deg) translateX(72px) rotate(-360deg)}}
          @keyframes dotOrbitL2{from{transform:rotate(120deg) translateX(76px) rotate(-120deg)}to{transform:rotate(480deg) translateX(76px) rotate(-480deg)}}
          @keyframes dotOrbitR{from{transform:rotate(60deg) translateX(72px) rotate(-60deg)}to{transform:rotate(420deg) translateX(72px) rotate(-420deg)}}
          @keyframes dotOrbitR2{from{transform:rotate(200deg) translateX(76px) rotate(-200deg)}to{transform:rotate(560deg) translateX(76px) rotate(-560deg)}}
          .ring1{animation:orbitRing1 8s linear infinite}
          .ring2{animation:orbitRing2 12s linear infinite}
          .ring3{animation:orbitRing1 6s linear infinite}
          .ring4{animation:orbitRing2 10s linear infinite}
          .avatar-glow{animation:avatarGlow 3s ease-in-out infinite}
          .bot-glow{animation:botGlow 3s ease-in-out infinite}
          .badge-pulse{animation:badgePulse 2.5s ease-in-out infinite}
          .dot-l1{animation:dotOrbitL 4s linear infinite}
          .dot-l2{animation:dotOrbitL2 6s linear infinite}
          .dot-r1{animation:dotOrbitR 3.5s linear infinite}
          .dot-r2{animation:dotOrbitR2 5s linear infinite}
        `}</style>

        {/* Title above */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-accent-blue/10 border border-accent-blue/25 text-accent-blue uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            Human + AI = Real Magic
          </span>
        </div>

        {/* Main row */}
        <div className="flex items-center justify-center gap-0">

          {/* ── LEFT: Waqas ── */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            {/* Avatar with orbit rings + dots */}
            <div className="relative flex items-center justify-center" style={{width:160,height:160}}>
              {/* Glow blob */}
              <div className="absolute inset-0 rounded-full bg-accent-blue/10 blur-2xl" />
              {/* Orbit ring 1 */}
              <div className="ring1 absolute rounded-full border border-dashed border-accent-blue/30" style={{width:148,height:148}} />
              {/* Orbit ring 2 */}
              <div className="ring2 absolute rounded-full border border-cyan-400/15" style={{width:158,height:158}} />
              {/* Orbiting dots */}
              <div className="absolute" style={{width:0,height:0,top:'50%',left:'50%'}}>
                <div className="dot-l1 absolute w-2.5 h-2.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,1)]" style={{marginTop:-5,marginLeft:-5}} />
              </div>
              <div className="absolute" style={{width:0,height:0,top:'50%',left:'50%'}}>
                <div className="dot-l2 absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,1)]" style={{marginTop:-4,marginLeft:-4}} />
              </div>
              {/* Photo */}
              <div className="avatar-glow relative w-28 h-28 rounded-full border-2 border-accent-blue/60 overflow-hidden z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/waqas-avatar.jpg" alt="Waqas" className="w-full h-full object-cover" style={{objectPosition:'center 5%'}}/>
              </div>
              {/* Online dot */}
              <span className="absolute bottom-3 right-3 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(74,222,128,.8)] z-20" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-white tracking-wide">Waqas</p>
              <p className="text-[11px] text-gray-500 mt-0.5">IT Consultant · AI Engineer</p>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/10 border border-green-500/20 text-green-400">Human</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">15+ yrs</span>
              </div>
            </div>
          </div>

          {/* ── CENTRE: Slow loading-bar data flow ── */}
          <div className="flex-1 flex flex-col items-center gap-2 px-2 sm:px-4" style={{minWidth:130,maxWidth:230}}>

            {/* Forward bars: Human → AI (knowledge/data labels) */}
            <div className="w-full flex flex-col gap-1.5">
              {[
                { label: 'Experience',  color: '#3B82F6', delay: '0s',    dur: '4s'  },
                { label: 'Creativity',  color: '#06B6D4', delay: '1.3s',  dur: '5s'  },
                { label: 'Judgement',   color: '#8B5CF6', delay: '2.6s',  dur: '4.5s'},
                { label: 'Domain Know', color: '#10B981', delay: '0.7s',  dur: '6s'  },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono whitespace-nowrap w-16 text-right" style={{color: b.color, opacity: 0.7}}>{b.label}</span>
                  <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{background:`${b.color}18`}}>
                    <div className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${b.color}, ${b.color}cc, transparent)`,
                        animation: `barFwd ${b.dur} ease-in-out infinite`,
                        animationDelay: b.delay,
                        width: '45%',
                      }} />
                  </div>
                  <span className="text-[8px] text-gray-700 font-mono">→</span>
                </div>
              ))}
            </div>

            {/* Centre badge */}
            <div className="badge-pulse flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl bg-dark-800/90 border border-white/10 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,.5)] my-1">
              <div className="text-sm font-black text-white leading-none">Human + AI</div>
              <div className="text-[10px] text-accent-blue font-bold tracking-widest uppercase">= Real Magic</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                <span className="text-[9px] text-gray-600">Data Sync</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{animationDelay:'.5s'}} />
              </div>
            </div>

            {/* Backward bars: AI → Human */}
            <div className="w-full flex flex-col gap-1.5">
              {[
                { label: 'Insights',    color: '#22D3EE', delay: '0.5s',  dur: '4.5s'},
                { label: 'Automation',  color: '#A78BFA', delay: '1.8s',  dur: '5s'  },
                { label: 'Speed',       color: '#34D399', delay: '3.1s',  dur: '3.8s'},
                { label: 'Scale',       color: '#F472B6', delay: '1.1s',  dur: '6s'  },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[8px] text-gray-700 font-mono">←</span>
                  <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{background:`${b.color}18`}}>
                    <div className="absolute right-0 top-0 h-full rounded-full"
                      style={{
                        background: `linear-gradient(270deg, transparent, ${b.color}, ${b.color}cc, transparent)`,
                        animation: `barBwd ${b.dur} ease-in-out infinite`,
                        animationDelay: b.delay,
                        width: '45%',
                      }} />
                  </div>
                  <span className="text-[8px] font-mono whitespace-nowrap w-16" style={{color: b.color, opacity: 0.7}}>{b.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Waqas Agentic Bot ── */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="relative flex items-center justify-center" style={{width:160,height:160}}>
              <div className="absolute inset-0 rounded-full bg-cyan-400/8 blur-2xl" />
              <div className="ring3 absolute rounded-full border border-dashed border-cyan-400/25" style={{width:148,height:148}} />
              <div className="ring4 absolute rounded-full border border-accent-blue/15" style={{width:158,height:158}} />
              <div className="absolute" style={{width:0,height:0,top:'50%',left:'50%'}}>
                <div className="dot-r1 absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" style={{marginTop:-5,marginLeft:-5}} />
              </div>
              <div className="absolute" style={{width:0,height:0,top:'50%',left:'50%'}}>
                <div className="dot-r2 absolute w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,1)]" style={{marginTop:-4,marginLeft:-4}} />
              </div>
              <div className="bot-glow relative w-28 h-28 rounded-full border-2 border-cyan-400/60 overflow-hidden bg-dark-900 z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/nexus-bot.jpg" alt="Waqas Agentic Bot" className="w-full h-full object-cover object-top"/>
              </div>
              <span className="absolute bottom-3 right-3 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-dark-900 shadow-[0_0_8px_rgba(6,182,212,.9)] animate-pulse z-20" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-cyan-400 tracking-wide">Waqas Agentic Bot</p>
              <p className="text-[11px] text-gray-500 mt-0.5">AI Automation · Claude Powered</p>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">AI Agent</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/10 border border-violet-500/20 text-violet-400">Always On</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom caption */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            Neither alone achieves the best outcome —{' '}
            <span className="text-white font-semibold">human judgement</span> and{' '}
            <span className="text-cyan-400 font-semibold">AI capability</span> together unlock what neither can do alone.
          </p>
        </div>

      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" style={{zIndex:5}} />
    </section>
  )
}

