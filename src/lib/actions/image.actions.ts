'use server';

import { prisma } from '@/lib/prisma/client';
import { auth } from '@/auth';
import { ImageKitService } from '@/services/imagekit-service';
import { revalidatePath } from 'next/cache';

export async function uploadImage(formData: FormData, name: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to upload an image.');
  }

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const imageKitService = new ImageKitService();
  const uploadResult = await imageKitService.uploadImage(file, name);

  const image = await prisma.image.create({
    data: {
      name,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    },
  });

  revalidatePath('/admin/images');
  return image;
}

export async function deleteImage(id: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to delete an image.');
  }

  const image = await prisma.image.findUnique({ where: { id } });

  if (image?.publicId) {
    const imageKitService = new ImageKitService();
    await imageKitService.deleteImage(image.publicId);
  }

  await prisma.image.delete({ where: { id } });

  revalidatePath('/admin/images');
  return { success: true };
}
