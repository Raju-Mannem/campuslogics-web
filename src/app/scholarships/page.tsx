import { GET_CATEGORY_POSTS } from '@/lib/graphql/queries';
import { apolloClient } from '@/lib/apollo-client';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post } from '@prisma/client';

export const revalidate = 60;

interface GetPostData {
  posts: {
    posts: Post[];
    totalCount: number;
  };
}

export default async function InternshipsPage({
  params,
}: {
  params: Promise<{ pageNumber?: string }>;
}) {
  const resolvedParams = await params;
  const currentPage = Number(resolvedParams.pageNumber) || 1;
  const limit = 10;

  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_CATEGORY_POSTS,
      variables: {
        published: true,
        page: currentPage,
        limit: limit,
        postType: 'scholarship'
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
      <div className="relative border-b border-gray-200 overflow-hidden px-8 sm:px-24 py-8 sm:py-12">
        <h1 className="text-white text-3xl font-bold mb-8 sm:mb-12 bg-brand-500/20 p-2 rounded-lg">Scholarships</h1>
        <PostList posts={posts} />
        {totalPages > 1 && (
          <div className="mt-12">
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
                  pathJoin='/'
                />
              </div>
            )}
      </div>
    </section>
  );
}