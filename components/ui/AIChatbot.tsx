'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'bot' | 'user'
  text: string
  time?: string
}

const QUICK_CHIPS = [
  { label: '💼 Services & rates',   text: 'What IT services do you offer and what are the rates?' },
  { label: '🏆 Skills & certs',     text: 'What are Waqas skills and certifications?' },
  { label: '📚 Free courses',       text: 'What free IT courses are available?' },
  { label: '🤝 How to hire',        text: 'How can I hire Waqas for a project?' },
  { label: '🤖 AI & automation',    text: 'What AI and automation projects has Waqas built?' },
  { label: '📞 Contact details',    text: 'How can I contact Waqas?' },
]

const CHAT_API = '/api/chat'

const GREETING = `Hi! I'm Waqas AI ChatBot 🤖

Ask me anything about:
• Waqas's skills & experience
• Services & freelance projects
• IT consulting & AI automation
• How to hire Waqas
• General IT, AI & tech topics

How can I help you today?`

const FALLBACK: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /hire|work|project|freelance|consult/i,
    reply: `Waqas is available for:\n\n• IT Service Delivery Lead\n• IT Infrastructure Consulting\n• AI & Automation projects\n• Azure Security assessments\n• SAP & ServiceNow integrations\n\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n\nVisit the /hire page for full details!`,
  },
  {
    pattern: /skill|expert|know|experience|speciali/i,
    reply: `Waqas has 15+ years across:\n\n🔵 IT Service Delivery & ITSM\n🔵 Azure Security (Certified)\n🔵 SAP S/4HANA & Analytics Cloud\n🔵 ServiceNow ITSM\n🔵 Microsoft 365 Admin\n🔵 AI/ML & Agentic AI\n🔵 CCNA Security & Networking\n\n100+ projects delivered across MENA!`,
  },
  {
    pattern: /cert|certif|qualify|degree|mba/i,
    reply: `13 certifications including:\n\n🏆 Azure Security Engineer Associate\n🏆 SAP Python ML / SAP HANA (2026)\n🏆 SAP S/4HANA Technology Consultant\n🏆 SAP Analytics Cloud\n🏆 CCNA Security\n🏆 ITIL v3 Foundation\n🏆 PMP Training (35 PDUs)\n🎓 MBA — Buckinghamshire Uni, UK`,
  },
  {
    pattern: /contact|email|phone|whatsapp|reach|call/i,
    reply: `Reach Waqas directly:\n\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n💬 WhatsApp: wa.me/966505803073\n💼 LinkedIn: /in/syedwaqastayyab\n\n📍 Riyadh, Saudi Arabia · Open to MENA + Remote!`,
  },
  {
    pattern: /price|cost|rate|charge|budget|pay/i,
    reply: `Freelance services from:\n\n💰 AI Automation: From $500\n💰 IT Infrastructure: From $600\n💰 Azure Security: From $600\n💰 Web App Dev: From $800\n💰 SAP Integration: From $1,000\n💰 M365 Advisory: From $400\n\n📧 waqastayyab2004@gmail.com for custom quotes`,
  },
  {
    pattern: /hello|hi|hey|greet|good/i,
    reply: `Hello! 👋 Great to meet you!\n\nI'm NEXUS-W1 — Waqas's AI bot.\n\nWaqas is a Senior IT Engineer with 15+ years at SAP, Azure Security certified, MBA graduate, and AI/ML enthusiast with 100+ projects delivered.\n\nWhat would you like to know?`,
  },
  {
    pattern: /ai|ml|machine|automat|robot|agentic|python/i,
    reply: `Waqas's AI expertise:\n\n🤖 SAP HANA Python ML (certified 2026)\n🤖 Agentic AI & LLM pipelines\n🤖 Claude AI integration\n🤖 ServiceNow automation\n🤖 FastAPI + Next.js dashboards\n🤖 WhatsApp alert systems\n\nHe built this chatbot and website! 😄`,
  },
  {
    pattern: /sap|servicenow|azure|cloud|m365|microsoft/i,
    reply: `Waqas's enterprise stack:\n\n• 11+ years at SAP Riyadh\n• ServiceNow ITSM admin & automation\n• Azure Security Engineer (certified)\n• M365 full-stack admin (Copilot too)\n• SAP BTP, Ariba, Analytics Cloud\n• SAP S/4HANA system admin\n\nNeed SAP or Azure help? He's your expert! 🚀`,
  },
]

