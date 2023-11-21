/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,  
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**/*',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '**/*',
      }
    ],
  },

}
