//apps/web/src/components/waitlist/LoadingDots.tsx
'use client'

import { motion } from 'framer-motion'

export function LoadingDots() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex space-x-1 p-3 bg-white rounded-2xl w-16 ml-1"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}