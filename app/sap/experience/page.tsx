import type { Metadata } from 'next'
import SapExpClient from './SapExpClient'

export const metadata: Metadata = {
  title: 'SAP Experience — Waqas Syed | 11 Years Senior IT Engineer at SAP',
  description: 'Career timeline at SAP: IT Administrator (2015–2019) → Senior IT System Engineer (2019–Present). IT SPOC for SAP Saudi Arabia, managing multi-city infrastructure.',
}

export default function Page() {
  return <SapExpClient />
}
