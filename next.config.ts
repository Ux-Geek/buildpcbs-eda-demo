import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    // Configure webpack to handle HTTPS imports
    config.experiments = {
      ...config.experiments,
      buildHttp: {
        allowedUris: ["https://cdn.jsdelivr.net/"],
        frozen: false, // Allow fetching without lockfile
        upgrade: true, // Allow upgrades
      },
    };

    return config;
  },
};

export default nextConfig;
