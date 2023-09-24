'use client'

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
  )
}
