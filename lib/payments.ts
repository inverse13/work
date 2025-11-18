import Stripe from 'stripe'
import CoinbaseCommerce from 'coinbase-commerce-node'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-10-22' })
const coinbase = CoinbaseCommerce

export async function createStripeSession(userId: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXTAUTH_URL!,
    metadata: { userId },
  })
  return session.url
}

export async function createCryptoCharge(userId: string, plan: string) {
  const chargeData = {
    name: `PulseVault ${plan}`,
    description: 'Lifetime Premium Access',
    local_price: { amount: '399.00', currency: 'USD' },
    pricing_type: 'fixed_price' as const,
    metadata: { userId, plan },
  }
  const charge = await coinbase.resources.Charge.create(chargeData)
  return charge.hosted_url
}

export async function handleStripeWebhook(signature: string, payload: Buffer) {
  const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    // Update user premium in DB
    await prisma.user.update({
      where: { stripeCustomerId: session.customer as string },
      data: { isPremium: true },
    })
  }
  return { received: true }
}
