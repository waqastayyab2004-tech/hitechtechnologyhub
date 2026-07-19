'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home } from 'lucide-react'

export default function HomeButton() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  // Show when scrolled down OR on any page that is not the homepage
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't show on home page when at the top
  const isHome = pathname === '/'
  const show = isHome ? visible : true

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-1.5"
        >
          <Link
            href="/"
            className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-dark-800/90 border border-white/15 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-accent-blue/50 hover:bg-dark-700/90 transition-all duration-200"
            aria-label="Go to Home"
          >
            <Home className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
          </Link>
          <span className="text-[9px] text-gray-600 font-semibold uppercase tracking-widest">Home</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
