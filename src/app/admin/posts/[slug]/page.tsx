import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { Post } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import SafeHtml from '@/components/SafeHtml';

// export const revalidate = 60;

interface GetPostData {
  post: Post | null;
}

const GET_POST = gql`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      id
      title
      slug
      imageLink
      description
      content
      tags
      postedBy
      createdAt
    }
  }
`;

type Props = {
  params: Promise<{ slug: string }>;
};

// Metadata for SEO
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data } = await apolloClient.query<GetPostData>({
      query: GET_POST,
      variables: { slug },
    });

    if (!data?.post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: `${data.post.title} | CampusLogics`,
      description: data.post.description,
      openGraph: {
        images: [data.post.imageLink],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Error',
    };
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const { data } = await apolloClient.query<GetPostData>({
    query: GET_POST,
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  const post = data?.post;

  if (!post) {
    notFound();
  }

  const htmlContent = post.content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? generateHTML(post.content as any, [StarterKit])
    : '';

  return (
    <section className="min-h-screen">
      <article className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <div className="bg-white py-8 lg:p-12 lg:border-x lg:border-gray-200">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 break-words">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
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

          <p className="text-lg md:text-xl italic my-8 text-gray-700 border-l-4 border-brand-500 pl-4">
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
         <div className="mx-auto bg-navyblue-500 py-2 text-center rounded-full">
        <Link href="/admin" className="inline-flex items-center text-white font-medium">
          ← Back to Home
        </Link>
      </div>
      </article>
    </section>
  );
}