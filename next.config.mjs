/** @type {import('next').NextConfig} */
const nextConfig = {
  imgs: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imgSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['i.ibb.co', 'lh3.googleusercontent.com', 'i.ibb.co.com', "img.daisyui.com"], // Correct domain for the img
  },
};

export default nextConfig;
