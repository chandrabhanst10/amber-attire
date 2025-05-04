/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
