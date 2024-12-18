/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactive la vérification ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optionnel : désactive aussi les vérifications TypeScript pendant le build
    ignoreBuildErrors: true,
  },
}

export default nextConfig;