function getFallbackReply(input: string): string {
  for (const { pattern, reply } of FALLBACK) {
    if (pattern.test(input)) return reply
  }
  return `Thanks for your message! For a full answer, contact Waqas directly:\n\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n\nOr explore:\n• /hire — full profile & services\n• /blog — free tech articles\n• /contact — send a message`
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function AIChatbot() {
  const [open, setOpen]               = useState(false)
  const [minimized, setMinimized]     = useState(false)
  const [chipsVisible, setChipsVisible] = useState(true)
  const [messages, setMessages]       = useState<Message[]>([{ role: 'bot', text: GREETING, time: now() }])
  const [input, setInput]             = useState('')
  const [typing, setTyping]           = useState(false)
  const [aiMode, setAiMode]           = useState<'online' | 'offline' | 'checking'>('checking')
  const bottomRef = useRef<HTMLDivElement>(null)

  /* Check API */
  useEffect(() => {
    fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'ping', history: [] }),
      signal: AbortSignal.timeout(3000),
    })
      .then(r => { setAiMode(r.ok ? 'online' : 'offline') })
      .catch(() => setAiMode('offline'))
  }, [])

  useEffect(() => {
    if (open && !minimized) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, minimized])

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim()
    if (!text || typing) return

    const userMsg: Message = { role: 'user', text, time: now() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setChipsVisible(false)

    const history = messages.slice(-16).map(m => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text,
    }))

    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setAiMode(
        data.model && !['smart-fallback','offline','error'].includes(data.model)
          ? 'online' : 'offline'
      )
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', text: data.reply, time: now() }])
    } catch {
      setAiMode('offline')
      await new Promise(r => setTimeout(r, 600))
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', text: getFallbackReply(text), time: now() }])
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* ── Floating trigger — bottom-right ── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="bg-dark-800/90 backdrop-blur-sm border border-accent-blue/30 rounded-xl px-3 py-1.5 text-xs text-accent-blue font-medium shadow-glow whitespace-nowrap"
            >
              Waqas AI ChatBot 🤖
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => { setOpen(true); setMinimized(false) }}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className="relative rounded-full shadow-[0_0_35px_rgba(59,130,246,0.7)] overflow-hidden border-[3px] border-accent-blue/80 bg-dark-800"
          style={{ width: '72px', height: '72px' }}
          aria-label="Open AI Chat"
        >
          <RobotAvatar />
          <span className="absolute inset-0 rounded-full border-2 border-accent-blue/40 animate-ping" />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
        </motion.button>
      </div>

      {/* ── Chat window — bottom-right ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col rounded-2xl overflow-hidden border border-accent-blue/30 shadow-[0_8px_60px_rgba(59,130,246,0.3)] bg-dark-800/95 backdrop-blur-md"
            style={{ width: 'min(480px, calc(100vw - 24px))', maxHeight: minimized ? 'auto' : '620px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-dark-900 to-dark-800 border-b border-white/8 flex-shrink-0">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-accent-blue/50 flex-shrink-0">
                <RobotAvatar />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Waqas AI ChatBot</span>
                  {aiMode === 'online'    && <span className="flex items-center gap-1 text-xs text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Claude AI</span>}
                  {aiMode === 'offline'   && <span className="flex items-center gap-1 text-xs text-yellow-400"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />Smart Mode</span>}
                  {aiMode === 'checking'  && <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />Connecting...</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {aiMode === 'online' ? 'Powered by Claude · HiTecH AI HUB' : "Waqas's AI Assistant"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMinimized(v => !v)} className="w-7 h-7 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors">
                  {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '420px' }}>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {m.role === 'bot' && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-accent-blue/40 flex-shrink-0 mt-1">
                          <RobotAvatar />
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5" style={{ maxWidth: '82%', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div
                          className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                            m.role === 'bot'
                              ? 'bg-dark-700 border border-white/8 text-gray-200 rounded-tl-none'
                              : 'bg-accent-blue text-white rounded-tr-none'
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: m.role === 'bot'
                              ? m.text
                                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n/g, '<br/>')
                                  .replace(/^(\d+\.) /gm, '<span class="font-semibold text-accent-blue">$1</span> ')
                                  .replace(/^• /gm, '<span class="text-accent-blue">•</span> ')
                              : m.text.replace(/\n/g, '<br/>')
                          }}
                        />
                        {m.time && <span className="text-[9px] text-gray-700 px-1">{m.time}</span>}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-accent-blue/40 flex-shrink-0 mt-1"><RobotAvatar /></div>
                      <div className="bg-dark-700 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Quick chips */}
                <AnimatePresence>
                  {chipsVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-2 pt-2 flex flex-wrap gap-1.5 border-t border-white/6"
                    >
                      {QUICK_CHIPS.map(chip => (
                        <button
                          key={chip.label}
                          onClick={() => send(chip.text)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-accent-blue/10 border border-accent-blue/20 text-accent-blue hover:bg-accent-blue/20 transition-colors whitespace-nowrap"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input */}
                <div className="flex gap-2 p-3 border-t border-white/8 flex-shrink-0">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask me anything about Waqas or IT..."
                    className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-xl bg-accent-blue hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function RobotAvatar() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/nexus-bot.jpg" alt="NEXUS-W1 AI Bot" className="w-full h-full object-cover object-top" />
  )
}
