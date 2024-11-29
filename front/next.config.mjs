import createNextIntlPlugin from 'next-intl/plugin';
import webpack from 'webpack';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION
    },
    webpack: (config, { isServer }) => {
        const envs = {};
    
        Object.keys(process.env).forEach(env => {
            if (env.startsWith('NEXT_PUBLIC_')) {
                envs[env] = process.env[env];
            }
        });
    
        if (!isServer) {
            config.plugins.push(new webpack.DefinePlugin({
                'process.env': JSON.stringify(envs),
            }));
        }

        return config;
    }
};

export default withNextIntl(nextConfig);
