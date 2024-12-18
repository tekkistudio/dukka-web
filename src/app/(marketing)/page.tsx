// src/app/(marketing)/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { DemoSection } from '@/components/sections/DemoSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <FAQSection />
    </main>
  )
}