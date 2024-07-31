/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
