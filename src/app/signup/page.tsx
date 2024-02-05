"use client"

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/dGBYb8nfMRQ
 */
import Link from "next/link"
import { useFormState } from "react-dom"

// server actions
import { signup } from "./actions"

// components
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { SubmitButton } from "~/components/ui/submitButton"

const initialState = {
  status: "",
  message: "",
}
export default function Signup() {
  const [state, formAction] = useFormState(signup, initialState)

  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-[#006a4e]">SeniorCheck</h1>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#e0f0e9]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
              Sign Up
            </h2>
            <div className="flex flex-col items-center mt-8">
              <form className="w-full max-w-md space-y-4" action={formAction}>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input id="email" required type="email" name="email"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input id="password" required type="password" name="password"/>
                </div>
                <SubmitButton className="w-full bg-[#006a4e] text-white hover:bg-[#00563f]" type="submit">
                  Sign Up
                </SubmitButton>
                {state.status === "ERROR" && (
                  <p className="text-red-500 text-center">{state.message}</p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <Link className="text-[#006a4e] hover:underline" href="/login">
                    Already have an account?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
