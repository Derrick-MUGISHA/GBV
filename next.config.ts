/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ["jwbfamilylaw.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;