'use client'

import { GradientTitle } from '@/components/GradientTitle';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactChat from '@/components/sections/contact/ContactChat';

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    details: [
      '🇸🇳 +221 78 136 27 28',
      '🇨🇮 +225 07 02 42 82 08'
    ]
  },
  {
    icon: Mail,
    title: 'Email',
    details: [
      'support@getdukka.com',
      'contact@getdukka.com'
    ]
  },
  {
    icon: MapPin,
    title: 'Adresse',
    details: [
      'Cité Keur Gorgui, Dakar',
      'Sénégal'
    ]
  }
];

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GradientTitle subtitle="Notre équipe est là pour vous accompagner dans votre réussite.">
              Contactez-nous
            </GradientTitle>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-dukka-primary to-dukka-dark rounded-2xl p-8 text-white h-full">
                <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
                <p className="text-blue-50 mb-8">
                  Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">{item.title}</h4>
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-blue-50 text-sm">{detail}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="font-medium mb-4">Heures d'ouverture</h4>
                  <p className="text-blue-50 text-sm">
                    Lundi - Vendredi : 9h - 18h
                    <br />
                    Samedi : 9h - 13h
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Chat */}
            <div className="lg:col-span-2">
            <div className="ring-1 ring-gray-200 rounded-2xl overflow-hidden">
              <ContactChat />
            </div>  
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Combien de temps pour avoir une réponse ?</h3>
              <p className="text-gray-600">
                Notre équipe s'engage à répondre à toutes les demandes dans un délai de 24h ouvrées maximum.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Comment obtenir une démonstration ?</h3>
              <p className="text-gray-600">
                Vous pouvez demander une démo personnalisée en discutant avec notre assistant virtuel ou en nous appelant directement.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Proposez-vous un support technique ?</h3>
              <p className="text-gray-600">
                Oui, tous nos clients bénéficient d'un support technique disponible par email, téléphone ou WhatsApp selon leur formule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}