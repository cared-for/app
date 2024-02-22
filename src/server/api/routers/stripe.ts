import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "process";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.object({ customerId: z.string(), price: z.union([z.literal("MONTHLY"), z.literal("ANNUAL")]) }))
    .mutation(async ({ input, ctx }) => {

      const price = input.price === "MONTHLY" ? env.STRIPE_MONTHLY_PRICE_ID : env.STRIPE_ANNUAL_PRICE_ID

      return ctx.stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${env.HOST}/dashboard`,
        cancel_url: `${env.HOST}/dashboard`,
        // automatic_tax: {enabled: true},
        customer: input.customerId,
      });
    }),
    createBillingPortal: protectedProcedure
      .input(z.object({ customerId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        return ctx.stripe.billingPortal.sessions.create({
          customer: input.customerId,
          return_url: `${env.HOST}/dashboard`,
        });
      }),
})

