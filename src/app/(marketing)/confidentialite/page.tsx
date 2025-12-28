// src/app/confidentialite/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Dukka',
  description: 'Notre politique de confidentialité détaille comment nous protégeons vos données personnelles.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-dukka-blue-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-dukka-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-dukka-orange-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dukka-blue-50 border border-dukka-blue-200 mb-8">
              <span className="text-sm font-semibold text-dukka-blue">Protection des données</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Politique de Confidentialité
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comment nous protégeons et gérons vos données personnelles.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Collecte des données</h2>
            <p className="mb-4">
              Nous collectons les informations que vous nous fournissez directement, notamment :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informations d'identification (nom, prénom, email)</li>
              <li>Informations de contact (adresse, téléphone)</li>
              <li>Informations de paiement (transactions, historique)</li>
              <li>Données d'utilisation du service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
            <p className="mb-4">Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience</li>
              <li>Communiquer avec vous sur nos services</li>
              <li>Traiter vos paiements</li>
              <li>Assurer la sécurité de votre compte</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Protection des données</h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée, notamment :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Chiffrement des données sensibles</li>
              <li>Protocoles de sécurité avancés</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue de nos systèmes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Partage des données</h2>
            <p className="mb-4">
              Nous ne partageons vos données personnelles qu'avec votre consentement explicite, sauf dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Avec nos fournisseurs de services</li>
              <li>Pour respecter nos obligations légales</li>
              <li>Pour protéger nos droits et notre sécurité</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
            <p className="mb-4">Vous disposez des droits suivants concernant vos données :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Modifications</h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :
              <br />
              Par email : hello@getdukka.com
              <br />
              Par WhatsApp : +221 76 782 68 04
            </p>
            <p className="text-sm text-gray-500 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}