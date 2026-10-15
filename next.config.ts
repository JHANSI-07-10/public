import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets a verification build run beside a live `next dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
