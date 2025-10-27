/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ngtfjhkkqhatjugocvhh.supabase.co",
				pathname: "/storage/v1/object/public/**"
			}
		]
	}
};

module.exports = nextConfig;
