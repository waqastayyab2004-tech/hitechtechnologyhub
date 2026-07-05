import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Waqas Syed — IT System Engineer, AI Enthusiast, and Automation Builder based in Riyadh, Saudi Arabia.',
}

export default function ContactPage() {
  return <ContactClient />
}
