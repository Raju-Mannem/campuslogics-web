import { GET_POSTS } from '@/lib/graphql/queries';
import { apolloClient } from '@/lib/apollo-client';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post } from '@prisma/client';
import Hero from '@/components/Hero';
import LSide from '@/components/LSide';

export const revalidate = 60;

interface GetPostData {
  posts: {
    posts: Post[];
    totalCount: number;
  };
}

export default async function PaginatedHomePage({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page || '1') || 1;
  const limit = 10;

  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_POSTS,
      variables: {
        published: true,
        page: currentPage,
        limit: limit
      },
    });
    posts = data?.posts.posts || [];
    totalCount = data?.posts.totalCount || 0;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <section className="min-h-screen">
      <Hero />
      <div className="relative border-b border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 place-items-center max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
          <LSide />
          <div className="col-span-1 self-start lg:col-span-3 w-full lg:border-l-2 lg:border-gray-300 lg:px-8">
            <PostList posts={posts} />
            {totalPages > 1 && (
              <div className="mt-12 mb-12">
                <PaginationControls
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pathJoin='page/'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}