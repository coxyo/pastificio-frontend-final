// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ottimizzazione imports per Material-UI
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  
  // Variabili d'ambiente
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  
  // Configurazioni del compilatore
  compiler: {
    // Rimuove console.log in produzione
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Configurazione immagini se usi next/image
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // Headers per CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  
  // Rewrites per proxy API se necessario
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
  
  // Configurazioni per TypeScript/JavaScript
  reactStrictMode: true,
  
  // Disabilita x-powered-by header per sicurezza
  poweredByHeader: false,
  
  // Configurazione per trailing slash
  trailingSlash: false,
  
  // Output standalone per Docker se necessario
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
}

module.exports = nextConfig