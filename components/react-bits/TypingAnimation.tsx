'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypingAnimationProps {
  text: string | string[]
  className?: string
  duration?: number
  delay?: number
  cursor?: boolean
  cursorChar?: string
  loop?: boolean
  deleteSpeed?: number
  pauseDuration?: number
}

export function TypingAnimation({
  text,
  className,
  duration = 100,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  loop = false,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [textArrayIndex, setTextArrayIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const texts = Array.isArray(text) ? text : [text]
  const currentText = texts[textArrayIndex]

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // Typing
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, duration)
      } else if (loop || texts.length > 1) {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      // Deleting
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        }, deleteSpeed)
      } else {
        // Move to next text
        setIsDeleting(false)
        setTextArrayIndex((prev) => (prev + 1) % texts.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, isStarted, currentText, duration, deleteSpeed, pauseDuration, loop, texts.length])

  return (
    <span className={cn('inline-flex', className)}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-0.5"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  )
}
