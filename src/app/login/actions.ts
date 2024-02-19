'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
// import { PostHogClient } from '~/server/posthog'

import { createClient } from '~/lib/supabase/actions'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'

export async function login(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)
  // console.log("error: ", error)
  // console.log("auth data: ", authData)

  if (error) {
    return { status: "FAIL", message: error.message }
  }

  const [user] = await db.select().from(users).where(
    eq(
      users.email,
      data.email,
    )
  );

  if (!user) {
    return { status: "FAIL", message: "User not found" }
  }
  
  // const postHog = PostHogClient()
  // postHog.identify({ distinctId: authData.user.id })

  if (!user.completedUserOnboarding) {
    revalidatePath('/onboard', 'layout')
    redirect('/onboard')
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

