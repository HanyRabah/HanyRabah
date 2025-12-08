'use client'

import { useState, ReactNode, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Spark {
  id: number
  x: number
  y: number
}

interface ClickSparkProps {
  children: ReactNode
  className?: string
  sparkColor?: string
  sparkCount?: number
  sparkSize?: number
}

export function ClickSpark({
  children,
  className,
  sparkColor = 'var(--theme-primary)',
  sparkCount = 8,
  sparkSize = 4,
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }))

    setSparks((prev) => [...prev, ...newSparks])

    // Clean up sparks after animation
    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)))
    }, 600)
  }

  return (
    <div className={cn('relative inline-block', className)} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {sparks.map((spark, index) => {
          const angle = (index / sparkCount) * 360
          const distance = 30 + Math.random() * 20

          return (
            <motion.span
              key={spark.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: spark.x,
                top: spark.y,
                width: sparkSize,
                height: sparkSize,
                backgroundColor: sparkColor,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                x: Math.cos((angle * Math.PI) / 180) * distance,
                y: Math.sin((angle * Math.PI) / 180) * distance,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
