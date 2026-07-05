import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-blue transition-colors text-sm mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* ── Article Header ── */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 border border-accent-blue/25 text-accent-blue">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-400 text-lg leading-relaxed mb-7 border-l-4 border-accent-blue/50 pl-4">
            {post.excerpt}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 py-5 border-y border-white/8">
            <span className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent-blue/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-accent-blue" />
              </div>
              <span className="text-gray-300 font-medium">{post.author}</span>
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent-blue" />
              {formatDate(post.date)}
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent-blue" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* ── Article Content ── */}
        <article
          className="
            [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-5 [&>h1]:leading-tight
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:leading-snug
              [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-white/8
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-accent-blue [&>h3]:mt-9 [&>h3]:mb-3
            [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-200 [&>h4]:mt-7 [&>h4]:mb-2

            [&>p]:text-gray-300 [&>p]:leading-8 [&>p]:text-base [&>p]:mb-5

            [&>ul]:my-5 [&>ul]:space-y-2 [&>ul]:pl-0 [&>ul]:list-none
            [&>ul>li]:text-gray-300 [&>ul>li]:leading-7 [&>ul>li]:pl-5 [&>ul>li]:relative
            [&>ul>li]:before:content-['▸'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-accent-blue [&>ul>li]:before:font-bold

            [&>ol]:my-5 [&>ol]:pl-0 [&>ol]:list-none [&>ol]:space-y-2 [&>ol]:counter-reset-[list]
            [&>ol>li]:text-gray-300 [&>ol>li]:leading-7 [&>ol>li]:pl-7 [&>ol>li]:relative

            [&>blockquote]:my-8 [&>blockquote]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-accent-blue
              [&>blockquote]:bg-accent-blue/5 [&>blockquote]:rounded-r-xl [&>blockquote]:py-4 [&>blockquote]:pr-5
              [&>blockquote>p]:text-gray-200 [&>blockquote>p]:italic [&>blockquote>p]:text-lg [&>blockquote>p]:mb-0

            [&>pre]:my-6 [&>pre]:bg-dark-800 [&>pre]:border [&>pre]:border-white/10
              [&>pre]:rounded-xl [&>pre]:p-5 [&>pre]:overflow-x-auto
              [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:text-emerald-300
              [&>pre]:font-mono

            [&>p>code]:text-accent-yellow [&>p>code]:bg-dark-700 [&>p>code]:px-2 [&>p>code]:py-0.5
              [&>p>code]:rounded [&>p>code]:text-sm [&>p>code]:font-mono
              [&>li>code]:text-accent-yellow [&>li>code]:bg-dark-700 [&>li>code]:px-1.5 [&>li>code]:py-0.5
              [&>li>code]:rounded [&>li>code]:text-sm [&>li>code]:font-mono

            [&>strong]:text-white [&>strong]:font-semibold
            [&_strong]:text-white [&_strong]:font-semibold

            [&>hr]:my-10 [&>hr]:border-white/10

            [&>table]:w-full [&>table]:my-6 [&>table]:border-collapse [&>table]:rounded-xl [&>table]:overflow-hidden
            [&>table>thead>tr>th]:bg-dark-700 [&>table>thead>tr>th]:text-white [&>table>thead>tr>th]:font-semibold
              [&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-sm
            [&>table>tbody>tr]:border-t [&>table>tbody>tr]:border-white/8 [&>table>tbody>tr:hover]:bg-white/3
            [&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3 [&>table>tbody>tr>td]:text-gray-300 [&>table>tbody>tr>td]:text-sm

            [&>a]:text-accent-blue [&>a]:underline-offset-2 [&>a:hover]:underline
            [&_a]:text-accent-blue [&_a:hover]:underline
          "
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* ── Related / Footer ── */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/blog" className="btn-outline inline-flex">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag text-xs">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
