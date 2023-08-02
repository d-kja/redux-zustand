import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../../slices/todo-slice'

interface TodoFormProps { }

export const TodoForm: FC<TodoFormProps> = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault()
    if (!text.length) return

    dispatch(add(text))
    setText('')
  }

  return <form onSubmit={handleAddTask} className='flex gap-3'>
    <input type="text" placeholder='Create task' className='bg-zinc-900/50 rounded px-3 py-2 placeholder:text-zinc-600 focus:outline-none focus-within:ring ring-zinc-600' onChange={({ target }) => (setText(target.value))} value={text} />
    <button type="submit" className=''>Create</button>
  </form>
}