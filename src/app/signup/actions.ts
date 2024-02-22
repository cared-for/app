'use server'

import { cookies, headers } from 'next/headers'
import { PostHogClient } from '~/server/posthog'

import { createClient } from '~/lib/supabase/actions'

export async function signup(data: { email: string, password: string }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: authData, error } = await supabase.auth.signUp(data)
  
  if (error) {
    return { status: "ERROR", message: error.message }
  }

  const postHog = PostHogClient()
  postHog.identify({ distinctId: authData.user!.id })
  
  // PLAUSIBLE API EVENT REQUEST
  const head = headers()
  await fetch("https://plausible.io/api/event", {
    method: "POST",
    // @ts-expect-error - TS doesn't know about the headers method
    headers: {
      "User-Agent": head.get("user-agent") ?? undefined,
      "X-Forwarded-For": head.get("x-forwarded-for") ?? undefined,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "signup submit",
      domain: "caredfor.care",
      url: "https://caredfor.care/signup",
    }),
  })
}
