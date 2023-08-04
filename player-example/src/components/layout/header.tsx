'use client'

import { FC } from 'react'

import { usePlaying } from '@/store/slices/player-slice'
import { MessageCircle } from 'lucide-react'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { activeModule, activeLesson } = usePlaying()

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
        <span className="text-sm text-zinc-400">
          Módulo &quot;{activeModule.title}&ldquo;
        </span>
      </div>

      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
        <MessageCircle className="w-4 h-4" />
        Deixar feedback
      </button>
    </div>
  )
}
