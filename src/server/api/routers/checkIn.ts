import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const checkInRouter = createTRPCRouter({
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      hour: z.number(),
      minute: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, hour, minute } = input;

        const [user] = await ctx.db.select().from(users).where(
          eq(
            users.id,
            id,
          )
        )

        if (!user) throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        })

        if (user.scheduleId) {
          await ctx.qStash.schedules.delete(user.scheduleId)
        }

        const { scheduleId } = await ctx.qStash.schedules.create({
          destination: `${env.TWILIO_HOST}?userId=${id}`,
          cron: `${minute} ${hour} * * *`,
        })

        await ctx.db
          .update(users)
          .set({ 
            scheduleId,
            checkInTime: `${hour}:${minute}`,
          })
          .where(
            eq(
              users.id,
              id,
            )
          );

        return "success";
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to update checkin time",
          cause: error,
        })
      }
    }),
});

