'use client'

import { useDispatch, useStore } from '@/store/global-store'
import { next, useCurrentLesson } from '@/store/slices/player-slice'
import { Loader2 } from 'lucide-react'
import { FC, Suspense, lazy } from 'react'
import type { YouTubePlayerProps } from 'react-player/youtube'

interface PlayerProps extends YouTubePlayerProps {}

const ReactPlayer = lazy(() => import('react-player/youtube'))

export const Player: FC<PlayerProps> = (props) => {
  const dispatch = useDispatch()
  const lesson = useCurrentLesson()

  const hasWindow = Boolean(window)
  const isLoadingPlayer = useStore((state) => state.player.isLoading)

  const handlePlayNextVideo = () => dispatch(next())

  if (isLoadingPlayer) {
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
