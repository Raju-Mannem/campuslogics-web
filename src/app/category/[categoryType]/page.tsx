import { GET_CATEGORY_TYPE_POSTS } from '@/lib/graphql/queries';
import { apolloClient } from '@/lib/apollo-client';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post } from '@prisma/client';

export const dynamic = "force-dynamic"
export const revalidate = 60;

interface GetPostData {
  categoryTypePosts: {
    posts: Post[];
    totalCount: number;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ pageNumber?: string, categoryType?: string }>;
}) {
  const resolvedParams = await params;
  const categoryType = resolvedParams.categoryType;
  const currentPage = Number(resolvedParams.pageNumber) || 1;
  const limit = 10;

  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_CATEGORY_TYPE_POSTS,
      variables: {
        published: true,
        page: currentPage,
        limit: limit,
        categoryType: categoryType
      },
    });
    posts = data?.categoryTypePosts?.posts || [];
    totalCount = data?.categoryTypePosts?.totalCount || 0;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <section className="min-h-screen">
      <div className="relative border-b border-gray-200 overflow-hidden px-8 sm:px-24 py-12">
        <h1 className="text-white text-3xl font-bold mb-8 sm:mb-12 bg-brand-500/20 p-2 rounded-lg">{(categoryType ?? "").charAt(0).toUpperCase() + categoryType?.slice(1)} Notifications</h1>
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