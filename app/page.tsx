import WelcomeBanner from '@/components/home/WelcomeBanner'
import Hero from '@/components/home/Hero'
import HomeSummary from '@/components/home/HomeSummary'
import TopicsPreview from '@/components/home/TopicsPreview'
import ProjectsPreview from '@/components/projects/ProjectsPreview'
import HireCTA from '@/components/home/HireCTA'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <WelcomeBanner />
      <Hero />
      <HomeSummary />
      <TopicsPreview />
      <ProjectsPreview />
      <HireCTA />
      <Newsletter />
    </>
  )
}
