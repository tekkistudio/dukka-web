// src/app/mentions-legales/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales | Dukka',
  description: 'Mentions légales et informations de contact de Dukka.',
}

export default function LegalPage() {
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
              <span className="text-sm font-semibold text-dukka-blue">Informations légales</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Mentions Légales
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Informations légales et coordonnées de Dukka.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
            <p className="mb-4">
              Le site Dukka (https://getdukka.com) est édité par Dukka, entreprise en cours d'immatriculation au Registre du Commerce et du Crédit Mobilier du Sénégal.
            </p>
            <p className="mb-4">Siège social : Dakar, Sénégal</p>
            <p className="mb-4">Directeur de la publication : Ibuka Ndjoli</p>
            <p className="mb-4">Contact : hello@getdukka.com</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
            <p className="mb-4">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
              <br />
              Site web : https://vercel.com
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble des éléments constituant le site Dukka (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations sur le droit d'auteur et la propriété intellectuelle. Ces éléments sont la propriété exclusive de Dukka.
            </p>
            <p className="mb-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Protection des données personnelles</h2>
            <p className="mb-4">
              Les informations collectées sur le site Dukka font l'objet d'un traitement informatique destiné à [finalité du traitement]. Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux informations qui vous concernent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
            <p className="mb-4">
              Le site Dukka utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur le site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p className="mb-4">
              Pour toute question relative à ces mentions légales, vous pouvez nous contacter :
              <br />
              Par email : hello@getdukka.com
              <br />
              Par WhatsApp : +221 76 782 68 04
              <br />
              Par courrier : Dukka, Dakar, Sénégal
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