import { z } from 'zod'

import { publicProcedure, router } from '@/server/trpc'
import prismadb from '@/lib/prismadb'
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
  getTodo: publicProcedure.input(z.string()).query(
    async ({ input }) =>
      await prismadb.todos.findFirst({
        where: {
          id: parseInt(input),
        },
      })
  ),
  addTodo: publicProcedure
    .input(z.string())
    .mutation(
      async ({ input }) =>
        await prismadb.todos.create({ data: { content: input } })
    ),
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
      return true
    }),
})
