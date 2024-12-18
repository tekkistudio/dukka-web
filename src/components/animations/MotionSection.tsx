'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MotionSection({ children, className = '', delay = 0.2 }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}