// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  
  // Configuration critique pour éviter les erreurs de window
  output: 'export',  // Génération statique sans SSR
  
  // Désactiver le prérendu pour certaines pages/routes
  experimental: {
    // Passage en statique sans prérendu côté serveur
    appDir: true,
    serverActions: false,
  },
  
  // Spécifier les routes qui doivent être générées côté client uniquement
  exportPathMap: async function() {
    return {
      '/': { page: '/' }
    };
  },
  
  // Cette option est cruciale pour éviter les erreurs window
  images: {
    unoptimized: true  // Nécessaire en mode export
  },
  
  // Nécessaire pour le mode export
  trailingSlash: true
}

export default nextConfig;