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

  const metadata = data.user.user_metadata
  const user = await api.user.get.query({ id: metadata.userId as number })
  const dependent = await api.dependent.get.query({ id: metadata.dependentId })
  
  if (user.completedUserOnboarding) redirect('/dashboard')
  if (!user.email || !user.fullName || !user.phone) return <StepOne {...user} isDependent={metadata.isDependent} />
  if (!user.scheduleId) return <StepTwo {...user} />

  return <StepThree {...user} dependent={dependent} isDependent={metadata.isDependent} />
}
