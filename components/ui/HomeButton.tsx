'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home } from 'lucide-react'

export default function HomeButton() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [inIframe, setInIframe] = useState(false)

  useEffect(() => {
    try { setInIframe(window.self !== window.top) } catch { setInIframe(true) }
  }, [])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'
  const show = (isHome ? visible : true) && !inIframe

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 left-6 z-50"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-dark-800/95 border border-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-accent-blue/60 hover:bg-dark-700/95 hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)] transition-all duration-200"
            aria-label="Go to Home"
          >
            <div className="w-8 h-8 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/25 transition-colors">
              <Home className="w-4 h-4 text-accent-blue" />
            </div>
            <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Home</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
