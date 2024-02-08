import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "process";

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
})

