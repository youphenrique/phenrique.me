import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

function getRemoteImageHostname() {
  const blogStorageUrl = process.env.NEXT_PUBLIC_VERCEL_BLOB_STORAGE_URL;
  if (blogStorageUrl !== undefined) return blogStorageUrl.replace("https://", "");
  return "assets.phenrique.me";
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.9"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getRemoteImageHostname(),
      },
    ],
  },
};

export default withContentCollections(nextConfig);
