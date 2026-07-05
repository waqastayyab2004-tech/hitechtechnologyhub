import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[10rem] font-black leading-none select-none">
            <span className="gradient-text">4</span>
            <span className="text-dark-700">0</span>
            <span className="gradient-text">4</span>
          </div>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-accent-blue via-transparent to-accent-blue" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link href="/blog" className="btn-outline">
            <ArrowLeft className="w-4 h-4" /> Read the Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
