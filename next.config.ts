import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/projeto-baep-18bpmm' : '',
  assetPrefix: isGitHubPages ? '/projeto-baep-18bpmm/' : '',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
