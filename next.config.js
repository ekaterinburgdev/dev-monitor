/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://ekaterinburg.dev',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
