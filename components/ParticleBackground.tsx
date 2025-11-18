'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ParticleBackground() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const manageMouse = (e: MouseEvent) => {
    mouse.x.set(e.clientX)
    mouse.y.set(e.clientY)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', manageMouse)
  }

  const xSpring = useSpring(mouse.x, { damping: 30, stiffness: 400 })
  const ySpring = useSpring(mouse.y, { damping: 30, stiffness: 400 })

  const top = useTransform(ySpring, [0, window.innerHeight], ['20%', '80%'])
  const left = useTransform(xSpring, [0, window.innerWidth], ['20%', '80%'])

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ top, left }}
    >
      <div className="w-96 h-96 bg-blood-500/10 rounded-full blur-3xl" />
    </motion.div>
  )
}
