/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  async redirects() {
    // Ministries section is temporarily offline while it's reworked on a
    // separate branch (feature/ministries-rework). Remove this once that
    // work merges back in and the pages return.
    return [
      { source: '/ministries', destination: '/', permanent: false },
      { source: '/ministries/:path*', destination: '/', permanent: false },
    ];
  },
  async headers() {
    // 'unsafe-inline' on script-src is required because almost every page
    // on this site is statically prerendered at build time: a per-request
    // nonce (the usual way to drop 'unsafe-inline') can never match what's
    // baked into that static HTML, so nonce-based CSP isn't viable here
    // without switching pages to dynamic rendering.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https://images.unsplash.com https://img.youtube.com https://i.ytimg.com",
      "font-src 'self'",
      "frame-src https://www.youtube.com https://www.google.com",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
