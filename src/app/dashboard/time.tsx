'use client'

import { useState } from 'react'
import { Input } from '~/components/ui/input'
import type { SelectUser } from '~/server/db/schema'

// components
import { Button } from '~/components/ui/button'
import { revalidatePath } from 'next/cache'
import { api } from '~/trpc/react'
import { Spinner } from '~/components/ui/spinner'

export function Time(user: SelectUser) {
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
        id: user.id,
        hour: utcHour,
        minute: utcMinute,
      })
      
      revalidatePath("/dashboard")
    } catch(error) {
      setStatus("ERROR")
    }
  }
  
  const getCheckInTime = () => {
    const timestamp = new Date(`01/01/2000 ${user.checkInTime} UTC`)
    const hour = timestamp.getHours().toString().padStart(2, "0")
    const minute = timestamp.getMinutes().toString().padStart(2, "0")

    return `${hour}:${minute}`
  }

  const checkInTime = getCheckInTime()
  
  return (
    <form className="flex flex-col py-6 px-8 gap-y-6 bg-[#f1f8f5] rounded-xl" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold text-[#006a4e]" >
        Check-in Time
      </h1>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="time" className="text-lg font-medium text-[#155724]">
          Time
        </label>

        <Input
          type="time"
          name="time"
          id="time"
          defaultValue={checkInTime}
          required
        />
      </div>

      <Button
        size="lg"
        className="bg-[#006a4e] text-md text-white hover:bg-[#00563f] flex items-center gap-x-1"
        type="submit"
        disabled={"LOADING" === status}
      >
        Save
        {status === "LOADING" && <Spinner />}
      </Button>
    </form>
  )
}

