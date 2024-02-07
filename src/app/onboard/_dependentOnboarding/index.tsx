import { redirect } from 'next/navigation'
import { api } from '~/trpc/server'

import { StepOne } from "./stepOne"
import { StepTwo } from "./stepTwo"
import { StepThree } from "./stepThree"

type OnboardProps = { dependentId: number; userId: number; }
export async function Onboard({ dependentId, userId }: OnboardProps) {
  const user = await api.user.get.query({ id: userId })
  const dependent = await api.dependent.get.query({ id: dependentId })

  if (user.completedUserOnboarding) redirect('/dashboard')
  if (!user.fullName || !user.phone) return <StepOne {...user} />
  if (!user.scheduleId) return <StepTwo {...user} />

  return <StepThree {...dependent!} userId={userId} />
}
