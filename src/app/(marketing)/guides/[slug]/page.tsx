// src/app/(marketing)/guides/[slug]/page.tsx
// Note: Ce fichier est un template. Pour chaque guide, créer une page statique ou utiliser un CMS.

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  BookOpen,
  CheckCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

// Exemple de contenu pour le guide "paiement-livraison-afrique"
// À remplacer par un CMS ou des fichiers MDX à terme

const guideContent = {
  title: 'Comment gérer le paiement à la livraison (COD) au Sénégal',
  description: 'Le paiement à la livraison représente 70% des transactions e-commerce en Afrique. Découvrez comment le gérer efficacement sans y perdre.',
  author: 'Équipe Dukka',
  date: '15 Décembre 2024',
  readTime: '8 min',
  image: '/images/guides/cod-senegal.jpg',
  category: 'Logistique & Paiement',
  tags: ['COD', 'Paiement', 'Sénégal', 'Livraison'],
};

// Composants réutilisables pour le contenu
const Callout = ({ type, children }: { type: 'info' | 'warning' | 'tip', children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    tip: 'bg-green-50 border-green-200 text-green-800',
  };
  const icons = {
    info: BookOpen,
    warning: AlertTriangle,
    tip: Lightbulb,
  };
  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} my-6`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default function GuidePage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-12">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Link */}
          <Link 
            href="/guides"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tous les guides</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category */}
            <span className="text-sm font-medium text-green-600 mb-4 block">
              {guideContent.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {guideContent.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {guideContent.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{guideContent.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{guideContent.readTime} de lecture</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>Par {guideContent.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={guideContent.image}
              alt={guideContent.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12">
          <article className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <p className="text-xl text-gray-700 leading-relaxed">
              Si vous vendez en ligne au Sénégal ou en Afrique de l'Ouest, vous connaissez ce chiffre : 
              <strong>70% de vos clients préfèrent payer à la livraison</strong>. C'est frustrant quand on vient 
              d'un marché où le paiement en ligne est la norme. Mais c'est la réalité.
            </p>

            <p>
              La question n'est pas de savoir si vous devez accepter le COD (Cash On Delivery). 
              Vous n'avez pas le choix si vous voulez vendre. La vraie question est : 
              <strong>comment le gérer sans y perdre votre chemise</strong> ?
            </p>

            <Callout type="info">
              <strong>COD = Cash On Delivery</strong> — Le client paie en espèces (ou par mobile money) 
              au moment où il reçoit sa commande.
            </Callout>

            <h2>Pourquoi le COD domine en Afrique</h2>

            <p>
              Avant de voir comment gérer le COD, comprenons pourquoi vos clients le préfèrent :
            </p>

            <ul>
              <li>
                <strong>Méfiance envers les paiements en ligne</strong> — Les arnaques sont courantes. 
                Payer avant de recevoir, c'est prendre un risque.
              </li>
              <li>
                <strong>Faible bancarisation</strong> — Moins de 20% des Sénégalais ont une carte bancaire. 
                Wave et Orange Money changent la donne, mais le cash reste roi.
              </li>
              <li>
                <strong>Besoin de voir le produit</strong> — "Je veux voir si c'est la bonne taille/couleur 
                avant de payer."
              </li>
              <li>
                <strong>Habitude culturelle</strong> — Le commerce traditionnel fonctionne ainsi depuis toujours.
              </li>
            </ul>

            <Callout type="tip">
              <strong>Ne combattez pas le COD</strong> — Embrassez-le. Les marchands qui refusent le COD 
              perdent 70% de leurs ventes potentielles. Ceux qui le maîtrisent ont un avantage compétitif énorme.
            </Callout>

            <h2>Les 3 problèmes du COD (et comment les résoudre)</h2>

            <h3>1. Les commandes fantômes</h3>

            <p>
              C'est le cauchemar de tout e-commerçant africain : le client commande, vous envoyez le livreur, 
              et... personne ne répond. Ou pire : "Ah non, j'ai changé d'avis."
            </p>

            <p><strong>Le coût réel :</strong></p>
            <ul>
              <li>Frais de livraison aller (payés pour rien)</li>
              <li>Frais de livraison retour</li>
              <li>Temps perdu du livreur</li>
              <li>Produit potentiellement endommagé</li>
              <li>Stress et frustration</li>
            </ul>

            <p><strong>Solutions :</strong></p>

            <div className="bg-gray-50 rounded-xl p-6 my-6">
              <h4 className="font-semibold text-gray-900 mb-4">✅ Confirmation par WhatsApp</h4>
              <p className="text-gray-600 mb-4">
                Avant d'envoyer le livreur, confirmez TOUJOURS la commande par WhatsApp ou appel. 
                Un simple message : "Bonjour [Prénom], votre commande de [Produit] sera livrée demain 
                entre 10h et 12h à [Adresse]. Confirmez-vous ?"
              </p>
              <p className="text-sm text-gray-500">
                Taux de confirmation moyen : 85%. Vous éliminez 15% de commandes fantômes dès le départ.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-6">
              <h4 className="font-semibold text-gray-900 mb-4">✅ Acompte obligatoire</h4>
              <p className="text-gray-600 mb-4">
                Demandez un acompte de 20-30% pour valider la commande. Acceptez Wave ou Orange Money. 
                Si le client refuse de payer un petit acompte, il y a de fortes chances qu'il ne paie 
                pas du tout à la livraison.
              </p>
              <p className="text-sm text-gray-500">
                Résultat : Taux d'annulation divisé par 3.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-6">
              <h4 className="font-semibold text-gray-900 mb-4">✅ Blacklist des mauvais payeurs</h4>
              <p className="text-gray-600 mb-4">
                Tenez un fichier des clients qui ont annulé ou refusé des commandes. 
                À la 2ème occurrence, exigez un paiement intégral à l'avance.
              </p>
            </div>

            <Callout type="warning">
              <strong>Attention :</strong> Ne soyez pas trop strict au début. Un nouveau client qui doit payer 
              100% à l'avance ira chez un concurrent. Trouvez le bon équilibre entre sécurité et conversion.
            </Callout>

            <h3>2. Les erreurs de monnaie</h3>

            <p>
              Le client doit payer 18 500 FCFA. Il donne un billet de 10 000 FCFA. 
              "Je n'ai pas plus, je reviendrai demain avec le reste."
            </p>

            <p><strong>Solutions :</strong></p>

            <ul>
              <li>
                <strong>Précisez le montant exact</strong> dans le message de confirmation : 
                "Préparez 18 500 FCFA en espèces ou par Wave."
              </li>
              <li>
                <strong>Proposez le paiement mobile</strong> en premier choix. Wave est gratuit, 
                Orange Money aussi pour les petits montants.
              </li>
              <li>
                <strong>Le livreur doit avoir de la monnaie</strong> — Prévoyez une caisse de départ.
              </li>
            </ul>

            <h3>3. Le cash qui traîne</h3>

            <p>
              Votre livreur encaisse 150 000 FCFA en espèces pendant la journée. 
              Où va cet argent ? Quand le récupérez-vous ?
            </p>

            <p><strong>Solutions :</strong></p>

            <ul>
              <li>
                <strong>Réconciliation quotidienne</strong> — Le livreur doit remettre le cash chaque soir.
              </li>
              <li>
                <strong>Application de suivi</strong> — Utilisez une app simple (même Google Sheets) 
                pour tracer chaque encaissement.
              </li>
              <li>
                <strong>Privilégiez le mobile money</strong> — L'argent arrive directement sur votre compte, 
                pas dans la poche du livreur.
              </li>
            </ul>

            <h2>Notre recommandation : La stratégie hybride</h2>

            <p>
              Après avoir travaillé avec +50 marques au Sénégal, voici la stratégie qui fonctionne le mieux :
            </p>

            <div className="bg-green-50 rounded-xl p-6 my-8 border border-green-200">
              <h4 className="font-bold text-green-800 mb-4 text-lg">La stratégie COD optimisée</h4>
              <ol className="space-y-3 text-green-700">
                <li className="flex items-start space-x-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                  <span>Proposez le paiement intégral par Wave/OM avec une petite réduction (5%)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                  <span>Si le client préfère le COD, demandez un acompte de 25% par mobile money</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                  <span>Confirmez la commande par WhatsApp avant la livraison</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                  <span>À la livraison, proposez Wave/OM en premier (montrez le QR code)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</span>
                  <span>Acceptez le cash uniquement en dernier recours</span>
                </li>
              </ol>
            </div>

            <h2>Conclusion</h2>

            <p>
              Le COD n'est pas votre ennemi. C'est une réalité du marché africain que vous pouvez 
              transformer en avantage si vous le gérez bien. Les marchands qui maîtrisent le COD 
              dominent leur marché pendant que les autres se plaignent.
            </p>

            <p>
              Commencez par implémenter une seule de ces solutions cette semaine. Mesurez l'impact. 
              Ajustez. Répétez.
            </p>

            <Callout type="tip">
              <strong>Automatisez la confirmation</strong> — Vous passez trop de temps à confirmer 
              les commandes par WhatsApp ? Chatseller peut automatiser cette étape et réduire vos 
              commandes fantômes de 40%.{' '}
              <Link href="/solutions#chatseller" className="text-green-700 underline">En savoir plus →</Link>
            </Callout>

          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {guideContent.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-gray-600">Partagez ce guide</span>
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Guides similaires</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder pour les guides similaires */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-[16/9] bg-gray-200" />
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-dukka-blue transition-colors">
                    Titre du guide similaire
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Description courte du guide similaire qui donne envie de lire.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à optimiser vos ventes ?
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez comment Chatseller peut automatiser vos confirmations de commande et réduire vos annulations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://dashboard.chatseller.app/register"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-dukka-blue text-white font-semibold rounded-xl hover:bg-dukka-blue-700 transition-all group"
            >
              <span>Essayer Chatseller gratuitement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              <span>Voir tous les guides</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
