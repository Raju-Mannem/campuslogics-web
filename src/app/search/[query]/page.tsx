import { searchPosts } from '@/services/post.services';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post } from '@/generated/prisma/client';
import Hero from '@/components/Hero';
import LSide from '@/components/LSide';

export const revalidate = 60;

interface SearchPageProps {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function SearchResultsPage({ params, searchParams }: SearchPageProps) {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(query);
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const result = await searchPosts({
      published: true,
      page: currentPage,
      limit: limit,
      searchQuery: decodedQuery,
    });

    posts = result.posts as Post[];
    totalCount = result.totalCount;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <section className="min-h-screen">
      <Hero />
      <div className="relative border-b border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 place-items-center max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
          <LSide />
          <div className="col-span-1 lg:col-span-3 w-full">
            <PostList posts={posts} />
            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationControls
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pathJoin="/"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
