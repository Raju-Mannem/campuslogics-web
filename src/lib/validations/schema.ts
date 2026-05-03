import { z } from 'zod';

// --- Post Validations ---

export const createPostSchema = z.object({
  postType: z.string().min(1, 'Post type is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.any().default({}),
  imageLink: z.url('Must be a valid URL'),
  links: z.any().default({}),
  tags: z.array(z.string()).default([]),
  postedBy: z.string().min(1, 'Author name is required'),
  published: z.boolean().default(false),
});

export const updatePostSchema = createPostSchema.partial();

// --- Pagination & Search Validations ---

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  published: z.boolean().optional(),
});

export const searchSchema = paginationSchema.extend({
  searchQuery: z.string().optional(),
});

export const categorySchema = paginationSchema.extend({
  postType: z.string().optional(),
});

export const categoryTypeSchema = paginationSchema.extend({
  categoryType: z.string().optional(),
});
