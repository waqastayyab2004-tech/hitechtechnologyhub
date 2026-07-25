'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Award, Briefcase, BookOpen, Cpu, LayoutDashboard } from 'lucide-react'

const links = [
  { href: '/sap',                  icon: LayoutDashboard, label: 'SAP Overview'      },
  { href: '/sap/certifications',   icon: Award,           label: 'Certifications'    },
  { href: '/sap/experience',       icon: Briefcase,       label: 'Experience'        },
  { href: '/sap/courses',          icon: BookOpen,        label: 'Courses I Teach'   },
  { href: '/sap/skills',           icon: Cpu,             label: 'Skills & Tools'    },
]

export default function SapSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-24 self-start gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2 px-3">SAP Hub</p>
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${active
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-l-2 border-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </aside>

      {/* Mobile tab row */}
      <nav className="lg:hidden flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${active
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
