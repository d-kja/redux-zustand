import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Course, PlayAction, PlayerState } from '../@types/player-types'
import { useStore } from '../global-store'

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Course>) {
      const { payload } = action

      state.course = payload
    },
    play: (state, action: PayloadAction<PlayAction>) => {
      const { lessonIndex, moduleIndex } = action.payload

      state.currentLessonIndex = lessonIndex
      state.currentModuleIndex = moduleIndex
    },
    next: (state) => {
      const { course, currentLessonIndex, currentModuleIndex } = state

      const nextLessonIndex = currentLessonIndex + 1
      const nextModuleIndex = currentModuleIndex + 1

      if (!course) return

      const modules = course?.modules

      const nextLesson = modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
        return
      }

      const nextModule = modules[nextModuleIndex]

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex
        state.currentLessonIndex = 0
      }
    },
  },
})

export const { set, play, next } = playerSlice.actions
export const playerReducer = playerSlice.reducer

export const usePlaying = () => {
  return useStore((state) => {
    const lessonIndex = state.player.currentLessonIndex
    const moduleIndex = state.player.currentModuleIndex

    const activeModule = state.player.course?.modules[moduleIndex]
    const activeLesson = activeModule?.lessons[lessonIndex]

    return { activeModule, activeLesson }
  })
}
export const useCurrentLesson = () => {
  return useStore((state) => {
    const lessonIndex = state.player.currentLessonIndex
    const moduleIndex = state.player.currentModuleIndex

    const activeModule = state.player.course?.modules[moduleIndex]
    const activeLesson = activeModule?.lessons[lessonIndex]

    return activeLesson
  })
}
export const useModuleLesson = () => {
  return useStore((state) => {
    const moduleIndex = state.player.currentModuleIndex
    const activeModule = state.player.course?.modules[moduleIndex]

    return activeModule
  })
}
export const usePlayingIndex = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    return {
      currentLessonIndex,
      currentModuleIndex,
    }
  })
}
