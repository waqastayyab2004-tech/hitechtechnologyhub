import type { Metadata } from 'next'
import SapCoursesClient from './SapCoursesClient'

export const metadata: Metadata = {
  title: 'SAP Courses — Waqas Syed | Learn SAP from a Senior SAP Engineer',
  description: 'SAP courses taught by Waqas Syed — SAP IT Asset Lifecycle, CLEA SAP BTP App, SAP Generative AI Developer, SAP Build No-Code Automation and more.',
}

export default function Page() {
  return <SapCoursesClient />
}
