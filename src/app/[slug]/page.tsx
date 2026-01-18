
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { Post } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import YouTubeFeed from '@/components/YoutubeFeed';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import SafeHtml from '@/components/SafeHtml';
import JsonLd from '@/components/JsonLd';
import { GET_POST_BY_SLUG } from '@/lib/graphql/queries';

export const revalidate = 60;

interface GetPostData {
  post: Post | null;
}

async function getPost(slug: string) {
  const { data } = await apolloClient.query<GetPostData>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  return data?.post ?? null;
}

// Metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const post = await getPost((await params).slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | CampusLogics`,
    description: post.description,
    alternates: {
      canonical: `https://campuslogics.com/blog/${post.slug}`,
    },
    authors: [{ name: post.postedBy }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.imageLink,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageLink],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost((await params).slug);

  if (!post) notFound();

  const htmlContent =
    typeof post.content === 'object'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? generateHTML(post.content as any, [StarterKit])
      : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: [post.imageLink],
    datePublished: new Date(Number(post.createdAt)).toISOString(),
    author: {
      '@type': 'Person',
      name: post.postedBy,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CampusLogics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://campuslogics.in/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://campuslogics.in/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="min-h-screen">
        <article className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
          <div className="col-span-1 lg:col-span-3 bg-white px-4 sm:px-8 py-8 sm:py-12 lg:border-x lg:border-gray-200">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">{new Date(Number(post.createdAt)).toLocaleDateString()}</span>
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative w-full aspect-video lg:aspect-square max-h-[500px] mb-8 mx-auto">
              <Image
                src={post.imageLink || '/placeholder.jpg'}
                alt={post.title}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            <p className="text-lg my-8 text-gray-700 border-l-4 border-brand-500 pl-4">
              {post.description}
            </p>

            <div className="w-full prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-brand-600">
              <SafeHtml html={htmlContent} />
            </div>

            {post.links && (
              <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-2">
                <h3 className="font-semibold text-lg mb-4">Important Links</h3>
                {Object.entries(post.links).map(([key, value]) => (
                  <div key={key} className='flex gap-2 items-center'>
                    <span className='font-medium'>{key}:</span>
                    <Link
                      href={value}
                      target="_blank"
                      className="text-brand-600 hover:text-brand-700 underline break-all"
                    >
                      Click here
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='bg-white col-span-1'>
            <YouTubeFeed />
          </div>
        </article>
      </section>
    </>
  );
}
