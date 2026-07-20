import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'Portfolio — Waqas Syed | IT Consultant · AI Engineer · Azure Security',
  description: 'Portfolio of Waqas Syed — Senior IT Engineer at SAP, 15+ years, 13+ certifications including Azure Security & SAP AI Hub, MBA. 100+ enterprise projects across MENA.',
}

export default function Page() {
  return <AboutClient />
}
