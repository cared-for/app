'use server'

import { api } from "~/trpc/server"
import { redirect } from "next/navigation"

export const createCheckoutSession = async ({ price, customerId }: { price: "STANDARD" | "LIFETIME", customerId: string }) => {
  const checkout = await api.stripe.createCheckoutSession.mutate({ 
    customerId,
    price,
  })
  redirect(checkout.url!)
}

