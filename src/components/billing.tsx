import { loadStripe } from '@stripe/stripe-js';
import { env } from "~/env"

import { api } from "~/trpc/server"

// components
import { Button } from "~/components/ui/button"
import type { SelectUser } from "~/server/db/schema"
import { redirect } from 'next/navigation';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export function Billing(user: SelectUser) {
  const trialPeriod = 1209600 * 1000 // 14 days
  const trialDaysLeft = Math.round((user.freeTrialStart!.getTime() + trialPeriod - new Date().getTime()) / (1000 * 3600 * 24))

  const createCheckout = async () => {
    'use server'

    const checkout = await api.stripe.createCheckoutSession.mutate({ customerId: user.customerId })
    redirect(checkout.url!)
  }
  
  if (user.onFreeTrial) {
    if (trialDaysLeft > 0) {
      return ( 
        <form className="flex items-center gap-x-2" action={createCheckout} >
          <span className="text-lg text-[#006a4e]">
            There are {trialDaysLeft} days left in your free trial
          </span>
          <Button 
            className="text-lg text-[#e0f0e9] bg-[#006a4e]/90 px-4 py-1 rounded-2xl hover:bg-[#006a4e]"
            type="submit"
          >
            Subscribe now
          </Button>
        </form>
      ) 
    } else {
      return ( 
        <form className="flex items-center gap-x-2" action={createCheckout} >
          <span className="text-lg text-[#006a4e]">
            Your free trial has ended
          </span>
          <Button 
            className="text-lg text-[#e0f0e9] bg-[#006a4e]/90 px-4 py-1 rounded-2xl hover:bg-[#006a4e]"
            type="submit"
          >
            Subscribe now to renew
          </Button>
        </form>
      ) 
    }
  }

  return null
  
  // return (
  //   <form action={createCheckout}>
  //     <Button className="text-lg text-[#e0f0e9] bg-[#006a4e]/90 px-4 py-1 rounded-2xl hover:bg-[#006a4e]">
  //       Billing
  //     </Button>
  //   </form>
  // )
}


