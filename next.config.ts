/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lmsdomain.com" },
      { protocol: "https", hostname: "**.lmsdomain.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "backend" },
    ],
  },
  // Production security headers
  async headers() {
    const globalSecurityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
    ];

    const authHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
    ];

    return [
      {
        source: "/:path*",
        headers: globalSecurityHeaders,
      },
      {
        source: "/login",
        headers: authHeaders,
      },
      {
        source: "/forgot-password",
        headers: authHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/features",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "/platform/ai",
        permanent: true,
      },
      {
        source: "/dpa",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/resources/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/resources/blog/:slug*",
        permanent: true,
      },
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
