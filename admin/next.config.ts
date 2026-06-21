import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server-web.konaweselatankab.go.id',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
