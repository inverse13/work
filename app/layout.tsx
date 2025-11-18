import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { authOptions } from "@/lib/auth"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import ParticleBackground from "@/components/ParticleBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PulseVault • Track Harder. Dominate Together.",
  description: "The ultimate performance & recovery social platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-vault text-white">
      <body className={inter.className}>
        <SessionProvider>
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10 min-h-screen pt-16">{children}</main>
          <Toaster position="bottom-right" theme="dark" />
        </SessionProvider>
      </body>
    </html>
  )
}
