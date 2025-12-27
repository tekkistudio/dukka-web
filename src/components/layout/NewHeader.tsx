'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, MessageCircle, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useAnnouncement } from '@/contexts/AnnouncementContext';

const solutions = [
  {
    name: 'Chatseller',
    description: 'Conseillère IA pour marques beauté',
    href: 'https://chatseller.app',
    icon: MessageCircle,
    badge: 'Disponible',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    name: 'WhatsApp CRM',
    description: 'Capturez des contacts WhatsApp',
    href: '#pipeline',
    icon: Sparkles,
    badge: 'Bientôt',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Delivery Manager',
    description: 'Envoi auto des infos aux livreurs',
    href: '#pipeline',
    icon: Truck,
    badge: 'Bientôt',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Order Automation',
    description: 'Mise à jour auto des commandes',
    href: '#pipeline',
    icon: RefreshCw,
    badge: 'Bientôt',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
];

const navLinks = [
  { name: 'Études de cas', href: '/etudes-de-cas' },
  { name: 'À propos', href: '/a-propos' },
];

export default function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  
  const { isVisible: isAnnouncementVisible } = useAnnouncement();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile si on resize vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Gestion du hover avec délai pour le menu Solutions
  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) {
      clearTimeout(solutionsTimeoutRef.current);
    }
    setIsSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm z-40'
            : 'bg-transparent z-40'
        }`}
        style={{ top: isAnnouncementVisible ? '48px' : '0' }}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo/logo_blue.svg"
                alt="Dukka"
                width={140}
                height={48}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-10">
                {/* Solutions Dropdown */}
                <div
                  ref={solutionsRef}
                  className="relative"
                  onMouseEnter={handleSolutionsMouseEnter}
                  onMouseLeave={handleSolutionsMouseLeave}
                >
                  <button
                    className={`flex items-center space-x-1 font-medium transition-colors ${
                      isSolutionsOpen
                        ? 'text-dukka-blue'
                        : 'text-dukka-gray-700 hover:text-dukka-blue'
                    }`}
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSolutionsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isSolutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-4"
                        onMouseEnter={handleSolutionsMouseEnter}
                        onMouseLeave={handleSolutionsMouseLeave}
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-80">
                          <div className="space-y-1">
                            {solutions.map((solution) => (
                              <Link
                                key={solution.name}
                                href={solution.href}
                                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                onClick={() => setIsSolutionsOpen(false)}
                              >
                                <div className="flex-shrink-0 w-10 h-10 bg-dukka-blue-50 rounded-lg flex items-center justify-center group-hover:bg-dukka-blue-100 transition-colors">
                                  <solution.icon className="w-5 h-5 text-dukka-blue" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-900">
                                      {solution.name}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${solution.badgeColor}`}>
                                      {solution.badge}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {solution.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-medium text-dukka-gray-700 hover:text-dukka-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-dukka-blue text-white font-semibold rounded-lg hover:bg-dukka-blue-700 transition-all group"
              >
                <span>Essayer gratuitement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-dukka-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-dukka-gray-700" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Full Screen (sans header dupliqué) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ top: isAnnouncementVisible ? 'calc(48px + 80px)' : '80px' }} // Commence sous le header
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel - Full Width, sous le header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute inset-x-0 top-0 bg-white shadow-xl flex flex-col max-h-[calc(100vh-128px)] overflow-hidden"
            >
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Solutions Accordion */}
                <div className="mb-2">
                  <button
                    onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                    className="flex items-center justify-between w-full py-4 text-left border-b border-gray-100"
                  >
                    <span className="text-lg font-semibold text-gray-900">Solutions</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        isMobileSolutionsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 py-4">
                          {solutions.map((solution) => (
                            <Link
                              key={solution.name}
                              href={solution.href}
                              className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <solution.icon className="w-5 h-5 text-dukka-blue" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-gray-900">
                                    {solution.name}
                                  </span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${solution.badgeColor}`}>
                                    {solution.badge}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-0.5">
                                  {solution.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-4 text-lg font-semibold text-gray-900 hover:text-dukka-blue transition-colors border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* CTA at Bottom */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link
                  href="https://dashboard.chatseller.app/register"
                  className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-dukka-blue text-white text-lg font-semibold rounded-xl hover:bg-dukka-blue-700 transition-all group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-sm text-gray-500 mt-3">
                  7 jours gratuits · Sans carte bancaire
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}