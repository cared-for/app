'use server'

import { api } from "~/trpc/server"
  
export const stepOneSubmit = async (formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      fullName: formData.get('fullName') as string,
      phone: `+1${formData.get('phone') as string}`
    }

    console.log("data in step one submit: ", data)

    const userUpdate = await api.user.update.mutate(data)
    
    return { status: "SUCCESS", data: userUpdate }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}
  
export const stepTwoSubmit = async (formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      time: formData.get('time') as string,
    }

    console.log("Data: ", data)

    const userUpdate = await api.user.update.mutate(data)
    
    return { status: "SUCCESS", data: userUpdate }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}

