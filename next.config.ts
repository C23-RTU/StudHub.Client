import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gravatar.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
