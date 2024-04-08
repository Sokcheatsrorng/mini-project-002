/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ['robohash.org', 'store.istad.co', 'hips.hearstapps.com','fakestoreapi.com' ],
    },
};
export default nextConfig;
