/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["firebasestorage.googleapis.com"], // This is a separate configuration for domain-based image sources
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
};

export default nextConfig;
