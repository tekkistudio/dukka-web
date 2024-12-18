// src/app/a-propos/page.tsx
import { Metadata } from 'next'
// import Image from 'next/image' // Nous le décommenterons quand on ajoutera l'équipe
import { GradientTitle } from '@/components/GradientTitle'
import { Users, Target, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À Propos | Dukka - Réinventer l\'E-commerce à l\'Africaine',
  description: 'Découvrez l\'histoire de Dukka, notre mission de réinventer l\'e-commerce en Afrique grâce à une approche conversationnelle unique adaptée aux besoins locaux.',
}

const values = [
  {
    icon: Users,
    title: 'Authenticité',
    description: 'Nous préservons l\'essence de l\'achat traditionnel africain dans l\'expérience numérique.',
  },
  {
    icon: Target,
    title: 'Simplicité',
    description: 'Nous œuvrons à simplifier l\'expérience, aussi bien pour les consommateurs que pour les e-commerçants.',
  },
  {
    icon: Lightbulb,
    title: 'Accessibilité',
    description: 'Nous rendons l\'e-commerce accessible à tous, que vous souhaitiez vendre vos produits ou faire vos achats en ligne.',
  },
]

/* À décommenter quand l'équipe sera constituée
const team = [
  {
    name: "Ibuka",
    role: "Fondateur & CEO",
    image: "/images/team/profil-ibuka.png",
    description: "Entrepreneur passionné par l'innovation et le développement de l'Afrique."
  },
  // Ajouter les autres membres de l'équipe ici
]
*/

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GradientTitle subtitle="Réinventer l'E-commerce pour l'adapter à la réalité africaine.">
              Notre Histoire
            </GradientTitle>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-medium text-dukka-primary bg-dukka-primary/10 rounded-full">
                  Notre Vision
                </span>
              </div>
              <p className="text-lg text-gray-600">
              Dukka est née d'une observation simple : en Afrique, l'achat n'est pas qu'une simple transaction, c'est avant tout une conversation, un échange humain. C'est par cette conversation que se construit la confiance, que s'échangent les informations sur les produits, et que se conclut la vente. Le problème est que l'e-commerce actuel, conçu selon les standards occidentaux, ignore complètement cette dimension culturelle. Notre vision est de transformer cette réalité culturelle en avantage compétitif grâce à la technologie.
              </p>
            </div>

            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-medium text-dukka-primary bg-dukka-primary/10 rounded-full">
                  Notre Mission
                </span>
              </div>
              <p className="text-lg text-gray-600">
              Notre mission est de réinventer  l'e-commerce pour l'adapter à la réalité africaine. Dukka permet aux commerçants et marques de créer des boutiques en ligne où l'expérience d'achat est conversationnelle, facilitée par un chatbot IA qui reproduit l'interaction naturelle d'un marché physique. Les solutions de paiement locales (Wave, Orange Money, etc.) sont intégrées et le paiement se fait naturellement dans le flux de la conversation, comme dans une discussion sur WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Nos Valeurs</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-dukka-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-dukka-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* L'équipe - À décommenter quand l'équipe sera constituée 
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">L'équipe</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-dukka-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez l'aventure</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Ensemble, créons l'avenir du e-commerce en Afrique.
          </p>
          
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-dukka-primary text-white font-semibold hover:bg-dukka-dark transition-colors duration-200"
          >
            Rejoindre l'équipe Dukka
          </a>
        </div>
      </section>
    </main>
  )
}