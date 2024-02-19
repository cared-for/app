import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-8 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-center text-[#006a4e] lg:text-left xl:text-6xl/none">
                {/*Daily Check-ins to keep your loved ones <span className="text-[#67CCA0]">Safe & Connected</span> */}
                Worried about your loved ones living alone? <span className="text-[#67CCA0]">Call them!</span>
              </h1>
              <p className="max-w-[600px] text-center lg:text-left text-gray-500 text-lg md:text-xl dark:text-gray-400">
                CaredFor is a simple check-in system that calls your loved ones once a day to ensure they are safe and connected.
              </p>

            {/*
              <h1 className="text-6xl text-center lg:text-left font-bold tracking-tighter text-[#006a4e] sm:text-7xl xl:text-8xl/none">
                Call your Mom.
              </h1>
              <p className="max-w-[600px] text-center lg:text-left text-gray-500 text-lg md:text-xl dark:text-gray-400">
                Can't? Next best thing you can do is get them Cared for, a simple check-in system that calls your loved ones once a day to ensure they are safe and
                connected.
              </p>
            */}
            </div>
            <div id="get-started-hero" className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#006a4e] px-8 text-xl font-medium text-white shadow transition-colors hover:bg-[#00563f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00563f] disabled:pointer-events-none disabled:opacity-50"
                href="/signup"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="flex items-center hidden lg:block">
            <img
              alt="Senior Illustration"
              className="mx-auto overflow-hidden object-cover rounded-xl object-bottom sm:w-full lg:order-last"
              src="/hero.jpg"
            />
          </div>


        </div>
      </div>
    </section>
  )
}
