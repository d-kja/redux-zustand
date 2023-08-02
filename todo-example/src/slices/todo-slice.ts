import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: [
    { label: 'Brew some coffee', done: false },
    { label: 'Study Redux/toolkit', done: true },
    {
      label: 'Study Zustand',
      done: false,
    },
  ],

  reducers: {
    add: (state, action) => {
      const todo = action.payload

      state.push({
        label: todo,
        done: false,
      })
    },
    toggle: (state, action) => {
      const label = action.payload

      const task = state.find((todo) => todo.label === label)
      if (!task) return

      task.done = !task.done
    },
  },
})

export const { add, toggle } = todoSlice.actions