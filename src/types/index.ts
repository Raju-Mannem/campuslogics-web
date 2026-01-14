export interface Post {
  id: number;
  sno: number;
  title: string;
  slug: string;
  imageLink: string;
  description: string;
  content: JSON;
  links: JSON;
  tags: string[];
  postedBy: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: number;
  name: string;
  url: string;
  publicId: string;
  uploadedAt: Date;
}

export interface CreatePostInput {
  title: string;
  description: string;
  content: JSON;
  imageLink: string;
  tags: string[];
  links?: JSON;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  published?: boolean;
}

export interface UploadImageResponse {
  success: boolean;
  image?: Image;
  error?: string;
}