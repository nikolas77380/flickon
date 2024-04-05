/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "resources.premierleague.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sportmonks.com",
        pathname: "**",
      },
    ],
  },
  env: {
    API_KEY: process.env.API_BASE_URL,
  },
};

export default nextConfig;
