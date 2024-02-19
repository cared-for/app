'use server'

import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export const stepThreeSubmit = async (_: any, formData: FormData) => {
  const data = {
    userId: Number(formData.get('userId') as string),
    customerId: formData.get('customerId') as string,
    length: Number(formData.get('length') as string),
  }
  const price = formData.get('price') as string
  
  const dependents = [...Array(data.length).keys()].map((i) => {
    const fullName = formData.get(`fullName-${i}`) as string
    const phone = `+1${formData.get(`phone-${i}`) as string}`
    const email = formData.get(`email-${i}`) as string

    return { fullName, phone, email }
  })

  await api.dependent.createMany.mutate({
    userId: data.userId,
    dependents,
  })
  await api.user.update.mutate({ id: data.userId, completedUserOnboarding: true })

  if (price) {
    const checkoutSession = await api.stripe.createCheckoutSession.mutate({
      customerId: data.customerId,
      price: price === "standard" ? "STANDARD" : "LIFETIME",
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
      name: "step three main user submit",
      domain: "caredfor.care",
      url: "https://caredfor.care/onboard",
    }),
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

