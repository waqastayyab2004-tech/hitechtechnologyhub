import CourseDetailClient from './CourseDetailClient'

export function generateStaticParams() {
  return [101,102,103,104,105,106,107,108,109,110].map(id => ({ id: String(id) }))
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={Number(params.id)} />
}
