import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  updateAuth: protectedProcedure
    .input(z.object({ userId: z.number(), dependentId: z.number().optional(), isDependent: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.supabase.auth.updateUser({
        data: input
      })
    }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db.select().from(users).where(
        eq(
          users.id,
          input.id,
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
    .input(z.object({
      fullName: z.string(),
      email: z.string(),
      phone: z.string(),
      authEmail: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const customer = await ctx.stripe.customers.create({
        email: input.authEmail,
      });

      const [user] = await ctx.db
        .insert(users)
        .values({
          ...input,
          customerId: customer.id,
        })
        .returning();

      return user;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      fullName: z.string().optional(),
      email: z.string().optional(),
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

