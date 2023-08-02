import { FC, ReactNode } from 'react'

interface TaskProps {
  children: ReactNode
  done: boolean
  onChangeStatus: () => void
}

export const Task: FC<TaskProps> = ({ children, done, onChangeStatus }) => {
  return <li className={`leading-loose text-sm font-medium hover:cursor-pointer ${done ? 'line-through' : ''}`} onClick={onChangeStatus}>{children}</li>
}