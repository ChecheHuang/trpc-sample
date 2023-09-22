import { z } from 'zod'

import { publicProcedure, router } from '@/server/trpc'
import { db } from './db'
export const sampleRouter = router({
  getTodos: publicProcedure.query(async () => await db.todos.findMany()),
  getTodo: publicProcedure
    .input(z.string())
    .query(async (opts) => await db.todos.findById(opts.input)),
  addTodo: publicProcedure
    .input(z.string())
    .mutation(async (opts) => await db.todos.create(opts.input)),
  setDone: publicProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ input }) => {
      await db.todos.update(input)
      return true
    }),
})
