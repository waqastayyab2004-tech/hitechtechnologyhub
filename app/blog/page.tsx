import { getAllPosts } from '@/lib/blog'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'Articles',
  description: 'Practical articles on AI, automation, cybersecurity, cloud computing and IT tips by Waqas Syed.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient posts={posts} />
}
