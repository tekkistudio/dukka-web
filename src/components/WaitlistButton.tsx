'use client'

import { useWaitlist } from '@/contexts/WaitlistContext'

interface WaitlistButtonProps {
  className?: string
  variant?: 'primary' | 'secondary'
}

export function WaitlistButton({ className = '', variant = 'primary' }: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlist()

  return (
    <button
      onClick={openWaitlist}
      className={`${
        variant === 'primary'
          ? 'bg-dukka-primary text-white hover:bg-dukka-dark'
          : 'bg-white text-dukka-primary border border-dukka-primary hover:bg-dukka-primary/5'
      } px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200 ${className}`}
    >
      Rejoindre la liste d'attente
    </button>
  )
}