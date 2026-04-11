import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/dedkuansing" : "",
  },
  basePath: isProd ? "/dedkuansing" : "",
  assetPrefix: isProd ? "/dedkuansing/" : "",
  trailingSlash: true,
}

export default nextConfig
