import { create } from 'zustand'
import { api } from '../lib/axios'
import { Course, PlayerState } from './@types/player-types'

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({
        isLoading: true,
      })

      const response = await api.get('/courses/1')
      const data: Course | null = response.data

      set({
        course: data,
        isLoading: false,
      })
    },
    play: (payload) => {
      const { lessonIndex, moduleIndex } = payload

      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      })
    },
    next: () => {
      const { course, currentLessonIndex, currentModuleIndex } = get()

      const nextLessonIndex = currentLessonIndex + 1

      if (!course) return

      const modules = course.modules
      const nextLesson = modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
        return
      }

      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = modules[nextModuleIndex]

      if (nextModule) {
        set({
          currentModuleIndex: nextModuleIndex,
          currentLessonIndex: 0,
        })
      }
    },
  }
})

export const usePlaying = () => {
  return useStore((state) => {
    const lessonIndex = state.currentLessonIndex
    const moduleIndex = state.currentModuleIndex

    const activeModule = state.course?.modules[moduleIndex]
    const activeLesson = activeModule?.lessons[lessonIndex]

    return { activeModule, activeLesson }
  })
}
export const useCurrentLesson = () => {
  return useStore((state) => {
    const lessonIndex = state.currentLessonIndex
    const moduleIndex = state.currentModuleIndex

    const activeModule = state.course?.modules[moduleIndex]
    const activeLesson = activeModule?.lessons[lessonIndex]

    return activeLesson
  })
}
export const useModuleLesson = () => {
  return useStore((state) => {
    const moduleIndex = state.currentModuleIndex
    const activeModule = state.course?.modules[moduleIndex]

    return activeModule
  })
}
export const usePlayingIndex = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state

    return {
      currentLessonIndex,
      currentModuleIndex,
    }
  })
}
