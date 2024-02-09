import Link from 'next/link';

import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

// components
import type { SelectUser } from "~/server/db/schema"
import { Button } from '~/components/ui/button';
import { SubmitButton } from './ui/submitButton';


export function Billing(user: SelectUser) {
  const trialPeriod = 1209600 * 1000 // 14 days
  const trialDaysLeft = Math.round((user.freeTrialStart!.getTime() + trialPeriod - new Date().getTime()) / (1000 * 3600 * 24))

  const createBillingPortal = async (customerId: string) => {
    'use server'

    const portal = await api.stripe.createBillingPortal.mutate({ customerId })
    redirect(portal.url)
  }
  const createBillingPortalWithProps = createBillingPortal.bind(null, user.customerId)
  
  if (user.isPaying) return (
    <form action={createBillingPortalWithProps}>
      <SubmitButton variant="link" className="text-[#006a4e] font-normal text-lg">
        Billing
      </SubmitButton>
    </form>
  )

  if (trialDaysLeft > 0) return (  
    <div className="flex items-center gap-x-2" >
      <span className="text-lg text-[#006a4e]">
        There are {trialDaysLeft} days left in your free trial
      </span>
      <Button
        className="text-lg text-white bg-[#006a4e] rounded-2xl hover:bg-[#00563f]"
        type="submit"
      >
        <Link href="/pricing" className="w-full" >
          Subscribe now
        </Link>
      </Button>
    </div>
  )

  return ( 
    <div className="flex items-center gap-x-2" >
      <span className="text-lg text-[#006a4e]">
        Your free trial has ended
      </span>
      <Button
        className="text-lg text-white bg-[#006a4e] rounded-2xl hover:bg-[#00563f]"
        type="submit"
      >
        <Link href="/pricing" className="w-full">
          Subscribe now to renew
        </Link>
      </Button>
    </div>
  ) 
  
  return 
}


