/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lvyzvqzgcqydicbpxwkt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/user_reservations/**",
      },
    ],
  },
};

export default nextConfig;
