'use client'

import { useStore } from '@/store/global-store'
import { FC, Suspense, lazy } from 'react'
import type { YouTubePlayerProps } from 'react-player/youtube'

interface PlayerProps extends YouTubePlayerProps {}

const ReactPlayer = lazy(() => import('react-player/youtube'))

export const Player: FC<PlayerProps> = (props) => {
  // I had to do a lazy import and create this boolean to make sure that the player would only render at a later point, it has something to-do with the player, because I passed through the same issue back in time
  const hasWindow = !!window

  const lessonId = useStore((state) => {
    const lessonIndex = state.player.currentLessonIndex
    const moduleIndex = state.player.currentModuleIndex

    const activeModule = state.player.course.modules[moduleIndex]
    const activeLesson = activeModule.lessons[lessonIndex]

    return activeLesson.id
  })

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Suspense fallback={<>Loading player...</>}>
        {hasWindow && (
          <ReactPlayer
            {...props}
            url={`https://www.youtube.com/watch?v=${lessonId}`}
          />
        )}
      </Suspense>
    </div>
  )
}
