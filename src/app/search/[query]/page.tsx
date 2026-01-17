import { GET_SEARCH_POSTS } from '@/lib/graphql/queries';
import { apolloClient } from '@/lib/apollo-client';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post } from '@prisma/client';
import Hero from '@/components/Hero';

export const revalidate = 60;

interface GetPostData {
  searchPosts: {
    posts: Post[];
    totalCount: number;
  };
}
interface SearchPageProps {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function SearchResultsPage({
    params,
    searchParams,
}: SearchPageProps) {
    const { query } = await params;
    const decodedQuery = decodeURIComponent(query);
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const limit = 10;
    
  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_SEARCH_POSTS,
      variables: { 
        published: true,
        page: currentPage,
        limit: limit,
        searchQuery: decodedQuery
      },
    });
    posts = data?.searchPosts.posts || [];
    totalCount = data?.searchPosts.totalCount || 0;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  const totalPages = Math.ceil(totalCount / limit);
  const categories = ["Government Jobs", "Remote Jobs", "BTECH Jobs", "Degree Jobs", "MTECH Jobs", "MCA Jobs", "MBA Jobs", "MSC Jobs", "10th Jobs", "ITI Jobs", "12th Jobs", "Diploma Jobs"];

  return (
    <section className="min-h-screen">
      <Hero />
      <div className="relative border-b border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="col-span-1 flex flex-col justify-start items-start gap-4 mb-4 lg:mb-0 lg:border-r border-gray-300 lg:sticky lg:top-30">
            <h2 className="text-3xl font-bold text-gray-900">Filters</h2>
            <select className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option>Any Topic</option>
              <option>Development</option>
              <option>Design</option>
            </select>
          </div>

          <div className="col-span-1 lg:col-span-3">
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
        </div>
      </div>
    </section>
  );
}