/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
