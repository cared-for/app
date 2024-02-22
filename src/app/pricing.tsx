import Link from "next/link"
import { Button } from "~/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function Pricing() {
  return (
    <section className="max-w-[1200px] self-center flex flex-col gap-y-10 justify-center p-6" id="get-started">
      <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
        Pricing
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] gap-y-6 w-[400px]">
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

        <Link href="/signup?price=monthly" className="w-full">
          <Button size="lg" className="w-full bg-[#006a4e] text-xl text-white hover:bg-[#00563f]" type="submit">
              Get Started
          </Button>
        </Link>
        </div>

        <div className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] gap-y-6 w-[400px]">
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#006a4e]">Pay Annually</h1> 
          </div>

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

          <Button size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f] mt-auto" type="submit">
            <Link href="/signup?price=annual" className="w-full">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
