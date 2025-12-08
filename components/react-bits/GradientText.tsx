'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  animate?: boolean
}

export function GradientText({
  children,
  className,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6'],
  animationSpeed = 3,
  animate = true,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: animate ? '200% auto' : '100% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  if (!animate) {
    return (
      <span className={cn(className)} style={gradientStyle}>
        {children}
      </span>
    )
  }

  return (
    <motion.span
      className={cn(className)}
      style={gradientStyle}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}
