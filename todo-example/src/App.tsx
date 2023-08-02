import { TodoForm } from "./components/form/todo-form"
import { Todo } from "./components/todo"

export const App = () => {
  return <main className="flex  items-center justify-center h-screen">
    <div className="flex flex-col gap-4">
      <TodoForm />
      <Todo />
    </div>
  </main>
}