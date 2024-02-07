import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full -mt-12 md:mt-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex items-center lg:order-last">
            <img
              alt="Senior Illustration"
              className="mx-auto overflow-hidden object-cover rounded-xl object-bottom sm:w-full lg:order-last"
              src="/hero.jpg"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-[#006a4e] sm:text-5xl xl:text-6xl/none">
                Daily Check-Ins for your loved ones living alone
              </h1>
              <p className="max-w-[600px] text-gray-500 text-lg md:text-2xl dark:text-gray-400">
                CaredFor is a simple check-in system that calls your loved ones once a day to ensure they are safe and
                connected.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#006a4e] px-8 text-xl font-medium text-white shadow transition-colors hover:bg-[#00563f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00563f] disabled:pointer-events-none disabled:opacity-50"
                href="/signup"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
