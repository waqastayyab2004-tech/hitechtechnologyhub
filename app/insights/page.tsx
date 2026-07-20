import type { Metadata } from 'next'
import InsightsClient from './InsightsClient'

export const metadata: Metadata = {
  title: 'IT Insights — HiTecH AI HUB | AI, Cloud & Enterprise IT Topics',
  description: 'Deep-dive IT topics: AI automation, cybersecurity, cloud, ServiceNow, Microsoft 365, and enterprise IT strategy from a 15-year corporate IT expert.',
}

export default function Page() {
  return <InsightsClient />
}
