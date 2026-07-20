import type { Metadata } from 'next'
import MedicalBillingClient from './MedicalBillingClient'

export const metadata: Metadata = {
  title: 'Medical Billing Services — HiTecH AI HUB | US RCM Outsourcing',
  description: 'Expert US medical billing and RCM outsourcing. ICD-10 coding, denial management, A/R follow-up, HIPAA compliant. 3–5% of collections, no flat fees.',
}

export default function Page() {
  return <MedicalBillingClient />
}
