// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 自定义 Webpack 配置 解决 bun:sqlite
    webpack: (config) => {
        config.externals.push('bun:sqlite');
        return config;
    },
};

export default nextConfig;
