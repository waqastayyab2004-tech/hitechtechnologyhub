import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'AI Tools — HiTecH AI HUB | Top AI Tools for IT Professionals',
  description: 'Curated top AI tools for IT professionals — automation, security, productivity, coding, and enterprise AI. Personally evaluated by Waqas Syed.',
}

export default function Page() {
  return <ResourcesClient />
}
