'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
// import { PostHogClient } from '~/server/posthog'

import { createClient } from '~/lib/supabase/actions'

export async function signup(_: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const price = formData.get('price') as string

  const { data: authData, error } = await supabase.auth.signUp(data)
  
  if (error) {
    return { status: "ERROR", message: error.message }
  }

  const redirectPath = price !== "" ? `/onboard?price=${price}` : '/onboard'

  // const postHog = PostHogClient()
  // postHog.identify({ distinctId: authData.user!.id })

  revalidatePath('/onboard', 'layout')
  redirect(redirectPath)
}
