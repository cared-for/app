'use client'

import { useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import Link from "next/link"
import { signup } from "./actions"

// components
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { SubmitButton } from "~/components/ui/submitButton"

const initialState = {
  status: "",
  message: "",
}
export function Form() {
  const [state, formAction] = useFormState(signup, initialState)
  const searchParams = useSearchParams()
  const price = searchParams.get("price")

  return (
    <form className="plausible-event-name=signup+submit w-full max-w-md space-y-4" action={formAction}>
      <input name="price" type="hidden" value={price ?? ""} />
      <div className="space-y-1">
        <Label htmlFor="email" className="text-base text-[#006a4e]">Email</Label>
        <Input id="email" required type="email" name="email"/>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="text-base text-[#006a4e]">Password</Label>
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
  )
}

