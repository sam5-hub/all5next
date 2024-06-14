/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "orgnertvdrapvnemmzlq.supabase.co",
                port: ""
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'goypyq3iw7apqtgb.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'lovely-flamingo-139.convex.cloud',
                port: '',
            },
            {
                protocol: "https",
                hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "source.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;
