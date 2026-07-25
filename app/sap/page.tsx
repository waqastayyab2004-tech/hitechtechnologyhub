import type { Metadata } from 'next'
import SapHubClient from './SapHubClient'

export const metadata: Metadata = {
  title: 'SAP Hub — Waqas Syed | 11 Years at SAP · 5 Certifications',
  description: 'SAP specialist with 11+ years at SAP Saudi Arabia. Senior IT System Engineer, certified in SAP Generative AI, HANA ML, S/4HANA, Analytics Cloud and SAP Build.',
}

export default function Page() {
  return <SapHubClient />
}
