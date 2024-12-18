'use client'

import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Fonctionnalités', href: '/fonctionnalites' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Témoignages', href: '#' },
    { name: 'Guide d\'utilisation', href: '#' },
    { name: 'Mises à jour', href: '#' }
  ],
  resources: [
    { name: 'Centre d\'aide', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tutoriels', href: '#' },
    { name: 'API Documentation', href: '#' },
    { name: 'Statut système', href: '#' }
  ],
  company: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Carrières', href: '#' },
    { name: 'Partenaires', href: '#' },
    { name: 'Presse', href: '#' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Conditions générales', href: '/conditions' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Cookies', href: '#' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/dukka.africa' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/dukka.africa' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/dukka.africa' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/dukka.africa' }
]

function FooterColumn({ title, links }: { title: string, links: any[] }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-gray-600 hover:text-dukka-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FooterContent() {
  return (
    <div>
      {/* Logo et description */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
        <div className="lg:col-span-2">
          <a href="/" className="inline-block">
            <Image
              src="/images/logo/logo_blue.svg"
              alt="Dukka"
              width={200}
              height={80}
              className="w-auto h-12 md:h-16"
            />
          </a>
          <p className="mt-4 text-gray-600 max-w-md">
            Dukka réinvente l'expérience de vente et d'achat en ligne pour la rapprocher des pratiques culturelles africaines. Une solution conversationnelle 
            qui transforme chaque visite en opportunité de vente.
          </p>
          <div className="flex space-x-4 mt-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-dukka-primary transition-colors duration-200"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Liens */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
          <FooterColumn title="Produit" links={footerLinks.product} />
          <FooterColumn title="Ressources" links={footerLinks.resources} />
          <FooterColumn title="Entreprise" links={footerLinks.company} />
          <FooterColumn title="Légal" links={footerLinks.legal} />
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dukka. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {['wave_1', 'om_1', 'cb_1'].map((payment) => (
              <div key={payment} className="hover:-translate-y-0.5 transition-transform duration-200">
                <Image
                  src={`/images/payments/${payment}.svg`}
                  alt={payment.split('_')[0].toUpperCase()}
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}