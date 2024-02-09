'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
 
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  const data = {
    userId: Number(formData.get('userId') as string),
    customerId: formData.get('customerId') as string,
    dependentId: Number(formData.get('dependentId') as string),
    length: Number(formData.get('length') as string),
  }
  const price = formData.get('price') as string
  
  const dependents = [...Array(data.length).keys()].map((i) => {
    const fullName = formData.get(`fullName-${i}`) as string
    const phone = `+1${formData.get(`phone-${i}`) as string}`
    const email = formData.get(`email-${i}`) as string

    return { fullName, phone, email }
  })
  const mainDependent = dependents.shift()

  await api.dependent.update.mutate({ 
    id: data.dependentId, 
    fullName: mainDependent!.fullName,  
    phone: `+1${mainDependent!.phone}` 
  })
  if (dependents.length > 0) {
    await api.dependent.createMany.mutate({
      userId: data.userId,
      dependents,
    })
  }
  await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })
  
  console.log("price: ", price)
  if (price) {
    const checkoutSession = await api.stripe.createCheckoutSession.mutate({
      customerId: data.customerId,
      price: price === "standard" ? "STANDARD" : "LIFETIME",
    })

    redirect(checkoutSession.url!)
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

