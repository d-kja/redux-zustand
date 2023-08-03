import { PlayCircle, Video } from 'lucide-react'
import { FC } from 'react'

interface LessonProps {
  title: string
  duration: string
  isActive?: boolean
  onPlay: () => {}
}

export const Lesson: FC<LessonProps> = ({
  title,
  duration,
  onPlay,
  isActive = false,
}) => {
  return (
    <button
      onClick={onPlay}
      data-active={isActive}
      disabled={isActive}
      className="flex items-center gap-3 text-sm text-zinc-400 [&:not(:disabled)]:hover:text-zinc-100 data-[active=true]:text-emerald-400"
    >
      {isActive ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
