'use client'

import { store } from '@/store/global-store'
import { FC, ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PlayerProviders } from './player-provider'

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalProviders: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <PlayerProviders>{children}</PlayerProviders>
      </ReduxProvider>
    </>
  )
}
