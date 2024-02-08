'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
 
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  const data = {
    userId: Number(formData.get('userId')),
    length: Number(formData.get('length')),
  }
  
  const dependents = [...Array(data.length).keys()].map((i) => {
    const fullName = formData.get(`fullName-${i}`) as string
    const phone = formData.get(`phone-${i}`) as string
    const email = formData.get(`email-${i}`) as string

    return { fullName, phone, email }
  })

  await api.dependent.createMany.mutate({
    userId: data.userId,
    dependents,
  })
  await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

