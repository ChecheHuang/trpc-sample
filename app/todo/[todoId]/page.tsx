import prismadb from '@/lib/prismadb'
import Todo from './_components/Todo'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { trpcServer } from '@/lib/_trpc/trpcServer'

interface PageProps {
  params: {
    todoId: string
  }
}
const getTodo = async (todoId: string) => {
  const data = await trpcServer.sample.getTodo(todoId)

  if (!data) return notFound()
  return { ...data, id: data.id!.toString() }
}
export async function generateMetadata({
  params: { todoId },
}: PageProps): Promise<Metadata> {
  const data = await getTodo(todoId)
  return {
    title: data.content,
  }
}

const Page: React.FC<PageProps> = async ({ params: { todoId } }) => {
  const data = await getTodo(todoId)
  return (
    <>
      <Todo todo={data} />
    </>
  )
}
export async function generateStaticParams() {
  const todos = await trpcServer.sample.getTodos()

  return todos.map((todo) => ({
    todoId: todo.id.toString(),
  }))
}

export default Page
