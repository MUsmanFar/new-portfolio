import type { NextConfig } from 'next';
const config: NextConfig = {
 output: 'export', images: { unoptimized: true }, devIndicators: false,
 // Keep production builds within the same two-core budget as Vercel.
 experimental: { cpus: 2 },
};
export default config;
