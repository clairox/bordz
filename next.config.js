/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['scene7.zumiez.com'],
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
};

module.exports = nextConfig;
