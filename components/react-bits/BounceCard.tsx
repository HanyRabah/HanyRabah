'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BounceCardProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}

export function BounceCard({
  children,
  className,
  scale = 1.05,
  duration = 0.2,
}: BounceCardProps) {
  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      whileHover={{
        scale,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  )
}
