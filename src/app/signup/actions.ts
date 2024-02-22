'use server'

import { cookies, headers } from 'next/headers'
import { PostHogClient } from '~/server/posthog'
import { api } from '~/trpc/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/actions'

export async function signup(_: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    fullName: formData.get('fullName') as string,
    phone: `+1${formData.get('phone') as string}`,
    email: formData.get('email') as string,
    isUser: formData.get('isUser') === "true",
    password: formData.get('password') as string,
    price: formData.get('price') as string,
  }
  console.log("data: ", data)
  
  try {
    const { data: authData, error } = await supabase.auth.signUp(data)
    
    if (error) {
      return { status: "ERROR", message: error.message }
    }

    const postHog = PostHogClient()
    postHog.identify({ distinctId: authData.user!.id })

    let dependentId: number | undefined;
    const newUser = await api.user.create.mutate({
      ...(data.isUser ? data : {}),
      authEmail: data.email,
    })
    if (!data.isUser) {
      const newDependent = await api.dependent.create.mutate({
        ...data,
        userId: newUser!.id,
      })
      dependentId = newDependent!.id
    }
   
    await api.user.updateAuth.mutate({
      userId: newUser!.id,
      dependentId,
      isDependent: !data.isUser,
    })
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
  
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

  const onboardUrl = data.price ? `/onboard?price=${data.price}` : "/onboard"

  revalidatePath("onboard")
  redirect(onboardUrl)
}
