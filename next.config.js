/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: false,
	compiler: {
		removeConsole: true,
	},
};

module.exports = {
	nextConfig,
	images: {
		domains: ['media.graphcms.com'],
		domains: ['media.graphassets.com'],
	},
};
