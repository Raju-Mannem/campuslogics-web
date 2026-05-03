import { getPost } from '@/services/post.services';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import SafeHtml from '@/components/SafeHtml';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPost({ slug });

    if (!post) {
      return {
        title: 'Post Not Found | Admin',
      };
    }

    return {
      title: `Admin View: ${post.title} | CampusLogics`,
      description: post.description,
      openGraph: {
        images: [post.imageLink],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Error | Admin',
    };
  }
}

export default async function AdminPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost({ slug });

  if (!post) {
    notFound();
  }

  // Safely parse JSON for TipTap
  const htmlContent =
    typeof post.content === 'object' && post.content !== null
      ? generateHTML(post.content as any, [StarterKit])
      : '';

  // Cast Prisma Json value to an iterable Record
  const linksObj = post.links as Record<string, string> | null;

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <article className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <div className="bg-white py-8 lg:p-12 border border-gray-200">
          <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-lg mb-8 font-medium border border-amber-200 flex justify-between items-center">
            <span>Admin Preview Mode</span>
            <Link
              href={`/admin/posts/${post.slug}/edit`}
              className="text-amber-900 underline hover:text-amber-700"
            >
              Edit this Post
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 break-words">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
            >
              {post.published ? 'Published' : 'Draft'}
            </span>
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="relative w-full aspect-video lg:aspect-square max-h-[500px] mb-8 mx-auto">
            <Image
              src={post.imageLink || '/placeholder.jpg'}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain rounded-lg bg-gray-50"
              priority
            />
          </div>

          <p className="text-lg md:text-xl italic my-8 text-gray-700 border-l-4 border-brand-500 pl-4 bg-gray-50 py-4 pr-4 rounded-r-lg">
            {post.description}
          </p>

          <div className="w-full prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-brand-600">
            <SafeHtml html={htmlContent} />
          </div>

          {linksObj && Object.keys(linksObj).length > 0 && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Important Links</h3>
              {Object.entries(linksObj).map(([key, value]) => (
                <div key={key} className="flex gap-2 items-center">
                  <span className="font-medium">{key}:</span>
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

        <div className="mx-auto bg-gray-900 py-3 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center text-white font-medium hover:text-gray-300 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </article>
    </section>
  );
}
