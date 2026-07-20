import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects — HiTecH AI HUB | 44 Real Enterprise IT Projects',
  description: 'Browse 44 real enterprise IT projects — AI dashboards, ServiceNow ITSM, Azure Security, IT Asset Management, and more. Full PMP documentation included.',
}

export default function Page() {
  return <ProjectsClient />
}
