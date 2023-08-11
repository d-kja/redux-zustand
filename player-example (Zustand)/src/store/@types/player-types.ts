export type PlayAction = {
  moduleIndex: number
  lessonIndex: number
}

export type Course = {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: (payload: { lessonIndex: number; moduleIndex: number }) => void
  next: () => void
}
