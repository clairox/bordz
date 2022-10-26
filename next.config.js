/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['scene7.zumiez.com'],
	},
};

module.exports = nextConfig;
