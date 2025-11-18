import { NextRequest, NextResponse } from 'next/server'
import { handleStripeWebhook } from '@/lib/payments'

export async function POST(req: NextRequest) {
  const body = await req.body.read()
  const sig = req.headers.get('stripe-signature')!

  try {
    const event = await handleStripeWebhook(sig, body)
    return NextResponse.json(event)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
