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

