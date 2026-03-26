import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iua.edu.mx",
      },
    ],
  },
};

export default nextConfig;
