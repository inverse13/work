'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, Zap } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vault/80 backdrop-blur-md border-b border-blood-900/50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent flex items-center">
          <Zap className="mr-2 h-6 w-6" />
          PULSEVAULT
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost">Premium</Button>
              </Link>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blood-600 hover:bg-blood-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
