import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PlayAction } from '../@types/player-types'
import { useStore } from '../global-store'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            {
              id: 'w-DW4DhDfcw',
              title: 'Estilização do Post',
              duration: '10:05',
            },
            {
              id: 'D83-55LUdKE',
              title: 'Componente: Header',
              duration: '06:33',
            },
            {
              id: 'W_ATsETujaY',
              title: 'Componente: Sidebar',
              duration: '09:12',
            },
            { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
            {
              id: '8KBq2vhwbac',
              title: 'Form de comentários',
              duration: '11:34',
            },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            {
              id: 'gE48FQXRZ_o',
              title: 'Componente: Comment',
              duration: '13:45',
            },
            { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            {
              id: 'h5JA3wfuW1k',
              title: 'Interações no JSX',
              duration: '06:33',
            },
            {
              id: '1G0vSTqWELg',
              title: 'Utilizando estado',
              duration: '09:12',
            },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },
  reducers: {
    play: (state, action: PayloadAction<PlayAction>) => {
      const { lessonIndex, moduleIndex } = action.payload

      state.currentLessonIndex = lessonIndex
      state.currentModuleIndex = moduleIndex
    },
    next: (state) => {
      const { currentLessonIndex, currentModuleIndex } = state

      const nextLessonIndex = currentLessonIndex + 1
      const nextModuleIndex = currentModuleIndex + 1

      const modules = state.course.modules
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

export const { play, next } = playerSlice.actions
export const playerReducer = playerSlice.reducer

export const usePlaying = () => {
  return useStore((state) => {
    const lessonIndex = state.player.currentLessonIndex
    const moduleIndex = state.player.currentModuleIndex

    const activeModule = state.player.course.modules[moduleIndex]
    const activeLesson = activeModule.lessons[lessonIndex]

    return { activeModule, activeLesson }
  })
}
export const useCurrentLesson = () => {
  return useStore((state) => {
    const lessonIndex = state.player.currentLessonIndex
    const moduleIndex = state.player.currentModuleIndex

    const activeModule = state.player.course.modules[moduleIndex]
    const activeLesson = activeModule.lessons[lessonIndex]

    return activeLesson
  })
}
export const useModuleLesson = () => {
  return useStore((state) => {
    const moduleIndex = state.player.currentModuleIndex
    const activeModule = state.player.course.modules[moduleIndex]

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
