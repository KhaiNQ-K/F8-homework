import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_SERVER: process.env.API_SERVER,
    APP_URL: process.env.APP_URL,
  },
};

export default nextConfig;
