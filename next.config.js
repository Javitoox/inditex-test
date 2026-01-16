/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode para detectar problemas potenciales
  reactStrictMode: true,

  // Compresión gzip/brotli habilitado por defecto
  compress: true,

  // Seguridad: ocultar "X-Powered-By: Next.js" header
  poweredByHeader: false,

  // Next.js 16: Turbopack habilitado por defecto (bundler más rápido)
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itx-frontend-test.onrender.com',
        port: '',
      },
    ],
    qualities: [100, 75],
  },
};

module.exports = nextConfig;
