/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ hostname: '**' }],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
