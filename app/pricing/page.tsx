"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
import { createCryptoCharge } from "@/lib/payments" // We'll add this lib later

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Pricing() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleStripeCheckout = async (priceId: string) => {
    setLoading(true)
    const stripe = await stripePromise
    const { error } = await stripe!.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    })
    setLoading(false)
    if (error) alert(error.message)
  }

  const handleCrypto = async (plan: string) => {
    setLoading(true)
    const chargeUrl = await createCryptoCharge(session?.user.id!, plan)
    window.location.href = chargeUrl
  }

  const plans = [
    { name: "Free", price: 0, desc: "Basic tracking & public feed", features: ["Unlimited posts", "Public communities"], button: "Current Plan" },
    { name: "Pro", price: 15, desc: "$15/month - Unlock elite tools", features: ["Private communities", "Wearable imports", "AI Coach"], stripeId: "price_pro_monthly", button: "Subscribe Monthly" },
    { name: "Legend", price: 399, desc: "Lifetime access - $399 one-time", features: ["Everything in Pro", "Create paid communities", "Crypto payments"], stripeId: "price_legend_lifetime", crypto: true, button: "Get Lifetime" },
  ]

  return (
    <div className="min-h-screen py-20 bg-vault">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent"
        >
          Choose Your Power Level
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, x: -20 * i }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-smoke border-blood-800 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.desc}</CardDescription>
                  <div className="text-4xl font-bold text-blood-500">${plan.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-blood-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.stripeId && (
                    <Button onClick={() => handleStripeCheckout(plan.stripeId!)} disabled={loading || plan.name === "Free"} className="w-full">
                      {plan.button}
                    </Button>
                  )}
                  {plan.crypto && (
                    <div className="space-y-2">
                      <Button onClick={() => handleStripeCheckout(plan.stripeId!)} variant="outline" className="w-full">Card</Button>
                      <Button onClick={() => handleCrypto("legend")} variant="secondary" className="w-full bg-green-600 hover:bg-green-700">Crypto (BTC/ETH)</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
