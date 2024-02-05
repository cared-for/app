'use server'

import { revalidatePath } from "next/cache"
import { api } from "~/trpc/server"
  
export const profileSubmit = async (_: any, formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('id')),
      fullName: formData.get('fullName') as string,
      phone: `+1${formData.get('phone') as string}`
    }

    const userUpdate = await api.user.update.mutate(data)
    
    return { status: "SUCCESS", data: userUpdate }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}
  
export const dependentsSubmit = async (_: any, formData: FormData) => {
  try {
    // Extract form data
    const data = {
      userId: Number(formData.get('userId')),
    }
    
    // parse out for the dependents data
    const keys = Array.from(formData.keys()).map((key) => key.split("-")[1])
    const uniqueKeys = Array.from(new Set(keys)).filter((key) => key)

    const dependents = uniqueKeys.map((i) => {
      const id = Number(formData.get(`id-${i}`))
      const fullName = formData.get(`fullName-${i}`) as string
      const phone = formData.get(`phone-${i}`) as string

      return { id, fullName, phone }
    }, {})

    console.log("dependents: ", dependents)
    
    // Need to get the set of new, updated and deleted dependents
    // new dependents are all the ids that aren't in the existing dependents
    // updated dependents are all the ids that are in the existing dependents
    // deleted dependents are everything else
    const existingDependents = await api.dependent.list.query({ userId: data.userId })
    const existingDepepdentsIds = existingDependents.map((dependent) => dependent.id)

    const newDependents = dependents.filter((dependent) => !existingDepepdentsIds.includes(dependent.id))
    const updatedDependents = dependents.filter((dependent) => existingDepepdentsIds.includes(dependent.id))
    const newAndUpdatedDependentIds = [
      ...(newDependents.map((dependent) => dependent.id)),
      ...(updatedDependents.map((dependent) => dependent.id)),
    ]
    const deletedDependents = existingDependents.filter((dependent) => !newAndUpdatedDependentIds.includes(dependent.id))

    console.log("new dependents: ", newDependents)
    console.log("updated dependents: ", updatedDependents)
    console.log("deleted dependents: ", deletedDependents)
    
    if (newDependents.length) await api.dependent.createMany.mutate({  
      userId: data.userId,
      dependents: newDependents,
    })
    if (updatedDependents.length) await api.dependent.updateMany.mutate({
      depdendents: updatedDependents,
    })
    if (deletedDependents.length) await api.dependent.delete.mutate({
      dependentIds: deletedDependents.map((dependent) => dependent.id),
    })

    revalidatePath("/dashboard")

    return { status: "SUCCESS" }
  } catch (error: any) {
    return { status: "ERROR", message: error.message }
  }
}

