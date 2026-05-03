import { getPosts } from '@/services/post.services';
import PostList from '@/components/Post/PostList';
import PaginationControls from '@/components/PaginationControls';
import { Post as PostClientType } from '@/generated/prisma/client';
import Hero from '@/components/Hero';
// import LSide from "@/components/LSide";
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const currentPage = parseInt(page || '1') || 1;

  const baseUrl = 'https://campuslogics.org';
  const isFirstPage = currentPage === 1;

  const url = isFirstPage ? baseUrl : `${baseUrl}/page/${currentPage}`;

  return {
    metadataBase: new URL(baseUrl),
    title: isFirstPage
      ? 'CampusLogics – Education, Exams & Career Updates'
      : `Page ${currentPage} | CampusLogics`,
    description:
      'CampusLogics provides latest education news, exam updates, results, admissions and career guidance.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: 'CampusLogics',
      description: 'Latest education news, exams, results and career updates.',
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CampusLogics',
      description: 'Latest education news, exams, results and career updates.',
      images: [`${baseUrl}/og-home.jpg`],
    },
    robots: {
      index: currentPage === 1,
      follow: true,
    },
  };
}

const baseUrl = 'https://campuslogics.org';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CampusLogics',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${baseUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CampusLogics',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
};

export default async function PaginatedHomePage({
  params,
}: {
  params: Promise<{ pageNumber?: string }>;
}) {
  const resolvedParams = await params;
  const currentPage = Number(resolvedParams.pageNumber) || 1;
  const limit = 10;

  let posts: PostClientType[] = [];
  let totalCount = 0;

  try {
    const result = await getPosts({
      published: true,
      page: currentPage,
      limit: limit,
    });
    posts = (result.posts as unknown as PostClientType[]) || [];
    totalCount = result.totalCount;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  const totalPages = Math.ceil(totalCount / limit);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: (currentPage - 1) * limit + index + 1,
      url: `${baseUrl}/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
      {posts.length > 0 && <JsonLd data={itemListJsonLd} />}
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
                    pathJoin="/"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
