/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    dirs: ["pages"],
  },
  env: {
    PERSONAL_ACCESS_TOKEN: "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",
  },
};

export default nextConfig;
