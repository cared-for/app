import { SubmitButton } from "~/components/ui/submitButton"
import { CheckCircle2 } from "lucide-react"

import { createCheckoutSession } from "./actions"

type MonthlyProps = {
  customerId: string;
}
export default function Annual({ customerId }: MonthlyProps) {
  const createCheckoutSessionWithProps = createCheckoutSession.bind(null, {
    price: "ANNUAL",
    customerId,
  })

  return (
    <form className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] gap-y-6" action={createCheckoutSessionWithProps} >
      <h1 className="text-2xl lg:text-3xl font-bold text-[#006a4e]">Pay Annual</h1> 

      <div className="flex justify-center">
        <h3 className="text-[#006a4e] font-bold text-3xl lg:text-6xl text-center">
          $80
        </h3>
      </div>
       
      <div className="flex flex-col justify-center gap-y-2">
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">Everything from the Monthly plan</p> 
        </div>

        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] min-w-7 min-h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">Save $28</p> 
        </div>
      </div>

      <SubmitButton size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f] mt-auto" type="submit">
        Get Started
      </SubmitButton>
    </form>
  )
}
