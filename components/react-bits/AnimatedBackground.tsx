'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedBackgroundProps {
  className?: string
  variant?: 'dots' | 'grid' | 'gradient' | 'particles'
  color?: string
  opacity?: number
}

export function AnimatedBackground({
  className,
  variant = 'dots',
  color = 'var(--theme-primary)',
  opacity = 0.1,
}: AnimatedBackgroundProps) {
  if (variant === 'dots') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '24px 24px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
            opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [opacity, opacity * 1.5, opacity],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    )
  }

  // Particles variant
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: color,
            opacity: Math.random() * opacity + opacity / 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [opacity, opacity * 2, opacity],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
