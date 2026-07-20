import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'IT Services — HiTecH AI HUB | Enterprise IT Consulting & AI Automation',
  description: 'Enterprise IT consulting, AI automation, Azure security, Microsoft 365 admin, and ServiceNow ITSM. Onsite across MENA and remotely worldwide.',
}

export default function Page() {
  return <ServicesClient />
}
