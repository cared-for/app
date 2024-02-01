'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/actions'

import { db } from '~/server/db'

export async function signup(prevData: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)
  
  if (error) {
    return { status: "ERROR", error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')

  return { status: "SUCCESS" }
}
