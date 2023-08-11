'use client'

import { FC } from 'react'

import { ChevronDown } from 'lucide-react'

import { useStore } from '@/store'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Lesson } from './lessons'

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export const Module: FC<ModuleProps> = ({
  amountOfLessons,
  moduleIndex,
  title,
}) => {
  const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(
    (state) => {
      const { currentLessonIndex, currentModuleIndex, play, course } = state
      const lessons = course?.modules[moduleIndex].lessons

      return { currentLessonIndex, currentModuleIndex, lessons, play }
    },
  )

  return (
    <Collapsible.Root
      className="group"
      defaultOpen={currentModuleIndex === moduleIndex}
    >
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state='open']:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content asChild>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isActive =
              moduleIndex === currentModuleIndex &&
              lessonIndex === currentLessonIndex

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                onPlay={async () =>
                  play({
                    lessonIndex,
                    moduleIndex,
                  })
                }
                isActive={isActive}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
