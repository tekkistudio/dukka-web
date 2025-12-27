'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, TrendingUp, Package, Globe, ArrowRight, Quote } from 'lucide-react';

const metrics = [
  {
    value: '11',
    unit: 'ans',
    label: "dans l'e-commerce",
  },
  {
    value: '+270k€',
    unit: '',
    label: 'de bénéfice généré',
  },
  {
    value: '+7 000',
    unit: '',
    label: 'commandes livrées',
  },
];

export default function FounderStorySection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Pour l'instant, pas de vidéo — on affiche l'image avec un bouton play
  // Quand la vidéo sera prête, on pourra l'intégrer facilement
  const hasVideo = false; // Passer à true quand la vidéo sera disponible
  const videoUrl = ''; // URL de la vidéo YouTube ou Vimeo

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-dukka-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-dukka-orange-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-dukka-blue-50 rounded-full mb-6">
              <Globe className="w-4 h-4 text-dukka-blue" />
              <span className="text-sm font-semibold text-dukka-blue-700">
                Créé par des e-commerçants africains
              </span>
            </div>

            {/* Quote / Headline */}
            <div className="relative mb-8">
              <Quote className="absolute -top-4 -left-2 w-10 h-10 text-dukka-blue-100" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dukka-gray-900 leading-tight">
                Nous avons géré{' '}
                <span className="text-dukka-blue">+7 000 commandes</span> en Afrique.
              </h2>
              <p className="text-xl sm:text-2xl text-dukka-gray-600 mt-4 leading-relaxed">
                Et nous avons perdu des heures chaque semaine à cause d'outils qui n'étaient pas faits pour notre marché.
              </p>
            </div>

            {/* Story - Version courte */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-dukka-gray-700 leading-relaxed">
                Après <span className="font-semibold text-dukka-gray-900">11 ans dans l'e-commerce</span> et{' '}
                <span className="font-semibold text-dukka-gray-900">+270 000€ de bénéfice</span> générés 
                entre l'Europe et l'Afrique, nous avons compris une chose :
              </p>
              <p className="text-xl font-semibold text-dukka-gray-900">
                Ce qui marche à Paris ne marche pas à Dakar.
              </p>
              <p className="text-lg text-dukka-gray-700">
                Alors nous avons créé les outils qui nous manquaient.
              </p>
            </div>

            {/* Metrics - Horizontal */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-dukka-gray-50 rounded-2xl border border-dukka-gray-100">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-dukka-blue">
                    {metric.value}
                    <span className="text-lg">{metric.unit}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-dukka-gray-600 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="solutions"
                className="inline-flex items-center justify-center px-6 py-3 bg-dukka-blue text-white font-semibold rounded-lg hover:bg-dukka-blue-700 transition-all hover:shadow-lg group"
              >
                Découvrir nos solutions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-dukka-gray-200 text-dukka-gray-700 font-semibold rounded-lg hover:border-dukka-blue hover:text-dukka-blue transition-all"
              >
                Notre histoire complète
              </Link>
            </div>
          </motion.div>

          {/* Right: Photo/Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/team/ibuka-assis.jpg"
                  alt="Fondateur de Dukka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Play button - si vidéo disponible */}
                {hasVideo && !isVideoPlaying && (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-dukka-blue ml-1" fill="currentColor" />
                    </div>
                    <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      Voir notre histoire (2 min)
                    </span>
                  </button>
                )}

                {/* Founder name badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-dukka-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">IN</span>
                      </div>
                      <div>
                        <p className="font-semibold text-dukka-gray-900">Ibuka Ndjoli</p>
                        <p className="text-sm text-dukka-gray-600">Fondateur de Dukka</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-dukka-orange-100 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-dukka-blue-100 rounded-2xl -z-10" />

              {/* Floating testimonial/stat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-4 top-1/4 hidden lg:block"
              >
                <div className="bg-white rounded-xl p-4 shadow-xl border border-dukka-gray-100 max-w-[200px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">Terrain</span>
                  </div>
                  <p className="text-xs text-dukka-gray-600">
                    Nous utilisons nos propres outils pour nos marques chaque jour.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -left-4 bottom-1/3 hidden lg:block"
              >
                <div className="bg-dukka-blue text-white rounded-xl p-4 shadow-xl max-w-[180px]">
                  <Package className="w-5 h-5 mb-2" />
                  <p className="text-sm font-medium">
                    2 marques ecom actives en Afrique
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust indicators - Optional, more subtle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-dukka-gray-500 mb-4">
            Nos solutions sont testées sur nos propres marques avant d'être proposées
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-dukka-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Utilisées quotidiennement</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Feedback terrain intégré</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Améliorées en continu</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}