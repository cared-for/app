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
        <div className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] min-w-[400px] gap-y-6">
          <h1 className="text-3xl font-bold text-[#006a4e]">Standard</h1> 

          <div className="grid grid-cols-3 gap-x-6 items-baseline">
            <h5 className="text-[#006a4e] text-lg line-through">
              $20
            </h5>
            <h3 className="text-[#006a4e] font-bold text-6xl">
              $15
            </h3>
            <h5 className="text-[#006a4e] font-medium text-sm place-self-end">
              PER MONTH
            </h5>
          </div>
          
          <div className="flex flex-col justify-center gap-y-2">
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="text-[#F1F8F5] w-7 h-7" fill="#006a4e"/>
              <p className="text-[#006a4e] text-xl">1 Daily check-in</p> 
            </div>

            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="text-[#F1F8F5] w-7 h-7" fill="#006a4e"/>
              <p className="text-[#006a4e] text-xl">Up to 8 Care Circle members</p> 
            </div>

            <div className="flex items-center gap-x-2 opacity-50">
              <CheckCircle2 className="text-[#F1F8F5] w-7 h-7" fill="#6b7280"/>
              <p className="text-gray-500 text-xl">
                <span className="line-through" >Multiple Languages</span>
                {' '}Coming soon
              </p>
            </div>
         </div>

          <Button size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f]" type="submit">
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>

        <div className="flex flex-col p-6 rounded-2xl bg-[#F1F8F5] min-w-[400px] gap-y-6">
          <div className="flex justify-between items-baseline">
            <h1 className="text-3xl font-bold text-[#006a4e]">Lifetime Deal</h1> 
            <p className="text-[#006a4e] font-medium text-sm">14/50 FILLED</p>
          </div>

          <div className="grid grid-cols-3 gap-x-6 items-baseline">
            <h5 className="text-[#006a4e] text-lg line-through">
              $75
            </h5>
            <h3 className="text-[#006a4e] font-bold text-6xl">
              $50
            </h3>
            <h5 className="text-[#006a4e] font-medium text-sm place-self-end">
              ONE TIME
            </h5>
          </div>
          
          <div className="flex flex-col justify-center gap-y-2">
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="text-[#F1F8F5] w-7 h-7" fill="#006a4e"/>
              <p className="text-[#006a4e] text-xl">Everything from Standard</p> 
            </div>
         </div>

          <Button size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f] mt-auto" type="submit">
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
