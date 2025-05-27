/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 output: 'export',
  images: { unoptimized: true },
  basePath: '/radix-sort', // important!
  assetPrefix: '/radix-sort',
}

export default nextConfig
