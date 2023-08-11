'use client'

import { useDispatch } from '@/store/global-store'
import { loadPlayer } from '@/store/slices/player-slice'
import { FC, ReactNode, useEffect } from 'react'

interface PlayerProviderProps {
  children: ReactNode
}

export const PlayerProviders: FC<PlayerProviderProps> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPlayer())
  }, [dispatch])

  return <>{children}</>
}
