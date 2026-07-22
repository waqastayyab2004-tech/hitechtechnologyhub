'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

/* Map path prefix → back destination + label */
const BACK_MAP: { match: RegExp; label: string; href: string }[] = [
  { match: /^\/training\/\d+/, label: 'IT Learning',      href: '/training'        },
  { match: /^\/blog\//,        label: 'Articles',         href: '/blog'            },
  { match: /^\/training/,      label: 'Home',             href: '/'                },
  { match: /^\/projects/,      label: 'Home',             href: '/'                },
  { match: /^\/about/,         label: 'Home',             href: '/'                },
  { match: /^\/services/,      label: 'Home',             href: '/'                },
  { match: /^\/research/,      label: 'Home',             href: '/'                },
  { match: /^\/insights/,      label: 'Home',             href: '/'                },
  { match: /^\/resources/,     label: 'Home',             href: '/'                },
  { match: /^\/hire/,          label: 'Home',             href: '/'                },
  { match: /^\/contact/,       label: 'Home',             href: '/'                },
  { match: /^\/medical-billing/,label: 'Services',        href: '/services'        },
  { match: /^\/industries/,    label: 'Services',         href: '/services'        },
  { match: /^\/topics/,        label: 'Home',             href: '/'                },
]

export default function BackButton() {
  const pathname = usePathname()
  const router   = useRouter()

  // Don't show on homepage
  if (pathname === '/') return null

  const entry = BACK_MAP.find(e => e.match.test(pathname))
  if (!entry) return null

  return (
    <div className="fixed top-[64px] left-0 right-0 z-40 border-b border-white/5 bg-dark-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center">
        <Link
          href={entry.href}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {entry.label === 'Home'
            ? <><Home className="w-3 h-3" /> Home</>
            : entry.label
          }
        </Link>
      </div>
    </div>
  )
}
