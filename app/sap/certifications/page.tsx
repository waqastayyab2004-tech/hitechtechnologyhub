import type { Metadata } from 'next'
import SapCertsClient from './SapCertsClient'

export const metadata: Metadata = {
  title: 'SAP Certifications — Waqas Syed | SAP Certified AI, HANA, S/4HANA',
  description: 'Full list of SAP certifications held by Waqas Syed — SAP Generative AI Developer, HANA Python ML, S/4HANA System Administration, SAP Analytics Cloud and SAP Build.',
}

export default function Page() {
  return <SapCertsClient />
}
