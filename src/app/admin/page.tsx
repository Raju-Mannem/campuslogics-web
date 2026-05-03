import { getPosts } from '@/services/post.services';
import PaginationControls from '@/components/PaginationControls';
import Image from 'next/image';
import Link from 'next/link';
import DeletePostButton from '@/components/Admin/DeletePostButton';

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10;

  const { posts, totalCount } = await getPosts({
    page: currentPage,
    limit: limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

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
          {posts.map((post) => (
            <li key={post.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-6 py-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.imageLink || '/placeholder.jpg'}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          post.published
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
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-brand-600 transition"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/posts/${post.slug}/edit`}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-brand-600 transition"
                  >
                    Edit
                  </Link>

                  {/* Extracted Interactive Client Component */}
                  <DeletePostButton postId={post.id} />
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
              pathJoin="admin/"
            />
          </div>
        )}
      </div>
    </div>
  );
}
