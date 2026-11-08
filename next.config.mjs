/** @type {import('next').NextConfig} */
// Deployed to https://whataboutsasha.github.io (a root GitHub Pages site), so no basePath is needed.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
