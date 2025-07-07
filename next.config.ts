import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://imagehandler.fra1.digitaloceanspaces.com/campaign-images/**",
      ),
      new URL(
        "https://imagehandler.fra1.digitaloceanspaces.com/defautuser.jpg",
      ),
    ],
  },
};

export default nextConfig;
