import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/projeto-baep-18bpmm',
  assetPrefix: '/projeto-baep-18bpmm/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

