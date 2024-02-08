import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import Stripe from "stripe"
import { env } from "~/env"
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const sig = request.headers.get('Stripe-Signature')

  if (!sig) {
    return NextResponse.error()
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const customerId = session.customer

      if (!customerId) throw new Error('No customer ID')

      await db
        .update(users)
        .set({ onFreeTrial: false })
        .where(
          eq(
            users.customerId,
            customerId as string
          )
        )

      console.log("payment successfully recorded")
    }
  } catch (err) {
    return NextResponse.error()
  }

  return NextResponse.json({}, { status: 200 })
}

