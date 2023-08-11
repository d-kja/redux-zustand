import { describe, expect, it } from 'vitest'
import { next, play, playerSlice } from '../../store/slices/player-slice'

const baseState = {
  course: {
    id: 1,
    modules: [
      {
        id: '1',
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
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
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}
// const initialState = playerSlice.getInitialState()

describe('@reducers/player-slice', () => {
  it('should be able to play a video', () => {
    const reducer = playerSlice.reducer(
      baseState,
      play({
        moduleIndex: 0,
        lessonIndex: 1,
      }),
    )

    const { currentLessonIndex, currentModuleIndex } = reducer

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('should be able to move to the next video when the current one ends', () => {
    const reducer = playerSlice.reducer(baseState, next())
    const { currentLessonIndex, currentModuleIndex } = reducer

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it("should be able to move to the next module when there's no more lessons on the current one", () => {
    const alteredState = {
      ...baseState,
      currentLessonIndex: 1,
    }

    const reducer = playerSlice.reducer(alteredState, next())
    const { currentLessonIndex, currentModuleIndex } = reducer

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  it('should retain the module and lesson values if the current module and lesson are the absolute last one', () => {
    const alteredState = {
      ...baseState,
      currentLessonIndex: 1,
      currentModuleIndex: 1,
    }

    const reducer = playerSlice.reducer(alteredState, next())
    const { currentLessonIndex, currentModuleIndex } = reducer

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })
})
