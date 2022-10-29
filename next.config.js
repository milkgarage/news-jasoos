/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  images: {
    domains: ["my-usa-cricket.s3.amazonaws.com", "images.bhaskarassets.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = nextConfig;
