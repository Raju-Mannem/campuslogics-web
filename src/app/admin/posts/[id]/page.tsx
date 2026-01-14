import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { Post } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import SafeHtmlClient from '@/components/SafeHtml.client';

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
    <div className="bg-white min-h-screen pb-20">
      {/* Header Image with Overlay */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-gray-900">
        <Image
          src={post.imageLink || '/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <div className="flex flex-wrap gap-3 mb-6">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-brand-500/20 backdrop-blur-sm border border-brand-500/30 text-white text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-300 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
                {post.postedBy.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">{post.postedBy}</span>
                <span className="text-xs text-gray-400">Author</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </span>
              <span className="text-xs text-gray-400">Published</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-serif italic border-l-4 border-brand-500 pl-4 py-1">
            {post.description}
          </p>

          <div
            className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-xl prose-img:shadow-lg"  
          >
            <SafeHtmlClient html={htmlContent} />
          </div>
        </div>
      </article>

      {/* Back to Home Button */}
      <div className="max-w-3xl mx-auto px-4 mt-12 text-center">
        <Link href="/" className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}