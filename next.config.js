const withOffline = require("next-offline");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = withOffline(nextConfig);
