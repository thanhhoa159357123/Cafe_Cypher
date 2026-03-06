import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cấp phép cho ông Cloudinary
        port: '',
        pathname: '/**', // Cho phép lấy mọi ảnh trong domain này
      },
    ],
  },
}

export default nextConfig
