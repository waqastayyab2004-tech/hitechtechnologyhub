import Hero from '@/components/home/Hero'
import TopicsPreview from '@/components/home/TopicsPreview'
import ProjectsPreview from '@/components/projects/ProjectsPreview'
import HireCTA from '@/components/home/HireCTA'
import Newsletter from '@/components/home/Newsletter'
import HomeSummary from '@/components/home/HomeSummary'

export default function HomePage() {
  return (
    <>
      <HireCTA />
      <Hero />
      <HomeSummary />
      <TopicsPreview />
      <ProjectsPreview />
      <Newsletter />
    </>
  )
}
