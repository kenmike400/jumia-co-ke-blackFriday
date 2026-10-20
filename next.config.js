/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ke.jumia.is" },
      { protocol: "https", hostname: "www.jumia.co.ke" },
    ],
  },
};

module.exports = nextConfig;
