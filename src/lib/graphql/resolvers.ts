import { prisma } from '@/lib/prisma/client';
import { ImageKitService } from "@/services/imagekit-service";
import { Prisma } from '@prisma/client';

interface CreatePostInput {
  title: string
  description: string
  content: Prisma.InputJsonValue
  imageLink: string
  links: Prisma.InputJsonValue
  tags: string[]
  postedBy: string
}

interface UpdatePostInput {
  title?: string
  description?: string
  content?: Prisma.InputJsonValue
  imageLink?: string
  links?: Prisma.InputJsonValue
  tags?: string[]
  published?: boolean
}

const resolvers = {
  Query: {
    posts: async (_: any, { limit, isPublished, offset = 0}: any) => {
      // await new Promise(resolve => setTimeout(resolve, 5000))
      return await prisma.post.findMany({
        ...(isPublished && { where: { published: isPublished } }),
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      })
    },

    post: async (_: any, { id, slug }: any) => {
      if (id) {
        const res = prisma.post.findUnique({ where: { id } });
        return await res;
      }
      if (slug) {
        return await prisma.post.findUnique({ where: { slug } })
      }
      throw new Error('Either id or slug must be provided')
    },

    images: async () => {
      return await prisma.image.findMany({
        orderBy: { uploadedAt: 'desc' }
      })
    },

    image: async (_: any, { id }: any) => {
      return await prisma.image.findUnique({ where: { id } })
    }
  },

  Mutation: {
    createPost: async (_: any, { input }: { input: CreatePostInput }, context: any) => {
      if (!context.session) {
        throw new Error("You must be logged in to create a post.");
      }
      const slug = input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      return await prisma.post.create({
        data: {
          ...input,
          slug,
        }
      })
    },

    updatePost: async (_: any, { id, input }: { id: number; input: UpdatePostInput }, context: any) => {
      if (!context.session) {
        throw new Error("You must be logged in to update a post.");
      }
      return await prisma.post.update({
        where: { id },
        data: input
      })
    },

    deletePost: async (_: any, { id }: { id: number }, context: any) => {
      if (!context.session) {
        throw new Error("You must be logged in to delete a post.");
      }
      await prisma.post.delete({ where: { id } })
      return true
    },

    uploadImage: async (_: any, { file, name }: any, context: any) => {
      if (!context.session) {
        throw new Error("You must be logged in to upload an image.");
      }
      const imageKitService = new ImageKitService()
      const uploadResult = await imageKitService.uploadImage(file, name)

      return await prisma.image.create({
        data: {
          name,
          url: uploadResult.url,
          publicId: uploadResult.publicId
        }
      })
    },

    deleteImage: async (_: any, { id }: { id: number }, context: any) => {
      if (!context.session) {
        throw new Error("You must be logged in to delete an image.");
      }
      const image = await prisma.image.findUnique({ where: { id } })
      if (image?.publicId) {
        const imageKitService = new ImageKitService()
        await imageKitService.deleteImage(image.publicId)
      }

      await prisma.image.delete({ where: { id } })
      return true
    }
  }
};

export default resolvers;