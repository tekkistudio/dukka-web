// FeaturesPage component
import Image from 'next/image'
import { GradientTitle } from '@/components/GradientTitle'
import { MessageSquare, CreditCard, BarChart3, Globe, ShieldCheck, Smartphone, Headphones } from 'lucide-react'

const mainFeatures = [
  {
    title: "Un vendeur IA qui comprend vos clients",
    description: "Transformez chaque visite sur votre boutique en ligne en vente potentielle grâce à notre chatbot IA qui :",
    details: [
      "Répond aux questions de vos clients 24h/24",
      "Parle en français et dans les langues locales", 
      "Comprend les expressions du marché",
      "Suggère les produits adaptés à chaque client"
    ],
    imageAlt: "Démonstration du chatbot IA"
  },
  {
    title: "Tous les paiements locaux intégrés",
    description: "Acceptez les modes de paiement que vos clients préfèrent. Simple pour eux, simple pour vous.",
    details: [
      "Wave, Orange Money, MTN Money intégrés",
      "Confirmation des paiements en temps réel",
      "Paiement par carte bancaire accepté",
      "Suivi des paiements par SMS"
    ],
    imageAlt: "Interface de paiement mobile"
  },
  {
    title: "Votre assistant business personnel",
    description: "Un assistant IA qui analyse vos performances et vous guide pour augmenter vos ventes, dans un langage simple.",
    details: [
      "Comprend et explique vos performances",
      "Suggère des actions pour vendre plus",
      "Identifie les opportunités de vente",
      "Vous alerte des points à améliorer"
    ],
    imageAlt: "Dashboard d'analyse business"
  }
]

const additionalFeatures = [
  {
    Icon: MessageSquare,
    title: 'Mode Faible Connexion',
    description: 'Votre boutique en ligne continue de fonctionner même quand la connexion internet est mauvaise.'
  },
  {
    Icon: ShieldCheck,
    title: 'Sécurité renforcée',
    description: 'Détection automatique des comportements suspects. Votre argent et vos données sont en sécurité.'
  },
  {
    Icon: BarChart3,
    title: 'Statistiques simples',
    description: 'Comprenez vos performances sans être un expert. Des graphiques clairs et des suggestions utiles.'
  },
  {
    Icon: Headphones,
    title: 'Support local',
    description: 'Une équipe qui vous comprend et est continuellement à votre écoute. Disponible sur WhatsApp, Appel et SMS.'
  }
]

export default function FeaturesPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GradientTitle subtitle="Découvrez comment Dukka transforme votre boutique en ligne en une expérience de vente conversationnelle adaptée aux habitudes des consommateurs africains.">
              Des fonctionnalités pensées pour l'Afrique
            </GradientTitle>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {mainFeatures.map((feature, index) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-16 items-center mb-32 last:mb-0 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">{feature.title}</h2>
                <p className="text-gray-600 text-lg mb-8">{feature.description}</p>
                <ul className="space-y-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-dukka-primary/10 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-dukka-primary"></div>
                      </div>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
        <div className="relative">
          <Image
            src={`/images/features/${index === 0 ? 'chat-demo.png' : index === 1 ? 'payment-demo.png' : 'interface-demo.png'}`}
            alt={feature.imageAlt}
            width={800}
            height={600}
            quality={90}
            priority={index === 0}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
        </div>
      </div>
    </div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Et bien plus encore...</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => {
              const { Icon } = feature
              return (
                <div 
                  key={index} 
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-dukka-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-dukka-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer vos ventes en ligne ?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez les marques et commerçants qui boostent leurs ventes avec Dukka. 
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-dukka-primary text-white font-semibold hover:bg-dukka-dark transition-colors duration-200"
          >
            Rejoindre la liste d'attente
          </a>
        </div>
      </section>
    </main>
  )
}