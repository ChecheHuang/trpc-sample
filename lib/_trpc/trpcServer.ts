import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
