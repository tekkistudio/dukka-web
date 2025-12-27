'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, CheckCircle, MessageCircle, Zap, Shield } from 'lucide-react';

// Logos des marques clientes
const brandLogos = [
  { name: '6C No Filter', logo: '/images/brand-logos/6cnofilter.webp' },
  { name: 'Sassoumane', logo: '/images/brand-logos/sassoumane.webp' },
  { name: 'Racines Précieuses', logo: '/images/brand-logos/racines.avif' },
  { name: 'Karyal', logo: '/images/brand-logos/karyal.webp' },
  { name: 'Exclusiv', logo: '/images/brand-logos/exclusiv.png' },
  { name: 'Ahovi Cosmetics', logo: '/images/brand-logos/ahovi.svg' },
];

export default function FinalCTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dukka-blue via-dukka-blue to-[#1a3a7d]" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dukka-blue-400/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">
              Rejoignez les marques qui nous font confiance
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Prêt.e à connecter votre boutique
            <br />
            <span className="text-white/80">aux réalités africaines ?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Commencez avec Chatseller. Gratuit pendant 7 jours.
            <br className="hidden sm:block" />
            Pas de carte bancaire. Installation en 2 minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="https://dashboard.chatseller.app/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-dukka-blue font-bold text-lg rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl group"
            >
              <span>Essayer Chatseller gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all group"
            >
              <Play className="w-5 h-5" />
              <span>Voir une démo</span>
            </Link>
          </div>

          {/* Reassurance */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            <div className="flex items-center space-x-2 text-white/80">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">7 jours gratuits</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Sans engagement</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Support WhatsApp inclus</span>
            </div>
          </div>

          {/* Trust logos 
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-10 border-t border-white/10"
          >
            <p className="text-sm text-white/50 mb-6">
              Ils utilisent déjà Chatseller
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12">
              {brandLogos.map((brand, index) => (
                <div
                  key={index}
                  className="relative h-8 sm:h-10 w-24 sm:w-28 grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
              */}
        </motion.div>
      </div>
    </section>
  );
}