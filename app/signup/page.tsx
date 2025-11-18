'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vault py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-smoke border-blood-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent">
              Join the Vault
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => signIn('google')} className="w-full bg-blood-600 hover:bg-blood-700">
              Sign up with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-blood-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-smoke px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Link href="/login">
              <Button variant="outline" className="w-full border-blood-600">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
