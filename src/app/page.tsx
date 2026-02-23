import { GET_POSTS } from "@/lib/graphql/queries";
import { apolloClient } from "@/lib/apollo-client";
import PostList from "@/components/Post/PostList";
import PaginationControls from "@/components/PaginationControls";
import { Post } from "@prisma/client";
import Hero from "@/components/Hero";
import LSide from "@/components/LSide";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60;

interface GetPostData {
  posts: {
    posts: Post[];
    totalCount: number;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const currentPage = parseInt(page || "1") || 1;

  const baseUrl = "https://campuslogics.org";
  const isFirstPage = currentPage === 1;

  const url = isFirstPage ? baseUrl : `${baseUrl}/page/${currentPage}`;

  return {
    metadataBase: new URL(baseUrl),
    title: isFirstPage
      ? "CampusLogics – Education, Exams & Career Updates"
      : `Page ${currentPage} | CampusLogics`,
    description:
      "CampusLogics provides latest education news, exam updates, results, admissions and career guidance.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: "CampusLogics",
      description: "Latest education news, exams, results and career updates.",
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "CampusLogics",
      description: "Latest education news, exams, results and career updates.",
      images: [`${baseUrl}/og-home.jpg`],
    },
    robots: {
      index: currentPage === 1,
      follow: true,
    },
  };
}

const baseUrl = "https://campuslogics.org";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CampusLogics",
  url: baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CampusLogics",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
};

export default async function PaginatedHomePage({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page || "1") || 1;
  const limit = 10;

  let posts: Post[] = [];
  let totalCount = 0;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_POSTS,
      variables: {
        published: true,
        page: currentPage,
        limit: limit,
      },
    });
    posts = data?.posts.posts || [];
    totalCount = data?.posts.totalCount || 0;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  const totalPages = Math.ceil(totalCount / limit);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
            <LSide />
            <div className="col-span-1 self-start lg:col-span-3 w-full lg:border-l-2 lg:border-gray-300 lg:px-8">
              <PostList posts={posts} />
              {totalPages > 1 && (
                <div className="mt-12 mb-12">
                  <PaginationControls
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pathJoin="page/"
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
