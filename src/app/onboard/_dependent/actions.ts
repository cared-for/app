'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
 
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  const data = {
    userId: Number(formData.get('userId')),
    dependentId: Number(formData.get('dependentId')),
    length: Number(formData.get('length')),
  }
  
  const dependents = [...Array(data.length).keys()].map((i) => {
    const fullName = formData.get(`fullName-${i}`) as string
    const phone = formData.get(`phone-${i}`) as string
    const email = formData.get(`email-${i}`) as string

    return { fullName, phone, email }
  })
  const mainDependent = dependents.shift()

  await api.dependent.update.mutate({ 
    id: data.dependentId, fullName: 
    mainDependent!.fullName, 
    phone: `+1${mainDependent!.phone}` })
  if (dependents.length > 0) {
    await api.dependent.createMany.mutate({
      userId: data.userId,
      dependents: dependents.map((dependent) => ({
        ...dependent,
        phone: `+1${dependent.phone}`,
      }))
    })
  }
  await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

