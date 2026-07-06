import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'Top 20 AI tools for IT professionals in 2026 — AI assistants, coding, automation, security, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
