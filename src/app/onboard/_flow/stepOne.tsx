'use client'

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/tXmzhc69LEs
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react"

// components
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"
import { Button } from "~/components/ui/button"

// misc
import { Label } from "@radix-ui/react-label"
import { Spinner } from "~/components/ui/spinner"

export function StepOne({ email }: { email: string }) {
  const router = useRouter()
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE")
  const [isDependent, setIsDepdenent] = useState<boolean>(false)
  const createUser = api.user.create.useMutation()
  const createDependent = api.dependent.create.useMutation()
  const updateUserAuth = api.user.updateAuth.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      
      setStatus("LOADING");
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const data = {
        fullName: formData.get('fullName') as string,
        phone: `+1${formData.get('phone') as string}`,
        email: isDependent ? formData.get('email') as string : email!,
      }

      let dependentId: number | undefined;
      const newUser = await createUser.mutateAsync(data)
      if (isDependent) {
        const newDependent = await createDependent.mutateAsync({
          userId: newUser!.id,
          email: email,
        })
        dependentId = newDependent!.id
      }
     
      await updateUserAuth.mutateAsync({
        userId: newUser!.id,
        dependentId,
        isDependent,
      })

      router.refresh()
    } catch(error) {
      setStatus("ERROR")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9] items-center justify-center p-4">
      <h1 className="absolute top-4 left-6 text-4xl font-bold text-[#006a4e]">CaredFor</h1>
      
      <form className="max-w-4xl w-full grid grid-cols-2 gap-8" onSubmit={handleSubmit} >
        <div className="flex flex-col min-h-[400px] space-y-6 justify-between">
          <h1 className="text-4xl font-bold text-[#155724]">
          </h1>

          <div className="gap-y-2">
            <h1 className="text-4xl font-bold text-[#155724]">
              Welcome, let's start with getting some basic information
            </h1>

            <p className="text-md text-[#155724] opacity-50">
              This information will be for the one recieving the check-in calls
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="isDependent"
                name="isDependent"
                onChange={e => setIsDepdenent((e.target as HTMLInputElement).checked)}
                className="data-[state=checked]:bg-[#006a4e] data-[state=checked]:text-[#e0f0e9] border-[#006a4e] ring-[#006a4e]"
              />
              <Label htmlFor="isDependent" className="text-base text-[#006a4e]">Are you a care taker?</Label>
            </div>
 
            <div className="flex flex-col gap-y-1">
              <label className="block text-lg font-medium text-[#155724]" htmlFor="fullName">
                Full Name
              </label>
              <Input className="border border-[#c3e6cb] bg-white" id="fullName" name="fullName" placeholder="John Doe" required/>
            </div>
            
            <div className="flex flex-col gap-y-1">
              <label className="block text-lg font-medium text-[#155724]" htmlFor="phone">
                Phone
              </label>

              <div className="flex">
                <div className="rounded-l-lg bg-slate-50 grid place-items-center px-6 border border-[#c3e6cb] text-slate-500">
                  +1
                </div>
                <Input
                  className="block rounded-l-none border border-[#c3e6cb] bg-white dark:border-slate-800"
                  id="phone"
                  name="phone"
                  minLength={10}
                  maxLength={10}
                  required
                  placeholder="Phone number"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-y-1">
              <label className="block text-lg font-medium text-[#155724]" htmlFor="email">
                Email
              </label>
              <Input
                className="border border-[#c3e6cb] bg-slate-100"
                id="email"
                placeholder="john.doe@example.com"
                disabled={!isDependent}
                value={!isDependent ? email : undefined}
                type="email"
              />
            </div>
          </div>

          <Button
            size="lg"
            className="bg-[#006a4e] text-md text-white hover:bg-[#00563f] flex items-center gap-x-1"
            type="submit"
            disabled={"LOADING" === status}
          >
            {status === "SUCCESS" ? "Success!" : "Continue"}
            {status === "LOADING" && <Spinner />}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="p-6 border border-[#c3e6cb] bg-white rounded-md dark:border-slate-800">
            <p className="text-lg text-[#155724]">
              Some facts about seniors living alone and feeling a uneasiness of their health and safety
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}