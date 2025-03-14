// src/components/sections/TestimonialsSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { useRef, useState } from 'react'
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
    quote: 'Dukka a transformé ma boutique de mode. Mes clients adorent pouvoir discuter des produits avant d\'acheter. Mon taux de conversion a augmenté de 45% et je ne perds plus de clients à cause des questions sans réponse.',
    industry: 'Mode'
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
    quote: 'Le système de conversation rend les achats plus naturels. Mes clients peuvent poser toutes leurs questions sur les livres avant d\'acheter. J\'économise beaucoup de temps et mes ventes ont augmenté de 35% en trois mois.',
    industry: 'Librairie'
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
    quote: 'Je peux enfin vendre mes produits cosmétiques naturels en ligne ! Le chatbot répond à toutes les questions sur les ingrédients et l\'utilisation des produits, même quand je ne suis pas disponible. Mes clients sont ravis.',
    industry: 'Cosmétiques'
  },
  {
    name: 'Ibrahim Ndiaye',
    business: 'Tech Express',
    image: 'ibrahim.jpg',
    location: 'Dakar, Sénégal',
    metrics: {
      sales: '+30%',
      response: '24/7',
      satisfaction: '4.7/5'
    },
    quote: 'Vendre des produits tech nécessite beaucoup d\'explications. Avec Dukka, mon Vendeur IA répond aux questions techniques des clients instantanément. Ma boutique est ouverte 24/7 et mes ventes ont augmenté de 30%.',
    industry: 'Électronique'
  },
  {
    name: 'Sophie Mensah',
    business: 'Délices d\'Afrique',
    image: 'sophie.jpg',
    location: 'Accra, Ghana',
    metrics: {
      sales: '+50%',
      response: '24/7',
      satisfaction: '5/5'
    },
    quote: 'Dukka m\'a permis de développer mon service de livraison de plats cuisinés. Le processus de commande est fluide et mes clients apprécient la simplicité. En plus, l\'Assistant IA m\'aide à comprendre quels plats se vendent le mieux.',
    industry: 'Restauration'
  }
];

function TestimonialCard({ testimonial, index, isActive }: { testimonial: any, index: number, isActive: boolean }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${
        isActive ? 'scale-105 shadow-md' : 'opacity-75 hover:opacity-100'
      }`}
    >
      {/* Profile & Quote */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-5">
          <motion.div 
            className="relative w-16 h-16 flex-shrink-0"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: (index * 0.1) + 0.3, type: "spring" }}
          >
            <Image
              src={`/images/testimonials/${testimonial.image}`}
              alt={testimonial.name}
              fill
              className="rounded-full object-cover border-2 border-dukka-primary/20"
            />
          </motion.div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
            <p className="text-dukka-primary hover:underline font-medium">
              {testimonial.business}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>{testimonial.location}</span>
              <span>•</span>
              <span>{testimonial.industry}</span>
            </div>
          </div>
        </div>

        <div className="mb-5 relative">
          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-dukka-primary/10" />
          <blockquote className="text-gray-700 pl-6">
            "{testimonial.quote}"
          </blockquote>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 border-t border-gray-100">
        <div className="text-center py-4 border-r border-gray-100">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.sales}</div>
          <div className="text-xs text-gray-500">Ventes</div>
        </div>
        <div className="text-center py-4 border-r border-gray-100">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.response}</div>
          <div className="text-xs text-gray-500">Disponibilité</div>
        </div>
        <div className="text-center py-4">
          <div className="text-dukka-primary font-bold">{testimonial.metrics.satisfaction}</div>
          <div className="text-xs text-gray-500">Satisfaction</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, amount: 0.3 });

  const displayedTestimonials = testimonials.slice(0, 3);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? displayedTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === displayedTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <GradientTitle subtitle="Découvrez comment nos clients transforment leur activité avec Dukka">
              Ils ont choisi Dukka
            </GradientTitle>
          </motion.div>

          <motion.div 
            className="flex space-x-2 mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ArrowRight className="w-5 h-5 transform rotate-180 text-gray-500" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ArrowRight className="w-5 h-5 text-gray-500" />
            </button>
          </motion.div>
        </div>

        {/* Desktop view: grid */}
        <motion.div 
          ref={containerRef}
          className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index}
              isActive={index === activeIndex}
            />
          ))}
        </motion.div>

        {/* Mobile view: single card */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <TestimonialCard 
            testimonial={displayedTestimonials[activeIndex]} 
            index={0}
            isActive={true}
          />
          
          <div className="flex justify-center mt-6 gap-2">
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-dukka-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`Voir témoignage ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Featured quote */}
        <motion.div 
          className="mt-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-dukka-primary/5 to-dukka-primary/20 rounded-2xl p-8 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-dukka-primary/20" />
            <blockquote className="text-xl italic text-gray-800 mb-6 pt-6">
              "Avec Dukka, je peux enfin vendre en ligne tout en conservant ce qui fait la force du commerce africain : 
              la conversation, l'échange, la relation humaine. C'est exactement ce dont nous avions besoin."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 relative">
                <Image 
                  src="/images/testimonials/featured.jpg" 
                  alt="Témoignage vedette" 
                  width={48} 
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Aisha Toure</p>
                <p className="text-sm text-gray-600">Fondatrice, Aisha Cosmetics</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/temoignages"
            className="inline-flex items-center justify-center px-6 py-3 border border-dukka-primary text-dukka-primary hover:bg-dukka-primary hover:text-white transition-colors duration-200 rounded-lg font-semibold group"
          >
            Voir plus de témoignages
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}