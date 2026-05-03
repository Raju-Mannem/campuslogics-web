import { getPost } from '@/services/post.services';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import YouTubeFeed from '@/components/YoutubeFeed';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import SafeHtml from '@/components/SafeHtml';
import JsonLd from '@/components/JsonLd';
import ShareButtons from '@/components/ShareButtons';

export const revalidate = 60;

// Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost({ slug }).catch(() => null);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | CampusLogics`,
    description: post.description,
    alternates: {
      canonical: `https://campuslogics.org/${post.slug}`,
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

export default async function PublicPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getPost({ slug }).catch(() => null);

  if (!post || !post.published) {
    // Optionally guard so drafts don't leak to public
    notFound();
  }

  // Parsing Prisma's Json object to TipTap's requirements safely
  const htmlContent =
    typeof post.content === 'object' && post.content !== null
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
        url: 'https://campuslogics.org/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://campuslogics.org/${post.slug}`,
    },
  };

  const linksObj = post.links as Record<string, string> | null;

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="min-h-screen bg-gray-50">
        <article className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto py-8">
          {/* Main Content Column */}
          <div className="col-span-1 lg:col-span-3 bg-white px-4 sm:px-8 py-8 sm:py-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words text-gray-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-brand-50 text-brand-700 border border-brand-100">
                {new Date(Number(post.createdAt)).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <ShareButtons
                url={`https://campuslogics.org/${post.slug}`}
                title={post.title}
                description={post.description}
              />
            </div>

            <div className="relative w-full aspect-video lg:aspect-square max-h-[500px] mb-8 mx-auto bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <Image
                src={post.imageLink || '/placeholder.jpg'}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                priority
              />
            </div>

            <p className="text-lg my-8 text-gray-700 border-l-4 border-brand-500 pl-5 py-2 bg-gray-50/50 italic rounded-r-lg">
              {post.description}
            </p>

            <div className="w-full prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-brand-600 hover:prose-a:text-brand-700">
              <SafeHtml html={htmlContent} />
            </div>

            {linksObj && Object.keys(linksObj).length > 0 && (
              <div className="mt-10 p-6 bg-brand-50/50 rounded-xl space-y-3 border border-brand-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                  Important Links
                </h3>
                {Object.entries(linksObj).map(([key, value]) => (
                  <div key={key} className="flex gap-2 items-center text-gray-700">
                    <span className="font-medium min-w-[120px]">{key}:</span>
                    <Link
                      href={value}
                      target="_blank"
                      className="text-brand-600 hover:text-brand-800 font-medium underline break-all transition-colors"
                    >
                      Click here to visit →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              <YouTubeFeed />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
