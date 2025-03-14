'use client'

import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'

const values = [
  {
    icon: Users,
    title: 'Authenticité',
    description: 'Nous préservons l\'essence de l\'achat traditionnel africain dans l\'expérience numérique.',
    color: 'text-blue-500 bg-blue-50'
  },
  {
    icon: Target,
    title: 'Simplicité',
    description: 'Nous œuvrons à simplifier l\'expérience, aussi bien pour les consommateurs que pour les e-commerçants.',
    color: 'text-green-500 bg-green-50'
  },
  {
    icon: Lightbulb,
    title: 'Accessibilité',
    description: 'Nous rendons l\'e-commerce accessible à tous, que vous souhaitiez vendre vos produits ou faire vos achats en ligne.',
    color: 'text-purple-500 bg-purple-50'
  }
]

const milestones = [
  {
    year: '2021',
    title: 'Immersion dans l\'E-commerce',
    description: 'Forts de 3 années d\'expérience dans la vente en ligne de livres et d\'e-books africains, ainsi que de 4 années d\'expertise dans l\'e-commerce en Occident, nous sommes de retour en Afrique avec une mission claire : dynamiser le secteur de l\'e-commerce et contribuer à l\'émergence de marques africaines ambitieuses. Nous mettons à profit notre savoir-faire et nos apprentissages pour accompagner cette transformation.'
  },
  {
    year: '2022',
    title: 'Expertise Terrain',
    description: 'Création d\'une agence digitale spécialisée en e-commerce. Accompagnement de plus de 50 marques et commerçants africains, et formation de plus de 200 e-commerçants. Cette expérience nous permet d\'identifier précisément les freins au développement de l\'e-commerce en Afrique. Nous constatons que les solutions e-commerce actuelles (Shopify, Woocommerce, etc.) ne sont pas adaptées aux habitudes d\'achat locales. Les taux de conversion sont faibles et les abandons de panier nombreux, car le parcours d\'achat est transactionnel, alors que l\'achat est conversationnel en Afrique.'
  },
  {
    year: '2023',
    title: 'Tests & Validation',
    description: 'Lancement d\'une fabrique de marques de produits pour tester différentes approches e-commerce. Les résultats confirment que l\'approche conversationnelle, proche de l\'expérience d\'achat traditionnelle, génère 3 fois plus de ventes que l\'approche classique occidentale.'
  },
  {
    year: '2024',
    title: 'Naissance de Dukka',
    description: 'Fort de ces enseignements, nous développons Dukka, une solution qui combine le meilleur de la technologie (IA, paiement mobile) avec les pratiques commerciales traditionnelles africaines. Notre objectif : permettre à chaque marque et commerçant de créer facilement sa boutique en ligne adaptée aux habitudes d\'achat locales.'
  },
  {
    year: 'Vision',
    title: 'L\'Avenir du Commerce',
    description: 'Nous voulons faire de Dukka la référence de l\'e-commerce conversationnel en Afrique, en permettant à chaque marque et commerçant de prospérer en ligne tout en préservant l\'essence sociale et relationnelle du commerce traditionnel africain.'
  }
]

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in">
              <GradientTitle subtitle="Réinventer l'E-commerce pour l'adapter à la réalité africaine.">
                Notre Histoire
              </GradientTitle>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="mb-6">
                <span className="text-dukka-primary text-xl font-semibold">Notre Vision</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dukka est née d'une observation simple : en Afrique, l'achat n'est pas qu'une simple transaction, c'est avant tout une conversation, un échange humain. C'est par cette conversation que se construit la confiance, que s'échangent les informations sur les produits, et que se conclut la vente. Le problème est que l'e-commerce actuel, conçu selon les standards occidentaux, ignore complètement cette dimension culturelle. Notre vision est de transformer cette réalité culturelle en avantage compétitif grâce à la technologie.
              </p>
            </div>

            <div className="bg-gradient-to-br from-dukka-primary/10 to-white p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="mb-6">
                <span className="text-dukka-primary text-xl font-semibold">Notre Mission</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Notre mission est de réinventer l'e-commerce pour l'adapter à la réalité africaine. Dukka permet aux marques et commerçants de créer des boutiques en ligne où l'expérience d'achat est conversationnelle, facilitée par un chatbot IA qui reproduit l'interaction naturelle d'une boutique physique. Les solutions de paiement locales (Wave, Orange Money, etc.) sont intégrées et le paiement se fait naturellement dans le flux de la conversation, comme dans une discussion sur WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Notre Expertise
          </h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start gap-8 mb-12 last:mb-0 group"
              >
                <div className="text-4xl font-bold text-dukka-primary w-24 flex-shrink-0 text-right group-hover:scale-110 transition-transform">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${value.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
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
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Rejoignez l'aventure</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Ensemble, créons l'avenir du e-commerce en Afrique.
            </p>
            
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dukka-primary text-white font-semibold hover:bg-dukka-dark transition-colors duration-200"
            >
              Rejoindre l'équipe Dukka
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}