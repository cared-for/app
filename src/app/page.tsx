import Header from "./header"
import Hero from "./hero"
import HowItWorks from "./howItWorks"
import Testamonials from "./testamonials"
import Pricing from "./pricing"
import GetStarted from "./getStarted"
import Link from "next/link"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k5fM3CLyo33
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <main className="flex flex-col flex-1 gap-28 lg:gap-36">
        <Header />
        <Hero />
        <HowItWorks />
        {/*<Testamonials />*/}
        <Pricing />
        <GetStarted />
      </main>

      <footer className="flex flex-col gap-y-4 lg:flex-row lg:justify-between bg-[#006a4e] text-white px-20 py-3">
        <p className="text-sm">
          CaredFor<br/>
          {/*Address: 135 Bloor St E, Toronto, ON, Canada<br/>*/}
          Email: caredforinfo@gmail.com
        </p>

        <div className="flex flex-col lg:items-end text-sm">
          <Link href="/privacy" >
            Privacy Policy
          </Link>
          <Link href="/tos" >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}

