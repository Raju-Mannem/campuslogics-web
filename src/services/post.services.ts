'use server';

import { prisma } from '@/lib/prisma/client';
import {
  paginationSchema,
  searchSchema,
  categorySchema,
  categoryTypeSchema,
} from '@/lib/validations/schema';
import { Prisma as PrismaClientType } from '@/generated/prisma/client';

/**
 * Data Access Layer for Posts (Read Operations)
 * Use these directly inside your React Server Components (page.tsx)
 */

export async function getPosts(
  params: { published?: boolean; page?: number; limit?: number } = {},
) {
  const { published, page, limit } = paginationSchema.parse(params);
  const skip = (page - 1) * limit;

  const where: PrismaClientType.PostWhereInput = {
    ...(published !== undefined && { published }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        postType: true,
        title: true,
        slug: true,
        description: true,
        imageLink: true,
        tags: true,
        postedBy: true,
        published: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, totalCount };
}

export async function searchPosts(params: {
  published?: boolean;
  page?: number;
  limit?: number;
  searchQuery?: string;
}) {
  const { published, page, limit, searchQuery } = searchSchema.parse(params);
  const skip = (page - 1) * limit;

  const where: PrismaClientType.PostWhereInput = {
    ...(published !== undefined && { published }),
    ...(searchQuery && {
      OR: [{ title: { contains: searchQuery, mode: 'insensitive' } }],
    }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        postType: true,
        title: true,
        slug: true,
        description: true,
        imageLink: true,
        tags: true,
        postedBy: true,
        published: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, totalCount };
}

export async function getCategoryPosts(params: {
  published?: boolean;
  page?: number;
  limit?: number;
  postType?: string;
}) {
  const { published, page, limit, postType } = categorySchema.parse(params);
  const skip = (page - 1) * limit;

  const where: PrismaClientType.PostWhereInput = {
    ...(published !== undefined && { published }),
    ...(postType && { postType }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, totalCount };
}

export async function getCategoryTypePosts(params: {
  published?: boolean;
  page?: number;
  limit?: number;
  categoryType?: string;
}) {
  const { published, page, limit, categoryType } = categoryTypeSchema.parse(params);
  const skip = (page - 1) * limit;

  const where: PrismaClientType.PostWhereInput = {
    ...(published !== undefined && { published }),
    ...(categoryType && {
      OR: [{ tags: { has: categoryType } }],
    }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, totalCount };
}

export async function getPost(params: { id?: number; slug?: string }) {
  if (params.id) {
    return await prisma.post.findUnique({ where: { id: params.id } });
  }
  if (params.slug) {
    return await prisma.post.findUnique({ where: { slug: params.slug } });
  }
  throw new Error('Either id or slug must be provided');
}
