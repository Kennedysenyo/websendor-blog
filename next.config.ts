import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mhvnss9dtliybovr.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
