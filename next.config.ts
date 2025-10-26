/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/(.*)/backend/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
      {
        source: "/uploads/:path",
        destination: `${process.env.BACKEND_URL}/uploads/:path*`,
      },
      {
        source: "/ar/uploads/:path",
        destination: `${process.env.BACKEND_URL}/uploads/:path*`,
      },
      // { source: '(.*)/uploads/:path*', destination: `${process.env.BACKEND_URL}/:path*` },
      {
        source: "/invoice/:path",
        destination: `${process.env.BACKEND_URL}/invoice/:path*`,
      },
      {
        source: "/media/:path",
        destination: `${process.env.BACKEND_URL}/media/:path*`,
      },
      // { source: '/uploads/:path', destination: `${process.env.BACKEND_URL}/:path*` },
    ];
  },
};

export default nextConfig;
