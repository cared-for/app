import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db.select().from(users).where(
        eq(
          users.email,
          input.email,
        )
      );

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),

  create: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const customer = await ctx.stripe.customers.create({
        email: input.email,
      });

      const [user] = await ctx.db
        .insert(users)
        .values({ 
          email: input.email,
          customerId: customer.id,
        })
        .returning();

      return user;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      fullName: z.string().optional(),
      phone: z.string().optional(),
      checkInTime: z.string().optional(),
      completedUserOnboarding: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...params }  = input;
      
      const [user] = await ctx.db 
        .update(users)
        .set(params)
        .where(
          eq(
            users.id,
            id,
          )
        )
        .returning()

      return user;
    }),
});

