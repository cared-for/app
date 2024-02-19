'use client'

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/tXmzhc69LEs
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react"
import { usePlausible } from "next-plausible"

// components
import { Spinner } from "~/components/ui/spinner"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import type { SelectUser } from "~/server/db/schema"

export function StepTwo({ id }: SelectUser) {
  const router = useRouter()
  const plausible = usePlausible()
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE")
  const updateCheckIn = api.checkIn.update.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      
      setStatus("LOADING");
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const time = formData.get("time") as string 
      const formattedTime = new Date(`${new Date().toDateString()} ${time}`)

      const utcHour = formattedTime.getUTCHours()
      const utcMinute = formattedTime.getUTCMinutes()
      
      await updateCheckIn.mutateAsync({ 
        id,
        hour: utcHour,
        minute: utcMinute,
      })

      plausible("step two submit")

      router.refresh()
    } catch(error) {
      setStatus("ERROR")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9] items-center justify-center p-4">
      <h1 className="absolute top-4 left-6 text-4xl font-bold text-[#006a4e]">CaredFor</h1>
      
      <form className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 p-6" onSubmit={handleSubmit} >
        <div className="flex flex-col space-y-6 min-h-[400px] justify-between">

          <div className="gap-y-2">
            <h1 className="text-4xl font-bold text-[#155724]">
              Let&apos;s setup a check in time that works best
            </h1>

            <p className="text-md text-[#155724] opacity-50">
              A phone call will be made to your phone at the check-in time you
              have set. If a check-in is missed, another call will be made again
              in 15 minutes
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-1">
                <label className="block text-lg font-medium text-[#155724]" htmlFor="time">
                  Time
                </label>

                <Input
                  type="time"
                  name="time"
                  id="time"
                  required
                />

              </div>
            </div>
          </div>
          
          <Button
            id="step-two-submit"
            size="lg"
            className="bg-[#006a4e] text-md text-white hover:bg-[#00563f] flex items-center gap-x-1"
            type="submit"
            disabled={"LOADING" === status}
          >
            {status === "SUCCESS" ? "Success!" : "Continue"}
            {status === "LOADING" && <Spinner />}
          </Button>
        </div>
        
        <div className="space-y-6 hidden lg:block">
          <div className="p-6 border border-[#c3e6cb] bg-white rounded-md dark:border-slate-800">
            <p className="text-lg text-[#155724]">
              More than 80% of users have come to love Cared For with many
              of them even looking forward to the calls!
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
