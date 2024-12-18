// src/app/mentions-legales/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales | Dukka',
  description: 'Mentions légales et informations de contact de Dukka.',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Mentions Légales
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
            <p className="mb-4">
              Le site Dukka est édité par [Nom de votre société], société [type de société] au capital de [montant] FCFA, immatriculée au Registre du Commerce et du Crédit Mobilier sous le numéro [numéro].
            </p>
            <p className="mb-4">Siège social : [Adresse]</p>
            <p className="mb-4">Directeur de la publication : [Nom du directeur]</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
            <p className="mb-4">
              Le site est hébergé par [Nom de l'hébergeur], [statut juridique], [adresse].
              <br />
              Téléphone : [numéro]
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble des éléments constituant le site Dukka (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations sur le droit d'auteur et la propriété intellectuelle. Ces éléments sont la propriété exclusive de [Nom de votre société].
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
              Par email : [adresse email]
              <br />
              Par téléphone : [numéro]
              <br />
              Par courrier : [adresse postale]
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}