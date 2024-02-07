import { api } from '~/trpc/server'
import { redirect } from 'next/navigation'

import { StepOne } from "./stepOne"
import { StepTwo } from "./stepTwo"
import { StepThree } from "./stepThree"

type OnboardProps = { userId: number; }
export async function UserOnboarding({ userId }: OnboardProps) {
  const user = await api.user.get.query({ id: userId })

  if (user.completedUserOnboarding) redirect('/dashboard')
  if (!user.fullName || !user.phone) return <StepOne {...user} />
  if (!user.scheduleId) return <StepTwo {...user} />

  return <StepThree {...user} />
}
