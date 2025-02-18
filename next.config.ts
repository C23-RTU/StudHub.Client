import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    poweredByHeader: false,
    skipTrailingSlashRedirect: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gravatar.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'setka-rtu.ru',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://setka-rtu.ru/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
