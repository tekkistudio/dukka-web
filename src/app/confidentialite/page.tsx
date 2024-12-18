// src/app/confidentialite/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Dukka',
  description: 'Notre politique de confidentialité détaille comment nous protégeons vos données personnelles.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Politique de Confidentialité
            </h1>
          </div>
        </div>
      </div>

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
              Par email : [adresse email]
              <br />
              Par téléphone : [numéro]
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}