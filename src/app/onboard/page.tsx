import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

import { api } from '~/trpc/server'

import { StepOne } from "./stepOne"
import { StepTwo } from "./stepTwo"
import { StepThree } from "./stepThree"

export default async function Onboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data.user) {
    redirect('/')
  }

  const user = await api.user.get.query({ email: data.user.email! }, { })
  
  if (user.completedUserOnboarding) redirect('/dashboard')
  if (!user.fullName || !user.phone) return <StepOne {...user} />
  if (!user.scheduleId) return <StepTwo {...user} />

  return <StepThree {...user} />
}
