// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactive la vérification ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Désactive aussi les vérifications TypeScript pendant le build
    ignoreBuildErrors: true,
  },
  // Ajouter cette option pour gérer les composants côté client et serveur
  reactStrictMode: true,
  experimental: {
    // S'assurer que Next.js est conscient de la façon dont les composants client/serveur interagissent
    esmExternals: true
  }
}

export default nextConfig;