import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "~/lib/supabase/server"

import { api } from "~/trpc/server"

import { Time } from "./time"
import { Dependents } from "./dependents"
import { Profile } from "./profile"
import { Billing } from "~/components/billing"

export default async function Onboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data.user) {
    redirect('/')
  }

  const user = await api.user.get.query({ email: data.user.email! })
  const dependents = await api.dependent.list.query({ userId: user.id })
  
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-[#e0f0e9] p-6 items-center">
      <div className="flex flex-col max-w-[1050px]">
        <div className="flex h-[65px] items-baseline justify-between">
          <h1 className="text-4xl font-bold text-[#006a4e]">CaredFor</h1>
          <Billing {...user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-12">
            <Time {...user}/>
            <Profile {...user}/>
          </div>
          <Dependents dependents={dependents} userId={user.id} />
        </div>
      </div>
   </div>
  )
}

