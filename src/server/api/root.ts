import { userRouter } from "~/server/api/routers/user";
import { dependentRouter } from "~/server/api/routers/dependent";
import { checkInRouter } from "~/server/api/routers/checkIn";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  dependent: dependentRouter,
  checkIn: checkInRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
