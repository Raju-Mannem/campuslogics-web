'use server';

import { prisma } from '@/lib/prisma/client';

export async function getImages() {
  return await prisma.image.findMany({
    orderBy: { uploadedAt: 'desc' },
    take: 10,
    skip: 0,
  });
}

export async function searchImages(term?: string) {
  const name = term;
  if (name) {
    return await prisma.image.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
  return prisma.image.findMany();
}

export async function getImageById(id: number) {
  return await prisma.image.findUnique({ where: { id } });
}
