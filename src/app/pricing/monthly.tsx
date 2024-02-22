
import { SubmitButton } from "~/components/ui/submitButton"
import { CheckCircle2 } from "lucide-react"

import { createCheckoutSession } from "./actions"

type MonthlyProps = {
  customerId: string;
}
export default function Monthly({ customerId }: MonthlyProps) {
  const createCheckoutSessionWithProps = createCheckoutSession.bind(null, {
    price: "MONTHLY",
    customerId,
  })

  return (
    <form className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] gap-y-6" action={createCheckoutSessionWithProps}>
      <h1 className="text-2xl lg:text-3xl font-bold text-[#006a4e]">Pay Monthly</h1> 

      <div className="flex justify-center items-baseline">
        <h3 className="text-[#006a4e] font-bold text-3xl lg:text-6xl text-center">
          $9
        </h3>
      </div>
      
      <div className="flex flex-col justify-center gap-y-2">
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">1 Daily check-in</p> 
        </div>

        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">Up to 8 Care Circle members</p> 
        </div>

        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">First 2 weeks free, no credit card required</p> 
        </div>
        
        <div className="flex items-center gap-x-2 opacity-50">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#6b7280"/>
          <p className="text-gray-500 lg:text-xl">
            <span className="line-through" >Multiple Languages</span>
            {' '}Coming soon
          </p>
        </div>

        <div className="flex items-center gap-x-2 opacity-50">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#6b7280"/>
          <p className="text-gray-500 lg:text-xl">
            <span className="line-through" >Optional custom messages from Care Circle Members</span>
            {' '}Coming soon
          </p>
        </div>
      </div>

      <SubmitButton size="lg" className="w-full bg-[#006a4e] text-xl text-white hover:bg-[#00563f]" type="submit">
        Get Started
      </SubmitButton>
    </form>
  )
}
