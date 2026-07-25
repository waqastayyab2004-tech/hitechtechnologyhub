import type { Metadata } from 'next'
import SapSkillsClient from './SapSkillsClient'

export const metadata: Metadata = {
  title: 'SAP Skills — Waqas Syed | SAP BTP, HANA, S/4HANA, AI Launchpad',
  description: 'Full SAP skills profile: SAP Platform, SAP AI & Data, and SAP Integrations — built across 11 years as Senior IT System Engineer at SAP Saudi Arabia.',
}

export default function Page() {
  return <SapSkillsClient />
}
