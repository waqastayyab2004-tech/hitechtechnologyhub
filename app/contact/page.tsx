import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us — Free IT Consultation | Syed Waqas Tayyab',
  description: 'Request a free IT consultation — Onsite across MENA and Remote worldwide. Senior IT Engineer, Azure Security Certified, 15+ years enterprise IT experience.',
}

export default function ContactPage() {
  return <ContactClient />
}
