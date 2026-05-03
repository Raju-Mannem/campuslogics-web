'use server';

import { prisma } from '@/lib/prisma/client';
import { auth } from '@/auth';
import { createPostSchema, updatePostSchema } from '@/lib/validations/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createPost(input: z.infer<typeof createPostSchema>) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to create a post.');
  }

  const validatedData = createPostSchema.parse(input);

  // Generate Slug
  const slug = validatedData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const post = await prisma.post.create({
    data: {
      ...validatedData,
      slug,
    },
  });

  // Revalidate cache for post listing pages
  revalidatePath('/admin/posts');
  revalidatePath('/posts');

  return post;
}

export async function updatePost(id: number, input: z.infer<typeof updatePostSchema>) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to update a post.');
  }

  const validatedData = updatePostSchema.parse(input);

  const post = await prisma.post.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath('/admin/posts');
  revalidatePath(`/posts/${post.slug}`);

  return post;
}

export async function deletePost(id: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to delete a post.');
  }

  await prisma.post.delete({ where: { id } });

  revalidatePath('/admin/posts');
  revalidatePath('/posts');

  return { success: true };
}
