import { trpcServer } from '@/lib/_trpc/trpcServer'

import { Metadata } from 'next'
import TodoList from './_components/TodoList'

// export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Todo List',
  description: 'trpc todo sample',
}
export default async function Home() {
  const todos = await trpcServer.sample.getTodos()
  return (
    <main className="max-w-3xl mx-auto mt-5">
      <TodoList initialTodos={todos} />
    </main>
  )
}
