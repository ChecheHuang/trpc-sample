'use client'
import { trpcClient } from '@/lib/_trpc/trpcClient'
import { trpcServer } from '@/lib/_trpc/trpcServer'
import { notFound, useRouter } from 'next/navigation'

interface TodoProps {
  todo: Awaited<ReturnType<(typeof trpcServer)['sample']['getTodo']>>
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const router = useRouter()
  const getTodo = trpcClient.sample.getTodo.useQuery(todo.id!, {
    initialData: todo,
    refetchOnReconnect: false,
  })
  const setDone = trpcClient.sample.setDone.useMutation({
    onSettled: () => {
      // router.push('/')
      getTodo.refetch()
      router.refresh()
    },
  })
  const handleGoBack = () => {
    router.back()
  }
  return (
    <div className="flex items-center flex-col">
      <button onClick={handleGoBack}>back</button>
      <div key={getTodo.data.id} className="flex gap-3 items-center">
        <input
          id={`check-${getTodo.data.id}`}
          type="checkbox"
          checked={!!getTodo.data.done}
          style={{ zoom: 1.5 }}
          onChange={() => {
            setDone.mutate({
              id: getTodo.data.id!,
              done: !getTodo.data.done,
            })
          }}
        />
        <label htmlFor={`check-${getTodo.data.id}`}>
          {getTodo.data.content}
        </label>
      </div>
    </div>
  )
}

export default Todo
