/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "www.okx.com",
      //   port: "",
      //   pathname: "/cdn/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "static.coinall.ltd",
      //   port: "",
      //   pathname: "/cdn/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "ipfs.particle.network",
      //   port: "",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
