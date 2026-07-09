import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on AI, automation, cybersecurity, cloud computing and IT tips by Waqas Syed.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <h1 className="section-heading mb-4">
          The <span className="gradient-text">Blog</span>
        </h1>
        <p className="section-subheading">
          Practical articles on AI, automation, cybersecurity, and cloud technology.
        </p>
      </ScrollReveal>

      {/* Featured post */}
      {featured && (
        <ScrollReveal className="mb-12">
          <Link href={`/blog/${featured.slug}`} className="block glass-card-hover p-8 md:p-10 group">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Featured image */}
              <div className="w-full md:w-72 h-48 rounded-xl overflow-hidden flex-shrink-0 border border-accent-blue/10 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sustainability-banner.avif"
                  alt="Sustainable IT — Featured Article"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black bg-accent-yellow/20 border border-accent-yellow/30 text-accent-yellow">
                  ★ FEATURED
                </span>
              </div>
              <div className="flex-1">
                <span className="badge bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 mb-3">
                  Featured Post
                </span>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-accent-blue font-medium text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      )}

      {/* All posts grid */}
      <h2 className="text-xl font-bold text-white mb-6">All Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.07}>
            <Link href={`/blog/${post.slug}`} className="block glass-card-hover p-6 h-full group flex flex-col">
              {/* Color bar */}
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple mb-5" />
              <h3 className="font-bold text-white mb-3 group-hover:text-accent-blue transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
