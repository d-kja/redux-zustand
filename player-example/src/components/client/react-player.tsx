'use client'

import { next, useCurrentLesson } from '@/store/slices/player-slice'
import { FC, Suspense, lazy } from 'react'
import type { YouTubePlayerProps } from 'react-player/youtube'
import { useDispatch } from 'react-redux'

interface PlayerProps extends YouTubePlayerProps {}

const ReactPlayer = lazy(() => import('react-player/youtube'))

export const Player: FC<PlayerProps> = (props) => {
  const dispatch = useDispatch()
  const hasWindow = Boolean(window)

  const lesson = useCurrentLesson()

  const handlePlayNextVideo = () => dispatch(next())

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Suspense fallback={<>Loading player...</>}>
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
