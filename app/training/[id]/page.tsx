import CourseDetailClient from './CourseDetailClient'

export function generateStaticParams() {
  return [3,9,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120].map(id => ({ id: String(id) }))
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={Number(params.id)} />
}
