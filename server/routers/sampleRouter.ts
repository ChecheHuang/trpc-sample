import { z } from 'zod'

import { publicProcedure, router } from '@/server/trpc'
import prismadb from '@/lib/prismadb'
import { revalidatePath } from 'next/cache'
export const sampleRouter = router({
  getTodos: publicProcedure.query(async () => {
    const data = await prismadb.todos.findMany({
      select: {
        id: true,
        content: true,
        done: true,
      },
    })
    return data.map((item) => ({ ...item, id: item.id.toString() }))
  }),
  getTodo: publicProcedure.input(z.string()).query(async ({ input }) => {
    const data = await prismadb.todos.findFirst({
      where: {
        id: parseInt(input),
      },
      select: {
        id: true,
        content: true,
        done: true,
      },
    })
    return { ...data, id: data?.id.toString() }
  }),
  addTodo: publicProcedure
    .input(z.string())
    .mutation(
      async ({ input }) =>
        await prismadb.todos.create({ data: { content: input } })
    ),
  deleteTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await prismadb.todos.delete({
      where: {
        id: parseInt(input),
      },
    })
    revalidatePath('/todo')
    return true
  }),
  setDone: publicProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ input }) => {
      await prismadb.todos.update({
        where: {
          id: parseInt(input.id),
        },
        data: {
          done: input.done,
        },
      })
      revalidatePath('/todo')
      return true
    }),
})
