import Hero from '@/components/home/Hero'
import HomeSummary from '@/components/home/HomeSummary'
import TopicsPreview from '@/components/home/TopicsPreview'
import ProjectsPreview from '@/components/projects/ProjectsPreview'
import HireCTA from '@/components/home/HireCTA'
import Newsletter from '@/components/home/Newsletter'
import HomeRobotBg from '@/components/home/HomeRobotBg'

export default function HomePage() {
  return (
    <>
      <HomeRobotBg />
      <Hero />
      <HomeSummary />
      <TopicsPreview />
      <ProjectsPreview />
      <HireCTA />
      <Newsletter />
    </>
  )
}
