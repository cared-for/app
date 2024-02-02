import Link from "next/link"
import { Button } from "~/components/ui/button"
import { MessageCircleHeart, UserCheck, Bell } from "lucide-react"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k5fM3CLyo33
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-4xl font-bold text-[#006a4e]">CaredFor</h1>
        <nav className="space-x-4 text-lg">
          {/*
          <Link className="text-gray-700 hover:text-[#006a4e]" href="#">
            How it works
          </Link>
          <Link className="text-gray-700 hover:text-[#006a4e]" href="#">
            Testimonials
          </Link>
          */}
          <Link href="/login" className="text-gray-700 hover:text-[#006a4e]" >
            Login
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-[#006a4e]" >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex items-center lg:order-last">
                <img
                  alt="Senior Illustration"
                  className="mx-auto overflow-hidden object-contain rounded-xl object-bottom sm:w-full lg:order-last"
                  src="/hero.jpg"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-5xl xl:text-6xl/none">
                    Daily Check-Ins to keep your loves ones safe & connected
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    CaredFor is a simple check-in system that calls your loved ones phones once a day to ensure they are safe and
                    connected.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#006a4e] px-8 text-xl font-medium text-white shadow transition-colors hover:bg-[#00563f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00563f] disabled:pointer-events-none disabled:opacity-50"
                    href="/signup"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="how-it-works">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
              How It Works
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">

              <div className="flex flex-col items-center space-y-4">
                <UserCheck className="h-16 w-16 text-[#006a4e]" />
                <h3 className="text-2xl font-bold text-[#006a4e]">Set Up Check-Ins</h3>
                <p className="text-gray-500 text-center">
                  Schedule a time that will call your phone daily for your check-in
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <MessageCircleHeart className="h-16 w-16 text-[#006a4e]" />
                <h3 className="text-2xl font-bold text-[#006a4e]">Create your Care Circle</h3>
                <p className="text-gray-500 text-center">
                  If you miss your check-in 4 times in a row, the people in your care circle will be sent a text,
                  being notified of your missed check-in.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <Bell className="h-16 w-16 text-[#006a4e]" />
                <h3 className="text-2xl font-bold text-[#006a4e]">Get Notified</h3>
                <p className="text-gray-500 text-center">
                  Start getting calls for your checkins for the ease of mind of your loved ones.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/*
        <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
              Testimonials
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Testimonial 1"
                  className="w-20 h-20 rounded-full"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-gray-500 text-center">
                  "SeniorCheck has given me peace of mind knowing that my mom is safe."
                </p>
                <h3 className="text-xl font-bold text-[#006a4e]">- Jane D.</h3>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Testimonial 2"
                  className="w-20 h-20 rounded-full"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-gray-500 text-center">
                  "The app is easy to use and the customer service is excellent."
                </p>
                <h3 className="text-xl font-bold text-[#006a4e]">- John S.</h3>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Testimonial 3"
                  className="w-20 h-20 rounded-full"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-gray-500 text-center">
                  "I love the simplicity and the fact that it works without any issues."
                </p>
                <h3 className="text-xl font-bold text-[#006a4e]">- Emily R.</h3>
              </div>
            </div>
          </div>
        </section>
        */}

      <section className="w-full py-12 md:py-24 lg:py-32" id="get-started">
        <div className="container flex flex-col items-center px-4 md:px-6 gap-y-6 lg:gap-y-8">
          <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
            Get Started
          </h2>
          
          <Button size="lg" className="bg-[#006a4e] text-xl text-white hover:bg-[#00563f]" type="submit">
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>

        </div>
      </section>

      </main>
      <footer className="flex items-center justify-center h-16 bg-[#006a4e] text-white">
        <p>© 2024 CaredFor. All rights reserved.</p>
      </footer>
    </div>
  )
}

