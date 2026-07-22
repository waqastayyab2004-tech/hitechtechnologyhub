import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import AIChatbot from '@/components/ui/AIChatbot'
import HomeButton from '@/components/ui/HomeButton'
import BackButton from '@/components/ui/BackButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hitechtechnologyhub.com'),
  title: {
    default: 'HiTecH AI HUB by Waqas — IT Consultant · AI Engineer · Corporate IT Expert',
    template: '%s | HiTecH AI HUB',
  },
  description:
    'HiTecH AI HUB — Generative AI, Automation, ML, Robotics & Agentic AI. IT Consultant and Corporate IT Expert with 15+ years and 100+ projects. Helping IT professionals adopt AI faster with real corporate industry knowledge.',
  keywords: [
    'HiTecH AI HUB', 'Generative AI', 'Agentic AI', 'ML', 'Automation', 'Robotics',
    'IT Consultant', 'Corporate IT Expert', 'AI Engineer',
    'Cybersecurity', 'Cloud Computing', 'IT Infrastructure',
    'ServiceNow', 'Azure', 'SAP', 'Technology Hub', 'Waqas', 'Syed Waqas Tayyab',
  ],
  authors: [{ name: 'Waqas Syed', url: 'https://www.hitechtechnologyhub.com' }],
  creator: 'Waqas Syed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hitechtechnologyhub.com',
    siteName: 'HiTecH AI HUB',
    title: 'HiTecH AI HUB by Waqas — IT Consultant · AI Engineer',
    description:
      'GenAI · Automation · ML · Robotics · Agentic AI. IT Consultant with 15+ years and 100+ projects helping IT professionals adopt AI faster.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'HiTecH AI HUB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HiTecH AI HUB by Waqas',
    description:
      'GenAI · Automation · ML · Robotics · Agentic AI. Learn AI. Build Smarter. Automate Everything.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var hash = window.location.hash;
            if (hash && (hash.indexOf('invite_token=') > -1 || hash.indexOf('recovery_token=') > -1 || hash.indexOf('confirmation_token=') > -1)) {
              window.location.replace('/admin/' + hash);
            }
          })();
        `}} />
      </head>
      <body className="bg-dark-900 text-gray-100 antialiased">
        <Navbar />
        <BackButton />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
        <AIChatbot />
        <HomeButton />
      </body>
    </html>
  )
}
