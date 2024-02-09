import { SubmitButton } from "~/components/ui/submitButton"
import { CheckCircle2 } from "lucide-react"

import { createCheckoutSession } from "./actions"

type StandardProps = {
  customerId: string;
}
export default function Lifetime({ customerId }: StandardProps) {
  const createCheckoutSessionWithProps = createCheckoutSession.bind(null, {
    price: "LIFETIME",
    customerId,
  })

  return (
    <form className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] gap-y-6" action={createCheckoutSessionWithProps} >
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#006a4e]">Lifetime Deal</h1> 
        <p className="text-[#006a4e] font-medium text-sm">14/50 FILLED</p>
      </div>

      <div className="grid grid-cols-3 gap-x-6 items-baseline">
        <h5 className="text-[#006a4e] lg:text-lg line-through text-center">
          $75
        </h5>
        <h3 className="text-[#006a4e] font-bold text-3xl lg:text-6xl text-center">
          $50
        </h3>
        <h5 className="text-[#006a4e] font-medium text-sm place-self-end text-center">
          ONE TIME
        </h5>
      </div>
      
      <div className="flex flex-col justify-center gap-y-2">
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="text-[#F1F8F5] w-7 h-7" fill="#006a4e"/>
          <p className="text-[#006a4e] lg:text-xl">Everything from Standard</p> 
        </div>
     </div>

      <SubmitButton size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f] mt-auto" type="submit">
        Get Started
      </SubmitButton>
    </form>
  )
}
