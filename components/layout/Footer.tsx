import Link from 'next/link'
import { Zap, Facebook, Linkedin, Github, Mail, Heart } from 'lucide-react'

const footerLinks = {
  Pages: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Portfolio' },
    { href: '/topics', label: 'Topics' },
    { href: '/projects', label: 'Projects' },
  ],
  Content: [
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
    { href: '/hire', label: '🎯 Hire Me' },
  ],
  Topics: [
    { href: '/topics', label: 'Artificial Intelligence' },
    { href: '/topics', label: 'Automation' },
    { href: '/topics', label: 'Cybersecurity' },
    { href: '/topics', label: 'Cloud Computing' },
  ],
}

const socialLinks = [
  { href: 'https://www.facebook.com/profile.php?id=61551726961739', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.linkedin.com/in/syedwaqastayyab/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/waqas-syed', icon: Github, label: 'GitHub' },
  { href: 'mailto:waqastayyab2004@gmail.com', icon: Mail, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base leading-tight">
                  <span className="text-accent-blue">HiTecH</span>
                  <span className="text-white"> AI HUB</span>
                </span>
                <span className="text-[9px] text-gray-500 font-medium tracking-wide">
                  GenAI · Automation · ML · Robotics · Agentic AI
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-xs mt-3">
              IT Consultant · AI Engineer · Corporate IT Expert with 15+ years and 100+ projects.
              Training young IT professionals to adopt AI with real-world corporate knowledge.
            </p>
            <p className="text-gray-500 text-xs italic mb-6 max-w-xs border-l-2 border-accent-blue/30 pl-2">
              &ldquo;Bridging the gap between AI potential and corporate IT reality.&rdquo;
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-dark-700 border border-white/5 flex items-center justify-center text-gray-400 hover:text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/10 transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-accent-blue transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HiTecH Technology HUB by Waqas. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
