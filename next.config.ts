/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Optimisé pour les déploiements Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,  // Nécessaire pour les exports statiques
  },
  experimental: {
    // Améliore la compatibilité avec le rendu hybride
    serverActions: true
  }
}

module.exports = nextConfig