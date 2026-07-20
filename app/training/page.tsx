import type { Metadata } from 'next'
import TrainingClient from './TrainingClient'

export const metadata: Metadata = {
  title: 'IT Learning — HiTecH AI HUB | 22 Free & Paid IT Courses',
  description: 'Learn enterprise IT, AI automation, cloud security and ServiceNow with 22 courses built from 15+ years of real corporate IT experience.',
}

export default function Page() {
  return <TrainingClient />
}
