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
                hostname: 'api.setka-rtu.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://api.setka-rtu.ru/:path*`,
            },
            {
                source: '/admin-api/:path*',
                destination: `https://api-admin.setka-rtu.ru/:path*`,
            },
        ];
    },
};

export default nextConfig;
