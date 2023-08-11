'use client'

import { useStore } from '@/store'
import { FC, ReactNode, useEffect } from 'react'

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalProviders: FC<GlobalProviderProps> = ({ children }) => {
  const loadPlayer = useStore((state) => state.load)

  useEffect(() => {
    loadPlayer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
