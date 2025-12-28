// src/app/conditions/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales | Dukka',
  description: 'Les conditions générales d\'utilisation et de vente de Dukka.',
}

export default function TermsPage() {
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
              <span className="text-sm font-semibold text-dukka-blue">Conditions d'utilisation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Conditions Générales
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Les modalités d'utilisation de nos services et solutions e-commerce.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
            <p className="mb-4">
              Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités d'utilisation de la plateforme Dukka, accessible à l'adresse https://getdukka.com, et les services associés.
            </p>
            <p className="mb-4">
              L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser la plateforme.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Description des services</h2>
            <p className="mb-4">
              Dukka est une infrastructure e-commerce pensée pour l'Afrique qui propose des outils qui s'intègrent aux plateformes existantes (Shopify, WooCommerce, etc.) pour permettre aux commerçants de :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Améliorer la conversion avec une conseillère IA (Chatseller)</li>
              <li>Capturer des contacts WhatsApp de leurs clients</li>
              <li>Automatiser la transmission des commandes aux livreurs</li>
              <li>Gérer les paiements effectués via Wave, Orange Money ou en espèces</li>
              <li>Réconcilier automatiquement les commandes et les paiements</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Inscription et compte</h2>
            <p className="mb-4">
              Pour utiliser Dukka, vous devez :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Être une personne physique majeure ou une personne morale</li>
              <li>Créer un compte en fournissant des informations exactes</li>
              <li>Maintenir la confidentialité de vos identifiants</li>
              <li>Avoir une activité commerciale légale</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Conditions financières</h2>
            <p className="mb-4">
              Les tarifs de nos solutions varient selon l'outil utilisé et le forfait choisi. Chaque solution (Chatseller, WhatsApp CRM, Delivery Manager, Order Automation) dispose de sa propre grille tarifaire.
            </p>
            <p className="mb-4">
              Les prix sont disponibles sur notre site web et peuvent inclure une période d'essai gratuite selon la solution choisie. Les prix peuvent être modifiés à tout moment, avec une notification préalable de 30 jours pour les clients existants.
            </p>
            <p className="mb-4">
              Le paiement s'effectue mensuellement ou annuellement selon la formule choisie, et peut être réglé par carte bancaire, mobile money ou virement bancaire.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Obligations des parties</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">5.1 Obligations de Dukka</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Fournir un service conforme aux spécifications</li>
                <li>Assurer la disponibilité de la plateforme</li>
                <li>Sécuriser les données des utilisateurs</li>
                <li>Fournir un support technique</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">5.2 Obligations du client</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Respecter les présentes CGU</li>
                <li>Fournir des informations exactes</li>
                <li>Respecter la législation en vigueur</li>
                <li>Payer les sommes dues</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
            <p className="mb-4">
              Tous les éléments de la plateforme Dukka (marques, logos, textes, etc.) sont protégés par les droits de propriété intellectuelle. Toute reproduction non autorisée constitue une contrefaçon.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Protection des données</h2>
            <p className="mb-4">
              Le traitement des données personnelles est soumis à notre politique de confidentialité, disponible à l'adresse [lien]. Nous nous engageons à respecter la réglementation en vigueur en matière de protection des données.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Résiliation</h2>
            <p className="mb-4">
              Le contrat peut être résilié :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Par le client à tout moment</li>
              <li>Par Dukka en cas de non-respect des CGU</li>
              <li>Par Dukka en cas de non-paiement</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Responsabilité</h2>
            <p className="mb-4">
              Dukka ne pourra être tenue responsable des dommages indirects résultant de l'utilisation de la plateforme. La responsabilité de Dukka est limitée au montant des sommes versées par le client.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Modification des CGU</h2>
            <p className="mb-4">
              Les CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés des modifications par email ou notification sur la plateforme. La continuation de l'utilisation vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Loi applicable et juridiction</h2>
            <p className="mb-4">
              Les présentes CGU sont soumises au droit applicable au Sénégal. Tout litige sera soumis aux tribunaux compétents de Dakar, sauf disposition légale contraire.
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