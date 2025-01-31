import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    poweredByHeader: false,
    skipTrailingSlashRedirect: true,
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
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BASE_API_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
