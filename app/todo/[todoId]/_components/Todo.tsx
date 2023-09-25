'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { trpcClient } from '@/lib/_trpc/trpcClient'
import { trpcServer } from '@/lib/_trpc/trpcServer'
import { useRouter } from 'next/navigation'

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
      // router.push('/todo')
      // router.refresh()
      getTodo.refetch()
    },
  })
  const handleGoBack = () => {
    router.back()
  }
  return (
    <div className="flex w-full flex-1 justify-center items-center flex-col">
      <div key={getTodo.data.id} className="flex gap-3 items-center">
        <Checkbox
          id={`check-${getTodo.data.id}`}
          checked={!!getTodo.data.done}
          onCheckedChange={async () => {
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
      <Button variant="ghost" onClick={handleGoBack}>
        back
      </Button>
    </div>
  )
}

export default Todo
