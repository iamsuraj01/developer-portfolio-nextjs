const dotenv = require("dotenv");
/** @type {import('next').NextConfig} */
dotenv.config();

const nextConfig = {
  reactStrictMode: true, // enabled react-strict mode
  swcMinify: true,
  images: {
    domains: ["i.ibb.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
