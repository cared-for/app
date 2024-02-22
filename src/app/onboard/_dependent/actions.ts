'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export const stepOneSubmit = async (_: any, formData: FormData) => {
  try {
    const data = {
      id: Number(formData.get('userId') as string),
      fullName: formData.get('fullName') as string,
      phone: `+1${formData.get('phone') as string}`,
      email: formData.get('email') as string,
    }

    await api.user.update.mutate(data)

   // PLAUSIBLE API EVENT REQUEST
    const head = headers()
    await fetch("https://plausible.io/api/event", {
      method: "POST",
      // @ts-expect-error - TS doesn't know about the headers method
      headers: {
        "User-Agent": head.get("user-agent") ?? undefined,
        "X-Forwarded-For": head.get("x-forwarded-for") ?? undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "step one submit",
        domain: "caredfor.care",
        url: "https://caredfor.care/onboard",
      }),
    })

    revalidatePath("/onboard")
  } catch (error: any) {
    return { status: "FAIL", message: error.message }
  }
}

 
export const stepThreeSubmit = async (_: any, formData: FormData) => {
  try {
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
    // pops off the main dependent in the first index
    dependents.shift()

    if (dependents.length > 0) {
      await api.dependent.createMany.mutate({
        userId: data.userId,
        dependents,
      })
    }
    await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })
    
    if (price) {
      const checkoutSession = await api.stripe.createCheckoutSession.mutate({
        customerId: data.customerId,
        price: price === "monthly" ? "MONTHLY" : "ANNUAL",
      })

      redirect(checkoutSession.url!)
    }

    // PLAUSIBLE API EVENT REQUEST
    const head = headers()
    await fetch("https://plausible.io/api/event", {
      method: "POST",
      // @ts-expect-error - TS doesn't know about the headers method
      headers: {
        "User-Agent": head.get("user-agent") ?? undefined,
        "X-Forwarded-For": head.get("x-forwarded-for") ?? undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "step three dependent submit",
        domain: "caredfor.care",
        url: "https://caredfor.care/onboard",
      }),
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch(error: any) {
    return { status: "FAIL", message: error.message }
  }
}

