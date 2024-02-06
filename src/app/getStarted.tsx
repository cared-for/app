import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function GetStarted() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 p-12 gap-12 lg:gap-16 max-w-[1100px] self-center" id="get-started">
      <div className="flex flex-col gap-y-6 items-center justify-center text-center">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter text-[#006a4e]">
          Start your free trial today!
        </h2>

        <p className="text-gray-500 text-md lg:text-lg">
          No credit card required
        </p>
      
        <Button size="lg" className="bg-[#006a4e] text-2xl h-14 text-white hover:bg-[#00563f]" type="submit">
          <Link href="/signup">
            Get Started Today
          </Link>
        </Button>

        <p className="text-gray-500 text-center bg-[#F1F8F5] p-6 rounded-2xl mt-6">
          80% of our users who have tried the free trial say they have loved CaredFor and have converted into paying customers
        </p>
      </div>

      <img
        alt="Senior Illustration"
        className="hidden lg:block mx-auto overflow-hidden object-cover rounded-xl object-bottom sm:w-full lg:order-last w-[400px] lg:w-[500px]"
        src="/footer.jpg"
      />
    </section>
  )
}
