'use client'

import { Input } from '~/components/ui/input'
import type { SelectUser } from '~/server/db/schema'

// components
import { Button } from '~/components/ui/button'

export function Time(user: SelectUser) {
  return (
    <div className="flex flex-col py-6 px-8 gap-y-6 bg-[#f1f8f5] rounded-xl">
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
          required
        />
      </div>

      <Button
        size="lg"
        className="bg-[#006a4e] text-md text-white hover:bg-[#00563f] flex items-center gap-x-1"
        type="submit"
        // disabled={"LOADING" === status}
      >
      {/*
        {status === "SUCCESS" ? "Success!" : "Continue"}
        {status === "LOADING" && <Spinner />}
        */}
      </Button>
    </div>
  )
}

