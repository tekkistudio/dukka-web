'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

export default function NewFooter() {
  const footerLinks = {
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: "Conditions d'utilisation", href: '/conditions' },
    ],
    company: [
      { label: 'À propos', href: '#a-propos' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Journal', href: '#journal' },
    ],
    products: [
      { label: 'Chatseller.app', href: 'https://chatseller.app', external: true },
    ],
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/dukka',
      label: 'LinkedIn',
      color: 'hover:text-dukka-violet-500',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/dukka',
      label: 'Twitter / X',
      color: 'hover:text-dukka-magenta-500',
    },
    {
      icon: Mail,
      href: 'mailto:contact@dukka.io',
      label: 'Email',
      color: 'hover:text-dukka-pink-500',
    },
  ];

  return (
    <footer className="relative bg-dukka-black border-t border-white/5 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-violet-magenta opacity-20" />
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-violet-magenta rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo/logo_white.svg"
                alt="Dukka Logo"
                width={140}
                height={48}
                className="transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <p className="text-dukka-gray-300 leading-relaxed mb-6 max-w-sm">
              Retail Tech Hub. Nous bâtissons le commerce de demain en créant des solutions SaaS
              innovantes pour e-commerçants.
            </p>

            {/* Location */}
            <div className="flex items-start space-x-2 text-dukka-gray-400 mb-6">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-dukka-violet-500" />
              <div className="text-sm">
                <p>Bruxelles, Belgique</p>
                <p>Paris, France</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 rounded-xl bg-dukka-neutral-800 border border-white/5 flex items-center justify-center text-dukka-gray-400 ${social.color} transition-all duration-300 hover:border-white/20`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-dukka-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Produits
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-dukka-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center space-x-1 group"
                  >
                    <span>{link.label}</span>
                    {link.external && (
                      <span className="text-dukka-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-dukka-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-dukka-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dukka. Tous droits réservés.
          </p>

          {/* Tagline */}
          <p className="text-dukka-gray-400 text-sm text-center md:text-right">
            <span className="gradient-text font-semibold">Retail Tech Hub</span> — Bâtir le
            commerce de demain.
          </p>
        </div>

        {/* Extra Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-dukka-gray-500">
            Fait avec passion à Bruxelles et Paris 🇧🇪 🇫🇷
          </p>
        </div>
      </div>
    </footer>
  );
}
