'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Facebook, Send, CheckCircle, MapPin, Phone, MessageCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const socials = [
  { icon: Phone, label: 'Mobile', value: '+966 505803073', href: 'tel:+966505803073', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+966 505803073', href: 'https://wa.me/966505803073', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Mail, label: 'Email', value: 'waqastayyab2004@gmail.com', href: 'mailto:waqastayyab2004@gmail.com', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/syedwaqastayyab', href: 'https://www.linkedin.com/in/syedwaqastayyab/', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Facebook, label: 'Facebook', value: 'HiTech Technology HUB', href: 'https://www.facebook.com/profile.php?id=61551726961739', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
]

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    const mailtoLink = `mailto:waqastayyab2004@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailtoLink
    setSubmitted(true)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="section-subheading">
          Have a question, project idea, or just want to connect? I&apos;d love to hear from you.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact info */}
        <ScrollReveal className="lg:col-span-2" direction="right">
          <div className="space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4 text-accent-blue" />
                Riyadh, Saudi Arabia — SAP IT RUH02
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                IT System Engineer passionate about AI, automation, and making technology accessible. Always open to collaborating on interesting tech projects.
              </p>
            </div>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="glass-card-hover p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="text-sm text-white font-medium">{s.value}</div>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal className="lg:col-span-3" direction="left">
          <div className="glass-card p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle className="w-14 h-14 text-green-400" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400">Your email client should have opened. I&apos;ll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-700 border text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${errors.name ? 'border-red-500/60 focus:ring-red-500/30' : 'border-white/10 focus:border-accent-blue/60 focus:ring-accent-blue/30'}`}
                      placeholder="Waqas Syed"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-700 border text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${errors.email ? 'border-red-500/60 focus:ring-red-500/30' : 'border-white/10 focus:border-accent-blue/60 focus:ring-accent-blue/30'}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl bg-dark-700 border text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${errors.subject ? 'border-red-500/60 focus:ring-red-500/30' : 'border-white/10 focus:border-accent-blue/60 focus:ring-accent-blue/30'}`}
                    placeholder="Project collaboration, question..."
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl bg-dark-700 border text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all resize-none ${errors.message ? 'border-red-500/60 focus:ring-red-500/30' : 'border-white/10 focus:border-accent-blue/60 focus:ring-accent-blue/30'}`}
                    placeholder="Tell me about your project or question..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
