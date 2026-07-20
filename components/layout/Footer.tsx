import Link from 'next/link'
import { Zap, Linkedin, Github, Mail, Heart, Twitter } from 'lucide-react'

const footerLinks = {
  'Services': [
    { href: '/services',        label: 'IT Services' },
    { href: '/medical-billing', label: 'Medical Billing' },
    { href: '/industries',      label: 'Industries' },
    { href: '/hire',            label: 'Hire Waqas' },
    { href: '/contact',         label: 'Free Consultation' },
  ],
  'Learn': [
    { href: '/training',  label: 'IT Courses' },
    { href: '/blog',      label: 'Articles' },
    { href: '/insights',  label: 'Insights' },
    { href: '/resources', label: 'AI Tools' },
    { href: '/research',  label: 'Research' },
  ],
  'Work': [
    { href: '/projects', label: 'Projects' },
    { href: '/about',    label: 'Portfolio & CV' },
    { href: '/about',    label: 'Certifications' },
    { href: '/hire',     label: 'Rates & Services' },
  ],
}

const socialLinks = [
  { href: 'https://www.linkedin.com/in/syedwaqastayyab/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/waqastayyab2004-tech',      icon: Github,   label: 'GitHub' },
  { href: 'mailto:waqastayyab2004@gmail.com',             icon: Mail,     label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base leading-tight">
                  <span className="text-accent-blue">HiTecH</span>
                  <span className="text-white"> AI HUB</span>
                </span>
                <span className="text-[9px] text-gray-500 font-medium tracking-wide">
                  IT Consulting · Training · AI
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-xs">
              Senior IT Consultant &amp; AI Engineer with 15+ years and 100+ projects.
              Helping IT professionals and businesses adopt AI with real enterprise knowledge.
            </p>
            <p className="text-gray-500 text-xs italic mb-5 max-w-xs border-l-2 border-accent-blue/30 pl-2">
              &ldquo;Bridging the gap between AI potential and corporate IT reality.&rdquo;
            </p>
            {/* Contact quick links */}
            <div className="flex flex-wrap gap-2 mb-5">
              <a href="mailto:waqastayyab2004@gmail.com"
                className="text-xs text-gray-500 hover:text-accent-blue transition-colors">
                waqastayyab2004@gmail.com
              </a>
              <span className="text-gray-700">·</span>
              <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-green-400 transition-colors">
                WhatsApp
              </a>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-dark-700 border border-white/5 flex items-center justify-center text-gray-400 hover:text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/10 transition-all duration-200">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-gray-500 text-sm hover:text-accent-blue transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} HiTecH AI HUB by Waqas Syed · Riyadh, KSA · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/research" className="text-gray-600 text-xs hover:text-accent-blue transition-colors">Research</Link>
            <Link href="/sitemap.xml" className="text-gray-600 text-xs hover:text-accent-blue transition-colors">Sitemap</Link>
            <a href="/admin" className="text-gray-700 text-xs hover:text-gray-500 transition-colors">⚙️ CMS</a>
            <p className="text-gray-700 text-xs flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 mx-0.5" /> Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
