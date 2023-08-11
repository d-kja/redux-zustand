import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store } from '../store'
import { Course } from '../store/@types/player-types'

const course: Course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Iniciando com React',
      lessons: [
        {
          id: 'Jai8w6K_GnY',
          title: 'CSS Modules',
          duration: '13:45',
        },
        {
          id: 'w-DW4DhDfcw',
          title: 'Estilização do Post',
          duration: '10:05',
        },
      ],
    },
    {
      id: 2,
      title: 'Estrutura da aplicação',
      lessons: [
        {
          id: 'gE48FQXRZ_o',
          title: 'Componente: Comment',
          duration: '13:45',
        },
        {
          id: 'Ng_Vk4tBl0g',
          title: 'Responsividade',
          duration: '10:05',
        },
      ],
    },
  ],
}

store.setState({
  course,
})
const initialStore = store.getState()

describe('@store/zustand-store', () => {
  // Reset store in-memory value
  beforeEach(() => {
    store.setState(initialStore)
  })

  it('should be able to play a video', () => {
    const { play } = store.getState()
    play({ lessonIndex: 1, moduleIndex: 0 })

    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(0)
  })

  it('should be able to move to the next video when the current one ends', () => {
    const { next } = store.getState()
    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(0)
  })

  it("should be able to move to the next module when there's no more lessons on the current one", () => {
    store.setState({
      currentLessonIndex: 1,
    })

    const { next } = store.getState()
    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentLessonIndex).toEqual(0) // equals / equal works as well :)
    expect(currentModuleIndex).toEqual(1)
  })

  it('should retain the module and lesson values if the current module and lesson are the absolute last one', () => {
    store.setState({
      currentLessonIndex: 1,
      currentModuleIndex: 1,
    })

    const { next } = store.getState()
    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()
    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(1)
  })
})
