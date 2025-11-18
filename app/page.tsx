import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-center space-y-8 z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-red-500 to-blood-600 bg-clip-text text-transparent">
            PULSEVAULT
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Track your strain, recovery, and dominance. Share real data with elite communities. No filters. Just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/signup">
              <Button size="lg" className="bg-blood-600 hover:bg-blood-700 text-white text-lg px-8 py-4">
                Join the Vault <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/communities">
              <Button size="lg" variant="outline" className="border-blood-600 text-white hover:bg-blood-900/50 px-8 py-4">
                Explore Communities
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Zap className="w-12 h-12 mx-auto text-blood-500 mb-4" />
              <p className="text-lg font-semibold">Live Strain Tracking</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Shield className="w-12 h-12 mx-auto text-blood-500 mb-4" />
              <p className="text-lg font-semibold">Private Elite Clans</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Trophy className="w-12 h-12 mx-auto text-blood-500 mb-4" />
              <p className="text-lg font-semibold">Cash Prize Challenges</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-smoke/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent">
            Why PulseVault Crushes the Competition
          </h2>
          <Link href="/pricing">
            <Button size="lg" className="bg-blood-600 hover:bg-blood-700 text-xl px-12 py-6">
              Unlock Premium Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
