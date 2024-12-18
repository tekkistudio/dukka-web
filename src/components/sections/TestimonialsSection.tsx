'use client'

import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { useRef } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Aminata Sow',
    business: 'Aminata Fashion',
    image: 'aminata.jpg',
    location: 'Dakar, Sénégal',
    metrics: {
      sales: '+45%',
      response: '24/7',
      satisfaction: '4.9/5'
    },
    quote: 'Dukka a transformé ma boutique de mode. Mes clients adorent pouvoir discuter des produits avant d\'acheter. Mon taux de conversion a augmenté de 45% !'
  },
  {
    name: 'Moussa Diop',
    business: 'Librairie du Savoir',
    image: 'moussa.jpg',
    location: 'Abidjan, Côte d\'Ivoire',
    metrics: {
      sales: '+35%',
      response: '24/7',
      satisfaction: '4.8/5'
    },
    quote: 'Le système de conversation rend les achats plus naturels. Mes clients peuvent poser toutes leurs questions sur les livres avant d\'acheter.'
  },
  {
    name: 'Fatou Kane',
    business: 'Beauté Naturelle',
    image: 'fatou.jpg',
    location: 'Bamako, Mali',
    metrics: {
      sales: '+40%',
      response: '24/7',
      satisfaction: '4.9/5'
    },
    quote: 'Je peux enfin vendre mes produits cosmétiques naturels en ligne ! Le chatbot répond aux questions même quand je ne suis pas disponible.'
  }
]

function TestimonialCard({ testimonial, index }: { testimonial: any, index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-[#F2F2F2] rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Profile */}
      <div className="flex items-start space-x-4 mb-6">
        <motion.div 
          className="relative w-16 h-16"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: (index * 0.2) + 0.3, type: "spring" }}
        >
          <Image
            src={`/images/testimonials/${testimonial.image}`}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover"
          />
        </motion.div>
        <div>
          <motion.h3 
            className="font-semibold text-lg text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: (index * 0.2) + 0.4 }}
          >
            {testimonial.name}
          </motion.h3>
          <motion.a 
            href="#"
            className="text-dukka-primary hover:underline block"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: (index * 0.2) + 0.5 }}
          >
            {testimonial.business}
          </motion.a>
          <motion.p 
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: (index * 0.2) + 0.6 }}
          >
            {testimonial.location}
          </motion.p>
        </div>
      </div>

      {/* Metrics */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: (index * 0.2) + 0.7 }}
      >
        <div className="text-center">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.sales}</div>
          <div className="text-xs text-gray-500">Ventes</div>
        </div>
        <div className="text-center border-x border-gray-100">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.response}</div>
          <div className="text-xs text-gray-500">Disponibilité</div>
        </div>
        <div className="text-center">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.satisfaction}</div>
          <div className="text-xs text-gray-500">Satisfaction</div>
        </div>
      </motion.div>

      {/* Rating */}
      <motion.div 
        className="flex space-x-1 mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: (index * 0.2) + 0.8 }}
      >
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </motion.div>

      {/* Quote */}
      <motion.blockquote 
        className="text-gray-700 italic"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: (index * 0.2) + 0.9 }}
      >
        "{testimonial.quote}"
      </motion.blockquote>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientTitle subtitle="Découvrez comment nos clients transforment leur activité avec Dukka">
            Ils ont choisi Dukka
          </GradientTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/temoignages"
            className="inline-flex items-center justify-center px-6 py-3 border border-dukka-primary text-dukka-primary hover:bg-dukka-primary hover:text-white transition-colors duration-200 rounded-lg font-semibold"
          >
            Voir plus de témoignages
          </a>
        </motion.div>
      </div>
    </section>
  )
}