'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { trpcClient } from '@/lib/_trpc/trpcClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddPage() {
  const [content, setContent] = useState('')
  const router = useRouter()

  const addTodo = trpcClient.sample.addTodo.useMutation({
    onSettled: () => {
      router.push('/todo')
    },
  })

  return (
    <div className="flex justify-center items-center w-full  flex-1">
      <div className="flex gap-2">
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
