import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import * as table from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

export const dependentRouter = createTRPCRouter({
  createMany: protectedProcedure
    .input(z.object({
      dependents: z.array(
        z.object({
          fullName: z.string(),
          phone: z.string(),
        })),
      userEmail: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userEmail, dependents } = input;

        const [user] = await ctx.db.select().from(table.users).where(
          eq(
            table.users.email,
            userEmail,
          )
        );

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const dependentsWithUserId = dependents.map((dependent) => ({
          ...dependent,
          userId: user.id,
        }))

        await ctx.db.insert(table.dependents).values(dependentsWithUserId);

        return "success";
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  create: protectedProcedure
    .input(z.object({
      id: z.number(),
      fullName: z.string(),
      phone: z.string(),
      userEmail: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userEmail, ...params } = input;

        const [user] = await ctx.db.select().from(table.users).where(
          eq(
            table.users.email,
            userEmail,
          )
        );

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        await ctx.db.insert(table.dependents).values({ ...params, userId: user.id });

        return "success";
      } catch(error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  list: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const [user] = await ctx.db.select().from(table.users).where(
          eq(
            table.users.email,
            input.email,
          )
        );

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const dependents = await ctx.db.select().from(table.dependents).where(
          eq(
            table.dependents.userId,
            user.id,
          )
        );

        return dependents;
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      fullName: z.string().optional(),
      phone: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...params }  = input;
        await ctx.db.update(table.dependents).set(params).where(
          eq(
            table.dependents.id,
            id,
          )
        );
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),
});
