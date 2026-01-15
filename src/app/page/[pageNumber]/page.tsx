import Link from 'next/link';
import { GET_POSTS } from '@/lib/graphql/queries';
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

export default async function PaginatedHomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
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
  const categories = ["Government Jobs", "Remote Jobs", "BTECH Jobs", "Degree Jobs", "MTECH Jobs", "MCA Jobs", "MBA Jobs", "MSC Jobs", "10th Jobs", "ITI Jobs", "12th Jobs", "Diploma Jobs"];

  return (
    <section className="min-h-screen">
      <div className='z-10 relative flex flex-col lg:flex-row items-center justify-center gap-4 w-full min-h-[16rem] h-auto px-6 py-12 lg:px-24 bg-brand-600/15 rounded-b-[50px] lg:rounded-[0px_0px_300px]'>
        <div className='w-full lg:w-1/4 mb-4 lg:mb-0 text-center lg:text-left'>
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
        </div>
        <div className='w-full lg:w-3/4 flex gap-4 lg:gap-8 items-center justify-center lg:justify-start flex-wrap'>
          {categories.map((category) => (
            <Link key={category} href={`/category/${category}`} className="px-4 py-2 text-sm font-medium text-white bg-brand-600/20 hover:bg-brand-700 rounded-lg transition-colors whitespace-nowrap">
              {category}
            </Link>
          ))}
        </div>
      </div>

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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}