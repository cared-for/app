import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

import { api } from "~/trpc/server"

import { StepOne } from './_flow/stepOne'
import { StepTwo } from './_flow/stepTwo'
import { StepThree as UserStepThree } from './_user/stepThree'
import { StepThree as DependentStepThree } from './_dependent/stepThree'

export default async function Onboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data.user) {
    redirect('/')
  }

  const metadata = data.user.user_metadata
  const user = metadata.userId ? await api.user.get.query({ id: metadata.userId }) : null
  const dependent = metadata.isDependent && metadata.dependentId 
    ? await api.dependent.get.query({ id: metadata.dependentId }) 
    : null

  if (!user) return <StepOne email={data.user.email!}/>
  if (!user.scheduleId || !user.checkInTime) return <StepTwo {...user} />
  if (metadata.isDependent) return <DependentStepThree {...dependent!} userId={user.id} />
  return <UserStepThree {...user} />
}
