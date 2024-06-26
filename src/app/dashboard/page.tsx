import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

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

  const metadata = data.user.user_metadata

  const user = await api.user.get.query({ id: metadata.userId })
  const dependents = await api.dependent.list.query({ userId: user.id })
  
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-[#e0f0e9] p-6 items-center">
      <div className="flex flex-col max-w-[1050px]">
        <div className="flex flex-col lg:mb-0 lg:flex-row h-[100px] lg:h-[65px] items-baseline lg:justify-between">
          <Link href="/dashboard" className="text-4xl font-bold text-[#006a4e]">CaredFor</Link>
          <Billing {...user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-12">
            <Time {...user}/>
            <Profile {...user} isDependent={metadata.isDependent}/>
          </div>
          <Dependents dependents={dependents} userId={user.id} isDependent={metadata.isDependent} />
        </div>
      </div>
   </div>
  )
}

