'use client'

import { api } from '@/lib/axios'
import { Course } from '@/store/@types/player-types'
import { set } from '@/store/slices/player-slice'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface PlayerProviderProps {
  children: ReactNode
}

export const PlayerProviders: FC<PlayerProviderProps> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        const data: Course | null = res.data[0]

        if (!data) return

        dispatch(set(data))
      })
      .catch((e) => console.error(e))
  }, [dispatch])

  return <>{children}</>
}
