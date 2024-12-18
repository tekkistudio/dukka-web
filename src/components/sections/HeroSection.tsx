'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WaitlistButton } from '@/components/WaitlistButton'

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen flex items-center">
      {/* Gradient de fond */}
      <motion.div 
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-dukka-light to-dukka-primary sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </motion.div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto lg:flex lg:items-center lg:gap-x-20">
          {/* Texte à gauche */}
          <div className="w-full pt-20 lg:pt-0 max-w-xl lg:shrink-0 xl:max-w-2xl">
            <motion.h1 
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Vendez comme{' '}
              <span className="text-dukka-primary block mt-2 sm:inline sm:mt-0">l'Afrique achète</span>
            </motion.h1>

            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Créez une boutique en ligne où vos clients se sentent en confiance,
              et transformez chaque conversation en vente. Sans avoir à coder.
            </motion.p>

            <motion.div 
              className="mt-10 flex items-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <WaitlistButton />
              <a href="#demo" className="text-sm font-semibold leading-6 text-gray-900 hover:text-dukka-primary">
                Voir une démo <span aria-hidden="true">→</span>
              </a>
            </motion.div>
            
            {/* Stats rapides */}
            <motion.div 
              className="mt-16 grid grid-cols-3 gap-x-8 gap-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div>
                <p className="text-3xl font-bold tracking-tight text-dukka-primary">+45%</p>
                <p className="mt-1 text-base leading-7 text-gray-600">de ventes en moyenne</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-dukka-primary">60%</p>
                <p className="mt-1 text-base leading-7 text-gray-600">de temps gagné</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-dukka-primary">75%</p>
                <p className="mt-1 text-base leading-7 text-gray-600">de clients en plus</p>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            className="mt-8 sm:mt-12 lg:mt-0 flex justify-center lg:justify-end w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-[540px] sm:w-[360px] sm:h-[540px] lg:w-[480px] lg:h-[720px]">
              <Image
                src="/images/hero/mockup-dukka.png"
                alt="Interface Dukka"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 480px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection