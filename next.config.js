/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for Netlify
  trailingSlash: true, // Add trailing slashes for better compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
