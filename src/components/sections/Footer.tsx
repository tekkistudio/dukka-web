'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone,
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';

const footerLinks = {
  solutions: [
    { name: 'Chatseller', href: 'https://chatseller.app', badge: 'Disponible' },
    { name: 'Collecte WhatsApp', href: '#pipeline', badge: 'Bientôt' },
    { name: 'Transmission livreurs', href: '#pipeline', badge: 'Bientôt' },
    { name: 'Synchro Wave-Shopify', href: '#pipeline', badge: 'Bientôt' },
  ],
  resources: [
    { name: 'Blog', href: 'https://getdukka.substack.com/' },
    { name: 'Centre d\'aide', href: '/aide' },
    { name: 'Guides e-commerce', href: '/guides' },
  ],
  entreprise: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Nos Solutions', href: '/solutions' },
    { name: 'Problèmes résolus', href: '/#problems' },
    { name: 'Notre histoire', href: '/#founder-story' },
  ],
  legal: [
    { name: 'Conditions générales', href: '/conditions' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Mentions légales', href: '/mentions-legales' },
  ]
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/getdukka' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/getdukka' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/getdukka' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/getdukka' },
];

export default function Footer() {
  return (
    <footer className="bg-dukka-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo/logo_white.svg"
                alt="Dukka"
                width={140}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              L&apos;infrastructure e-commerce pensée pour l&apos;Afrique. 
              Des outils qui s&apos;intègrent à votre Shopify ou WooCommerce 
              pour résoudre les problèmes que vous vivez au quotidien.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:hello@getdukka.com" 
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@getdukka.com</span>
              </a>
              <a 
                href="https://wa.me/221767826804" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+221 76 782 68 04 (WhatsApp)</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Dakar, Sénégal 🇸🇳</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-dukka-blue transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Solutions */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Solutions
              </h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          link.badge === 'Disponible' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-dukka-blue/20 text-dukka-blue-300'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Ressources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Entreprise
              </h3>
              <ul className="space-y-3">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Légal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Substack Newsletter CTA */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Restez informé des nouveautés Dukka
              </h3>
              <p className="text-gray-400 text-sm">
                Recevez nos conseils e-commerce et soyez prévenu des lancements.
              </p>
            </div>
            <a
              href="https://getdukka.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-dukka-blue text-white font-semibold rounded-lg hover:bg-dukka-blue-700 transition-all hover:shadow-lg group"
            >
              <span>Suivre notre blog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Dukka. Tous droits réservés.
            </p>

            {/* Made with love */}
            <p className="text-gray-500 text-sm flex items-center space-x-1">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>au Sénégal pour l&apos;Afrique</span>
            </p>

            {/* Payment Methods 
            <div className="flex items-center space-x-4">
              {['wave', 'om', 'mtn', 'moov'].map((payment) => (
                <div 
                  key={payment} 
                  className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={`/images/payments/${payment}_1.svg`}
                    alt={payment.toUpperCase()}
                    width={40}
                    height={24}
                    className="h-6 w-auto"
                  />
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
}