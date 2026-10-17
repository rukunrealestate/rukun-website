/** @type {import('next').NextConfig} */
const nextConfig = {
  // Listing photos come from the CRM's Supabase storage; Next resizes them and serves AVIF/WebP
  images: {
    remotePatterns: [new URL('https://pobhqfookfmfnvtxrlxf.supabase.co/storage/v1/object/public/**')],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // CSP: connect-src includes the CRM for the contact form submission
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://crm.rukunrealestate.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com; frame-ancestors 'none';" },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
