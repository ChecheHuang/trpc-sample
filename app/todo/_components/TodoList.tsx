'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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
    <div className="flex flex-col items-center  ">
      <div className="text-black my-5 text-3xl flex flex-col gap-3">
        {getTodos?.data?.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-3 items-center min-w-[300px] justify-between"
          >
            <Checkbox
              id={`check-${todo.id}`}
              checked={!!todo.done}
              onCheckedChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: !todo.done,
                })
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
            <Link
              className={buttonVariants({ variant: 'ghost' })}
              href={`/todo/${todo.id}`}
            >
              Link
            </Link>
            <Button
              variant="destructive"
              onClick={() => {
                deleteTodo.mutate(todo.id)
              }}
            >
              delete
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">todo:</label>
        <Input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content)
              setContent('')
            }
          }}
          className=" whitespace-nowrap"
        >
          增加
        </Button>
      </div>
    </div>
  )
}
