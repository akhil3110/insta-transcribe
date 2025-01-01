import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['assets.aceternity.com','https://s3.ap-south-1.amazonaws.com/*']
  }
};

export default nextConfig;
