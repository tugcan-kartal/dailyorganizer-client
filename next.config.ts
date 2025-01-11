import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'tasksdailyorganizer.s3.amazonaws.com', // Genel AWS S3 URL'si
      'tasksdailyorganizer.s3.eu-north-1.amazonaws.com' // Eğer bölge farklıysa bu da eklenebilir
    ],
  },
  async redirects(){
    return [
      {
        source: '/',
        destination: '/user/signup',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
