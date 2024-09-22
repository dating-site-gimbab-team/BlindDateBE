/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  swcMinify: true,
  images: {
    domains: ["tailwindui.com", "lh3.googleusercontent.com"], // 허용할 도메인 추가
  },
};

module.exports = nextConfig;