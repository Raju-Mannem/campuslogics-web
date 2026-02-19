import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma/client';

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://campuslogics.in';
try {
    // Get all posts
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postUrls,
    ];
} catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
}
}
