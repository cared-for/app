'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/actions'

import { api } from '~/trpc/server'

export async function signup(_: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const isDependent = formData.get('isDependent') === 'on'

  const { error } = await supabase.auth.signUp(data)
  
  if (error) {
    return { status: "ERROR", message: error.message }
  }
  
  let userId: number;
  let dependentId: number | undefined;
  let relationalId: number;
  if (isDependent) {
    const newUser = await api.user.create.mutate({})
    const newDependent = await api.dependent.create.mutate({ 
      userId: newUser!.id,
      email: data.email,
    })
    userId = newUser!.id
    dependentId = newDependent!.id
    relationalId = newDependent!.id
  } else {
    const newUser = await api.user.create.mutate({ email: data.email })
    userId = newUser!.id
    relationalId = newUser!.id
  }

  const customer = await api.stripe.createCustomer.mutate({ 
    email: data.email,
    relationalId, 
  })
  
  await supabase.auth.updateUser({
    data: {
      customerId: customer.id,
      dependentId,
      userId,
      isDependent,
    }
  })

  revalidatePath('/onboard', 'layout')
  redirect('/onboard')
}
