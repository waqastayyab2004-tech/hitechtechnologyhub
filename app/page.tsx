import Hero from '@/components/home/Hero'
import HomeSummary from '@/components/home/HomeSummary'
import TopicsPreview from '@/components/home/TopicsPreview'
import ProjectsPreview from '@/components/projects/ProjectsPreview'
import HireCTA from '@/components/home/HireCTA'
import CareerCTA from '@/components/home/CareerCTA'
import Newsletter from '@/components/home/Newsletter'
import HomeRobotBg from '@/components/home/HomeRobotBg'
import WeatherWidget from '@/components/home/WeatherWidget'

export default function HomePage() {
  return (
    <>
      <HomeRobotBg />
      <Hero />
      <HomeSummary />
      <TopicsPreview />
      <ProjectsPreview />
      <CareerCTA />
      <HireCTA />
      <Newsletter />
    </>
  )
}
