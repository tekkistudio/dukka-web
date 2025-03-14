// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration pour désactiver le prérendu statique
  staticPageGenerationTimeout: 1000, // Timeout court pour éviter les longs prérendus
  
  // Configuration expérimentale
  experimental: {
    // Optimisations pour le chargement côté client
    optimizeCss: true,
    
    // Désactiver les routes statiques problématiques
    disableOptimizedLoading: true,
    
    // Désactiver les fonctionnalités serveur
    serverActions: false,
  },
  
  // Règles pour les images
  images: {
    domains: ['images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
  },
  
  // Passer à true si vous avez des problèmes avec le prérendu de certaines pages
  skipTrailingSlashRedirect: true,
  
  // On indique à Next.js d'ignorer certaines erreurs pendant la génération
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  }
};

export default nextConfig;