/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'utfs.io',
  },
  {
    protocol: 'https',
    hostname: 'hifvpzz0l1.ufs.sh', // Explicitly allow this subdomain
  },
],
  },
};

export default nextConfig;