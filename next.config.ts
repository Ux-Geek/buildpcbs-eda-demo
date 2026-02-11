import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {}, // Allow webpack config to be used
  webpack: (config, { isServer }) => {
    // Support https imports used by tscircuit/3d-viewer deps
    config.experiments = {
      ...config.experiments,
      layers: true,
    };

    // Intercept and redirect the occt CDN URL to local package
    const originalExternals = config.externals;
    config.externals = [
      // First, handle the occt URL
      ({ request }: any, callback: any) => {
        if (
          request === "https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/+esm"
        ) {
          // Redirect to local package
          return callback(null, "commonjs occt-import-js");
        }
        callback();
      },
      // Then apply original externals
      ...(Array.isArray(originalExternals)
        ? originalExternals
        : [originalExternals]),
    ];

    return config;
  },
};

export default nextConfig;
