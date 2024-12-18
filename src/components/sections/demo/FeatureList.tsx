// src/components/sections/demo/FeatureList.tsx
'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { WaitlistButton } from '@/components/WaitlistButton'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureListProps {
  features: Feature[]
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="w-full lg:w-2/5 h-full flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg">
      <div className="space-y-8 flex-grow">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="flex items-start space-x-6 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-dukka-primary bg-opacity-10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-dukka-primary" />
                </div>
              </div>
              <div className="flex-grow">
                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index * 0.2) + 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index * 0.2) + 0.3 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div 
        className="pt-8 mt-8 border-t border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <WaitlistButton className="w-full px-8 py-4 text-lg" />
      </motion.div>
    </div>
  )
}

export default FeatureList