// src/app/temoignages/page.tsx
import Image from 'next/image'
import { Star, ShoppingBag, TrendingUp, Clock } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'

export const metadata = {
  title: 'Témoignages | Dukka - La solution e-commerce conversationnelle pour l\'Afrique',
  description: 'Découvrez les retours d\'expérience de commerçants qui transforment leur activité avec Dukka, la solution e-commerce adaptée aux habitudes d\'achat africaines.',
}

const testimonials = [
  {
    name: 'Aminata Sow',
    business: 'Aminata Fashion',
    image: 'aminata.jpg',
    location: 'Dakar, Sénégal',
    activity: 'Mode et Accessoires',
    metrics: {
      conversion: '+45%',
      satisfaction: '4.9/5',
      response: '24/7'
    },
    quote: 'Dukka a transformé ma boutique de mode. Mes clients adorent pouvoir discuter des produits avant d\'acheter. Mon taux de conversion a augmenté de 45% !'
  },
  {
    name: 'Moussa Diop',
    business: 'Librairie du Savoir',
    image: 'moussa.jpg',
    location: 'Abidjan, Côte d\'Ivoire',
    activity: 'Livres et Culture',
    metrics: {
      conversion: '+35%',
      satisfaction: '4.8/5',
      response: '24/7'
    },
    quote: 'Le système de conversation rend les achats plus naturels. Mes clients peuvent poser toutes leurs questions sur les livres avant d\'acheter.'
  },
  {
    name: 'Fatou Kane',
    business: 'Beauté Naturelle',
    image: 'fatou.jpg',
    location: 'Bamako, Mali',
    activity: 'Cosmétiques',
    metrics: {
      conversion: '+40%',
      satisfaction: '4.9/5',
      response: '24/7'
    },
    quote: 'Je peux enfin vendre mes produits cosmétiques naturels en ligne ! Le chatbot répond aux questions même quand je ne suis pas disponible.'
  }
]

const stats = [
  {
    label: 'Taux de conversion moyen',
    value: '+40%',
    icon: TrendingUp
  },
  {
    label: 'Commandes traitées',
    value: '24/7',
    icon: Clock
  },
  {
    label: 'Clients satisfaits',
    value: '98%',
    icon: ShoppingBag
  }
]

export default function TestimonialsPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GradientTitle subtitle="Découvrez comment nos clients transforment leur activité avec Dukka">
              Ils ont choisi Dukka
            </GradientTitle>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center p-6 text-center bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-dukka-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-dukka-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#F2F2F2] rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Profile */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src={`/images/testimonials/${testimonial.image}`}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                    <a href="#" className="text-dukka-primary hover:underline">
                      {testimonial.business}
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{testimonial.location}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{testimonial.activity}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg">
                  <div className="text-center">
                    <div className="text-dukka-primary font-bold">{testimonial.metrics.conversion}</div>
                    <div className="text-xs text-gray-500">Conversion</div>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <div className="text-dukka-primary font-bold">{testimonial.metrics.satisfaction}</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-dukka-primary font-bold">{testimonial.metrics.response}</div>
                    <div className="text-xs text-gray-500">Disponibilité</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre commerce ?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Rejoignez les marques et commerçants qui boostent leurs ventes avec Dukka. Commencez gratuitement, évoluez à votre rythme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-dukka-primary text-white font-semibold hover:bg-dukka-dark transition-colors duration-200"
            >
              Créer ma boutique gratuitement
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-dukka-primary text-dukka-primary font-semibold hover:bg-dukka-primary hover:text-white transition-colors duration-200"
            >
              Voir une démo
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}