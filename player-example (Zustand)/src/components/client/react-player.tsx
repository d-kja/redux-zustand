'use client'

import { FC, Suspense, lazy } from 'react'

import { Loader2 } from 'lucide-react'
import type { YouTubePlayerProps } from 'react-player/youtube'

import { useCurrentLesson, useStore } from '@/store'

interface PlayerProps extends YouTubePlayerProps {}

const ReactPlayer = lazy(() => import('react-player/youtube'))

export const Player: FC<PlayerProps> = (props) => {
  const hasWindow = Boolean(window)

  const lesson = useCurrentLesson()
  const { isLoading, next } = useStore((state) => ({
    isLoading: state.isLoading,
    next: state.next,
  }))

  const handlePlayNextVideo = () => next()

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-950 aspect-video flex items-center justify-center">
        <Loader2 className="w-20 h-2w-20 text-zinc-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video flex items-center justify-center">
      <Suspense
        fallback={
          <Loader2 className="w-20 h-2w-20 text-zinc-500 animate-spin" />
        }
      >
        {hasWindow && (
          <ReactPlayer
            {...props}
            url={`https://www.youtube.com/watch?v=${lesson?.id}`}
            onEnded={handlePlayNextVideo}
          />
        )}
      </Suspense>
    </div>
  )
}
