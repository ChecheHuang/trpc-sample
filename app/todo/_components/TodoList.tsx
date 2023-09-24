'use client'
import { trpcClient } from '@/lib/_trpc/trpcClient'
import { trpcServer } from '@/lib/_trpc/trpcServer'
import Link from 'next/link'
import { useState } from 'react'

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof trpcServer)['sample']['getTodos']>>
}) {
  const getTodos = trpcClient.sample.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    // refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const onSettled = () => getTodos.refetch()
  const addTodo = trpcClient.sample.addTodo.useMutation({
    onSettled,
  })
  const setDone = trpcClient.sample.setDone.useMutation({
    onSettled,
  })
  const deleteTodo = trpcClient.sample.deleteTodo.useMutation({
    onSettled,
  })

  const [content, setContent] = useState('')

  return (
    <div className="flex flex-col items-center ">
      <div className="text-black my-5 text-3xl">
        {getTodos?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: !todo.done,
                })
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
            <Link href={`/todo/${todo.id}`}>Link</Link>
            <button
              onClick={() => {
                deleteTodo.mutate(todo.id)
              }}
              className=" bg-indigo-200 rounded-sm"
            >
              {' '}
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">todo:</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 border-2"
        />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content)
              setContent('')
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          增加
        </button>
      </div>
    </div>
  )
}