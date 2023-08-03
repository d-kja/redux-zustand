'use client'

import { useStore } from '@/store/global-store'
import { FC } from 'react'
import { Module } from './module'

interface NavigationProps {}

export const Navigation: FC<NavigationProps> = ({}) => {
  const modules = useStore((state) => state.player.course.modules)

  return (
    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
      {modules.map((module, index) => (
        <Module
          key={module.id}
          title={module.title}
          moduleIndex={index}
          amountOfLessons={module.lessons.length}
        />
      ))}
    </aside>
  )
}
