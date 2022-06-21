const { isModuleInstalled } = require('next-optimized-images/lib/loaders')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    loader: 'akamai',
    path: '',
  }, 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*' // Proxy to Backend
      }
    ]
  }
}
