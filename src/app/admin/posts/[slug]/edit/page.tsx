import { getPost } from '@/services/post.services';
import { notFound } from 'next/navigation';
import PostForm from '@/components/Admin/PostForm';
import { SessionProvider } from 'next-auth/react';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  let post = null;
  let hasError = false;

  try {
    post = await getPost({ slug });
  } catch (err) {
    console.error('Error fetching post:', err);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error loading post. Ensure the database connection is active.
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
      <SessionProvider>
        <PostForm post={post} />
      </SessionProvider>
    </div>
  );
}
