/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
