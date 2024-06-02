/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/", // forward all paths to the root
      },
    ];
  },
};

export default nextConfig;
