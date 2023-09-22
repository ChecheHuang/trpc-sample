import { trpcServer } from '@/lib/_trpc/trpcServer'

import TodoList from './_components/TodoList'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const todos = await trpcServer.sample.getTodos()
  return (
    <main className="max-w-3xl mx-auto mt-5">
      <TodoList initialTodos={todos} />
    </main>
  )
}
