import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    qualities: [70, 70, 70, 75, 90],
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d7ba88d1c8554e0abdab4ab5b41205d3.r2.dev",
      }
    ]
  },
  allowedDevOrigins: ["192.168.1.101"]
};

export default nextConfig;
