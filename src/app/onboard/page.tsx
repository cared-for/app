import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

import { UserOnboarding } from './_userOnboarding'
import { DependentOnboarding } from './_dependentOnboarding'

export default async function Onboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data.user) {
    redirect('/')
  }

  const metadata = data.user.metadata

  if (metadata.isDependent) {
    return <DependentOnboarding dependentId={metadata.dependentId} userId={metadata.userId} />
  }

  return <UserOnboarding userId={metadata.userId} />
}
