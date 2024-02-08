import Header from "./header"
import Hero from "./hero"
import HowItWorks from "./howItWorks"
import Testamonials from "./testamonials"
import Pricing from "./pricing"
import GetStarted from "./getStarted"

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
        <Testamonials />
        <Pricing />
        <GetStarted />
      </main>

      <footer className="flex items-center justify-center h-16 bg-[#006a4e] text-white">
        <p>© 2024 CaredFor. All rights reserved.</p>
      </footer>
    </div>
  )
}

