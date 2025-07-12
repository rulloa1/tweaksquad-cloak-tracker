import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // enables `next export`
  trailingSlash: true // friendlier for Netlify's static hosting
};

export default nextConfig;
