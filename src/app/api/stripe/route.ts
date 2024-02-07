import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "process";
import { stripeCustomers } from "~/server/db/schema";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.object({ customerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OgMkSL1WksQvxZXBcOGWKZo',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${env.HOST}/dashboard`,
        cancel_url: `${env.HOST}/dashboard`,
        // automatic_tax: {enabled: true},
        customer: input.customerId,
      });
    }),

  createCustomer: protectedProcedure
    .input(z.object({ email: z.string(), relationalId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const customer = await ctx.stripe.customers.create({
        email: input.email,
      });

      await ctx.db
        .insert(stripeCustomers)
        .values({
          customerId: customer.id,
          relationalId: input.relationalId,
        });

      return customer;
    }),
})

