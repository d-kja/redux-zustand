import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { todoSlice } from '../slices/todo-slice'

export const globalStore = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch

export const useStore: TypedUseSelectorHook<RootState> = useSelector
