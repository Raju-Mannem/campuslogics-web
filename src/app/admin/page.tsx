"use client"
import { Post } from '@prisma/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useLoader } from '@/context/LoaderContext';
import PaginationControls from '@/components/PaginationControls';
import { GET_ADMIN_POSTS } from '@/lib/graphql/queries';
import { DELETE_POST } from '@/lib/graphql/mutations';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


interface GetPostsData {
  posts: {
    posts: Post[];
    totalCount: number;
  };
}

export default function Admin() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = 10;

  const { data, refetch } = useQuery<GetPostsData>(GET_ADMIN_POSTS, {
    variables: { 
      page: currentPage, 
      limit: limit 
    },
    fetchPolicy: 'network-only'
  })
  const [deletePost] = useMutation(DELETE_POST)
  const { showLoader, hideLoader } = useLoader();

  const posts = data?.posts.posts || [];
  const totalCount = data?.posts.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    showLoader();
    try {
      await deletePost({ variables: { id: postId } });
      await refetch();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    } finally {
      hideLoader();
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition shadow-lg shadow-brand-500/25"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 sm:rounded-2xl overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {posts.map((post: Post) => (
            <li key={post.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-6 py-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.imageLink || '/placeholder.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                      {post.description}
                    </p>
                    <div className="flex items-center mt-2 gap-3">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(Number(post.createdAt)).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-brand-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="ml-2 px-4 py-2 bg-white border border-gray-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="px-6 py-6 border-t border-gray-100">
            <PaginationControls 
              totalPages={totalPages} 
              currentPage={currentPage} 
            />
          </div>
        )}
      </div>
    </div>
  )
}