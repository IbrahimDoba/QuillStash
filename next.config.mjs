/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/images/**',
          },
        ],
      },
};

export default nextConfig;
