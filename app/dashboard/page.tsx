'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-vault py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent">
              Your Feed, {session.user.name}
            </h1>
            <Button className="bg-blood-600 hover:bg-blood-700">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
          <div className="space-y-4">
            <Card className="bg-smoke border-blood-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-blood-500" />
                  Today's Strain: 18.2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Recovery 92% | Sleep 8.5h | HRV 78ms</p>
              </CardContent>
            </Card>
            <Card className="bg-smoke border-blood-800">
              <CardContent className="p-6">
                <p className="text-gray-300">Coach Rex: "You're a machine today. Keep crushing. 🔥"</p>
              </CardContent>
            </Card>
          </div>
          <Link href="/import">
            <Button variant="outline" className="border-blood-600 w-full">
              Import Wearable Data
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
