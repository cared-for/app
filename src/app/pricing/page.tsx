import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

import { env } from "~/env"
import { loadStripe } from '@stripe/stripe-js';

// components
import Monthtly from "./monthly";
import Annual from "./annual";
import { api } from "~/trpc/server";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k5fM3CLyo33
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default async function Pricing() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data.user) {
    redirect('/')
  }
  
  const metadata = data.user.user_metadata
  const user = await api.user.get.query({ id: metadata.userId })

  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <main className="flex flex-col flex-1 gap-28 lg:gap-36 justify-center items-center">
        <section className="max-w-[1200px] self-center flex flex-col gap-y-10 justify-center p-6" id="get-started">
          <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
            Pricing
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Monthtly customerId={user.customerId} />
            <Annual customerId={user.customerId} />
          </div>
        </section>
     </main>
    </div>
  )
}

