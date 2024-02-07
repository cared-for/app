import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl lg:text-4xl font-bold text-[#006a4e]">CaredFor</h1>
      <nav className="space-x-4 text-lg">
        {/*
        <Link className="text-gray-700 hover:text-[#006a4e]" href="#">
          How it works
        </Link>
        <Link className="text-gray-700 hover:text-[#006a4e]" href="#">
          Testimonials
        </Link>
        */}
        <Link href="/login" className="text-gray-700 hover:text-[#006a4e] text-sm lg:text-base" >
          Login
        </Link>
        <Link href="/signup" className="text-gray-700 hover:text-[#006a4e] text-sm lg:text-base" >
          Get Started
        </Link>
      </nav>
    </header>
  )
}
