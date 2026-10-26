/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Sign-in pages must never be framed (clickjacking). No site-wide CSP exists;
  // this one only sets frame-ancestors.
  async headers() {
    const noFraming = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
    ];
    return [
      { source: "/login", headers: noFraming },
      { source: "/forgot-password", headers: noFraming },
    ];
  },
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
