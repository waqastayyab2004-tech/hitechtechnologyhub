'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center glass-card p-10 md:p-14 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-accent-blue" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Stay Up to Date
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Get the latest articles on AI, automation, cybersecurity and cloud computing delivered to your inbox.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-green-400 text-lg font-semibold">
                <CheckCircle className="w-6 h-6" />
                You&apos;re subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30 transition-all"
                  aria-label="Email address"
                />
                <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
            <p className="mt-4 text-gray-600 text-xs">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
