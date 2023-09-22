import { router } from './trpc'
import { sampleRouter } from './routers/sampleRouter'
export const appRouter = router({
  sample: sampleRouter,
})
export type AppRouter = typeof appRouter
