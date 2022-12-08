/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		loader: 'akamai',
		domains: ['scene7.zumiez.com'],
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	assetPrefix: './',
};

module.exports = nextConfig;
