import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector,
} from 'react-redux'

import { playerReducer } from './slices/player-slice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type storeDispatch = typeof store.dispatch

export const useStore: TypedUseSelectorHook<RootState> = useSelector
export const useDispatch: () => storeDispatch = reduxDispatch
