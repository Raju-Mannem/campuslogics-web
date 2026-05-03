'use client';

import { useLoader } from '@/context/LoaderContext';
import { deletePost } from '@/lib/actions/post.actions';

export default function DeletePostButton({ postId }: { postId: number }) {
  const { showLoader, hideLoader } = useLoader();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    showLoader();
    try {
      // Calls our Server Action directly!
      await deletePost(postId);
      // Notice: We don't need a `refetch()` anymore.
      // The server action automatically calls `revalidatePath('/admin/posts')`
      // which tells Next.js to update this page in the background!
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    } finally {
      hideLoader();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-white border border-gray-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-200 transition"
    >
      Delete
    </button>
  );
}
