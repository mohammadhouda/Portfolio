import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "@xyflow/react"],
  },
};

export default nextConfig;
