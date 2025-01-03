import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
  images: {
    domains: ['assets.aceternity.com','https://s3.ap-south-1.amazonaws.com/*']
  }
};

export default nextConfig;
