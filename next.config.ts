import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb'
    }
  },
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prodstswansong.blob.core.windows.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  } 
};

export default nextConfig;
