'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StarBorderProps {
  children: ReactNode
  className?: string
  color?: string
  speed?: number
  borderWidth?: number
  borderRadius?: number
}

export function StarBorder({
  children,
  className,
  color = 'var(--theme-primary)',
  speed = 3,
  borderWidth = 2,
  borderRadius = 12,
}: StarBorderProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ borderRadius }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner content with background to mask the border */}
      <div
        className="relative bg-background"
        style={{
          margin: borderWidth,
          borderRadius: borderRadius - borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  )
}
