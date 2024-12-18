// src/components/sections/demo/ScenarioSelector.tsx
'use client'

import { motion } from 'framer-motion'
import type { Scenario } from './data'

interface ScenarioSelectorProps {
  scenarios: Scenario[]
  activeScenario: Scenario
  onSelect: (scenario: Scenario) => void
}

export function ScenarioSelector({ scenarios, activeScenario, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 px-2 -mx-2">
        {scenarios.map((scenario) => (
          <motion.button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className={`flex flex-col items-start rounded-lg px-4 py-2 min-w-[200px] transition-colors duration-200 ${
              activeScenario.id === scenario.id
                ? 'bg-dukka-primary text-white'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold">{scenario.title}</span>
            <span className={`text-sm ${
              activeScenario.id === scenario.id ? 'text-white/80' : 'text-gray-500'
            }`}>
              {scenario.subtitle}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}