import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import * as table from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { PgDialect } from "drizzle-orm/pg-core";

export const dependentRouter = createTRPCRouter({
  createMany: protectedProcedure
    .input(z.object({
      dependents: z.array(
        z.object({
          fullName: z.string(),
          phone: z.string(),
        })),
      userId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId, dependents } = input;

        const dependentsWithUserId = dependents.map((dependent) => ({
          ...dependent,
          userId,
        }))

        return ctx.db
          .insert(table.dependents)
          .values(dependentsWithUserId)
          .returning();
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  create: protectedProcedure
    .input(z.object({
      fullName: z.string(),
      phone: z.string(),
      userId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(table.dependents).values(input);

        return "success";
      } catch(error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  list: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input, ctx }) => {
      try {
        const dependents = await ctx.db.select().from(table.dependents).where(
          eq(
            table.dependents.userId,
            input.userId,
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

  updateMany: protectedProcedure
    .input(z.object({
      depdendents: z.array(
        z.object({
          id: z.number(),
          fullName: z.string().optional(),
          phone: z.string().optional(),
        }))
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const fullNameUpdate = input.depdendents.reduce((acc, dependent) => {
          if (dependent.fullName) {
            return `${acc} WHEN id = ${dependent.id} THEN '${dependent.fullName}'`
          }

          return acc;
        }, "(CASE")
        const phoneUpdate = input.depdendents.reduce((acc, dependent) => {
          if (dependent.phone) {
            return `${acc} WHEN id = ${dependent.id} THEN '+1${dependent.phone}'`
          }

          return acc;
        }, "(CASE")

        const fullNameSql = sql.raw(`${fullNameUpdate} END)`)
        const phoneSql = sql.raw(`${phoneUpdate} END)`)

        await ctx.db
          .update(table.dependents)
          .set({
            fullName: fullNameSql,
            phone: phoneSql,
          })
          .where(
            inArray(
              table.dependents.id,
              input.depdendents.map((dependent) => dependent.id)
            )
          )
          .returning();
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

  delete: protectedProcedure
    .input(z.object({ dependentIds: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.delete(table.dependents).where(
          inArray(
            table.dependents.id,
            input.dependentIds,
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
