/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.lifamin.site',
      },
    ],
  },
  allowedDevOrigins: ['192.168.100.2', 'localhost'],
};

module.exports = nextConfig;
