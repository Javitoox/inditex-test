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
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
    ],
    qualities: [100, 75],
  },
};

module.exports = nextConfig;
