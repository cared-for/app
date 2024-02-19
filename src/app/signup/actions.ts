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
  
  // PLAUSIBLE API EVENT REQUEST
  // const head = headers()
  // const res = await fetch("https://plausible.io/api/event", {
  //   method: "GET",
  //   headers: {
  //     "User-Agent": head.get("user-agent"),
  //     "X-Forwarded-For": head.get("x-forwarded-for"),
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PLAUSIBLE_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     name: "signup submit",
  //     domain: "caredfor.care",
  //     url: "https://caredfor.care/signup",
  //   }),
  // })

  revalidatePath('/onboard', 'layout')
  redirect(redirectPath)
}
