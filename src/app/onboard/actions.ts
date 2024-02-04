'use server'

import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
  
export const stepOneSubmit = async (_: any, formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      fullName: formData.get('fullName') as string,
      phone: `+1${formData.get('phone') as string}`
    }

    const userUpdate = await api.user.update.mutate(data)

    revalidatePath("/onboard")
    
    return { status: "SUCCESS", data: userUpdate }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}
  
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      length: Number(formData.get('length')),
    }
    
    const dependents = [...Array(data.length).keys()].map((i) => {
      const fullName = formData.get(`fullName-${i}`) as string
      const phone = formData.get(`phone-${i}`) as string

      return { fullName, phone }
    })

    const user = await api.user.update.mutate({ id: data.id, completedUserOnboarding: true })
    await api.dependent.createMany.mutate({
      userEmail: user!.email,
      dependents,
    })

    revalidatePath("/onboard")
    
    return { status: "SUCCESS" }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}

