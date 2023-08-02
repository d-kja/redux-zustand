import { FC } from 'react'

import { useDispatch } from 'react-redux'
import { toggle } from '../../slices/todo-slice'
import { useStore } from '../../stores/global-store'
import { List } from './list'
import { Task } from './task'

interface TodoProps { }

export const Todo: FC<TodoProps> = () => {
  const todos = useStore(store => store.todo)
  const dispatch = useDispatch()

  const toggleComplete = (label: string) => dispatch(toggle(label))

  return <>
    <List>
      {todos.map(({ label, done }) => <Task key={label} done={done} onChangeStatus={() => toggleComplete(label)}>{label}</Task>)}
    </List>
  </>
}