import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["avatars.githubusercontent.com"], // 外部ドメインを許可
  // },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      prismjs: require.resolve("prismjs"), // 明示的にパスを解決
    };
    return config;
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
