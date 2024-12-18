// src/app/conditions/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales | Dukka',
  description: 'Les conditions générales d\'utilisation et de vente de Dukka.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Conditions Générales
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
            <p className="mb-4">
              Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités d'utilisation de la plateforme Dukka, accessible à l'adresse [votre-url], et les services associés.
            </p>
            <p className="mb-4">
              L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser la plateforme.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Description des services</h2>
            <p className="mb-4">
              Dukka est une solution e-commerce conversationnelle qui permet aux commerçants de :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Créer et gérer une boutique en ligne</li>
              <li>Interagir avec les clients via un chatbot IA</li>
              <li>Gérer les paiements en ligne</li>
              <li>Suivre les commandes et les livraisons</li>
              <li>Accéder à des analyses détaillées</li>
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
            <p className="mb-4">Les tarifs sont définis selon les formules suivantes :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Formule Tambali : À partir de 9 000 FCFA/mois</li>
              <li>Formule Tekki : À partir de 12 000 FCFA/mois</li>
              <li>Formule Jambar : Sur devis</li>
            </ul>
            <p className="mb-4">
              Les prix sont indiqués en FCFA et peuvent être modifiés à tout moment. Toute modification tarifaire sera notifiée au client 30 jours avant son entrée en vigueur.
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