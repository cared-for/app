'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
  
export const stepOneSubmit = async (_: any, formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: `+1${formData.get('phone') as string}`,
    }
    console.log("data: ", data)
    await api.user.update.mutate(data)

    revalidatePath("/onboard")
    redirect("/onboard")
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}
  
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  const data = {
    userId: Number(formData.get('userId')),
    dependentId: Number(formData.get('dependentId')),
    isDependent: formData.get('isDependent') === 'true',
    length: Number(formData.get('length')),
  }
  
  const dependents = [...Array(data.length).keys()].map((i) => {
    const id = Number(formData.get(`id-${i}`))
    const fullName = formData.get(`fullName-${i}`) as string
    const phone = formData.get(`phone-${i}`) as string
    const email = formData.get(`email-${i}`) as string

    console.log("email: ", email)

    return { id, fullName, phone, email }
  })
  console.log("dependents: ", dependents)

  const [mainDependent] = dependents
    .filter(dependent => dependent.id === data.dependentId)
    .map(dependent => ({ 
      ...dependent,
      phone: `+1${dependent.phone}`,
    }))
  
  await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })
  if (data.isDependent) await api.dependent.update.mutate({ id: data.dependentId, ...mainDependent })  
  // This works since if it's not the case of it being the main dependent
  // then it returns back the full array of dependents. If not, it pops the
  // main dependent out
  await api.dependent.createMany.mutate({
    userId: data.userId,
    dependents: dependents
      .filter(dependent => dependent.id !== data.dependentId)
      .map(dependent => ({
        ...dependent,
        phone: `+1${dependent.phone}`,
      }))
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

