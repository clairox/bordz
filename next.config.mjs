/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_SUPABASE_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME,
                port: '',
                pathname: '/storage/v1/object/public/images/**',
            },
            {
                protocol: process.env.NEXT_PUBLIC_SUPABASE_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME,
                port: '',
                pathname: '/storage/v1/object/sign/images/**',
            },
        ],
    },
}

export default nextConfig
